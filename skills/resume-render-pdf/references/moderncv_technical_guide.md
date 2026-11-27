# ModernCV LaTeX Technical Reference

Quick technical reference for troubleshooting and working with the moderncv LaTeX package.

## Critical Repository Rules

### **MANDATORY: Always Use Fancy Style**

```latex
\moderncvstyle{fancy}  % REQUIRED - only style that handles multi-page CVs correctly
```

**Why?**
- `casual` style has "Unbalanced output routine" errors on multi-page documents
- `fancy` properly handles page breaks and multi-page layouts
- Both have similar modern appearance, but fancy is more robust

**NEVER use**: `casual`, `classic`, `banking`, or `oldstyle` styles

### **REQUIRED: cventry Must Have 6 Arguments**

```latex
\cventry{dates}{title}{company}{location}{}{description}
                                         ^^
                              5th argument required even if empty
```

**Common Error:**
```latex
❌ \cventry{2020-2024}{Senior Engineer}{Company}{Zurich}{Led team...}
✅ \cventry{2020-2024}{Senior Engineer}{Company}{Zurich}{}{Led team...}
```

## Compilation

### Required Engine: XeLaTeX

```bash
xelatex document.tex  # Run twice for references
xelatex document.tex
```

**Why XeLaTeX?**
- Supports custom fonts (Roboto, Lato)
- Better Unicode handling
- Required for fontspec package

**DO NOT use**: pdflatex (font compatibility issues)

### Compilation Cleanup

```bash
rm -f *.aux *.log *.out *.fls *.fdb_latexmk *.gz *.toc *.bbl *.blg
```

## Essential Document Structure

### Minimal Working Example

```latex
\documentclass[10pt,a4paper,sans]{moderncv}
\moderncvstyle{fancy}      % REQUIRED style
\moderncvcolor{blue}       % Or custom color

% Required packages
\usepackage[utf8]{inputenc}
\usepackage[scale=0.88]{geometry}
\usepackage{fontspec}
\setmainfont{Roboto}

% Personal info
\firstname{John}
\familyname{Doe}
\mobile{+41 XX XXX XX XX}
\email{john.doe@example.com}
\photo[64pt][0.4pt]{picture}

\begin{document}
\makecvtitle

\section{Experience}
\cventry{2020--2024}{Job Title}{Company}{City}{}
{Description of role and achievements.}

\section{Education}
\cventry{2016--2020}{Degree}{University}{City}{}
{Description}

\section{Skills}
\cvitem{Programming}{Python, Java, C++}
\cvitem{Tools}{Docker, Kubernetes, AWS}

\end{document}
```

## Common Commands

### Personal Information

```latex
\firstname{John}
\familyname{Doe}
\title{Curriculum Vitae}                    % Optional document title
\address{Street}{City}{Country}             % Optional
\mobile{+41 XX XXX XX XX}                   % Swiss format
\phone{+41 XX XXX XX XX}                    % Landline
\email{john.doe@example.com}
\homepage{www.example.com}
\social[linkedin]{username}
\social[github]{username}
\extrainfo{B permit holder}                 % Work authorization
\photo[64pt][0.4pt]{portrait.jpg}
\quote{Professional tagline}
```

### Content Commands

```latex
% Main entry (experience, education)
\cventry{dates}{title}{org}{location}{optional}{description}

% Simple key-value
\cvitem{Category}{Description}

% Two-column key-value
\cvdoubleitem{Cat1}{Text1}{Cat2}{Text2}

% Single item in list
\cvlistitem{Bullet point}

% Two items in row
\cvlistdoubleitem{Item 1}{Item 2}

% Language proficiency
\cvlanguage{German}{C2}{Native proficiency}

% Section headers
\section{Section Name}
\subsection{Subsection}
```

### Layout Control

```latex
% Adjust left column width (dates, categories)
\setlength{\hintscolumnwidth}{3.5cm}

% Page margins
\usepackage[scale=0.88]{geometry}  % 88% of page width

% Spacing between entries
\vspace{0.5em}

% Page break
\newpage
```

## Troubleshooting

### Error: "Unbalanced output routine"

**Cause**: Using `casual` style with multi-page CV

**Solution**:
```latex
\moderncvstyle{fancy}  % Switch to fancy style
```

### Error: "! Argument of \cventry has an extra }"

**Cause**: Missing 5th argument in `\cventry`

**Solution**:
```latex
❌ \cventry{2020}{Title}{Company}{City}{Description}
✅ \cventry{2020}{Title}{Company}{City}{}{Description}
```

### Error: "Font ... not found"

**Cause**: Custom fonts not installed

**Solutions**:
```bash
# Option 1: Install fonts system-wide (macOS)
cp fonts/*.ttf /Library/Fonts/

# Option 2: Use default fonts
# Comment out custom font declarations in .tex file
```

### Error: "Package fontspec Error: The fontspec package requires..."

**Cause**: Using pdflatex instead of xelatex

**Solution**:
```bash
xelatex document.tex  # Use xelatex, not pdflatex
```

### Warning: "Overfull \hbox"

**Cause**: Text too wide for column

**Solutions**:
```latex
% Option 1: Increase hints column width
\setlength{\hintscolumnwidth}{4cm}

% Option 2: Use line breaks in long text
{Long description text\\with manual line break}

% Option 3: Hyphenation hints
\hyphenation{Switzer-land}
```

### Compilation Hangs

**Cause**: Infinite loop in font loading or package conflict

**Solutions**:
1. Delete auxiliary files: `rm *.aux *.log`
2. Check package loading order
3. Verify fonts are installed
4. Try compiling in draft mode: `\documentclass[draft]{moderncv}`

## Color Customization

### Predefined Colors

