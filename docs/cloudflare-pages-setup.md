# Cloudflare Pages Deployment Setup

This document provides step-by-step instructions for setting up automated deployments to Cloudflare Pages using Cloudflare's native Git integration.

## Prerequisites

- A Cloudflare account (free tier works fine)
- Admin access to the GitHub repository
- The repository already contains the necessary configuration files

## Step 1: Create Cloudflare Pages Project

Cloudflare Pages provides built-in CI/CD through direct Git integration - no GitHub Actions or external workflows needed.

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) > **Workers & Pages**
2. Click **"Create application"** > **"Pages"** > **"Connect to Git"**
3. Authorize Cloudflare to access your GitHub account
4. Select the `open-mool` repository
5. Configure the build settings:
   - **Project name**: `open-mool-web`
   - **Production branch**: `main` or `master`
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `pnpm install && pnpm --filter web run build`
   - **Build output directory**: `apps/web/out`
   - **Root directory**: `/` (leave as default)
   - **Environment variables**: None required (see `apps/web/.env.example` for details)
6. Click **"Save and Deploy"**

### Environment Variables

Currently, the web application **does not require any environment variables**. It is configured as a static export without API routes or server-side features.

For reference, see the `apps/web/.env.example` file which documents the structure for future integrations if needed.

## Step 2: Verify the Deployment

1. After saving, Cloudflare will automatically trigger the first build
2. Monitor the build progress in the Cloudflare Pages dashboard
3. Once complete, your app will be live at `https://open-mool-web.pages.dev`

## How It Works

Once connected, Cloudflare Pages automatically:

- **Monitors your repository** for changes to the production branch
- **Triggers builds** automatically when you push commits
- **Installs dependencies** using pnpm (detected from lockfile)
- **Builds the application** using the configured build command
- **Deploys to the edge** across Cloudflare's global network
- **Creates preview deployments** for pull requests automatically

## Deployment URLs

After successful deployment, your app will be available at:

- **Production**: `https://open-mool-web.pages.dev`
- **Preview (PR)**: `https://{branch}.open-mool-web.pages.dev`

You can also add a custom domain in the Cloudflare Pages settings.

## Troubleshooting

### Build fails with dependency errors
- Check that `pnpm-lock.yaml` is committed to the repository
- Verify the build command in Cloudflare Pages settings matches: `pnpm install && pnpm --filter web run build`
- Check build logs in the Cloudflare Pages dashboard for specific errors

### Build fails with ESLint errors
- Run `pnpm run lint` locally to check for linting errors
- Fix any errors before pushing
- All quotes in JSX should be properly escaped

### Security headers not applied
- The `_headers` file in `apps/web/public/` is copied to the output during build
- Verify it exists in the deployed site at `https://your-site.pages.dev/_headers`
- Check the Network tab in browser DevTools to see response headers

## Manual Deployment

If you need to deploy manually (not recommended for production):

```bash
# Install dependencies
pnpm install

# Build the app
pnpm --filter web run build

# Deploy using Wrangler CLI (requires CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID)
npx wrangler pages deploy apps/web/out --project-name=open-mool-web
```

## Security Best Practices

The deployment includes:
- ✅ Strict HTTPS enforcement (HSTS)
- ✅ Content Security Policy (CSP)
- ✅ Clickjacking protection
- ✅ XSS protection headers
- ✅ MIME type sniffing prevention
- ✅ Mobile-first responsive design

These are automatically applied via the `_headers` file and Next.js middleware.
