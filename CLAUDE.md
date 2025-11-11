# Claude.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Goal

The goal is to polish my CV and make it ready to land my next awesome position. Target market is Switzerland. I am currently working as a Senior Data Scientist (at least by official title) with a gross salary of 122 kCHF. I aim for a 15% salary increase.

My next job should be more on the ML Ops / AI Software Architecture side of things. I am reluctant to take on a manager position, but it might be an option if the position is a fit. Something along the job titles of Engineering Manager, ML Engineer, ML Ops.
Mid-term I would like to transition out of the stressful daily hustle of keeping up with current developments and become more of a mentor or coach, enabling teams in my areas of expertise.

For now, we are working on a generic Resume that will work for the target roles in the target market. Later on, we will work on specific job postings to tune the resume to fit perfectly.


## Repository Overview

This is a LaTeX-based CV/Resume repository containing bilingual curriculum vitae documents in English and German for Florian Hochstrasser.

## File Structure

### Legacy Files (maintained for compatibility)
- `CV_en_Florian_Hochstrasser.tex` - Current English version of the CV
- `CV_de_Florian_Hochstrasser.tex` - German version of the CV (to be updated)
- `resumes_compiled/yyyy_mm_dd_hh_mm_CV_*.pdf` - Historical compiled PDF versions

### New Data-Driven System
- `docs/PERSONAL_PROFILE.md` - **Primary data source** - comprehensive personal/professional information
- `docs/` - Supporting documents, research, and analysis results
- `resumes/templates/` - Single generic LaTeX template with comprehensive customization guidance
  - `CV_template.tex` - Universal template for all role types (ML Engineer, MLOps, Manager, etc.)
- `resumes/customized/` - Job-specific customized resume variations
  - `{id}/resume_content.md` - **Content source** (YAML + Markdown)
  - `{id}/{id}.tex` - LaTeX source files
  - `{id}/{id}.pdf` - Compiled PDF resumes (temporarily, before moving to compiled/)
  - `{id}/web/` - React web build output (static HTML/JS/CSS)
  - `{id}/application_strategy.md` - Application strategy documents
- `resumes/compiled/` - Final timestamped PDF outputs (YYYY_MM_DD_HH_MM_company_role_CV_lang.pdf)
- `resumes/web-builder/` - React project source for web resume generation
- `resources/CV_Portrait_*.jpg` - Portrait photos used in the CV

## Build Commands

### Legacy System
The original LaTeX files are configured to use XeLaTeX:
```bash
# Current English version
xelatex CV_en_Florian_Hochstrasser.tex

# German version (to be updated with new system)
xelatex CV_de_Florian_Hochstrasser.tex
```

### New Template System
The generic template should be copied and customized for each job application:
```bash
# Create customized version for specific job
cp resumes/templates/CV_template.tex resumes/customized/YYYY_MM_DD_company_role.tex

# Edit customized version by replacing [PLACEHOLDER] values and tailoring sections
# (Reference CV_template.tex inline comments for guidance)

# Compile from customized directory
cd resumes/customized/
xelatex YYYY_MM_DD_company_role.tex

# Move compiled PDF to organized storage with timestamp
mv YYYY_MM_DD_company_role.pdf ../compiled/YYYY_MM_DD_HH_MM_company_role_CV_en.pdf
```

### Clean-up
After compilation, always clean up temporary files: `*.aux`, `*.log`, `*.out`, `*.fls`, `*.fdb_latexmk`, `*.gz`, `*.toc`, `*.bbl`, `*.blg`

Note: All templates use the `moderncv` LaTeX class and require XeLaTeX or LuaLaTeX for proper compilation.

### Web Resume Build
The React web builder generates static sites from resume_content.md:
```bash
# Build is handled by react-resume-expert agent
# Manual build process:

# 1. Copy content file to web builder
cp resumes/customized/{id}/resume_content.md resumes/web-builder/public/

# 2. Build React app
cd resumes/web-builder
npm run build

# 3. Copy output to customized directory
mkdir -p ../customized/{id}/web
cp -r dist/* ../customized/{id}/web/

# 4. Preview locally
npm run preview
# Open http://localhost:4173/CV/

# 5. Commit and let GitHub Actions deploy
git add resumes/customized/{id}/web/
git commit -m "feat: add web resume for {company}"
git push
```

After push, GitHub Actions automatically deploys to:
`https://datarian.github.io/CV/cv/{semantic-id}`

## LaTeX Dependencies

The CV uses:
- `moderncv` document class with **`fancy` style (REQUIRED)**
- Custom fonts via `fontspec` (Roboto, Lato, Roboto Slab)
- `moderntimeline` package for timeline visualizations
- `fontawesome` for icons
- Multiple language support via `babel`

