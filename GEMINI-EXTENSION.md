# Swiss Tech Resume Builder (Gemini CLI extension)

This extension adds the Swiss Tech Resume Builder skills: an end-to-end pipeline that builds
ATS-optimized resumes for the Swiss tech job market.

- New users: ask "How do I use the Swiss tech resume builder?" — this activates the
  `swiss-tech-resume-setup` skill, which checks prerequisites (XeLaTeX, Python 3) and scaffolds
  `docs/PERSONAL_PROFILE.md` and `resumes/` in the current project.
- To build a resume, ask e.g. "Build me a Swiss-market resume for Senior ML Engineer roles"
  (orchestrated by the `swiss-tech-resume-builder` skill).
- Bundled reference files (`docs/…`, `resumes/templates/…`) live in this extension's install
  directory, not in the user's project. User data (profile, generated resumes) is written to the
  current project only.
