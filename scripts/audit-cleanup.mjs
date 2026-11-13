/** Review inventories, not a deletion engine. Computed paths, generated modules,
 * framework conventions and old public links need a human decision. */
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import ts from "typescript";
const root = process.cwd();
function walk(dir) {
  return fs.existsSync(dir)
    ? fs
        .readdirSync(dir, { withFileTypes: true })
        .flatMap((e) =>
          e.isDirectory()
            ? walk(path.join(dir, e.name))
            : [path.join(dir, e.name)],
        )
    : [];
}
const sources = [
  "app",
  "components",
  "content",
  "features",
  "lib",
  "hooks",
  "scripts",
  "tests",
]
  .flatMap(walk)
  .filter((p) => /\.(?:[cm]?[jt]sx?|json|css)$/.test(p));
sources.push(
  ...fs
    .readdirSync(".")
    .filter((p) =>
      /^(?:next|tailwind|postcss|eslint|playwright)\.config\./.test(p),
    ),
);
const texts = new Map(sources.map((p) => [p, fs.readFileSync(p, "utf8")]));
const imports = new Set();
const identifiers = new Map();
const exports = [];
for (const [file, text] of texts) {
  if (!/\.[cm]?[jt]sx?$/.test(file)) continue;
  const ast = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  function visit(node) {
    if (ts.isIdentifier(node))
      identifiers.set(node.text, (identifiers.get(node.text) || 0) + 1);
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    )
      imports.add(node.moduleSpecifier.text);
    if (
      ts.isCallExpression(node) &&
      node.arguments[0] &&
      ts.isStringLiteral(node.arguments[0]) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        node.expression.getText(ast) === "require")
    )
      imports.add(node.arguments[0].text);
    if (
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) &&
      node.name &&
      ts.isIdentifier(node.name)
    )
      exports.push({
        file,
        name: node.name.text,
        isDefault: node.modifiers.some(
          (m) => m.kind === ts.SyntaxKind.DefaultKeyword,
        ),
      });
    ts.forEachChild(node, visit);
  }
  visit(ast);
}
const routes = walk("app")
  .filter((p) => /(?:page|route)\.(?:tsx?|jsx?)$/.test(p))
  .map((file) => ({
    file,
    purpose: file.includes("/api/")
      ? "private-or-public-api"
      : file.includes("/admin/")
        ? "owner-administration"
        : file.includes("/account/")
          ? "private-account"
          : file.includes("/auth/") ||
              file.includes("/dashboard/") ||
              file === "app/shopping/page.tsx"
            ? "auth-or-compatibility"
            : file.includes("/design/")
              ? "unlisted-design-review"
              : "public-guide",
    review:
      "Verify dynamic paths and directory ownership; a route file is not proof of navigation necessity.",
  }));
const packages = JSON.parse(fs.readFileSync("package.json", "utf8"));
const allText = [...texts.values()].join("\n");
const dependencyReview = Object.keys(packages.dependencies)
  .filter(
    (name) =>
      ![...imports].some((i) => i === name || i.startsWith(name + "/")) &&
      !allText.includes(name),
  )
  .map((name) => ({
    name,
    status: "Review framework/config/CLI/dynamic usage before removal",
  }));
const publicFiles = walk("public");
const hashes = new Map();
for (const file of publicFiles) {
  const bytes = fs.readFileSync(file),
    hash = createHash("sha256").update(bytes).digest("hex");
  const url = "/" + path.relative("public", file).split(path.sep).join("/");
  const group = hashes.get(hash) || [];
  group.push({
    url,
    bytes: bytes.length,
    sourceReferences: [...texts]
      .filter(([, text]) => text.includes(url))
      .map(([p]) => p),
  });
  hashes.set(hash, group);
}
const duplicates = [...hashes]
  .filter(([, files]) => files.length > 1)
  .map(([sha256, files]) => ({
    sha256,
    files,
    decision:
      "Retain until old URLs, provenance, generated paths and Australia branch compatibility are reviewed",
  }));
const output = {
  version: 1,
  scope:
    "Static review candidates; no automatic removal and no visitor tracking",
  routes,
  dependencyReview,
  exportReview: exports
    .filter((e) => !e.isDefault && (identifiers.get(e.name) || 0) <= 1)
    .map((e) => ({
      ...e,
      decision:
        "Check route conventions, re-exports, external consumers and computed references",
    })),
  assets: {
    files: publicFiles.length,
    duplicateGroups: duplicates.length,
    extraStorageBytes: duplicates.reduce(
      (sum, g) => sum + g.files.slice(1).reduce((n, f) => n + f.bytes, 0),
      0,
    ),
    duplicates,
  },
  limits: [
    "Identifier counts are a conservative signal, not a cross-module reference proof",
    "String matches miss computed asset URLs and may include tests or provenance",
    "Compatibility endpoints and archived documentation are retained intentionally",
  ],
};
if (process.argv.includes("--write")) {
  fs.mkdirSync("docs/audit", { recursive: true });
  fs.writeFileSync(
    "docs/audit/CLEANUP-INVENTORY-56-76.json",
    JSON.stringify(output, null, 2) + "\n",
  );
}
console.log(
  JSON.stringify(
    {
      routes: routes.length,
      dependencyReview,
      exportCandidates: output.exportReview.length,
      assetFiles: publicFiles.length,
      duplicateGroups: duplicates.length,
      extraStorageBytes: output.assets.extraStorageBytes,
      mode: process.argv.includes("--write")
        ? "inventory-written"
        : "read-only",
    },
    null,
    2,
  ),
);
