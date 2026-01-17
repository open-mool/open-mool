# Open Mool (The Source Code of the Himalayas)

<div align="center">
  <img src="https://via.placeholder.com/150?text=Open+Mool" alt="Open Mool Logo" height="100" />
  
  <p>
    <strong>A Public Utility for Culture.</strong><br/>
    Building the sovereign digital infrastructure to capture, code, and immortalize Himalayan heritage.
  </p>

  <p>
    <a href="./docs/manifesto.md">Manifesto</a> • 
    <a href="./docs/roadmap.md">Roadmap</a> • 
    <a href="./docs/architecture.md">Architecture</a>
  </p>
</div>

---

## 🏔 Mission
Open Mool is an open-source "Digital Vault" for the Himalayan region. We aggregate audio, video, and text data—preserving folklore, dialects, rituals, and oral history before it is lost.

We are not just a storage solution; we are an **AI-ready archival system** that makes cultural data searchable, translatable, and accessible to the future.

## 🏗 Tech Stack (Himalayan Minimalism)

- **Frontend:** Next.js 14 (Static Export), Tailwind CSS, Shadcn UI, Cloudflare Pages.
- **Backend:** Cloudflare Workers (Hono.js).
- **Data:** Cloudflare D1 (SQLite), Cloudflare R2 (Object Storage).
- **Auth:** Auth0.
- **AI:** Cloudflare Workers AI + OpenAI.
- **Security:** HTTPS enforcement, CSP headers, security-first defaults.

## 📂 Repository Structure

This is a **Turborepo** monorepo:

- **[`apps/web`](./apps/web)**: The public-facing platform (The Gallery & Upload Node).
- **[`apps/api`](./apps/api)**: The backend worker handling Data & AI piping.
- **[`packages/ui`](./packages/ui)**: Shared "Himalayan Minimalism" UI components.
- **[`packages/config`](./packages/config)**: Shared TypeScript/ESLint configurations.

## 🚀 Getting Started

### Prerequisites
- Node.js > 18
- pnpm > 9.0.0
- Wrangler CLI (for Cloudflare)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/open-mool/open-mool.git

# 2. Install dependencies
pnpm install

# 3. Start local development
pnpm dev
# Web: http://localhost:3000
# API: http://localhost:8787
```

## 🚢 Deployment

The platform is designed for Cloudflare's edge infrastructure:

- **Web App**: Automated deployment to Cloudflare Pages via GitHub Actions
- **API**: Cloudflare Workers deployment via Wrangler

For detailed deployment instructions, see:
- **[Deployment Guide](./DEPLOYMENT.md)**: Complete deployment instructions
- **[Cloudflare Pages Setup](./docs/cloudflare-pages-setup.md)**: Step-by-step CI/CD configuration

### Quick Deploy (Web)

1. Configure GitHub secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
2. Push to `main` branch - GitHub Actions handles the rest
3. Your app is live at `https://open-mool-web.pages.dev`

## 📜 Documentation

- **[Roadmap](./docs/roadmap.md)**: From MVP ("The Trident") to the "Pahadi LLM".
- **[Architecture](./docs/architecture.md)**: System design and deployment strategy.
- **[Design Specs](./docs/design_specs.md)**: The "Snow & Vermilion" aesthetic.
- **[Brand Guidelines](./docs/brand_guidelines.md)**: Our voice, vocabulary, and manifesto.
- **[Development Rules](./docs/development_rules.md)**: How to contribute code.
- **[Cloudflare Pages Setup](./docs/cloudflare-pages-setup.md)**: Automated deployment guide.

## 🤝 Contribution

We call our contributors **Guardians**. If you want to help preserve history or write code for the future, please read our [Development Rules](./docs/development_rules.md) first.

**License:** MIT
