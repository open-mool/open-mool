# Open Mool (The Source Code of the Himalayas)

<div align="center">
  <br />
  <img src="https://raw.githubusercontent.com/open-mool/brand-assets/main/logo/open-mool-logo-v1.png" alt="Open Mool Logo" height="120" />
  <br />
  
  <h1>Open Mool</h1>
  
  <p>
    <strong>A Public Utility for Culture.</strong><br/>
    Building the sovereign digital infrastructure to capture, code, and immortalize Himalayan heritage.
  </p>

  <p align="center">
    <a href="https://github.com/open-mool/open-mool/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="MIT License" />
    </a>
    <a href="https://github.com/open-mool/open-mool/pulls">
      <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" />
    </a>
    <a href="https://twitter.com/openmool">
      <img src="https://img.shields.io/twitter/follow/openmool.svg?style=social" alt="Twitter" />
    </a>
  </p>

  <p>
    <a href="./docs/whitepaper.md"><strong>Whitepaper</strong></a> • 
    <a href="./docs/roadmap.md"><strong>Roadmap</strong></a> • 
    <a href="./docs/architecture.md"><strong>Architecture</strong></a> •
    <a href="./docs/marketing_plan.md"><strong>Marketing Plan</strong></a>
  </p>
</div>

---

## 🏔 Mission

**Open Mool** is an open-source "Digital Vault" for the Himalayan region. We aggregate audio, video, and text data—preserving folklore, dialects, rituals, and oral history before it is lost to time and modernization.

We are not just a storage solution; we are an **AI-ready archival system** that makes cultural data searchable, translatable, and accessible to the future.

> *"We are building the Source Code of the Himalayas."*

---

## 🏗 Tech Stack (Himalayan Minimalism)

We utilize a modern, edge-first stack designed for sustainability and speed:

| Layer | Technology |
| :--- | :--- |
| **Frontend** | [Next.js 14](https://nextjs.org/) (App Router), Tailwind CSS, Shadcn UI |
| **Edge** | [Cloudflare Pages](https://pages.cloudflare.com/) (Deploy), [Cloudflare Workers](https://workers.cloudflare.com/) (API) |
| **Database** | [Cloudflare D1](https://developers.cloudflare.com/d1/) (SQLite at the Edge) |
| **Storage** | [Cloudflare R2](https://developers.cloudflare.com/r2/) (Zero Egress Object Storage) |
| **Auth** | [Auth0](https://auth0.com/) (Universal Login) |
| **AI** | [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/) + [OpenAI](https://openai.com/) |

---

## 🚀 Getting Started

We welcome **Guardians** (contributors) of all backgrounds.

### Prerequisites
- Node.js > 18
- pnpm > 9.0.0
- Wrangler CLI (for backend dev)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/open-mool/open-mool.git

# 2. Install dependencies (Turborepo)
pnpm install

# 3. Start local development (Web + API)
pnpm dev

# Web: http://localhost:3000
# API: http://localhost:8787
```

---

## 📂 Repository Structure

This is a **monorepo** managed by Turborepo:

- **[`apps/web`](./apps/web)**: The public-facing platform (The Gallery & Upload Node).
- **[`apps/api`](./apps/api)**: The backend worker handling Data & AI piping.
- **[`packages/ui`](./packages/ui)**: Shared "Himalayan Minimalism" UI components.
- **[`packages/config`](./packages/config)**: Shared TypeScript/ESLint configurations.

---

## 🤝 Community & Governance

Open Mool runs on a transparent, two-tiered community model:

1.  **Contributors (Guardians):** Individuals who submit code or cultural data.
2.  **Partners (Foundations):** NGOs and institutions who curate large collections.

### Decentralization Roadmap
We are moving towards a **federated model** ("Mool Nodes") where verified institutions can host read-only mirrors of the archive, ensuring long-term resilience. 

See our **[Whitepaper](./docs/whitepaper.md)** for details on our governance and content licensing strategy.

---

## ⚖️ License

**Code:** [MIT License](./LICENSE)  
**Content:** See [Content Licensing Policy](./docs/whitepaper.md#51-content-licensing-the-trust)

---

<div align="center">
  <p>Made with ❤️ in the Himalayas.</p>
</div>
