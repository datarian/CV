# LaTeX Code Snippets Library
## Ready-to-Use Code Blocks for CV Development

**Purpose:** Copy-paste LaTeX snippets that follow the established design system  
**Version:** 1.0 | Date: 2025-10-16

---

## Complete Document Boilerplate

```latex
% !TEX TS-program = xelatex
% !TEX encoding = UTF-8 Unicode
%
% [Job-Specific Description]
% Date: YYYY-MM-DD
% Data source: docs/PERSONAL_PROFILE.md
% Target: [Company Name] - [Position Title]

\documentclass[11pt,a4paper,sans]{moderncv}

\moderncvstyle{fancy}                        % MANDATORY for multi-page support
\moderncvcolor{blue}                         % color options 'blue' (default), 'orange', 'green', 'red', 'purple', 'grey' and 'black'

\usepackage[style=iso]{datetime2}

% fonts, language
\usepackage[english]{babel}
% FontAwesome is loaded automatically by moderncv

% geometry, layout
\usepackage{graphicx}
\usepackage[a4paper]{geometry}
\usepackage{rotating}
\geometry{scale=0.88}
\setlength{\hintscolumnwidth}{3.5cm}
\recomputelengths

% custom colors
\definecolor{color0}{rgb}{0,0,0}% black
\definecolor{color1}{HTML}{39a7d0}% light blue
\definecolor{color2}{rgb}{0.3,0.3,0.3}% dark grey

\let\originalrecomputecvlengths\recomputecvlengths
\renewcommand*{\recomputecvlengths}{%
\originalrecomputecvlengths%
\setlength{\quotewidth}{0.7\textwidth}}

\renewcommand*{\sectionfont}{\fontsize{11}{13}\bfseries\upshape}

% ===============================
% PERSONAL DATA
% ===============================

\firstname{\textcolor{color2}{Jane}}
\familyname{\textcolor{color2}{Smith}}
\title{Job Title Goes Here}
\address{Breisacherstrasse 73}{4057 Basel}
\phone[mobile]{+41~(0)XX~XXX~XX~XX}
\email{jane.smith@example.com}
\social[linkedin][linkedin.com/in/yourprofile]{linkedin.com/in/yourprofile}
\social[github][github.com/yourusername]{github.com/yourusername}
\extrainfo{Born: [Your Birthdate] \\ Nationality: Swiss Citizen}

\photo[64pt][0.4pt]{../../../../resources/CV_Portrait_black.jpg}

%----------------------------------------------------------------------------------
%            CONTENT
%----------------------------------------------------------------------------------
\begin{document}

\makecvtitle

% Add sections here

\vspace{1em}
\begin{center}
\textit{\small Curious how this resume was built? Explore the system at \url{github.com/yourusername/CV}}
\end{center}

\end{document}
```

---

## Professional Summary Section

### Standard ML Engineer Summary
```latex
\section{Professional Summary}
\cvitem{}{\textit{Senior ML Engineer with 5+ years building production AI systems, specializing in LLM integration and testing non-deterministic systems. Currently productionizing Enterprise LLM for document intelligence at TechCorp (3M+ documents monthly, 99.99\% uptime). Expert in context-aware AI applications on Kubernetes infrastructure with cross-functional leadership experience.}}
```

### MLOps Specialist Summary
```latex
\section{Professional Summary}
\cvitem{}{\textit{Senior MLOps Engineer with 5+ years architecting production ML infrastructure at scale. Expert in Kubernetes-native ML platforms, managing 34-model systems processing 2M+ daily predictions with 99.99\% uptime. Proven track record of infrastructure optimization, cost reduction (40\%), and enabling exponential business growth through technical leadership.}}
```

### Engineering Manager Summary
```latex
\section{Professional Summary}
\cvitem{}{\textit{Technical leader with 5+ years building and scaling production ML systems. Currently leading cross-functional 6-person team at TechCorp, managing infrastructure serving 500+ enterprise customers. Expert in balancing technical excellence with team development, demonstrated through successful migrations, mentoring engineers, and maintaining 99.99\% system uptime.}}
```

---

## Technical Skills Section

### Full Technical Skills Block
```latex
\section{Technical Skills}

\cvitem{LLM \& GenAI}{Enterprise LLM (1+ year production) \textbullet{} Prompt engineering (few-shot learning, chain-of-thought) \textbullet{} Validation frameworks \textbullet{} Multi-model integration \textbullet{} ML flow governance}

\cvitem{Backend \& APIs}{Python/FastAPI (3+ years) \textbullet{} TypeScript/PHP (expanding expertise) \textbullet{} Java/Spring (2 years) \textbullet{} PostgreSQL (7+ years) \textbullet{} MongoDB, Firestore \textbullet{} REST/GraphQL APIs}

\cvitem{MLOps \& Cloud}{Kubernetes (3+ years) \textbullet{} Docker, Ray Serve \textbullet{} GitHub Actions \textbullet{} GCP, Azure, AWS \textbullet{} Splunk monitoring \textbullet{} Automated testing}

\cvitem{Leadership}{Technical mentoring \textbullet{} Cross-team coordination \textbullet{} Microservices architecture \textbullet{} Integration testing \textbullet{} Automated QA}
```

