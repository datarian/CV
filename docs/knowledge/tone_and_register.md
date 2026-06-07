# Tone & Register Standard (Swiss Market)

This is the **single source of truth** for the *voice* of every resume in this repo —
how claims are phrased, which verbs are used, and how confidence is expressed. Everything
that shapes wording cites this file rather than restating the rules, so they cannot drift:

- `resume-content-generation` — writes to this register.
- `resume-content-review` / `swiss-tech-resume-reviewer` — flags violations (Cultural Fit / hyperbole).
- `docs/style-guide/DESIGN_SYSTEM.md` §7 and `docs/style-guide/pdf/CV_STYLE_GUIDE.md` §10.1 —
  defer to this file for writing voice; they keep only visual/format concerns.

If the tone rules change, change them **here**.

## Core principle: evidence over adjectives

The American resume sells; the Swiss resume **documents**. A Swiss reviewer infers competence
from specific, verifiable facts — not from self-assessment or scale-bragging. Confidence is
shown by stating what you did, plainly and precisely, and letting the reader draw the
conclusion. **When the wording and the evidence both make the point, cut the wording.**
When in doubt, under-claim — it reads as credible, and it survives the interview.

This complements `experience_bullet_standards.md` (how *many* bullets) and
`ats_optimization.md` (which *keywords*); this doc governs *how each line sounds*.

## Rules

1. **Let the metric carry the claim — don't editorialize it.** State "reduced P95 latency
   from 800 ms to 320 ms," not "dramatically slashed latency by an impressive 60%." No
   intensifiers on numbers (*impressive, massive, huge, dramatically, significantly*).

2. **Use the verb that is literally true.** Prefer accurate, measured verbs — *Built,
   Developed, Designed, Led, Improved, Reduced, Delivered, Maintained, Established, Migrated,
   Automated, Contributed to*. Avoid inflated verbs that overstate ownership or novelty —
   *Spearheaded, Pioneered, Revolutionized, Transformed, Masterminded, Championed, Drove,
   Architected* (use "Architected" only for work that was genuinely architecture).

3. **No marketing vocabulary.** Cut *world-class, best-in-class, cutting-edge, state-of-the-art,
   seamless(ly), passionate, extensive, deep expertise, proven track record, results-driven,
   synergy, leverage* (as a verb). Replace a self-rating with its evidence: not "deep
   expertise in Kubernetes" but "ran production Kubernetes clusters for 3 years."

4. **Attribute honestly, and right-size ownership to scale.** Describe your actual role in
   collective work — *contributed to, led the X workstream, part of the team that* — rather
   than implying sole ownership. *Owned / initiated* fits work that was genuinely individual
   in scope; a cross-squad, multi-quarter, or org-wide effort reads as overstep when claimed
   solo — use collaborative framing (*worked across squads to design and implement…*). Do not
   narrate the *process* of building consensus ("aligned stakeholders before coding") as an
   achievement in itself — Swiss reviewers read stakeholder alignment as table stakes, not a
   feat; show the outcome, not the choreography. Accurate attribution reads as more credible,
   not less impressive, to Swiss reviewers.

5. **Quantify what is real and meaningful — not everything.** A precise, true, modest number
   beats a vague large one. Do not manufacture or inflate figures (the generator's
   *Grounding & Truthfulness* rule is the companion to this one). Some lines are better stated
   qualitatively than forced into a metric.

6. **Calm, factual register.** Third-person implied, no "I/me/my", no exclamation marks, no
   superlatives, no rhetorical build-up. Specific and understated throughout.

7. **No testimonials, no editorializing your own output.** Don't quote anyone praising your
   work ("cited by the EM as 'gold'", "described as best-in-team") — it reads as fishing for
   validation. Don't editorialize the *value* or *safety* of what you built ("a safe, no-risk
   comparison", "a game-changing template"). State the artifact and what happened to it —
   *adopted as a reusable reference across squads* — and let adoption be the proof. Adoption
   is evidence; a quote about it is not.

8. **Frame contributions by outcome, not by policing.** Security and governance work lands as
   engineering when stated as enablement: not "steered teams away from shadow AI" but "built
   approved internal AI tooling that teams adopted, cutting unvetted-tool usage." Lead with
   what you enabled and the result, not with the bad thing you prevented.

## Before → After

| American (too braggy) | Swiss (evidence-forward) |
|---|---|
| Spearheaded a revolutionary end-to-end ML platform serving a massive 1M+ daily predictions with world-class 99.9% uptime | Built and maintained the ML serving platform handling ~1M daily predictions at 99.9% uptime |
| Passionate ML engineer with deep expertise and a proven track record of transformative results | ML engineer with 8 years building and operating production ML systems in regulated industries |
| Drove dramatic 60% latency improvements across the entire stack | Reduced P95 inference latency by 60% (800 ms → 320 ms) on the scoring service |
| Single-handedly architected the company's entire MLOps strategy | Led the MLOps workstream; designed the CI/CD and model-monitoring setup adopted by 3 teams |
| Initiated and owned an end-to-end LLM evaluation system across multiple quarters; aligned EM and squad leads before coding | Worked across squads to design and implement an end-to-end LLM evaluation system, delivering a human-reviewed golden dataset on GCP |
| …bootstrapped from zero to deploy in ~1 day, cited by the EM as 'gold' and adopted as a reusable delivery reference | …bootstrapped from zero to production deploy in ~1 day; adopted as a reusable delivery reference across squads |
| *(target style — emulate this matter-of-fact engineering precision)* | Diagnosed a Ray object-store memory leak and led a multi-issue production incident (K8s 1.34, gRPC/Ray 2.54) |

## What the reviewer flags

Treat over-confident, American-style phrasing as a **Cultural Fit** weakness (it undermines
Swiss credibility):

- Inflated verbs (Spearheaded, Pioneered, Revolutionized, etc.) → recommend the plain verb.
- Marketing adjectives / self-ratings with no evidence → recommend cutting or replacing with evidence.
- Intensifiers attached to metrics → recommend removing the intensifier, keeping the number.
- Sole-ownership phrasing on team work → recommend honest attribution.
- Oversized ownership on cross-team / multi-quarter / org-wide work (*initiated and owned … across multiple quarters*) → recommend right-sizing to the actual scope, collaborative framing.
- Process-narration as achievement (*aligned EM and squad leads before coding*) → recommend cutting it; keep the outcome.
- Testimonial / praise quotes (*cited by the EM as 'gold'*) and self-editorializing the value or safety of one's own output (*safe, no-risk*, *game-changing*) → recommend cutting; keep the artifact and its adoption.
- Governance/security framed as policing (*steered teams away from shadow AI*) → recommend reframing as enablement and outcome.

A resume can be quantified, specific, and ATS-strong **and** understated — that combination is
the target, not a trade-off.
