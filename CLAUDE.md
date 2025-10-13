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
- `resumes/templates/` - LaTeX templates for different role types (ML Engineer, MLOps, Manager)
- `resumes/customized/` - Job-specific customized resume variations
- `resumes/compiled/` - Final timestamped PDF outputs
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
Templates should be compiled from the appropriate directory:
```bash
# Compile template directly (for testing)
cd resumes/templates/
xelatex CV_ml_engineer_template.tex

# Create customized version for specific job
cp resumes/templates/CV_ml_engineer_template.tex resumes/customized/2025_01_12_company_role.tex
# Edit customized version as needed
cd resumes/customized/
xelatex 2025_01_12_company_role.tex

# Move compiled PDF to organized storage
mv 2025_01_12_company_role.pdf ../compiled/2025_01_12_14_30_company_role_CV_en.pdf
```

### Clean-up
After compilation, always clean up temporary files: `*.aux`, `*.log`, `*.out`, `*.fls`, `*.fdb_latexmk`, `*.gz`, `*.toc`, `*.bbl`, `*.blg`

Note: All templates use the `moderncv` LaTeX class and require XeLaTeX or LuaLaTeX for proper compilation.

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
- **latex-design-reviewer**: After any layout/design changes to ensure visual quality
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
- **resumes/templates/**: LaTeX templates pulling data from PERSONAL_PROFILE.md
  - `CV_ml_engineer_template.tex`: ML Engineer focus
  - `CV_mlops_specialist_template.tex`: MLOps/Platform Engineer focus  
  - `CV_engineering_manager_template.tex`: Leadership/Management focus
- **resumes/customized/**: Job-specific customized resumes
- **resumes/compiled/**: Timestamped PDF outputs

#### Generation Workflow
1. **Template Selection**: Choose appropriate base template for role type
2. **Customization**: Copy template to `customized/` and tailor for specific job
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

**Template Development Phase**:
3. **latex-moderncv-expert**: LaTeX template creation and customization
   - Input: Content strategy, specific job requirements
   - Output: Customized .tex file ready for compilation

**Quality Assurance Phase**:
4. **latex-design-reviewer**: Visual design and layout optimization
   - Input: Compiled PDF output
   - Output: Design recommendations, formatting improvements

5. **swiss-tech-resume-reviewer**: Final content review and optimization
   - Input: Completed resume, target role requirements
   - Output: Content rating, ATS optimization, final recommendations

#### Workflow Integration
- **Data-First Approach**: All agents reference PERSONAL_PROFILE.md for consistent information
- **Template-Based Efficiency**: Rapid customization using proven templates
- **Quality Pipeline**: Systematic review process ensuring high standards
- **Version Control**: Clear tracking of all variations and iterations

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

## Key Constraints
- **Job titles**: Never change job titles of past or current employments
- **Compilation**: NEVER use pdflatex. Always compile with xelatex
- **Data source**: Always reference docs/PERSONAL_PROFILE.md as the single source of truth
- **File organization**: Templates in resumes/templates/, customizations in resumes/customized/, compiled PDFs in resumes/compiled/
- **Legacy compatibility**: Maintain historical PDFs in resumes_compiled/ for reference
- clean up any temporary files and experiments when you are done compiling a new version of the CV
- Please do not feel you need to fit the whole CV on 1 page. I prefer a 2-page CV that leaves room for more background