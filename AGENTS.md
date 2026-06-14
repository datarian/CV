# AGENTS.md

Project instructions for any AI coding agent working in this repository (Claude Code,
Gemini CLI, Cursor, Pi, and other tools that read `AGENTS.md`). `CLAUDE.md` and `GEMINI.md`
are symlinks to this file so every agent reads the same guidance.

## Project Goal

This repository builds polished, ATS-optimized CVs/resumes for the Swiss technology job
market, packaged as a **portable, multi-agent skill bundle** (Agent Skills standard). It
targets roles such as ML Engineer, MLOps Engineer, AI Software Architect, and Engineering
Manager.

Work proceeds in two modes: a generic resume that fits the target roles and market, and
job-specific tailoring for individual postings.

**Privacy:** the user's own career objectives, target roles, and salary expectations are
personal data and live only in their private `docs/PERSONAL_PROFILE.md` (gitignored) — never
in this file or any other tracked file.

## Repository Overview

This is a LaTeX-based CV/Resume system, with a portable skill pipeline, for producing
bilingual (English/German) resumes for the Swiss tech market. The skills follow the
[Agent Skills standard](https://agentskills.io/specification), so the same pipeline runs
across Claude Code, Gemini CLI, Cursor, and Pi.

## File Structure

- `.agents/skills/` - **Canonical home of the resume pipeline** (single source of truth):
  the `swiss-tech-resume-builder` orchestrator plus `resume-*` sub-skills (profile coaching,
  market analysis, strategy, content generation, PDF render, content/design review) and
  `swiss-tech-resume-setup`. The two review skills (`resume-content-review`,
  `resume-design-review`) declare `context: fork` so they review with fresh eyes.
- **Pi, Cursor, and Gemini CLI read `.agents/skills/` natively** (no config — just open/run in
  a clone; Gemini treats `.agents/skills/` as a workspace-skills alias). **Claude Code** uses
  the `.claude/skills/` symlink into `.agents/skills/` (plus the plugin manifest). Edit skills
  only in `.agents/skills/` — never through a symlink.
- `.claude-plugin/` - Claude Code plugin + marketplace manifests (points `skills` at
  `.agents/skills/`).
- `docs/PERSONAL_PROFILE.md` - **Primary data source** (private, gitignored). Built and
  maintained via the `resume-profile-coach` skill. Template: `docs/PERSONAL_PROFILE.example.md`.
- `docs/MISSING_INFORMATION.md` - Durable profile-gap ledger (private, gitignored), owned by
  the profile coach. Template: `docs/MISSING_INFORMATION.example.md`.
- `docs/knowledge/` - Swiss-market standards (ATS, tone, bullets, grounding, conventions).
- `docs/style-guide/` - Design specifications (`pdf/` and `web/`).
- `resumes/templates/CV_template.tex` - Universal moderncv template for all role types.
- `resumes/customized/{id}/` - Per-application working files (private, gitignored):
  `resume_content.md`, the `.tex`, the compiled PDF, and `..._application_strategy.md`.
- `resumes/compiled/` - Final timestamped PDF outputs (private, gitignored).
- `resources/` - Portrait photos (private, gitignored).

## Rendering

PDF rendering is driven by the `resume-render-pdf` skill (invoked by the
`swiss-tech-resume-builder` orchestrator): it fills the template from the approved
`resume_content.md`, compiles with XeLaTeX, and cleans up. The skills are the single source
of truth — see "Resume Workflow" below.

For manual work on a `.tex` directly:
```bash
cd resumes/customized/{id}/
xelatex {id}.tex
rm -f *.aux *.log *.out *.fls *.fdb_latexmk *.gz *.toc *.bbl *.blg   # clean build artifacts
```

Always compile with XeLaTeX (never pdflatex). Templates use the `moderncv` class.

## LaTeX Dependencies

The CV uses:
- `moderncv` document class with **`fancy` style (REQUIRED)**
- Custom fonts via `fontspec` (Roboto, Lato, Roboto Slab)
- `moderntimeline` package for timeline visualizations
- `fontawesome` for icons
- Multiple language support via `babel`

### CRITICAL: ModernCV Style Requirement
**ALWAYS use `\moderncvstyle{fancy}` for all CVs in this repository.**

- The `fancy` style is MANDATORY because it properly handles multi-page documents
- The `casual` style has a fundamental bug causing "Unbalanced output routine" errors on multi-page CVs
- NEVER use `casual`, `classic`, `banking`, or `oldstyle` styles
- All templates use the `fancy` style
- See `docs/style-guide/pdf/MODERNCV_REFERENCE.md` for detailed technical reference

## Development Notes

- The `.gitignore` excludes LaTeX build artifacts (`*.log`, `*.aux`, `*.out`, `*.gz`) and all personal data (profile, customized/compiled resumes, PDFs, portrait photos)
- Primary data source is `docs/PERSONAL_PROFILE.md` - the comprehensive profile all resumes draw from
- If information is missing, check `docs/MISSING_INFORMATION.md` (the profile coach's gap ledger), then ask the user
- All resume generation should reference `docs/PERSONAL_PROFILE.md` for consistency and completeness

## Web Resources

Statistical Salary Calculator: https://www.salarium.bfs.admin.ch/

### Job Search Portals
See comprehensive list in `docs/JOB_AGENT_RESEARCH.md` (maintained via the `resume-market-analysis` skill)

## Resume Workflow

Resume creation is driven by the `swiss-tech-resume-builder` skill and its `resume-*`
sub-skills (`.agents/skills/`). Those skills are the authoritative, single source of truth
for the pipeline, decision gates, and review loops — do not duplicate workflow steps here.
The two review steps run via the `resume-content-review` and `resume-design-review` skills,
which fork an isolated context (use your agent's isolation mechanism: a subagent, a
`context: fork` skill, or a clean `/skill:` turn).

## File Management

### LaTeX Build Artifacts
Always clean up after compilation:
```bash
rm -f *.aux *.log *.out *.fls *.fdb_latexmk *.gz *.toc *.bbl *.blg
```

### Generated & temporary files
- **Temporary files**: Remove scratch/working files once their content is integrated into `docs/`. Never delete the skills under `.agents/skills/`.
- **Research files**: Consolidate market research into `docs/JOB_AGENT_RESEARCH.md` (gitignored).
- **Analysis files**: Merge insights into existing documentation rather than creating new files.

### Directory Organization
- **Keep clean**: Remove duplicate or outdated files promptly
- **Naming convention**: Use timestamps for compiled PDFs: `YYYY_MM_DD_HH_MM_role_CV_lang.pdf`
- **Version control**: Track significant template changes and customizations


## Key Constraints
- **ModernCV Style**: ALWAYS use `\moderncvstyle{fancy}` - this is MANDATORY for multi-page support
- **cventry Format**: All `\cventry` commands must have exactly 6 arguments: `\cventry{dates}{title}{company}{location}{}{description}`
- **Job titles**: Never change job titles of past or current employments
- **Compilation**: NEVER use pdflatex. Always compile with xelatex
- **Data source**: Always reference docs/PERSONAL_PROFILE.md as the single source of truth
- **Skills are the source of truth**: author and edit skills only in `.agents/skills/`; never edit through the per-agent symlinks
- **File organization**: template in `resumes/templates/`, per-application work in `resumes/customized/{id}/`, final timestamped PDFs in `resumes/compiled/`
- **Clean up**: Clean up any temporary files and experiments when you are done compiling a new version of the CV
- **Page count**: Do not feel you need to fit the whole CV on 1 page. 2-3 page CVs are preferred with room for comprehensive background
- **GitHub Repository Link**: ALWAYS include a link to the GitHub repository at the end of every generated resume with the text: "Curious how this resume was built? Explore the system at github.com/datarian/CV"
- **Privacy**: never put personal data (real profile, salary, career goals) in tracked files; it belongs only in the gitignored `docs/PERSONAL_PROFILE.md`
- **Preview availability**: Preview mode available during development without approval, no credentials required
