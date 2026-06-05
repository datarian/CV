---
name: resume-strategy
description: Plan resume content strategy for a Swiss tech role — positioning, section emphasis, and ATS keyword selection from market analysis plus the personal profile. Use after market analysis and before generating resume content.
---

# Resume Strategy

Given a target role and the output of a market analysis, this skill produces a **strategy brief** that tells the content generator exactly what to emphasize, in what order, and with which keywords. The brief is compact enough for the `swiss-tech-resume-builder` orchestrator skill to hold inline and pass directly to content generation.

---

## 1. Determine Role-Type Focus

Before touching content, classify the target role into one of four archetypes. The archetype governs every downstream decision.

| Archetype | Signals | Primary framing |
|---|---|---|
| **IC / ML Engineer** | "engineer", "developer", no direct reports | Hands-on depth; system design; model ownership |
| **Lead / Principal** | "lead", "principal", "staff", "architect" | Technical direction + multiplying others, no headcount |
| **Engineering Manager** | "manager", "head of", "VP Eng" with hiring authority | People leadership, delivery, team health |
| **MLOps / Platform** | "MLOps", "platform", "infra", "reliability" | Reliability engineering, developer productivity, tooling |

Choose the single best fit. If the posting mixes signals (e.g., "Lead ML Engineer with people management"), note both but anchor the positioning in the dominant signal.

---

## 2. Experience Selection and Prioritization

Not every role in the personal profile belongs on a given resume. Apply these rules in order:

1. **Relevance gate**: Include a role only if it contributes at least one of: directly relevant technical skills, leadership evidence matching the archetype, quantifiable outcomes the target employer would recognize.
2. **Recency weight**: The last 5–7 years receive full bullet treatment. Earlier roles get a condensed entry (title, company, dates, one-line summary) unless they contain a flagship achievement that cannot be found elsewhere.
3. **Achievement over task**: Replace duty-list bullets with outcome bullets. Format: *action verb → what was done → measurable result*. Prefer CHF/EUR figures, percentage improvements, scale (users, requests/sec, model accuracy) over generic descriptions.
4. **Archetype emphasis**:
   - IC / ML Engineer → model development, experiment lifecycle, production deployment, system scale
   - Lead / Principal → technical decisions made, teams unblocked, architecture impact, mentorship
   - Engineering Manager → headcount, attrition, delivery velocity, hiring, budget
   - MLOps / Platform → uptime, CI/CD pipelines, infra cost reduction, platform adoption metrics

---

## 3. Section Order and Emphasis

Swiss tech resumes follow a conventional structure; reordering is possible but must be deliberate.

**Default order:**
1. Header (name, contact, permit status, photo)
2. Professional summary — 3–4 lines, role-specific positioning statement
3. Core competencies / skills — keyword-dense, scannable
4. Professional experience — reverse chronological
5. Education
6. Certifications & continuing education
7. Languages (with CEFR levels)
8. GitHub / portfolio link

**When to deviate:**
- Move Education above Experience only when the degree is a hiring gate (rare in Swiss tech).
- Move Certifications above Experience when the posting explicitly lists a certification as required.
- For MLOps roles, add a **Technical Stack** section immediately after the summary to front-load tooling keywords.
- For Manager roles, condense the technical skills section and expand a **Leadership Highlights** section between the summary and experience.

**Page budget:** 2 pages for most tech roles; 2–3 pages for senior positions with >10 years of directly relevant experience. Do not pad. Do not truncate meaningful content to hit one page.

---

## 4. Keyword Integration

See [`docs/knowledge/ats_optimization.md`](../../docs/knowledge/ats_optimization.md) for the full ATS optimization methodology. Apply that methodology through this lens:

- **Source keywords from**: the job posting (verbatim phrases score highest), the market analysis output, and the archetype's canonical skill set.
- **Placement hierarchy**: title/summary first, skills section second, experience bullets third. ATS scanners weight earlier placement.
- **Density without stuffing**: aim for natural prose that happens to include the keyword in context, not bare keyword lists in the summary.
- **Archetype-specific must-haves**:
  - IC / ML Engineer: PyTorch/TensorFlow/JAX, MLflow/W&B, feature stores, model serving (Triton, TorchServe, vLLM), experiment tracking
  - Lead / Principal: system design, technical roadmap, cross-functional, architectural decisions, RFC process
  - Engineering Manager: hiring, performance management, OKRs, delivery, stakeholder management
  - MLOps / Platform: Kubernetes, Docker, CI/CD (GitHub Actions, GitLab CI, ArgoCD), data pipelines, observability (Prometheus, Grafana), infrastructure-as-code

For Swiss-specific terminology and regional conventions, see [`docs/knowledge/swiss_market_conventions.md`](../../docs/knowledge/swiss_market_conventions.md).

---

## 5. Salary Positioning

The strategy brief must include an explicit target salary figure. This anchors the professional summary and any numeric claims in the experience section.

- Derive from market analysis output (expected: salary band for the role/location).
- State as a CHF annual gross figure or range (e.g., "140–160 kCHF gross").
- If the target is above median, the resume must substantiate it with outcome-based evidence; flag any gaps in the strategy brief so the content generator knows where to strengthen bullets.

---

## Output: Strategy Brief

The strategy brief produced by this skill is a short, structured document — not prose. The `swiss-tech-resume-builder` orchestrator skill passes it inline to the content generation step, so it must be self-contained and under roughly 400 words.

**Required fields:**

```
ROLE ARCHETYPE: <IC | Lead/Principal | Manager | MLOps/Platform>

POSITIONING STATEMENT (3–4 sentences):
<What makes this candidate the right hire for this specific role; anchors the professional summary>

SECTIONS TO EMPHASIZE (ordered):
1. <section> — <why / what angle>
2. ...

SECTIONS TO CONDENSE OR OMIT:
- <section> — <reason>

PRIORITIZED KEYWORD LIST:
Tier 1 (must appear verbatim): <comma-separated>
Tier 2 (should appear, synonyms acceptable): <comma-separated>
Tier 3 (nice-to-have, include if natural): <comma-separated>

TARGET SALARY: <CHF figure or range>

CONTENT FLAGS (optional):
- <any gaps, missing evidence, or bullets that need strengthening before content generation proceeds>
```

This brief is the handoff artifact from strategy to content generation. It is not shown to the applicant — it is working material for the pipeline.
