# Resume System Skill/Sub-Skill Architecture — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the resume system's 8-agent architecture with one lean orchestrator skill, 7 `resume-*` sub-skills, and 2 thin review agents — making the skill tree the single source of truth.

**Architecture:** A parent skill (`swiss-tech-resume-builder`) orchestrates the pipeline inline and dispatches subagents (each loading a sub-skill) for heavy/parallel phases. Cross-cutting knowledge lives once in `docs/knowledge/`; each skill is a thin procedural layer linking to it. Two review agents remain only to provide isolated, fresh-eyes context.

**Tech Stack:** Claude Code skills (Markdown + YAML frontmatter), bash/python helper scripts, LaTeX moderncv (XeLaTeX), React/Vite web builder.

**Spec:** `docs/superpowers/specs/2026-06-05-resume-system-skill-architecture-design.md`

---

## Important Notes for the Implementer

- **This is a content/refactor migration, not a TDD code project.** There are no unit tests. "Verification" means: skill frontmatter validity, reference-link integrity, and a final guided smoke run. Each task still ends with an explicit verification step + a commit.
- **Porting, not copying verbatim.** Each new sub-skill is created by *porting the domain knowledge* out of an existing agent file (named per task) into a `SKILL.md`. When porting, **drop** agent-orchestration framing — inter-agent handoff instructions, "PROACTIVELY use this agent…", `<example>` blocks, "invoke agent X next" — and **keep** the domain expertise (the actual how-to knowledge). The orchestration lives only in the parent skill.
- **Do not delete any source agent until its knowledge has been ported and committed.** Deletions happen in Task 13, near the end.
- **Skill frontmatter required keys:** `name` (must equal the directory name) and `description` (drives auto-invocation — use the exact text given per task).
- Run all commands from the repo root: `/Volumes/essd/Development/CV/.claude/worktrees/serene-bassi-6e26e9`.

---

## File Structure (created / modified / deleted)

**New knowledge home (single source):**
- Create `docs/knowledge/swiss_market_conventions.md` (moved)
- Create `docs/knowledge/ats_optimization.md` (moved)

**New sub-skills (each `.claude/skills/<name>/SKILL.md`):**
- `resume-market-analysis/`
- `resume-strategy/`
- `resume-content-generation/`
- `resume-render-pdf/` (+ `references/moderncv_technical_guide.md`, `scripts/validate_latex.py`, `scripts/compile_resume.sh`)
- `resume-render-web/`
- `resume-content-review/`
- `resume-design-review/`

**Modified:**
- `.claude/skills/swiss-tech-resume-builder/SKILL.md` (rewritten lean; keeps `scripts/init_application.py`, `assets/application_strategy_template.md`, `references/personal_profile_schema.md`)
- `.claude/agents/swiss-tech-resume-reviewer.md` (gutted to thin wrapper)
- `.claude/agents/design-reviewer.md` (gutted to thin wrapper)
- `.claude/commands/preview-web-resume.md` (repoint to `resume-render-web`)
- `CLAUDE.md` (workflow narrative → pointer; constraints retained)

**Deleted (after porting):**
- `.claude/agents/career-planning-coach.md`
- `.claude/agents/swiss-tech-job-market-analyst.md`
- `.claude/agents/swiss-resume-expert.md`
- `.claude/agents/resume-content-generator.md`
- `.claude/agents/latex-moderncv-expert.md`
- `.claude/agents/react-resume-expert.md`

---

## Task 1: Relocate cross-cutting knowledge to `docs/knowledge/`

Moves the two shared reference docs out of the skill bundle so multiple skills link to one copy.

**Files:**
- Move: `.claude/skills/swiss-tech-resume-builder/references/swiss_market_conventions.md` → `docs/knowledge/swiss_market_conventions.md`
- Move: `.claude/skills/swiss-tech-resume-builder/references/ats_optimization.md` → `docs/knowledge/ats_optimization.md`

- [ ] **Step 1: Create the knowledge dir and git-move both files (preserves history)**

