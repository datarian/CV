# ModernCV LaTeX Package Documentation

## Overview

ModernCV is a modern curriculum vitae class for LaTeX that provides a documentclass for typesetting curricula vitae in various styles. It aims to be both straightforward to use and customizable, offering ready-made styles and extensive customization options.

**Current Version**: 2.4.1+ (actively maintained)  
**Author**: Xavier Danaux (xdanaux@gmail.com)  
**License**: LaTeX Project Public License, version 1.3c  
**Last Updated**: July 2024

## Key Features and Capabilities

- **Multiple predefined styles**: 5 ready-made CV styles
- **Customizable colors**: 8+ predefined color schemes with custom color support
- **Flexible command structure**: Most commands have optional arguments
- **Icon support**: Multiple icon sets (FontAwesome, Letters, Marvosym)
- **Multi-format output**: Supports DVI, PS, and PDF compilation
- **Timeline support**: Integration with moderntimeline package
- **Multilingual support**: Compatible with babel package

## Document Class Declaration

```latex
\documentclass[<options>]{moderncv}
```

### Available Options

**Paper Sizes**: `a4paper` (default), `a5paper`, `b5paper`, `letterpaper`, `legalpaper`, `executivepaper`

**Font Sizes**: `10pt`, `11pt` (default), `12pt`

**Special Options**:
- `sans` - Use sans serif fonts
- `roman` - Use roman fonts
- `nolmodern` - Disable Latin Modern fonts
- `nocolor` - Disable colors
- `draft` - Draft mode
- `final` - Final mode (default)

**Example**:
```latex
\documentclass[10pt,a4paper,sans]{moderncv}
```

## Available Styles and Themes

### Predefined Styles
Set with `\moderncvstyle{<style>}`:

1. **casual** (default) - Modern, clean look with colored accents
2. **classic** - Traditional academic CV style
3. **banking** - Professional, conservative appearance
4. **oldstyle** - Vintage-inspired design
5. **fancy** - More decorative, artistic style

### Color Schemes
Set with `\moderncvcolor{<color>}`:

- **blue** (default) - Professional blue accents
- **black** - Monochromatic, high contrast
- **burgundy** - Deep red, sophisticated
- **green** - Nature-inspired, calming
- **grey** - Neutral, minimalist
- **orange** - Vibrant, energetic
- **purple** - Creative, unique
- **red** - Bold, attention-grabbing

### Custom Colors
```latex
\definecolor{color0}{rgb}{0,0,0}      % Main text color
\definecolor{color1}{HTML}{39a7d0}    % Accent color
\definecolor{color2}{rgb}{0.3,0.3,0.3} % Secondary text
```

## Essential Commands and Usage

### Personal Information Commands

```latex
% Required personal information
\firstname{John}
\familyname{Doe}
\title{Curriculum Vitae}                    % Optional
\address{Street}{City}{Country}             % Optional
\mobile{+1 234 567 890}                     % Optional
\phone{+1 234 567 890}                      % Optional
\fax{+1 234 567 890}                        % Optional
\email{john.doe@example.com}                % Optional
\homepage{www.johndoe.com}                  % Optional
\social[linkedin]{john.doe}                 % Optional
\social[twitter]{@johndoe}                  % Optional
\social[github]{johndoe}                    % Optional
\extrainfo{Additional information}          % Optional
\photo[64pt][0.4pt]{picture}               % Optional
\quote{Some quote}                          % Optional
```

### CV Content Commands

#### Main Entry Command
```latex
\cventry{year--year}{Job title}{Employer}{City}{}{Description}
\cventry{year--year}{Degree}{Institution}{City}{\textit{Grade}}{Description}
```

#### List Commands
```latex
\cvitem{category}{Text}
\cvdoubleitem{category1}{text1}{category2}{text2}
\cvlistitem{Point 1}
\cvlistdoubleitem{Point 1}{Point 2}
```

