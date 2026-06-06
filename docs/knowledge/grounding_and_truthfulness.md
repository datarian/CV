# Grounding & Truthfulness Standard

Single source of truth for the anti-fabrication rule. Both sides of the resume
pipeline reference this file rather than restating it, the same DRY discipline used
for other shared standards:

- **Generator** (`resume-content-generation`) enforces it at write time.
- **Reviewer** (`resume-content-review` skill / `swiss-tech-resume-reviewer` agent)
  verifies it at review time.

## The Rule (Non-Negotiable)

Every **metric, named technology, scope figure, job title, date, and outcome** that
appears in `resume_content.md` MUST be traceable to a specific statement in
`docs/PERSONAL_PROFILE.md`.

- **Never invent, inflate, or approximate numbers.** "~1M requests", "around 40%", or
  a plausible-but-unsourced "99.9% uptime" are all violations.
- **Never introduce** a technology, employer, team size, or responsibility the profile
  does not support.
- When the profile lacks a number or detail that would strengthen a bullet, **surface
  the gap** (note it for the user / `MISSING_INFORMATION.md`) instead of filling it. A
  missing metric is acceptable; an invented one is not.
- Reframing, emphasis, ATS-aligned wording, and responsibility→achievement
  transformation of **true** facts are encouraged. Fabrication is not.

## What Counts as Grounded

A claim is grounded when a reader can point to the profile line that supports it.

Acceptable transformations:

- Profile: "served roughly a million daily predictions" → bullet: "1M+ daily
  predictions" ✅ (supported)
- Profile: "led a team of 4 engineers" → "led cross-functional team of 4 engineers" ✅

Unacceptable (fabrication):

- Profile: "improved model performance" → "reduced inference latency by **60%**" ❌
  (number invented)
- Profile silent on uptime → "**99.9%** uptime" ❌

## Reviewer Verification (two modes)

Cross-reference **every quantified claim and named technology/scope** in the resume
against the profile.

**Mode A — profile available (`docs/PERSONAL_PROFILE.md` is readable):**
Verify each claim against the profile. Any metric or claim with no supporting statement
is a **confirmed ungrounded claim**.

**Mode B — profile NOT available (only a rendered PDF / extracted text to review):**
You cannot confirm fabrication, so flag claims that look **unverifiable or implausibly
precise** for the candidate's history — oddly specific percentages, round-but-large
scale figures, or outcomes that do not fit the candidate's seniority/context — and
recommend confirming each against the profile before sending.

In **both** modes, name the **specific bullet** and quote the claim in the feedback.

## Severity & Gate Consequence

- A **confirmed ungrounded claim** (Mode A) is a **High-priority weakness** (resume
  integrity + interview risk) AND forces an automatic **fail**: set `pass: false`
  regardless of rating/ATS, and cap `rating` at **4.0**. A single fabricated number can
  end an interview ("walk me through that 60%") and is disqualifying — it can never be
  a "strong candidate" verdict.
- A **suspected unverifiable claim** (Mode B) is a **High-priority weakness** with a
  recommendation to confirm against the profile. It does not auto-fail on suspicion
  alone, but every suspect claim MUST be listed in `feedback`.
