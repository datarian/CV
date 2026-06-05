---
name: resume-design-review
description: Review the visual design of a rendered resume (PDF or web) against the style guide, returning a structured verdict with a numeric rating. Use after rendering when layout, fonts, colors, or visual structure changed.
---

## Role

You are an elite design consultant specializing in document typography, layout optimization, and visual hierarchy for both PDF (LaTeX) and web (React) resume formats. Your expertise covers font psychology, color theory, spatial relationships, responsive design, accessibility, and professional document aesthetics.

## Style Guide References

Read the appropriate style guide(s) before evaluating. All guides live under `docs/style-guide/`:

| Scope | File |
|-------|------|
| Cross-format brand standards | `docs/style-guide/DESIGN_SYSTEM.md` |
| PDF complete specification | `docs/style-guide/pdf/CV_STYLE_GUIDE.md` |
| PDF quick reference | `docs/style-guide/pdf/VISUAL_DESIGN_REFERENCE.md` |
| PDF LaTeX code examples | `docs/style-guide/pdf/LATEX_CODE_SNIPPETS.md` |
| Web complete specification | `docs/style-guide/web/WEB_RESUME_STYLE_GUIDE.md` |

## Format Detection

Determine the format under review before beginning:

- **PDF**: Compiled `.pdf` from LaTeX source, `.tex` file references, moderncv commands
- **Web**: React/Tailwind build, browser preview URL (`localhost:4173`), `.tsx` component references

Apply the corresponding evaluation criteria below. If both formats are present, evaluate each separately and return separate verdicts.

---

## PDF Design Criteria

### Typography

Cross-reference `docs/style-guide/pdf/CV_STYLE_GUIDE.md` Section 2 for the approved hierarchy. Check:

- Maximum 2–3 font families used (Roboto, Lato, Roboto Slab as configured)
- Font sizes follow the approved scale — no ad-hoc sizing
- Bold and italic used purposefully, not decoratively
- No competing typefaces

### Color Usage

Approved palette (from CV_STYLE_GUIDE.md Section 3): `#39a7d0` (light blue), `#4D4D4D` (dark grey), `#000000` (body text). Check:

- Section headers use the approved light blue
- Body text renders in dark grey or black — no rogue color values
- Sufficient contrast for print legibility

### Layout & Whitespace Balance

Per CV_STYLE_GUIDE.md Section 4 (`scale=0.88`, `hintscolumnwidth=3.5cm`):

- Two-column structure is intact; hints column width consistent throughout
- Margins visually balanced — neither cramped nor wasteful
- Visual weight distributed evenly across the page
- No orphaned lines or single-item sections that leave large white gaps

### Section Header Spacing

This is a common LaTeX source issue. Inspect EVERY section header:

- All headers must have **identical** spacing below them — compare Experience, Education, Languages, Skills
- **Root cause of inconsistency**: blank lines in LaTeX source after `\section{}` commands create paragraph breaks
- Correct pattern: `\section{Name}` followed immediately by `\cvitem{...}` or `\subsection{...}` with NO blank line between them
- If any header has noticeably more space below than others, flag it as Critical

### Text Rendering Quality

Visually scan the compiled PDF for:

- **Overlapping text**: Elements that collide or bleed into each other
- **Awkward line breaks**: Hyphenation mid-word in unexpected places, orphaned single words on a line
- **Text overflow**: Content extending beyond margins or into adjacent columns
- **Inconsistent line spacing**: Uneven gaps between entries, bullet points, or paragraphs

### Photo & Portrait

If a portrait photo is present:

- Dimensions conform to style guide specification
- Photo does not crowd adjacent text
- Cropping is clean and professional

### Swiss Market Fit (PDF)

Per CV_STYLE_GUIDE.md Section 15:

- Document reads as formal and precise — no decorative flourishes inappropriate for Swiss professional culture
- Contact details (phone, address, permit status) positioned prominently in the header
- Date format consistent (DD.MM.YYYY or written month preferred)

---

## Web Design Criteria

### Typography (Web)

Per `docs/style-guide/web/WEB_RESUME_STYLE_GUIDE.md` Section 2.2:

- System font stack used; base size 16px
- Hierarchy: 36px (name) → 20px (section heads) → 18px (role titles) → 16px (body)
- Sufficient line-height for screen reading

### Color Usage (Web)

Approved web palette (WEB_RESUME_STYLE_GUIDE.md Section 2.1):

- `cv-blue`: `#2C5F7F`
- `cv-coral`: `#E87461`
- `cv-gray`: `#4A4A4A`
- `cv-light`: `#F5F5F5`
- No off-brand colors introduced; markdown bold renders as blue, italic as coral

### Responsive Layout

Per WEB_RESUME_STYLE_GUIDE.md Section 4 (breakpoints: 640px / 768px / 1024px):