#### Specialized Commands
```latex
\cvcomputer{category}{programs}{category}{programs}
\cvlanguage{Language}{Level}{Comment}
```

#### Section Commands
```latex
\section{Education}
\section{Experience}
\section{Skills}
\subsection{Subcategory}
\closesection{}          % Needed for proper spacing
```

## Timeline Functionality (moderntimeline)

The `moderntimeline` package provides timeline visualization for CV entries.

### Setup
```latex
\usepackage[firstyear=2001,lastyear=2019]{moderntimeline}
\tlenablemonths          % Enable monthly precision
\tlwidth{0.5em}         % Set timeline width
```

### Timeline Commands
```latex
\tllabelcventry{start_year}{end_year}{start_month}{end_month}{position}{employer}{city}{country}{description}
\tlcventry{start_year}{end_year}{position}{employer}{city}{country}{description}
```

### Timeline Customization
```latex
\tltextstart[north]{\scriptsize}  % Start label formatting
\tltextend[south]{\scriptsize}    % End label formatting
```

## Font Handling and Requirements

### Engine Requirements
ModernCV works best with:
- **XeLaTeX** (recommended for custom fonts)
- **LuaLaTeX** (recommended for custom fonts)
- **pdfLaTeX** (limited font support)

### Font Configuration
```latex
% With XeLaTeX/LuaLaTeX
\usepackage{fontspec}
\setmainfont{Roboto}
\setsansfont{Lato}
\setmonofont{Roboto Mono}

% With pdfLaTeX
\usepackage[sfdefault]{roboto}
\usepackage[T1]{fontenc}
```

### Icon Fonts
ModernCV automatically loads FontAwesome icons:
```latex
\faPhone, \faEnvelope, \faLinkedin, \faGithub, etc.
```

## Repository-Specific Requirements

### **REQUIRED**: Always Use Fancy Style for Multi-Page CVs
For all CVs in this repository, **ALWAYS** use the `fancy` style:
```latex
\moderncvstyle{fancy}  % REQUIRED for multi-page CVs - handles page breaks properly
```

**Why `fancy` instead of `casual`?**
- The `casual` style has fundamental issues with multi-page documents causing "Unbalanced output routine" errors
- The `fancy` style properly handles multi-page layouts while maintaining a modern, professional appearance
- Both styles have similar visual appeal but `fancy` is more robust for longer CVs

### Multi-Page CV Best Practices
```latex
% Document structure for multi-page CVs
\documentclass[10pt,a4paper,sans]{moderncv}
\moderncvstyle{fancy}  % Use fancy for multi-page support
\moderncvcolor{black}  % Or your preferred color

% Use \newpage for explicit page breaks
\section{Experience}
% ... content fills page 1 ...

\newpage  % Explicit page break to page 2

\section{Education}
% ... rest of content ...
```

### Important Notes
- Always ensure `\cventry` has exactly 6 arguments: `\cventry{dates}{title}{company}{location}{}{description}`
- The 5th argument (typically grade/italic text) must be present even if empty `{}`
- Test compilation after any structural changes

## Common Troubleshooting Issues

### Compilation Errors

1. **Font Not Found**
   ```
   Solution: Install required fonts or use engine-compatible alternatives
   XeLaTeX: fc-list | grep "Font Name"
   ```

2. **Package Conflicts**
   ```latex
   % Load moderncv early to avoid conflicts
   \documentclass{moderncv}
   % Other packages after
   ```

3. **Timeline Issues**
   ```latex
   % Ensure moderntimeline is compatible with moderncv version
   \usepackage[firstyear=YYYY,lastyear=YYYY]{moderntimeline}
   ```

4. **Encoding Issues**
   ```latex
   % For XeLaTeX/LuaLaTeX
   % !TEX encoding = UTF-8 Unicode
   
   % For pdfLaTeX
   \usepackage[utf8]{inputenc}
   ```

