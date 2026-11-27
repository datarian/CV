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
4. **GitHub footer is MANDATORY** — every CV must end with the footer line in the CV's language — English: `"Curious how this resume was built? Explore the system at \url{github.com/datarian/CV}"`; German: `"Neugierig, wie dieser Lebenslauf entstanden ist? Das System dahinter: \url{github.com/datarian/CV}"`. Place this using moderncv's footer mechanism or as a final section.
5. **Never change job titles** of past or current employment entries.

---

## Reference Documents

| Document | Purpose |
|---|---|
| `skills/resume-render-pdf/references/moderncv_technical_guide.md` | Technical reference for all moderncv commands, troubleshooting, and package compatibility — **consult first for any LaTeX question** |
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
python3 skills/resume-render-pdf/scripts/validate_latex.py resumes/customized/{id}/{id}.tex
```

Fix all errors reported before proceeding. Common issues caught by validation:
- `\cventry` argument count != 6
- Unbalanced braces
- Forbidden moderncv styles (`casual`, `classic`, etc.)
- Missing mandatory footer link

### 4. Compile

Run the compile script from the repo root:

```bash
bash skills/resume-render-pdf/scripts/compile_resume.sh resumes/customized/{id}/{id}.tex
```

The script runs XeLaTeX (two passes for cross-references) and reports errors. If compilation fails, diagnose the error message and fix the `.tex` file, then re-validate and re-compile.

### 5. Move output to compiled directory

```bash
mv resumes/customized/{id}/{id}.pdf resumes/compiled/YYYY_MM_DD_HH_MM_{id}_CV_en.pdf
```

Use the current timestamp for the filename prefix.

### 6. Clean up build artifacts

```bash
find resumes/customized/{id} -maxdepth 1 \( -name '*.aux' -o -name '*.log' -o -name '*.out' \
     -o -name '*.fls' -o -name '*.fdb_latexmk' -o -name '*.gz' -o -name '*.toc' \
     -o -name '*.bbl' -o -name '*.blg' \) -delete
```

Use `find`, not `rm -f *.aux *.fls …`: in zsh (the default macOS shell) one unmatched glob aborts the
whole `rm`, so nothing gets deleted.

### 7. Look at the result before handing off

Render page previews and actually inspect them. `pdftoppm` is often missing, Ghostscript is not:

```bash
gs -q -dNOPAUSE -dBATCH -sDEVICE=png16m -r100 -sOutputFile=/tmp/page%d.png resumes/customized/{id}/{id}.pdf
gs -q -dNOPAUSE -dBATCH -sDEVICE=txtwrite -sOutputFile=- resumes/customized/{id}/{id}.pdf   # text check
```

Check: page count, no near-empty last page, every experience bullet ≤ 3 rendered lines, no
one-word last lines, entry headings not stranding a single word, section headings in colour.

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
| `Missing } inserted` in an entry | `\\` inside a `\cventry`/`\cvitem` text ends the table row | Use `\newline` for line breaks inside entries |

For detailed troubleshooting, see `skills/resume-render-pdf/references/moderncv_technical_guide.md`.

## Layout Pitfalls (moderncv fancy)

The template preamble already contains the fixes below. **Keep its layout patches when copying it**, and
reach for these before inventing a workaround:

| Symptom | Cause | Fix |
|---|---|---|
| Text stays justified or hyphenated despite `\raggedright` / `\hyphenpenalty` in the text | Text sits in a tabular p-column; inline settings don't reliably reach the paragraph end | Column-type patch on `\@cvitem` (`>{\RaggedRight…}p{\maincolumnwidth}`), already in the template |
| Ragged settings ignored after **bold** text | ragged2e re-applies its lengths on every font change | Set `\RaggedRightRightskip` / `\RaggedRightParfillskip` globally (template) |
| One-word last lines inside bullets only | `\@trivlist` resets `\parfillskip` | `\apptocmd{\@trivlist}{\parfillskip\RaggedRightParfillskip}` (template) |
| Section headings black although `color1` is blue | The style copies colours with `\colorlet` at load time | `\colorlet{sectioncolor}{color1}` after redefining `color1` (template) |
| City stranded on its own line under a job heading | Stock heading packs title, company and city next to the date box | Two-line `\cventry` redefinition (template) |
| Extra gap under the first entry of a section | `\vspace` placed directly after `\section{}` | Never put `\vspace` between `\section{}` and its first entry |
| Long entry won't break across pages / jumps whole to next page | `\vspace*{…}` before a continuation block, or moving a bullet into the first block until it no longer fits | Split long entries into heading block + `\cvitem[0pt]{}{…}` continuation joined with `\vspace{-6pt}` (no star); keep ≥ 2 bullets on the first page |
| A short tail ("2 Mio.", "LiteLLM.") wraps alone | Normal line breaking | Tie it: `EUR~2~Mio.`, `mit~LiteLLM.`; protect title compounds with `\mbox{KI-Systeme}` |
| Header title wraps to 2 lines | Title too long for the name column | Shorten the positioning title; aim for one line |
| Heading overlaps the contact block | Too much negative space after `\makecvtitle` | Cap at about `\vspace{-6pt}`; the photo + contact column sets the header height |
| Bullets over 3 lines | Content too long | Fix in `resume_content.md` (cut redundancy, e.g. tools already in the skills block), not with smaller fonts |

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
