---
name: resume-render-pdf
description: Render an approved resume_content.md to a LaTeX moderncv PDF and compile it with XeLaTeX. Use when producing or fixing the PDF resume, or debugging moderncv compilation errors.
---

> **Bundled reference files.** Paths beginning with `docs/` or `resumes/templates/` are
> bundled with this skill package and resolve relative to the **package (repository) root** —
> read them exactly as written when working inside the repo. If your agent installs the package
> outside the working directory and exposes its install root via a variable (e.g. Claude Code's
> `${CLAUDE_PLUGIN_ROOT}/`), prepend that. Files under `resumes/customized/` and
> `resumes/compiled/` are outputs written to the **current project**, not bundled.

## Role

Expert LaTeX engineer specializing in the moderncv package. Renders `resume_content.md` into a polished PDF resume using the project template, compiles it with XeLaTeX, and iterates on any design or compilation feedback.

---

## Critical Repository Rules

These rules are MANDATORY — never deviate from them:

1. **`\moderncvstyle{fancy}` is REQUIRED** — it is the only style that properly handles multi-page documents without "Unbalanced output routine" errors. Never use `casual`, `classic`, `banking`, or `oldstyle`.
2. **`\cventry` must have exactly 6 arguments**: `\cventry{dates}{title}{company}{location}{}{description}`. The 5th argument must be present even if empty (`{}`).
3. **Compile with XeLaTeX ONLY** — never pdflatex.
4. **GitHub footer is MANDATORY** — every CV must end with: `"Curious how this resume was built? Explore the system at \url{github.com/datarian/CV}"`. Place this using moderncv's footer mechanism or as a final section.
5. **Never change job titles** of past or current employment entries.

---

## Reference Documents

| Document | Purpose |
|---|---|
| `.agents/skills/resume-render-pdf/references/moderncv_technical_guide.md` | Technical reference for all moderncv commands, troubleshooting, and package compatibility — **consult first for any LaTeX question** |
| `docs/style-guide/pdf/CV_STYLE_GUIDE.md` | Full design specification: typography, colors, layout, margins |
| `docs/style-guide/pdf/VISUAL_DESIGN_REFERENCE.md` | One-page quick-reference checklist for compliance checks |
| `docs/style-guide/pdf/LATEX_CODE_SNIPPETS.md` | Copy-paste boilerplate, section templates, experience entry templates |
| `resumes/templates/CV_template.tex` | Project template — base for all new customizations |

---

## Rendering Workflow

### 1. Read the content source

Parse `resume_content.md` (located in `resumes/customized/{id}/resume_content.md`):

- **YAML frontmatter** — read `summary_highlights` (3–4 key metrics selected by the content generator).
- **Markdown body** — structured sections for experience, skills, education, etc.

### 2. Fill the template

Copy `resumes/templates/CV_template.tex` to `resumes/customized/{id}/{id}.tex`.

Replace all `[PLACEHOLDER]` values with content from `resume_content.md`:

- **Professional Summary**: mention the same metrics listed in `summary_highlights`, and bold them using `\textbf{}` (e.g., `\textbf{8+ years}`, `\textbf{99.9\% uptime}`).
- Ensure consistency — both the PDF and any web format should emphasize the same metrics.

**Section header spacing rule**: Never leave a blank line between `\section{}` and its first content item — blank lines create paragraph breaks and inconsistent visual gaps.

Correct:
```latex
\section{Experience}
\cventry{2020--present}{...}{...}{...}{}{...}
```
Incorrect (do NOT do this):
```latex
\section{Experience}

\cventry{2020--present}{...}{...}{...}{}{...}
```

### 3. Validate before compiling

Run the validation script from the repo root:

```bash
python3 .agents/skills/resume-render-pdf/scripts/validate_latex.py resumes/customized/{id}/{id}.tex
```

Fix all errors reported before proceeding. Common issues caught by validation:
- `\cventry` argument count != 6
- Unbalanced braces
- Forbidden moderncv styles (`casual`, `classic`, etc.)
- Missing mandatory footer link

### 4. Compile

Run the compile script from the repo root:

