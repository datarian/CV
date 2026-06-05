---
name: swiss-tech-resume-builder
description: Create ATS-optimized resumes for Swiss technology positions using data-driven templates, market research, and iterative quality review. This skill should be used when creating or optimizing resumes for the Swiss tech job market, customizing resumes for specific Swiss job applications, troubleshooting LaTeX moderncv compilation issues, or generating comprehensive application strategies including cover letter guidance, salary negotiation tactics, and interview preparation. Specialized for Swiss market conventions (work permits, language proficiency, salary expectations), LaTeX moderncv technical implementation, and ML/AI/Engineering roles.
---

# Swiss Tech Resume Builder

## Overview

This skill provides a comprehensive system for creating professional, ATS-optimized resumes specifically tailored for the Swiss technology job market. It combines Swiss market expertise with technical LaTeX mastery to produce resumes that pass both automated screening systems and impress human reviewers.

**Core Capabilities:**
- **Swiss Market Specialization**: Resume conventions, cultural expectations, salary norms, language requirements
- **LaTeX moderncv Expertise**: Technical implementation, troubleshooting, multi-page support
- **Data-Driven Approach**: Structured personal profiles as single source of truth
- **Content-First, Dual-Format Rendering**: A format-agnostic `resume_content.md` (YAML + Markdown) is reviewed and approved *before* rendering, then rendered to **PDF** (latex-moderncv-expert) and/or an interactive **web** resume (react-resume-expert)
- **Multi-Agent Workflow**: Market analysis → strategy → content generation → render → quality assurance
- **Complete Application Support**: Resumes + application strategy documents (cover letters, salary negotiation, interview prep)

> **Note — content-first pipeline:** The phases below describe the original PDF-direct flow (edit `.tex` from the profile). The current preferred pipeline is content-first: `resume-content-generator` produces `resume_content.md`, `swiss-tech-resume-reviewer` approves it (Pattern A, pre-render), then the user selects PDF, web, or both. Visual QA for both formats is owned by the unified `design-reviewer` agent. See the repository `CLAUDE.md` workflow and the agent definitions in `.claude/agents/` for the authoritative orchestration.

**Target Users:**
- Job seekers targeting Swiss tech positions (ML/AI, Software Engineering, DevOps, Data Science)
- Career changers entering the Swiss market
- International candidates needing Swiss market adaptation
- Professionals optimizing resumes for specific Swiss companies

## When to Use This Skill

Invoke this skill when:
- ✅ **Creating resumes** for Swiss technology positions
- ✅ **Customizing resumes** for specific job applications in Switzerland
- ✅ **Researching** Swiss job market requirements, salary expectations, or skill demands
- ✅ **Troubleshooting** LaTeX moderncv compilation errors
- ✅ **Generating application strategies** (cover letters, interview prep, salary negotiation)
- ✅ **Converting** international resumes to Swiss standards
- ✅ **Optimizing** existing resumes for ATS systems

Do NOT use for:
- ❌ Generic international resumes (lacks Swiss-specific expertise)
- ❌ Non-technical fields (optimized for tech sector)
- ❌ Countries other than Switzerland (market conventions differ)

## Complete Workflow

This skill follows a 5-phase workflow that can be executed end-to-end or selectively based on your needs.

### Phase 1: Personal Profile Setup

**Purpose**: Establish a comprehensive data source for all resume variations.

**Steps**:

1. **Create Personal Profile** from template:
   ```bash
   # If not exists, copy template
   cp docs/PERSONAL_PROFILE.example.md docs/PERSONAL_PROFILE.md
   ```

2. **Review schema** in `references/personal_profile_schema.md`:
   - Understand required sections
   - Learn quantification strategies
   - See examples of strong content

3. **Fill in comprehensive information**:
   - Basic Information (name, contact, work authorization)
   - Professional Summary (2-3 sentence positioning)
   - Professional Experience (with quantified achievements)
   - Education & Certifications
   - Technical Skills (organized by category)
   - Languages (using CEFR levels: A1-C2)
   - Publications, Open Source, Awards (if applicable)

