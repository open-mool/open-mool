# Contributing to Open Mool

Welcome! We are building the **Source Code of the Himalayas**, and we're thrilled to have your help. This project is a monorepo containing a Next.js frontend and a Cloudflare Workers backend.

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** v20+
- **pnpm** (Install: `npm install -g pnpm`)
- **Git**

### 2. Installation
Clone the repo and install dependencies:

```bash
git clone https://github.com/open-mool/open-mool.git
cd open-mool
pnpm install
```

### 3. Environment Setup

#### Web App (`apps/web`)
Create `.env.local` in `apps/web`:
```bash
# Ask the team for these values or set up your own Auth0 tenant
NEXT_PUBLIC_API_URL=http://localhost:8787
AUTH0_SECRET='...'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='...'
AUTH0_CLIENT_ID='...'
AUTH0_CLIENT_SECRET='...'

# OPTIONAL: Enable Mock Login for local development 
# (Set to 'true' to bypass Auth0 and log in as a dummy user)
NEXT_PUBLIC_MOCK_LOGIN='true'
```

#### API (`apps/api`)
Create `.dev.vars` in `apps/api` (Optional for local dev with Mock Auth/D1):
```bash
# Cloudflare R2 & D1 credentials (only needed for deploying or connecting to remote production)
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
```

### 4. Running Locally

We use `pnpm` workspaces. To run the full stack:

```bash
```bash
pnpm dev
```
- Web: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:8787](http://localhost:8787) (Local Mode)

To run against **Remote Staging Infrastructure** (if you have credentials):

```bash
pnpm dev:remote
```
- API will connect to the real Cloudflare Staging environment.



#### Local Database & Storage (D1 & R2)
This project uses Cloudflare D1 (Database) and R2 (Object Storage). **You do not need Cloudflare credentials** to run these locally. Wrangler emulates them on your machine.

**Database Setup:**
Before running the API for the first time, you must apply the schema to your local D1 database:

```bash
cd packages/db
pnpm db:push:local
```

*(This will create a local SQLite file in `.wrangler/state` that emulates D1)*

#### Mock Authentication
If you do not have Auth0 credentials, set `NEXT_PUBLIC_MOCK_LOGIN='true'` in `apps/web/.env.local`. 
The login button will route you to a simulated session, allowing you to access dashboard features for UI development.
This also forces file uploads to use the local proxy, allowing you to upload files without R2 credentials.

---

## 🛠 Working on the Code

### Structure
- `apps/web`: Next.js Frontend (React, Tailwind, Framer Motion)
- `apps/api`: Hono Backend (Cloudflare Workers, D1, R2)
- `packages/`: Shared UI and TS config

### Making Changes
1. **Create a Branch**: `git checkout -b feature/my-cool-feature` (Branch off `dev` usually!)
2. **Make Changes**: Write your code.
3. **Lint**: Run `pnpm lint` to fix style issues.
4. **Push**: `git push origin feature/my-cool-feature`.

### Submitting a PR
- Open a Pull Request targeting the **`dev`** branch.
- Our CI will automatically run:
  - Lint checks
  - Build verification
  - Type checking
- Once passed, a maintainer will review.

---

## 📚 Documentation
- [CI/CD Pipeline](docs/CI_CD.md): How we deploy.
- [Security Guidelines](docs/SECURITY.md): How we handle secrets.
- [Architecture](docs/architecture.md): System design.

---

## 🤝 Need Help?
- Join our [WhatsApp Community](/whatsapp)
- Email us: team@openmool.org
