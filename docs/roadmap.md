# Open Mool Technical Roadmap

**Mission:** Build the "Source Code of the Himalayas" — a sovereign, AI-ready digital archive.

## Phase 1: The Trident (MVP)
**Status:** In Progress
**Goal:** Deploy a secure, highly-visual ingestion and retrieval system.

### 1.1 The Platform Foundation (Frontend)
- **Tech Stack:** Next.js 14, Tailwind CSS, Framer Motion.
- [x] **Landing Page:** Narrative-driven "Scrollventure" explaining the mission.
- [x] **"How It Works":** Interactive timeline of the preservation protocol.
- [ ] **Dashboard Layout:** `apps/web/src/app/dashboard`
    - Sidebar navigation (Upload, My Archives, Profile).
    - Status indicators for upload quotas.
- [ ] **Global Player:** Persistent audio player context for uninterrupted listening.

### 1.2 The Gatekeeper (Auth & Identity)
- **Tech Stack:** Clerk (Recommended) or Auth0, Cloudflare D1.
- [ ] **Authentication Flow:**
    - Social Login (Google/Apple) for ease.
    - Magic Link for passwordless entry.
- [ ] **User Model (`User`):**
    - `id`: Unique ID (KSUID/UUID).
    - `role`: `SCOUT` (Default), `GUARDIAN` (Verified), `ARCHIVIST` (Admin).
    - `reputation_score`: Integer (gamification base).
    - `wallet_address`: Optional (for future Web3 incentives).
- [ ] **Middleware:** Edge-compatible route protection (`apps/web/src/middleware.ts`).

### 1.3 The Ingest Engine (Submission Node)
- **Tech Stack:** Cloudflare R2, React Dropzone, Hono (API).
- [ ] **Upload Interface (`/dashboard/upload`):**
    - Multi-file drag-and-drop.
    - Client-side validation (File type: `.wav`, `.mp3`, `.mp4`; Max size: 500MB).
- [ ] **Metadata Form:**
    - **Language/Dialect:** Dropdown with fuzzy search.
    - **Geolocation:** Lat/Long auto-capture + Village Name manual override.
    - **Context:** "What is happening here?" (Textarea).
- [ ] **Storage Pipeline:**
    - Generate Presigned URL from API.
    - Direct upload to R2 Bucket (`open-mool-raw`).

### 1.4 The Refinery (AI Processing)
- **Tech Stack:** Cloudflare Workers AI / OpenAI Whisper API.
- [ ] **Transcription Worker:**
    - Triggered on R2 `PutObject` event.
    - Process audio to text (Hindi/English/Pahadi dialects).
- [ ] **Enrichment Worker:**
    - **Auto-Tagging:** Extract entities (Deities, Festivals, Seasons).
    - **Sentiment Analysis:** Determine emotional tone.
- [ ] **Vectorization:**
    - Embed title, description, and transcript using `text-embedding-3-small`.
    - Upsert to Vector DB (Cloudflare Vectorize).

### 1.5 The Oracle (Search & Discovery)
- **Tech Stack:** CommandAI / cmdk, Cloudflare Vectorize.
- [ ] **Semantic Search:** "Songs about rain in Kumaon" -> Returns matches based on meaning, not just keywords.
- [ ] **Map View:** deck.gl or Mapbox GL JS visualization of archives.

---

## Phase 2: The Trust Layer (Reputation)
**Goal:** Gamify preservation and ensure data integrity.

### 2.1 The Guardian Protocol
- [ ] **Verification Badge:** Logic to upgrade user from Scout to Guardian after 5 valid uploads.
- [ ] **Leaderboard:** "Top Guardians of the Week" based on data volume and quality.

---

## Phase 3: The API (Developer Access)
**Goal:** Allow third-party apps to build on the archive.

- [ ] **Public API Keys:** Issue read-only keys for researchers.
- [ ] **Endpoints:**
    - `GET /api/v1/archives/{id}`
    - `GET /api/v1/search?q={query}`

---

## Architecture References
- **Monorepo:** Turborepo (`apps/web`, `apps/api`, `packages/ui`).
- **Database:** Drizzle ORM + Cloudflare D1 (SQLite).
- **Edge:** All API routes run on Cloudflare Workers.