**Key Principle**: Maintain ALL experience in Personal Profile, then pull relevant sections for each specific job application.

**Reference Materials**:
- `references/personal_profile_schema.md` - Complete data structure and examples
- `references/swiss_market_conventions.md` - What Swiss employers expect

### Phase 2: Market Analysis

**Purpose**: Research target role requirements, salary expectations, and competitive positioning.

**Steps**:

1. **Identify target role** specifics:
   - Job title (e.g., "Senior ML Engineer", "MLOps Lead")
   - Company (if specific) and industry
   - Location (Zurich, Geneva, Basel, etc.)
   - Key requirements from job posting

2. **Conduct market research** using references:
   - `references/swiss_market_conventions.md`:
     - Salary expectations by role and location
     - Industry-specific requirements (fintech vs pharma vs consulting)
     - Regional variations (German-Swiss vs French-Swiss)
   - Web search for current market data:
     - Salarium.ch for salary benchmarking
     - jobs.ch, jobup.ch for similar role listings
     - LinkedIn Switzerland for company intel

3. **Identify required keywords** from job posting:
   - Technical skills (languages, frameworks, tools)
   - Soft skills (leadership, communication)
   - Certifications (AWS, GCP, Kubernetes)
   - Swiss-specific requirements (work permit, languages, location)

4. **Assess skills gaps**:
   - What you have vs what they need
   - Addressable gaps (learn quickly) vs deal-breakers
   - How to position gaps in application

**Output**: Clear understanding of target role, market salary range, required keywords, and competitive positioning strategy.

**Tool Support**:
- Use `swiss-tech-job-market-analyst` agent (if available) for detailed market analysis
- Use WebSearch for current salary data and company research

### Phase 3: Resume Strategy

**Purpose**: Plan content strategy, section emphasis, and keyword optimization for specific target role.

**Steps**:

1. **Determine resume focus** based on target role:
   - **IC Technical Role**: Emphasize technical depth, projects, open-source
   - **Lead/Principal Role**: Highlight architecture decisions, mentorship, technical leadership
   - **Manager Role**: Focus on team leadership, cross-functional collaboration, business impact
   - **MLOps/Platform**: Infrastructure work, scalability, deployment pipelines

2. **Select relevant experience** from Personal Profile:
   - Choose 3-5 most relevant roles (max 2 pages)
   - Prioritize recent experience (last 5-7 years)
   - Include earlier experience only if highly relevant

3. **Tailor achievement statements**:
   - Use keywords from job posting naturally
   - Quantify every achievement with metrics
   - Demonstrate Swiss values (precision, reliability, quality)
   - Example transformations:
     - Generic: "Improved system performance"
     - Swiss-optimized: "Reduced API latency by 47% from 850ms to 450ms, improving response time for 2.3M daily users across Switzerland"

4. **Plan section order** and emphasis:
   - Standard: Contact → Summary → Experience → Education → Skills → Languages
   - Adjust based on strengths:
     - Strong education (ETH, EPFL): Move education higher
     - Career changer: Emphasize skills and recent projects
     - International: Highlight multilingual capabilities early

5. **Ensure Swiss compliance**:
   - Work permit status clear (if non-Swiss/EU)
   - Language proficiency stated with CEFR levels
   - Photo prepared (professional headshot)
   - Contact info in Swiss format (+41 XX XXX XX XX)

**Output**: Content strategy document outlining sections, keywords, achievement emphases, and ATS optimization approach.

**Reference Materials**:
- `references/swiss_market_conventions.md` - Swiss-specific requirements
- `references/ats_optimization.md` - Keyword placement strategies

**Tool Support**:
- Use `swiss-resume-expert` agent (if available) for expert content planning

### Phase 4: LaTeX Template Implementation

**Purpose**: Create customized LaTeX resume using moderncv and compile to PDF.

**Quick Start**:

