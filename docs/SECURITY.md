# Security Guidelines

## Secrets Management

We use a strict **Zero-Trust** approach to secrets. No sensitive keys should ever be committed to the repository.

### 1. Repository Secrets (GitHub Actions)
The following secrets must be configured in the GitHub Repository settings for CI/CD to work:

- `CLOUDFLARE_API_TOKEN`: API Token with Worker & Pages edit permissions.
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID.

### 2. Application Secrets (Runtime)
Secrets for the running application (e.g., database keys, Clerk secrets) are managed via Cloudflare's encrypted environment variables.

#### API Secrets
To set required API secrets for **Production**:
```bash
npx wrangler secret put CLERK_ISSUER
npx wrangler secret put CLERK_JWKS_URL
npx wrangler secret put INTERNAL_PROXY_SIGNING_SECRET
```

To set required API secrets for **Staging**:
```bash
npx wrangler secret put CLERK_ISSUER --env staging
npx wrangler secret put CLERK_JWKS_URL --env staging
npx wrangler secret put INTERNAL_PROXY_SIGNING_SECRET --env staging
```

**Never** put actual secret values in `wrangler.toml`. Use `wrangler secret` commands.

#### How to determine `CLERK_ISSUER` and `CLERK_JWKS_URL`

Use your Clerk Frontend API domain.

- Clerk docs describe the Frontend API as the instance URL hosted at `https://<slug>.clerk.accounts.dev` for development, and they note that you can find that URL in the Clerk Dashboard Domains page.
- Clerk docs also state that the JWKS URL is your Frontend API URL with `/.well-known/jwks.json` appended.
- If you change your production Clerk domain, Clerk notes that downstream JWT issuer and JWKS endpoint values must be updated as well.

Practical mapping:

- Development instance example:
  - `CLERK_ISSUER=https://artistic-bunny-70.clerk.accounts.dev`
  - `CLERK_JWKS_URL=https://artistic-bunny-70.clerk.accounts.dev/.well-known/jwks.json`
- Production custom-domain example:
  - `CLERK_ISSUER=https://clerk.openmool.org`
  - `CLERK_JWKS_URL=https://clerk.openmool.org/.well-known/jwks.json`

If you are unsure which production domain to use, open Clerk Dashboard -> Domains / API Keys and copy the Frontend API URL shown there. The issuer should match the `iss` claim in Clerk-issued session tokens.

#### Local Development
For local dev, copy `apps/api/.dev.vars.example` to `apps/api/.dev.vars`. **`.dev.vars` is git-ignored.**

```ini
# apps/api/.dev.vars (minimum required)
CLERK_ISSUER=...
CLERK_JWKS_URL=...
INTERNAL_PROXY_SIGNING_SECRET=...
R2_BUCKET_NAME=open-mool-storage
```

Optional local keys:
- `GEMINI_API_KEY` for semantic/vector search and refinery enrichment.
- `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` if using direct presigned uploads locally.
- `LOCAL_DEV_AUTH_BYPASS=true` only for localhost contributor testing without Clerk keys. Never enable this in staging/production.

### 3. Frontend Secrets
The Web App (`apps/web`) is a client-side application.
- **`NEXT_PUBLIC_` variables**: Are exposed to the browser. Do not put secrets here.
- **env.local**: Used for local dev. Git-ignored.

#### Pages runtime variables

Cloudflare Pages should have these runtime variables for both preview and production:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_API_URL`
- `API_URL`
- `INTERNAL_PROXY_SIGNING_SECRET`
- `ADMIN_USER_IDS` if admin access is needed
- `LOCAL_DEV_AUTH_BYPASS=false`

---

## Authentication & Access Control

- **Clerk**: We use Clerk for user management and token issuance.
- **Hybrid API Auth**: API requests are authenticated by Clerk JWT verification or signed internal proxy headers.
- **Key Rotation**: Rotate `CLERK_SECRET_KEY` and `INTERNAL_PROXY_SIGNING_SECRET` on a regular schedule.

## Reporting Vulnerabilities

If you discover a security vulnerability, please **DO NOT** create a public GitHub issue.
Email us directly at **team@openmool.org**. We will acknowledge your report and work on a fix immediately.
