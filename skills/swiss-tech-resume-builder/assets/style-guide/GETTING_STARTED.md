# Getting Started with the CV Style Guide
## Quick Onboarding Guide

**Welcome to your comprehensive CV Design System documentation!**

This guide will help you start using the style guide package immediately.

---

## Step 1: Understand the Package Structure (2 minutes)

You have **6 documentation files** organized in a 3-tier system:

### Tier 1: Quick Reference (Use Daily)
- **VISUAL_DESIGN_REFERENCE.md** - One-page cheat sheet for colors, fonts, measurements

### Tier 2: Code Library (Use for Development)
- **LATEX_CODE_SNIPPETS.md** - Copy-paste LaTeX code for rapid CV creation

### Tier 3: Comprehensive Reference (Use for Details)
- **CV_STYLE_GUIDE.md** - Full design specification with rationale
- **ANALYSIS_SUMMARY.md** - Design analysis and quality assessment

### Navigation
- **README.md** - Package overview and navigation guide
- **PACKAGE_SUMMARY.txt** - Complete package summary

**Recommendation:** Bookmark these three files for daily use:
1. `VISUAL_DESIGN_REFERENCE.md` (quick lookups)
2. `LATEX_CODE_SNIPPETS.md` (code templates)
3. `CV_STYLE_GUIDE.md` (detailed reference)

---

## Step 2: Learn the Design System (5 minutes)

### Core Design Elements

**Color Palette (3 colors only):**
```
Light Blue: #39a7d0  →  Section headers, links, brand accent
Dark Grey:  #4D4D4D  →  Name, metadata
Black:      #000000  →  Body text
```

**Typography Hierarchy:**
```
24pt Bold Dark Grey  →  Your Name
14pt Regular Black   →  Job Title
11pt Bold Light Blue →  Section Headers
11pt Regular Black   →  Body Text
10pt Regular Grey    →  Dates/Metadata
```

**Layout Settings:**
```latex
\geometry{scale=0.88}                    % 12% margins
\setlength{\hintscolumnwidth}{3.5cm}    % Left column width
```

**Critical Rule:** Always use `\moderncvstyle{fancy}` (not casual!)

---

## Step 3: Create Your First CV Using the Style Guide (15 minutes)

### Option A: Customize Existing CV

1. **Copy your existing CV** to a new file:
   ```bash
   cp existing.tex new_job_2025_10_16.tex
   ```

2. **Open VISUAL_DESIGN_REFERENCE.md** in one window