```bash
mkdir -p docs/knowledge
git mv .claude/skills/swiss-tech-resume-builder/references/swiss_market_conventions.md docs/knowledge/swiss_market_conventions.md
git mv .claude/skills/swiss-tech-resume-builder/references/ats_optimization.md docs/knowledge/ats_optimization.md
```

- [ ] **Step 2: Verify the moves**

Run:
```bash
ls docs/knowledge/ && ls .claude/skills/swiss-tech-resume-builder/references/
```
Expected: `docs/knowledge/` contains both `.md` files; the skill `references/` now contains only `personal_profile_schema.md` and `moderncv_technical_guide.md`.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "refactor: move shared resume knowledge to docs/knowledge/"
```

---

## Task 2: Create `resume-market-analysis` sub-skill

**Source to port from:** `.claude/agents/swiss-tech-job-market-analyst.md`

**Files:**
- Create: `.claude/skills/resume-market-analysis/SKILL.md`

- [ ] **Step 1: Write the SKILL.md**

Frontmatter (verbatim):
```yaml
---
name: resume-market-analysis
description: Research the Swiss tech job market for a target role — salary benchmarks, in-demand skills, ATS keywords, and competitive positioning. Use when analyzing a job posting or planning resume positioning for a Swiss tech position.
---
```
Body: port the analyst's domain method (how to research salary via Salarium, jobs.ch/jobup.ch/LinkedIn; how to extract required keywords; how to assess skills gaps; regional/industry variations). Link to `docs/knowledge/swiss_market_conventions.md` for conventions rather than restating them. Add a short "Output" section: the analysis returns a compact summary (target salary range, required keywords, positioning notes) for the orchestrator to reuse. Drop all agent/handoff framing.

- [ ] **Step 2: Verify frontmatter + links**

Run:
```bash
head -5 .claude/skills/resume-market-analysis/SKILL.md
grep -n "docs/knowledge/swiss_market_conventions.md" .claude/skills/resume-market-analysis/SKILL.md && test -f docs/knowledge/swiss_market_conventions.md && echo "LINK OK"
```
Expected: `name: resume-market-analysis` present; "LINK OK" printed.

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/resume-market-analysis/SKILL.md && git commit -m "feat: add resume-market-analysis sub-skill"
```

---

## Task 3: Create `resume-strategy` sub-skill

**Source to port from:** `.claude/agents/swiss-resume-expert.md`

**Files:**
- Create: `.claude/skills/resume-strategy/SKILL.md`

- [ ] **Step 1: Write the SKILL.md**

Frontmatter (verbatim):
```yaml
---
name: resume-strategy
description: Plan resume content strategy for a Swiss tech role — positioning, section emphasis, and ATS keyword selection from market analysis plus the personal profile. Use after market analysis and before generating resume content.
---
```
Body: port the strategy method (role-type focus selection — IC vs lead vs manager vs MLOps; which experience to select; how to plan section order/emphasis; keyword integration). Link to `docs/knowledge/ats_optimization.md` and `docs/knowledge/swiss_market_conventions.md`. Add an "Output" section: produces a compact strategy brief (positioning statement, sections to emphasize, prioritized keyword list, target salary) — small enough for the orchestrator to hold inline and pass to content generation. Drop agent/handoff framing.

- [ ] **Step 2: Verify frontmatter + links**

