# Open Mool Technical Roadmap

**Mission:** Build the "Source Code of the Himalayas" — a sovereign, AI-ready digital archive.

---

## ✅ Completed (Phase 1: Foundation)

### 1.1 The Platform Foundation
- [x] Landing page with "Scrollventure" narrative
- [x] "How It Works" interactive timeline  
- [x] Dashboard layout with sidebar navigation
- [x] Dashboard index page with quick action cards
- [x] Public/private route separation (middleware)
- [x] Login redirects to Dashboard

### 1.2 The Gatekeeper (Auth & Identity)
- [x] Auth0 v4 SDK integration (middleware pattern)
- [x] User schema in D1 (`users` table)
- [x] Role system: `SCOUT`, `GUARDIAN`, `ARCHIVIST`
- [x] Reputation score tracking
- [x] Profile page with "Guardian Card" UI
- [x] Auth0 webhook for user sync
- [x] Post-login redirect to Dashboard

### 1.3 The Ingest Engine
- [x] Upload page (`/upload`) with drag & drop
- [x] Upload page redesigned with "Himalayan Minimalism" aesthetic
- [x] Brand fonts (Eczar, Yantramanav, Gotu) and colors applied
- [x] FileUploader component with progress tracking
- [x] Metadata form (title, description, language, geolocation)
- [x] Audio/video preview components
- [x] R2 bucket integration with CORS configuration
- [x] D1 `media` table with `user_id` column
- [x] Presigned URL generation (`POST /upload/presigned`)
- [x] Metadata storage (`POST /upload/complete`)
- [x] Multipart upload for large files (>100MB)
- [x] Pause/resume functionality for uploads

### 1.4 Upload History Dashboard
- [x] Build `/dashboard/my-uploads` page
- [x] Display upload cards with status
- [x] Link from upload success to "My Archives"

---

## � In Progress

### API User Integration (Priority 1)
- [ ] Add `user_id` to media records on upload (from Auth0 session)
- [ ] Create `GET /api/media/my-uploads` endpoint (authenticated)
- [ ] Filter uploads by authenticated user

### Priority 2: The Refinery (AI Processing)
1. **Transcription Worker**
   - Cloudflare Workers AI or OpenAI Whisper
   - R2 event trigger on upload
   - Add `transcript` column to media table
   - Support Hindi, English, Pahadi dialects
2. **Auto-Tagging & Enrichment**
   - Entity extraction (people, places, festivals)
   - Language detection
   - Store metadata as JSON
3. **Processing Status UI**
   - Real-time progress updates
   - Display extracted tags

### Priority 3: The Oracle (Discovery & Search)
1. **Browse Gallery (`/explore`)**
   - Grid/list view of all archives
   - Filters: type, language, region, date
   - Infinite scroll pagination
2. **Global Audio/Video Player**
   - Context-based player (continues while navigating)
   - Waveform visualization (Wavesurfer.js)
   - Transcript sync
3. **Semantic Search**
   - Cloudflare Vectorize integration
   - Embed transcripts with `text-embedding-3-small`
   - Natural language queries
4. **Map View**
   - Mapbox GL or deck.gl
   - Cluster markers by region

### Priority 4: Community & Gamification
1. **Reputation System**
   - Award points for uploads, metadata quality
   - Milestone badges (10, 50, 100 uploads)
2. **Guardian Verification**
   - Review workflow for Guardians
   - Flag/approve content
   - Auto-promotion after 5 verified uploads
3. **Leaderboard**
   - Weekly/monthly top contributors

### Priority 5: API & Developer Access
1. **Public API**
   - Read-only endpoints
   - API key authentication
   - OpenAPI docs
2. **Embeddable Player**
   - Widget for external sites

---

## 🔮 Phase 4: Decentralization & Governance (The Mirror)

### 4.1 "Mool Nodes" (Federation)
- **Concept:** Allow partner institutions (Universities, NGOs) to host read-only mirrors of specific collections.
- **Tech:** Containerized "Pocket Archive" (Next.js + SQLite) deployable on local servers.
- **Goal:** Resilience against central failure and localized access in low-connectivity zones.

### 4.2 The Content Trust (Licensing)
- **Legal Framework:** Establish the "Open Mool Foundation" to hold data in trust.
- **Licensing Model:**
    - **Code:** MIT (Fully Open).
    - **Data:** Custom "Heritage License" (research/education free, commercial with revenue share).
- **Permaweb Backup:** Periodic snapshots of the verified vault to Arweave/IPFS.

---

## Technology Stack

### Core
- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Hono (Cloudflare Workers)
- **Database:** Cloudflare D1 + Drizzle ORM
- **Storage:** Cloudflare R2
- **Auth:** Auth0

### Future Additions
- **AI:** Cloudflare Workers AI / OpenAI Whisper
- **Search:** Cloudflare Vectorize
- **Maps:** Mapbox GL
- **Audio:** Wavesurfer.js
- **Video:** Video.js or Plyr

---

## Success Metrics
- **Upload Success Rate:** >95%
- **Transcription Accuracy:** >85% (Hindi/English)
- **Active Users:** 100+ contributors in first 3 months
- **Archive Size:** 500+ items in 6 months
