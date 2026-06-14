# Swiss Tech Resume Builder

A **portable Agent Skills bundle** that turns your experience into an ATS-optimized, Swiss-market
resume. You keep one profile of everything you've done; the system researches the target role,
plans a strategy, writes grounded content, renders a polished PDF, and reviews it against quality
gates — then hands you a tailored application strategy (cover letter, salary negotiation, interview
prep).

The pipeline is authored once to the [Agent Skills standard](https://agentskills.io/specification)
and runs across **Claude Code, Gemini CLI, Cursor, and Pi** — see
[Use it with other agents](#use-it-with-other-agents). In Claude Code it installs as a plugin in two
commands; with the other agents you clone the repo and the skills are discovered automatically.

## Table of contents

- [Install](#install)
- [Quick start](#quick-start)
- [Requirements](#requirements)
- [What it does](#what-it-does)
- [Examples](#examples)
- [Use it with other agents](#use-it-with-other-agents)
- [Your data stays private](#your-data-stays-private)
- [Customize it for another market](#customize-it-for-another-market)
- [Resources](#resources)

## Install

**Claude Code (easiest — installs as a plugin):**

```text
/plugin marketplace add datarian/CV
/plugin install swiss-tech-resume-builder@swiss-tech-resume
```

That's it — the plugin brings everything it needs: the skills, the two forked review skills, the
LaTeX template, the Swiss-market knowledge base, and the style guide. Update later with
`/plugin marketplace update swiss-tech-resume`.

**Gemini CLI, Cursor, or Pi:** clone the repo and run your agent inside it — the skills are
discovered automatically. See [Use it with other agents](#use-it-with-other-agents).

## Quick start

Once it's available (installed in Claude Code, or running your agent inside a clone), just ask:

```text
> How do I use the Swiss tech resume builder?
```

This runs the setup helper, which:

1. **Checks your prerequisites** (see [Requirements](#requirements)) and tells you what's missing.
2. **Creates your profile** — `docs/PERSONAL_PROFILE.md`, started from a template — in your own
   project. This is your single source of truth: it holds *all* your experience, and the system
   pulls the relevant parts for each application.
3. **Sets up your workspace** so generated resumes land in `resumes/` in your project.

### Build your profile by chatting — meet the profile coach

You don't write the profile by hand. The system includes a built-in **profile coach** that builds
it *with* you: hand it your source material and it extracts your experience, structures it onto the
profile, and — the part that matters most — spots the gaps between where you want to go and what
you've actually documented.

Give it whatever you already have:

- **Performance reviews** and **employment references / certificates** (Swiss *Arbeitszeugnisse*) —
  paste the text or attach the files.
- Your **LinkedIn profile** (paste the content or a URL) for a quick first pass.
- **Past CVs, project write-ups, or notes** — anything that records what you did and the impact.

For example:

```text
> Here's my latest performance review and my LinkedIn profile. Build out my profile from them.
```

The coach reads the material, writes it into your profile, and asks focused questions about
anything thin or missing — a few at a time, never a wall of forms. Whatever you can't answer yet it
records in a `MISSING_INFORMATION.md` to-do list instead of guessing, so nothing gets invented and
you're left with a clear list of what to dig up. Come back to it any time — "help me improve my
profile" — and it picks up where you left off. Richer input means stronger, more truthful resumes.

Once your profile has real content, ask for a resume:

```text
> Build me a Swiss-market resume for Senior ML Engineer roles.
```

or, for a specific posting:

```text
> I'm applying for this role: <paste the job posting or URL>. Tailor my resume for it.
```

You get back a compiled PDF and a paired application-strategy document.

## Requirements

The pipeline runs in any supported agent (Claude Code, Gemini CLI, Cursor, Pi); producing the PDF
additionally needs, on your machine:

- **XeLaTeX** — a TeX distribution with the `moderncv`, `moderntimeline`, and `fontawesome`
  packages.
  - macOS: `brew install --cask mactex` (or `basictex` for a minimal install)
  - Ubuntu/Debian: `sudo apt-get install texlive-xetex texlive-fonts-extra texlive-latex-extra`
- **Fonts** — Roboto, Lato, and Roboto Slab (used by the template).
- **Python 3** — for the helper that scaffolds each application.

The setup helper checks all of these and points you at anything that's missing, so the easiest
path is to install it (or open a clone in your agent) and let it walk you through setup.

## What it does

You talk to the resume builder in plain language; behind the scenes it runs a reviewed pipeline:

| Stage | What happens |
|-------|--------------|
| **Setup** | Checks prerequisites and scaffolds your profile and workspace |
| **Profile coaching** | Builds your profile from your source material and flags gaps to fill |
| **Market analysis** | Researches the target role: salary benchmarks, in-demand skills, ATS keywords |
| **Strategy** | Decides positioning, section emphasis, and which keywords to feature |
| **Content** | Writes the resume from your profile — every claim grounded in what you actually did |
| **Content review** | A forked review skill scores the content and ATS match with fresh eyes; it must pass before rendering |
| **Your review** | You get to read and edit the content — still plain markdown — before anything is rendered |
| **PDF render** | Produces a polished moderncv PDF |
| **Design review** | A forked review skill checks layout and typography against the style guide |
| **Strategy doc** | Generates a paired application strategy: cover-letter angle, salary negotiation, interview prep |

Two things make the output trustworthy:

- **Grounding.** Every metric, technology, and achievement must trace back to your profile. The
  content reviewer rejects any resume that contains a claim your profile doesn't support — so you
  never have to worry about an invented number slipping through.
- **Quality gates.** Content review runs before rendering and design review after. If either
  falls short, the relevant stage re-runs with the reviewer's feedback before the resume reaches
  you.

Everything is generated from one source — `docs/PERSONAL_PROFILE.md` — so you maintain a single,
comprehensive profile and produce as many targeted resumes as you need. And the pipeline itself is
authored from a single source: the skills live once in `.agents/skills/`, so the same reviewed
workflow behaves identically whichever agent you run it in.

## Examples

Company names below are placeholders.

**A general-purpose resume**

```text
You: "Create a Swiss-market resume for MLOps Engineer roles."
→ strategy → content → review → PDF
You get: resumes/compiled/{date}_mlops_engineer_CV_en.pdf
```

**A tailored application**

```text
You: "I want to apply for the Senior ML Engineer role at <Company X>: <posting URL>"
→ market analysis → strategy → content → reviews → PDF + strategy
You get, under resumes/customized/{date}_companyx_senior_ml_engineer/:
  • the resume PDF
  • an application strategy: cover-letter angle, salary range, interview prep, fit assessment
```

If you prefer to start an application from the command line, the system ships a small helper:

```bash
# From a clone of this repo (skills live under .agents/skills/):
python3 .agents/skills/swiss-tech-resume-builder/scripts/init_application.py \
  --company companyx --role ml_engineer
# In Claude Code as an installed plugin, prepend the install root:
python3 "${CLAUDE_PLUGIN_ROOT}/.agents/skills/swiss-tech-resume-builder/scripts/init_application.py" \
  --company companyx --role ml_engineer
```

It scaffolds the application folder under `resumes/customized/` in your project and finds the
bundled template automatically.

## Use it with other agents

The whole pipeline is authored once in `.agents/skills/` to the
[Agent Skills standard](https://agentskills.io/specification). Each agent's expected skills
directory is a symlink into that one canonical tree, so there's a single source of truth — you
never maintain parallel copies. Project guidance lives in `AGENTS.md` (with `CLAUDE.md` and
`GEMINI.md` as symlinks to it).

Clone the repo and run your agent from inside it:

```bash
git clone https://github.com/datarian/CV
cd CV
```

| Agent | How skills load |
|-------|-----------------|
| **Claude Code** | Install as a plugin (above), or run in a clone — skills resolve via `.claude/skills/` (symlink) and the plugin manifest. |
| **Pi** | Run `pi` inside the clone — skills under `.agents/skills/` are auto-discovered (no config). Or install remotely: `pi install git:github.com/datarian/CV` (the root `package.json` declares `pi.skills`). |
| **Gemini CLI** | Symlink `.gemini/skills → ../.agents/skills` and point Gemini at `AGENTS.md` via `.gemini/settings.json`. *(adapter pending)* |
| **Cursor** | Open the clone in Cursor — `.agents/skills/` and `AGENTS.md` are both read natively (no config). |

Then ask the same things you would in Claude Code (e.g. *"Build me a Swiss-market resume for
Senior ML Engineer roles"*); invoke the orchestrator explicitly with `/skill:swiss-tech-resume-builder`
where your agent supports it.

> **Notes.** The PDF pipeline needs only XeLaTeX + Python (see [Requirements](#requirements)) and no
> MCP, so it works the same everywhere. The optional **web preview** uses a Playwright MCP that is
> configured per-agent (`.claude/.mcp.json` for Claude Code; Pi/Gemini/Cursor MCP wiring is a
> documented follow-up). The mandatory render constraints (moderncv `fancy`, XeLaTeX-only, 6-arg
> `\cventry`, GitHub footer) live inside the render skill itself, so they hold on every agent even
> if it doesn't read `AGENTS.md`. The two review skills declare `context: fork` for isolation; where
> an agent doesn't honor that field (e.g. Cursor today), they simply run in the main context — the
> review still happens, just without a separate forked turn.

## Your data stays private

Your resume content never leaves your machine, and nothing personal is part of the published system.

- `docs/PERSONAL_PROFILE.md`, your generated resumes (`resumes/customized/`, `resumes/compiled/`),
  all PDFs, and any portrait photos are kept local and are excluded from version control by
  default.
- Only the generic system — skills, knowledge base, style guide, template, and an *example*
  profile with placeholder data — is public.

If you fork this repository, run `git status` before pushing and confirm no `PERSONAL_PROFILE.md`,
PDFs, or files under `resumes/customized/` are staged.

## Customize it for another market

The system is built to be adapted. Edit the knowledge base and template (under `docs/` and
`resumes/templates/`) and the skills (under `.agents/skills/`) to target a different country,
industry, or role family. To redistribute your fork, update the manifests for whichever agents you
publish to: `.claude-plugin/marketplace.json` + `.claude-plugin/plugin.json` for the Claude Code
marketplace, and the root `package.json` (`pi.skills`) for Pi. Others install your Claude Code
version with the same two `/plugin` commands, or clone your fork for the other agents.

## Resources

- Swiss official salary calculator: <https://www.salarium.bfs.admin.ch/>
- moderncv documentation: <https://ctan.org/pkg/moderncv>
- Agent Skills standard: <https://agentskills.io/specification>
- Claude Code plugins: <https://code.claude.com/docs/en/plugins>
- Claude Code: <https://docs.claude.com/claude-code>
- Gemini CLI: <https://geminicli.com/docs/>
- Cursor: <https://cursor.com/docs>
- Pi coding agent: <https://github.com/earendil-works/pi>

---

Licensed under **CC BY-NC-SA 4.0**. Built with [Claude Code](https://claude.com/claude-code).
