# Experience Bullet Standards

This is the **single source of truth** for how many bullets each role gets and how
they are selected. Everything that touches bullet count cites this file rather than
restating the numbers, so they cannot drift:

- `resume-content-generation` — writes bullets to this budget.
- `resume-content-review` / `swiss-tech-resume-reviewer` — grades against it (Format & Presentation).
- `resume-design-review` / the PDF style guides (`docs/style-guide/pdf/CV_STYLE_GUIDE.md`,
  `VISUAL_DESIGN_REFERENCE.md`) — defer to it for counts; they keep only visual concerns.

If the budget changes, change it **here**. (Historical note: the PDF style guide previously
said "3-5 per role, *more for current role*". The *intent* — current role most prominent —
is correct and preserved here. What was missing was a ceiling, which let the current role
balloon to 9 bullets. The fix is a hard cap of 5, not removing the prominence.)

## Core principle

Resumes are won by signal, not volume. A wall of bullets buries the achievements that
actually land the interview, and Swiss reviewers read density as a lack of judgment.
Fewer, sharper, role-aligned bullets beat a comprehensive dump every time.

## Bullet Budget (per role) — HARD LIMIT

| Role | Bullets | Selection rule |
|------|---------|----------------|
| Current / most recent | **3–5, typically 4–5** | The current role carries the resume — give it the fullest treatment. Hard cap at 5. |
| Prior relevant roles | 2–3 | The strongest, most role-aligned highlights only. |
| Older / less relevant roles | 1–2 | A single line is acceptable; drop the role entirely if it adds nothing. |

**The current role should be the most prominent** — it earns the top of the range while
older roles taper off, producing a clear 5 → 3 → 2 gradient down the page. That prominence
is deliberate and good; the only firm rule is the **hard cap of 5**. Six or more bullets on
any role (the original "9 bullets" failure) is overkill — select and combine instead.

The upper bound is a **ceiling, not a quota**. Four excellent bullets beat five mediocre
ones; never pad a role just to reach 5.

## How to get down to budget

1. **Score every candidate bullet** against the target role's priorities (from the
   strategy brief). A bullet that doesn't reinforce the positioning is cut, not kept
   "just in case".
2. **Combine related achievements** into one denser bullet rather than listing them
   separately — e.g. fold "built monitoring" + "prevented incidents" into one
   cause-and-effect line. Combining is preferred over cutting when two items tell one
   story.
3. **Keep only what stands out** — measurable impact, scale, rare skill combinations, or
   direct alignment with the target role. When two bullets compete for one slot, keep the
   one with the stronger quantified outcome.
4. **Never pad to fill the budget.** If a role has only two strong bullets, ship two.

A current role with many strong achievements is a *selection* problem, not a license to
exceed the budget — pick the best and combine the rest.

## What the reviewer flags

The content reviewer treats budget violations as a **Format & Presentation** weakness and
should call them out specifically:

- Any role exceeding its ceiling (most commonly the current role at 6+ bullets) → flag as
  High priority; recommend the specific bullets to merge or cut.
- Related achievements listed as separate bullets that should be combined → flag with the
  suggested merge.
- Padding: weak, generic, or non-quantified bullets that exist only to fill space → flag
  for removal.

A resume that respects the budget but still reads thin on impact is a *content* problem
(quantification, see `ats_optimization.md`), not a budget problem — keep the two distinct.