### Infrastructure-Focused Skills
```latex
\section{Technical Skills}

\cvitem{MLOps Platform}{Kubernetes (3+ years) \textbullet{} Docker \textbullet{} Ray Serve \textbullet{} MLflow \textbullet{} Airflow orchestration \textbullet{} GitOps workflows}

\cvitem{Cloud Infrastructure}{GCP (primary) \textbullet{} Azure \textbullet{} AWS \textbullet{} CloudRun \textbullet{} Pub/Sub \textbullet{} Auto-scaling configurations}

\cvitem{Backend Development}{Python/FastAPI (3+ years) \textbullet{} Java/Spring (2 years) \textbullet{} PostgreSQL (7+ years) \textbullet{} TimescaleDB \textbullet{} MongoDB \textbullet{} ElasticSearch}

\cvitem{DevOps \& Monitoring}{GitHub Actions CI/CD \textbullet{} Splunk monitoring \textbullet{} Automated testing frameworks \textbullet{} Infrastructure as Code}
```

---

## Professional Experience Entries

### Current Role (TechCorp - Detailed)
```latex
\cventry{since 05/2021}{Senior ML Engineer - LLM \& AI Infrastructure}{TechCorp AG}{Zurich}{}{%
Leading ML infrastructure and AI architecture for spend management platform (500+ enterprise customers, 3M+ documents monthly). Technical leadership across 6-person cross-functional team.
\begin{itemize}
\item Productionized Enterprise LLM LLM for document intelligence with 99.99\% uptime, developing prompt engineering frameworks using few-shot learning and chain-of-thought reasoning for receipt/invoice extraction
\item Built automated validation pipelines for non-deterministic LLM outputs with scenario-based testing
\item Implemented scalable orchestration system integrating 24-model ensemble with custom frameworks on Kubernetes for distributed processing
\item Architected async ML pipeline using Ray Serve and GCP Pub/Sub, processing 100K+ daily requests with sub-5000ms latency; built FastAPI REST APIs integrating Firestore, MongoDB, ElasticSearch
\item Migrated from monolithic CloudRun to Kubernetes microservices, reducing deployment time 80\% while mentoring engineers on ML best practices
\end{itemize}}
```

### Current Role (TechCorp - Condensed)
```latex
\cventry{since 05/2021}{Senior ML Engineer}{TechCorp AG}{Zurich}{}{%
Leading ML infrastructure for spend management platform (500+ enterprise customers, 3M+ monthly documents).
\begin{itemize}
\item Productionized Enterprise LLM LLM with 99.99\% uptime for document intelligence
\item Built Kubernetes-native ML platform integrating 24-model ensemble
\item Architected async pipeline processing 100K+ daily requests (sub-5000ms latency)
\item Reduced deployment time 80\% through CloudRun to Kubernetes migration
\end{itemize}}
```

### Previous Role (EnergyTech Energy)
```latex
\cventry{09/2019 -- 04/2021}{Senior Data Scientist \& Team Lead}{EnergyTech Solutions AG}{Zurich}{}{%
Led 3-person data science team building ML solutions for Virtual Power Plant managing 10,000+ IoT devices. Team Lead from 11/2020.
\begin{itemize}
\item Built ML infrastructure on Kubernetes with Airflow orchestration for TB-scale time series data, achieving 99.9\% system availability
\item Implemented TimescaleDB for time-series optimization, reducing query latency 60\% for real-time energy trading
\end{itemize}}
```

### Earlier Role (University of Applied Sciences)
```latex
\cventry{02/2015 -- 05/2017}{Software Engineer \& Project Lead}{University of Applied Sciences}{University of Applied Sciences}{}{%
Full-stack development and project leadership for interdisciplinary research software in collaboration with Partner University Singapore.
\begin{itemize}
\item Built simulation software using Java (Spring, Hibernate), PostgreSQL, Angular with REST APIs for biocide leaching modeling
\item Led cross-disciplinary team; implemented Docker-based deployment and Git workflows
\end{itemize}}
```

### Early Career Role
```latex
\cventry{08/2001 -- 08/2004}{Systems Administrator}{Swisslog AG}{Aarau}{}{%
Network infrastructure, Linux/Windows server administration, PHP web development}
```

---

## Education Entries

