# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a LaTeX-based CV/Resume repository containing bilingual curriculum vitae documents in English and German for Florian Hochstrasser.

## File Structure

- `CV_en_Florian_Hochstrasser.tex` - English version of the CV
- `CV_de_Florian_Hochstrasser.tex` - German version of the CV
- `CV_*.pdf` - Compiled PDF versions
- `CV_Portrait_*.jpg` - Portrait photos used in the CV

## Build Commands

The LaTeX files are configured to use XeLaTeX as indicated by the directive `% !TEX TS-program = xlualatex` at the top of the `.tex` files.

To compile the CVs:
```bash
# English version
xelatex CV_en_Florian_Hochstrasser.tex

# German version  
xelatex CV_de_Florian_Hochstrasser.tex
```

Note: The documents use the `moderncv` LaTeX class with custom fonts (Roboto, Lato, Roboto Slab) and require XeLaTeX or LuaLaTeX for proper compilation.

## LaTeX Dependencies

The CV uses:
- `moderncv` document class
- Custom fonts via `fontspec` (Roboto, Lato, Roboto Slab)
- `moderntimeline` package for timeline visualizations
- `fontawesome` for icons
- Multiple language support via `babel`

## Development Notes

- The `.gitignore` excludes LaTeX build artifacts (`*.log`, `*.aux`, `*.out`, `*.gz`)
- Both CV versions use similar styling with custom color definitions
- Timeline functionality spans 2001-2019 as configured in the document

## Web Resources

Use the Playwright MCP to access these webpages


Statistical Salary Calculator: https://www.salarium.bfs.admin.ch/

### Job Search Portals
- https://ch.indeed.com/
- https://www.jobscout24.ch/


## Workflow

### Available Agents

- Use the career-planning-coach to coordinate work with other specialized agents and to interact with the user if additional information is needed.
- Use the swiss-tech-resume-reviewer agent whenever the resume has been edited.
- Use the swiss-resume-expert agent to plan edits to the resume. When using this agent, vital input is available from the agent swiss-tech-job-market-analyst may 

### Execution

Work iteratively. Present results to the user and if approved, create a PR to merge changes in.

Whenever a new version is approved, compile the tex file into a pdf and timestamp it in the resumes_compiled/ folder


# Project Goal

The goal is to polish my CV and make it ready to land my next awesome position. Target market is Switzerland.

My next job should be more on the ML Ops / AI Software Architecture side of things. I am reluctant to take on a manager position, but it might be an option if the position is a fit. Something along the job titles of Engineering Manager, ML Engineer, ML Ops.

For now, we are working on a generic Resume that will work for the target roles in the target market. Later on, we will work on specific job postings to tune the resume to fit perfectly.
- if information is issing, first check MISSING_INFORMATION.md. If you can't find anything, ask the user