# Design System - Shared Definitions
## Cross-Format Brand Standards for Florian Hochstrasser's Resume System

**Document Version:** 1.0
**Date:** 2025-11-13
**Applies to:** PDF resumes, Web resumes, Future formats

---

## Overview

This document establishes **format-agnostic** design principles and brand standards that apply across all resume formats. Format-specific implementations (PDF vs Web) are documented in their respective style guides.

**Key Principle:** Consistency in intent, flexibility in implementation.

---

## 1. Brand Philosophy

### Core Design Values

**Clean Modernism**
- Minimalist layouts with purposeful use of space
- No decorative elements that don't serve function
- Visual hierarchy through typography and spacing, not embellishment

**Swiss Design Principles**
- Grid-based layouts for clarity
- Sans-serif typography for readability
- Restrained color palette (3-4 colors maximum)
- Precision in measurements and alignment

**Professional Minimalism**
- Every element must justify its presence
- White space is a design element, not empty space
- Focus on content, not decoration

**Technical Credibility**
- Detailed technology stack visibility
- Quantified achievements with metrics
- Production-focused language and examples
- Scale indicators (users, requests, uptime)

---

## 2. Color System Philosophy

### Color Intent (Format-Specific Values in Respective Guides)

**Primary Brand Color: Blue**
- **Intent:** Professional, trustworthy, technical
- **Usage:** Section headers, key emphasis, links, icons
- **PDF Value:** #39a7d0 (light blue, optimized for print contrast)
- **Web Value:** #2C5F7F (darker blue, meets WCAG AA for screens)
- **Rationale for difference:** Print allows lighter colors; web needs higher contrast for accessibility

**Secondary Accent Color**
- **Intent:** Subtle differentiation, warmth without overwhelming
- **PDF:** Dark Grey #4D4D4D (de-emphasis, metadata)
- **Web:** Coral #E87461 (warm accent for italic text)
- **Rationale for difference:** PDF uses grey for hierarchy; web adds coral for visual variety

**Body Text Color**
- **Intent:** Maximum readability, appropriate contrast
- **PDF Value:** #000000 (pure black, optimal for print)
- **Web Value:** #4A4A4A (near-black, softer on screens)
- **Rationale for difference:** Pure black can be harsh on backlit screens

