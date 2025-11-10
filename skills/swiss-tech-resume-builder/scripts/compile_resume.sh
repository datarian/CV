#!/usr/bin/env bash
"""
Compile LaTeX resume using XeLaTeX and clean up build artifacts.

Usage:
    ./compile_resume.sh <path-to-tex-file>

Example:
    ./compile_resume.sh resumes/customized/2025_11_10_company_role.tex

Requirements:
    - XeLaTeX installed (from TeX Live or MacTeX)
    - moderncv package installed
    - Custom fonts (Roboto, Lato, Roboto Slab) if using custom templates
"""

set -e  # Exit on error

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if file argument provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: No .tex file specified${NC}"
    echo "Usage: $0 <path-to-tex-file>"
    exit 1
fi

TEX_FILE="$1"

# Check if file exists
if [ ! -f "$TEX_FILE" ]; then
    echo -e "${RED}Error: File not found: $TEX_FILE${NC}"
    exit 1
fi

# Get directory and filename
TEX_DIR=$(dirname "$TEX_FILE")
TEX_BASENAME=$(basename "$TEX_FILE" .tex)

echo -e "${YELLOW}Compiling: $TEX_FILE${NC}"

# Change to the directory containing the .tex file
cd "$TEX_DIR"

# Compile with XeLaTeX
echo -e "${YELLOW}Running XeLaTeX (first pass)...${NC}"
xelatex "$TEX_BASENAME.tex"

# Run second pass for references and TOC if needed
echo -e "${YELLOW}Running XeLaTeX (second pass)...${NC}"
xelatex "$TEX_BASENAME.tex"

# Check if PDF was created
if [ -f "$TEX_BASENAME.pdf" ]; then
    echo -e "${GREEN}✓ PDF created successfully: $TEX_DIR/$TEX_BASENAME.pdf${NC}"

    # Clean up build artifacts
    echo -e "${YELLOW}Cleaning up build artifacts...${NC}"
    rm -f *.aux *.log *.out *.fls *.fdb_latexmk *.gz *.toc *.bbl *.blg

    echo -e "${GREEN}✓ Compilation complete and cleaned up${NC}"
else
    echo -e "${RED}✗ Error: PDF was not created${NC}"
    exit 1
fi
