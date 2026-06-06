---
name: resume-market-analysis
description: Research the Swiss tech job market for a target role — salary benchmarks, in-demand skills, ATS keywords, and competitive positioning. Use when analyzing a job posting or planning resume positioning for a Swiss tech position.
---

> **Bundled reference files.** Paths in this skill beginning with `docs/` are bundled with
> the plugin. When the plugin is installed, read them under `${CLAUDE_PLUGIN_ROOT}/` (e.g.
> `${CLAUDE_PLUGIN_ROOT}/docs/knowledge/…`) — the variable expands to the plugin's install
> directory automatically. When working from the source repository the variable is unset,
> so read the same paths relative to the repo root (exactly as written).

# Resume Market Analysis

## Purpose

Produce a compact, actionable market snapshot for a given target role in Switzerland. The output feeds directly into resume positioning, keyword selection, and salary negotiation — it is not a standalone report.

## Swiss Market Conventions

For general Swiss tech hiring conventions (language requirements, work permit types, CV formatting norms, cultural expectations) refer to `docs/knowledge/swiss_market_conventions.md` rather than restating them here.

## Research Methodology

### 1. Salary Benchmarking

Use the following sources in order of reliability:

1. **Salarium** (`salarium.bfs.admin.ch`) — Swiss Federal Statistical Office calculator; filter by NOGA industry code, canton, and education level. This is the most authoritative public benchmark.
2. **jobs.ch salary guide** — crowdsourced, useful for recent market movement.
3. **jobup.ch** — particularly strong for French-speaking Switzerland (Geneva, Vaud, Neuchâtel).
4. **LinkedIn Switzerland salary insights** — useful for senior/specialist roles with limited Salarium data.

When quoting a range, always state: gross annual CHF, canton, seniority level assumed, and source. A range of ±10–15% around the midpoint is typical for senior IC roles.

### 2. Job Posting Keyword Extraction

For a given job posting (or role description), extract keywords in three tiers:

| Tier | What it contains | Resume treatment |
|------|-----------------|-----------------|
| **Must-have** | Explicitly required; appear in 3+ postings for the same role | Use verbatim in skills section and at least one experience bullet |
| **Nice-to-have** | Listed under "preferred" or "plus"; appear in 1–2 postings | Include if genuine; omit if absent |
| **Context signals** | Methodology terms, domain vocabulary (e.g. "MLOps", "data mesh") | Weave into descriptions naturally |

Cross-reference at least **two live postings** for the target role (use jobs.ch + LinkedIn) before finalising the must-have list. Single-posting extraction over-indexes on idiosyncratic requirements.

### 3. Skills Gap Assessment

Classify each gap as:

- **Addressable gap**: Candidate has adjacent experience; a single resume bullet with context can bridge it (e.g. used Kubeflow in a project → maps to "Kubernetes-based ML pipelines").
- **Deal-breaker gap**: Hard requirement with no adjacent evidence (e.g. 5 years Java, zero Java experience). Flag explicitly; do not paper over it.

For addressable gaps, suggest the specific framing to use in the resume. For deal-breakers, recommend whether to apply anyway (fit score <60%) or note it as a stretch target.

### 4. Regional and Industry Variations

Key variations to account for — detailed conventions are in `docs/knowledge/swiss_market_conventions.md`:

**By region:**
- **Zurich**: Largest tech cluster; dominant for fintech (banks, neobanks), SaaS scale-ups, Google/Microsoft offices. German required for most non-global roles.
- **Basel**: Pharma/biotech (Roche, Novartis), regulatory-heavy; German strongly preferred. Life-sciences domain knowledge is a differentiator.
- **Geneva/Lausanne**: International organisations, luxury/watchmaking, French-first. English CVs more accepted. jobup.ch has better coverage than jobs.ch here.
- **Zug / Crypto Valley**: Web3, DeFi, regulated crypto; English-dominant. Tolerance for non-traditional backgrounds is higher.
- **Bern**: Federal IT projects, public-sector digital transformation; German required, procurement cycles are long.

**By industry:**
- **Fintech / Banking**: Compliance keywords (FINMA, SOC 2, data residency) matter as much as tech stack. Risk frameworks (Basel III/IV for credit-risk ML roles) are valued.
- **Pharma / MedTech**: GxP, 21 CFR Part 11, data integrity regulations. Python proficiency less assumed than in pure-tech; R still common.
- **Consulting (Big 4, Accenture, etc.)**: Soft-skill framing is heavier; methodologies (SAFe, Scrum, TOGAF) and client-facing language help.
- **ETH/EPFL research spin-offs**: Publication record and academic network carry weight alongside engineering skills.

### 5. Competitive Positioning

After extracting keywords and benchmarking salary, synthesise:

- **Unique angle**: What makes this candidate stand out vs. the median applicant for this role in this region?
- **Headline framing**: Suggest a one-line professional summary that leads with the strongest match signal.
- **Keywords to de-emphasise**: Skills the candidate has but that lower positioning (e.g. listing "junior" frameworks when targeting senior roles).

## Information Sources to Check First

Before performing live web research, check `docs/JOB_AGENT_RESEARCH.md` for existing research on the same or adjacent roles. Extend that file with any new findings after completing an analysis.

## Output

The analysis returns a **compact summary** structured for direct reuse by the orchestrator:

```
## Market Analysis — [Role Title] / [Region]

### Salary Range
[Low]–[High] CHF gross/year (source: [Salarium/jobs.ch/etc.], canton: [X], seniority: [Y])
Target ask: [specific figure with rationale]

### Required Keywords (prioritised)
Must-have: [comma-separated list]
Nice-to-have: [comma-separated list]

### Skills Gap Assessment
Addressable: [gap → suggested framing]
Deal-breakers: [gap, recommendation]

### Positioning Notes
[2–4 sentences: unique angle, headline suggestion, keywords to de-emphasise]

### Regional / Industry Flags
[Any region or industry specifics that affect resume or salary strategy]
```

Keep the summary under one page. The `swiss-tech-resume-builder` orchestrator skill will incorporate findings directly into resume strategy without further elaboration.
