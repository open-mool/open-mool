# Changelog

All notable changes to Open Mool will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased] — dev-2

> Everything below is on `dev-2` and not yet merged to `main`.

### ⚠ Breaking Changes

- **Authentication migrated from Auth0 to Clerk.** All auth-related environment variables, middleware, and session handling have changed. Existing Auth0-based `.env` files will need to be replaced with Clerk credentials (`NEXT_PUBLIC_CLERK_*` variables). Sign-in/sign-up flows now use Clerk's hosted components at `/sign-in` and `/sign-up`.
- **API route paths restructured.** Protected endpoints moved under `/api/*` prefix (e.g., `/api/media/my-uploads`, `/api/media/count`, `/api/media/search`). Clients consuming the old paths directly will break.
- **Upload completion response simplified.** The `/upload/complete` endpoint now returns `{ success, id }` only — transcription and AI metadata are processed asynchronously in the background and no longer returned in the upload response.

---

### Added

- **Explore Gallery page** — Browse all processed media at `/explore` with search, language filtering, and media-type filtering. Includes inline audio/video playback and entity tag display (deities, places, botanicals).
- **Oracle Search component** — AI-powered semantic search interface for discovering archive content using natural language queries.
- **Refinery AI pipeline** — Background processing pipeline (`refinery.ts`) that handles Whisper transcription, Gemini embeddings, vectorize indexing, and entity extraction asynchronously after upload, improving upload response times.
- **Semantic search** — Vector-based search powered by Gemini embeddings and Cloudflare Vectorize, enabling meaning-based discovery across all media.
- **Whisper transcription** — Automatic audio/video transcription via Cloudflare Workers AI (`@cf/openai/whisper`) for uploaded media files under 25 MB.
- **Entity extraction (deities, places, botanicals)** — New `entities` database field for structured metadata, displayed as colored tags in the explore gallery and upload history.
- **Dark mode / theme toggle** — Full dark mode support with `next-themes`, localStorage persistence, hydration-safe rendering using `resolvedTheme`, and a polished toggle button in the header.
- **Clerk authentication** — JWT and signed-header auth middleware on the API, Clerk middleware on the web app, sign-in/sign-up/sign-out pages, and session-based user identification throughout.
- **Guardian profile upload count** — The profile card now displays the authenticated user's total contribution count fetched from the API.
- **Keyboard-accessible upload dropzone** — Full keyboard navigation support for the file upload area (Enter/Space to open file dialog, Escape to cancel focus).
- **Artifact detail page** — Individual artifact view at `/artifact/[id]` for deep-linking to specific media items.
- **Client-side file size limit** — 500 MB maximum enforced on the client with clear error feedback and human-readable size formatting.
- **Upload retry UI** — Failed multipart uploads can now be retried directly from the upload interface without starting over.
- **Explore media API endpoints** — Public `/media/explore` endpoint with pagination, filtering, and search; authenticated `/api/media/explore` and `/api/media/file/:key` for media serving with long-term caching.
- **Media uploads linked to users** — All uploads are now associated with the authenticated user via secure server-side proxy routes that prevent header spoofing.

### Changed

- **Upload processing is now asynchronous.** The refinery pipeline runs in the background via `executionCtx.waitUntil()` instead of blocking the upload response. Users see immediate confirmation while AI processing happens behind the scenes.
- **Theme toggle uses `resolvedTheme`** instead of `theme` for more reliable hydration-safe dark/light detection.
- **File upload validation refined** — Improved decimal logic for file size display in error cases, cleaner Copilot-reviewed code.
- **CONTRIBUTING.md simplified** — Quick-start guide updated to reflect Clerk-based auth setup and streamlined environment configuration.
- **Architecture and security docs updated** to reflect Clerk migration and new API structure.
- **Header component** updated with explore link, theme toggle integration, and Clerk user session display.

### Fixed

- Upload preview and callback typing issues resolved for better TypeScript safety.
- Profile page API path corrected and security improved for contribution count endpoint.
- Stale contribution count prevented with proper cache-busting (`cache: 'no-store'`).
- Mock login and incompatible route handler removed to prevent auth conflicts.
- ESLint build errors and TSX parse issues resolved across the web app.
- Auth0 session usage and Node runtime middleware issues fixed (in oracle branch, superseded by Clerk migration on dev-2).
- Layout shift prevented during theme toggle initialization with a placeholder element.
- Header background and dark mode refinements to prevent visual glitches.

### Removed

- **Auth0 SDK dependency removed** from the web app. The `@auth0/nextjs-auth0` package and all Auth0-specific configuration have been replaced by Clerk.
- **Build log artifact** (`apps/web/.turbo/turbo-build.log`) removed from version control.

### Chore

- Added Clerk and Jose auth dependencies (`@clerk/nextjs`, `jose`).
- Added `entities` field to `media` database schema (migration `0004`).
- Added `transcription` field to `media` database schema (migration `0003`).
- Workspace lint config and UI package eslint config updated.
- `next-themes` package added for dark mode support.
- `pnpm-lock.yaml` and `package-lock.json` updated with all new dependencies.

### Docs

- Auth references in documentation aligned with Clerk migration.
- Architecture and security docs updated.

---

### Conflict Resolutions (for QA reference)

| File | Resolution | Risk |
|------|-----------|------|
| `theme-toggle.tsx` | Took `resolvedTheme` fix (oracle), kept dev-2 styling | Low |
| `auth0.ts` | Kept Clerk-based implementation from dev-2 | Medium |
| `middleware.ts` | Kept Clerk middleware from dev-2 | Medium |
| `api/index.ts` | Merged new endpoints into Clerk-auth structure | Medium |
| `api/routes/media.ts` | Combined both explore endpoints, kept auth pattern | Medium |
| `api/routes/upload.ts` | Took oracle's background refinery, kept Clerk auth | High |
| `upload/complete/route.ts` | Kept dev-2's Clerk-compatible proxy | Low |
| `upload/presigned/route.ts` | Kept dev-2's Clerk-compatible proxy | Low |
| `explore/page.tsx` | Took oracle's richer implementation (entity tags, playback) | Medium |
| `my-uploads/page.tsx` | Kept dev-2 version | Low |
| `profile/page.tsx` | Kept dev-2's authenticated count endpoint | Low |
| `AudioPreview.tsx` / `VideoPreview.tsx` | Trivial type order — kept dev-2 | Low |