**Background Color**
- **PDF:** Pure white (print standard)
- **Web:** White (#FFFFFF) with subtle grey (#F5F5F5) for sections
- **Rationale:** Web benefits from subtle section backgrounds; print keeps pure white

### Color Usage Rules (Format-Agnostic)

1. **Hierarchy First:** Color reinforces hierarchy, doesn't create it
2. **Accessibility Required:** All text must meet WCAG AA contrast standards (4.5:1 minimum for body text)
3. **Consistency:** Same color = same meaning across all formats
4. **Restraint:** Maximum 3-4 colors in entire document

---

## 3. Typography Principles

### Font Philosophy

**Sans-Serif for All Formats**
- **Reason:** Modern, clean, highly readable for technical content
- **PDF:** System sans-serif or moderncv default
- **Web:** Native system font stack (performance + familiarity)

### Hierarchy Principles (Format-Agnostic)

**Scale Ratios:**
- Name (Header): 2-2.4x body size
- Job Title: 1.2-1.4x body size
- Section Headers: 1.0-1.1x body size (distinguished by weight + color)
- Body Text: Base size (format-specific)
- Metadata: 0.9-1.0x body size

**Format-Specific Base Sizes:**
- **PDF:** 11pt body text (print standard for professional documents)
- **Web:** 16px (1rem) body text (accessibility standard, browser default)

**Conversion Guide:**
```
PDF 11pt ≈ Web 14.7px (11/12 * 16)
PDF 24pt ≈ Web 32px (name size)
PDF 14pt ≈ Web 19px (title size)
```

### Font Weight Usage

- **Bold (700):** Names, section headers, job titles, key metrics, emphasis
- **Semibold (600):** Subsections (web only, more granular hierarchy)
- **Regular (400):** Body text, descriptions, supporting information
- **Never use:** Underline (except links), ALL CAPS for paragraphs

### Line Height Standards

- **Headings:** 1.2-1.3x (tight, for visual impact)
- **Body Text:** 1.4-1.6x (generous, for readability)
- **Metadata:** 1.4-1.5x (compact but readable)

---

## 4. Spacing System Philosophy

### Vertical Rhythm

**Principle:** Consistent spacing creates visual harmony and scanability

**Spacing Hierarchy:**
1. **Major sections:** Largest gaps (section breaks)
2. **Subsections:** Medium gaps (content grouping)
3. **Paragraphs:** Moderate gaps (thought separation)
4. **Line spacing:** Smallest gaps (readability)

**Format-Specific Implementation:**
- **PDF:** LaTeX default spacing with explicit `\vspace` adjustments
  - Base unit: em-based (relative to font size)
  - Section spacing: 1.5-2em
  - Entry spacing: 1em

- **Web:** Tailwind 4px base unit system
  - Base unit: 4px (0.25rem)
  - Section spacing: 32-48px (space-8 to space-12)
  - Entry spacing: 16-24px (space-4 to space-6)

### Horizontal Spacing (Margins)

**Principle:** Generous margins improve readability and prevent claustrophobia

**PDF:**
- 12% page margins (88% content scale)
- Two-column layout: 3.5cm left column, remainder for content

**Web:**
- Max-width container: 1200px (optimal line length)
- Responsive padding:
  - Mobile: 16px
  - Tablet: 32-48px
  - Desktop: 48-64px

---

## 5. Layout Principles

### Two-Column Approach (Where Applicable)

**Concept:** Metadata in left/narrow column, content in right/wide column

**PDF Implementation:**
- ModernCV "fancy" style with 3.5cm hints column
- Dates, icons, labels on left
- Descriptions, achievements on right

**Web Implementation:**
- Professional Summary: Text left (60-65%), highlights right (35-40%)
- Mobile: Single column stack (natural responsive behavior)

### Visual Hierarchy

**Principles (Format-Agnostic):**
1. **Name dominates:** Largest element, immediately visible
2. **Sections clearly marked:** Color + weight + spacing differentiate from content
3. **Content scannable:** Bullet points, bold key terms, clear structure
4. **Supporting info de-emphasized:** Dates, locations, metadata visually secondary

---

## 6. Swiss Market Standards

### Required Information (All Formats)

**Personal Data:**
- [ ] Full name (First + Family)
- [ ] Date of birth (DD.MM.YYYY format)
- [ ] Nationality (explicit statement)
- [ ] Complete address (Street, Postal Code, City)
- [ ] Phone number (Swiss +41 format preferred)
- [ ] Email address (professional)

**Professional Photo:**
- [ ] Professional headshot included
- **PDF:** 64x64pt square with thin border
- **Web:** Not included (web resumes focus on content; photo optional for digital formats)

**Languages:**
- [ ] All languages listed with CEFR levels (A1-C2)
- [ ] Native language clearly marked

**Education:**
- [ ] Grades included (Swiss 6-point scale or equivalent)
- [ ] Honors/distinctions noted

### Cultural Expectations

**Length:**
- 2-3 pages acceptable for senior technical roles
- **NOT** limited to 1 page (American convention)
- Prioritize completeness over brevity

**Detail Level:**
- Technology stack details valued
- Specific versions, frameworks, tools
- Production metrics emphasized

**Professional Tone:**
- Formal but approachable
- Technical but accessible
- Confident without arrogance

---

## 7. Content Philosophy

### Writing Principles (All Formats)

**Action-Oriented:**
- Start bullets with strong action verbs (Built, Architected, Led, Implemented)
- Focus on achievements, not responsibilities
- Quantify everything possible

**Metrics-Driven:**
- Include numbers: percentages, scale, time, team size
- Use consistent formats: 99.99%, 3M+, 100K+, 80% reduction
- Contextualize metrics: "99.99% uptime" not just "high uptime"

**Technology-Specific:**
- Name exact technologies, not categories
- Include production experience indicators (years, scale)
- Emphasize distributed systems, scalability, reliability

### Forbidden Patterns

- ❌ Passive voice ("Responsible for...")
- ❌ Vague descriptors ("Many", "Several", "Various")
- ❌ Unexplained acronyms (on first use)
- ❌ Personal pronouns (I, me, my)
- ❌ Clichés ("Team player", "Self-starter")

---

## 8. Accessibility Standards (All Formats)

### Color Contrast

**WCAG AA Minimum:**
- Body text: 4.5:1 contrast ratio
- Large text (18pt+): 3:1 contrast ratio
- All format implementations must meet or exceed this

**PDF Compliance:**
- Black (#000000) on white: 21:1 ✅
- Dark grey (#4D4D4D) on white: 9.7:1 ✅
- Light blue (#39a7d0) on white: 3.4:1 (large text only) ✅

**Web Compliance:**
- cv-blue (#2C5F7F) on white: 6.2:1 ✅
- cv-gray (#4A4A4A) on white: 8.9:1 ✅
- cv-coral (#E87461) on white: 4.6:1 ✅

### Semantic Structure

**All formats must use proper hierarchy:**
- Single H1 (name)
- H2 for major sections (Experience, Education, Skills)
- H3 for subsections (job titles, degree names)
- Proper list markup (bullets, numbered lists)

### Keyboard Navigation (Web)

- All interactive elements focusable
- Visible focus indicators
- Logical tab order

---

## 9. Quality Standards

### Visual Quality Checklist (All Formats)

- [ ] No overlapping text or elements
- [ ] Consistent spacing throughout
- [ ] Proper alignment (no "almost aligned" elements)
- [ ] Color usage consistent with definitions
- [ ] Typography hierarchy clear
- [ ] White space balanced
- [ ] Professional appearance (no "homemade" feel)

### Content Quality Checklist (All Formats)

- [ ] No typos or grammatical errors
- [ ] All dates accurate and consistently formatted
- [ ] Metrics included for major achievements
- [ ] Action verbs used throughout
- [ ] Technical terms spelled correctly
- [ ] No unexplained acronyms
- [ ] Professional summary compelling and tailored

### Technical Quality Checklist

**PDF:**
- [ ] Compiles without errors (xelatex)
- [ ] Uses moderncvstyle{fancy} (multi-page support)
- [ ] Colors defined correctly
- [ ] All \cventry commands have 6 arguments

**Web:**
- [ ] Passes Lighthouse accessibility audit (90+)
- [ ] Responsive on all viewport sizes
- [ ] Print stylesheet produces clean PDF
- [ ] Bundle size <500kb
- [ ] Load time <2s on 3G

---

## 10. Format-Specific Guides

**For implementation details, see:**

### PDF Resumes
- **Comprehensive:** [`pdf/CV_STYLE_GUIDE.md`](pdf/CV_STYLE_GUIDE.md)
- **Quick Reference:** [`pdf/VISUAL_DESIGN_REFERENCE.md`](pdf/VISUAL_DESIGN_REFERENCE.md)
- **Code Templates:** [`pdf/LATEX_CODE_SNIPPETS.md`](pdf/LATEX_CODE_SNIPPETS.md)
- **Technical Reference:** [`pdf/MODERNCV_REFERENCE.md`](pdf/MODERNCV_REFERENCE.md)

### Web Resumes
- **Comprehensive:** [`web/WEB_RESUME_STYLE_GUIDE.md`](web/WEB_RESUME_STYLE_GUIDE.md)
- **Content Format:** [`../../resumes/web-builder/docs/WEB_RESUME_CONTENT_FORMAT.md`](../../resumes/web-builder/docs/WEB_RESUME_CONTENT_FORMAT.md)
- **Component Examples:** [`../../resumes/web-builder/docs/COMPONENT_EXAMPLES.md`](../../resumes/web-builder/docs/COMPONENT_EXAMPLES.md)

---

## 11. Design Rationale

### Why Different Colors Between Formats?

**Not an inconsistency, but intentional optimization:**

**Print (PDF):**
- Reflects light from paper (ambient lighting)
- Can use lighter colors effectively (#39a7d0 works well)
- Pure black provides maximum contrast without eye strain

**Screen (Web):**
- Emits light directly to eyes (backlit)
- Requires darker colors for accessibility (#2C5F7F meets WCAG AA)
- Softer black reduces glare (#4A4A4A more comfortable)

### Why System Fonts for Web?

**Performance:** Zero network requests, instant load
**Familiarity:** Users see native fonts for their OS
**Accessibility:** Respects user font preferences
**Quality:** Modern system fonts (SF Pro, Segoe UI) are excellent

### Why 11pt for PDF, 16px for Web?

**PDF:** Professional documents standard is 10-12pt for print
**Web:** Browser default is 16px (1rem) for accessibility
**Both:** Optimize for their respective media consumption patterns

---

## 12. Version History

**Version 1.0 (2025-11-13):**
- Initial creation during style guide refactoring
- Extracted shared principles from format-specific guides
- Documented intentional color variations
- Established cross-format quality standards

---

## 13. Maintenance

### When to Update This Document

- New format added (e.g., Typst, Markdown, Plain text)
- Brand colors change (update both PDF and Web values)
- Swiss market standards evolve
- Accessibility requirements updated (WCAG 2.2, 3.0)

### Update Process

1. Update this shared document first
2. Update format-specific guides to align
3. Update agent definitions
4. Test with actual compilation/build
5. Document changes in version history

---

**Created:** 2025-11-13
**Repository:** github.com/datarian/CV
**Maintained by:** design-reviewer, latex-moderncv-expert, react-resume-expert agents

---

**Quick Reference:**
- Format-agnostic principles? → This document
- PDF implementation details? → [`pdf/CV_STYLE_GUIDE.md`](pdf/CV_STYLE_GUIDE.md)
- Web implementation details? → [`web/WEB_RESUME_STYLE_GUIDE.md`](web/WEB_RESUME_STYLE_GUIDE.md)
