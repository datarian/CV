# Visual Design Quick Reference
## One-Page Cheat Sheet for CV Design

**Document:** Florian Hochstrasser CV Design System  
**Version:** 1.0 | Date: 2025-10-16

---

## Color Palette

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| Black | #000000 | 0, 0, 0 | Body text, primary content |
| Light Blue | #39a7d0 | 57, 167, 208 | Section headers, links, icons, accents |
| Dark Grey | #4D4D4D | 77, 77, 77 | Name, metadata, de-emphasized text |

**LaTeX Definitions:**
```latex
\definecolor{color0}{rgb}{0,0,0}        % black
\definecolor{color1}{HTML}{39a7d0}      % light blue
\definecolor{color2}{rgb}{0.3,0.3,0.3}  % dark grey
```

---

## Typography Scale

| Element | Size | Weight | Color | Example |
|---------|------|--------|-------|---------|
| Name | 24pt | Bold | Dark Grey | Florian Hochstrasser |
| Job Title | 14pt | Regular | Black | Senior ML Engineer |
| Section Header | 11pt | Bold | Light Blue | Professional Experience |
| Job Title (Entry) | 11pt | Bold | Black | Senior ML Engineer |
| Body Text | 11pt | Regular | Black | Standard paragraph text |
| Metadata/Dates | 10-11pt | Regular | Dark Grey | since 05/2021 |
| Contact Info | 10pt | Regular | Black | fl.ho@proton.me |

---

## Spacing System

| Element | Spacing Value | Notes |
|---------|---------------|-------|
| Page Margins | 12% of page | `\geometry{scale=0.88}` |
| Section Top Margin | 1.5-2em | Automatic in moderncv |
| Section Bottom Margin | 0.5em | Automatic in moderncv |
| Between CV Entries | 1em | Automatic in moderncv |
| Line Height | 1.2x | Default moderncv |
| Hints Column Width | 3.5cm | Left column for dates/icons |

---

## Layout Structure

```
┌─────────────────────────────────────────────────────┐
│ [Name - Dark Grey, 24pt Bold]    [Contact Info]   │
│ [Job Title - Black, 14pt]        [Phone]          │
│ [Birth/Nationality]               [Address]        │
│                                   [Photo 64x64]    │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Professional Summary (Italic, 11pt)                │
│ 3-5 sentence paragraph highlighting expertise...   │
│                                                     │
│ ────────────────────────────────────────────────   │
│ Technical Skills (Header: Light Blue, 11pt Bold)   │
│ Category:  Skill • Skill • Skill (Years)           │
│                                                     │
│ ────────────────────────────────────────────────   │
│ Professional Experience (Header: Light Blue)        │
│ [Date]    Job Title - Company, Location            │
│           Brief description paragraph               │
│           • Achievement with metrics                │
│           • Achievement with metrics                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Section Order (Standard)

1. Professional Summary
2. Technical Skills
3. Professional Experience
4. Education
5. Languages
6. Optional: Open Source, Hobbies, Personal

---

## Content Formatting Rules

### Professional Experience

```latex
\cventry{since 05/2021}{Job Title}{Company Name}{Location}{}{
Brief role description paragraph (1-2 sentences).
\begin{itemize}
\item Achievement starting with action verb, including metrics
\item Achievement starting with action verb, including metrics
\item Achievement starting with action verb, including metrics
\end{itemize}}
```

**Key Elements:**
- Dates: Format as "MM/YYYY -- MM/YYYY" or "since MM/YYYY"
- Description: 1-2 sentence summary before bullets
- Bullets: 3-5 per entry, start with action verbs
- Metrics: Always include when possible (%, numbers, scale)

### Technical Skills

```latex
\cvitem{Category Name}{Skill (Years) \textbullet{} Skill \textbullet{} Skill}
```

**Categories:**
- LLM & GenAI
- Backend & APIs
- MLOps & Cloud
- Leadership

### Education

```latex
\cventry{MM/YYYY -- MM/YYYY}{Degree Title}{Institution}{Grade: X/Y}{}{
Additional details: focus areas, thesis topic, honors
}
```

---

## Icon Usage (FontAwesome)

| Icon | Command | Usage |
|------|---------|-------|
| Email | (automatic) | Contact info |
| Phone | (automatic) | Contact info |
| LinkedIn | (automatic) | Social links |
| GitHub | (automatic) | Social links |
| Birthday Cake | \faBirthdayCake | Birth date |
| Globe | \faGlobeEurope | Nationality |

All icons: Light Blue (#39a7d0)

---

## Action Verbs for Achievements

**Leadership:** Led, Managed, Coordinated, Mentored, Directed
**Building:** Architected, Built, Developed, Implemented, Created, Designed
**Optimization:** Reduced, Improved, Optimized, Streamlined, Enhanced
**Scale:** Scaled, Expanded, Grew, Increased
**Process:** Established, Implemented, Standardized, Automated

---

## Metrics Guidelines

**Format Examples:**
- Uptime: 99.99%
- Volume: 3M+ documents, 100K+ requests
- Performance: 80% reduction, 60% faster
- Scale: 500+ customers, 10,000+ devices
- Team: 6-person team, 3-person team
- Experience: 3+ years, 1+ year production

**Rules:**
- Use "+" for approximate/minimum numbers
- Include time periods in parentheses
- Be specific (99.99% not "high uptime")
- Quantify business impact

---

## Photo Specifications

- Size: 64pt x 64pt (square)
- Border: 0.4pt thin line
- Position: Top-right corner of header
- Style: Professional headshot
- Background: Neutral/blurred
- Expression: Friendly, professional

```latex
\photo[64pt][0.4pt]{/path/to/photo.jpg}
```

---

## Critical LaTeX Settings

```latex
% Document class
\documentclass[11pt,a4paper,sans]{moderncv}