Run:
```bash
head -5 .claude/skills/resume-strategy/SKILL.md
grep -nE "docs/knowledge/(ats_optimization|swiss_market_conventions)\.md" .claude/skills/resume-strategy/SKILL.md && echo "LINKS OK"
```
Expected: `name: resume-strategy`; "LINKS OK".

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/resume-strategy/SKILL.md && git commit -m "feat: add resume-strategy sub-skill"
```

---

## Task 4: Create `resume-content-generation` sub-skill

**Source to port from:** `.claude/agents/resume-content-generator.md`

**Files:**
- Create: `.claude/skills/resume-content-generation/SKILL.md`

- [ ] **Step 1: Write the SKILL.md**

Frontmatter (verbatim):
```yaml
---
name: resume-content-generation
description: Generate the format-agnostic resume_content.md (YAML frontmatter + Markdown) from PERSONAL_PROFILE.md and strategy guidance, as the single source for the PDF and web renderers. Use after strategy is set, to produce or revise resume content.
---
```
Body: port the generator's full content protocol — input sources, the exact `resume_content.md` output format (YAML schema incl. summary highlights, Experience/Skills/Education/Projects markdown structure), achievement-bullet crafting, ATS optimization, quality checks. Link to `.claude/skills/swiss-tech-resume-builder/references/personal_profile_schema.md` and `docs/knowledge/ats_optimization.md`. Add a short "Revision mode" note: when given reviewer feedback + an existing `resume_content.md` path, revise that file in place rather than regenerating from scratch. Drop agent/handoff framing.

- [ ] **Step 2: Verify frontmatter + that the output-format schema is present**

Run:
```bash
head -5 .claude/skills/resume-content-generation/SKILL.md
grep -nc "resume_content.md" .claude/skills/resume-content-generation/SKILL.md
```
Expected: `name: resume-content-generation`; count ≥ 2.

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/resume-content-generation/SKILL.md && git commit -m "feat: add resume-content-generation sub-skill"
```

---

## Task 5: Create `resume-render-pdf` sub-skill (with scripts + moderncv guide)

**Source to port from:** `.claude/agents/latex-moderncv-expert.md`

**Files:**
- Create: `.claude/skills/resume-render-pdf/SKILL.md`
- Move: `.claude/skills/swiss-tech-resume-builder/references/moderncv_technical_guide.md` → `.claude/skills/resume-render-pdf/references/moderncv_technical_guide.md`
- Move: `.claude/skills/swiss-tech-resume-builder/scripts/validate_latex.py` → `.claude/skills/resume-render-pdf/scripts/validate_latex.py`
- Move: `.claude/skills/swiss-tech-resume-builder/scripts/compile_resume.sh` → `.claude/skills/resume-render-pdf/scripts/compile_resume.sh`

- [ ] **Step 1: Move the PDF-specific bundled files**

```bash
mkdir -p .claude/skills/resume-render-pdf/references .claude/skills/resume-render-pdf/scripts
git mv .claude/skills/swiss-tech-resume-builder/references/moderncv_technical_guide.md .claude/skills/resume-render-pdf/references/moderncv_technical_guide.md
git mv .claude/skills/swiss-tech-resume-builder/scripts/validate_latex.py .claude/skills/resume-render-pdf/scripts/validate_latex.py
git mv .claude/skills/swiss-tech-resume-builder/scripts/compile_resume.sh .claude/skills/resume-render-pdf/scripts/compile_resume.sh
```

- [ ] **Step 2: Write the SKILL.md**

Frontmatter (verbatim):
```yaml
---
name: resume-render-pdf
description: Render an approved resume_content.md to a LaTeX moderncv PDF and compile it with XeLaTeX. Use when producing or fixing the PDF resume, or debugging moderncv compilation errors.
---
```
Body: port the LaTeX/moderncv expertise — read `resume_content.md`, fill `resumes/templates/CV_template.tex`, the critical rules (`\moderncvstyle{fancy}`, `\cventry` 6 args, xelatex-only, GitHub footer), validate → compile workflow using the now-local scripts, common errors table, output to `resumes/compiled/`. Link to `references/moderncv_technical_guide.md` (now local), `docs/style-guide/pdf/`, and `resumes/templates/CV_template.tex`. Note scripts are run from repo root via their skill path. Drop agent/handoff framing.

- [ ] **Step 3: Verify frontmatter, local files, and script references resolve**