### Master's Degree
```latex
\cventry{09/2017 -- 06/2019}{Master of Science in Statistics}{Université de Neuchâtel}{Grade: 5.5/6}{}{%
Computational statistics, probabilistic algorithms, Bayesian methods}
```

### Bachelor's Degree
```latex
\cventry{09/2011 -- 02/2015}{Bachelor in Renewables and Environmental Technology}{University of Applied Sciences}{Grade: 6/6, with distinction}{}{%
International collaboration: Partner University, Singapore}
```

### Apprenticeship
```latex
\cventry{08/2001 -- 08/2004}{Computer Science Apprenticeship}{Swiss Federal Diploma}{}{}{}
```

---

## Languages Section

### Full Language List
```latex
\section{Languages}
\cvitemwithcomment{German}{Native}{}
\cvitemwithcomment{English}{Fluent (C1/C2)}{}
\cvitemwithcomment{French}{Good (B2)}{}
\cvitemwithcomment{Spanish}{Intermediate (B1)}{}
```

### Condensed Version
```latex
\section{Languages}
\cvitem{}{German (Native) \textbullet{} English (C1/C2) \textbullet{} French (B2) \textbullet{} Spanish (B1)}
```

---

## Optional Sections

### Open Source Projects
```latex
\section{Open Source Projects}
\cvitem{}{Contributions to scikit-learn ML community \textbullet{} 3D printing firmware (testing/bugfixing) \textbullet{} Active in ML/AI open source ecosystem}
```

### Technical Hobbies
```latex
\section{Technical Hobbies}
\cvitem{}{Arduino wearables \textbullet{} Dendrochronology data visualization \textbullet{} CAD modeling \textbullet{} Hardware prototyping}
```

### Sports & Wellness
```latex
\section{Sports \& Wellness}
\cvitem{}{Yoga practitioner \textbullet{} Outdoor activities with companion dog \textbullet{} Aspiring ocean sailor}
```

### Personal Attributes
```latex
\section{Personal}
\cvitem{}{Open minded \textbullet{} Strong analytical skills \textbullet{} Connected thinking \textbullet{} High quality awareness \textbullet{} Enjoying interdisciplinary exchange \textbullet{} Enabler of positive work environment}
```

---

## Page Management

### Force Page Break
```latex
\newpage
```

### Add Vertical Space
```latex
\vspace{0.5em}  % Small space
\vspace{1em}    % Medium space
\vspace{2em}    % Large space
```

### Footer with GitHub Link
```latex
\vspace{1em}
\begin{center}
\textit{\small Curious how this resume was built? Explore the system at \url{github.com/yourusername/CV}}
\end{center}
```

---

## Special Formatting

### Emphasized Text (Italic)
```latex
\textit{This text is italicized}
```

### Bold Text
```latex
\textbf{This text is bold}
```

### Bullet Points in Text
```latex
Skill 1 \textbullet{} Skill 2 \textbullet{} Skill 3
```

### Percentage Sign
```latex
99.99\% uptime  % Note: backslash before %
```

### Plus Sign in Numbers
```latex
3M+ documents
100K+ requests
5+ years
```

---

## Common Date Formats

### Current Position
```latex
since 05/2021
```

### Date Range
```latex
09/2019 -- 04/2021
```

### Same Year Range
```latex
02/2015 -- 05/2017
```

### Full Date Range
```latex
08/2001 -- 08/2004
```

---

## Bullet Point Best Practices

### Achievement with Metrics
```latex
\item Productionized Enterprise LLM LLM for document intelligence with 99.99\% uptime, developing prompt engineering frameworks using few-shot learning and chain-of-thought reasoning for receipt/invoice extraction
```

### Scale and Impact
```latex
\item Architected async ML pipeline using Ray Serve and GCP Pub/Sub, processing 100K+ daily requests with sub-5000ms latency
```

### Leadership and Mentoring
```latex
\item Migrated from monolithic CloudRun to Kubernetes microservices, reducing deployment time 80\% while mentoring engineers on ML best practices
```

### Infrastructure Optimization
```latex
\item Built ML infrastructure on Kubernetes with Airflow orchestration for TB-scale time series data, achieving 99.9\% system availability
```

### Technical Implementation
```latex
\item Implemented scalable orchestration system integrating 24-model ensemble with custom frameworks on Kubernetes for distributed processing
```

---

## Color Usage

### Name with Custom Color
```latex
\firstname{\textcolor{color2}{Jane}}
\familyname{\textcolor{color2}{Smith}}
```

### Inline Color Change
```latex
\textcolor{color1}{This text is light blue}
\textcolor{color2}{This text is dark grey}
```

---

## Photo Configuration

### Standard Photo
```latex
\photo[64pt][0.4pt]{../../../../resources/CV_Portrait_black.jpg}
```

