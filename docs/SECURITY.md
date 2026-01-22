# Security Guidelines

## Secrets Management

We use a strict **Zero-Trust** approach to secrets. No sensitive keys should ever be committed to the repository.

### 1. Repository Secrets (GitHub Actions)
The following secrets must be configured in the GitHub Repository settings for CI/CD to work:

- `CLOUDFLARE_API_TOKEN`: API Token with Worker & Pages edit permissions.
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID.

### 2. Application Secrets (Runtime)
Secrets for the running application (e.g., Database keys, Auth0 secrets) are managed via Cloudflare's encrypted environment variables.

#### API Secrets
To set a secret for **Production**:
```bash
npx wrangler secret put AUTH0_SECRET --env production
```

To set a secret for **Staging**:
```bash
npx wrangler secret put AUTH0_SECRET --env staging
```

**Never** put actual secret values in `wrangler.toml`. Use `wrangler secret` commands.

#### Local Development
For local dev, creates a `.dev.vars` file in `apps/api`. **This file is git-ignored.**

```ini
# apps/api/.dev.vars
AUTH0_SECRET=...
R2_ACCESS_KEY_ID=...
```

### 3. Frontend Secrets
The Web App (`apps/web`) is a client-side application.
- **`NEXT_PUBLIC_` variables**: Are exposed to the browser. Do not put secrets here.
- **env.local**: Used for local dev. Git-ignored.

---

## Authentication & Access Control

- **Auth0**: We use Auth0 for user management. Ensure the `AUTH0_SECRET` is rotated periodically.
- **Edge Compatibility**: We use the Edge Runtime. We rely on `crypto` polyfills (configured in webpack) to ensure secure random number generation works at the edge.

## Reporting Vulnerabilities

If you discover a security vulnerability, please **DO NOT** create a public GitHub issue.
Email us directly at **team@openmool.org**. We will acknowledge your report and work on a fix immediately.