### CRITICAL: ModernCV Style Requirement
**ALWAYS use `\moderncvstyle{fancy}` for all CVs in this repository.**

- The `fancy` style is MANDATORY because it properly handles multi-page documents
- The `casual` style has a fundamental bug causing "Unbalanced output routine" errors on multi-page CVs
- NEVER use `casual`, `classic`, `banking`, or `oldstyle` styles
- All templates have been updated to use `fancy` style
- See `docs/MODERNCV_DOC.md` for detailed technical documentation

## Development Notes

- The `.gitignore` excludes LaTeX build artifacts (`*.log`, `*.aux`, `*.out`, `*.gz`)
- Both CV versions use similar styling with custom color definitions
- Primary data source is `docs/PERSONAL_PROFILE.md` - comprehensive profile with all professional information
- If information is missing, first check `MISSING_INFORMATION.md`, then ask the user
- All resume generation should reference the PERSONAL_PROFILE.md for consistency and completeness

## Web Resources

Statistical Salary Calculator: https://www.salarium.bfs.admin.ch/

### Job Search Portals
See comprehensive list in `docs/JOB_AGENT_RESEARCH.md` (maintained by swiss-tech-job-market-analyst agent)

## Agent Invocation

### Standard Agent Commands
Use the Task tool to invoke agents. All agents follow consistent patterns:
- **Primary coordination**: career-planning-coach manages workflow and user interactions
- **Proactive invocation**: Agents should be invoked automatically when their expertise is needed
- **Agent sequence**: Follow the established workflow phases (Market Analysis → Resume Strategy → Template Development → Quality Assurance)

### When to Invoke Agents
- **swiss-tech-job-market-analyst**: When analyzing job requirements, salary research, or market positioning
- **swiss-resume-expert**: When creating or optimizing resume content and structure  
- **latex-moderncv-expert**: When working with LaTeX templates or compilation issues
- **design-reviewer**: After any layout/design changes to ensure visual quality
- **swiss-tech-resume-reviewer**: For final content review before submission

## File Management

### LaTeX Build Artifacts
Always clean up after compilation:
```bash
rm -f *.aux *.log *.out *.fls *.fdb_latexmk *.gz *.toc *.bbl *.blg
```

### Agent-Generated Files
- **Temporary files**: Remove agent-generated files from `.claude/` after integration into `docs/`
- **Research files**: Consolidate all market research into `docs/JOB_AGENT_RESEARCH.md`
- **Analysis files**: Merge insights into existing documentation rather than creating new files

### Directory Organization
- **Keep clean**: Remove duplicate or outdated files promptly
- **Naming convention**: Use timestamps for compiled PDFs: `YYYY_MM_DD_HH_MM_role_CV_lang.pdf`
- **Version control**: Track significant template changes and customizations


## Workflow

### Data-Driven Resume Generation System

The CV repository now uses a flexible, data-driven approach with the following structure:

#### Core Data Source
- **docs/PERSONAL_PROFILE.md**: Comprehensive personal and professional information database
- Single source of truth for all resume variations
- Structured sections covering experience, skills, achievements, projects

