---
name: resume-render-web
description: Render an approved resume_content.md to an interactive React web resume (Vite), with local preview and GitHub Pages deploy modes. Use when producing, previewing, or deploying the web resume.
---

## Overview

This skill builds production-ready React web resumes from an approved `resume_content.md` file (YAML frontmatter + Markdown). It is invoked by the `swiss-tech-resume-builder` orchestrator skill after content approval, or directly via `/preview-web-resume {id}`.

> **Author-only — not bundled in the distributed plugin (v0.1.0).** This skill
> depends on a Vite/React app at `resumes/web-builder/` (`package.json`, `src/`,
> `npm run build`) that is **not version-controlled** and therefore does **not**
> ship with the `swiss-tech-resume-builder` plugin. Before doing anything else,
> verify the app exists: if `resumes/web-builder/package.json` is absent, **stop
> and report** that web rendering is not included in this release and point the
> user to the PDF pipeline (`resume-render-pdf`). Do not attempt `npm run build`
> against a missing app. Web rendering is supported only in the author's source
> repository until the app is bundled or scaffolded in a future release.

## Documentation Resources

- **Web Resume Style Guide**: `docs/style-guide/web/WEB_RESUME_STYLE_GUIDE.md`
  - Visual design system (colors, typography, layout)
  - Component specifications (React/TypeScript)
  - Responsive design guidelines (WCAG AA)
  - Performance benchmarks and print stylesheet guidelines
- **Shared Design System**: `docs/style-guide/DESIGN_SYSTEM.md`
- **Content Format Reference**: `resumes/web-builder/docs/WEB_RESUME_CONTENT_FORMAT.md`
- **Component Examples**: `resumes/web-builder/docs/COMPONENT_EXAMPLES.md`

---

## Operating Modes

### `preview` mode
- Builds locally and serves at `http://localhost:4173/CV-pages/`
- No credentials required
- Safe to run repeatedly during iteration
- Also exposed via the `/preview-web-resume {id}` slash command

### `deploy` mode
- Builds and publishes to the private `CV-pages` repository (`gh-pages` branch)
- **Requires the `CV_PAGES_TOKEN` environment variable** — if unset, report the error and fall back to `preview` mode
- Run only once per approved content version
- Resulting URL: `https://datarian.github.io/CV-pages/cv/{semantic_id}` (private — share only with intended recipients)

**CRITICAL — Web build privacy:** Web builds NEVER exist in the base repository. All building happens in a temporary working location and is cleaned up immediately after each operation. Build outputs are gitignored and must never be committed to this repo.

---

## Build Steps

**Input:**
- Source: `resumes/customized/{id}/resume_content.md` (YAML + Markdown)
- Working directory: `resumes/web-builder/` (React/Vite project root)

**Step 1 — Copy content to public folder:**
```bash
cp resumes/customized/{id}/resume_content.md resumes/web-builder/public/resume_content.md
```

**Step 2 — Run Vite build:**
```bash
cd resumes/web-builder
npm run build
```

**Step 3 — Verify build:**
- Check `dist/index.html` exists
- Verify assets are hashed
- Confirm `vite.config.ts` has `base: '/CV-pages/'`

**Step 4a — Preview mode** (serve locally):
```bash
npm run preview   # → http://localhost:4173/CV-pages/
```

**Step 4b — Deploy mode** (publish to CV-pages):
1. Generate the semantic ID: `{date}_{company_lowercase}_{content_hash}`
2. Push the build to the `CV-pages` `gh-pages` branch under `cv/{semantic_id}`
3. Report the shareable URL: `https://datarian.github.io/CV-pages/cv/{semantic_id}`

**Step 5 — Clean up:**
- Remove the copied `public/resume_content.md`
- Remove the temporary `dist/` build output
- Nothing is committed to the base repo

**Step 6 — Report result:**
```
Web resume [previewed|deployed] successfully
Preview: http://localhost:4173/CV-pages/           (preview mode)
URL:     https://datarian.github.io/CV-pages/cv/{semantic_id}   (deploy mode)
```

### Example command sequence (preview mode)
```bash
cp resumes/customized/2025_11_10_quantumbasel_ai_specialist/resume_content.md \
   resumes/web-builder/public/

cd resumes/web-builder
npm run build
ls -la dist/
npm run preview
# Open http://localhost:4173/CV-pages/

rm public/resume_content.md
```

---

## Component Structure

```
resumes/web-builder/src/
├── components/
│   ├── ResumeHeader.tsx        # Name, title, contact info
│   ├── ProfessionalSummary.tsx # Enhanced summary with highlights
│   ├── ExperienceSection.tsx   # Work history with achievements
│   ├── SkillsSection.tsx       # Technical skills grid
│   ├── EducationSection.tsx    # Academic background
│   └── ProjectsSection.tsx     # Portfolio projects (if present)
├── types/
│   └── resume.ts               # TypeScript interfaces (includes Highlight)
├── utils/
│   ├── parseResume.ts          # YAML + Markdown parser
│   └── extractHighlights.ts    # Auto-extract metrics from summary
├── App.tsx                     # Main app component
├── main.tsx                    # Entry point
└── index.css                   # Global styles + Tailwind
```