Run:
```bash
head -5 .claude/skills/resume-render-pdf/SKILL.md
ls .claude/skills/resume-render-pdf/references/ .claude/skills/resume-render-pdf/scripts/
test ! -f .claude/skills/swiss-tech-resume-builder/scripts/compile_resume.sh && echo "OLD SCRIPTS GONE"
```
Expected: `name: resume-render-pdf`; the moved files present; "OLD SCRIPTS GONE".

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add resume-render-pdf sub-skill with relocated scripts + guide"
```

---

## Task 6: Create `resume-render-web` sub-skill

**Source to port from:** `.claude/agents/react-resume-expert.md`

**Files:**
- Create: `.claude/skills/resume-render-web/SKILL.md`

- [ ] **Step 1: Write the SKILL.md**

Frontmatter (verbatim):
```yaml
---
name: resume-render-web
description: Render an approved resume_content.md to an interactive React web resume (Vite), with local preview and GitHub Pages deploy modes. Use when producing, previewing, or deploying the web resume.
---
```
Body: port the web-builder method — preview vs deploy modes, build steps consuming `resume_content.md`, `resumes/web-builder/` usage, `CV_PAGES_TOKEN` for deploy, semantic-id/URL scheme, common build issues. Link to `docs/style-guide/web/WEB_RESUME_STYLE_GUIDE.md`. Drop agent/handoff framing.

- [ ] **Step 2: Verify frontmatter + web-builder reference**

Run:
```bash
head -5 .claude/skills/resume-render-web/SKILL.md
grep -n "resumes/web-builder" .claude/skills/resume-render-web/SKILL.md && echo "REF OK"
```
Expected: `name: resume-render-web`; "REF OK".

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/resume-render-web/SKILL.md && git commit -m "feat: add resume-render-web sub-skill"
```

---

## Task 7: Create `resume-content-review` sub-skill (with verdict contract)

**Source to port from:** `.claude/agents/swiss-tech-resume-reviewer.md`

**Files:**
- Create: `.claude/skills/resume-content-review/SKILL.md`

- [ ] **Step 1: Write the SKILL.md**

Frontmatter (verbatim):
```yaml
---
name: resume-content-review
description: Review resume content (resume_content.md, or a rendered PDF's extracted text) for the Swiss tech market — ATS keyword match, content quality, and Swiss conventions — returning a structured verdict with a numeric rating. Use to gate resume content before or after rendering.
---
```
Body: port the reviewer's evaluation criteria + rating rubric (ATS keyword match %, quality, Swiss-fit). Link to `docs/knowledge/ats_optimization.md` and `docs/knowledge/swiss_market_conventions.md`. **Add an "Output Contract" section** so the orchestrator can branch deterministically — the review MUST return:
```
rating: <0-10>
ats_match: <0-100%>
pass: <true|false>   # true when rating >= 8.0 AND ats_match >= 75
feedback:
  - <specific, actionable item>
  - ...
```
Drop agent/handoff framing.

- [ ] **Step 2: Verify frontmatter + contract present**

Run:
```bash
head -5 .claude/skills/resume-content-review/SKILL.md
grep -nE "Output Contract|^pass:|pass:" .claude/skills/resume-content-review/SKILL.md && echo "CONTRACT OK"
```
Expected: `name: resume-content-review`; "CONTRACT OK".

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/resume-content-review/SKILL.md && git commit -m "feat: add resume-content-review sub-skill with verdict contract"
```

---

## Task 8: Create `resume-design-review` sub-skill (with verdict contract)

**Source to port from:** `.claude/agents/design-reviewer.md`

**Files:**
- Create: `.claude/skills/resume-design-review/SKILL.md`

- [ ] **Step 1: Write the SKILL.md**

Frontmatter (verbatim):
```yaml
---
name: resume-design-review
description: Review the visual design of a rendered resume (PDF or web) against the style guide, returning a structured verdict with a numeric rating. Use after rendering when layout, fonts, colors, or visual structure changed.
---
```
Body: port the design-review criteria for **both** PDF and web (typography hierarchy, color usage, whitespace, Swiss-market fit, responsive/print for web). Link to `docs/style-guide/DESIGN_SYSTEM.md`, `docs/style-guide/pdf/`, `docs/style-guide/web/`. **Add the same "Output Contract"** style (rating 0-10, `pass: rating >= 9.0`, bulleted feedback). Drop agent/handoff framing.

- [ ] **Step 2: Verify frontmatter + contract present**

Run:
```bash
head -5 .claude/skills/resume-design-review/SKILL.md
grep -nE "Output Contract|pass:" .claude/skills/resume-design-review/SKILL.md && echo "CONTRACT OK"
```
Expected: `name: resume-design-review`; "CONTRACT OK".

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/resume-design-review/SKILL.md && git commit -m "feat: add resume-design-review sub-skill with verdict contract"
```

