---
name: swiss-tech-resume-builder
description: Create ATS-optimized resumes for Swiss technology positions. This skill orchestrates the end-to-end resume pipeline — market analysis, strategy, content generation, PDF rendering, and iterative quality review — and produces a paired application strategy. Use when creating or optimizing a resume for the Swiss tech job market, customizing one for a specific Swiss job application, or generating cover-letter / salary-negotiation / interview-prep guidance. Specialized for Swiss conventions (work permits, CEFR languages, salary norms) and ML/AI/Engineering roles.
---

# Swiss Tech Resume Builder

> **Bundled reference files.** Paths in this skill (and its sub-skills) beginning with
> `docs/` or `resumes/templates/` are bundled with this skill package and resolve relative to
> the **package (repository) root** — read them exactly as written when working inside the repo.
> If your agent installs the package outside the working directory and exposes its install root
> via a variable (e.g. Claude Code's `${CLAUDE_PLUGIN_ROOT}/`), prepend that.
> `docs/PERSONAL_PROFILE.md` and everything under `resumes/customized/` and `resumes/compiled/`
> are working files in the **current project**, not bundled. `references/…` and `assets/…` paths
> are relative to this skill's own directory and resolve the same way in both modes.

## Overview

This skill is the **lean orchestrator** for building Swiss-market tech resumes. It owns the pipeline, the decision gates, profile setup, and the final application-strategy generation. All phase-specific procedure (market research, ATS tactics, LaTeX/moderncv rules, design rules, troubleshooting) lives in the sub-skills — this file points to them rather than restating them.

**When to use:**
- Creating or customizing a resume for a Swiss tech position (ML/AI, Software Engineering, DevOps, Data Science)
- Adapting an international resume to Swiss conventions
- Producing a paired application strategy (cover letter, salary negotiation, interview prep)

**When not to use:** generic non-Swiss resumes, or non-technical fields (this pipeline is tuned for the Swiss tech market).

## The Pipeline

Run these steps in order. Each step names the skill to use and whether it runs **INLINE** (in this conversation) or **ISOLATED** (in a fresh sub-context that loads the named skill with fresh eyes). Use whatever isolation mechanism your agent provides — a dispatched subagent, a forked skill context (`context: fork`), or an explicit `/skill:` invocation in a clean turn. The review skills declare `context: fork` so they isolate automatically where supported.

1. **Profile setup** — INLINE → `resume-profile-coach`. Ensure `docs/PERSONAL_PROFILE.md` exists, is current, and actually supports the target. The coach ingests the user's source material, audits the profile against the schema, and — when a specific role is in play — spots gaps between the user's goal and what the profile substantiates, logging open items to `docs/MISSING_INFORMATION.md`. Schema: `references/personal_profile_schema.md`. See "Profile setup" below.
2. **Market analysis** — ISOLATED → `resume-market-analysis`. Run when targeting a specific role/company; produces salary benchmarks, in-demand skills, and ATS keywords. Skip for a fully generic resume.
3. **Strategy** — INLINE → `resume-strategy`. Decide positioning, section emphasis, and ATS keyword selection from market analysis + profile. Output is a compact strategy brief reused downstream.
4. **Content generation** — ISOLATED (on the strongest available model, e.g. **Opus** on Claude) → `resume-content-generation`. Writes `resumes/customized/{id}/resume_content.md`. Pass the strategy brief and the target directory in the dispatch prompt.
5. **GATE — content review (Pattern A, pre-render)** — run `resume-content-review` ISOLATED (it forks a fresh context to review with fresh eyes). Branch on its verdict contract: **`pass` = rating ≥ 8.0 AND ats_match ≥ 75**. If not `pass` and iterations < 3: re-dispatch step 4 (content generation) with the reviewer feedback + the existing `resume_content.md` path. If the 3-iteration cap is hit without `pass`: escalate to the user.
6. **GATE — user content review (pre-render)** — INLINE. Once the reviewer passes, **pause and hand `resume_content.md` to the user before rendering**. Surface the path, summarize the reviewer's verdict, and explicitly offer them the chance to read and edit the content. See "User content-review gate" below. Do **not** proceed to render until the user approves. If they request changes, either apply their edits directly or re-dispatch step 4 with their instructions, then re-run the step 5 gate before returning here.
7. **Render** — ISOLATED → `resume-render-pdf`, rendering the approved `resume_content.md` into a PDF.
8. **Post-render QA** — run `resume-content-review` ISOLATED to verify the content survived rendering (carry the ≥ 8.0 target forward) **and** `resume-design-review` ISOLATED (**`pass` = rating ≥ 9.0**). Iterate ≤ 3 times, re-running `resume-render-pdf` with the reviewer feedback.
9. **Finalize** — INLINE. Holistic review of the narrative (does it position for the target role, justify the salary target, fit the Swiss market?), then generate the paired `..._application_strategy.md`. See "Application-strategy generation" below.

## Profile setup

`docs/PERSONAL_PROFILE.md` is the single source of truth — keep ALL experience here, then pull relevant slices per application.

- If it does not exist, create it from the bundled example. Copy the example into the
  current project: source it from `docs/PERSONAL_PROFILE.example.md` (relative to the package
  root; prepend your agent's install-root variable such as `${CLAUDE_PLUGIN_ROOT}/` if the
  package is installed outside the working directory) — writing to `docs/PERSONAL_PROFILE.md`
  in the user's project.
- **Don't ask the user to fill it in by hand** — delegate to `resume-profile-coach`. It builds
  the profile out conversationally from the user's source material (performance reviews,
  employment references / *Arbeitszeugnisse*, LinkedIn, past CVs), audits it against the schema
  (`references/personal_profile_schema.md`), and records gaps in `docs/MISSING_INFORMATION.md`.
  Use it on first setup and any time the profile needs work.
