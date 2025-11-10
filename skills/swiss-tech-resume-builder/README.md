# Swiss Tech Resume Builder - Claude Code Skill

A comprehensive skill for creating ATS-optimized resumes for the Swiss technology job market using LaTeX moderncv, multi-agent review workflows, and Swiss market expertise.

## Features

- **Swiss Market Specialization**: Resume conventions, cultural expectations, salary norms, language requirements
- **LaTeX moderncv Expertise**: Technical implementation, troubleshooting, multi-page support with `fancy` style
- **Multi-Agent Iterative Workflow**: Automated quality assurance with content reviewers, design reviewers, and LaTeX experts
- **Complete Application Support**: Generates resumes + application strategy documents (cover letters, salary negotiation, interview prep)

## Installation

### For Users of This Repository

When working in this repository, Claude Code can access the skill directly:

```bash
# From the repository root
claude-code

# In Claude Code, invoke the skill:
> Use the swiss-tech-resume-builder skill
```

Claude Code will automatically find skills in the `skills/` directory when working in this repository.

### For Global Use Across All Projects

To use this skill in other projects, symlink it to your global Claude skills directory:

```bash
# Create global skills directory if it doesn't exist
mkdir -p ~/.claude/skills

# Symlink this skill
ln -s /Users/flo/Development/CV/skills/swiss-tech-resume-builder \
      ~/.claude/skills/swiss-tech-resume-builder

# Or copy it (if you want independence from this repo)
cp -r /Users/flo/Development/CV/skills/swiss-tech-resume-builder \
      ~/.claude/skills/swiss-tech-resume-builder
```

After symlinking/copying, the skill will be available in all Claude Code sessions.

## Quick Start

1. **Read the complete workflow**: See `SKILL.md` for the full 6-phase process
2. **Prepare personal profile**: Copy and fill `docs/PERSONAL_PROFILE.example.md`
3. **Initialize application**: Run `scripts/init_application.py --company <company> --role <role>`
4. **Invoke the skill**: Use Claude Code to guide you through customization and review

## Dependencies

### Required Agents

This skill works best with these specialized agents (defined in `.claude/agents/`):

- **career-planning-coach**: Coordinates workflow and user interactions
- **swiss-tech-job-market-analyst**: Market research and salary analysis
- **swiss-resume-expert**: Content strategy and optimization
- **swiss-tech-resume-reviewer**: Content quality review (iterative)
- **latex-moderncv-expert**: LaTeX implementation and debugging (iterative)
- **latex-design-reviewer**: Visual design review (iterative)

These agents are included in this repository at `.claude/agents/`.

### Required Tools

- **LaTeX Distribution**: XeLaTeX or LuaLaTeX
  - macOS: `brew install --cask mactex`
  - Linux: `sudo apt-get install texlive-full`
  - Windows: Install MiKTeX or TeX Live

- **Python 3.8+**: For automation scripts
  - Required packages: `PyYAML` (install: `pip install pyyaml`)

- **moderncv LaTeX package**: Usually included with full LaTeX distributions

### Optional Fonts

For enhanced typography (if not installed, defaults will be used):

- Roboto
- Lato
- Roboto Slab

## Repository Structure

```
skills/swiss-tech-resume-builder/
├── SKILL.md                          # Complete skill documentation (25KB)
├── README.md                         # This file
├── scripts/                          # Automation tools
│   ├── init_application.py          # Initialize new job application
│   ├── validate_latex.py            # Pre-compilation validation
│   └── compile_resume.sh            # Compile LaTeX to PDF
├── assets/                           # Templates and design specs
│   ├── CV_template.tex              # Production-ready LaTeX template
│   ├── application_strategy_template.md
│   └── style-guide/                 # Complete design system
│       ├── CV_STYLE_GUIDE.md        # Typography, colors, layout
│       ├── VISUAL_DESIGN_REFERENCE.md
│       └── LATEX_CODE_SNIPPETS.md   # Copy-paste code library
└── references/                       # Swiss market knowledge
    ├── swiss_market_conventions.md   # Resume conventions, salary data
    ├── ats_optimization.md           # ATS-safe formatting
    ├── moderncv_technical_guide.md   # LaTeX troubleshooting
    └── personal_profile_schema.md    # Data structure guide
```

