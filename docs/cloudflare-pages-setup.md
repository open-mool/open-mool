# Cloudflare Pages Deployment Setup

This document provides step-by-step instructions for setting up automated deployments to Cloudflare Pages.

## Prerequisites

- A Cloudflare account (free tier works fine)
- Admin access to the GitHub repository
- The repository already contains the necessary configuration files

## Step 1: Get Cloudflare Credentials

### Account ID

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select any website or go to the Workers & Pages section
3. Your Account ID is visible in the URL: `https://dash.cloudflare.com/{ACCOUNT_ID}/...`
4. Or find it in the right sidebar under "Account ID"
5. Copy this value - you'll need it for GitHub secrets

### API Token

1. Go to [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click **"Create Token"**
3. Use the **"Edit Cloudflare Workers"** template or create a custom token with these permissions:
   - Account > Cloudflare Pages > Edit
4. Under **"Account Resources"**, select your account
5. Under **"Zone Resources"**, select "All zones" or specific zones as needed
6. Click **"Continue to summary"** then **"Create Token"**
7. **Copy the token immediately** - it won't be shown again

## Step 2: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Click **"New repository secret"**
4. Add the following secrets:

### Secret 1: CLOUDFLARE_ACCOUNT_ID
- **Name**: `CLOUDFLARE_ACCOUNT_ID`
- **Value**: Your Account ID from Step 1
- Click **"Add secret"**

### Secret 2: CLOUDFLARE_API_TOKEN
- **Name**: `CLOUDFLARE_API_TOKEN`
- **Value**: Your API Token from Step 1
- Click **"Add secret"**

## Step 3: Create Cloudflare Pages Project

Before the first deployment, you need to create the Pages project:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) > **Workers & Pages**
2. Click **"Create application"** > **"Pages"** > **"Connect to Git"**
3. Authorize Cloudflare to access your GitHub account
4. Select the `open-mool` repository
5. Configure the build settings:
   - **Project name**: `open-mool-web` (must match the workflow file)
   - **Production branch**: `main` or `master`
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `pnpm install && pnpm --filter web run build`
   - **Build output directory**: `apps/web/out`
   - **Root directory**: `/` (leave as default)
6. Click **"Save and Deploy"**

## Step 4: Test the Deployment

1. Make a small change to the web app (e.g., update a comment)
2. Commit and push to the `main` branch:
   ```bash
   git add .
   git commit -m "Test Cloudflare Pages deployment"
   git push origin main
   ```
3. Go to the **Actions** tab in your GitHub repository
4. You should see the "Deploy to Cloudflare Pages" workflow running
5. Once complete, visit your Cloudflare Pages dashboard to see the deployment

## Deployment URLs

After successful deployment, your app will be available at:

- **Production**: `https://open-mool-web.pages.dev`
- **Preview (PR)**: `https://{branch}.open-mool-web.pages.dev`

You can also add a custom domain in the Cloudflare Pages settings.

## Troubleshooting

### Workflow fails with authentication error
- Verify your `CLOUDFLARE_API_TOKEN` has the correct permissions
- Check that the token hasn't expired
- Ensure `CLOUDFLARE_ACCOUNT_ID` is correct

### Build fails
- Check the build logs in the GitHub Actions tab
- Verify the build command works locally: `pnpm --filter web run build`
- Ensure all dependencies are listed in `package.json`

### Security headers not applied
- The `_headers` file in `apps/web/public/` is copied to the output during build
- Verify it exists in the deployed site at `https://your-site.pages.dev/_headers`
- Check the Network tab in browser DevTools to see response headers

## Manual Deployment

If you need to deploy manually:

```bash
# Install dependencies
pnpm install

# Build the app
pnpm --filter web run build

# Deploy using Wrangler CLI
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
