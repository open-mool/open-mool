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
```

#### API (`apps/api`)
Create `.dev.vars` in `apps/api`:
```bash
# Cloudflare R2 & D1 credentials
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
```

### 4. Running Locally
Start both the Frontend and Backend in development mode:

```bash
pnpm dev
```
- Web: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:8787](http://localhost:8787)

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
