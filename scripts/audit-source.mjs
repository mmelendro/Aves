/** Read-only source reachability audit. Next routes/config are roots; declarations
 * also reach their runtime .mjs pair. Data/provenance files are never deleted.
 * Computed imports require explicit review; this tool never removes files. */
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const config = ts.readConfigFile(
  path.join(root, "tsconfig.json"),
  ts.sys.readFile,
).config;
const options = ts.convertCompilerOptionsFromJson(
  config.compilerOptions,
  root,
).options;
const files = [];
function scan(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) scan(file);
    else if (/\.(?:tsx?|mjs|js)$/.test(file)) files.push(file);
  }
}
for (const directory of [
  "app",
  "components",
  "lib",
  "content",
  "features",
  "hooks",
])
  scan(path.join(root, directory));
const seen = new Set();
function visit(file) {
  if (seen.has(file)) return;
  seen.add(file);
  if (/\.d\.mts$/.test(file)) {
    const runtime = file.replace(/\.d\.mts$/, ".mjs");
    if (fs.existsSync(runtime)) visit(runtime);
  }
  if (!fs.existsSync(file) || !/[cm]?[jt]sx?$/.test(file)) return;
  for (const item of ts.preProcessFile(
    fs.readFileSync(file, "utf8"),
    true,
    true,
  ).importedFiles) {
    const resolved = ts.resolveModuleName(item.fileName, file, options, ts.sys)
      .resolvedModule?.resolvedFileName;
    if (resolved && !resolved.includes("/node_modules/"))
      visit(path.resolve(resolved));
  }
}
for (const file of files.filter((file) =>
  file.startsWith(path.join(root, "app/")),
))
  visit(file);
for (const file of ["middleware.ts", "instrumentation.ts", "next.config.mjs"])
  if (fs.existsSync(file)) visit(path.join(root, file));
const unreachable = files
  .filter(
    (file) =>
      !seen.has(file) && !file.endsWith(".d.ts") && !file.endsWith(".d.mts"),
  )
  .map((file) => path.relative(root, file));
console.log(
  JSON.stringify({ sourceModules: files.length, unreachable }, null, 2),
);
if (unreachable.length) process.exitCode = 1;