---

## Task 9: Rewrite the parent `swiss-tech-resume-builder` skill as a lean orchestrator

The parent must shrink from ~710 lines to a lean orchestrator (budget: **under ~200 lines**). It owns orchestration + gates, profile setup, application-strategy generation, and hand-off pointers. All phase-specific detail now lives in sub-skills.

**Source material:** the orchestration logic in `.claude/agents/career-planning-coach.md` (format-selection gate, app-strategy generation, final review) and the current parent `SKILL.md`.

**Files:**
- Modify (rewrite): `.claude/skills/swiss-tech-resume-builder/SKILL.md`
- Keeps in place: `scripts/init_application.py`, `assets/application_strategy_template.md`, `references/personal_profile_schema.md`

- [ ] **Step 1: Rewrite SKILL.md**

Keep the existing `name: swiss-tech-resume-builder`. Update the `description` to emphasize orchestration. Body must contain only:
  1. **Overview + when to use** (brief).
  2. **The pipeline** as a numbered workflow matching the spec's "Pipeline Flow & Gates" (steps 1–9), each step a 1–3 line hand-off that names the sub-skill or agent to invoke and whether it runs **inline** or as a **dispatched subagent**. Include the review/rewrite loop mechanics (dispatch reviewer → branch on the verdict contract → re-dispatch generator/renderer with feedback → cap at 3 → escalate).
  3. **Profile setup** (links `references/personal_profile_schema.md`, `docs/PERSONAL_PROFILE.example.md`).
  4. **Application-strategy generation** (uses `assets/application_strategy_template.md`; ported from career-planning-coach).
  5. **Execution-model rule** (inline when compact+reused; subagent when bulky+file-output) and the dispatch list: market-analysis, content-generation, render-pdf, render-web are general-purpose subagents; content-review + design-review via their named agents; strategy inline.
  6. **Pointers table** mapping each phase → sub-skill name.
Move ALL phase-specific procedure OUT (it now lives in the sub-skills). Do not restate LaTeX rules, ATS tactics, or web-build steps here — link/point instead.

- [ ] **Step 2: Verify leanness + that detail was removed**

