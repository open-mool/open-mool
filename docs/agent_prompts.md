# Open Mool: Agent Prompt Pack

Use these prompts to spin up parallel development tracks with other AI agents. Each prompt encompasses the full context, tech stack, and specific objectives for a module.

---

## 🤖 Agent A: "The Linker" (API User Integration) — **PRIORITY 1**
**Role:** Backend Engineer
**Context:** Connect uploaded media to authenticated users.

**Copy/Paste Request:**
```markdown
You are a Backend Engineer working on "Open Mool", a Himalayan digital archive.
**Objective:** Link media uploads to authenticated users.

**Tech Stack:**
- **API:** Hono (Cloudflare Workers)
- **Database:** Cloudflare D1 with Drizzle ORM
- **Auth:** Auth0 (v4 SDK, middleware pattern)
- **Existing Schema:** `media` table has `user_id` column (TEXT, nullable).

**Current State:**
- Auth0 integration is complete. Sessions are available via `auth0.getSession()`.
- Media uploads work but `user_id` is currently NULL.
- The `/upload/complete` endpoint stores metadata but doesn't capture the uploader.

**Requirements:**
1.  **Auth Context:** Modify `POST /upload/complete` to extract `user.sub` from the Auth0 session and store it in the `user_id` column.
2.  **My Uploads Endpoint:** Create `GET /api/media/my-uploads` that:
    - Requires authentication (401 if no session).
    - Filters media by `user_id = session.user.sub`.
    - Returns an array of media objects.
3.  **Frontend Integration:** Update `apps/web/src/app/dashboard/my-uploads/page.tsx` to fetch from the new endpoint instead of fetching all media.

Start by showing the updated `POST /upload/complete` handler.
```

---

## 🤖 Agent B: "The Refinery" (AI Transcription) — **PRIORITY 2**
**Role:** AI/ML Engineer
**Context:** Auto-transcribe uploaded audio/video files.

**Copy/Paste Request:**
```markdown
You are an AI Engineer working on "Open Mool".
**Objective:** Build an auto-transcription pipeline for uploaded media.

**Tech Stack:**
- **AI:** Cloudflare Workers AI (`@cf/openai/whisper`) OR OpenAI Whisper API
- **Storage:** Cloudflare R2 (media files are already here)
- **Database:** Cloudflare D1 (add `transcript` column to `media` table)
- **Trigger:** R2 Event Notifications or a Queue

**Requirements:**
1.  **Schema Update:** Add a `transcript` column (TEXT, nullable) and a `processing_status` column (TEXT, default 'pending') to the `media` table.
2.  **Transcription Worker:** Create a worker (or Durable Object) that:
    - Listens for a trigger (new upload via Queue or R2 notification).
    - Fetches the audio/video from R2.
    - Sends to Whisper for transcription.
    - Stores the result back in D1.
3.  **Language Support:** Must handle Hindi, English, and ideally Pahadi dialects.
4.  **Status UI:** Update the "My Uploads" card to show processing status (Pending, Processing, Complete, Failed).

Start by outlining the architecture (trigger mechanism, queue vs. direct invocation).
```

---

## 🤖 Agent C: "The Oracle" (Discovery & Search) — **PRIORITY 3**
**Role:** Full Stack Engineer
**Context:** Building the public gallery and search experience.

**Copy/Paste Request:**
```markdown
You are a Full Stack Engineer working on "Open Mool".
**Objective:** Build the Explore Gallery and Semantic Search.

**Tech Stack:**
- **Frontend:** Next.js 14 (App Router), Tailwind CSS
- **Vector DB:** Cloudflare Vectorize
- **Embeddings:** OpenAI `text-embedding-3-small`
- **Audio Player:** Wavesurfer.js

**Requirements:**
1.  **Browse Gallery (`/explore`):**
    - Grid/list view toggle of all public archives.
    - Filters: media type, language, region.
    - Infinite scroll pagination.
2.  **Global Player:**
    - A persistent audio/video player component that continues playback across page navigations.
    - Waveform visualization for audio.
    - Synced transcript display (if available).
3.  **Semantic Search:**
    - Create an embedding index in Vectorize.
    - On new transcript, generate embedding and store.
    - Build `GET /api/search?q=...` that embeds the query and finds nearest neighbors.
    - Frontend: `Ctrl+K` command palette for search.

Start by designing the `/explore` page layout.
```

---

## 🤖 Agent D: "The Cartographer" (Map View) — **PRIORITY 3b**
**Role:** Frontend/GIS Engineer
**Context:** Building the geographic visualization of the archive.

**Copy/Paste Request:**
```markdown
You are a GIS/Frontend Engineer working on "Open Mool".
**Objective:** Build a Map View showing geolocated archives.

**Tech Stack:**
- **Maps:** Mapbox GL JS or deck.gl
- **Frontend:** Next.js 14, React
- **Data:** `media` table has `latitude` and `longitude` columns.

**Requirements:**
1.  **Map Page (`/explore/map`):**
    - A full-screen interactive map of the Himalayan region.
    - Cluster markers by region (Spiti, Kinnaur, Ladakh, etc.).
    - Clicking a marker shows a preview card of the media.
2.  **Filter Integration:**
    - Allow filtering by media type (audio, video, image).
    - Sync filters with the main `/explore` gallery.

Start by setting up the Mapbox GL integration and rendering the base map.
```