3. **Check your CV against the checklist:**
   - Colors match? (#39a7d0, #4D4D4D, #000000)
   - Fonts correct? (11pt body, 11pt headers)
   - Margins right? (scale=0.88)
   - Style fancy? (\moderncvstyle{fancy})

4. **Fix any issues** using code from LATEX_CODE_SNIPPETS.md

5. **Compile and verify:**
   ```bash
   xelatex new_job_2025_10_16.tex
   ```

### Option B: Create New CV from Scratch

1. **Open LATEX_CODE_SNIPPETS.md**

2. **Copy the "Complete Document Boilerplate"** (first section)

3. **Paste into new file:**
   ```bash
   nano ../../../../resumes/customized/YYYY_MM_DD_company_role.tex
   ```

4. **Add sections** by copying from LATEX_CODE_SNIPPETS.md:
   - Professional Summary (choose ML Engineer/MLOps/Manager variant)
   - Technical Skills (copy full block or customize)
   - Professional Experience (copy TechCorp/EnergyTech/HSR entries)
   - Education (copy all three entries)
   - Languages (copy full section)

5. **Customize:**
   - Update `\title{Your Target Job Title}`
   - Tailor professional summary
   - Reorder skills by relevance
   - Emphasize relevant experience bullets

6. **Compile:**
   ```bash
   cd ../../../../resumes/customized/
   xelatex YYYY_MM_DD_company_role.tex
   ```

---

## Step 4: Quality Check (5 minutes)

### Quick Quality Checklist

Open **VISUAL_DESIGN_REFERENCE.md** and scroll to "Quality Checklist (Quick)":

**Visual:**
- [ ] No overlapping text
- [ ] Consistent spacing between sections
- [ ] Section headers properly styled
- [ ] Photo displays correctly
- [ ] Clean page breaks

**Content:**
- [ ] All achievements include metrics (99.99%, 3M+, 100K+)
- [ ] Action verbs used (Built, Architected, Led, Implemented)
- [ ] Date formatting consistent (MM/YYYY -- MM/YYYY)
- [ ] Technical terms spelled correctly

**Technical:**
- [ ] Compiles with xelatex without warnings
- [ ] Uses `\moderncvstyle{fancy}`
- [ ] Colors defined correctly
- [ ] PDF looks clean at all zoom levels

**Swiss Market:**
- [ ] Photo included (64x64pt)
- [ ] Birth date present
- [ ] Nationality stated
- [ ] Languages with CEFR levels

---

## Step 5: Common Tasks (As Needed)

### Task: Change Color Scheme

**Current:** Light Blue (#39a7d0)  
**Want to change?** Modify this line:

```latex
\definecolor{color1}{HTML}{39a7d0}  % Change hex code here
```

**Recommended alternatives for tech sector:**
- Blue: #0066CC (more conservative)
- Teal: #008B8B (modern, distinctive)
- Purple: #6A5ACD (creative tech)

### Task: Adjust Margins

**Current:** 12% margins (scale=0.88)  
**Want more/less space?**

```latex
\geometry{scale=0.90}  % Less margin (10%)
\geometry{scale=0.85}  % More margin (15%)
```

Always recompute after changing:
```latex
\recomputelengths
```

### Task: Change Hints Column Width

**Current:** 3.5cm  
**Want wider/narrower date column?**

```latex
\setlength{\hintscolumnwidth}{3cm}   % Narrower
\setlength{\hintscolumnwidth}{4cm}   % Wider
\recomputelengths
```

### Task: Add New Section

**Pattern:**
```latex
\section{Section Name}
\cvitem{Label}{Content here}
```

**Or for entries:**
```latex
\section{Section Name}
\cventry{dates}{title}{organization}{location}{}{
Description here
\begin{itemize}
\item Point 1
\item Point 2
\end{itemize}}
```

Copy examples from **LATEX_CODE_SNIPPETS.md**

---

## Step 6: Troubleshooting (When Needed)

### Problem: Compilation Error

**Check:**
1. Using xelatex? (not pdflatex)
2. Using fancy style? (not casual)
3. All \cventry have 6 arguments?
4. Colors defined correctly?

**Quick fix:**
```bash
# Clean artifacts and recompile
rm -f *.aux *.log *.out *.fls *.fdb_latexmk *.gz
xelatex filename.tex
```

### Problem: Photo Not Showing

**Check path:**
```latex
% Use absolute path
\photo[64pt][0.4pt]{../../../../resources/CV_Portrait_black.jpg}
```

### Problem: Text Overlapping

**Usually caused by:**
- Margins too small (increase scale value)
- Hints column too wide (reduce hintscolumnwidth)
- Forgot to \recomputelengths after changes

**Fix:**
```latex
\geometry{scale=0.90}  % Increase from 0.88
\setlength{\hintscolumnwidth}{3cm}  % Reduce from 3.5cm
\recomputelengths  % IMPORTANT
```

### Problem: Section Headers Wrong Color

**Check color definition:**
```latex
\definecolor{color1}{HTML}{39a7d0}  % Must be defined BEFORE \begin{document}
```

---

## Step 7: Advanced Customization (Optional)

### Customize for Different Role Types

**ML Engineer Focus:**
- Professional summary emphasizes: LLM, production systems, model development
- Skills order: LLM & GenAI first
- Experience bullets focus: Model accuracy, inference performance, production scale

**MLOps Focus:**
- Professional summary emphasizes: Infrastructure, Kubernetes, scalability
- Skills order: MLOps & Cloud first
- Experience bullets focus: System reliability, deployment time, cost savings

**Manager Focus:**
- Professional summary emphasizes: Team leadership, strategic impact
- Skills order: Leadership first
- Experience bullets focus: Team growth, mentoring, business outcomes

**Templates available in:** LATEX_CODE_SNIPPETS.md under "Professional Summary Section"

---

## Step 8: Workflow Integration

### Daily Development Workflow

1. **Start:** Open VISUAL_DESIGN_REFERENCE.md for quick lookups
2. **Code:** Copy snippets from LATEX_CODE_SNIPPETS.md
3. **Check:** Verify against quality checklist
4. **Reference:** Consult CV_STYLE_GUIDE.md for detailed questions
5. **Compile:** `xelatex filename.tex`
6. **Review:** Check PDF at multiple zoom levels

### Version Control Workflow

1. **Create:** Date-stamped filename (YYYY_MM_DD_company_role.tex)
2. **Commit:** Track .tex source in git
3. **Compile:** Generate PDF
4. **Archive:** Store PDF in resumes/compiled/
5. **Tag:** Git tag for significant versions

### Application Workflow

1. **Customize:** Tailor CV for specific job posting
2. **Review:** Quality check with VISUAL_DESIGN_REFERENCE.md checklist
3. **Export:** Generate final PDF
4. **Archive:** Save with timestamp and company name
5. **Track:** Note which template/customizations used

---

## Quick Reference Cards

### Color Quick Ref
```
#39a7d0 → Light Blue (headers, links)
#4D4D4D → Dark Grey (name, metadata)
#000000 → Black (body text)
```

### Typography Quick Ref
```
\firstname, \familyname → 24pt Bold Dark Grey
\title                  → 14pt Regular Black
\section                → 11pt Bold Light Blue
Body text               → 11pt Regular Black
```

### Critical LaTeX Quick Ref
```latex
\documentclass[11pt,a4paper,sans]{moderncv}
\moderncvstyle{fancy}  % MUST USE FANCY
\geometry{scale=0.88}
\setlength{\hintscolumnwidth}{3.5cm}
\recomputelengths
```

### Compilation Quick Ref
```bash
xelatex filename.tex
rm -f *.aux *.log *.out *.fls *.fdb_latexmk *.gz
```

---

## Resources Map

**Need this?** → **Go here:**

- Color codes → VISUAL_DESIGN_REFERENCE.md
- Code to copy → LATEX_CODE_SNIPPETS.md
- Design rationale → CV_STYLE_GUIDE.md Section 18
- Typography specs → CV_STYLE_GUIDE.md Section 1
- Layout settings → CV_STYLE_GUIDE.md Section 3
- Quality checklist → VISUAL_DESIGN_REFERENCE.md
- Troubleshooting → CV_STYLE_GUIDE.md Section 12
- Swiss requirements → CV_STYLE_GUIDE.md Section 14
- Quick start → This file (GETTING_STARTED.md)
- Package overview → README.md

---

## Success Tips

1. **Bookmark the Big 3:** Visual reference, code snippets, comprehensive guide
2. **Use the checklists:** Catch issues before they become problems
3. **Copy, don't recreate:** Use provided code snippets for consistency
4. **Compile often:** Catch errors early
5. **Keep it clean:** Clean up .aux files regularly
6. **Version everything:** Use git and dated filenames
7. **Test at scale:** View PDF at 100%, 150%, and 200% zoom
8. **Print test:** Print one copy to verify readability

---

## Next Steps

1. [ ] Bookmark VISUAL_DESIGN_REFERENCE.md
2. [ ] Bookmark LATEX_CODE_SNIPPETS.md
3. [ ] Read through README.md
4. [ ] Try customizing an existing CV
5. [ ] Check against quality checklist
6. [ ] Create your next job-specific CV
7. [ ] Share feedback for style guide improvements

---

## Support

**Questions?** Check these in order:
1. VISUAL_DESIGN_REFERENCE.md (quick answers)
2. CV_STYLE_GUIDE.md (detailed answers)
3. LATEX_CODE_SNIPPETS.md (code examples)
4. Contact: jane.smith@example.com

---

**Welcome to your CV Design System! You're ready to create professional, consistent CVs for the Swiss technical job market.**

**Start with:** Opening VISUAL_DESIGN_REFERENCE.md and LATEX_CODE_SNIPPETS.md in your editor, then customize your next CV!
