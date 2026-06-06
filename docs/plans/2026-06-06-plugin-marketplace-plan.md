# Implementation Plan: Distribute the resume system as a Claude Code plugin marketplace

**Date:** 2026-06-06
**Status:** Approved design, ready to implement
**Owner:** Florian / Claude

## Goal

Make the `datarian/CV` repository installable by interested third parties as a Claude
Code **plugin marketplace**, so that someone can run a couple of `/plugin` commands and
get the full Swiss-tech resume-builder skill system — without forking, copying files, or
touching the author's personal CV data. The author's own local workflow (editing skills in
`.claude/skills/` with live auto-discovery) must remain completely unchanged.

## Approach (decided)

**Repo-as-plugin, skills stay in place.** The repository is simultaneously the marketplace
*and* a single plugin. Two manifest files are added under `.claude-plugin/`; the existing
`.claude/skills/`, `.claude/agents/`, `.claude/commands/` are exposed via custom component
paths in `plugin.json`. No skill is moved out of `.claude/`, so local auto-discovery and
the edit-and-go workflow are untouched.

Rejected alternative: a dedicated `plugins/<name>/` subdir with symlinks back into
`.claude/`. It buys a tighter plugin boundary at the cost of relocating the shared `docs/`
assets, symlink fragility, and rewriting every path in `CLAUDE.md`. Not worth it.

## Naming

- **Marketplace name:** `swiss-tech-resume` (public-facing, kebab-case, one per user)
- **Plugin name:** `swiss-tech-resume-builder` (matches the orchestrator skill)
- Install UX: `/plugin marketplace add datarian/CV` →
  `/plugin install swiss-tech-resume-builder@swiss-tech-resume`

## Key technical facts (verified against code.claude.com/docs, 2026-06)

- A repo can hold both `.claude-plugin/marketplace.json` and `.claude-plugin/plugin.json`.
- `plugin.json` supports custom component paths: `skills` (extends default), `agents` and
  `commands` (replace default). All must be relative to plugin root, start with `./`.
- Installed plugins are **copied** to `~/.claude/plugins/cache`; a plugin cannot reference
  files outside its own root. Whichever directory is the plugin root, everything the skills
  read at runtime must live inside it.
- SKILL.md prose gets **no** `${CLAUDE_PLUGIN_ROOT}` substitution. Skills are instead given
  their own base directory at load time, so the portable idiom is: keep the files a skill
  reads **inside that skill's folder** (`references/`, `assets/`) and reference them
  skill-relatively. `${CLAUDE_PLUGIN_ROOT}` only substitutes in hooks/MCP/monitor configs.
- Local testing: `/plugin marketplace add ./` then install, and `claude plugin validate
  --strict`.

## Phasing

### Phase 1 — Installable & discoverable ✅ DONE (2026-06-06)

Goal: `/plugin install` works and a newcomer is told how to use the thing.

**Implemented & verified:** `.claude-plugin/marketplace.json` + `plugin.json` added;
`swiss-tech-resume-setup` skill written; `resume-render-web` guarded for R2; README install
section rewritten. End-to-end tested with `claude plugin marketplace add ./` + install: all
9 skills + 2 agents + 2 commands bundle, 732K clean cache (no node_modules/dist/pdf). Test
install fully torn down afterward.

- **R1 resolved:** `source: "./"` (repo-as-plugin) validates and installs correctly.
- **Schema gotcha:** `agents` must be an **array of agent file paths**, not a directory
  string (`"./.claude/agents/"` failed validation with `agents: Invalid input`). `skills`
  and `commands` accept a directory string; `agents` does not.

1. **`.claude-plugin/marketplace.json`** — marketplace `swiss-tech-resume`, owner = Florian
   Hochstrasser, one plugin entry: name `swiss-tech-resume-builder`, `source: "./"`,
   description, version `0.1.0`.
2. **`.claude-plugin/plugin.json`** — name, version, description, author, and custom paths:
   - `skills: "./.claude/skills/"`
   - `agents: "./.claude/agents/"`
   - `commands: "./.claude/commands/"`
3. **New skill `swiss-tech-resume-setup`** (in `.claude/skills/swiss-tech-resume-setup/`) —
   triggers on *"how do I use / set up the resume builder"* and on first run. It:
   - checks prerequisites (XeLaTeX/TeX, Node for web, required fonts),
   - scaffolds the installer's `docs/PERSONAL_PROFILE.md` from the bundled example,
   - creates the `resumes/customized/` and `resumes/compiled/` workspace in the user's
     project,
   - explains the pipeline and hands off to the `swiss-tech-resume-builder` orchestrator.
   Serves both the "setup sub-skill" and "howto" requests with one skill.
4. **README "Getting started as a plugin"** section — install commands, prerequisites, the
   setup-skill pointer, a privacy note (only the generic system ships; personal data is
   gitignored), and an explicit note that **`deploy` mode is author-specific** (see Risks).
