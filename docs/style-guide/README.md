# CV Design System Documentation
## Complete Style Guide Package for Florian Hochstrasser's Resume System

**Version:** 2.0
**Last Updated:** 2025-11-13
**Applies to:** PDF resumes

---

## Quick Navigation

| Resource | Purpose | When to Use |
|----------|---------|-------------|
| 📋 [**DESIGN_SYSTEM.md**](DESIGN_SYSTEM.md) | Shared cross-format definitions | Understanding brand principles, color intent, typography philosophy |
| 📄 [**PDF Guides**](pdf/) | PDF resume specifications | Creating or updating LaTeX PDF resumes |
| 📦 [**Archive**](archive/) | Historical documents | Reference only (analysis reports, old versions) |

---

## Getting Started

### For PDF Resumes

**1. Quick Reference:**
- Colors, fonts, spacing: [`pdf/VISUAL_DESIGN_REFERENCE.md`](pdf/VISUAL_DESIGN_REFERENCE.md)

**2. Code Templates:**
- Ready-to-copy LaTeX: [`pdf/LATEX_CODE_SNIPPETS.md`](pdf/LATEX_CODE_SNIPPETS.md)

**3. Comprehensive Guide:**
- Full design specification: [`pdf/CV_STYLE_GUIDE.md`](pdf/CV_STYLE_GUIDE.md)

**4. Technical Reference:**
- ModernCV package docs: [`pdf/MODERNCV_REFERENCE.md`](pdf/MODERNCV_REFERENCE.md)

**Quick Start Workflow:**
```bash
# 1. Copy boilerplate from LATEX_CODE_SNIPPETS.md
# 2. Customize title and summary
# 3. Compile with xelatex
xelatex filename.tex
# 4. Verify against checklist in VISUAL_DESIGN_REFERENCE.md
```

---

## Documentation Structure

```
docs/style-guide/
│
├── README.md                    ← You are here (master navigation)
├── DESIGN_SYSTEM.md             ← Shared principles across formats
│
├── pdf/                         ← PDF-specific documentation
│   ├── CV_STYLE_GUIDE.md        ← Comprehensive (21KB, 18 sections)
│   ├── VISUAL_DESIGN_REFERENCE.md ← Quick reference (8KB, cheat sheet)
│   ├── LATEX_CODE_SNIPPETS.md   ← Code library (17KB, templates)
│   └── MODERNCV_REFERENCE.md    ← LaTeX package reference (10KB)
│
└── archive/                     ← Historical documents (reference only)
    ├── ANALYSIS_SUMMARY.md      ← 2025-10-16 design analysis
    ├── GETTING_STARTED.md       ← Merged into this README
    ├── PACKAGE_SUMMARY.txt      ← Merged into this README
    └── *.bak                    ← Backup files
```

---

## Key Design Specifications

### Shared Definitions (All Formats)

**Brand Philosophy:**
- Clean modernism
- Swiss design principles
- Professional minimalism
- Technical credibility

**Color Intent:**
- **Primary Blue:** Professional, trustworthy
  - PDF: #39a7d0 (light blue, optimized for print)
- **Body Text:** Near-black for readability
  - PDF: #000000 (pure black)

**Typography Principles:**
- Sans-serif for modern technical appeal
- Clear hierarchy (name > title > sections > body)
- PDF: 11pt base (print standard)

**See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for complete shared definitions**

### PDF-Specific

**Colors:**
- Light Blue: #39a7d0
- Dark Grey: #4D4D4D
- Black: #000000

**Typography:**
- Name: 24pt Bold Dark Grey
- Section Headers: 11pt Bold Light Blue
- Body: 11pt Regular Black

**Layout:**
- Margins: 12% (scale=0.88)
- Hints Column: 3.5cm
- Page Count: 2-3 pages

**Critical LaTeX:**
```latex
\documentclass[11pt,a4paper,sans]{moderncv}
\moderncvstyle{fancy}  % MANDATORY
\geometry{scale=0.88}
\setlength{\hintscolumnwidth}{3.5cm}
```

## Workflows

### Workflow 1: Create New PDF Resume

