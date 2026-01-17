# Deployment Guide

This guide covers how to deploy the Open Mool monorepo. The project consists of two main applications:
- **API**: A Cloudflare Worker (`apps/api`)
- **Web**: A Next.js application (`apps/web`)

## Prerequisites

- **Node.js**: v18 or later.
- **pnpm**: `npm install -g pnpm`
- **Cloudflare Account**: For deploying the API.
- **Vercel Account**: For deploying the frontend (recommended).

---

## 1. Deploying the API (Cloudflare Workers)

The API is built using Hono and runs on Cloudflare Workers.

### Step 1: Login to Cloudflare
Authenticate Wrangler with your Cloudflare account:
```bash
npx wrangler login
```

### Step 2: Configure `wrangler.toml`
Ensure `apps/api/wrangler.toml` has the correct configuration. You may need to update the `name` or add KV/D1 namespace bindings if your project uses them later.

### Step 3: Deploy
Run the deployment command from the `apps/api` directory:

```bash
cd apps/api
pnpm run deploy
```
*Or from the root:*
```bash
pnpm --filter api run deploy
```

Once deployed, Cloudflare will return your worker's URL (e.g., `https://open-mool-api.open-mool.workers.dev`).

### Step 4: Add Secrets (Optional)
If your API requires environment variables (like Database URLs or API keys), set them using `wrangler secret`:

```bash
cd apps/api
npx wrangler secret put DATABASE_URL
```

---

## 2. Alternative: Deploying the Web App to Vercel

While Cloudflare Pages is the recommended deployment target (see below), Vercel is also supported.

The frontend is a standard Next.js application with static export enabled.

### Step 1: Push to GitHub/GitLab
Ensure your latest code is pushed to your remote repository.

### Step 2: Import into Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** -> **"Project"**.
3. Import your `open-mool` repository.

### Step 3: Configure Build Settings
Vercel usually auto-detects monorepos, but confirm the settings:
- **Framework Preset**: Next.js
- **Root Directory**: `apps/web` (Important: Select the web app folder, not the root)

### Step 4: Environment Variables
Add any necessary environment variables in the Vercel dashboard. You likely need to connect the Frontend to your deployed API:
- `NEXT_PUBLIC_API_URL`: The URL of your deployed Cloudflare Worker (from Section 1).

### Step 5: Deploy
Click **Deploy**. Vercel will build and host your application.

---

## Deploying Web App to Cloudflare Pages (Recommended)

The web application is configured for deployment to Cloudflare Pages with automated CI/CD via GitHub Actions.

### Automated Deployment (GitHub Actions)

The repository includes a GitHub Actions workflow that automatically deploys to Cloudflare Pages on every push to the main branch.

#### Prerequisites
1. A Cloudflare account with Pages enabled
2. GitHub repository secrets configured

#### Setup GitHub Secrets

Add the following secrets to your GitHub repository (Settings > Secrets and variables > Actions):

- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token with Pages permissions
  - Go to Cloudflare Dashboard > My Profile > API Tokens
  - Create token with "Cloudflare Pages - Edit" permissions
  
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID
  - Find this in the Cloudflare Dashboard URL or in your account overview

#### How It Works

The workflow (`.github/workflows/deploy-web.yml`) will:
1. Trigger on pushes to `main`/`master` branches
2. Install dependencies using pnpm
3. Build the Next.js application as a static export
4. Deploy the `apps/web/out` directory to Cloudflare Pages
5. Automatically create preview deployments for pull requests

### Manual Cloudflare Pages Setup

If you prefer to set up Cloudflare Pages manually:

1. Go to **Cloudflare Dashboard** > **Pages**
2. Click **"Create a project"** > **"Connect to Git"**
3. Select your `open-mool` repository
4. Configure build settings:
   - **Production branch**: `main` (or `master`)
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `pnpm install && pnpm --filter web run build`
   - **Build output directory**: `apps/web/out`
   - **Root directory**: `/` (leave as root)
   - **Environment variables**: None required for basic deployment
5. Click **"Save and Deploy"**

### Security Features

The deployment includes the following security hardening:

- **Strict HTTPS enforcement** via HSTS headers
- **Content Security Policy (CSP)** headers to prevent XSS attacks
- **Clickjacking protection** with X-Frame-Options
- **MIME type sniffing prevention** with X-Content-Type-Options
- **Referrer policy** for privacy
- **Permissions policy** to restrict browser features

These are configured via:
- Next.js middleware (`src/middleware.ts`) for dynamic routes
- Static `_headers` file (`public/_headers`) for Cloudflare Pages

### Important Notes

- The app is configured for static export (`output: 'export'` in `next.config.mjs`)
- This means no server-side rendering or API routes - purely static HTML/CSS/JS
- All security headers are applied at the edge via Cloudflare
- For SSR support on Cloudflare Pages, use `@cloudflare/next-on-pages` instead

### Mobile-First Design

The application is built with a mobile-first responsive design:
- Uses Tailwind CSS with mobile-first breakpoints
- Viewport configuration optimized for all devices
- Tested across major browsers and device sizes