5. **Validate `source: "./"`** with `claude plugin validate --strict` and a local
   `/plugin marketplace add ./`. If root-as-source is rejected, fall back to a thin
   `plugins/swiss-tech-resume-builder/` dir whose `plugin.json` points its component paths
   back up — or use `metadata.pluginRoot`. (See Risk R1.)

Exit criteria: a local `/plugin marketplace add ./` + install surfaces all 8 skills and 2
agents; `swiss-tech-resume-setup` triggers on "how do I use this resume plugin?".

### Phase 2 — Portability ✅ DONE (2026-06-06) — approach improved: NO file moves

Goal: an install in a *fresh, unrelated* project runs without referencing this repo's layout.

**Better mechanism found during implementation:** `${CLAUDE_PLUGIN_ROOT}` and
`${CLAUDE_PROJECT_DIR}` are substituted **inline in skill and agent content** (docs
"Environment variables" / plugins-reference line 630), not just in hook/MCP configs. So
portability needed **no asset relocation** — the original move-into-bundles table below was
not executed. Instead:

- Added a concise **"Bundled reference files"** note to each asset-consuming skill
  (`resume-content-generation`, `resume-content-review`, `resume-strategy`,
  `resume-market-analysis`, `resume-render-pdf`, `resume-design-review`, orchestrator):
  bundled `docs/…` and `resumes/templates/…` paths resolve under `${CLAUDE_PLUGIN_ROOT}/`
  when installed (auto-substituted) or the repo root from source (as written). This keeps
  the author's develop-on-the-go workflow untouched — nothing moved.
- **Type-2 outputs** (`resumes/customized/`, `resumes/compiled/`, `docs/PERSONAL_PROFILE.md`)
  left as plain relative paths — they correctly resolve to the *current project* in both
  modes (CWD = author repo, or CWD = installer project). No change needed.
- Fixed the example-profile copy in the orchestrator + `personal_profile_schema.md` to
  source from `${CLAUDE_PLUGIN_ROOT}/docs/PERSONAL_PROFILE.example.md` when installed.
- Fixed two broken `../../docs/...` markdown links in `resume-strategy` (they pointed at
  `.claude/docs/`).
- Reworked `init_application.py`: `--template` now resolves the bundled template from the
  script's own location (`parents[4]`) with `$CLAUDE_PLUGIN_ROOT`/CWD fallbacks; next-step
  hints use absolute plugin-root paths. **Tested from a throwaway project dir** — finds the
  bundled template and writes outputs into the current project. ✓
- The render-pdf scripts had only illustrative paths in comments — no change needed.

**Original (superseded) relocation table, kept for reference:**

Relocate the **Type-1 read-assets** into the skill bundle that consumes them (single source
of truth — the repo then reads its own bundled copies; update `CLAUDE.md` + `docs/`
references to match). Type-2 workspace outputs stay in the *installer's* project.

| Asset (today) | New home (inside plugin) | Consumed by |
|---|---|---|
| `docs/knowledge/ats_optimization.md` | `swiss-tech-resume-builder/references/knowledge/` | strategy, content-gen, content-review, market-analysis |
| `docs/knowledge/experience_bullet_standards.md` | same | content-gen, content-review |
| `docs/knowledge/grounding_and_truthfulness.md` | same | content-gen, content-review |
| `docs/knowledge/swiss_market_conventions.md` | same | strategy, market-analysis |
| `docs/knowledge/tone_and_register.md` | same | content-gen, content-review |
| `docs/style-guide/pdf/*` | `resume-render-pdf/references/` | render-pdf, design-review |
| `docs/style-guide/web/*`, `DESIGN_SYSTEM.md` | `resume-render-web/references/` | render-web, design-review |
| `resumes/templates/CV_template.tex` | `resume-render-pdf/assets/` | render-pdf |
| `docs/PERSONAL_PROFILE.example.md` | `swiss-tech-resume-builder/assets/` | setup, orchestrator |
| `resumes/web-builder/docs/*` | `resume-render-web/references/` | render-web |

Then:
- Update every SKILL.md / agent / script reference from `docs/...` and
  `resumes/templates/...` to the new skill-relative paths (inventory in the appendix).
- Decide the **shared-knowledge home**: knowledge docs are read by four skills. Put the
  canonical copy under the orchestrator's `references/knowledge/` and have sibling skills
  reference it skill-relatively (still inside the plugin root, so it resolves at runtime),
  OR duplicate per-skill. **Decision needed** — default: single canonical copy under the
  orchestrator, siblings point at it via a documented relative path.
- Reframe Type-2 output paths (`resumes/customized/`, `resumes/compiled/`,
  `docs/PERSONAL_PROFILE.md`, web `public/resume_content.md`) as "in your current project,"
  scaffolded by `init_application.py` / the setup skill — not hard-coded repo paths.

### Phase 3 — Verify (partially done)

