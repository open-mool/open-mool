# QA Checklist — dev-2 Release

Use this checklist for manual end-to-end testing before merging `dev-2` → `main`.
All items are grouped by feature/module. Mark `[x]` when verified.

---

## 1. Authentication (Clerk Migration)

> **Impacted files:** `middleware.ts`, `auth0.ts`, `sign-in/`, `sign-up/`, `sign-out/`, `Header.tsx`, `Profile.tsx`
> **Environment:** Local dev, Staging
> **Regression areas:** Every authenticated route, session persistence, header UI

### Happy Path
- [ ] Navigate to `/sign-in` — Clerk sign-in page renders correctly
- [ ] Sign in with valid credentials — redirected to `/dashboard`
- [ ] Navigate to `/sign-up` — Clerk sign-up page renders correctly
- [ ] Complete sign-up flow — account created, redirected to dashboard
- [ ] Header shows authenticated user's name and profile picture
- [ ] Navigate to `/sign-out` — session ends, redirected to home
- [ ] After sign-out, accessing `/dashboard` redirects to `/sign-in`

### Edge Cases
- [ ] Visit `/dashboard` without being signed in — proper redirect to sign-in
- [ ] Visit `/api/upload/presigned` without auth — returns 401
- [ ] Visit `/api/media/my-uploads` without auth — returns 401
- [ ] Refresh the page while signed in — session persists
- [ ] Sign in with OAuth provider (if configured) — verify profile data mapping

---

## 2. Upload Pipeline

> **Impacted files:** `upload/page.tsx`, `FileUploader.tsx`, `useMultipartUpload.ts`, `upload.ts` (API), `refinery.ts`
> **Environment:** Local dev (with wrangler), Staging
> **Regression areas:** Presigned URL generation, multipart upload, metadata save, background processing

### Happy Path
- [ ] Navigate to `/dashboard/upload` — upload page renders
- [ ] Upload a small audio file (< 25 MB) — presigned URL flow works, file uploads successfully
- [ ] Fill in metadata (title, description, language, location) — form validates correctly
- [ ] Complete upload — success response with `{ success: true, id: <number> }`
- [ ] Verify background refinery processes the file — check DB for `processed = 1`, transcription populated
- [ ] Upload a large file (> 100 MB) — multipart upload flow triggers correctly
- [ ] Upload retry — if a part fails, retry button appears and works

### Edge Cases
- [ ] Attempt to upload a file > 500 MB — client-side validation blocks with clear error
- [ ] Upload with missing title — error message shown
- [ ] Drop file via keyboard navigation (Enter/Space on dropzone) — opens file dialog
- [ ] Press Escape while dropzone is focused — focus releases properly
- [ ] Upload a non-media file (e.g., `.txt`) — uploads but transcription is skipped gracefully
- [ ] Network interruption during multipart upload — abort endpoint works, retry available

### File Validation
- [ ] File size displays correctly in error messages (proper decimal formatting)
- [ ] Unsupported file types show appropriate feedback
- [ ] Edge case: 0-byte file — handled gracefully

---

## 3. Explore Gallery

> **Impacted files:** `explore/page.tsx`, `api/media/explore/route.ts`, `media.ts` (API), `OracleSearch.tsx`
> **Environment:** Local dev, Staging
> **Regression areas:** Public vs authenticated access, media rendering, search

### Happy Path
- [ ] Navigate to `/explore` — gallery page renders with processed media items
- [ ] Audio items render with inline player — playback works
- [ ] Video items render with inline player — playback works
- [ ] Items display title, description, language, creation date
- [ ] Entity tags (deities, places, botanicals) display with correct colors
- [ ] Transcription snippets display in quotes for items that have them
- [ ] Pagination: scrolling or loading more items works if > 24 items exist

### Search & Filtering
- [ ] Search by text query — results filter correctly
- [ ] Filter by language — only matching items shown
- [ ] Filter by media type (audio/video) — correct filtering
- [ ] Combine search + language filter — both applied
- [ ] Empty search results — show appropriate empty state

### Oracle Search
- [ ] Oracle search component renders on explore page
- [ ] Enter a natural language query — semantic search returns relevant results
- [ ] Results ranked by relevance (vector similarity)
- [ ] No results for nonsense query — handled gracefully

### Edge Cases
- [ ] Explore page with zero media in database — empty state shown
- [ ] Item with very long title/description — truncated with `line-clamp`
- [ ] Item with no transcription — no transcription section shown
- [ ] Item with empty entity arrays — no tag sections shown
- [ ] Media file that has been deleted from R2 — `/api/media/file/:key` returns 404

---

## 4. Dark Mode / Theme Toggle

> **Impacted files:** `theme-toggle.tsx`, `theme-provider.tsx`, `layout.tsx`, `globals.css`
> **Environment:** All environments, All browsers
> **Regression areas:** Layout shift, hydration errors, CSS variable resolution

