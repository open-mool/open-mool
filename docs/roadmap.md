# Open Mool Technical Roadmap

**Mission:** Build the "Source Code of the Himalayas" — a sovereign, AI-ready digital archive.

---

## ✅ Completed (Phase 1: Foundation)

### 1.1 The Platform Foundation
- [x] Landing page with "Scrollventure" narrative
- [x] "How It Works" interactive timeline  
- [x] Dashboard layout with sidebar navigation
- [x] Public/private route separation (middleware)

### 1.2 The Gatekeeper (Auth & Identity)
- [x] Auth0 integration with UserProvider
- [x] User schema in D1 (`users` table)
- [x] Role system: `SCOUT`, `GUARDIAN`, `ARCHIVIST`
- [x] Reputation score tracking
- [x] Profile page with "Guardian Card" UI
- [x] Auth0 webhook for user sync

### 1.3 The Ingest Engine
- [x] Upload page (`/upload`) with drag & drop
- [x] FileUploader component with progress tracking
- [x] Metadata form (title, description, language, geolocation)
- [x] R2 bucket integration
- [x] D1 `media` table
- [x] Presigned URL generation (`POST /upload/presigned`)
- [x] Metadata storage (`POST /upload/complete`)

---

## 🚧 In Progress

### Upload History Dashboard (Priority 1)
- [ ] Add `user_id` to media table
- [ ] Create `GET /api/media/my-uploads` endpoint
- [ ] Build `/dashboard/my-uploads` page
- [ ] Display upload cards with status

---

## 📋 Backlog (Prioritized)

### Priority 1: Complete Upload Experience
1. **Upload History** (Current)
2. **File Validation & Preview**
   - Client-side type/size validation
   - Audio/video preview before upload
   - Thumbnail generation
3. **Multipart Upload**
   - Chunked uploads for large files (>100MB)
   - Pause/resume functionality

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