> **Script paths:** The helper scripts live with the skill at `.claude/skills/swiss-tech-resume-builder/scripts/`, but they operate on repo-relative paths (`resumes/...`). Always run them **from the repository root**, referencing the script by its absolute path. For convenience: `SCRIPTS=.claude/skills/swiss-tech-resume-builder/scripts`.

Initialize new application (run from the repository root):
```bash
SCRIPTS=.claude/skills/swiss-tech-resume-builder/scripts
python3 "$SCRIPTS/init_application.py" --company google --role ml_engineer
```

This creates:
- `resumes/customized/YYYY_MM_DD_google_ml_engineer.tex`
- `resumes/customized/YYYY_MM_DD_google_ml_engineer_application_strategy.md`

**Detailed Steps**:

1. **Copy template** (if not using init script):
   ```bash
   cp resumes/templates/CV_template.tex resumes/customized/YYYY_MM_DD_company_role.tex
   ```

2. **Customize LaTeX document**:
   - **Replace [PLACEHOLDER] values**:
     - Personal information (name, email, phone, photo)
     - Professional summary
     - Experience entries using `\cventry{dates}{title}{company}{location}{}{description}`
     - Skills using `\cvitem{Category}{List}`
     - Languages using `\cvlanguage{Language}{Level}{Context}`

   - **Follow style guide** (`docs/style-guide/pdf/CV_STYLE_GUIDE.md`):
     - Typography: Font sizes, weights, hierarchy
     - Colors: #39a7d0 (accent), #4D4D4D (secondary text)
     - Layout: scale=0.88, hintscolumnwidth=3.5cm
     - Spacing: Consistent throughout

   - **Use code snippets** (`docs/style-guide/pdf/LATEX_CODE_SNIPPETS.md`):
     - Complete boilerplate
     - Professional summary variations
     - Experience entry templates
     - Section templates

3. **Validate before compilation** (from the repository root):
   ```bash
   python3 "$SCRIPTS/validate_latex.py" resumes/customized/YYYY_MM_DD_company_role.tex
   ```

   Checks:
   - `\moderncvstyle{fancy}` is set (REQUIRED for multi-page)
   - All `\cventry` have exactly 6 arguments
   - No unreplaced [PLACEHOLDER] values
   - Required packages declared
   - GitHub repository link included

4. **Compile to PDF** (from the repository root):
   ```bash
   bash "$SCRIPTS/compile_resume.sh" resumes/customized/YYYY_MM_DD_company_role.tex
   ```

   This runs:
   - XeLaTeX compilation (2 passes for references)
   - Automatic cleanup of build artifacts
   - PDF generation in same directory

5. **Review PDF**:
   - Open compiled PDF
   - Check for formatting issues
   - Verify all content displays correctly
   - Test text selectability (ATS compatibility)

**Critical LaTeX Rules** (see `references/moderncv_technical_guide.md`):

```latex
% ALWAYS use fancy style (multi-page support)
\moderncvstyle{fancy}

% cventry MUST have 6 arguments
\cventry{2020--2024}{Job Title}{Company}{City}{}
{Description of role and achievements.}
                                         ^^
                                    5th arg required even if empty

% Always include GitHub link
Footer: "Curious how this resume was built? Explore the system at github.com/datarian/CV"
```

**Common Errors & Fixes**:

| Error | Cause | Solution |
|-------|-------|----------|
| "Unbalanced output routine" | Using `casual` style | Change to `\moderncvstyle{fancy}` |
| "Argument of \cventry has extra }" | Missing 5th argument | Add empty {} as 5th arg |
| "Font not found" | Custom fonts not installed | Install fonts or use defaults |
| "Package fontspec error" | Using pdflatex | Use xelatex instead |

**Reference Materials**:
- `references/moderncv_technical_guide.md` - Complete LaTeX reference
- `docs/style-guide/` - Design specifications and code snippets (repo single source: `pdf/`, `web/`, shared `DESIGN_SYSTEM.md`)
- `resumes/templates/CV_template.tex` - Production-ready template

**Tool Support**:
- Use `latex-moderncv-expert` agent (if available) for complex LaTeX customization

