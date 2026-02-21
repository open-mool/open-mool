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
npx wrangler secret put CLERK_ISSUER --env production
npx wrangler secret put CLERK_JWKS_URL --env production
npx wrangler secret put INTERNAL_PROXY_SIGNING_SECRET --env production
```

To set required API secrets for **Staging**:
```bash
npx wrangler secret put CLERK_ISSUER --env staging
npx wrangler secret put CLERK_JWKS_URL --env staging
npx wrangler secret put INTERNAL_PROXY_SIGNING_SECRET --env staging
```

**Never** put actual secret values in `wrangler.toml`. Use `wrangler secret` commands.

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

---

## Authentication & Access Control

- **Clerk**: We use Clerk for user management and token issuance.
- **Hybrid API Auth**: API requests are authenticated by Clerk JWT verification or signed internal proxy headers.
- **Key Rotation**: Rotate `CLERK_SECRET_KEY` and `INTERNAL_PROXY_SIGNING_SECRET` on a regular schedule.

## Reporting Vulnerabilities

If you discover a security vulnerability, please **DO NOT** create a public GitHub issue.
Email us directly at **team@openmool.org**. We will acknowledge your report and work on a fix immediately.
