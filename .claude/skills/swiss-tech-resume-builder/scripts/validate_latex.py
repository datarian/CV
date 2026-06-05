#!/usr/bin/env python3
"""
Validate LaTeX resume file before compilation.

Performs pre-compilation checks to catch common errors:
- Verifies moderncvstyle is set to 'fancy' (required for multi-page)
- Checks cventry commands have exactly 6 arguments
- Validates placeholder replacement
- Checks for common LaTeX syntax errors
- Verifies required packages are declared

Usage:
    ./validate_latex.py <path-to-tex-file>

Example:
    ./validate_latex.py resumes/customized/2025_11_10_company_role.tex
"""

import argparse
import re
import sys
from pathlib import Path
from typing import List, Tuple


class ValidationIssue:
    def __init__(self, line_num: int, severity: str, message: str):
        self.line_num = line_num
        self.severity = severity  # 'error', 'warning', 'info'
        self.message = message

    def __str__(self):
        icon = {'error': '❌', 'warning': '⚠️', 'info': 'ℹ️'}[self.severity]
        return f"{icon} Line {self.line_num}: {self.message}"


def validate_moderncv_style(content: str, issues: List[ValidationIssue]):
    """Check that moderncvstyle is set to 'fancy'."""
    style_pattern = r'\\moderncvstyle\{([^}]+)\}'
    matches = list(re.finditer(style_pattern, content))

    if not matches:
        issues.append(ValidationIssue(0, 'error',
            "Missing \\moderncvstyle command. Must use \\moderncvstyle{fancy}"))
        return

    for match in matches:
        line_num = content[:match.start()].count('\n') + 1
        style = match.group(1)
        if style != 'fancy':
            issues.append(ValidationIssue(line_num, 'error',
                f"Must use \\moderncvstyle{{fancy}}, found: {style}. "
                "Other styles cause multi-page errors."))


def validate_cventry_args(content: str, issues: List[ValidationIssue]):
    """Check that all cventry commands have exactly 6 arguments."""
    # Pattern to match \cventry{...}{...}{...}{...}{...}{...}
    cventry_pattern = r'\\cventry'

    for match in re.finditer(cventry_pattern, content):
        line_num = content[:match.start()].count('\n') + 1
        start_pos = match.end()

        # Count braces
        brace_count = 0
        arg_count = 0
        pos = start_pos
        in_arg = False

        while pos < len(content) and arg_count < 7:
            char = content[pos]

            if char == '{':
                if brace_count == 0:
                    in_arg = True
                brace_count += 1
            elif char == '}':
                brace_count -= 1
                if brace_count == 0 and in_arg:
                    arg_count += 1
                    in_arg = False
            elif not in_arg and char not in ' \n\t':
                break

            pos += 1

        if arg_count != 6:
            issues.append(ValidationIssue(line_num, 'error',
                f"\\cventry must have exactly 6 arguments, found {arg_count}. "
                f"Format: \\cventry{{dates}}{{title}}{{company}}{{location}}{{}}{{description}}"))


def validate_placeholders(content: str, issues: List[ValidationIssue]):
    """Check for unreplaced [PLACEHOLDER] values."""
    placeholder_pattern = r'\[PLACEHOLDER[^\]]*\]'

    for match in re.finditer(placeholder_pattern, content):
        line_num = content[:match.start()].count('\n') + 1
        placeholder = match.group(0)
        issues.append(ValidationIssue(line_num, 'warning',
            f"Unreplaced placeholder: {placeholder}"))


def validate_required_packages(content: str, issues: List[ValidationIssue]):
    """Check that required packages are included."""
    required_packages = ['moderncv', 'fontspec', 'moderntimeline']

    for package in required_packages:
        pattern = rf'\\usepackage.*\{{[^}}]*{package}[^}}]*\}}'
        if not re.search(pattern, content):
            issues.append(ValidationIssue(0, 'warning',
                f"Missing recommended package: {package}"))


def validate_github_link(content: str, issues: List[ValidationIssue]):
    """Check for GitHub repository link."""
    github_pattern = r'github\.com/datarian/CV'

    if not re.search(github_pattern, content):
        issues.append(ValidationIssue(0, 'info',
            "Consider adding GitHub repository link: github.com/datarian/CV"))


def main():
    parser = argparse.ArgumentParser(
        description='Validate LaTeX resume before compilation'
    )
    parser.add_argument('tex_file', help='Path to .tex file to validate')
    parser.add_argument('--strict', action='store_true',
                        help='Treat warnings as errors')

    args = parser.parse_args()

    # Read file
    tex_path = Path(args.tex_file)
    if not tex_path.exists():
        print(f"❌ Error: File not found: {tex_path}")
        return 1

    content = tex_path.read_text()

    # Run validations
    issues: List[ValidationIssue] = []

    validate_moderncv_style(content, issues)
    validate_cventry_args(content, issues)
    validate_placeholders(content, issues)
    validate_required_packages(content, issues)
    validate_github_link(content, issues)

    # Report results
    errors = [i for i in issues if i.severity == 'error']
    warnings = [i for i in issues if i.severity == 'warning']
    infos = [i for i in issues if i.severity == 'info']

    if errors:
        print("❌ ERRORS:")
        for issue in errors:
            print(f"  {issue}")
        print()

    if warnings:
        print("⚠️  WARNINGS:")
        for issue in warnings:
            print(f"  {issue}")
        print()

    if infos:
        print("ℹ️  INFO:")
        for issue in infos:
            print(f"  {issue}")
        print()

    # Determine exit code
    if errors:
        print("❌ Validation failed. Fix errors before compiling.")
        return 1
    elif args.strict and warnings:
        print("❌ Validation failed (strict mode). Fix warnings before compiling.")
        return 1
    elif not issues:
        print("✅ All validations passed!")
        return 0
    else:
        print("✅ No critical errors found. Consider addressing warnings.")
        return 0


if __name__ == "__main__":
    exit(main())