### Layout Issues

1. **Column Width Adjustment**
   ```latex
   \setlength{\hintscolumnwidth}{1.7cm}
   \recomputelengths  % Always call after width changes
   ```

2. **Page Geometry**
   ```latex
   \usepackage[a4paper]{geometry}
   \geometry{scale=0.9}  % Adjust margins
   ```

## Best Practices for CV Creation

### Structure Organization
1. Use clear section headers (`\section{Experience}`)
2. Order sections logically (contact → summary → experience → education → skills)
3. Use consistent date formatting
4. Keep descriptions concise and action-oriented

### Visual Design
1. Choose appropriate style for target industry
2. Use consistent color scheme throughout
3. Balance text density with white space
4. Ensure readability across different viewing contexts

### Content Guidelines
1. Use `\cventry` for major experiences/education
2. Use `\cvitem` for skills and additional information
3. Leverage timeline features for career progression
4. Include relevant icons for contact information

### Technical Considerations
1. Always use `\recomputelengths` after geometry changes
2. Test compilation with target LaTeX engine
3. Verify font availability on target systems
4. Use consistent encoding declarations

## Multilingual Support

### Basic Setup
```latex
\usepackage[english,german]{babel}  % Last language is default
\selectlanguage{english}            % Switch languages
```

### Language-Specific Formatting
```latex
% Date formatting per language
\usepackage[style=iso]{datetime2}
\DTMsetdatestyle{iso}
```

### Multiple CV Versions
```latex
% Separate files for different languages
% CV_en_Name.tex (English)
% CV_de_Name.tex (German)
```

## Compatibility Requirements

### Minimum Requirements
- LaTeX distribution (TeX Live 2018+, MiKTeX 2.9+)
- Required packages: `ifthen`, `ifpdf`, `color`, `url`, `hyperref`, `longtable`, `graphicx`, `fancyhdr`

### Recommended Setup
- **Engine**: XeLaTeX or LuaLaTeX for best font support
- **Fonts**: Roboto family, FontAwesome
- **Additional packages**: `fontspec`, `babel`, `geometry`, `datetime2`

### Package Loading Order
```latex
\documentclass{moderncv}
\moderncvstyle{casual}
\moderncvcolor{blue}
% Core packages
\usepackage{fontspec}     % XeLaTeX/LuaLaTeX only
\usepackage[english]{babel}
\usepackage{geometry}
% Additional packages
\usepackage{moderntimeline}  % If using timeline
% Custom definitions
```

## Advanced Customization

### Custom Commands
```latex
\newcommand{\technology}[1]{%
  \strut\raisebox{1.45pt}{\textcolor{color1}{\faCog}} #1%
}
```

### Custom Sections
```latex
\newcommand{\cvsection}[1]{%
  \section{#1}
  \vspace{-0.5em}
}
```

### Custom Styling
```latex
\renewcommand{\labelitemi}{\textcolor{color1}{\textbullet}}
```

## Quick Reference

### Essential Commands Summary
- `\firstname{}`, `\familyname{}` - Personal info
- `\cventry{}{}{}{}{}{}`- Main entries
- `\cvitem{}{}` - Simple items
- `\cvlanguage{}{}{}` - Language skills
- `\section{}` - Section headers
- `\recomputelengths` - Recalculate after changes

### Common Patterns
```latex
% Header
\firstname{John}
\familyname{Doe}
\mobile{+1 234 567 890}
\email{john.doe@example.com}

% Experience
\section{Experience}
\cventry{2020--2024}{Senior Data Scientist}{Company}{City}{}
{Description of role and achievements}

% Education
\section{Education}
\cventry{2016--2018}{Master's Degree}{University}{City}{}
{Thesis: "Title"}
```

This documentation serves as a comprehensive reference for working with moderncv. For the most current examples and updates, consult the official GitHub repository at https://github.com/xdanaux/moderncv.