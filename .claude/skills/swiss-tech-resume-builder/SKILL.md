---
name: swiss-tech-resume-builder
description: Create ATS-optimized resumes for Swiss technology positions. This skill orchestrates the end-to-end resume pipeline — market analysis, strategy, content generation, dual-format rendering (PDF + web), and iterative quality review — and produces a paired application strategy. Use when creating or optimizing a resume for the Swiss tech job market, customizing one for a specific Swiss job application, or generating cover-letter / salary-negotiation / interview-prep guidance. Specialized for Swiss conventions (work permits, CEFR languages, salary norms) and ML/AI/Engineering roles.
---

# Swiss Tech Resume Builder

> **Bundled reference files.** Paths in this skill (and its sub-skills) beginning with
> `docs/` or `resumes/templates/` are bundled with the plugin. When the plugin is installed,
> read them under `${CLAUDE_PLUGIN_ROOT}/` — the variable expands to the plugin's install
> directory automatically. When working from the source repository the variable is unset, so
> read the same paths relative to the repo root (exactly as written). `docs/PERSONAL_PROFILE.md`
> and everything under `resumes/customized/` and `resumes/compiled/` are working files in the
> **current project**, not bundled. `references/…` and `assets/…` paths are relative to this
> skill's own directory and resolve the same way in both modes.

## Overview

This skill is the **lean orchestrator** for building Swiss-market tech resumes. It owns the pipeline, the decision gates, profile setup, and the final application-strategy generation. All phase-specific procedure (market research, ATS tactics, LaTeX/moderncv rules, web build steps, design rules, troubleshooting) lives in the seven sub-skills — this file points to them rather than restating them.

**When to use:**
- Creating or customizing a resume for a Swiss tech position (ML/AI, Software Engineering, DevOps, Data Science)
- Adapting an international resume to Swiss conventions
- Producing a paired application strategy (cover letter, salary negotiation, interview prep)

**When not to use:** generic non-Swiss resumes, or non-technical fields (this pipeline is tuned for the Swiss tech market).

## The Pipeline

Run these steps in order. Each step names the sub-skill or agent to use and whether it runs **INLINE** (in this conversation) or as a **DISPATCHED SUBAGENT** (general-purpose subagent loading the named skill, or the named review agent).

1. **Profile setup** — INLINE. Ensure `docs/PERSONAL_PROFILE.md` exists and is current; it is the single data source. Schema: `references/personal_profile_schema.md`. See "Profile setup" below.
2. **Market analysis** — DISPATCHED SUBAGENT → `resume-market-analysis`. Run when targeting a specific role/company; produces salary benchmarks, in-demand skills, and ATS keywords. Skip for a fully generic resume.
3. **Strategy** — INLINE → `resume-strategy`. Decide positioning, section emphasis, and ATS keyword selection from market analysis + profile. Output is a compact strategy brief reused downstream.
4. **Content generation** — DISPATCHED SUBAGENT (on **Opus**) → `resume-content-generation`. Writes `resumes/customized/{id}/resume_content.md`. Pass the strategy brief and the target directory in the dispatch prompt.
5. **GATE — content review (Pattern A, pre-render)** — DISPATCH the `swiss-tech-resume-reviewer` agent (it loads `resume-content-review`). Branch on its verdict contract: **`pass` = rating ≥ 8.0 AND ats_match ≥ 75**. If not `pass` and iterations < 3: re-dispatch step 4 (content generation) with the reviewer feedback + the existing `resume_content.md` path. If the 3-iteration cap is hit without `pass`: escalate to the user.
6. **USER GATE — format selection** — INLINE. Ask the user: **"PDF, web, or both?"**
7. **Render** — DISPATCHED SUBAGENT(S), run in **PARALLEL if both** are selected: `resume-render-pdf` and/or `resume-render-web`, each rendering from the approved `resume_content.md`.
8. **Post-render QA (PDF only)** — dispatch the `swiss-tech-resume-reviewer` agent to verify the content survived rendering (carry the ≥ 8.0 target forward) **and** the `design-reviewer` agent (it loads `resume-design-review`; **`pass` = rating ≥ 9.0**). Iterate ≤ 3 times, re-dispatching `resume-render-pdf` with the reviewer feedback.
9. **Finalize** — INLINE. Holistic review of the narrative (does it position for the target role, justify the salary target, fit the Swiss market?), then generate the paired `..._application_strategy.md`. See "Application-strategy generation" below.

## Profile setup

`docs/PERSONAL_PROFILE.md` is the single source of truth — keep ALL experience here, then pull relevant slices per application.

- If it does not exist, create it from the bundled example. Copy the example into the
  current project: source it from `${CLAUDE_PLUGIN_ROOT}/docs/PERSONAL_PROFILE.example.md`
  when installed, or `docs/PERSONAL_PROFILE.example.md` when working from the source repo —
  writing to `docs/PERSONAL_PROFILE.md` in the user's project.
- Fill it per the schema in `references/personal_profile_schema.md` (required sections, quantification strategy, CEFR language levels, Swiss-specific fields, privacy notes).
- Do not commit a `PERSONAL_PROFILE.md` containing real personal data.

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
  # Installed plugin:
  python3 "${CLAUDE_PLUGIN_ROOT}/.claude/skills/swiss-tech-resume-builder/scripts/init_application.py" --company google --role ml_engineer
  # Source repository:
  python3 .claude/skills/swiss-tech-resume-builder/scripts/init_application.py --company google --role ml_engineer
  ```

## Execution-model rule

- **INLINE** when the output is compact AND reused later in this conversation: strategy brief, decision gates (content-review branch, format selection, holistic finalize).
- **DISPATCHED SUBAGENT** when the work is bulky AND the output is a file or a summary: market analysis, content generation, the two renders, and the reviews.
- Dispatch mechanics: `resume-market-analysis`, `resume-content-generation`, `resume-render-pdf`, and `resume-render-web` run as **general-purpose subagents loading their skill**. Content review and design review run via the **named agents** `swiss-tech-resume-reviewer` and `design-reviewer` (which load `resume-content-review` and `resume-design-review` respectively).
- **Model selection**: dispatch `resume-content-generation` on **Opus** (`model: opus`). It is the highest-judgment step in the pipeline — selecting which achievements survive, combining related ones, and compressing to the bullet budget is exactly the reasoning that gates content-review quality (rating ≥ 8.0). The mechanical phases (renders, market analysis) may run on the default model.

## Pointers

| Phase | Sub-skill / agent |
|-------|-------------------|
| Market analysis | `resume-market-analysis` (subagent) |
| Strategy | `resume-strategy` (inline) |
| Content generation | `resume-content-generation` (subagent) |
| Content review (gate) | `swiss-tech-resume-reviewer` agent → `resume-content-review` |
| PDF render | `resume-render-pdf` (subagent) |
| Web render | `resume-render-web` (subagent) |
| Design review (QA) | `design-reviewer` agent → `resume-design-review` |

**Bundled assets** (kept here, referenced above): `scripts/init_application.py`, `assets/application_strategy_template.md`, `references/personal_profile_schema.md`.