```bash
bash .agents/skills/resume-render-pdf/scripts/compile_resume.sh resumes/customized/{id}/{id}.tex
```

The script runs XeLaTeX (two passes for cross-references) and reports errors. If compilation fails, diagnose the error message and fix the `.tex` file, then re-validate and re-compile.

### 5. Move output to compiled directory

```bash
mv resumes/customized/{id}/{id}.pdf resumes/compiled/YYYY_MM_DD_HH_MM_{id}_CV_en.pdf
```

Use the current timestamp for the filename prefix.

### 6. Clean up build artifacts

```bash
rm -f resumes/customized/{id}/*.aux \
       resumes/customized/{id}/*.log \
       resumes/customized/{id}/*.out \
       resumes/customized/{id}/*.fls \
       resumes/customized/{id}/*.fdb_latexmk \
       resumes/customized/{id}/*.gz \
       resumes/customized/{id}/*.toc \
       resumes/customized/{id}/*.bbl \
       resumes/customized/{id}/*.blg
```

---

## Common Errors Quick Reference

| Error | Cause | Fix |
|---|---|---|
| `Unbalanced output routine` | Using `casual` (or other non-fancy) moderncv style | Change to `\moderncvstyle{fancy}` |
| `\cventry` argument count error | Missing 5th empty argument `{}` | Ensure all `\cventry` have 6 `{}` groups |
| `Font not found` | Missing system font (Roboto, Lato, Roboto Slab) | Install fonts or use `fontspec` fallbacks |
| `Package conflict: hyperref` | Wrong package load order | Load `hyperref` last in preamble |
| Blank gap after section header | Blank line between `\section{}` and first entry | Remove blank line — no paragraph break after section headers |
| Missing `fontawesome` icons | Package not installed | Use `tlmgr install fontawesome` or omit icon |

For detailed troubleshooting, see `.agents/skills/resume-render-pdf/references/moderncv_technical_guide.md`.

---

## Iterative Feedback Implementation

When receiving feedback from a reviewer:

1. **Acknowledge** the full list of requested changes.
2. **Prioritize** by severity: Critical → High → Medium → Low.
3. **Implement precisely** — make exactly the requested changes, no more, no less.
4. **Re-validate** with the validate script.
5. **Recompile** with the compile script.
6. **Summarize** what was changed and confirm compilation succeeded.

Style guide compliance checks:
- Consult `docs/style-guide/pdf/CV_STYLE_GUIDE.md` for typography, color, and layout specs.
- Use `docs/style-guide/pdf/LATEX_CODE_SNIPPETS.md` for implementation templates.
- Use `docs/style-guide/pdf/VISUAL_DESIGN_REFERENCE.md` as a quick compliance checklist.

After rendering is complete and content-approved, design quality assurance is handled via the `resume-design-review` skill (run isolated / forked).

**Iteration limits**: Up to 3 rounds of revisions per reviewer. If an issue cannot be resolved after 3 attempts, report to the user with: issue summary, attempts made, technical constraints, and recommendation.

---

## Output Naming Convention

```
resumes/compiled/YYYY_MM_DD_HH_MM_{company}_{role}_CV_en.pdf
```

Example: `resumes/compiled/2025_10_14_14_30_frontify_senior_llm_engineer_CV_en.pdf`

---

## Style Guide Compliance Checklist

Before handing off the compiled PDF:

- [ ] `\moderncvstyle{fancy}` used (never `casual` / `classic` / `banking` / `oldstyle`)
- [ ] All `\cventry` commands have exactly 6 arguments
- [ ] No blank lines between `\section{}` and first content
- [ ] `summary_highlights` metrics bolded in Professional Summary
- [ ] GitHub footer present: `github.com/datarian/CV`
- [ ] Compiled with XeLaTeX (not pdflatex)
- [ ] Build artifacts cleaned up
- [ ] Output PDF in `resumes/compiled/` with timestamped name
- [ ] Font sizes and weights match `CV_STYLE_GUIDE.md` Section 2
- [ ] Colors match approved palette: `#39a7d0`, `#4D4D4D`, `#000000` (Section 3)
- [ ] Layout uses `scale=0.88`, `hintscolumnwidth=3.5cm` (Section 4)
