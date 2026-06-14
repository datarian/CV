---
name: swiss-tech-resume-setup
description: First-run setup and "how do I use this?" guide for the Swiss Tech Resume Builder plugin. Use when a user has just installed the plugin and asks how to get started, how to use it, what the prerequisites are, or wants help creating their personal profile and resume workspace. Walks through prerequisite checks, scaffolds the workspace in the user's project, and hands off to the swiss-tech-resume-builder orchestrator.
---

# Swiss Tech Resume Builder — Setup & Getting Started

Use this skill the first time someone runs the plugin, or whenever they ask
"how do I use this / set this up / what do I need?". It gets a newcomer from a
fresh install to a ready-to-run workspace, then hands off to the
`swiss-tech-resume-builder` orchestrator.

This is an **INLINE** skill — perform the steps in the conversation, checking
with the user as you go. Do not dispatch a subagent for setup.

## What this plugin does

It builds ATS-optimized resumes for the **Swiss tech job market** (ML/AI,
Software Engineering, DevOps, Data Science) through a reviewed pipeline: market
analysis → strategy → content generation → **PDF render (LaTeX/moderncv)** →
content & design review → paired application strategy.

## Step 1 — Check prerequisites

Confirm the tools the PDF pipeline needs are installed; report what is missing
with install hints, and don't proceed to render until LaTeX is available.

- **XeLaTeX** (required for rendering): `xelatex --version`.
  Missing → install a TeX distribution (TeX Live / MacTeX, or `brew install --cask mactex-no-gui` on macOS). **Never use pdflatex** — this project requires XeLaTeX.
- **LaTeX packages**: `moderncv`, `moderntimeline`, `fontawesome` (usually bundled with a full TeX install).
- **Fonts**: Roboto, Lato, Roboto Slab (the template uses `fontspec`). On macOS, install via Homebrew fonts or the system font manager if the render reports a missing font.
- **Python 3** (for the `init_application.py` scaffolding helper): `python3 --version`.
- **Node.js** is **only** needed for the author-only web path — skip it for the PDF pipeline.

## Step 2 — Scaffold the workspace in the user's project

All of these are created in the **user's current project** (their working
directory), never in the plugin cache.

1. **Personal profile** — the single source of truth. If `docs/PERSONAL_PROFILE.md`
   does not already exist, create it from the bundled example:
   - The example ships with this package at `docs/PERSONAL_PROFILE.example.md` (relative to the
     package root; prepend your agent's install-root variable such as `${CLAUDE_PLUGIN_ROOT}/`
     if the package is installed outside the working directory). Copy it to
     `docs/PERSONAL_PROFILE.md` in the user's project.
   - Then hand off to the **`resume-profile-coach`** skill to build the profile out
     conversationally — ingesting the user's performance reviews, employment references
     (Swiss *Arbeitszeugnisse*), LinkedIn profile, and past CVs, auditing it against the
     schema, and flagging gaps into `docs/MISSING_INFORMATION.md`. Do **not** ask the user
     to fill in the file by hand.
   - **Privacy:** a real `docs/PERSONAL_PROFILE.md` must never be committed. Make
     sure the user's `.gitignore` excludes `docs/PERSONAL_PROFILE.md` (and
     compiled PDFs / customized resumes) before they add real data.
2. **Output directories** — create `resumes/customized/` and `resumes/compiled/`
   in the user's project if absent. Generated resume sources and timestamped
   PDFs land here.

## Step 3 — Hand off to the pipeline

Once prerequisites pass and `docs/PERSONAL_PROFILE.md` has real content:

- For a **generic** resume: invoke the `swiss-tech-resume-builder` orchestrator
  and follow its pipeline (it can skip market analysis for a fully generic CV).
- For a **specific job posting**: give the orchestrator the posting; it runs
  market analysis → strategy → content → render → review.

The pipeline produces a PDF resume and a paired application strategy.

Point the user to the orchestrator skill as the thing they'll use from now on;
this setup skill is only needed again if they start a fresh project.

## Notes

- The plugin ships only the generic system (skills, knowledge, style guide,
  template, example profile). No personal CV data is included.
- Every generated resume ends with the attribution line:
  "Curious how this resume was built? Explore the system at github.com/datarian/CV".