#### Template System
- **resumes/templates/**: Single generic LaTeX template pulling data from PERSONAL_PROFILE.md
  - `CV_template.tex`: Universal template with comprehensive customization guidance for all role types (ML Engineer, MLOps, Manager, etc.)
- **resumes/customized/**: Job-specific customized resumes
- **resumes/compiled/**: Timestamped PDF outputs

#### Generation Workflow
1. **Template Copying**: Copy the generic template (`CV_template.tex`) to `customized/` with appropriate naming
2. **Customization**: Tailor the template for specific job by replacing placeholders and adjusting section emphasis
3. **Compilation**: Generate PDF with timestamp in `compiled/` folder
4. **Version Control**: Track customizations and compiled outputs

### Agent Coordination

#### Primary Coordination Agent
- **career-planning-coach**: YOU MUST coordinate with specialized agents and manage user interactions

#### Specialized Agent Workflow

**Market Analysis Phase**:
1. **swiss-tech-job-market-analyst**: Market research, salary analysis, skills gap identification
   - Input: Target role, company, industry requirements
   - Output: Market insights, required technologies, salary expectations

**Resume Strategy Phase**:
2. **swiss-resume-expert**: Resume strategy and content planning
   - Input: Market analysis, PERSONAL_PROFILE.md data
   - Output: Content strategy, section emphasis, keyword recommendations

**Content Generation Phase**:
3. **resume-content-generator**: Structured content creation (NEW)
   - Input: PERSONAL_PROFILE.md, strategy from swiss-resume-expert
   - Output: `resume_content.md` (YAML frontmatter + Markdown)
   - Receives: Feedback from swiss-tech-resume-reviewer

**Template Development Phase**:
4a. **latex-moderncv-expert**: LaTeX PDF rendering
   - Input: `resume_content.md`
   - Output: `.tex` file, compiled PDF
   - Role: Implements changes based on reviewer feedback

4b. **react-resume-expert**: React web rendering (NEW)
   - Input: `resume_content.md`
   - Output: Static web build in `web/` directory
   - Role: Implements changes based on reviewer feedback

**Quality Assurance Phase (ITERATIVE)**:
5. **swiss-tech-resume-reviewer**: Content review and optimization (FIRST)
   - Input: `resume_content.md` or compiled outputs
   - Output: Content rating, ATS optimization, keyword recommendations
   - **CRITICAL**: If changes needed, invokes **resume-content-generator** for content fixes or format experts for presentation fixes
   - Iterates until content quality meets standards

6. **design-reviewer**: Visual design and layout optimization (SECOND)
   - Input: Content-approved outputs (PDF and/or web)
   - Output: Design recommendations, formatting improvements
   - **CRITICAL**: If changes needed, invokes **latex-moderncv-expert** (PDF) or **react-resume-expert** (web)
   - Iterates until design quality is satisfactory

#### Iterative Feedback Loop
**IMPORTANT**: Content-first workflow with format rendering:

```
┌─────────────────────────────────────────────────────────────┐
│                  career-planning-coach                       │
│            (Orchestrator & Final Quality Gate)              │
└─────┬───────────────────────────────────────────────────────┘
      │
      ├─► Format Selection: PDF | Web | Both
      │
      ├─► swiss-tech-job-market-analyst (market research)
      ├─► swiss-resume-expert (content strategy)
      │
      ▼
┌─────────────────────────────────────────────────────────────┐
│             resume-content-generator (NEW)                   │
│         Creates resume_content.md (YAML + Markdown)         │
└─────┬───────────────────────────────────────────────────────┘
      │
      ├─► Format Rendering (based on selection):
      │   ├─► latex-moderncv-expert → PDF
      │   └─► react-resume-expert → web/
      │
      ▼
┌─────────────────────────────────────────────────────────────┐
│           swiss-tech-resume-reviewer (content QA)           │
│        Reviews resume_content.md for ATS & keywords         │
└─────┬───────────────────────────────────────────────────────┘
      │ If changes needed → resume-content-generator
      │
      ▼
┌─────────────────────────────────────────────────────────────┐
│             design-reviewer (visual QA)                     │
│      Reviews PDF and/or web output for design quality       │
└─────┬───────────────────────────────────────────────────────┘
      │ If PDF issues → latex-moderncv-expert
      │ If web issues → react-resume-expert
      │
      ▼
┌─────────────────────────────────────────────────────────────┐
│         career-planning-coach (final holistic review)       │
│      Validates career narrative & strategic positioning     │
└─────┬───────────────────────────────────────────────────────┘
      │ If approved → Generate application_strategy.md
      │ If issues → Re-engage specialist agents (max 1 cycle)
      │
      ▼
    DONE → Shareable URLs:
    - PDF: resumes/compiled/{timestamp}_{id}_CV_en.pdf
    - Web: https://datarian.github.io/CV/cv/{semantic-id}
```

**Iteration Process**:
1. **resume-content-generator** creates `resume_content.md` from PERSONAL_PROFILE.md
2. **Format rendering** (based on user selection):
   - PDF: **latex-moderncv-expert** → compile with xelatex
   - Web: **react-resume-expert** → npm run build
3. **swiss-tech-resume-reviewer** reviews `resume_content.md` FIRST
   - If content issues: Feedback → **resume-content-generator** updates
   - If satisfied: Proceed to step 4
4. **design-reviewer** reviews rendered outputs SECOND
   - If PDF issues: Feedback → **latex-moderncv-expert** re-renders
   - If web issues: Feedback → **react-resume-expert** re-builds
   - If satisfied: Proceed to step 5
5. **career-planning-coach** performs final holistic review
   - Reviews complete outputs for career narrative and strategic positioning
   - If issues found: Identifies which specialist agents need re-engagement
   - Can trigger full iteration cycle if needed (max 1)
   - If satisfied: Approved → Generate application_strategy.md
6. Repeat cycle until all reviewers including career-planning-coach approve

**Final Quality Gate - career-planning-coach**:
The career-planning-coach performs a final holistic review to ensure:
- Career narrative is cohesive and compelling
- Strategic positioning aligns with target roles and market
- All elements work together to tell a unified story
- Resume achieves the user's career goals (15% salary increase, ML Ops/AI Architecture roles)
- Swiss market fit is optimal

If career-planning-coach identifies issues:
- Determines which specialist agents need to be re-engaged
- Can invoke any combination of: swiss-resume-expert, design-reviewer, swiss-tech-resume-reviewer
- Full iteration cycle can be triggered for comprehensive improvements
- Maximum 1 full re-iteration to maintain efficiency

**Agent Communication Rules**:
- Reviewers MUST provide specific, actionable feedback
- Reviewers MUST invoke latex-moderncv-expert via Task tool for implementation
- latex-moderncv-expert MUST compile after each change and pass back to reviewers
- Maximum 3 iterations per reviewer to prevent endless loops
- career-planning-coach has authority to trigger ONE additional full iteration cycle
- If consensus cannot be reached after full process, escalate to user

#### Workflow Integration
- **Data-First Approach**: All agents reference PERSONAL_PROFILE.md for consistent information
- **Template-Based Efficiency**: Rapid customization using proven templates
- **Quality Pipeline**: Iterative review process ensuring high standards
- **Version Control**: Clear tracking of all variations and iterations
- **Feedback Loop**: Reviewers work with implementer until quality standards met

### New Workflow Steps
1. **Profile Maintenance**: Keep PERSONAL_PROFILE.md updated with new achievements
2. **Template Evolution**: Improve templates based on market feedback and success rates
3. **Customization Tracking**: Document what works for different company types
4. **Performance Analytics**: Track application success rates by template type

### Iterative Improvement Process
- Work iteratively with user feedback
- Present results and get approval before major changes
- Create PR to merge approved changes
- Compile final PDFs with timestamps in appropriate folders

### Application Strategy Documents

When the **career-planning-coach** approves a finalized resume, it MUST automatically generate a comprehensive application strategy document alongside the resume.

**Purpose**: Provide actionable guidance for the job application process, including cover letter strategies, salary negotiation tactics, interview preparation, and strategic assessment.

**Naming Convention**:
- Format: `YYYY_MM_DD_[company]_[role_short]_application_strategy.md`
- Example: `2025_10_14_frontify_senior_llm_engineer_application_strategy.md`
- Location: `/Users/flo/Development/CV/resumes/customized/` (same directory as resume)

**Required Content Sections**:
1. **Executive Summary** - Fit assessment and key selling points
2. **Position Overview** - Company details and role requirements
3. **Cover Letter Strategy** - Opening hook, key points, skills gap mitigation
4. **Salary Negotiation Strategy** - Target range, justification, walk-away point
5. **Interview Preparation** - Technical topics, STAR stories, questions to ask
6. **Application Timeline** - Optimal submission window, follow-up strategy
7. **Success Metrics** - Positive indicators and warning signs
8. **Strategic Assessment** - Career alignment, risks/mitigations, long-term positioning
9. **Key Talking Points** - Elevator pitch, top 3 differentiators
10. **Final Recommendations** - Apply decision, priority level, next actions

**Agent Responsibility**: The career-planning-coach agent has detailed templates and implementation instructions in its agent definition (`/.claude/agents/career-planning-coach.md`).

**File Pairing**: Each resume should have a corresponding application strategy document:
```
resumes/customized/
├── 2025_10_14_frontify_senior_llm_engineer.tex
├── 2025_10_14_frontify_senior_llm_engineer.pdf
└── 2025_10_14_frontify_senior_llm_engineer_application_strategy.md
```

**Usage**: Users reference the application strategy document when:
- Drafting cover letters
- Preparing for interviews
- Negotiating salary offers
- Evaluating job fit and career alignment 

## Key Constraints
- **ModernCV Style**: ALWAYS use `\moderncvstyle{fancy}` - this is MANDATORY for multi-page support
- **cventry Format**: All `\cventry` commands must have exactly 6 arguments: `\cventry{dates}{title}{company}{location}{}{description}`
- **Job titles**: Never change job titles of past or current employments
- **Compilation**: NEVER use pdflatex. Always compile with xelatex
- **Data source**: Always reference docs/PERSONAL_PROFILE.md as the single source of truth
- **File organization**: Templates in resumes/templates/, customizations in resumes/customized/, compiled PDFs in resumes/compiled/
- **Legacy compatibility**: Maintain historical PDFs in resumes_compiled/ for reference
- **Clean up**: Clean up any temporary files and experiments when you are done compiling a new version of the CV
- **Page count**: Do not feel you need to fit the whole CV on 1 page. 2-3 page CVs are preferred with room for comprehensive background
- **GitHub Repository Link**: ALWAYS include a link to the GitHub repository at the end of every generated resume with the text: "Curious how this resume was built? Explore the system at github.com/datarian/CV"