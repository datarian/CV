#!/usr/bin/env python3
"""
Initialize a new job application from template.

This script creates a new customized resume directory structure for a specific
job application, copying the template and setting up the naming convention.

Usage:
    ./init_application.py --company <company> --role <role> [--date <YYYY_MM_DD>]

Example:
    ./init_application.py --company google --role ml_engineer
    ./init_application.py --company frontify --role senior_llm_engineer --date 2025_11_10

Output:
    Creates files in resumes/customized/:
    - YYYY_MM_DD_company_role.tex (LaTeX source)
    - YYYY_MM_DD_company_role_application_strategy.md (strategy template)
"""

import argparse
import os
import shutil
from datetime import datetime
from pathlib import Path


def sanitize_name(name: str) -> str:
    """Convert company/role name to filename-safe format."""
    return name.lower().replace(' ', '_').replace('-', '_')


def main():
    parser = argparse.ArgumentParser(
        description='Initialize a new job application from template'
    )
    parser.add_argument('--company', required=True, help='Company name')
    parser.add_argument('--role', required=True, help='Role title')
    parser.add_argument('--date', help='Date in YYYY_MM_DD format (default: today)')
    parser.add_argument('--template', default='resumes/templates/CV_template.tex',
                        help='Path to template file')
    parser.add_argument('--output-dir', default='resumes/customized',
                        help='Output directory for customized resumes')

    args = parser.parse_args()

    # Generate date string
    if args.date:
        date_str = args.date
    else:
        date_str = datetime.now().strftime('%Y_%m_%d')

    # Sanitize inputs
    company = sanitize_name(args.company)
    role = sanitize_name(args.role)

    # Create filename base
    base_name = f"{date_str}_{company}_{role}"

    # Define paths
    template_path = Path(args.template)
    output_dir = Path(args.output_dir)
    output_tex = output_dir / f"{base_name}.tex"
    output_strategy = output_dir / f"{base_name}_application_strategy.md"

    # Check if template exists
    if not template_path.exists():
        print(f"❌ Error: Template not found at {template_path}")
        return 1

    # Create output directory if needed
    output_dir.mkdir(parents=True, exist_ok=True)

    # Check if files already exist
    if output_tex.exists():
        print(f"⚠️  Warning: {output_tex} already exists")
        response = input("Overwrite? (y/N): ")
        if response.lower() != 'y':
            print("Aborted.")
            return 0

    # Copy template
    shutil.copy(template_path, output_tex)
    print(f"✅ Created: {output_tex}")

    # Create strategy document template
    strategy_template = f"""# Application Strategy: {args.company.title()} - {args.role.replace('_', ' ').title()}

**Generated**: {datetime.now().strftime('%Y-%m-%d')}
**Resume**: {base_name}.pdf
**Target Salary**: CHF [range]
**Fit Assessment**: [X/10]

---

## Executive Summary

[2-3 sentence overview of fit, key selling points, and likelihood of success]

---

## Position Overview

**Company**: {args.company.title()}
**Role**: {args.role.replace('_', ' ').title()}
**Location**: [Location / Remote options]
**Key Requirements**:
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

---

## Cover Letter Strategy

### Opening Hook
[Compelling 2-3 sentence opening that immediately establishes relevance]

### Key Points to Address
1. **[Topic 1]**: [What to emphasize and why]
2. **[Topic 2]**: [What to emphasize and why]
3. **[Topic 3]**: [What to emphasize and why]

### Skills Gap Mitigation
[How to proactively address any skills gaps]

### Closing Statement
[Strong closing that invites next steps]

---

## Salary Negotiation Strategy

**Current Compensation**: CHF [current]
**Target Range**: CHF [min] - CHF [max]
**Justification Points**:
- [Point 1 with evidence]
- [Point 2 with evidence]
- [Point 3 with evidence]

**Opening Position**: [What to state when asked]
**Walk-Away Point**: CHF [minimum acceptable]

---

## Interview Preparation

### Technical Deep-Dive Topics
1. **[Topic 1]**: [Specific examples to prepare]
2. **[Topic 2]**: [Specific examples to prepare]
3. **[Topic 3]**: [Specific examples to prepare]

### Behavioral Questions - STAR Stories
1. **[Theme 1]**: [Specific situation to highlight]
2. **[Theme 2]**: [Specific situation to highlight]

### Questions to Ask Them
1. [Question about role/team]
2. [Question about challenges]
3. [Question about culture]

---

## Next Steps

**TODO**:
- [ ] Research company and role in detail
- [ ] Customize resume template with job-specific keywords
- [ ] Prepare cover letter using strategy above
- [ ] Compile PDF: `./scripts/compile_resume.sh {output_tex}`
- [ ] Review with career-planning-coach agent
"""

    with open(output_strategy, 'w') as f:
        f.write(strategy_template)
    print(f"✅ Created: {output_strategy}")

    print(f"\n📋 Next steps:")
    print(f"1. Edit {output_tex} and replace [PLACEHOLDER] values")
    print(f"2. Compile: ./skills/swiss-tech-resume-builder/scripts/compile_resume.sh {output_tex}")
    print(f"3. Fill in {output_strategy} with job-specific details")

    return 0


if __name__ == "__main__":
    exit(main())
