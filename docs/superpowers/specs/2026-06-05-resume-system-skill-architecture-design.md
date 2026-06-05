# Resume System: Skill / Sub-Skill Architecture Migration

**Date:** 2026-06-05
**Status:** Approved design, ready for implementation planning
**Author:** Florian Hochstrasser (with Claude)

## Problem

The resume-building system predates Claude Code skills. Its logic is spread across
three overlapping sources that must be kept in sync by hand:

- **`CLAUDE.md`** — ~700 lines, most of it an orchestration spec (phases, an agent
  diagram, iteration rules).
- **8 agents** — `career-planning-coach` (orchestrator) plus 7 specialists.
- **1 monolithic skill** — `swiss-tech-resume-builder`, which re-documents the entire
  workflow again and explicitly defers to the agents + `CLAUDE.md` as "authoritative."

The source of truth is fractured. The same workflow is described in three places;
changing it means editing all three. This is the maintenance tax the migration removes.

## Goals

All three of the following, jointly:

1. **Maintainability / DRY** — every piece of knowledge has exactly one home.
2. **Better execution flow** — replace cold agent hand-offs with a single coherent
   orchestration context that pulls in instructions via progressive disclosure.
3. **Simplicity** — fewer moving parts (8 agents → 2 thin agents + a lean skill tree).

## Chosen Approach

**Flat skill family + 2 thin review agents** (Approach A of three considered).

One parent skill plus sibling sub-skills, all flat in `.claude/skills/` with a shared
naming prefix. Two review agents are kept only to provide isolated, fresh-eyes context;
their logic lives in skills.

Rejected alternatives:
- **Physically nested sub-skills** under the parent dir — Claude Code skill discovery is
  one directory deep, so nested `SKILL.md` files likely would not be invocable. Real
  correctness risk. Rejected.
- **Single mega-skill, no sub-skills, no agents** — abandons the sub-skill architecture
  and drops reviewer isolation. Rejected.

## Architecture

### Parent skill — `swiss-tech-resume-builder` (evolved in place)

Owns **only**:
- End-to-end orchestration: the phases, decision gates, and iteration caps that today
  live in `CLAUDE.md` + `career-planning-coach`.
- Personal profile setup.
- Application-strategy generation (the paired `..._application_strategy.md`).
- Hand-off pointers to each sub-skill (progressive disclosure).

The parent `SKILL.md` body must stay **lean** (budget: under ~200 lines). Heavy,
phase-specific instructions live in sub-skills and load only when that phase runs.

### Sub-skills (flat siblings of the parent)

Each sub-skill is its own top-level directory under `.claude/skills/`. The directory
name **is** the skill name shown in the table's first column verbatim
(e.g. `.claude/skills/resume-market-analysis/SKILL.md`). The parent retains its existing
name `swiss-tech-resume-builder`; all new sub-skills use the `resume-` prefix. There is
no nesting and no `swiss-tech-resume-builder-` compound prefix.

Sub-skills marked "Dispatched subagent" are invoked **by skill name via a general-purpose
subagent** — they do **not** get their own named agent file. Only the two reviewers have
named agent files.


| Sub-skill | Replaces agent | Owns | Execution |
|---|---|---|---|
| `resume-market-analysis` | swiss-tech-job-market-analyst | Swiss salary/keyword/role research | Dispatched subagent |
| `resume-strategy` | swiss-resume-expert | Positioning, section emphasis, ATS keyword plan | Inline |
| `resume-content-generation` | resume-content-generator | Produce format-agnostic `resume_content.md` from profile + strategy | Dispatched subagent |
| `resume-render-pdf` | latex-moderncv-expert | `resume_content.md` → LaTeX → PDF; owns `validate_latex.py`, `compile_resume.sh`, `moderncv_technical_guide.md` | Dispatched subagent |
| `resume-render-web` | react-resume-expert | `resume_content.md` → React static site (preview/deploy) | Dispatched subagent |
| `resume-content-review` | swiss-tech-resume-reviewer (logic) | ATS / Swiss-fit / quality rubric + rating | Subagent (via thin agent) |
| `resume-design-review` | design-reviewer (logic) | Visual QA rubric for PDF **and** web | Subagent (via thin agent) |

