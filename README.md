# Swiss Tech Resume Builder

A Claude Code **plugin** that builds ATS-optimized resumes for the Swiss technology job
market. Instead of hand-editing LaTeX and guessing at keywords, you work with a set of
specialized Claude Code skills that research the market, plan a strategy, write grounded
content, render a polished PDF, and review the result against quality gates — then hand you
a paired application strategy.

Install it into any project in two commands; no cloning or file copying required.

```text
/plugin marketplace add datarian/CV
/plugin install swiss-tech-resume-builder@swiss-tech-resume
```

## Table of Contents

- [Install](#install)
- [How it works](#how-it-works)
- [Getting started](#getting-started)
- [Usage examples](#usage-examples)
- [Repository structure](#repository-structure)
- [PDF rendering & LaTeX details](#pdf-rendering--latex-details)
- [Web resume (author-only)](#web-resume-author-only)
- [Privacy & security](#privacy--security)
- [Fork & customize](#fork--customize)
- [Resources](#resources)

## Install

This repository is a Claude Code plugin **marketplace**. In Claude Code:

```text
/plugin marketplace add datarian/CV
/plugin install swiss-tech-resume-builder@swiss-tech-resume
```

The plugin bundles everything the pipeline needs: the orchestrator skill, all phase
sub-skills, the two review agents, the LaTeX template, the Swiss-market knowledge base, and
the style guide. Update later with `/plugin marketplace update swiss-tech-resume`.

Once installed, just ask:

```text
> How do I use the Swiss tech resume builder?
```

That triggers the `swiss-tech-resume-setup` skill, which checks your prerequisites,
scaffolds a personal profile and workspace **in your own project**, and hands off to the
builder.

> **Scope — v0.1.0 ships the PDF pipeline.** The interactive web-resume renderer and its
> deploy mode are author-only and not bundled (they depend on a Vite app and a private
> GitHub Pages repo). The PDF path is fully self-contained and is the supported workflow for
> installers. See [Web resume](#web-resume-author-only).

**Working in this repository directly:** if you've cloned the repo, Claude Code
auto-discovers the skills from `.claude/skills/` — no install step needed.

## How it works

The system is a **lean orchestrator skill** plus focused sub-skills and two review agents.
The orchestrator (`swiss-tech-resume-builder`) owns the pipeline and the decision gates; each
step delegates to the skill or agent that does the work.

| Step | Skill / agent | Role |
|------|---------------|------|
| Profile setup | `swiss-tech-resume-setup` | Prerequisites, scaffold `docs/PERSONAL_PROFILE.md` and the workspace |
| Market analysis | `resume-market-analysis` | Salary benchmarks, in-demand skills, ATS keywords for a target role |
| Strategy | `resume-strategy` | Positioning, section emphasis, keyword selection (a compact brief) |
| Content generation | `resume-content-generation` | Writes the format-agnostic `resume_content.md` (runs on Opus) |
| **Content review (gate)** | `swiss-tech-resume-reviewer` agent | Scores content + ATS match; **must pass** before rendering |
| PDF render | `resume-render-pdf` | Renders `resume_content.md` to a moderncv PDF, compiles with XeLaTeX |
| **Design review (gate)** | `design-reviewer` agent | Visual QA against the style guide |
| Finalize | `swiss-tech-resume-builder` | Holistic narrative review + paired application strategy |

Content data flows one way: everything is generated from your single source of truth,
`docs/PERSONAL_PROFILE.md`. A core principle is **grounding** — every metric, technology, and
claim in the resume must trace back to a statement in your profile; the content reviewer
fails any resume containing an unsupported claim.

### The quality loop

The two review agents are gates, not suggestions. Content review must pass before anything is
rendered; design review runs after rendering. If a gate fails, the relevant step re-runs with
the reviewer's feedback (capped at three iterations) before escalating to you. This keeps the
output honest and on-standard without endless churn.

## Getting started

### Prerequisites

The PDF pipeline needs, on your machine:

- **XeLaTeX** (TeX Live / MacTeX) with the `moderncv`, `moderntimeline`, and `fontawesome`
  packages. **Never use pdflatex** — this project requires XeLaTeX.
  - macOS: `brew install --cask mactex` (or `basictex` for a minimal install)
  - Ubuntu/Debian: `sudo apt-get install texlive-xetex texlive-fonts-extra texlive-latex-extra`
- **Fonts**: Roboto, Lato, Roboto Slab (used by the template via `fontspec`).
- **Python 3**: for the application-scaffolding helper.

The `swiss-tech-resume-setup` skill checks all of these and reports anything missing, so the
simplest path is to install the plugin and ask it to set you up.

### Create your profile

Your profile is the single source of truth. The setup skill creates it from the bundled
example; manually, that is:

```bash
cp docs/PERSONAL_PROFILE.example.md docs/PERSONAL_PROFILE.md
# then fill it in with your real experience — keep it comprehensive and quantified
```

Keep **all** of your experience here, then let the pipeline pull the relevant slice per
application. A real `PERSONAL_PROFILE.md` must never be committed (it's gitignored).

## Usage examples

These are conversational — you talk to the builder and it runs the pipeline. Company names
below are placeholders.

### A generic resume

```text
You: "Create a Swiss-market resume for ML Engineer roles."

→ strategy → content generation → content review gate → PDF render → design review
Result: resumes/compiled/{date}_generic_ml_engineer_CV_en.pdf
```

### A company-specific application

```text
You: "I want to apply for the Senior ML Engineer role at <Company X>. Here is the posting: <url>"

→ market analysis (salary, stack, keywords) → strategy → content → review gates → render → finalize
Result:
  resumes/customized/{date}_companyx_senior_ml_engineer/...        (resume)
  resumes/customized/{date}_companyx_senior_ml_engineer_application_strategy.md
    – cover-letter strategy, salary negotiation, interview prep, fit assessment
```

### Scaffold an application from the CLI

```bash
# Installed plugin:
python3 "${CLAUDE_PLUGIN_ROOT}/.claude/skills/swiss-tech-resume-builder/scripts/init_application.py" \
  --company companyx --role ml_engineer
# Source repository:
python3 .claude/skills/swiss-tech-resume-builder/scripts/init_application.py \
  --company companyx --role ml_engineer
```

This creates `{date}_companyx_ml_engineer.tex` and a strategy stub under
`resumes/customized/` in your current project, finding the bundled template automatically.

## Repository structure

```
CV/
├── .claude-plugin/                 # Marketplace + plugin manifests
│   ├── marketplace.json            #   marketplace "swiss-tech-resume"
│   └── plugin.json                 #   plugin "swiss-tech-resume-builder"
│
├── .claude/
│   ├── skills/                     # The pipeline (auto-discovered locally, bundled when installed)
│   │   ├── swiss-tech-resume-builder/   # Orchestrator (+ scripts, references, assets)
│   │   ├── swiss-tech-resume-setup/     # First-run setup & "how do I use this?"
│   │   ├── resume-market-analysis/
│   │   ├── resume-strategy/
│   │   ├── resume-content-generation/
│   │   ├── resume-content-review/
│   │   ├── resume-render-pdf/
│   │   ├── resume-render-web/            # Author-only (see below)
│   │   └── resume-design-review/
│   ├── agents/                     # Review gates
│   │   ├── swiss-tech-resume-reviewer.md
│   │   └── design-reviewer.md
│   └── commands/                   # Slash commands (e.g. /preview-web-resume)
│
├── docs/
│   ├── PERSONAL_PROFILE.md         # YOUR data source (private, gitignored)
│   ├── PERSONAL_PROFILE.example.md # Template with placeholders (bundled)
│   ├── knowledge/                  # Swiss-market standards: ATS, tone, bullets, grounding, conventions
│   ├── style-guide/                # pdf/ and web/ design specifications
│   └── plans/                      # Design & implementation notes
│
├── resumes/
│   ├── templates/CV_template.tex   # Universal moderncv template (bundled)
│   ├── customized/                 # Per-application output (private, gitignored)
│   └── compiled/                   # Final timestamped PDFs (private, gitignored)
│
├── resources/                      # Portrait photos (private, gitignored)
├── CLAUDE.md                       # Project instructions for Claude Code
├── LICENSE                         # CC BY-NC-SA 4.0
└── README.md                       # This file
```

The skills reference the bundled knowledge base, style guide, and template under
`${CLAUDE_PLUGIN_ROOT}/` when installed, or relative to the repo root when run from source —
so the same skills work both ways.

## PDF rendering & LaTeX details

The PDF is produced by `resume-render-pdf` from the approved `resume_content.md`, using the
`CV_template.tex` moderncv template and compiled with XeLaTeX. If you ever compile manually:

```bash
cd resumes/customized/
xelatex {date}_companyx_role.tex
rm -f *.aux *.log *.out *.fls *.fdb_latexmk *.gz *.toc *.bbl *.blg   # clean build artifacts
```

Key configuration the template relies on:

- **Document class**: `moderncv` with the **`fancy`** style — mandatory for reliable
  multi-page output. Never use `casual` (it breaks on multi-page documents).
- **Compiler**: XeLaTeX (required for the custom fonts).
- **Fonts**: Roboto, Lato, Roboto Slab via `fontspec`.

## Web resume (author-only)

An interactive React/Vite web resume and a private GitHub Pages deploy exist in the author's
workflow (`resume-render-web`, `/preview-web-resume`), but the Vite app is **not part of the
distributed plugin** in v0.1.0. When the app is absent, the web skill stops and points you to
the PDF pipeline. Bundling or scaffolding the web app for installers is a planned follow-up
(see `docs/plans/2026-06-06-plugin-marketplace-plan.md`).

## Privacy & security

The public repository — and therefore the installable plugin — contains only the **generic
system**. Your personal data never ships. The following are gitignored and never committed:

- `docs/PERSONAL_PROFILE.md` — your real data
- everything under `resumes/customized/` and `resumes/compiled/`
- all `*.pdf` files and portrait photos in `resources/`
- the legacy personal `CV_*_*.tex` sources

What's tracked and safe to share: the skills, agents, knowledge base, style guide, the LaTeX
template, and `docs/PERSONAL_PROFILE.example.md` (placeholders only). Before pushing a fork,
run `git status` and confirm no `PERSONAL_PROFILE.md`, PDFs, `resumes/customized/`, or photos
are staged.

## Fork & customize

The system is built to be adapted:

- **Other markets or industries** — edit the knowledge base under `docs/knowledge/` and the
  template, then publish your fork as its own marketplace by updating
  `.claude-plugin/marketplace.json` and `.claude-plugin/plugin.json`.
- **Share it** — point people at your marketplace; they install with the same two `/plugin`
  commands. No tarballs or manual symlinks.

## Resources

- Swiss official salary calculator: <https://www.salarium.bfs.admin.ch/>
- moderncv documentation: <https://ctan.org/pkg/moderncv>
- Claude Code plugins: <https://code.claude.com/docs/en/plugins>
- Claude Code: <https://docs.claude.com/claude-code>

---

Licensed under **CC BY-NC-SA 4.0**. Built with [Claude Code](https://claude.com/claude-code).
Explore the system at [github.com/datarian/CV](https://github.com/datarian/CV).