---

## Professional Summary Component

The `ProfessionalSummary` component has enhanced highlight extraction with manual override support.

### Features
1. **Markdown rendering**: Summary text supports `**bold**` (blue) and `*italic*` (coral) formatting
2. **Two-column layout**: Summary text (left) + Highlight cards (right) on desktop
3. **Auto-extraction**: Automatically extracts key metrics (years, counts, percentages) from summary text
4. **Manual override**: Optional YAML `summary_highlights` field for precise control

### YAML schema for manual highlights
```yaml
---
# OPTIONAL: Manual summary highlights (auto-extracted if omitted)
summary_highlights:
  - metric: "8+ Years"
    label: "ML Engineering"
    icon: "calendar"
  - metric: "1M+"
    label: "Daily Requests"
    icon: "activity"
  - metric: "99.9%"
    label: "Uptime"
    icon: "target"
---
```

### Available icons
| Name | Use for |
|------|---------|
| `calendar` | Years, tenure, duration |
| `activity` | Scale, throughput, volume |
| `target` | Accuracy, precision, percentages |
| `trending` | Improvements, growth |
| `users` | Team size, user counts |
| `zap` | Performance, speed |
| `award` | Achievements, recognition |
| `clock` | Time-related metrics |

### Auto-extraction patterns
- **Years of experience**: matches `8+ years`, `10 years` → label "Experience", icon "calendar"
- **Large numbers with units**: matches `1M+`, `500K+` → label from trailing word or "Scale", icon "activity"
- **Percentages**: matches `99.9% uptime` → label from trailing word, icon "target"
- Maximum 4 highlights extracted

### Color configuration (`tailwind.config.js`)
```javascript
theme: {
  extend: {
    colors: {
      'cv-blue':  '#2C5F7F',   // Primary brand (WCAG AA compliant)
      'cv-coral': '#E87461',   // Italic text, hover accents
      'cv-gray':  '#4A4A4A',   // Secondary text
      'cv-light': '#F5F5F5',   // Background
    }
  }
}
```

### Key dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-markdown": "^9.0.1",
  "lucide-react": "^0.263.1",
  "gray-matter": "^4.0.3"
}
```

---

## Design Principles

### Responsive design
- Mobile-first: readable at 375px (iPhone SE)
- Touch targets: minimum 44×44px for links/buttons
- Fluid typography: rem units for scalability
- Grid layouts: stack on mobile, multi-column on desktop

### Print optimization
- `@media print` styles for browser print-to-PDF
- Avoid page breaks inside sections
- High-contrast black text for printing
- Hide navigation and footer in print

### Accessibility (WCAG AA)
- Color contrast: 4.5:1 for body text, 3:1 for large text
- Semantic HTML with proper heading hierarchy (h1 → h2 → h3)
- ARIA labels where HTML semantics are insufficient
- All interactive elements keyboard-focusable

### Performance targets
- Bundle size: <500kb total
- Load time: <2 seconds on 3G
- Asset hashing for cache busting

---

## Common Build Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| `Cannot find module 'resume_content.md'` | File not copied to `public/` | Run copy step before build |
| Assets 404 after deploy | Vite base path mismatch | Ensure `vite.config.ts` has `base: '/CV-pages/'` |
| Page blank after build | JavaScript runtime error | Check browser console; fix React component issue |
| Markdown not rendering | YAML parse error in `parseResume.ts` | Validate frontmatter syntax; check section headers |
| Print styles not applying | Missing `@media print` rules | Check `index.css` print styles are present |

---

## Quality Checklist

Before finalizing a build:
- [ ] Build completes without errors
- [ ] Preview loads correctly (`npm run preview`)
- [ ] Mobile responsive (test at 375px width)
- [ ] Print to PDF works (Cmd+P in browser)
- [ ] All links functional (mailto, tel, external)
- [ ] Markdown bold/italic rendering correctly
- [ ] Color contrast passes WCAG AA
- [ ] Bundle size <500kb
- [ ] Assets in `dist/assets/` are hashed
- [ ] Footer GitHub link present (not in print)

---

## Handling Feedback

When visual QA feedback is received:
1. Identify affected components in `src/components/`
2. Update component files (Tailwind classes or CSS)
3. Rebuild: `npm run build`
4. Re-serve the preview: `npm run preview`
5. Report result for re-review

Maximum 3 iterations to prevent endless loops.

---

## Adding a New Section

1. Create `src/components/NewSection.tsx`
2. Import and mount in `App.tsx`
3. Add TypeScript types to `types/resume.ts`
4. Update parser in `utils/parseResume.ts`