```latex
\moderncvcolor{blue}      % Professional blue (default)
\moderncvcolor{black}     % Monochrome
\moderncvcolor{burgundy}  % Deep red
\moderncvcolor{green}     % Nature-inspired
\moderncvcolor{orange}    % Vibrant
```

### Custom Colors

```latex
% Define custom colors
\definecolor{color0}{rgb}{0,0,0}          % Text color (black)
\definecolor{color1}{HTML}{39a7d0}        % Accent color (custom blue)
\definecolor{color2}{rgb}{0.3,0.3,0.3}    % Secondary text (gray)

% Use in document
\moderncvcolor{blue}  % Base scheme
% Custom colors override defaults
```

## Font Configuration

### XeLaTeX Font Setup

```latex
\usepackage{fontspec}
\setmainfont{Roboto}                 % Body text
\setsansfont{Lato}                   % Sans serif
\setmonofont{Roboto Mono}            % Code/monospace
```

### Font Weights

```latex
\textbf{Bold text}
\textit{Italic text}
{\large Larger text}
{\small Smaller text}
```

## Multi-Page CV Best Practices

### Page Breaks

```latex
\section{Experience}
% ... First page content ...

\newpage  % Explicit page break

\section{Education}
% ... Second page content ...
```

### Avoiding Orphans

```latex
% Keep section with content
\section{Education}
\nopagebreak  % Prevent page break after header
\cventry{...}{...}{...}{...}{}
{Long description}
```

## Timeline Package (moderntimeline)

### Setup

```latex
\usepackage[firstyear=2015,lastyear=2025]{moderntimeline}
\tlwidth{0.8ex}  % Timeline bar width
```

### Timeline Entry

```latex
\tlcventry{2020}{2024}{Senior Engineer}{Company}{City}{}
{Description with visual timeline}

% Still current
\tlcventry{2022}{0}{Current Role}{Company}{City}{}
{Description - 0 means present}
```

## Icon Usage

### FontAwesome Icons

```latex
% Automatically loaded by moderncv
\faPhone \hspace{0.3em} +41 XX XXX XX XX
\faEnvelope \hspace{0.3em} email@example.com
\faLinkedin \hspace{0.3em} linkedin.com/in/user
\faGithub \hspace{0.3em} github.com/user
\faGlobe \hspace{0.3em} www.example.com
```

## Package Loading Order

**Critical order to avoid conflicts:**

```latex
\documentclass[10pt,a4paper,sans]{moderncv}

% 1. Style and color FIRST
\moderncvstyle{fancy}
\moderncvcolor{blue}

% 2. Encoding and fonts
\usepackage[utf8]{inputenc}
\usepackage{fontspec}

% 3. Page layout
\usepackage[scale=0.88]{geometry}

% 4. Language support
\usepackage[english]{babel}

% 5. Timeline (if needed)
\usepackage[firstyear=2015,lastyear=2025]{moderntimeline}

% 6. Custom definitions
\definecolor{color1}{HTML}{39a7d0}
\setlength{\hintscolumnwidth}{3.5cm}

% 7. Personal info
\firstname{John}
% ...

% 8. Document begins
\begin{document}
```

## Validation Checklist

Before compiling, verify:
- [ ] `\moderncvstyle{fancy}` is set
- [ ] All `\cventry` commands have 6 arguments
- [ ] Custom fonts are installed (or commented out)
- [ ] XeLaTeX compilation command used
- [ ] Package loading order is correct
- [ ] Personal information is complete
- [ ] Photo file exists at specified path
- [ ] No special characters without proper encoding

## Performance Tips

### Faster Compilation

```bash
# Draft mode (no images, faster)
\documentclass[draft]{moderncv}

# First compile (full)
xelatex document.tex

# Subsequent compiles (if no structure changes)
xelatex -interaction=batchmode document.tex
```

### Reducing File Size

```latex
% Compress images
\photo[64pt][0.4pt]{picture.jpg}  % Smaller size

% Simplify timeline
% \usepackage{moderntimeline}  % Comment out if not needed
```

## Advanced Customization

### Custom Section Style

```latex
\newcommand{\cvsectioncustom}[1]{%
  \section{#1}
  \vspace{-0.3em}
}
```

### Custom Bullet Points

```latex
\renewcommand{\labelitemi}{\textcolor{color1}{\textbullet}}
```

### Custom Entry Spacing

```latex
\newcommand{\cvitemspaced}[2]{%
  \cvitem{#1}{#2}
  \vspace{0.3em}
}
```

## Common File Paths

```
project/
├── document.tex            # Main LaTeX file
├── portrait.jpg            # Photo
├── fonts/                  # Custom fonts (if any)
│   ├── Roboto-Regular.ttf
│   └── Lato-Regular.ttf
└── compiled/
    └── document.pdf        # Output
```

## Quick Reference Card

| Task | Command |
|------|---------|
| Compile | `xelatex document.tex` |
| Clean up | `rm *.aux *.log *.out` |
| Set style | `\moderncvstyle{fancy}` |
| Main entry | `\cventry{}{}{}{}{}{} ` |
| Section | `\section{Name}` |
| Page break | `\newpage` |
| Adjust margins | `\usepackage[scale=0.88]{geometry}` |
| Column width | `\setlength{\hintscolumnwidth}{3cm}` |

## Getting Help

**Official Resources:**
- GitHub: https://github.com/xdanaux/moderncv
- CTAN: https://ctan.org/pkg/moderncv

**Common Issues:**
- Check package versions: `tlmgr info moderncv`
- Update packages: `tlmgr update --all`
- Validate LaTeX distribution: `xelatex --version`

---

**Remember**: Always use `fancy` style and ensure all `\cventry` commands have exactly 6 arguments. These are the two most common sources of compilation errors.
