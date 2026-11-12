# Development and release checks

Use Node 22.23.5, as recorded in `.nvmrc` and `.node-version`, and the `packageManager` version in `package.json` (pnpm 10.34.5). A globally installed, different pnpm version must not rewrite the lockfile or its dependency overrides.

Start from a clean, project-local `node_modules`. Do not link another checkout's dependency directory: pnpm correctly refuses to replace an external target.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm check:architecture
pnpm build
```

The build now runs lint checks. The explicit lint command is also useful before the build. ESLint and the Next configuration are pinned together for the current Next 15 application. The linter's upstream support status must be reviewed with the framework migration under dependency task 22; a passing lint check is not a dependency security assessment.

The source reachability check does not prove that every route is useful. Unit and component tests do not prove browser layout, physical touch behaviour or a complete authenticated visitor journey. Keep those acceptance results separate and use a synthetic dataset for private-flow tests.

For a release, retain the tested commit, exact built deployment, browser acceptance and previous deployment. A code rollback does not reverse database or stored-file changes. Keep business finances, private traveller records and authentication material out of source and public release notes.