### Happy Path
- [ ] Default theme loads correctly on first visit
- [ ] Click theme toggle — switches between light/dark
- [ ] Dark mode: background, text, borders update via CSS variables
- [ ] Light mode: all styles revert correctly
- [ ] Refresh page — theme persists (localStorage)
- [ ] Icon changes: Sun in dark mode, Moon in light mode

### Edge Cases
- [ ] First load with no localStorage — no hydration mismatch error in console
- [ ] Fast toggle clicking — no visual glitches
- [ ] Browser DevTools: verify no `suppressHydrationWarning` console warnings
- [ ] Mobile: theme toggle is accessible and visible
- [ ] System preference change (OS light/dark) — respects `resolvedTheme`

---

## 5. My Uploads Dashboard

> **Impacted files:** `my-uploads/page.tsx`, `api/media/my-uploads/route.ts`
> **Environment:** Local dev, Staging (authenticated)
> **Regression areas:** Data fetching, auth context, entity display

### Happy Path
- [ ] Navigate to `/dashboard/my-uploads` — page renders for authenticated user
- [ ] Uploaded items display with title, description, status (Published/Processing)
- [ ] Transcription snippets visible where available
- [ ] Entity tags (deities, places, botanicals) display correctly
- [ ] Language and date display correctly

### Edge Cases
- [ ] User with zero uploads — empty state with "Upload Now" CTA
- [ ] Error fetching uploads — error state with "Refresh Page" link
- [ ] Unauthenticated access — redirected to sign-in

---

## 6. Guardian Profile

> **Impacted files:** `profile/page.tsx`
> **Environment:** Local dev, Staging (authenticated)
> **Regression areas:** Contribution count API, user data display

### Happy Path
- [ ] Navigate to `/dashboard/profile` — profile card renders
- [ ] User name, email, and avatar display correctly
- [ ] Contribution count shows the correct number
- [ ] "Disconnect" link logs the user out

### Edge Cases
- [ ] User with no profile picture — shows initial letter
- [ ] Contribution count API failure — returns 0 gracefully
- [ ] Unauthenticated access — redirected to sign-in

---

## 7. Artifact Detail Page

> **Impacted files:** `artifact/[id]/page.tsx`
> **Environment:** Local dev, Staging
> **Regression areas:** Dynamic routing, data fetching

### Happy Path
- [ ] Navigate to `/artifact/<valid-id>` — artifact detail renders
- [ ] Displays full artifact metadata

### Edge Cases
- [ ] Invalid ID — error state or 404
- [ ] ID of non-existent artifact — handled gracefully

---

## 8. API Endpoints

> **Impacted files:** `api/index.ts`, `media.ts`, `upload.ts`, `middleware/auth.ts`, `refinery.ts`
> **Environment:** Local dev (wrangler), Staging
> **Regression areas:** CORS, auth middleware ordering, R2 access

### Health & Public
- [ ] `GET /` — returns health check JSON
- [ ] `GET /media/explore` — returns paginated media (no auth required)
- [ ] `GET /api/media/file/:key` — serves media file with cache headers (no auth required)

### Protected
- [ ] `GET /api/media/my-uploads` — returns user's uploads (requires auth)
- [ ] `GET /api/media/count` — returns count for authenticated user
- [ ] `GET /api/media/search?q=` — returns vector search results (requires auth)
- [ ] `POST /upload/presigned` — generates presigned URL (requires auth)
- [ ] `POST /upload/complete` — saves metadata + triggers refinery (requires auth)
- [ ] `POST /upload/multipart/create` — creates multipart upload (requires auth)
- [ ] `PUT /upload/multipart/:id/part` — uploads part (requires auth)
- [ ] `POST /upload/multipart/:id/complete` — completes multipart (requires auth)
- [ ] `DELETE /upload/multipart/:id/abort` — aborts multipart (requires auth)

### Edge Cases
- [ ] CORS headers present on all responses
- [ ] Invalid JWT — returns 401
- [ ] Missing R2 credentials — returns 500 with clear error
- [ ] Database connection failure — returns 500

---

## 9. Build & Dependencies

> **Environment:** CI, Local dev
> **Regression areas:** TypeScript compilation, lockfile integrity

- [ ] `pnpm install` — completes without errors
- [ ] `pnpm build` (web) — builds successfully
- [ ] `pnpm build` (api) — no TypeScript errors
- [ ] No console warnings about missing environment variables during build (fallbacks configured)
- [ ] Verify `pnpm-lock.yaml` and `package-lock.json` are consistent

---

## 10. Cross-Cutting Concerns

- [ ] **Accessibility:** Upload dropzone navigable via keyboard (Tab, Enter, Space, Escape)
- [ ] **Mobile responsiveness:** Dashboard, explore, upload pages render correctly on mobile
- [ ] **Hydration:** No React hydration mismatch warnings in browser console
- [ ] **SEO:** Explore page has proper meta tags and heading structure
- [ ] **Performance:** Background refinery does _not_ block upload response time
