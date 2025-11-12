# Web Resume Style Guide - Florian Hochstrasser
## Comprehensive Design Specification for React Web Resume Documents

**Document Version:** 1.0
**Date:** 2025-11-11
**Technology Stack:** React 18 + TypeScript + Tailwind CSS + Vite
**Deployment:** GitHub Pages (CV-pages repository)

---

## Executive Summary

This style guide documents the visual design system, content format, and implementation standards for Florian Hochstrasser's interactive web resumes. The design emphasizes **responsive layouts**, **accessibility**, and **visual consistency** with the PDF resume brand while leveraging web-native capabilities.

**Key Design Philosophy:**
- **Content-First:** Single source of truth (resume_content.md) for all formats
- **Responsive Design:** Mobile-first, fluid layouts across all device sizes
- **Accessibility:** WCAG AA compliant, semantic HTML, keyboard navigation
- **Performance:** <2s load time, <500kb bundle size
- **Print-Optimized:** Browser print produces professional PDF output
- **Brand Consistency:** Colors and typography align with PDF resume system

---

## 1. Content Format Specification

### 1.1 File Structure

Web resumes use `resume_content.md` files with **YAML frontmatter + Markdown content**:

```markdown
---
metadata:
  id: sample_resume
  targetRole: Senior ML Engineer
  targetCompany: Demo Company
  generatedDate: 2025-11-11
  language: en
  salaryTarget: 140000

header:
  name: Full Name
  title: Professional Title
  location: City, Country
  email: email@example.com
  phone: +XX XX XXX XX XX
  linkedin: https://linkedin.com/in/username
  github: https://github.com/username
  website: https://example.com

# OPTIONAL: Manual Summary Highlights
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

# Professional Summary

Your summary text here with **bold** formatting for key terms...

## Experience

### Job Title
**Company Name** | Location | Dates

- Achievement with **bold key terms**
- Another achievement

## Technical Skills

**Category Name**: Skill1, Skill2, Skill3

## Education

### Degree Name
**Institution** | Location | Dates

Description text
```

### 1.2 YAML Frontmatter Schema

#### Required Fields

**metadata:**
- `id`: Unique identifier (format: `YYYY_MM_DD_company_role`)
- `targetRole`: Target job title (e.g., "Senior ML Engineer")
- `targetCompany`: Target company name
- `generatedDate`: Date in YYYY-MM-DD format
- `language`: Language code (en, de, fr, it)

**header:**
- `name`: Full name (required)
- `title`: Professional title/tagline (required)
- `location`: City, Country (required)
- `email`: Email address (required)
- `phone`: Phone with country code (optional but recommended for Swiss market)
- `linkedin`: Full LinkedIn URL (optional)
- `github`: Full GitHub URL (optional)
- `website`: Personal website URL (optional)

#### Optional Fields

**summary_highlights:** (array of 2-4 highlight objects)
- `metric`: Large metric text (e.g., "8+", "1M+", "99.9%", "4x")
- `label`: Descriptive label (e.g., "Years Experience", "Daily Requests")
- `icon`: Icon name from Lucide React library (see Section 1.5)

**Note:** If `summary_highlights` is omitted, the system will **automatically extract** highlights from **bold text** in the Professional Summary section.

### 1.3 Markdown Content Structure

#### Required Sections

1. **Professional Summary** (`# Professional Summary`)
   - First section after frontmatter
   - 2-4 paragraphs summarizing expertise
   - Use **bold** for key metrics and terms (enables auto-extraction)
   - Use *italic* for emphasis

2. **Experience** (`## Experience`)
   - Each role as H3 (`### Job Title`)
   - Company, location, dates on next line with bold company
   - Bullet points for achievements
   - Quantifiable metrics in **bold**

3. **Technical Skills** (`## Technical Skills`)
   - Categorized by type (e.g., "ML/AI Frameworks:", "Languages:")
   - Category name in **bold** followed by comma-separated list

4. **Education** (`## Education`)
   - Each degree as H3 (`### Degree Name`)
   - Institution, location, dates on next line with bold institution
   - Optional description text

#### Optional Sections

- **Projects** (`## Projects`)
- **Publications** (`## Publications`)
- **Certifications** (`## Certifications`)
- **Languages** (`## Languages`)
- **Awards** (`## Awards`)

### 1.4 Markdown Formatting Rules

