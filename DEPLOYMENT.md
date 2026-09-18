Vercel + pnpm (monorepo)
=========================

If your Vercel deployment fails with `Unsupported URL Type "workspace:"` during `npm install`, configure the project to use `pnpm` instead of `npm`.

Required Vercel project settings:

- Install Command: `pnpm install --frozen-lockfile`
- Build Command: `pnpm build`

Notes:

- This repository is a pnpm monorepo. The root `package.json` declares `packageManager: pnpm@9.0.0` and a `pnpm-lock.yaml` is present.
- Vercel's `rootDirectory` is set to `apps/web` in `vercel.json`; we added `packageManager: pnpm@9.0.0` to `apps/web/package.json` so Vercel will detect pnpm there as well.

Local test commands:

```bash
pnpm install
pnpm --filter @aequus/web dev
```

If you prefer to store Vercel settings in the UI, set the install/build commands there. Storing them in the Vercel Project Settings is the most reliable way to force `pnpm` usage during Vercel builds.