**Note on content-generation:** it is its own sub-skill (not folded into the parent) and
runs as a **dispatched subagent**. Its work is bulky (reading the full
`PERSONAL_PROFILE.md`, crafting achievement bullets, ATS tuning) and its only downstream
output is the `resume_content.md` *file* — which the review gate and renderers read
directly. None of that reasoning needs to remain in the orchestrator's context. The
orchestrator passes the (compact) strategy output and the target customized-dir path in
the dispatch prompt; the subagent writes `resume_content.md` and returns a short summary.
On a review-gate revision, the orchestrator re-dispatches with the reviewer feedback plus
the existing file path.

### Kept agents (thin, ~10 lines each)

Exist only to provide an isolated, fresh-eyes context. Body: "you are dispatched to
review X; load skill Y; return rating + actionable feedback." Pre-scoped to read-only
tools, auto-trigger on description match.

- `swiss-tech-resume-reviewer.md` → loads `resume-content-review`.
- `design-reviewer.md` → loads `resume-design-review`.

### Deleted agents (logic absorbed into skills)

`career-planning-coach`, `swiss-tech-job-market-analyst`, `swiss-resume-expert`,
`resume-content-generator`, `latex-moderncv-expert`, `react-resume-expert`.

### Execution model — Hybrid

The orchestrator runs **inline in the main thread** for light, coupled steps and
**dispatches subagents** (each loading the relevant skill) for heavy / isolatable /
parallelizable steps. The deciding test:

- **Inline** when the output is *compact* **and** the orchestrator *reuses* it later
  (e.g. `resume-strategy`: its positioning/keywords/target-salary feed the
  application-strategy doc and final review). `resume-strategy` is the only inline
  sub-skill.
- **Subagent** when the work is *bulky/noisy* **and** the output is a *file or summary*
  consumed downstream (market analysis, content generation, renders, reviews).

- A skill is just instructions; it does not act on its own. The main thread, while
  following the parent skill, uses the Agent/Task tool to spawn a subagent and instructs
  it to load a named sub-skill. The subagent runs in isolated context and returns a
  summary.
- Market analysis, content generation, and the two renderers are dispatched as
  **general-purpose** subagents pointed at their skill — **no named agent files needed**
  for them. Only the 2 reviewers remain as named agents (for auto-trigger + tool scoping).
- PDF and web rendering can run **in parallel** when both formats are selected.

## Pipeline Flow & Gates

Driven by the parent skill. Brackets show where control hands off.

1. **Profile setup** *(parent)* → `docs/PERSONAL_PROFILE.md` is the data source.
2. **Market analysis** *(→ `resume-market-analysis`, subagent)* — when targeting a
   specific role → market + keyword insights.
3. **Strategy** *(→ `resume-strategy`, inline)* → positioning + keyword/emphasis plan.
4. **Content generation** *(→ `resume-content-generation`, subagent)* →
   `resume_content.md` (format-agnostic YAML+MD, single source for both renderers). The
   orchestrator passes the strategy output + target dir in the dispatch prompt; the
   subagent writes the file and returns a summary.
5. **GATE — content review (Pattern A, pre-render):** parent dispatches the
   `swiss-tech-resume-reviewer` agent (isolated context, loads `resume-content-review`).
   Iterate ≤3 → target ≥8.0/10, ≥75% ATS match.
6. **USER GATE — format selection:** parent asks "PDF, web, or both?"
7. **Render** *(→ `resume-render-pdf` and/or `resume-render-web`, subagents, parallel if
   both)* from the approved `resume_content.md`.
8. **Post-render QA (PDF):** dispatch `swiss-tech-resume-reviewer` (content-in-PDF
   verify, carry forward the ≥8.0/10 content target) + `design-reviewer` agents; iterate
   ≤3 → design ≥9.0/10.
9. **Finalize** *(parent)* → holistic review + paired `..._application_strategy.md`.

Property: the only places that spin up fresh context are the dispatched subagents
(market, content generation, renders, reviews). The orchestrator stays inline, loading
`resume-strategy` progressively and otherwise coordinating gates and hand-offs.
Reviewer rubrics live in skills, so identical criteria apply whether reviewed via the
agent or inline.