1. ✅ `claude plugin validate` clean.
2. ✅ Fresh install into the cache: all 10 referenced bundled assets present at their
   `${CLAUDE_PLUGIN_ROOT}/…` targets (knowledge ×5, style-guide ×3, template, example
   profile); **no `PERSONAL_PROFILE.md` leaked** into the bundle.
3. ✅ `init_application.py` runs correctly from a throwaway project dir (finds bundled
   template, writes to the project's `resumes/customized/`).
4. ⏳ **Remaining (manual, needs a TeX install):** a true end-to-end live run in a fresh
   project — setup skill → strategy → content-gen → render-pdf → compiled PDF — to confirm
   `${CLAUDE_PLUGIN_ROOT}` substitution resolves at skill load and XeLaTeX produces a PDF.
   Substitution-in-skill-content is guaranteed by the docs; the targets are confirmed to
   exist, so this is expected to pass but has not been exercised with a live skill load.

Done = a clean install in a fresh project goes setup → generated PDF with no reference to
this repo's private layout. (Items 1–3 verified; item 4 pending a live LaTeX run.)

## Risks / open decisions

- **R1 — `source: "./"` may be rejected.** The docs show subdir sources; root-as-plugin is
  plausible but unverified. Mitigation: validate early in Phase 1; fallback to a thin
  `plugins/` subdir or `metadata.pluginRoot`. This is the first thing to test.
- **R2 — The web resume app is not in version control. DECIDED: ship PDF-only for v0.1.0.**
  `resume-render-web` assumes a built Vite project at `resumes/web-builder/` (package.json,
  `src/`, `npm run build`), but only `resumes/web-builder/docs/` is tracked and only `docs/`
  exists on disk. The app cannot ship as-is, so web rendering is **out of scope for the
  distributable v0.1.0** (option c). Implementation consequences:
  - The setup skill and README document the supported pipeline as **PDF-only**; web/preview/
    deploy are marked author-only / experimental.
  - `resume-render-web/SKILL.md` gets a guard: if the `web-builder/` app is absent, it
    reports that web rendering is not bundled in this release and stops gracefully (rather
    than failing on a missing `npm run build`).
  - Skills are NOT relocated to physically exclude render-web (that would break the
    "nothing moves" promise); render-web simply degrades gracefully when unbundled.
  - Committing or scaffolding the web app is a tracked follow-up (options a/b) for a later
    release.
- **R3 — `deploy` mode is author-specific.** It targets the private `CV-pages` repo,
  `datarian.github.io`, and `CV_PAGES_TOKEN`. Installers can't use it. Mitigation: README +
  setup skill clearly mark `deploy` as author-only; `preview` mode is the portable path.
  (Mostly moot if R2 resolves to (c).)
- **R4 — `.claude/.mcp.json` ships a Playwright MCP server.** Confirm whether the plugin
  should declare it via `mcpServers` (so installers get browser preview tooling) or leave it
  out. Default: leave out of v0.1.0; document as optional.
- **R5 — `CLAUDE.md` personalisation.** It contains the author's career goals/salary and is
  already public. Not newly exposed by this work, but worth a light de-personalisation pass
  so installers aren't reading the author's targets as instructions. Optional, low priority.

## Out of scope

- Publishing to any third-party marketplace registry/aggregator.
- Multi-plugin split (one plugin is correct here — YAGNI).
- Reworking the resume content/standards themselves.
- Fixing/uncommitting the web-builder app beyond the R2 decision.

## Appendix — reference inventory to rewrite in Phase 2

(From `grep -rnoE '(docs/...|resumes/...|PERSONAL_PROFILE...)' .claude/skills .claude/agents`)

- `resume-strategy/SKILL.md`: `docs/knowledge/swiss_market_conventions.md`,
  `docs/knowledge/ats_optimization.md`
- `resume-content-generation/SKILL.md`, `resume-content-review/SKILL.md`,
  `resume-market-analysis/SKILL.md`: `docs/knowledge/*`
- `resume-render-pdf/SKILL.md`: `docs/style-guide/pdf/{CV_STYLE_GUIDE,LATEX_CODE_SNIPPETS,
  VISUAL_DESIGN_REFERENCE}.md`, `resumes/templates/CV_template.tex`,
  `resumes/customized/`, `resumes/compiled/`
- `resume-render-pdf/scripts/{compile_resume.sh,validate_latex.py}`: example
  `resumes/customized/...tex` paths (illustrative — confirm before changing)
- `resume-render-web/SKILL.md`: `docs/style-guide/web/WEB_RESUME_STYLE_GUIDE.md`,
  `docs/style-guide/DESIGN_SYSTEM.md`, `resumes/web-builder/...` (see R2)
- `swiss-tech-resume-builder/SKILL.md` + `references/personal_profile_schema.md`:
  `docs/PERSONAL_PROFILE.md`, `docs/PERSONAL_PROFILE.example.md`, `resumes/customized/`
- `swiss-tech-resume-builder/scripts/init_application.py`:
  `resumes/templates/CV_template.tex`, `resumes/customized/`