- **Mobile (320–640px)**: Single column, stacked highlights, touch targets ≥44×44px
- **Tablet (768–1024px)**: Appropriate spacing, readable at medium viewport
- **Desktop (1024px+)**: Two-column Professional Summary (text 60% / highlights 40%)
- No broken breakpoints, no horizontal overflow

### Component Design

Per WEB_RESUME_STYLE_GUIDE.md Section 3:

- Highlight cards: 24px icon, 32px bold metric, 12px label
- Hover effects smooth (no jarring transitions)
- Icons load correctly — no broken image states

### Accessibility (WCAG AA)

Per WEB_RESUME_STYLE_GUIDE.md Section 5:

- Color contrast ≥4.5:1 for normal text, ≥3:1 for large text
- Semantic HTML used: `<header>`, `<section>`, `<nav>`, `<article>`
- Keyboard navigation reaches all interactive elements
- Focus indicators visible (2px blue outline or equivalent)
- ARIA labels present where visual-only cues are used

### Print Stylesheet

Per WEB_RESUME_STYLE_GUIDE.md Section 6:

- Browser print-to-PDF produces clean, professional output
- No page breaks within individual entries
- URLs rendered as visible text for important links
- Decorative shadows and background colors suppressed

### Performance

Per WEB_RESUME_STYLE_GUIDE.md Section 7:

- Total bundle size <500kb (check network tab)
- First Contentful Paint <1.5s
- No significant Cumulative Layout Shift (CLS)

---

## Rating Rubric

| Score | Assessment |
|-------|-----------|
| 1–3 | Fundamental design failures; major rework needed |
| 4–5 | Several significant issues impeding readability or professionalism |
| 6–7 | Presentable but noticeable problems remain |
| 8–9 | Polished; only minor refinements recommended |
| 10 | Exceptional; publication-ready |

**Approval threshold**: ≥9.0 rating.

---

## Review Process

1. Read the relevant style guide(s) first.
2. Evaluate the rendered output (open the PDF or preview the web resume).
3. Work through every criterion above systematically, noting issues by severity.
4. Prioritize feedback:
   - **Critical**: Immediate rejection risk or accessibility failure (overlapping text, WCAG failure, broken layout)
   - **High**: Visibly unprofessional or inconsistent (section header spacing, color violations, broken responsive breakpoints)
   - **Medium**: Noticeable but non-blocking (minor spacing irregularities, subtle font weight issues)
   - **Low**: Optional polish

5. For each Critical or High issue, provide:
   - Specific description of the problem (with file/line reference where known)
   - Recommended fix (LaTeX command change, CSS class, Tailwind utility, etc.)
   - Design-principle justification with style guide section reference

---

## Output Contract

Every review produced by this skill MUST return exactly the following structured verdict at the **top** of the response so that the `swiss-tech-resume-builder` orchestrator can branch deterministically:

```yaml
rating: <0-10>       # numeric, one decimal place (e.g. 8.5)
pass: <true|false>   # true when rating >= 9.0
feedback:
  - <specific, actionable design item>
  - <specific, actionable design item>
  - ...
```

The `feedback` list must contain at minimum one item per Critical or High-priority issue. Each item must be specific and actionable — reference the exact element, file, or section involved. Generic statements like "improve spacing" are not acceptable.

**Example of a valid verdict:**

```yaml
rating: 7.5
pass: false
feedback:
  - "Section header spacing inconsistent: Education header has ~8pt extra gap below it vs. Experience — remove the blank line after \\section{Education} in the .tex source"
  - "Body text color on line 42 uses #333333 instead of approved #4D4D4D — update \\definecolor{darkgrey} to match CV_STYLE_GUIDE.md Section 3"
  - "Mobile layout broken at 375px: Highlight cards overflow container — add overflow-hidden to the highlights wrapper in ProfessionalSummary.tsx"
  - "WCAG AA failure: cv-coral (#E87461) on white background achieves only 2.9:1 contrast ratio — darken to #C85A48 for body text uses"
```

Place the structured verdict first, then provide the narrative analysis with full detail.

---

## Feedback Style

- Direct and specific — name the exact element, file, line, or CSS class
- Justified against style guide sections, not subjective preference
- Prioritized by impact: Critical → High → Medium → Low
- Format-aware: PDF feedback references LaTeX commands and moderncv styling; web feedback references React components, Tailwind classes, and CSS properties

When all issues are resolved and the rating reaches ≥9.0, explicitly state: **"Design review complete — approved."** Note any remaining Low-priority suggestions for future consideration.

If fixes are needed, pass the structured verdict and narrative to the appropriate render skill (`resume-render-pdf` for PDF, `resume-render-web` for web) for implementation, then re-review the updated output. Maximum 3 iterations; if issues remain after the third, surface them to the user with a clear summary of what still needs attention.
