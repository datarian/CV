# Swiss Tech Resume Builder

A Claude Code **plugin** that turns your experience into an ATS-optimized, Swiss-market resume.
You keep one profile of everything you've done; the plugin researches the target role, plans a
strategy, writes grounded content, renders a polished PDF, and reviews it against quality gates —
then hands you a tailored application strategy (cover letter, salary negotiation, interview prep).

It runs entirely inside [Claude Code](https://docs.claude.com/claude-code) and installs in two
commands — no cloning or copying files.

## Table of contents

- [Install](#install)
- [Quick start](#quick-start)
- [Requirements](#requirements)
- [What it does](#what-it-does)
- [Examples](#examples)
- [Your data stays private](#your-data-stays-private)
- [Customize it for another market](#customize-it-for-another-market)
- [Resources](#resources)

## Install

In Claude Code:

```text
/plugin marketplace add datarian/CV
/plugin install swiss-tech-resume-builder@swiss-tech-resume
```

That's it — the plugin brings everything it needs: the skills, the review agents, the LaTeX
template, the Swiss-market knowledge base, and the style guide. Update later with
`/plugin marketplace update swiss-tech-resume`.

## Quick start

After installing, just ask:

```text
> How do I use the Swiss tech resume builder?
```

This runs the setup helper, which:

1. **Checks your prerequisites** (see [Requirements](#requirements)) and tells you what's missing.
2. **Creates your profile** — `docs/PERSONAL_PROFILE.md`, started from a template — in your own
   project. This is your single source of truth: it holds *all* your experience, and the plugin
   pulls the relevant parts for each application.
3. **Sets up your workspace** so generated resumes land in `resumes/` in your project.

### Build your profile by chatting — don't fill it in by hand

The profile is the foundation everything else is built on, but you don't write it manually. The
fastest and most accurate way is to **talk to the plugin and hand it your source material** — it
extracts the roles, achievements, metrics, and skills and structures them for you:

- Share your **performance reviews** and **employment references / certificates** (e.g. Swiss
  *Arbeitszeugnisse*) — paste the text or attach the files.
- Point it at your **LinkedIn profile** (paste the content or the URL) for a quick first pass.
- Drop in **past CVs, project write-ups, or notes** — anything that records what you did and the
  impact you had.

Then just say what you want captured, for example:

```text
> Here's my latest performance review and my LinkedIn profile. Build out my profile from them.
```

It reads the material, writes it into your profile, and asks about anything that's missing or
ambiguous — you confirm and correct in the conversation. Richer source material means stronger,
more truthful resumes, because every resume is grounded in what your profile says.

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

The plugin runs in Claude Code; producing the PDF additionally needs, on your machine:

- **XeLaTeX** — a TeX distribution with the `moderncv`, `moderntimeline`, and `fontawesome`
  packages.
  - macOS: `brew install --cask mactex` (or `basictex` for a minimal install)
  - Ubuntu/Debian: `sudo apt-get install texlive-xetex texlive-fonts-extra texlive-latex-extra`
- **Fonts** — Roboto, Lato, and Roboto Slab (used by the template).
- **Python 3** — for the helper that scaffolds each application.

The setup helper checks all of these and points you at anything that's missing, so the easiest
path is to install the plugin and let it walk you through setup.

## What it does

You talk to the resume builder in plain language; behind the scenes it runs a reviewed pipeline:

| Stage | What happens |
|-------|--------------|
| **Setup** | Checks prerequisites and scaffolds your profile and workspace |
| **Market analysis** | Researches the target role: salary benchmarks, in-demand skills, ATS keywords |
| **Strategy** | Decides positioning, section emphasis, and which keywords to feature |
| **Content** | Writes the resume from your profile — every claim grounded in what you actually did |
| **Content review** | An expert reviewer scores the content and ATS match; it must pass before rendering |
| **PDF render** | Produces a polished moderncv PDF |
| **Design review** | A design reviewer checks layout and typography against the style guide |
| **Strategy doc** | Generates a paired application strategy: cover-letter angle, salary negotiation, interview prep |

Two things make the output trustworthy:

- **Grounding.** Every metric, technology, and achievement must trace back to your profile. The
  content reviewer rejects any resume that contains a claim your profile doesn't support — so you
  never have to worry about an invented number slipping through.
- **Quality gates.** Content review runs before rendering and design review after. If either
  falls short, the relevant stage re-runs with the reviewer's feedback before the resume reaches
  you.

Everything is generated from one source — `docs/PERSONAL_PROFILE.md` — so you maintain a single,
comprehensive profile and produce as many targeted resumes as you need.

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

If you prefer to start an application from the command line, the plugin ships a small helper:

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/.claude/skills/swiss-tech-resume-builder/scripts/init_application.py" \
  --company companyx --role ml_engineer
```

It scaffolds the application folder under `resumes/customized/` in your project and finds the
bundled template automatically.

## Your data stays private

Your resume content never leaves your machine, and nothing personal is part of the plugin.

- `docs/PERSONAL_PROFILE.md`, your generated resumes (`resumes/customized/`, `resumes/compiled/`),
  all PDFs, and any portrait photos are kept local and are excluded from version control by
  default.
- Only the generic system — skills, knowledge base, style guide, template, and an *example*
  profile with placeholder data — is public.

If you fork this repository, run `git status` before pushing and confirm no `PERSONAL_PROFILE.md`,
PDFs, or files under `resumes/customized/` are staged.

## Customize it for another market

The system is built to be adapted. Edit the knowledge base and template to target a different
country, industry, or role family, then publish your fork as its own marketplace by updating
`.claude-plugin/marketplace.json` and `.claude-plugin/plugin.json`. Others install your version
with the same two `/plugin` commands.

## Resources

- Swiss official salary calculator: <https://www.salarium.bfs.admin.ch/>
- moderncv documentation: <https://ctan.org/pkg/moderncv>
- Claude Code plugins: <https://code.claude.com/docs/en/plugins>
- Claude Code: <https://docs.claude.com/claude-code>

---

Licensed under **CC BY-NC-SA 4.0**. Built with [Claude Code](https://claude.com/claude-code).
