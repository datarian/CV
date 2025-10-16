# AI-Powered Resume Generation System for Swiss Tech Market

A next-generation CV/Resume repository powered by Claude Code and specialized AI agents. Instead of manually crafting LaTeX documents, you work with intelligent agents that handle market research, resume strategy, content optimization, and professional design—automatically.

## Table of Contents
- [Overview](#overview)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
- [Working with AI Agents](#working-with-ai-agents)
- [Usage Examples](#usage-examples)
- [Repository Structure](#repository-structure)
- [Technical Details](#technical-details)
- [Privacy & Security](#privacy--security)

## Overview

### What Makes This Different?

Traditional approach: Manually edit LaTeX, compile PDFs, guess at keywords, hope for the best.

**This system**: Talk to AI agents that:
- Research the Swiss tech job market for salary ranges and skill requirements
- Analyze job postings to identify key requirements
- Craft targeted resume strategies optimized for both ATS and human reviewers
- Generate professional LaTeX documents with perfect formatting
- Iteratively review and improve content and design quality
- Provide comprehensive application strategies including cover letter guidance and interview prep

### Key Features

- **AI Agent Coordination**: A team of specialized agents works together to create optimal resumes
- **Data-Driven**: Single source of truth in `docs/PERSONAL_PROFILE.md`
- **Swiss Market Expertise**: Agents understand Swiss tech market conventions and expectations
- **Template System**: Single generic template with comprehensive customization guidance for all role types
- **Quality Assurance**: Iterative review loops ensure professional results
- **Application Strategy**: Automatic generation of tailored application guidance
- **Privacy-First**: Personal data never committed to version control

### Target Market

- **Geographic**: Switzerland (German-speaking regions)
- **Roles**: ML Engineer, MLOps Engineer, Engineering Manager, AI Software Architect
- **Industry**: Tech, Fintech, SaaS

## How It Works

### The Agent-Powered Workflow

```
You: "I found a job posting for ML Engineer at Company X. The posting is available at https://company.awesome/career/posting"
    ↓
┌─────────────────────────────────────────────────────┐
│  career-planning-coach (Coordinator)                │
│  "Let me help you with that application"            │
└─────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────┐
│  swiss-tech-job-market-analyst                      │
│  • Analyzes job posting                             │
│  • Researches company tech stack                    │
│  • Identifies salary range                          │
│  • Determines critical skills                       │
└─────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────┐
│  swiss-resume-expert                                │
│  • Develops content strategy                        │
│  • Selects optimal template                         │
│  • Plans section emphasis                           │
│  • Identifies keywords for ATS                      │
└─────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────┐
│  latex-moderncv-expert                              │
│  • Creates customized LaTeX resume                  │
│  • Compiles professional PDF                        │
│  • Implements feedback from reviewers               │
└─────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────┐
│  Quality Assurance Loop (Iterative)                 │
│  ┌───────────────────────────────────────┐          │
│  │ swiss-tech-resume-reviewer            │          │
│  │ • Reviews content quality             │          │
│  │ • Checks ATS optimization             │          │
│  │ • Validates keywords                  │          │
│  └───────────────────────────────────────┘          │
│  ┌───────────────────────────────────────┐          │
│  │ latex-design-reviewer                 │          │
│  │ • Assesses visual design              │          │
│  │ • Checks formatting consistency       │          │
│  │ • Ensures professional appearance     │          │
│  └───────────────────────────────────────┘          │
│  ┌───────────────────────────────────────┐          │
│  │ career-planning-coach (Final Gate)    │          │
│  │ • Holistic career narrative review    │          │
│  │ • Strategic positioning validation    │          │
│  │ • Career goal alignment check         │          │
│  └───────────────────────────────────────┘          │
└─────────────────────────────────────────────────────┘
    ↓
You receive:
  • Optimized resume PDF
  • Comprehensive application strategy document
  • Cover letter guidance
  • Interview preparation points
  • Salary negotiation strategy
```

### Three Simple Steps

1. **Share Your Goals**: "I'm targeting ML Engineer roles at Swiss fintech companies"
2. **Let Agents Work**: They research, strategize, create, and refine automatically
3. **Review and Apply**: Get a polished resume and detailed application strategy

## Getting Started

### Prerequisites

**Required Software**:
- [Claude Code](https://docs.claude.com/claude-code) - AI agent orchestration
- LaTeX distribution with XeLaTeX:
  - **macOS**: `brew install --cask mactex` (or `basictex` for minimal install)
  - **Ubuntu/Debian**: `sudo apt-get install texlive-xetex texlive-fonts-extra texlive-latex-extra`

**Required LaTeX Packages** (usually included):
- `moderncv`, `fontspec`, `fontawesome`, `babel`, `datetime2`, `graphicx`

### Initial Setup

1. **Clone and Navigate**
   ```bash
   git clone <your-repo-url>
   cd CV
   ```

2. **Create Your Personal Profile**
   ```bash
   cp docs/PERSONAL_PROFILE.example.md docs/PERSONAL_PROFILE.md
   ```
   Edit `docs/PERSONAL_PROFILE.md` with your actual professional information.

3. **Add Your Portrait Photo**
   ```bash
   cp /path/to/your/photo.jpg resources/CV_Portrait_casual.jpg
   ```

4. **Start Claude Code**
   ```bash
   claude-code
   ```

That's it! The agents will guide you from here.

## Working with AI Agents

### The Agent Team

#### 🎯 career-planning-coach (Primary Coordinator)
**When it helps**: Always—coordinates all other agents and manages your application workflow

**What it does**:
- Understands your career goals and target roles
- Coordinates specialized agents based on your needs
- Performs final holistic review of career narrative
- Generates comprehensive application strategy documents
- Provides personalized career guidance

**You interact by**: Sharing job postings, asking for resume optimization, requesting career advice

---

#### 📊 swiss-tech-job-market-analyst
**When it helps**: Job market research and company analysis

**What it does**:
- Analyzes Swiss tech job market trends
- Researches salary ranges for specific roles
- Identifies in-demand skills and technologies
- Evaluates company culture and tech stacks
- Assesses job posting requirements

**Automatically invoked when**: You mention a company, role, or ask about market conditions

---

#### ✍️ swiss-resume-expert
**When it helps**: Resume strategy and content planning

**What it does**:
- Develops targeted resume strategies
- Optimizes content for ATS (Applicant Tracking Systems)
- Selects appropriate templates for role types
- Plans section emphasis and keyword integration
- Ensures Swiss market conventions are followed

**Automatically invoked when**: Creating or optimizing resumes

---

#### 🛠️ latex-moderncv-expert
**When it helps**: LaTeX document creation and technical implementation

**What it does**:
- Creates professional LaTeX resume documents
- Implements feedback from reviewer agents
- Compiles PDFs with XeLaTeX
- Handles technical formatting and styling
- Ensures moderncv best practices

**Automatically invoked when**: Generating or modifying resume documents

---

#### 🎨 latex-design-reviewer
**When it helps**: Visual design and layout assessment

**What it does**:
- Reviews visual presentation and layout
- Ensures consistent formatting
- Checks professional appearance
- Validates design choices
- Provides actionable design improvements

**Automatically invoked when**: Resume design needs review

---

#### ⭐ swiss-tech-resume-reviewer
**When it helps**: Content quality and ATS optimization

**What it does**:
- Reviews resume content quality
- Validates ATS optimization
- Scores resume effectiveness
- Checks keyword optimization
- Provides content improvement suggestions

**Automatically invoked when**: Resume content needs validation

---

### The Iterative Quality Loop

Agents don't just create—they **iterate until perfect**:

1. **latex-moderncv-expert** generates the resume
2. **swiss-tech-resume-reviewer** reviews content → provides feedback → expert improves
3. **latex-design-reviewer** reviews design → provides feedback → expert improves
4. **career-planning-coach** performs final holistic review → can trigger full iteration if needed
5. Repeat until all agents approve

This ensures every resume meets professional standards for Swiss tech market.

## Usage Examples

### Example 1: Generic Resume for Job Search

```
You: "I need a resume for ML Engineer positions in Switzerland"

career-planning-coach: I'll help you create an optimized ML Engineer
resume. Let me coordinate with the team.

[Agents work automatically]
- swiss-tech-job-market-analyst researches ML Engineer market
- swiss-resume-expert develops content strategy
- latex-moderncv-expert creates resume
- Quality reviewers iterate until perfect

Result:
✓ resumes/compiled/2025_10_16_generic_ml_engineer_CV_en.pdf
✓ Professional, ATS-optimized, Swiss market ready
```

### Example 2: Company-Specific Application

```
You: "I want to apply for Senior ML Engineer at Frontify"

career-planning-coach: I'll analyze this opportunity and create
a tailored application package.

[Agents work automatically]
- Analyze Frontify's tech stack and culture
- Research salary range for this role
- Create customized resume emphasizing relevant experience
- Generate comprehensive application strategy

Result:
✓ resumes/customized/2025_10_16_frontify_senior_ml_engineer.pdf
✓ resumes/customized/2025_10_16_frontify_senior_ml_engineer_application_strategy.md
  - Cover letter strategy
  - Salary negotiation guidance (target: 145 kCHF)
  - Interview preparation points
  - Strategic fit assessment
```

### Example 3: Resume Review and Improvement

```
You: "Review my current resume and suggest improvements"

career-planning-coach: I'll have our review team assess your resume
and identify optimization opportunities.

[Agents analyze]
- swiss-tech-resume-reviewer scores content
- latex-design-reviewer evaluates design
- swiss-tech-job-market-analyst checks market alignment

Result:
• Content Score: 7.5/10
• Design Score: 8/10
• Recommendations:
  - Add quantifiable achievements to project descriptions
  - Emphasize MLOps skills more prominently
  - Improve keyword density for ATS

[Agents implement improvements automatically]
```

### Example 4: Market Research

```
You: "What's the current market for MLOps Engineers in Zurich?"

swiss-tech-job-market-analyst: I'll research the MLOps market
in Zurich for you.

Result:
• Salary Range: 130-165 kCHF (depending on experience)
• In-Demand Skills: Kubernetes, CI/CD, ML monitoring, cloud platforms
• Active Employers: Banks, insurers, tech companies
• Job Volume: High demand, especially in fintech
• Recommendations: Emphasize production ML experience and infrastructure skills
```

## Repository Structure

### Directory Overview

```
CV/
├── .claude/                          # AI agent configurations
│   ├── agents/                       # Specialized agent definitions
│   │   ├── career-planning-coach.md
│   │   ├── swiss-resume-expert.md
│   │   ├── swiss-tech-job-market-analyst.md
│   │   ├── latex-moderncv-expert.md
│   │   ├── latex-design-reviewer.md
│   │   └── swiss-tech-resume-reviewer.md
│   └── .mcp.json                     # Model context protocol config
│
├── docs/                             # Documentation and data
│   ├── PERSONAL_PROFILE.md           # **YOUR DATA SOURCE** (private)
│   ├── PERSONAL_PROFILE.example.md   # Template with placeholders
│   ├── JOB_AGENT_RESEARCH.md         # Market research findings
│   ├── MODERNCV_DOC.md               # LaTeX technical documentation
│   └── [other docs]
│
├── resumes/
│   ├── templates/                    # Generic template with comprehensive guidance
│   │   └── CV_template.tex           # Universal template for all role types
│   │
│   ├── customized/                   # Job-specific customizations
│   │   ├── YYYY_MM_DD_company_role.tex
│   │   ├── YYYY_MM_DD_company_role.pdf
│   │   └── YYYY_MM_DD_company_role_application_strategy.md
│   │
│   └── compiled/                     # Final timestamped PDFs
│       └── YYYY_MM_DD_HH_MM_company_role_CV_lang.pdf
│
├── resources/                        # Assets for CVs
│   └── CV_Portrait_*.jpg             # Portrait photos (private)
│
├── CLAUDE.md                         # Agent instructions
├── MISSING_INFORMATION.md            # Information gap tracking
├── README.md                         # This file
└── .gitignore                        # Privacy protection
```

### Key Files Explained

#### `docs/PERSONAL_PROFILE.md` (Private)
**Single source of truth** for all your professional information:
- Personal details
- Professional summary
- Work experience with quantifiable achievements
- Skills and technologies
- Projects and contributions
- Education and certifications
- Languages

Agents read this file to generate resumes—keep it updated!

#### `resumes/templates/`
Single generic template (`CV_template.tex`) with comprehensive inline guidance for customization:
- Adaptable for all role types: ML Engineer, MLOps, Engineering Manager, Senior Data Scientist
- Includes placeholder replacements and section customization instructions
- Built-in guidance for role-specific emphasis (technical depth vs leadership vs infrastructure)
- Swiss market best practices integrated throughout

#### `resumes/customized/`
Job-specific resumes tailored for particular applications:
- `.tex` files: LaTeX source
- `.pdf` files: Compiled resumes
- `_application_strategy.md`: Comprehensive application guidance

#### Application Strategy Documents
Auto-generated by `career-planning-coach` for each application:
- Cover letter strategy with opening hooks
- Salary negotiation tactics and target ranges
- Interview preparation and STAR stories
- Strategic fit assessment
- Timeline and follow-up recommendations

## Technical Details

### LaTeX Compilation

**IMPORTANT**: Always use XeLaTeX (never pdflatex)

Agents handle compilation automatically, but if you need manual control:

```bash
# Navigate to resume location
cd resumes/customized/

# Compile (agents do this automatically)
xelatex YYYY_MM_DD_company_role.tex

# Clean up build artifacts
rm *.aux *.log *.out *.fls *.fdb_latexmk *.gz *.toc *.bbl *.blg
```

### Critical LaTeX Configuration

All templates use:
- **Document class**: `moderncv` with `fancy` style (MANDATORY for multi-page support)
- **Compiler**: XeLaTeX (required for custom fonts)
- **Fonts**: Roboto, Lato, Roboto Slab (via `fontspec`)

**Never use `casual` style**—it has bugs with multi-page documents.

### Template Variables

Templates pull data from `docs/PERSONAL_PROFILE.md`:
- `\name`, `\email`, `\phone` - Personal information
- `\cventry{dates}{title}{company}{location}{}{description}` - Experience entries
- Skills, projects, and achievements mapped to appropriate sections

### Build Artifacts

After compilation, these temporary files are created:
- `*.aux`, `*.log`, `*.out` - Build metadata
- `*.fls`, `*.fdb_latexmk` - File tracking
- `*.gz` - Synctex files
- `*.toc`, `*.bbl`, `*.blg` - Table of contents and bibliography

Agents clean these automatically.

## Privacy & Security

### What's Excluded from Git

**NEVER committed to version control**:
- `docs/PERSONAL_PROFILE.md` - Your actual personal data
- All `*.pdf` files - Compiled resumes
- `resumes/templates/*.tex` (unless `.example.tex`)
- `resumes/customized/` - Job-specific resumes
- `resources/*.jpg` - Portrait photos

### What's Included in Git

**Safe to commit**:
- `.claude/` - Agent configurations
- `docs/PERSONAL_PROFILE.example.md` - Template with placeholders
- `docs/*.md` - Documentation
- `CLAUDE.md`, `README.md` - Instructions
- `.gitignore` - Privacy rules

### Safety Checklist

Before pushing to git:

```bash
git status

# Should NOT see:
✗ docs/PERSONAL_PROFILE.md
✗ Any *.pdf files
✗ resumes/customized/
✗ resources/*.jpg

# Should see:
✓ .claude/ directory
✓ docs/PERSONAL_PROFILE.example.md
✓ README.md, CLAUDE.md
✓ Documentation files
```

### Sharing This System

When sharing this repository:
1. Fork to your own account
2. Verify no personal data leaked
3. Test with `git status` before pushing
4. Consider using `git-secrets` for extra protection

## Resources

### Job Market Research
- Swiss Tech Job Market: `docs/JOB_AGENT_RESEARCH.md`
- Salary Calculator: https://www.salarium.bfs.admin.ch/

### LaTeX Resources
- moderncv documentation: https://ctan.org/pkg/moderncv
- XeLaTeX guide: https://www.overleaf.com/learn/latex/XeLaTeX

### Claude Code
- Documentation: https://docs.claude.com/claude-code
- GitHub: https://github.com/anthropics/claude-code

## Troubleshooting

### Common Issues

**"Agents aren't responding"**
- Ensure you're running Claude Code in the repository directory
- Check that `.claude/agents/` contains agent definitions
- Try: `claude-code` to restart

**"LaTeX compilation failed"**
- Agents handle this automatically, but verify XeLaTeX is installed
- Check: `xelatex --version`
- Install missing packages: `sudo tlmgr install moderncv fontawesome`

**"Personal data showing in git"**
```bash
# Remove from staging
git reset HEAD <file>

# Remove from history (use with caution)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch <file>" \
  --prune-empty --tag-name-filter cat -- --all
```

## Contributing

Adapting this system for your own use:
1. Update `docs/PERSONAL_PROFILE.example.md` with your structure
2. Customize agent configurations in `.claude/agents/`
3. Create your own templates for your target roles
4. Share anonymized improvements back to the community

## Philosophy

This system embodies a new approach to job applications:
- **AI-Assisted, Human-Guided**: Agents handle tedious work, you make strategic decisions
- **Data-Driven**: One profile, infinite targeted variations
- **Quality-Focused**: Iterative reviews ensure professional results
- **Privacy-First**: Your data never leaves your machine
- **Swiss Market Optimized**: Built for the specifics of Swiss tech recruiting

Let the agents handle the mechanics while you focus on landing your ideal role.

---

**Last Updated**: October 2025
**Maintained for**: Swiss Tech Job Market
**Target Roles**: ML Engineer, MLOps Engineer, Engineering Manager, AI Software Architect
**System**: AI-Powered with Claude Code
