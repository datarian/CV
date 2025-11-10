# CV Design System Documentation
## Complete Style Guide Package for Jane Smith's CV

**Version:** 1.0  
**Date:** 2025-10-16  
**Based on:** CV-Example.pdf (Frontify Application)

---

## Overview

This style guide package provides comprehensive documentation of the visual design system, typography, layout specifications, and LaTeX implementation details for creating consistent, professional CV documents in the Swiss market for technical roles.

**Design Philosophy:** Clean modernism with Swiss design principles, emphasizing readability, professionalism, and scannable content structure.

**Key Color:** Light Blue (#39a7d0) as brand accent

---

## Documentation Files

### 1. CV_STYLE_GUIDE.md (21KB)
**Purpose:** Comprehensive design specification and reference manual

**Contents:**
- Complete typography specifications (fonts, sizes, weights, hierarchy)
- Full color palette with usage rules and accessibility guidelines
- Layout and spacing system documentation
- Section-by-section styling guides
- LaTeX implementation details
- Swiss market specifications
- Quality assurance checklist
- Common issues and troubleshooting
- Design rationale and decision explanations

**When to use:** 
- Understanding design decisions
- Implementing new templates from scratch
- Resolving design questions
- Comprehensive reference during development

**Sections:** 18 major sections covering every aspect of CV design

---

### 2. VISUAL_DESIGN_REFERENCE.md (8.2KB)
**Purpose:** One-page quick reference cheat sheet

**Contents:**
- Color palette (quick lookup table)
- Typography scale (at-a-glance sizing)
- Spacing system (all key measurements)
- Layout structure (ASCII art diagram)
- Section ordering
- Common formatting patterns
- Action verbs and metrics guidelines
- Critical LaTeX settings
- Quality checklist (abbreviated)
- Common mistakes to avoid

**When to use:**
- Quick lookups during active development
- Verifying specific measurements
- Checking color codes
- Confirming spacing values
- Rapid reference without context switching

**Format:** Tables, lists, code snippets optimized for speed

---

### 3. LATEX_CODE_SNIPPETS.md (17KB)
**Purpose:** Copy-paste code library for rapid development

**Contents:**
- Complete document boilerplate
- Professional summary variations (ML Engineer, MLOps, Manager)
- Technical skills blocks (multiple formats)
- Professional experience entries (all roles, multiple lengths)
- Education entries (all degrees)
- Language section variations
- Optional section templates
- Page management commands
- Special formatting snippets
- Date format examples
- Bullet point templates with best practices
- Icon usage examples
- Customization workflow guide

**When to use:**
- Creating new CV documents
- Copying standardized sections
- Implementing consistent formatting
- Quick scaffolding of new content
- Ensuring format consistency

**Format:** Ready-to-copy LaTeX code blocks with explanations

---

## Quick Start Guide

### For Creating a New CV:

1. **Start with boilerplate** from `LATEX_CODE_SNIPPETS.md`
2. **Customize title and summary** using provided templates
3. **Copy skill categories** and adjust for target role
4. **Add experience entries** using appropriate length templates
5. **Compile and verify** against checklist in `VISUAL_DESIGN_REFERENCE.md`
6. **Fine-tune** with reference to `CV_STYLE_GUIDE.md`

### For Design Questions:

1. **Quick lookup:** Check `VISUAL_DESIGN_REFERENCE.md` first
2. **Detailed info:** Reference `CV_STYLE_GUIDE.md` for complete context
3. **Implementation:** Copy code from `LATEX_CODE_SNIPPETS.md`

### For Quality Assurance:

1. **Visual check:** Compare against original PDF
2. **Checklist:** Use abbreviated checklist in `VISUAL_DESIGN_REFERENCE.md`
3. **Detailed review:** Full checklist in `CV_STYLE_GUIDE.md` section 11

---

## File Structure

```
docs/style-guide/
├── README.md                       (This file - Navigation guide)
├── CV_STYLE_GUIDE.md               (Comprehensive specification - 21KB)
├── VISUAL_DESIGN_REFERENCE.md      (Quick reference - 8.2KB)
└── LATEX_CODE_SNIPPETS.md          (Code library - 17KB)
```

---

## Key Design Specifications (Summary)

### Colors
- **Light Blue:** #39a7d0 (Section headers, links, icons)
- **Dark Grey:** #4D4D4D (Name, metadata)
- **Black:** #000000 (Body text)

### Typography
- **Name:** 24pt Bold Dark Grey
- **Job Title:** 14pt Regular Black
- **Section Headers:** 11pt Bold Light Blue
- **Body Text:** 11pt Regular Black

### Layout
- **Page Margins:** 12% (scale=0.88)
- **Hints Column:** 3.5cm
- **Page Count:** 2-3 pages target
- **Line Spacing:** 1.2x default

### Critical LaTeX Settings
```latex
\documentclass[11pt,a4paper,sans]{moderncv}
\moderncvstyle{fancy}  % MANDATORY
\moderncvcolor{blue}
\geometry{scale=0.88}
\setlength{\hintscolumnwidth}{3.5cm}
```

---

## Usage Workflows

### Workflow 1: New CV from Scratch
1. Copy boilerplate → Customize header → Add sections → Compile → Review

### Workflow 2: Customize Existing CV
1. Copy template → Modify summary → Reorder skills → Adjust experience → Compile → Review

### Workflow 3: Quick Reference Lookup
1. Check quick reference → Find specification → Apply → Verify

### Workflow 4: Troubleshooting Issue
1. Check common mistakes → Review detailed guide → Apply fix → Test

---

## Design Principles Summary

### 1. Clarity Over Decoration
- Clean layouts
- Ample white space
- Clear visual hierarchy
- No unnecessary embellishment

### 2. Scanability
- Section headers highly visible
- Bullet points for achievements
- Metrics highlighted
- Consistent structure

### 3. Professionalism
- Conservative color palette
- Professional typography
- Swiss market standards met
- Technical credibility emphasized

### 4. Swiss Market Fit
- All required information included
- Professional photo present
- Education with grades
- Languages with CEFR levels
- 2-3 page format acceptable

### 5. Technical Credibility
- Technology stack detailed
- Metrics quantified
- Scale demonstrated
- Production focus emphasized

---

## Compliance Checklist

### Design Compliance
- [ ] Colors match specification (#39a7d0, #4D4D4D, #000000)
- [ ] Typography scale consistent (24pt/14pt/11pt/10pt)
- [ ] Layout uses correct margins (scale=0.88)
- [ ] Section headers styled correctly
- [ ] White space balanced

### Content Compliance
- [ ] Professional summary compelling and tailored
- [ ] Skills categorized appropriately
- [ ] All achievements include metrics
- [ ] Action verbs used consistently
- [ ] Date formatting consistent

### Technical Compliance
- [ ] Compiles with xelatex
- [ ] Uses moderncvstyle{fancy}
- [ ] Colors defined correctly
- [ ] No compilation warnings
- [ ] PDF output clean

### Swiss Market Compliance
- [ ] Photo included (64x64pt)
- [ ] Birth date present (DD.MM.YYYY)
- [ ] Nationality stated
- [ ] Complete address
- [ ] Languages with CEFR levels
- [ ] Education grades included

---

## Version History

**Version 1.0 (2025-10-16):**
- Initial comprehensive style guide creation
- Based on Frontify application CV (CV-Example.pdf)
- Three-document system established
- Full design system documented
- LaTeX implementation detailed
- Code snippet library created

---

## Maintenance Notes

### Updating the Style Guide

**When to update:**
- Design changes approved
- New best practices identified
- LaTeX techniques improved
- Market requirements change
- Feedback from applications

**Update process:**
1. Document changes in all three files
2. Update version numbers
3. Add to version history
4. Test with actual compilation
5. Verify against quality checklist

### Adding New Snippets

**Process:**
1. Create and test new LaTeX code
2. Add to `LATEX_CODE_SNIPPETS.md`
3. Document design rationale in `CV_STYLE_GUIDE.md`
4. Add quick reference to `VISUAL_DESIGN_REFERENCE.md` if frequently used

---

## Reference Links

### Internal Documentation
- Source CV: `../../../../resumes/customized/CV-Example.pdf`
- LaTeX Source: `../../../../resumes/customized/2025_10_14_frontify_senior_llm_engineer.tex`
- Personal Profile: `/Users/flo/Development/CV/docs/PERSONAL_PROFILE.md`
- ModernCV Docs: `/Users/flo/Development/CV/docs/MODERNCV_DOC.md`

### External Resources
- ModernCV Package: CTAN moderncv
- FontAwesome Icons: fontawesome.com
- XeLaTeX Documentation: tug.org/xelatex
- Swiss CV Standards: careers.ch

---

## Support and Questions

### For Design Questions
- Reference: `CV_STYLE_GUIDE.md` Section 18 (Design Rationale)
- Quick Check: `VISUAL_DESIGN_REFERENCE.md`

### For Implementation Questions
- Code Examples: `LATEX_CODE_SNIPPETS.md`
- Technical Details: `CV_STYLE_GUIDE.md` Section 9

### For Troubleshooting
- Common Issues: `CV_STYLE_GUIDE.md` Section 12
- Quick Fixes: `LATEX_CODE_SNIPPETS.md` (Quick Fixes section)

---

## Document Statistics

| File | Size | Sections | Purpose |
|------|------|----------|---------|
| CV_STYLE_GUIDE.md | 21KB | 18 | Comprehensive reference |
| VISUAL_DESIGN_REFERENCE.md | 8.2KB | 20 | Quick lookup |
| LATEX_CODE_SNIPPETS.md | 17KB | 25 | Code library |
| **Total** | **46.2KB** | **63** | **Complete system** |

---

## Key Takeaways

1. **Three complementary documents:** Comprehensive guide, quick reference, code library
2. **Consistent design system:** All specifications derived from successful CV
3. **Swiss market optimized:** Meets all local requirements and expectations
4. **Production tested:** Based on actual application CV with proven results
5. **Maintainable:** Clear structure allows easy updates and extensions
6. **Developer friendly:** Copy-paste snippets for rapid development

---

**Created:** 2025-10-16 by latex-design-reviewer agent  
**Based on:** CV-Example.pdf (Frontify Senior AI LLM Engineer Application)  
**Repository:** github.com/yourusername/CV

---

**Quick Access:**
- Need design specs? → `CV_STYLE_GUIDE.md`
- Need quick lookup? → `VISUAL_DESIGN_REFERENCE.md`
- Need code to copy? → `LATEX_CODE_SNIPPETS.md`
