# CI/CD Pipeline

Open Mool uses a robust GitOps pipeline to ensure code quality and reliable deployments. We use **GitHub Actions** for orchestration and **Cloudflare** for hosting.

## Overview

| Environment | Branch | URL | Auto-Deploy? |
|-------------|--------|-----|--------------|
| **Production** | `master` | `https://open-mool.pages.dev` (Web) / `https://api.open-mool.workers.dev` (API) | ✅ Yes |
| **Staging** | `dev` | `https://open-mool-api-staging.openmool.workers.dev` (API Only) | ✅ Yes |
| **Preview** | PRs | *Varies (Cloudflare Pages Preview)* | ✅ Yes (Web) |

## Workflows

### 1. CI Checks (Pull Requests & Pushes)
**File**: `.github/workflows/ci.yml`

Every Pull Request and push to `master` or `dev` triggers this workflow. It acts as a gatekeeper to ensure no broken code enters the main branches.

**Checks performed:**
- **Web App**:
  - `pnpm lint`: Checks for code style and potential bugs.
  - `pnpm build`: Verifies the Next.js app builds successfully.
- **API**:
  - `pnpm run build`: Ensures the Worker compiles without TypeScript errors.

> 🔴 **Failure Policy**: If any of these checks fail, the PR cannot be merged.

### 2. API Staging Deployment
**File**: `.github/workflows/deploy-api-staging.yml`

**Trigger**: Push to `dev`.

Automatically deploys the API to the `staging` environment on Cloudflare Workers.
- **Environment**: `staging`
- **Worker Name**: `open-mool-api-staging`
- **Bindings**: Connects to the same D1/R2 as production (unless configured otherwise in `wrangler.toml`).

### 3. API Production Deployment
**File**: `.github/workflows/deploy-api.yml`

**Trigger**: Push to `master`.

Automatically deploys the API to the `production` environment.

### 4. Web App Deployment
**Platform**: Cloudflare Pages (Native Integration)

Cloudflare Pages automatically monitors the repository.
- **Production**: Pushes to `master` trigger a production build.
- **Previews**: Pull Requests create ephemeral preview environments for UI testing.

---

## Branching Strategy

- **`master`**: Stable, production-ready code. Do not push directly here.
- **`dev`**: Integration branch for staging. **Target your Pull Requests here.**
- **Feature Branches**: `feat/my-feature`, `fix/issue-123`.

## Troubleshooting Deployments

If a deployment fails:
1. Check the **Actions** tab in GitHub.
2. Review the logs for the specific failed job.
3. Common issues:
   - **Secrets**: Ensure `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are set in GitHub Repository Secrets.
   - **Types**: A TypeScript error in `apps/api` will block deployment.
   - **Env Vars**: If the app fails at runtime, check `wrangler secret list` for the respective environment.
