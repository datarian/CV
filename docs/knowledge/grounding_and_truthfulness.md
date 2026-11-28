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

## Motivational Grounding

Facts are not the only thing a resume can fabricate. Goals, aspirations, and values can be
fabricated too — most often by borrowing the employer's mission or slogan. That reads as cheap
to the employer and dilutes the candidate's own story.

**The rule:** every motivational statement in `resume_content.md` — a goal, aspiration,
interest, or value claim ("Ziel: …", "driven by …"; "Schwerpunkt: …" only when it states an aspiration rather than a current specialization) — MUST trace to a
**Core Driver** or **Trade-off** in the profile's `## Career Goals` section.

- **Free wording, posting keywords welcome.** The sentence need not quote the driver; it may
  blend in the posting's technologies, skills, and domain terms.
- **No unbacked aspiration**, however well it fits the role. If the role's appeal is not
  covered by any driver, leave it out of the resume.
- **No bridge to the role.** The goal sentence expresses 1–2 drivers; it does not explain why
  this employer fits ("…which is why [Company] appeals"). That belongs in the cover letter.
- **Echo is not the test.** A driver the candidate genuinely holds stays legitimate even when
  the company says the same thing; an aspiration with no driver is a violation even when it
  sounds original.
- **Never contradict a non-goal.** Nothing in the resume may express interest in something the
  profile lists under **Non-goals**.
- **Driver gap?** When no driver can carry a good goal line for the role, do not improvise one.
  The strategy step flags the gap, the orchestrator offers a refinement round, and if the user
  declines, the goal sentence is omitted and the gap logged in `MISSING_INFORMATION.md`.

Acceptable:
- Driver: "I want to build things other people rely on every day" → "Goal: build reliable
  data platforms that operations teams depend on daily" ✅ (free wording, posting keywords)

Unacceptable:
- Profile has no driver about the employer's domain → "Goal: help advance sustainable mobility
  for everyone" ❌ (lifted from the company's mission statement)

**Severity:** an unbacked motivational statement is a **High-priority weakness**. It does not
trigger the automatic fail reserved for fabricated facts, but it must be listed in `feedback`
with the driver it should be rebuilt from — or the recommendation to cut it.

## Severity & Gate Consequence

- A **confirmed ungrounded claim** (Mode A) is a **High-priority weakness** (resume
  integrity + interview risk) AND forces an automatic **fail**: set `pass: false`
  regardless of rating/ATS, and cap `rating` at **4.0**. A single fabricated number can
  end an interview ("walk me through that 60%") and is disqualifying — it can never be
  a "strong candidate" verdict.
- A **suspected unverifiable claim** (Mode B) is a **High-priority weakness** with a
  recommendation to confirm against the profile. It does not auto-fail on suspicion
  alone, but every suspect claim MUST be listed in `feedback`.
