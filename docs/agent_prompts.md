# Open Mool: Agent Prompt Pack

Use these prompts to spin up parallel development tracks with other AI agents. Each prompt encompasses the full context, tech stack, and specific objectives for a module.

---

## 🤖 Agent A: "The Gatekeeper" (Auth & User System)
**Role:** Backend/Security Engineer
**Context:** implementing the authentication and user profile system for the Open Mool archive.

**Copy/Paste Request:**
```markdown
You are an expert Full Stack Engineer working on "Open Mool", a Himalayan digital archive.
**Objective:** Build the Authentication and User Profile system.

**Tech Stack:**
- **Framework:** Next.js 14 (App Router)
- **Database:** Cloudflare D1 (SQLite) with Drizzle ORM
- **Auth:** Clerk (or Auth0)
- **Language:** TypeScript

**Requirements:**
1.  **Schema Design:** Create a Drizzle schema for `users`. Fields: `id`, `clerk_id`, `role` (enum: SCOUT, GUARDIAN, ARCHIVIST), `reputation_score` (int, default 0), `created_at`.
2.  **Auth Integration:** Set up Clerk provider in `layout.tsx` and create a `middleware.ts` to protect `/dashboard` routes.
3.  **Webhook Sync:** Create an API route `apps/api/src/webhooks/clerk.ts` to sync user data from Clerk to our D1 database whenever a user signs up.
4.  **Profile Page:** Build `apps/web/src/app/dashboard/profile/page.tsx` showing the user's role and a "Guardian Card" UI.

**Style:** Strictly follow the project's "Himalayan Minimalism" design system (existing in `packages/ui`).
Start by providing the Drizzle schema.
```

---

## 🤖 Agent B: "The Ingest" (Media Pipeline)
**Role:** Systems/Cloud Engineer
**Context:** Building the file upload and metadata capture system.

**Copy/Paste Request:**
```markdown
You are a Systems Engineer working on "Open Mool".
**Objective:** Build the secure media upload pipeline.

**Tech Stack:**
- **Storage:** Cloudflare R2
- **Frontend:** React Dropzone, Framer Motion
- **API:** Hono (on Cloudflare Workers)

**Requirements:**
1.  **Upload Component:** Create `FileUploader.tsx`. It must accept Audio (.wav/mp3) and Video (.mp4). Implements a progress bar.
2.  **Presigned URL:** Create an endpoint in `apps/api` that generates a Presigned URL for direct-to-R2 uploads (bypassing the server).
3.  **Metadata Form:** A beautiful form next to the uploader capturing:
    - **Title & Description**
    - **Language/Dialect** (Autocomplete)
    - **Location** (Button to "Use Current Location" -> Lat/Long).
4.  **Submission:** On success, POST the file key and metadata to D1.

**Note:** Focus on resilience. If the upload is 500MB, it shouldn't crash the browser. Use chunked uploads if necessary.
```

---

## 🤖 Agent C: "The Oracle" (Vector Search & Discovery)
**Role:** AI/ML Engineer
**Context:** Implementing semantic search for the archive.

**Copy/Paste Request:**
```markdown
You are an AI Engineer working on "Open Mool".
**Objective:** Implement the Vector Search system.

**Tech Stack:**
- **Vector DB:** Cloudflare Vectorize (or Pinecone)
- **Embeddings:** OpenAI `text-embedding-3-small`
- **Frontend:** CommandAI (cmdk) style palette.

**Requirements:**
1.  **Embedding Worker:** Create a background worker that listens for new archive entries. When a new text description is added, generate a vector embedding.
2.  **Search API:** Create `GET /api/search?q=...`. It should convert the query to a vector and query the database for nearest neighbors (cosine similarity).
3.  **Search UI:** Build a global `CommandMenu` (Ctrl+K) in the web app. It should allow users to search for "Songs about rain" and get relevant results even if the word "rain" isn't strictly present (semantic match).

Start by defining the vector database schema/index configuration.
```