1. **Reference shared definitions:** [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
2. **Copy boilerplate:** From [`pdf/LATEX_CODE_SNIPPETS.md`](pdf/LATEX_CODE_SNIPPETS.md)
3. **Customize:** Title, summary, skills, experience
4. **Compile:** `xelatex filename.tex`
5. **Quality check:** Against [`pdf/VISUAL_DESIGN_REFERENCE.md`](pdf/VISUAL_DESIGN_REFERENCE.md) checklist
6. **Design questions?** Consult [`pdf/CV_STYLE_GUIDE.md`](pdf/CV_STYLE_GUIDE.md)

### Workflow 3: Troubleshooting

**PDF Issues:**
1. Check [`pdf/VISUAL_DESIGN_REFERENCE.md`](pdf/VISUAL_DESIGN_REFERENCE.md) common mistakes
2. Review [`pdf/CV_STYLE_GUIDE.md`](pdf/CV_STYLE_GUIDE.md) Section 12 (troubleshooting)
3. Consult [`pdf/MODERNCV_REFERENCE.md`](pdf/MODERNCV_REFERENCE.md) for LaTeX specifics


---

## Agent References

### design-reviewer
- **Shared:** [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
- **PDF:** All files in [`pdf/`](pdf/)

### latex-moderncv-expert
- **Shared:** [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
- **Technical:** [pdf/MODERNCV_REFERENCE.md](pdf/MODERNCV_REFERENCE.md)
- **Design:** [pdf/CV_STYLE_GUIDE.md](pdf/CV_STYLE_GUIDE.md)
- **Quick Ref:** [pdf/VISUAL_DESIGN_REFERENCE.md](pdf/VISUAL_DESIGN_REFERENCE.md)
- **Code:** [pdf/LATEX_CODE_SNIPPETS.md](pdf/LATEX_CODE_SNIPPETS.md)

### swiss-tech-resume-reviewer
- **Shared:** [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
- **PDF:** [pdf/CV_STYLE_GUIDE.md](pdf/CV_STYLE_GUIDE.md)

### career-planning-coach
- **Shared:** [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
- **PDF:** [pdf/CV_STYLE_GUIDE.md](pdf/CV_STYLE_GUIDE.md)

---

## Swiss Market Compliance

### Required Elements (All Formats)

- [ ] Full name
- [ ] Date of birth (DD.MM.YYYY)
- [ ] Nationality
- [ ] Complete address
- [ ] Phone (+41 format)
- [ ] Email
- [ ] Professional photo (PDF only)
- [ ] Languages with CEFR levels
- [ ] Education with grades

### Cultural Expectations

- **Length:** 2-3 pages acceptable for senior technical roles
- **Detail:** Technology stack specifics valued
- **Metrics:** Quantified achievements emphasized
- **Tone:** Formal but approachable

**See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) Section 6 for complete requirements**

---

## Quality Standards

### Visual Quality (All Formats)

- [ ] No overlapping text
- [ ] Consistent spacing
- [ ] Proper alignment
- [ ] Color usage consistent
- [ ] Typography hierarchy clear
- [ ] White space balanced
- [ ] Professional appearance

### Content Quality (All Formats)

- [ ] No typos
- [ ] Dates accurate and consistent
- [ ] Metrics included for achievements
- [ ] Action verbs used
- [ ] Technical terms correct
- [ ] No unexplained acronyms

### Format-Specific Quality

**PDF:**
- [ ] Compiles without errors (xelatex)
- [ ] Uses moderncvstyle{fancy}
- [ ] Colors defined correctly
- [ ] All \cventry have 6 arguments


---

## Version History

**Version 2.0 (2025-11-13):**
- Major refactoring: Created hierarchical structure
- Added DESIGN_SYSTEM.md (shared definitions)
- Organized into subdirectories (pdf/, web/, archive/)
- Removed content format duplication from WEB_RESUME_STYLE_GUIDE.md
- Consolidated README (merged GETTING_STARTED + PACKAGE_SUMMARY)

**Version 1.0 (2025-10-16):**
- Initial comprehensive style guide creation
- Based on Frontify application CV
- Three-document PDF system established
- Full design system documented

---

## Maintenance

### When to Update

- Design changes approved
- New format added (e.g., Typst, plain text)
- Best practices identified
- Market requirements change
- Agent feedback incorporated

### Update Process

1. Update [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) if shared principle changes
2. Update format-specific guides as needed
3. Update agent definitions
4. Test with actual compilation/build
5. Document changes in version history

---

## Support

**Need Help?**

| Question Type | Resource |
|---------------|----------|
| Design questions | [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) + format-specific guides |
| PDF implementation | [pdf/LATEX_CODE_SNIPPETS.md](pdf/LATEX_CODE_SNIPPETS.md) |
| Quick lookups | [pdf/VISUAL_DESIGN_REFERENCE.md](pdf/VISUAL_DESIGN_REFERENCE.md) |
| Troubleshooting | Section 12 of respective style guides |

**Contact:** fl.ho@proton.me

---

## Key Takeaways

1. **Hierarchical Structure:** Shared → Format-specific → Implementation
2. **Color Differences Intentional:** Print vs screen optimization documented
3. **Agent-Friendly:** Clear paths for each agent's needs
4. **Reduced Duplication:** Single source of truth for shared and format-specific content
5. **Scalable:** Easy to add new formats while maintaining consistency

---

**Created:** 2025-10-16
**Major Refactor:** 2025-11-13
**Repository:** github.com/datarian/CV

---

**Quick Access:**
- 🎨 Shared principles? → [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
- 📄 PDF guides? → [pdf/](pdf/)
- 💾 Historical docs? → [archive/](archive/)