Run:
```bash
wc -l .claude/skills/swiss-tech-resume-builder/SKILL.md
grep -nE "resume-market-analysis|resume-strategy|resume-content-generation|resume-render-pdf|resume-render-web|resume-content-review|resume-design-review" .claude/skills/swiss-tech-resume-builder/SKILL.md
```
Expected: line count under ~200; all 7 sub-skill names referenced in the pointers/workflow.

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/swiss-tech-resume-builder/SKILL.md && git commit -m "refactor: make swiss-tech-resume-builder a lean orchestrator skill"
```

---

## Task 10: Gut the two review agents into thin wrappers

Each kept agent becomes ~10 lines: it exists only for isolated context and points at its review skill.

**Files:**
- Modify (rewrite): `.claude/agents/swiss-tech-resume-reviewer.md`
- Modify (rewrite): `.claude/agents/design-reviewer.md`

- [ ] **Step 1: Rewrite `swiss-tech-resume-reviewer.md`**

Keep frontmatter (`name`, `description`, `tools`, `model`) — the description still drives auto-trigger. Replace the body with a thin instruction:
> You are dispatched in an isolated context to review resume content (or a rendered PDF's text) with fresh eyes. Invoke the `resume-content-review` skill and follow it exactly. Return its structured verdict (rating, ats_match, pass, feedback) and nothing else.

- [ ] **Step 2: Rewrite `design-reviewer.md`** with the analogous body pointing at the `resume-design-review` skill and returning its verdict.

- [ ] **Step 3: Verify both are thin and name their skill**

Run:
```bash
wc -l .claude/agents/swiss-tech-resume-reviewer.md .claude/agents/design-reviewer.md
grep -l "resume-content-review" .claude/agents/swiss-tech-resume-reviewer.md
grep -l "resume-design-review" .claude/agents/design-reviewer.md
```
Expected: each file small (roughly < 25 lines); each greps to its skill name.

- [ ] **Step 4: Commit**

```bash
git add .claude/agents/swiss-tech-resume-reviewer.md .claude/agents/design-reviewer.md && git commit -m "refactor: thin review agents to wrappers over review skills"
```

---

## Task 11: Repoint the `preview-web-resume` command

**Files:**
- Modify: `.claude/commands/preview-web-resume.md`

- [ ] **Step 1: Update references**

Replace any mention of the `react-resume-expert` agent with an instruction to invoke the `resume-render-web` skill in preview mode. Keep the command's user-facing behavior identical.

- [ ] **Step 2: Verify**

Run:
```bash
grep -n "react-resume-expert" .claude/commands/preview-web-resume.md && echo "STILL REFERS OLD AGENT — FIX" || echo "CLEAN"
grep -n "resume-render-web" .claude/commands/preview-web-resume.md && echo "POINTS NEW SKILL"
```
Expected: "CLEAN" and "POINTS NEW SKILL".

- [ ] **Step 3: Commit**

```bash
git add .claude/commands/preview-web-resume.md && git commit -m "refactor: repoint preview-web-resume command to resume-render-web skill"
```

---

## Task 12: Slim `CLAUDE.md` workflow narrative to a pointer; keep constraints

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Replace the orchestration narrative with a pointer**

Remove the large "Agent Coordination", agent-diagram, and multi-phase workflow sections. Replace with a short block:
> **Resume workflow:** Resume creation is driven by the `swiss-tech-resume-builder` skill and its `resume-*` sub-skills. See those skills for the authoritative, up-to-date workflow, gates, and review loops. Do not duplicate workflow steps here.

**Keep** the hard constraints sections (they are always-in-context guardrails), stated once: ModernCV `fancy` style, `cventry` 6-argument rule, xelatex-only, GitHub repo link footer, file-organization/naming conventions, page-count guidance, `CV_PAGES_TOKEN` for deploy, cleanup of build artifacts. Update any stale references to deleted agents inside kept sections to point at the new skills.

- [ ] **Step 2: Verify constraints kept and dead agent refs removed from workflow**

Run:
```bash
grep -nE "moderncvstyle\{fancy\}|cventry|xelatex|CV_PAGES_TOKEN|github.com/datarian/CV" CLAUDE.md | head
grep -nE "career-planning-coach|latex-moderncv-expert|react-resume-expert|resume-content-generator|swiss-resume-expert|swiss-tech-job-market-analyst" CLAUDE.md
```
Expected: constraints still present; the second grep returns **no matches** (all deleted-agent names gone from CLAUDE.md). If the second grep matches, fix those references to the new skills.

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md && git commit -m "docs: slim CLAUDE.md workflow to a pointer, retain hard constraints"
```

---

## Task 13: Delete the 6 superseded agents

Only after all knowledge is ported and committed.

**Files:**
- Delete: `career-planning-coach.md`, `swiss-tech-job-market-analyst.md`, `swiss-resume-expert.md`, `resume-content-generator.md`, `latex-moderncv-expert.md`, `react-resume-expert.md` (all under `.claude/agents/`)

- [ ] **Step 1: Delete**

```bash
git rm .claude/agents/career-planning-coach.md \
       .claude/agents/swiss-tech-job-market-analyst.md \
       .claude/agents/swiss-resume-expert.md \
       .claude/agents/resume-content-generator.md \
       .claude/agents/latex-moderncv-expert.md \
       .claude/agents/react-resume-expert.md
```

- [ ] **Step 2: Verify only the 2 thin agents remain**

Run:
```bash
ls .claude/agents/
```
Expected: exactly `design-reviewer.md` and `swiss-tech-resume-reviewer.md`.

- [ ] **Step 3: Commit**

```bash
git commit -m "refactor: remove agents superseded by resume-* skills"
```

---

## Task 14: Structural verification (discovery + reference integrity)

**Files:**
- Create (temporary, removed at end): none — ad hoc bash.

- [ ] **Step 1: Discovery check — every skill has valid frontmatter and name == dir**