### Phase 5: Quality Assurance & Iteration

**Purpose**: Review resume for content quality, ATS optimization, visual design, and Swiss market fit through iterative refinement.

**Two-Stage Review Process**:

**Stage 1: Content Review**

1. **Self-Review Checklist**:
   - [ ] All achievements quantified with specific metrics
   - [ ] Keywords from job posting incorporated naturally
   - [ ] Work permit status clearly stated (if applicable)
   - [ ] Languages listed with CEFR levels (A1-C2)
   - [ ] No generic statements ("responsible for", "worked on")
   - [ ] Demonstrates Swiss values (precision, reliability, quality)
   - [ ] Length appropriate (2 pages for mid-senior roles)
   - [ ] GitHub repository link in footer

2. **ATS Optimization Check** (`references/ats_optimization.md`):
   - [ ] 75%+ keyword match with job posting
   - [ ] Standard section headers ("Experience", "Education", not creative)
   - [ ] Single or left-prioritized two-column layout
   - [ ] PDF is text-selectable (copy-paste test)
   - [ ] No critical info in headers/footers
   - [ ] Standard fonts only (Arial, Calibri, Helvetica via LaTeX)

3. **Content Quality Questions**:
   - "Would I hire this person based on this resume?" (be honest)
   - "What are the top 3 strongest selling points?"
   - "What gaps or weaknesses stand out?"
   - "Does this resume justify CHF [target salary]?"

**Stage 2: Design Review**