## Usage Example

```bash
# 1. Navigate to repository
cd /path/to/CV/repository

# 2. Start Claude Code
claude-code

# 3. In Claude Code, invoke the skill
"Use the swiss-tech-resume-builder skill to create a resume for
the Senior ML Engineer position at Google. The job posting is at
https://careers.google.com/jobs/..."

# 4. Follow the 6-phase workflow
# Phase 1: Personal Profile Setup
# Phase 2: Market Analysis
# Phase 3: Resume Strategy
# Phase 4: LaTeX Template Implementation
# Phase 5: Quality Assurance & Iteration (multi-agent reviews)
# Phase 6: Application Strategy Generation
```

## Multi-Agent Review Workflow

The skill includes a sophisticated iterative review process:

1. **Content Review** (swiss-tech-resume-reviewer)
   - Evaluates content quality, ATS optimization, Swiss compliance
   - Target: 8.0/10 rating, 75%+ keyword match
   - Iterates with latex-moderncv-expert until approved

2. **Design Review** (latex-design-reviewer)
   - Evaluates typography, layout, style guide compliance
   - Target: 9.0/10 rating, zero critical violations
   - Iterates with latex-moderncv-expert until approved

3. **User Final Review**
   - Human quality gate for subtle issues
   - Checks section spacing, layout, text rendering

See `SKILL.md` Phase 5 for complete workflow documentation.

## Customization

### Adapt for Your Market

To adapt this skill for other markets (e.g., German tech market, US market):

1. **Update references**: Modify `references/swiss_market_conventions.md` with local conventions
2. **Adjust style guide**: Update `assets/style-guide/CV_STYLE_GUIDE.md` for regional preferences
3. **Modify templates**: Update `assets/CV_template.tex` for local standards
4. **Update agents**: Adjust agent prompts in `.claude/agents/` to reflect local expertise

### Personal Branding

To customize colors and styling:

1. Edit `assets/style-guide/CV_STYLE_GUIDE.md` - Update color palette
2. Edit `assets/CV_template.tex` - Change `\definecolor` definitions
3. Update `SKILL.md` references to your color choices

## Troubleshooting

### Common Issues

**Skill not found:**
```bash
# Verify skill location
ls -la skills/swiss-tech-resume-builder/SKILL.md

# Check Claude Code can see it
# In Claude Code: /skills
```

**LaTeX compilation errors:**
- See `references/moderncv_technical_guide.md`
- Ensure using `\moderncvstyle{fancy}` (NOT casual)
- Run: `scripts/validate_latex.py <file.tex>`

**Agent not found:**
- Check `.claude/agents/` contains required agent definitions
- Ensure agent names match exactly (case-sensitive)

## Contributing

This skill is designed to be improved through real-world usage. If you:

- Find bugs or issues
- Develop improvements
- Adapt it for other markets
- Create useful templates or references

Please contribute back to the repository!

## License

This skill is part of the [datarian/CV](https://github.com/datarian/CV) repository.

See repository LICENSE for terms.

## Support

- **Full Documentation**: See `SKILL.md` for complete workflow
- **Swiss Market Guide**: See `references/swiss_market_conventions.md`
- **LaTeX Help**: See `references/moderncv_technical_guide.md`
- **Issues**: Report at https://github.com/datarian/CV/issues

---

**Quick Start Command**:
```bash
cd skills/swiss-tech-resume-builder/scripts
./init_application.py --company <company> --role <role>
```

This creates a new application with LaTeX template and strategy document ready for customization.
