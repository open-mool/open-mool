# Deployment Guide

This guide covers how to deploy the Open Mool monorepo. The project consists of two main applications:
- **API**: A Cloudflare Worker (`apps/api`)
- **Web**: A Next.js application (`apps/web`)

## Prerequisites

- **Node.js**: v18 or later.
- **pnpm**: `npm install -g pnpm`
- **Cloudflare Account**: For deploying the API and R2 storage.
- **Auth0 Account**: For authentication (or alternative OAuth provider).
- **Vercel Account**: For deploying the frontend (optional, Cloudflare Pages recommended).

---

## Local Development Setup

### Step 1: Install Dependencies

From the project root:

```bash
pnpm install
```

### Step 2: Configure Auth0

1. Create an Auth0 application (Single Page Application type)
2. Configure the following settings:
   - **Allowed Callback URLs**: `http://localhost:3000/api/auth/callback`
   - **Allowed Logout URLs**: `http://localhost:3000`
   - **Allowed Web Origins**: `http://localhost:3000`

3. Create `apps/web/.env.local`:

```bash
AUTH0_SECRET='use [openssl rand -hex 32] to generate'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://YOUR_DOMAIN.auth0.com'
AUTH0_CLIENT_ID='your_client_id'
AUTH0_CLIENT_SECRET='your_client_secret'
```

### Step 3: Configure Cloudflare R2 & D1

#### 3a. Create D1 Database

```bash
cd apps/api
npx wrangler d1 create open-mool-db
```

Copy the database ID from the output and update `apps/api/wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "open-mool-db"
database_id = "YOUR_DATABASE_ID_HERE"
```

#### 3b. Create R2 Bucket

```bash
npx wrangler r2 bucket create open-mool-storage
```

Update `apps/api/wrangler.toml`:

```toml
[[r2_buckets]]
binding = "STORAGE"
bucket_name = "open-mool-storage"
```

#### 3c. Generate R2 Access Keys

1. Go to **Cloudflare Dashboard** > **R2** > **Manage R2 API Tokens**
2. Create a new API token with "Admin Read & Write" permissions
3. Copy the **Access Key ID** and **Secret Access Key**

#### 3d. Configure Local Secrets

Create `apps/api/.dev.vars`:

```bash
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
AUTH0_WEBHOOK_SECRET=your_webhook_secret
```

### Step 4: Run Database Migrations

```bash
cd apps/api
npx wrangler d1 migrations apply open-mool-db --local
```

### Step 5: Start Development Server

From the project root:

```bash
pnpm dev
```

This starts:
- **Web**: http://localhost:3000
- **API**: http://localhost:8787

### Step 6: Verify Setup

1. **Auth Flow**: Visit http://localhost:3000, click "Login", complete Auth0 login
2. **Upload**: Navigate to http://localhost:3000/upload, drop a file
3. **Database**: Check data with `npx wrangler d1 execute open-mool-db --local --command "SELECT * FROM media"`

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

The web application is configured for deployment to Cloudflare Pages with automated CI/CD via Cloudflare's native Git integration.

### Cloudflare Pages Setup

Cloudflare Pages provides built-in CI/CD that automatically builds and deploys your application when you push to your repository.

#### Prerequisites
1. A Cloudflare account with Pages enabled
2. GitHub repository access

#### Setup Steps

1. Go to **Cloudflare Dashboard** > **Pages**
2. Click **"Create a project"** > **"Connect to Git"**
3. Authorize Cloudflare to access your GitHub account
4. Select your `open-mool` repository
5. Configure build settings:
   - **Production branch**: `main` (or `master`)
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `pnpm install && pnpm --filter web run build`
   - **Build output directory**: `apps/web/out`
   - **Root directory**: `/` (leave as root)
   - **Environment variables**: None required (see `apps/web/.env.example` for details)
6. Click **"Save and Deploy"**

#### How It Works

Cloudflare Pages will:
1. Monitor your repository for changes to the production branch
2. Automatically trigger builds when you push commits
3. Install dependencies using pnpm
4. Build the Next.js application as a static export
5. Deploy the `apps/web/out` directory to Cloudflare's edge network
6. Automatically create preview deployments for pull requests

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
