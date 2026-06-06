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

4. **Attribute honestly.** Describe your actual role in collective work — *contributed to, led
   the X workstream, part of the team that* — rather than implying sole ownership. Accurate
   attribution reads as more credible, not less impressive, to Swiss reviewers.

5. **Quantify what is real and meaningful — not everything.** A precise, true, modest number
   beats a vague large one. Do not manufacture or inflate figures (the generator's
   *Grounding & Truthfulness* rule is the companion to this one). Some lines are better stated
   qualitatively than forced into a metric.

6. **Calm, factual register.** Third-person implied, no "I/me/my", no exclamation marks, no
   superlatives, no rhetorical build-up. Specific and understated throughout.

## Before → After

| American (too braggy) | Swiss (evidence-forward) |
|---|---|
| Spearheaded a revolutionary end-to-end ML platform serving a massive 1M+ daily predictions with world-class 99.9% uptime | Built and maintained the ML serving platform handling ~1M daily predictions at 99.9% uptime |
| Passionate ML engineer with deep expertise and a proven track record of transformative results | ML engineer with 8 years building and operating production ML systems in regulated industries |
| Drove dramatic 60% latency improvements across the entire stack | Reduced P95 inference latency by 60% (800 ms → 320 ms) on the scoring service |
| Single-handedly architected the company's entire MLOps strategy | Led the MLOps workstream; designed the CI/CD and model-monitoring setup adopted by 3 teams |

## What the reviewer flags

Treat over-confident, American-style phrasing as a **Cultural Fit** weakness (it undermines
Swiss credibility):

- Inflated verbs (Spearheaded, Pioneered, Revolutionized, etc.) → recommend the plain verb.
- Marketing adjectives / self-ratings with no evidence → recommend cutting or replacing with evidence.
- Intensifiers attached to metrics → recommend removing the intensifier, keeping the number.
- Sole-ownership phrasing on team work → recommend honest attribution.

A resume can be quantified, specific, and ATS-strong **and** understated — that combination is
the target, not a trade-off.