1. **Visual Design Checklist** (`docs/style-guide/pdf/VISUAL_DESIGN_REFERENCE.md`):
   - [ ] Typography hierarchy clear and consistent
   - [ ] Color usage matches style guide (#39a7d0 accent)
   - [ ] White space balanced (not cramped)
   - [ ] Section headers stand out
   - [ ] Dates/locations consistently formatted
   - [ ] Professional photo properly sized and placed

2. **Swiss Market Fit**:
   - [ ] Photo professional and recent
   - [ ] Date format consistent (MM/YYYY or MM.YYYY)
   - [ ] Contact info complete (phone in +41 format)
   - [ ] Nationality and permit status visible
   - [ ] Appropriate formality level for industry

**Iteration Process**:

If issues found:
1. **Identify specific problems** (content vs design vs LaTeX)
2. **Make targeted fixes** in LaTeX source
3. **Re-validate**: `python3 "$SCRIPTS/validate_latex.py" file.tex`
4. **Re-compile**: `bash "$SCRIPTS/compile_resume.sh" file.tex`
5. **Re-review** updated PDF
6. **Repeat** until quality standards met

**Quality Gates**:
- **Minimum acceptable**: 7/10 rating
- **Target for senior roles**: 8/10 or higher
- **Must answer YES** to "Would I hire this person?"

**Tool Support**:
- Use `swiss-tech-resume-reviewer` agent (if available) for expert content review
- Use `design-reviewer` agent (if available) for visual design feedback (unified PDF + web reviewer)

### Phase 6: Application Strategy Generation

**Purpose**: Create comprehensive guidance for job application, including cover letter, salary negotiation, and interview preparation.

**Automatic Generation**:

When resume is finalized, generate application strategy document:

1. **Use template**:
   ```bash
   cp assets/application_strategy_template.md \
      resumes/customized/YYYY_MM_DD_company_role_application_strategy.md
   ```

2. **Customize sections**:
   - **Executive Summary**: Fit assessment (X/10), key strengths, concerns
   - **Position Overview**: Company details, requirements, your match score
   - **Cover Letter Strategy**: Opening hook, key points, skills gap mitigation
   - **Salary Negotiation**: Target range, justification, walk-away point
   - **Interview Preparation**: Technical topics, STAR stories, questions to ask
   - **Timeline**: Application timing, follow-up strategy
   - **Strategic Assessment**: Career alignment, risks/mitigations

3. **Gather inputs from previous phases**:
   - Market analysis (Phase 2): Salary data, company intel
   - Resume strategy (Phase 3): Keywords, positioning
   - Job posting: Requirements to address
   - Personal profile: STAR stories, achievements

**Key Sections to Complete**:

**Salary Negotiation** (critical for Swiss market):
- Research via Salarium.ch: `https://www.salarium.bfs.admin.ch/`
- Calculate target range: Current + 15% to market maximum
- Prepare justification: Market data + proven impact + total comp context
- Define walk-away point: Minimum acceptable offer

**Interview Preparation**:
- Identify 3-5 technical deep-dive topics
- Prepare 5-6 STAR stories covering:
  - Leadership & influence
  - Problem-solving under constraints
  - Cross-functional collaboration
  - Failure & learning
  - Innovation & initiative
- List thoughtful questions for interviewers

**Output**: Complete application strategy document paired with resume.

**File Pairing**:
```
resumes/customized/
├── 2025_11_10_google_ml_engineer.tex
├── 2025_11_10_google_ml_engineer.pdf
└── 2025_11_10_google_ml_engineer_application_strategy.md
```

## Quick Reference Commands

> All commands run **from the repository root**. The scripts live with the skill; reference them via `SCRIPTS`:
> ```bash
> SCRIPTS=.claude/skills/swiss-tech-resume-builder/scripts
> ```

### Initialize New Application
```bash
python3 "$SCRIPTS/init_application.py" --company <company> --role <role>
```

### Validate LaTeX
```bash
python3 "$SCRIPTS/validate_latex.py" resumes/customized/YYYY_MM_DD_company_role.tex
```

### Compile Resume
```bash
bash "$SCRIPTS/compile_resume.sh" resumes/customized/YYYY_MM_DD_company_role.tex
```

### Complete Workflow (All Phases)
```bash
# Run everything from the repository root
SCRIPTS=.claude/skills/swiss-tech-resume-builder/scripts

# 1. Setup (if needed)
cp docs/PERSONAL_PROFILE.example.md docs/PERSONAL_PROFILE.md
# Edit PERSONAL_PROFILE.md with your info

# 2. Initialize application
python3 "$SCRIPTS/init_application.py" --company google --role ml_engineer

# 3. Customize LaTeX (output shows path)
# Edit: resumes/customized/2025_11_10_google_ml_engineer.tex

# 4. Validate
python3 "$SCRIPTS/validate_latex.py" resumes/customized/2025_11_10_google_ml_engineer.tex

# 5. Compile
bash "$SCRIPTS/compile_resume.sh" resumes/customized/2025_11_10_google_ml_engineer.tex

# 6. Review PDF and iterate if needed

# 7. Fill in application strategy
# Edit: resumes/customized/2025_11_10_google_ml_engineer_application_strategy.md
```

## Troubleshooting Guide

### Compilation Errors

**Error: "Unbalanced output routine"**
- **Cause**: Using `casual` style with multi-page CV
- **Fix**: Change to `\moderncvstyle{fancy}` in LaTeX file

**Error: "Argument of \cventry has an extra }"**
- **Cause**: Missing 5th argument in `\cventry`
- **Fix**: Add empty {} as 5th argument:
  ```latex
  \cventry{2020--2024}{Title}{Company}{City}{}{Description}
  ```

**Error: "Font not found"**
- **Cause**: Custom fonts (Roboto, Lato) not installed
- **Fix**: Install fonts system-wide or comment out custom font declarations

**Error: "Package fontspec requires..."**
- **Cause**: Using pdflatex instead of xelatex
- **Fix**: Always use `xelatex` command for compilation

**See Full Guide**: `references/moderncv_technical_guide.md`

### Content Issues

**Low ATS score (<75% match)**
- **Fix**: Increase keyword density from job posting
- **Reference**: `references/ats_optimization.md`

**Missing Swiss-specific elements**
- **Fix**: Add work permit, language proficiency (CEFR), Swiss phone format
- **Reference**: `references/swiss_market_conventions.md`

**Achievements not quantified**
- **Fix**: Add specific metrics (%, CHF, users, time saved)
- **Reference**: `references/personal_profile_schema.md` - Quantification Tips

### Design Issues

**Formatting inconsistent**
- **Fix**: Follow style guide specifications exactly
- **Reference**: `docs/style-guide/pdf/CV_STYLE_GUIDE.md`

**Layout problems (orphans, widows, spacing)**
- **Fix**: Use `\vspace{}`, `\newpage`, adjust `hintscolumnwidth`
- **Reference**: `references/moderncv_technical_guide.md`

## Best Practices

### Data Management
- ✅ **Maintain comprehensive Personal Profile** with ALL experience
- ✅ **Version control resumes** (git commit after each application)
- ✅ **Track application outcomes** (interview rate, offer rate, feedback)
- ✅ **Update profile regularly** after new achievements
- ❌ **Don't commit PERSONAL_PROFILE.md** with real data to public repos

### Resume Optimization
- ✅ **Customize for each application** (tailor keywords, emphasis)
- ✅ **Quantify everything** with specific metrics
- ✅ **Test ATS compatibility** (copy-paste test, keyword match)
- ✅ **Keep it concise** (2 pages maximum for most roles)
- ❌ **Don't use generic templates** without customization
- ❌ **Don't exceed 2 pages** for non-executive roles

### Swiss Market Specifics
- ✅ **State work authorization** prominently (if non-Swiss/EU)
- ✅ **Include professional photo** (headshot, professional attire)
- ✅ **Use CEFR language levels** (A1-C2, not "fluent/conversational")
- ✅ **Demonstrate precision** with exact metrics and dates
- ❌ **Don't omit language skills** (critical for Swiss market)
- ❌ **Don't use informal language** (maintain professional tone)

### LaTeX Technical
- ✅ **Always use fancy style** (`\moderncvstyle{fancy}`)
- ✅ **Validate before compiling** to catch errors early
- ✅ **Clean build artifacts** after compilation
- ✅ **Test PDF text-selectability** for ATS
- ❌ **Don't skip 5th argument** in `\cventry`
- ❌ **Don't use pdflatex** (use xelatex)

## Resources Reference

### Scripts (Automation & Validation)

**`scripts/init_application.py`** - Initialize new job application
- Creates customized .tex file from template
- Generates application strategy markdown
- Sets up naming convention (YYYY_MM_DD_company_role)

**`scripts/validate_latex.py`** - Pre-compilation validation
- Checks moderncvstyle is 'fancy'
- Verifies \cventry has 6 arguments
- Identifies unreplaced placeholders
- Validates package declarations

**`scripts/compile_resume.sh`** - Compile and clean
- Runs XeLaTeX (2 passes)
- Cleans build artifacts
- Verifies PDF creation

### References (Swiss Market Knowledge)

**`references/swiss_market_conventions.md`** (~1,265 words)
- Resume structure requirements
- Swiss cultural values to demonstrate
- Regional variations (Zurich vs Geneva vs Basel)
- Industry-specific expectations
- Salary expectations by role and location
- Quality checklist

**`references/ats_optimization.md`** (~2,000 words)
- ATS-safe formatting guidelines
- Keyword optimization strategies
- Common ATS failures and fixes
- LaTeX moderncv ATS optimization
- Testing procedures

**`references/moderncv_technical_guide.md`** (~1,400 words)
- LaTeX compilation instructions
- Common commands reference
- Troubleshooting errors
- Package loading order
- Multi-page CV best practices
- Validation checklist

**`references/personal_profile_schema.md`** (~2,700 words)
- Complete data structure
- Example content for each section
- Quantification strategies
- CEFR language levels
- Swiss-specific sections
- Privacy considerations

### Assets (Templates & Design Specs)

**`assets/application_strategy_template.md`** (~1,800 words) — *skill-bundled*
- Complete strategy document structure
- Cover letter guidance
- Salary negotiation framework
- Interview preparation checklist
- Timeline recommendations

**`resumes/templates/CV_template.tex`** — *repo (single source)*
- Production-ready LaTeX template
- Comprehensive inline comments
- Placeholder-based customization
- Fancy style configured
- Swiss market optimized

**`docs/style-guide/`** (Complete design system) — *repo (single source for both PDF and web)*
- `DESIGN_SYSTEM.md`: Cross-format brand standards (shared)
- `pdf/CV_STYLE_GUIDE.md`: Typography, colors, layout specs
- `pdf/VISUAL_DESIGN_REFERENCE.md`: One-page cheat sheet
- `pdf/LATEX_CODE_SNIPPETS.md`: Copy-paste code library
- `pdf/MODERNCV_REFERENCE.md`: moderncv technical reference
- `web/WEB_RESUME_STYLE_GUIDE.md`: Web (React) design specification

## Advanced Usage

### Multi-Language Resumes

For bilingual applications (German/English):

1. **Create language variants**:
   ```bash
   cp resumes/customized/2025_11_10_google_ml_engineer.tex \
      resumes/customized/2025_11_10_google_ml_engineer_de.tex
   ```

2. **Update LaTeX language settings**:
   ```latex
   \usepackage[english,german]{babel}  % German as default
   \selectlanguage{german}
   ```

3. **Translate content** in Personal Profile:
   - Maintain both English and German sections
   - Use appropriate terminology for each market

### Custom Branding

To adapt templates for personal branding:

1. **Define custom colors** in LaTeX:
   ```latex
   \definecolor{color1}{HTML}{YOUR_BRAND_COLOR}
   ```

2. **Modify style guide**:
   - Update `docs/style-guide/pdf/CV_STYLE_GUIDE.md`
   - Adjust color palette section
   - Maintain consistency across applications

3. **Update templates**:
   - Apply changes to `resumes/templates/CV_template.tex`
   - Test compilation and visual appearance

### Integration with Application Tracking

Track applications systematically:

1. **Create tracking spreadsheet** with columns:
   - Company, Role, Date Applied, Status
   - Resume Version (filename)
   - Cover Letter Customization Level
   - Salary Range Requested
   - Interview Dates, Outcome
   - Feedback Received

2. **Version control strategy**:
   ```bash
   git add resumes/customized/2025_11_10_company_role.*
   git commit -m "Apply to Company - Role (CHF Xk-Yk target)"
   git tag application-company-role-2025-11-10
   ```

3. **Analyze success metrics**:
   - Interview rate by resume version
   - Offer rate by customization level
   - Salary outcomes vs targets

## Success Metrics

Track these KPIs to optimize your approach:

**Application Effectiveness**:
- Interview rate: Target 20-30% for well-matched applications
- Offer rate: Target 30-50% of final-round interviews
- Salary outcomes: Target 90-110% of desired range

**Process Efficiency**:
- Time to customize resume: <2 hours per application
- ATS compatibility score: >75% keyword match
- Quality rating: 8/10 or higher before submission

**Market Positioning**:
- Applications per target salary range achieved
- Premium over current salary achieved
- Quality of companies responding (size, reputation, growth)

## Getting Help

**Skill Documentation**:
- This SKILL.md (overview and workflow)
- Reference files in `references/` (deep dives)
- Style guide in `docs/style-guide/` (design specs)

**External Resources**:
- ModernCV GitHub: https://github.com/xdanaux/moderncv
- Swiss Salary Calculator: https://www.salarium.bfs.admin.ch/
- Swiss Job Portals: jobs.ch, jobup.ch, LinkedIn Switzerland

**Common Issues**:
- LaTeX errors → `references/moderncv_technical_guide.md`
- ATS optimization → `references/ats_optimization.md`
- Swiss conventions → `references/swiss_market_conventions.md`

---

**Remember**: This is a skill for creating exceptional resumes that honor Swiss market standards while showcasing your technical excellence. Every element should demonstrate precision, reliability, and quality - the values Swiss employers prize most.

**Quick Start**: Jump to "Complete Workflow (All Phases)" section for step-by-step commands.
