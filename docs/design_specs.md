# Design & UI/UX Specifications: Open Mool

## Design Philosophy: "Himalayan Minimalism"
The aesthetic is a modern interpretation of Himalayan art - clean lines, high contrast, and ample white space, punctuated by sharp, intentional cultural accents. We avoid heavy textures and cluttered elements in favor of a breathable, gallery-like experience that lets the content (the stories) take center stage.

## 1. Visual Identity & Palette

**Theme Name:** "Snow & Vermilion"

We move to a clean, light-first foundation inspired by snow and blank parchment, using the traditional Aipan red and marigold as striking, minimal accents.

### Color System (CSS Variables)

**Backgrounds (The Canvas):**
- `--bg-canvas`: `#FFFFFF` (Pure Snow - Main UI background)
- `--bg-subtle`: `#F8F9FA` (Off-white/Glacial Ice - Secondary sections, cards)
- `--bg-dark`: `#121418` (Obsidian - For dark mode toggle or specific high-contrast sections)

**Accents (The Ink & Ritual):**
- `--accent-primary`: `#D64933` (Vermilion/Aipan Red - Primary CTA, sharp borders)
- `--accent-secondary`: `#FFB140` (Marigold - Highlights, subtle glows)
- `--accent-tech`: `#005F73` (Deep Teal - AI elements, data tags)

**Typography Colors:**
- `--text-primary`: `#1A1C20` (Charcoal Black - Main headings and body)
- `--text-secondary`: `#6B7280` (Stone Gray - Metadata, supporting text)

### Texture & Depth
- **Clean Slate:** No heavy noise or stone textures. Depth is achieved through super-subtle, large, soft shadows (`box-shadow: 0 20px 40px rgba(0,0,0,0.04)`) that make elements feel like they are floating on air.
- **The "Sutra" (Thread) Motif:** Use a single, thin Vermilion line (`1px solid --accent-primary`) that guides the user down the page - connecting sections like a timeline or a mountain path.

## 2. Typography (Bilingual & Modern)

**Concept:** "Ink, Stone, and Machine"

We need fonts that render Devanagari (Hindi/Garhwali) beautifully without looking like a generic government portal.

### Headings (The Inscription): Eczar (Google Font)
- **Why:** Designed specifically for Devanagari and Latin. It has sharp, calligraphic edges that look like they were written with a nib pen or carved into rock. High personality.
- **Usage:** H1, H2. `font-weight: 700`.

### Body (The Machine): Yantramanav (Google Font)
- **Why:** "Yantra" means Machine/Instrument. It is a grotesque sans-serif designed for bilingual data. It is geometric, structured, and fits the "AI" theme perfectly while remaining native to Devanagari.
- **Usage:** UI Labels, Transcripts, Buttons.

### Human Context (The Voice): Gotu (Google Font)
- **Why:** A rounded, humanist font that feels like a clean manuscript.
- **Usage:** Quotes from elders, names of villages, and cultural terms.

## 3. Character & Motion (The "Delight")

### A. The "Surya-Kiran" (Sun Ray) Loader
Instead of a spinner, we tell a micro-story.
1.  **Start:** A single thin charcoal line draws the outline of the Nanda Devi peak.
2.  **Middle:** A small Marigold (`#FFB140`) circle (The Sun) rises slowly behind the peak.
3.  **End:** The mountain line flattens out and ripples into an Audio Waveform, signaling the system is ready to "listen."
**Vibe:** Peaceful, distinctly Pahadi, yet minimal.

### B. Neo-Aipan Iconography
Standard icons feel too generic. We customize them.
- **Style:** Use Lucide-React (thin stroke), but add a single "Aipan Dot" (Solid Vermilion Circle) to the top right of every active icon.
- **Example:** A "User" icon isn't just a circle and arch; it has a small red bindi or dot near it, mimicking the geometric dot patterns of Aipan art.

## 4. Core UI Components

### A. The "Story Card" (Minimal Grid Item)
- **Shape:** Perfectly rectangular with very tight corner radii (`4px`).
- **State:**
    - **Idle:** Clean image. Title in Eczar.
    - **Hover:** A swift transform: `translateY(-4px)`. A thin `--accent-primary` border appears.
- **Tag:** Category tags (e.g., "Mythology") are pill-shaped but with a dotted border, referencing the rice-paste dots of folk art.

### B. The "Upload Node" (Submission Interface)
- **Vibe:** A modern "Digital Shrine."
- **Interaction:** The central button is a clean circle. On press, it gives a snappy `scale(0.95)` feedback.
- **Success State:** A "Marigold Garland" animation - a golden ring spins around the button and settles as a glowing border.

### C. Navigation
- **Desktop:** A minimalist sidebar. The active tab isn't just highlighted; it's connected to the content area by the "Sutra" (Vermilion line).
- **Mobile:** A frosted glass bottom bar (`blur(12px)`).

## 5. Frontend Implementation Guidelines
- **CSS:** Tailwind CSS.
- **Negative Space:** Use `gap-8` and `p-12` liberally. The whitespace represents the vastness of the mountains.
- **Images:** Apply a subtle "Morning Light" grade (Brightness +5%, Saturation +10%, slight warm tint) to unify user uploads.