### Different Photo Sizes
```latex
\photo[72pt][0.4pt]{photo.jpg}  % Larger
\photo[56pt][0.4pt]{photo.jpg}  % Smaller
```

---

## Comment Blocks

### Section Comment
```latex
% ===============================
% SECTION NAME
% ===============================
```

### Inline Comment
```latex
% This is temporarily disabled
%\cventry{...}
```

### Multi-line Comment
```latex
%\section{Old Section}
%\cvitem{}{Content here}
%\cvitem{}{More content}
```

---

## Icons with FontAwesome

### Birthday
```latex
\extrainfo{\faBirthdayCake \enspace DD.MM.YYYY \\ \faGlobeEurope \enspace Swiss}
```

### Custom Icon Usage
```latex
\faEnvelope \enspace Email
\faPhone \enspace Phone
\faLinkedin \enspace LinkedIn
\faGithub \enspace GitHub
```

---

## Custom Geometry Adjustments

### Wider Content Area
```latex
\geometry{scale=0.90}  % 90% of page (10% margins)
```

### Narrower Hints Column
```latex
\setlength{\hintscolumnwidth}{3cm}
\recomputelengths
```

### Custom Quote Width
```latex
\setlength{\quotewidth}{0.8\textwidth}
```

---

## Compilation Commands

### Standard Compilation
```bash
xelatex CV_filename.tex
```

### Full Clean Compilation
```bash
xelatex CV_filename.tex && rm -f *.aux *.log *.out *.fls *.fdb_latexmk *.gz *.toc *.bbl *.blg
```

### Continuous Compilation (latexmk)
```bash
latexmk -xelatex -pvc CV_filename.tex
```

---

## Debugging Snippets

### Add Line Numbers (for debugging)
```latex
\usepackage{lineno}
\linenumbers
```

### Show Frame (for layout debugging)
```latex
\usepackage{showframe}
```

### Verbose Output
```latex
\errorcontextlines=999
```

---

## Quick Fixes

### Fix Photo Not Showing
```latex
% Use absolute path
\photo[64pt][0.4pt]{../../../../resources/CV_Portrait_black.jpg}

% Or ensure relative path is correct from compilation directory
\photo[64pt][0.4pt]{../resources/CV_Portrait_black.jpg}
```

### Fix Compilation Error
```latex
% Always use fancy style (not casual!)
\moderncvstyle{fancy}  % CORRECT
% \moderncvstyle{casual}  % WRONG - causes errors on multi-page
```

### Fix Spacing Issues
```latex
% Recompute after geometry changes
\geometry{scale=0.88}
\setlength{\hintscolumnwidth}{3.5cm}
\recomputelengths  % IMPORTANT
```

---

## Template Selection Guide

### Choose ML Engineer Template When:
- Target role: ML Engineer, Data Scientist, AI Engineer
- Emphasis: Model development, algorithms, production systems
- Skills focus: LLM, ML frameworks, model optimization

### Choose MLOps Template When:
- Target role: MLOps Engineer, DevOps for ML, Platform Engineer
- Emphasis: Infrastructure, deployment, scalability, reliability
- Skills focus: Kubernetes, CI/CD, monitoring, cloud platforms

### Choose Engineering Manager Template When:
- Target role: Engineering Manager, Tech Lead, Team Lead
- Emphasis: Leadership, team building, strategic impact
- Skills focus: Mentoring, project management, cross-functional coordination

---

## Customization Workflow

1. **Copy base template:**
   ```bash
   cp /Users/flo/Development/CV/resumes/templates/CV_ml_engineer_template.tex \
      ../../../../resumes/customized/YYYY_MM_DD_company_role.tex
   ```

2. **Update header comment:**
   ```latex
   % Company Name - Position Title - Customized Resume
   % Date: YYYY-MM-DD
   % Target: Company Name - Position Details
   ```

3. **Customize title:**
   ```latex
   \title{Exact Job Title from Posting}
   ```

4. **Tailor professional summary:**
   - Match keywords from job posting
   - Emphasize relevant experience
   - Highlight specific technologies mentioned

5. **Reorder skills:**
   - Most relevant category first
   - Match job requirements order
   - Add/remove technologies as needed

6. **Adjust experience bullets:**
   - Emphasize relevant projects
   - Match achievement types to role
   - Quantify impact relevant to target

7. **Compile and review:**
   ```bash
   cd ../../../../resumes/customized/
   xelatex YYYY_MM_DD_company_role.tex
   ```

---

**Usage Tips:**
- Copy snippets directly into your .tex file
- Maintain consistent formatting across sections
- Always recompile after changes to verify output
- Use comments to track customizations
- Test different zoom levels in PDF viewer

---

**For full design rationale, see:** `CV_STYLE_GUIDE.md`  
**For quick reference, see:** `VISUAL_DESIGN_REFERENCE.md`