Run:
```bash
for d in .claude/skills/*/; do
  name=$(basename "$d")
  if [ -f "$d/SKILL.md" ]; then
    fmname=$(grep -m1 '^name:' "$d/SKILL.md" | sed 's/name:[[:space:]]*//')
    desc=$(grep -cm1 '^description:' "$d/SKILL.md")
    [ "$fmname" = "$name" ] && [ "$desc" = "1" ] && echo "OK   $name" || echo "FAIL $name (name='$fmname' descCount=$desc)"
  else
    echo "FAIL $name (no SKILL.md)"
  fi
done
```
Expected: `OK` for all 8 skills (parent + 7 sub-skills); no `FAIL`.

- [ ] **Step 2: Reference-integrity check — no dead `docs/` links in any SKILL.md**

Run:
```bash
grep -rhoE "docs/[A-Za-z0-9_./-]+\.md" .claude/skills/*/SKILL.md | sort -u | while read p; do
  test -f "$p" && echo "OK   $p" || echo "DEAD $p"
done
```
Expected: every referenced `docs/...md` path prints `OK`; no `DEAD`.

- [ ] **Step 3: No-duplication spot check — moved knowledge exists only in docs/knowledge/**

Run:
```bash
find .claude/skills -name swiss_market_conventions.md -o -name ats_optimization.md
```
Expected: **no output** (these live only under `docs/knowledge/` now).

- [ ] **Step 4: Commit (if any fixes were needed)**

```bash
git add -A && git commit -m "fix: resolve skill discovery/reference-integrity issues" || echo "nothing to commit"
```

---

## Task 15: Guided end-to-end smoke run

Confirms the rehomed pipeline actually works, including script path resolution from a fresh context. This is a manual/guided run, not an automated test.

**Files:** none created; produces a throwaway resume under `resumes/customized/`.

- [ ] **Step 1: Initialize a throwaway application**

```bash
python3 .claude/skills/swiss-tech-resume-builder/scripts/init_application.py --company smoketest --role ml_engineer
```
Expected: a `resumes/customized/<date>_smoketest_ml_engineer.*` scaffold is created.

- [ ] **Step 2: Generate minimal content, then render PDF via the relocated scripts**

Produce a minimal valid `resume_content.md` for the smoketest (or reuse the scaffold), then:
```bash
python3 .claude/skills/resume-render-pdf/scripts/validate_latex.py resumes/customized/<date>_smoketest_ml_engineer.tex
bash .claude/skills/resume-render-pdf/scripts/compile_resume.sh resumes/customized/<date>_smoketest_ml_engineer.tex
```
Expected: validation passes; XeLaTeX compiles a PDF; build artifacts are cleaned. This confirms the moved scripts still run correctly from their new skill location when given a `.tex` path from the repo root. (Note: `compile_resume.sh` `cd`s into the `.tex` file's own directory before invoking xelatex, so what's being proven is that invocation-by-new-path works — not an internal repo-relative lookup.)

- [ ] **Step 3: Confirm the orchestrator workflow reads end-to-end**

Read `.claude/skills/swiss-tech-resume-builder/SKILL.md` top to bottom and confirm every referenced sub-skill and agent name exists on disk (cross-check against `ls .claude/skills/` and `ls .claude/agents/`). Fix any dangling reference.

- [ ] **Step 4: Clean up the smoke-test artifacts**

```bash
rm -f resumes/customized/*smoketest* resumes/compiled/*smoketest*
```
Expected: no smoketest files remain.

- [ ] **Step 5: Final commit**

```bash
git add -A && git commit -m "test: verify rehomed resume pipeline compiles end-to-end" || echo "nothing to commit"
```

---

## Done Criteria

- [ ] 8 skills present (`swiss-tech-resume-builder` + 7 `resume-*`), all passing the discovery check.
- [ ] Exactly 2 agents remain, both thin wrappers naming their review skill.
- [ ] 6 superseded agents deleted.
- [ ] Shared knowledge lives only in `docs/knowledge/`; no duplicated copies in skills.
- [ ] `CLAUDE.md` workflow narrative replaced by a pointer; hard constraints retained; no dead agent names.
- [ ] `preview-web-resume` command points at `resume-render-web`.
- [ ] Smoke run compiles a PDF using the relocated scripts.
