# Deployment Guide

This guide reflects the current monorepo architecture:

- `apps/api`: Hono API deployed to Cloudflare Workers
- `apps/web`: Next.js 14 app deployed to Cloudflare Pages via `next-on-pages`

## Prerequisites

- Node.js 18+
- pnpm 9+
- Cloudflare account with Workers, Pages, D1, R2, and Vectorize access
- Clerk account for user auth

## Local Setup

Install dependencies from the repo root:

```bash
pnpm install
```

Create local env files:

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.dev.vars.example apps/api/.dev.vars
```

Set these required values before testing authenticated or upload flows:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `CLERK_ISSUER`
- `CLERK_JWKS_URL`
- `INTERNAL_PROXY_SIGNING_SECRET` in both files, with the same value
- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`

Optional local-only fallback:

- `LOCAL_DEV_AUTH_BYPASS='true'` in both files for localhost contributor testing without Clerk keys

Start both apps:

```bash
pnpm dev
```

Default local endpoints:

- Web: `http://localhost:3000`
- API: `http://localhost:8787`

## Local Verification

Run the release checks from the repo root:

```bash
pnpm lint
pnpm -C apps/api run type-check
pnpm build
pnpm -C apps/web run pages:build
```

Notes:

- `pnpm build` runs the monorepo production build, including `wrangler deploy --dry-run` for the API.
- `pnpm -C apps/web run pages:build` runs `next build` and then packages the already-built output with `next-on-pages`.

## Deploying the API

The API deploy target is configured in [apps/api/wrangler.toml](./apps/api/wrangler.toml).

Authenticate Wrangler first:

```bash
npx wrangler login
```

Deploy production:

```bash
pnpm --filter api run deploy
```

Useful preflight command:

```bash
pnpm --filter api run build
```

Set production secrets in Cloudflare before deploying protected flows:

```bash
npx wrangler secret put CLERK_ISSUER
npx wrangler secret put CLERK_JWKS_URL
npx wrangler secret put INTERNAL_PROXY_SIGNING_SECRET
```

Add optional secrets only if the feature is enabled:

- `GEMINI_API_KEY`
- `API_SECRET`

## Deploying the Web App to Cloudflare Pages

Cloudflare Pages is the primary web deployment target.

### Recommended dashboard setup

1. Go to Cloudflare Dashboard > Workers & Pages.
2. Create a new Pages project connected to the `open-mool` repository.
3. Use these build settings:

- Production branch: `main` or your chosen release branch
- Framework preset: `Next.js`
- Build command: `pnpm install && pnpm --filter web run pages:build`
- Build output directory: `apps/web/.vercel/output/static`
- Root directory: `/`

### Required web environment variables

Set these in Cloudflare Pages for each environment:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_API_URL`
- `API_URL`
- `INTERNAL_PROXY_SIGNING_SECRET`

Optional legacy fallback:

- `API_SECRET`

Do not enable `LOCAL_DEV_AUTH_BYPASS` outside localhost development.

### Manual Pages deployment

```bash
pnpm --filter web run pages:build
npx wrangler pages deploy apps/web/.vercel/output/static --project-name=open-mool-web
```

## Deployment Notes

- The web app is not a static export. It depends on `next-on-pages` to package dynamic routes, middleware, and Clerk-backed flows for Cloudflare.
- The API and web app must share the same `INTERNAL_PROXY_SIGNING_SECRET`.
- Preview and production environments should use different Cloudflare resources where appropriate, especially for D1 and R2.
- `LOCAL_DEV_AUTH_BYPASS` is for localhost-only contributor workflows and must remain disabled in remote environments.

## Related Docs

- [README.md](./README.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [docs/cloudflare-pages-setup.md](./docs/cloudflare-pages-setup.md)
- [docs/SECURITY.md](./docs/SECURITY.md)
