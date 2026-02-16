# Contributing to Open Mool

Welcome! We are building the **Source Code of the Himalayas**, and we're thrilled to have your help. This project is a monorepo containing a Next.js frontend and a Cloudflare Workers backend.

## 🚀 Getting Started

### Path A: Public UI Work (No Auth Setup)

If you are working on public pages (`/`, `/about`, `/how-it-works`, styling, components), you can start without Clerk setup.

1.  **Clone & Install:**
    ```bash
    git clone https://github.com/open-mool/open-mool.git
    cd open-mool
    pnpm install
    ```

2.  **Copy web env file:**
    ```bash
    cp apps/web/.env.example apps/web/.env.local
    ```
    You can leave Clerk values as placeholders for public UI work.

3.  **Run Locally:**
    ```bash
    pnpm dev
    ```
    - Web: [http://localhost:3000](http://localhost:3000)

### Path B: Full Stack Work (Dashboard, Uploads, Auth)

If you are touching `/dashboard`, upload APIs, session logic, or protected routes, use this setup.

1.  **Create local env files:**
    ```bash
    cp apps/web/.env.example apps/web/.env.local
    cp apps/api/.dev.vars.example apps/api/.dev.vars
    ```

2.  **Create Clerk dev instance keys (free):**
    - In Clerk dashboard, create/get a Development instance.
    - Set in `apps/web/.env.local`:
      - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
      - `CLERK_SECRET_KEY`
    - Set in `apps/api/.dev.vars`:
      - `CLERK_ISSUER`
      - `CLERK_JWKS_URL`
    - Set `INTERNAL_PROXY_SIGNING_SECRET` to the same value in both files.

3.  **Initialize local DB and run app:**
    ```bash
    cd packages/db && pnpm db:push:local
    cd ../..
    pnpm dev
    ```
    - Web: [http://localhost:3000](http://localhost:3000)
    - API: [http://localhost:8787](http://localhost:8787)
    - Sign in via `/sign-in`.

---

### 🌐 Connecting to Staging (Optional)

**Typically not required.** Do this only if you need to test against real infrastructure.
*Ask the team for access if you don't have credentials.*

```bash
pnpm dev:remote
```
*   Skips the local emulator.
*   Connects directly to Cloudflare Staging (D1 & R2).
*   Requires `wrangler login`.

---

## 🛠 Working on the Code

### Structure
- `apps/web`: Next.js Frontend (React, Tailwind, Framer Motion)
- `apps/api`: Hono Backend (Cloudflare Workers, D1, R2)
- `packages/`: Shared UI and TS config

### Making Changes
1. **Create a Branch**: `git checkout -b fix/my-cool-feature` (branch off `dev` unless maintainers ask otherwise)
2. **Make Changes**: Write your code.
3. **Lint**: Run `pnpm lint` to fix style issues.
4. **Push**: `git push origin fix/my-cool-feature`.

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
