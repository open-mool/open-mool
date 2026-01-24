# Contributing to Open Mool

Welcome! We are building the **Source Code of the Himalayas**, and we're thrilled to have your help. This project is a monorepo containing a Next.js frontend and a Cloudflare Workers backend.

## 🚀 Getting Started

### 1-Minute Quick Start (For Frontend / UI Fixes)

If you just want to work on the UI, you don't need any secrets or complex setup.

1.  **Clone & Install:**
    ```bash
    git clone https://github.com/open-mool/open-mool.git
    cd open-mool
    pnpm install
    ```

2.  **Enable Dev Mode:**
    Copy the example environment file and enable Mock Mode.
    ```bash
    cp apps/web/.env.example apps/web/.env.local
    # Ensure NEXT_PUBLIC_MOCK_LOGIN='true' is uncommented in apps/web/.env.local
    ```

3.  **Run Locally:**
    ```bash
    pnpm dev
    ```
    *   **Open:** [http://localhost:3000](http://localhost:3000)
    *   **Login:** Click "Join" to auto-login as a mock user.

4.  **(Optional) Backend Setup:**
    If you need to modify the API or database schema, initialize the local database emulator:
    ```bash
    cd packages/db && pnpm db:push:local
    ```

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