- Do not commit a `PERSONAL_PROFILE.md` containing real personal data.

## User content-review gate

After `resume-content-review` passes (step 5) and **before** rendering (step 7),
give the user a real chance to read and shape the content while it is still cheap to change
(plain markdown, no LaTeX/PDF round-trip yet).

- **Surface the artifact:** state the path to `resumes/customized/{id}/resume_content.md` and a
  one-line summary of the reviewer's verdict (rating + ATS match), so the user knows the gate it
  already cleared.
- **Offer the review explicitly:** ask whether they want to read/edit the content or proceed to
  render. Make "proceed" easy — this gate is an opportunity, not a forced step.
- **On requested changes:** either apply their edits to `resume_content.md` directly, or
  re-dispatch step 4 (content generation) with their instructions for larger reworks. Then
  re-run the step 5 content-review gate before returning here.
- **Only render on approval:** do not advance to step 7 until the user signs off on the content.

## Application-strategy generation

When the resume is finalized (step 9), always produce a paired strategy document.

- **Template:** `assets/application_strategy_template.md` — copy it and fill every section (Executive Summary, Position Overview, Cover Letter Strategy, Salary Negotiation, Interview Prep, Timeline, Success Metrics, Strategic Assessment, Key Talking Points, Final Recommendations).
- **Inputs:** the market-analysis output (salary data, company intel), the strategy brief, the job posting, and the holistic-review findings.
- **Naming & pairing:** `YYYY_MM_DD_company_role_application_strategy.md`, written **inside the application's `{id}/` folder** alongside the resume content and rendered artifacts (NOT one level up in `resumes/customized/`):
  ```
  resumes/customized/
  └── 2025_11_10_google_ml_engineer/             ({id} folder — all artifacts co-located)
      ├── resume_content.md
      ├── 2025_11_10_google_ml_engineer.tex
      ├── 2025_11_10_google_ml_engineer.pdf
      └── 2025_11_10_google_ml_engineer_application_strategy.md
  ```
  (A timestamped copy of the final PDF still also goes to `resumes/compiled/`.)
- The helper script `scripts/init_application.py` (in this skill's own directory) can scaffold
  the `{id}` and a strategy stub. It writes into `resumes/customized/` in the current project
  and finds the bundled template automatically. Run it from the user's project root:
  ```bash
  # From the repo (skills live under .agents/skills/, symlinked into each agent's skills dir):
  python3 .agents/skills/swiss-tech-resume-builder/scripts/init_application.py --company google --role ml_engineer
  # If the package is installed outside the working directory, prepend your agent's install
  # root, e.g. Claude Code:
  python3 "${CLAUDE_PLUGIN_ROOT}/.agents/skills/swiss-tech-resume-builder/scripts/init_application.py" --company google --role ml_engineer
  ```

## Execution-model rule

- **INLINE** when the output is compact AND reused later in this conversation: strategy brief, decision gates (content-review branch, holistic finalize).
- **ISOLATED** when the work is bulky AND the output is a file or a summary: market analysis, content generation, the render, and the reviews.
- Isolation mechanics are agent-specific: use a dispatched subagent, a `context: fork` skill, or a clean `/skill:` turn. `resume-market-analysis`, `resume-content-generation`, and `resume-render-pdf` load their skill in the isolated context. `resume-content-review` and `resume-design-review` declare `context: fork`, so they review with fresh eyes wherever forking is supported.
- **Model selection**: run `resume-content-generation` on the strongest available model (**Opus** on Claude Code). It is the highest-judgment step in the pipeline — selecting which achievements survive, combining related ones, and compressing to the bullet budget is exactly the reasoning that gates content-review quality (rating ≥ 8.0). The mechanical phases (render, market analysis) may run on the default model.

## Pointers

| Phase | Sub-skill / agent |
|-------|-------------------|
| Profile setup / coaching | `resume-profile-coach` (inline) |
| Market analysis | `resume-market-analysis` (isolated) |
| Strategy | `resume-strategy` (inline) |
| Content generation | `resume-content-generation` (isolated) |
| Content review (gate) | `resume-content-review` (isolated, `context: fork`) |
| PDF render | `resume-render-pdf` (isolated) |
| Design review (QA) | `resume-design-review` (isolated, `context: fork`) |

**Bundled assets** (kept here, referenced above): `scripts/init_application.py`, `assets/application_strategy_template.md`, `references/personal_profile_schema.md`.