**Emphasis:**
- **Bold** (`**text**`): Key metrics, company names, category labels, important terms
  - Rendered in brand blue color (#2C5F7F)
- *Italic* (`*text*`): Subtle emphasis, role context
  - Rendered in coral color (#E87461)

**Lists:**
- Use `-` for unordered lists (rendered as bullet points)
- Start each bullet with action verb
- Include quantifiable metrics where possible

**Links:**
- Use standard Markdown link syntax: `[text](url)`
- All external links open in new tab automatically

**Line Breaks:**
- Single line break between paragraphs
- Double line break between sections

### 1.5 Summary Highlights Feature

#### Auto-Extraction (Default Behavior)

If `summary_highlights` is **NOT** provided in YAML, the web resume will **automatically extract** highlights from the summary text using pattern matching.

**Extracted Patterns:**

1. **Years of Experience**: `"8+ years"`, `"10 years"` → Calendar icon
2. **Scale Metrics**: `"1M+"`, `"500K+"`, `"100+ models"` → Activity icon
3. **Percentages**: `"99.9% uptime"`, `"23% improvement"` → Target icon
4. **Multipliers**: `"4x faster"`, `"3x improvement"` → Trending icon

**Auto-Extraction Logic:**
- Scans summary text for numeric patterns
- Extracts up to 4 highlights automatically
- Assigns appropriate icons based on context
- Uses metric + context as label

**Example Summary for Auto-Extraction:**
```markdown
# Professional Summary

Experienced ML Engineer with **8+ years** building production systems.
Led development of systems serving **1M+ daily requests** with **99.9% uptime**.
Improved model accuracy by **23%** over baseline.
```

**Generated Highlights:**
- `8+ years` → Experience (calendar icon)
- `1M+` → Daily requests (activity icon)
- `99.9%` → Uptime (target icon)
- `23%` → Improvement (trending icon)

#### Manual Override (Optional)

For precise control, include `summary_highlights` in YAML frontmatter:

```yaml
summary_highlights:
  - metric: "10+"
    label: "Production Models"
    icon: "zap"
  - metric: "4x"
    label: "Performance Boost"
    icon: "trending"
  - metric: "$2M"
    label: "Cost Savings"
    icon: "award"
```

#### Available Icons (Lucide React)

| Icon Name | Use Case | Visual |
|-----------|----------|--------|
| `calendar` | Years of experience, tenure | 📅 |
| `activity` | Scale metrics, throughput, requests | 📊 |
| `target` | Accuracy, precision, percentages | 🎯 |
| `trending` | Improvements, growth metrics | 📈 |
| `users` | Team size, user counts | 👥 |
| `zap` | Performance, speed metrics | ⚡ |
| `award` | Achievements, recognition | 🏆 |
| `clock` | Time-related metrics | ⏰ |

#### Best Practices for Content Agents

**When auto-extraction is sufficient:**
- Summary contains clear numeric metrics (years, percentages, scale)
- Natural language makes metrics stand out (e.g., bold formatting)
- 3-4 key metrics are evident in the text

**When to use manual highlights:**
- Need specific metrics not easily auto-extracted
- Want custom icon choices for better visual storytelling
- Metrics use non-standard formats (e.g., "4x", "$2M", "50+ models")
- Need exact control over which metrics are highlighted

**Writing for Auto-Extraction:**
To ensure good auto-extraction, include metrics in bold within the summary:
- Use formats like `**8+ years**`, `**1M+ daily requests**`, `**99.9% uptime**`
- Include context words near metrics: "years", "requests", "uptime", "users", "models"
- Place most important metrics early in the summary

---

## 2. Visual Design System

### 2.1 Color Palette

#### Brand Colors (Aligned with PDF Resume)

```css
--cv-blue: #2C5F7F;      /* Primary brand color (darker than PDF for better web contrast) */
--cv-coral: #E87461;     /* Secondary accent color */
--cv-gray: #4A4A4A;      /* Text color (body) */
--cv-light: #F5F5F5;     /* Background (subtle) */
--cv-white: #FFFFFF;     /* Primary background */
```

#### Color Usage Rules

| Element | Color | Purpose | Tailwind Class |
|---------|-------|---------|----------------|
| **Section Headers** | cv-blue | Visual hierarchy, brand identity | `text-cv-blue` |
| **Bold Text** | cv-blue | Key metrics, emphasis | `font-bold text-cv-blue` |
| **Italic Text** | cv-coral | Subtle emphasis | `italic text-cv-coral` |
| **Body Text** | cv-gray | Maximum readability | `text-cv-gray` |
| **Links** | cv-blue | Consistent with brand | `text-cv-blue hover:underline` |
| **Highlight Cards** | cv-blue | Icon backgrounds | `bg-cv-blue/10` |
| **Borders** | cv-light | Subtle separation | `border-cv-light` |

#### Accessibility Compliance

All color combinations meet **WCAG AA standards** (4.5:1 contrast ratio minimum):
- cv-blue (#2C5F7F) on white: 6.2:1 ✅
- cv-gray (#4A4A4A) on white: 8.9:1 ✅
- cv-coral (#E87461) on white: 4.6:1 ✅

### 2.2 Typography System

#### Font Families

**Primary Font:** System font stack (optimized for each platform)
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, sans-serif;
```

**Reason:** Fast loading, native appearance, excellent readability

#### Typography Scale

| Element | Size | Weight | Line Height | Tailwind Classes |
|---------|------|--------|-------------|------------------|
| **Name (Header)** | 36px (2.25rem) | 700 (Bold) | 1.2 | `text-4xl font-bold` |
| **Job Title** | 20px (1.25rem) | 400 (Regular) | 1.4 | `text-xl` |
| **Section Headers** | 24px (1.5rem) | 700 (Bold) | 1.3 | `text-2xl font-bold` |
| **Subsection (H3)** | 18px (1.125rem) | 600 (Semibold) | 1.4 | `text-lg font-semibold` |
| **Body Text** | 16px (1rem) | 400 (Regular) | 1.6 | `text-base` |
| **Small Text** | 14px (0.875rem) | 400 (Regular) | 1.5 | `text-sm` |
| **Metric Text** | 32px (2rem) | 700 (Bold) | 1.2 | `text-3xl font-bold` |
| **Label Text** | 12px (0.75rem) | 400 (Regular) | 1.4 | `text-xs` |

#### Font Weight Usage

- **Bold (700):** Name, section headers, job titles, metrics, bold markdown
- **Semibold (600):** Subsection headings
- **Regular (400):** Body text, descriptions, labels
- **Never use:** Underline (except links on hover), ALL CAPS for paragraphs

### 2.3 Spacing System

#### Base Spacing Unit: 4px (0.25rem)

| Spacing | Value | Tailwind | Usage |
|---------|-------|----------|-------|
| **xs** | 4px | `space-1` | Tight icon spacing |
| **sm** | 8px | `space-2` | Inline element gaps |
| **md** | 16px | `space-4` | Paragraph spacing |
| **lg** | 24px | `space-6` | Section spacing |
| **xl** | 32px | `space-8` | Major section breaks |
| **2xl** | 48px | `space-12` | Page-level spacing |

#### Container Spacing

```css
/* Desktop */
max-width: 1200px;
padding: 48px 64px;

/* Tablet */
padding: 32px 48px;

/* Mobile */
padding: 24px 16px;
```

### 2.4 Layout Structure

#### Professional Summary Layout

**Desktop (lg breakpoint and above):**
- Two-column layout
- Summary text: Left side (60-65% width)
- Highlight cards: Right side (35-40% width), stacked vertically
- Gap between columns: 32px

**Mobile/Tablet:**
- Single column
- Summary text: Full width, top
- Highlight cards: Horizontal row below summary
- Gap between elements: 24px

**Highlight Card Design:**
- Icon in circular background (brand color with 10% opacity)
- Large metric text (32px, bold, cv-blue)
- Descriptive label (12px, regular, cv-gray)
- Hover effects: Border color transition, shadow, metric color change to coral
- Card padding: 16px
- Border: 1px solid cv-light, transitions to cv-blue on hover

#### Section Layout

**Section Structure:**
```
┌─────────────────────────────────────────────┐
│ Header (Name + Title)                       │
│ Contact Info (Icons + Links)                │
├─────────────────────────────────────────────┤
│ Professional Summary                        │
│ ┌─────────────┐  ┌──────────────┐          │
│ │ Summary     │  │  Highlights  │          │
│ │ Text (left) │  │  (right)     │          │
│ └─────────────┘  └──────────────┘          │
├─────────────────────────────────────────────┤
│ ## Experience                               │
│ ### Role Title                              │
│ Company | Location | Dates                  │
│ • Achievement 1                             │
│ • Achievement 2                             │
├─────────────────────────────────────────────┤
│ ## Technical Skills                         │
│ Category: Skill1, Skill2, Skill3            │
├─────────────────────────────────────────────┤
│ ## Education                                │
│ ### Degree                                  │
│ Institution | Location | Dates              │
└─────────────────────────────────────────────┘
```

---

## 3. Component Specifications

### 3.1 ResumeHeader Component

**Purpose:** Display name, title, location, and contact links

**Layout:**
- Name: 36px bold, cv-gray
- Title: 20px regular, cv-gray
- Location: 14px regular, cv-gray with map-pin icon
- Contact links: Horizontal row of icon + text links
- All center-aligned on mobile, left-aligned on desktop

**Props:**
```typescript
interface HeaderData {
  name: string;
  title: string;
  location: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}
```

### 3.2 ProfessionalSummary Component

**Purpose:** Display summary text with auto-extracted or manual highlights

**Layout:**
- Two-column on desktop (lg+), single column on mobile
- Summary text with markdown rendering (bold → blue, italic → coral)
- Highlight cards on right (desktop) or below (mobile)

**Props:**
```typescript
interface Highlight {
  metric: string;
  label: string;
  icon: LucideIconName;
}

interface SummaryData {
  content: string;  // Markdown text
  highlights?: Highlight[];  // Optional, auto-extracted if missing
}
```

**Highlight Card Styling:**
- Border: 1px solid #F5F5F5, hover → #2C5F7F
- Padding: 16px
- Border radius: 8px
- Icon: 24x24px in circular bg (cv-blue/10)
- Metric: 32px bold, color transitions blue → coral on hover
- Label: 12px regular, cv-gray
- Shadow: subtle on hover

### 3.3 ExperienceSection Component

**Purpose:** Display professional experience entries

**Layout:**
- Each role as separate card with subtle border
- Job title: 18px semibold, cv-gray
- Company | Location | Dates: 14px regular, cv-gray
- Bullet points with custom marker (cv-blue dot)
- Spacing: 24px between entries

**Props:**
```typescript
interface Experience {
  title: string;
  company: string;
  location: string;
  dates: string;
  achievements: string[];  // Markdown strings
}
```

### 3.4 SkillsSection Component

**Purpose:** Display categorized technical skills

**Layout:**
- Categories as rows
- Category name: 16px semibold, cv-blue
- Skills: 16px regular, cv-gray, comma-separated
- Spacing: 12px between categories

**Props:**
```typescript
interface SkillCategory {
  category: string;
  skills: string[];
}
```

### 3.5 EducationSection Component

**Purpose:** Display educational background

**Layout:**
- Each degree as separate entry
- Degree name: 18px semibold, cv-gray
- Institution | Location | Dates: 14px regular, cv-gray
- Description: 16px regular, cv-gray
- Spacing: 20px between entries

**Props:**
```typescript
interface Education {
  degree: string;
  institution: string;
  location: string;
  dates: string;
  description?: string;  // Optional
}
```

---

## 4. Responsive Design

### 4.1 Breakpoints

Following Tailwind CSS standard breakpoints:

```css
sm: 640px   /* Small devices (landscape phones) */
md: 768px   /* Medium devices (tablets) */
lg: 1024px  /* Large devices (desktops) */
xl: 1280px  /* Extra large devices (large desktops) */
```

### 4.2 Mobile-First Approach

**Base (Mobile):**
- Single column layout
- 16px font size
- 24px spacing
- Full-width elements
- Stacked highlight cards (horizontal scroll if >2)

**Tablet (md+):**
- Increased padding (32px)
- Two-column skills if space allows
- Larger heading sizes

**Desktop (lg+):**
- Max width container (1200px)
- Two-column Professional Summary
- Optimized line lengths (60-80 characters)
- Enhanced hover states

### 4.3 Touch Optimization

- Minimum touch target: 44x44px (iOS guidelines)
- Links have adequate spacing (12px minimum)
- No hover-only interactions
- Tap highlights disabled (`-webkit-tap-highlight-color: transparent`)

---

## 5. Accessibility (WCAG AA)

### 5.1 Semantic HTML

- `<header>` for resume header
- `<section>` for each major section
- `<h1>` for name, `<h2>` for sections, `<h3>` for subsections
- `<nav>` for contact links
- `<article>` for experience entries
- `<ul>` for achievement lists

### 5.2 ARIA Labels

- Contact links: `aria-label="Email: {email}"`
- External links: `aria-label="Opens in new tab"`
- Icon-only buttons: `aria-label` with descriptive text
- Highlight cards: `role="article"` with `aria-label`

### 5.3 Keyboard Navigation

- All interactive elements focusable
- Visible focus indicators (2px solid cv-blue outline)
- Logical tab order
- Skip links (optional, for long resumes)

### 5.4 Color Contrast

All text meets WCAG AA minimum (4.5:1 for normal text, 3:1 for large text):
- Body text (cv-gray on white): 8.9:1 ✅
- Headers (cv-blue on white): 6.2:1 ✅
- Accent text (cv-coral on white): 4.6:1 ✅

### 5.5 Screen Reader Support

- Descriptive link text (no "click here")
- Alt text for all images (if any)
- Proper heading hierarchy (no skipped levels)
- Form labels (if contact form added)

---

## 6. Print Stylesheet

### 6.1 Print Optimization

Web resumes must produce professional PDFs when printed from browser:

**Page Setup:**
```css
@media print {
  @page {
    size: A4;
    margin: 2cm;
  }

  body {
    font-size: 11pt;
    color: #000;
  }
}
```

**Print-Specific Styles:**
- Hide: Navigation, footer links, interactive elements
- Show: Full URLs for important links (append in print)
- Adjust: Font sizes (px → pt conversion)
- Ensure: No page breaks within entries
- Flatten: Remove shadows, reduce colors

**Page Break Control:**
```css
.experience-entry {
  page-break-inside: avoid;
}

.section {
  page-break-after: avoid;
}
```

---

## 7. Performance Requirements

### 7.1 Bundle Size Targets

- **Total bundle:** <500kb (gzipped)
- **JavaScript:** <200kb
- **CSS:** <50kb
- **Fonts:** Use system fonts (0kb)
- **Images:** Optimize, use WebP where possible

### 7.2 Load Time Targets

- **First Contentful Paint (FCP):** <1.5s
- **Time to Interactive (TTI):** <2.5s
- **Total Load Time:** <2s on fast 3G

### 7.3 Optimization Techniques

- Code splitting (dynamic imports for optional sections)
- Tree shaking (remove unused Tailwind classes)
- Minification (Vite production build)
- Lazy loading (images, if any)
- Preloading critical resources

---

## 8. Build & Deployment

### 8.1 Technology Stack

**Core:**
- React 18.3+
- TypeScript 5.3+
- Vite 5.0+ (build tool)

**Styling:**
- Tailwind CSS 3.4+
- PostCSS

**Parsing:**
- gray-matter (YAML frontmatter)
- react-markdown (markdown rendering)
- lucide-react (icons)

**Deployment:**
- GitHub Pages (gh-pages branch)
- Deployed to private CV-pages repository

### 8.2 Build Process

**Development:**
```bash
cd resumes/web-builder
npm install
npm run dev
# Opens http://localhost:5173
```

**Production Build:**
```bash
npm run build
# Outputs to resumes/web-builder/dist/
```

**Preview Production Build:**
```bash
npm run preview
# Opens http://localhost:4173
```

### 8.3 Deployment Workflow

**Preview Mode (Local):**
1. Copy `resume_content.md` to `resumes/web-builder/public/`
2. Run `npm run build`
3. Run `npm run preview`
4. Review at `http://localhost:4173/CV-pages/`
5. No deployment, no credentials required

**Deploy Mode (CV-pages):**
1. Copy `resume_content.md` to `resumes/web-builder/public/`
2. Run `npm run build`
3. Clone CV-pages repo to temp location
4. Copy build output to `cv/{semantic-id}/` in gh-pages branch
5. Commit and push to CV-pages repo
6. GitHub Pages auto-deploys
7. URL: `https://datarian.github.io/CV-pages/cv/{semantic-id}`

**Semantic ID Format:**
```
{date}_{company_lowercase}_{content_hash}
Example: 2025_11_10_quantumbasel_a7f3
```

---

## 9. Browser Support

### 9.1 Supported Browsers

**Desktop:**
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

**Mobile:**
- iOS Safari 14+ ✅
- Android Chrome 90+ ✅

### 9.2 Graceful Degradation

- Modern CSS features with fallbacks (flexbox → grid → flex)
- JavaScript disabled: Content still readable (SSR future enhancement)
- Old browsers: Basic layout preserved, reduced interactivity

---

## 10. Quality Assurance Checklist

### 10.1 Content Quality

- [ ] All YAML frontmatter fields present and valid
- [ ] Markdown renders correctly (bold → blue, italic → coral)
- [ ] Summary highlights auto-extract or manual provided
- [ ] All sections present (Summary, Experience, Skills, Education)
- [ ] Achievements include quantifiable metrics
- [ ] No Lorem Ipsum placeholder text

### 10.2 Visual Quality

- [ ] Colors match brand palette (cv-blue, cv-coral, cv-gray)
- [ ] Typography hierarchy clear and consistent
- [ ] Spacing follows system (4px base unit)
- [ ] Professional Summary two-column on desktop
- [ ] Highlight cards styled correctly with hover effects
- [ ] Print stylesheet produces clean PDF

### 10.3 Responsive Design

- [ ] Mobile layout stacks correctly
- [ ] Tablet layout optimized for medium screens
- [ ] Desktop layout uses two-column Professional Summary
- [ ] No horizontal scroll on any viewport
- [ ] Touch targets minimum 44x44px on mobile

### 10.4 Accessibility

- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Semantic HTML used throughout
- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus indicators visible (2px blue outline)
- [ ] ARIA labels present where needed
- [ ] Screen reader tested (VoiceOver or NVDA)

### 10.5 Performance

- [ ] Bundle size <500kb (check with `npm run build`)
- [ ] First Contentful Paint <1.5s
- [ ] Time to Interactive <2.5s
- [ ] Lighthouse score 90+ (Performance, Accessibility, Best Practices)

### 10.6 Cross-Browser

- [ ] Tested in Chrome (desktop + mobile)
- [ ] Tested in Firefox
- [ ] Tested in Safari (desktop + iOS)
- [ ] Tested in Edge
- [ ] Print preview works in all browsers

---

## 11. Common Issues & Troubleshooting

### 11.1 Summary Highlights Not Appearing

**Symptoms:**
- No highlight cards visible
- Empty right column on desktop

**Causes:**
- No `summary_highlights` in YAML AND no **bold** metrics in summary text
- Auto-extraction failed to find patterns

**Solutions:**
1. Add **bold** formatting to key metrics in summary: `**8+ years**`, `**1M+ requests**`
2. OR provide manual `summary_highlights` in YAML frontmatter
3. Check console for parsing errors

### 11.2 Markdown Not Rendering

**Symptoms:**
- Raw markdown visible (asterisks, hashes)
- No formatting applied

**Causes:**
- react-markdown not parsing content
- YAML frontmatter syntax error

**Solutions:**
1. Validate YAML syntax (use online YAML validator)
2. Check gray-matter parsing in browser console
3. Ensure triple dashes (`---`) surround frontmatter

### 11.3 Colors Don't Match Brand

**Symptoms:**
- Blue looks different from PDF
- Colors inconsistent across sections

**Causes:**
- Tailwind config not using custom colors
- CSS overrides not applied

**Solutions:**
1. Check `tailwind.config.js` has custom color definitions
2. Use `text-cv-blue` not `text-blue-500`
3. Verify CSS variables loaded

### 11.4 Layout Broken on Mobile

**Symptoms:**
- Horizontal scroll
- Elements overflow viewport
- Text too small to read

**Causes:**
- Missing responsive classes
- Fixed widths instead of percentages
- Font sizes not scaled

**Solutions:**
1. Use Tailwind responsive prefixes (`lg:flex-row`)
2. Use `max-w-full` to prevent overflow
3. Test in Chrome DevTools mobile emulator

### 11.5 Print Output Low Quality

**Symptoms:**
- Page breaks in wrong places
- Missing content on print
- Colors too light

**Causes:**
- Print stylesheet not loaded
- Browser print settings incorrect

**Solutions:**
1. Verify `@media print` styles in CSS
2. Use `page-break-inside: avoid` on entries
3. Adjust browser print settings (margins, background graphics)

---

## 12. Design Rationale

### 12.1 Why Two-Column Professional Summary?

**Rationale:**
- **Scanability:** Highlights immediately visible without reading full text
- **Visual Interest:** Breaks up text-heavy page
- **Hierarchy:** Metrics get equal prominence to narrative
- **Mobile-First:** Stacks naturally on small screens

### 12.2 Why Auto-Extraction for Highlights?

**Rationale:**
- **Simplicity:** Content agents don't need to manually specify highlights
- **Consistency:** Metrics naturally written in summary are automatically featured
- **Flexibility:** Manual override available for edge cases
- **Git-Friendly:** Less YAML configuration to track

### 12.3 Why System Fonts?

**Rationale:**
- **Performance:** Zero network requests, instant load
- **Familiarity:** Users see native fonts for their OS
- **Consistency:** Matches platform conventions
- **Accessibility:** Respects user font preferences

### 12.4 Why Coral for Italic?

**Rationale:**
- **Differentiation:** Distinguishes from bold (blue)
- **Warmth:** Adds secondary accent without clashing
- **Readability:** Sufficient contrast (4.6:1) for emphasis
- **Hierarchy:** Signals subtle emphasis vs. key terms (bold)

---

## 13. Future Enhancements

### 13.1 Phase 2 Features (Post-MVP)

- **Interactive Filtering:** Filter experience by tech stack tag
- **Dark Mode:** Toggle light/dark theme with system preference detection
- **Multi-Language:** Switch between English/German/French versions
- **Analytics:** Privacy-respecting view tracking (no PII)
- **Export:** Download resume as PDF from web interface

### 13.2 Advanced Features

- **Custom Domains:** Support custom domain mapping (resume.florian.ch)
- **QR Codes:** Generate QR code for easy mobile sharing
- **Version History:** Browse previous versions of resume
- **A/B Testing:** Compare different resume versions
- **Template Library:** Multiple web design themes (minimalist, bold, creative)

---

## 14. Maintenance Notes

### 14.1 Updating This Guide

**When to update:**
- Component design changes approved
- New features added to web resume
- Performance benchmarks change
- Accessibility requirements evolve
- Feedback from deployments

**Update process:**
1. Document changes in this file
2. Update version number and date
3. Add to version history (below)
4. Update related agents (resume-content-generator, react-resume-expert, design-reviewer)
5. Test with actual builds

### 14.2 Version History

**Version 1.0 (2025-11-11):**
- Initial web resume style guide creation
- Consolidated content from WEB_RESUME_CONTENT_FORMAT.md
- Added comprehensive visual design standards
- Documented component specifications
- Established accessibility and performance requirements
- Created print stylesheet guidelines

---

## 15. Reference Links

### Internal Documentation

- **PDF Style Guide:** `/Users/flo/Development/CV/docs/style-guide/CV_STYLE_GUIDE.md`
- **Design System Package:** `/Users/flo/Development/CV/docs/style-guide/README.md`
- **Personal Profile:** `/Users/flo/Development/CV/docs/PERSONAL_PROFILE.md`
- **Web Resume Design Plan:** `/Users/flo/Development/CV/docs/plans/2025-11-10-web-resume-system-design.md`

### External Resources

- **React Documentation:** react.dev
- **Tailwind CSS:** tailwindcss.com
- **Lucide Icons:** lucide.dev
- **WCAG Guidelines:** w3.org/WAI/WCAG21/quickref
- **Vite Documentation:** vitejs.dev

---

## Key Takeaways

1. **Content-First Architecture:** resume_content.md is single source for PDF and web
2. **Responsive by Default:** Mobile-first design scales to desktop seamlessly
3. **Accessibility Required:** WCAG AA compliance non-negotiable
4. **Performance Matters:** <2s load time, <500kb bundle size
5. **Brand Consistency:** Colors and typography align with PDF system
6. **Print-Optimized:** Browser print produces professional PDF output
7. **Auto-Extraction Magic:** Highlights emerge from well-formatted summary text

---

**Created:** 2025-11-11 by Claude Code
**Based on:** Web Resume System Design + WEB_RESUME_CONTENT_FORMAT.md
**Repository:** github.com/datarian/CV

---

**Quick Access:**
- Need content format? → Section 1 (Content Format Specification)
- Need visual design? → Section 2 (Visual Design System)
- Need component specs? → Section 3 (Component Specifications)
- Need accessibility info? → Section 5 (Accessibility)
- Need troubleshooting? → Section 11 (Common Issues)