% MANDATORY style (not casual!)
\moderncvstyle{fancy}

% Base color (customized via definecolor)
\moderncvcolor{blue}

% Geometry
\geometry{scale=0.88}
\setlength{\hintscolumnwidth}{3.5cm}
\recomputelengths

% Section font
\renewcommand*{\sectionfont}{\fontsize{11}{13}\bfseries\upshape}

% Quote width
\let\originalrecomputecvlengths\recomputecvlengths
\renewcommand*{\recomputecvlengths}{%
\originalrecomputecvlengths%
\setlength{\quotewidth}{0.7\textwidth}}
```

---

## Common Mistakes to Avoid

1. Using `\moderncvstyle{casual}` (causes multi-page errors)
2. Inconsistent date formatting
3. Missing metrics in achievements
4. Passive voice in bullet points
5. Unexplained acronyms
6. Wrong number of arguments in \cventry (must be 6)
7. Forgetting to recompute lengths after geometry changes
8. Using pdflatex instead of xelatex
9. Incorrect color definitions
10. Overlapping text from tight margins

---

## Quality Checklist (Quick)

- [ ] Compiled with xelatex
- [ ] moderncvstyle{fancy} used
- [ ] All colors defined correctly
- [ ] Photo displays properly
- [ ] No overlapping text
- [ ] Consistent date formatting
- [ ] Metrics in all achievements
- [ ] Action verbs in bullets
- [ ] Section headers styled correctly
- [ ] Page breaks at logical points
- [ ] No compilation warnings
- [ ] PDF looks clean and professional

---

## File Naming Convention

```
YYYY_MM_DD_company_role.tex
YYYY_MM_DD_company_role.pdf
```

Example: `2025_10_14_frontify_senior_llm_engineer.tex`

---

## Compilation Commands

```bash
# Compile CV
xelatex CV_filename.tex

# Clean up artifacts
rm -f *.aux *.log *.out *.fls *.fdb_latexmk *.gz *.toc *.bbl *.blg
```

---

## Swiss Market Requirements

Must include:
- Full name
- Date of birth (DD.MM.YYYY)
- Nationality
- Complete address
- Phone (+41 format)
- Email
- Professional photo
- Languages with CEFR levels
- Education grades

---

**Quick Tips:**
- Keep it clean and scannable
- Metrics tell the story
- Light blue for visual interest only
- White space is your friend
- 2-3 pages is fine for technical roles
- Test at different zoom levels

---

**For full details, see:** `CV_STYLE_GUIDE.md`