## Reference-Doc Strategy (DRY)

To avoid re-introducing duplication across skill folders:

- **Cross-cutting knowledge → `docs/` (single source); skills link to it** (the pattern
  the current skill already uses for `docs/style-guide/`):
  - `swiss_market_conventions.md` → `docs/` (used by market-analysis, strategy,
    content-review).
  - `ats_optimization.md` → `docs/` (used by strategy, content-generation,
    content-review).
- **Skill-local references → bundled in the one owning skill:**
  - `moderncv_technical_guide.md` → `resume-render-pdf`.
  - `personal_profile_schema.md` → parent (profile setup) and referenced by
    `resume-content-generation`.
- **Scripts / assets → with their owner:**
  - `init_application.py`, `application_strategy_template.md` → parent.
  - `validate_latex.py`, `compile_resume.sh` → `resume-render-pdf`.
- **Repo single sources stay put and are linked, never copied:**
  `resumes/templates/CV_template.tex`, `docs/style-guide/`, `resumes/web-builder/`.

Net effect: every piece of knowledge has exactly one home; each skill is a thin layer of
*procedure* pointing at shared *knowledge*.

## CLAUDE.md Changes

- The workflow / agent-diagram section (the large orchestration narrative) collapses to a
  short pointer: "Resume work is driven by the `swiss-tech-resume-builder` skill and its
  `resume-*` sub-skills; see those for the authoritative workflow."
- The hard **constraints** stay in `CLAUDE.md` (they are always-in-context guardrails),
  stated once and not re-explained: moderncv `fancy` style, xelatex-only, the GitHub repo
  link footer, file-organization conventions, `cventry` 6-argument rule, page-count
  guidance, `CV_PAGES_TOKEN` for deploy.

## Commands

- `preview-web-resume` — **kept** (user-facing slash command), repointed to the
  `resume-render-web` skill.
- `reflection` — untouched.

## Migration Map (old → new)

| Today | Becomes |
|---|---|
| career-planning-coach (agent) | deleted → parent skill (orchestration, gates, app-strategy) |
| swiss-tech-job-market-analyst (agent) | deleted → `resume-market-analysis` skill |
| swiss-resume-expert (agent) | deleted → `resume-strategy` skill |
| resume-content-generator (agent) | deleted → `resume-content-generation` skill |
| latex-moderncv-expert (agent) | deleted → `resume-render-pdf` skill |
| react-resume-expert (agent) | deleted → `resume-render-web` skill |
| swiss-tech-resume-reviewer (agent) | kept, gutted to ~10 lines → loads `resume-content-review` |
| design-reviewer (agent) | kept, gutted to ~10 lines → loads `resume-design-review` |
| swiss-tech-resume-builder (skill) | rewritten as lean parent/orchestrator |
| — | 7 new sub-skills created |
| CLAUDE.md workflow section | collapsed to pointer; constraints retained |

## Verification & Risks

Skills cannot be unit-tested; verification is structural + one smoke run:

1. **Discovery check** — after creating each skill, confirm it appears in the skill list
   (validates flat-dir discovery, the failure mode that killed the nested approach).
2. **Reference-integrity check** — grep every `SKILL.md` for links to `docs/...` and
   bundled paths; confirm no dead links and no knowledge duplicated across skills.
3. **Smoke run** — drive one resume end-to-end (profile → strategy → content → review
   gate → PDF render → design review → app-strategy); confirm `compile_resume.sh` still
   resolves repo-relative paths when invoked from a dispatched subagent.
4. **Parent leanness check** — confirm the parent `SKILL.md` body stays under ~200 lines;
   heavy detail lives in sub-skills.

**Risks & mitigations:**
- Dispatched subagents start cold → parent provides crisp hand-off prompts (which input
  file, what to return).
- Reviewer agents must load the right skill → the thin agent body names it explicitly.
- Path resolution from subagents → scripts already use repo-root-relative paths; the
  smoke run confirms it.

## Out of Scope

- No changes to resume *content*, templates, or the visual style guide.
- No changes to the web-builder (`resumes/web-builder/`) internals.
- No change to `PERSONAL_PROFILE.md` data.
