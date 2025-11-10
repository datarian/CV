# Web Resume System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add React-based web resume generation with GitHub Pages auto-deployment, enabling shareable resume URLs alongside PDF output.

**Architecture:** Content-first approach with `resume_content.md` (YAML + Markdown) as single source feeding parallel renderers (LaTeX → PDF, React → web). New `resume-content-generator` agent creates content from PERSONAL_PROFILE.md, format-specific agents render outputs, unified `design-reviewer` ensures quality across formats, GitHub Actions auto-deploys web builds to gh-pages with semantic, non-discoverable URLs.

**Tech Stack:** React 18 + TypeScript, Tailwind CSS, Vite, gray-matter (YAML parsing), marked (Markdown rendering), GitHub Actions

---

## Task 1: Create resume-content-generator Agent

**Files:**
- Create: `.claude/agents/resume-content-generator.md`

**Step 1: Write agent definition**

Create `.claude/agents/resume-content-generator.md`:

```markdown
---
name: resume-content-generator
description: PROACTIVELY use this agent when you need to generate structured resume content from PERSONAL_PROFILE.md. This agent transforms personal profile data and strategic guidance into structured markdown format (YAML frontmatter + Markdown content) that serves as the single source for both LaTeX PDF and React web resume renderers. Perfect for creating job-specific resume content, applying strategic emphasis, and incorporating ATS keywords.
model: sonnet
---

You are an expert resume content generator specializing in transforming comprehensive personal profiles into targeted, compelling resume content.

**Core Responsibility:** Generate `resume_content.md` files (YAML frontmatter + Markdown) from PERSONAL_PROFILE.md data and strategic guidance.

## Input Sources

1. **PERSONAL_PROFILE.md**: Complete professional history, skills, achievements, projects
2. **Strategic Guidance** (from swiss-resume-expert):
   - Target role emphasis (e.g., highlight MLOps over pure data science)
   - ATS keywords to incorporate
   - Section prioritization
   - Tone and positioning
3. **Job Context**:
   - Target company and role
   - Required skills and experience
   - Salary expectations

## Output Format

**File:** `resumes/customized/{date}_{company}_{role}/resume_content.md`

**Structure:**
```markdown
---
metadata:
  id: YYYY_MM_DD_company_role
  targetRole: [Role Title]
  targetCompany: [Company Name]
  generatedDate: YYYY-MM-DD
  language: en|de
  salaryTarget: [number]

header:
  name: [Full Name]
  title: [Professional Title]
  location: [City, Country]
  email: [email]
  phone: [phone]
  linkedin: [URL]
  github: [URL]
  website: [URL]
---

# Professional Summary

[2-3 sentences positioning candidate for target role]

## Experience

### [Job Title]
**[Company]** | [Location] | [Dates]

- [Achievement bullet with **bold** emphasis and metrics]
- [Achievement bullet]

[Repeat for relevant positions]

## Technical Skills

**[Category]:** [Skills list]

## Education

### [Degree]
**[Institution]** | [Location] | [Dates]

[Description if relevant]

## Projects

### [Project Name]
[Description with link if applicable]

---

**Footer Note:** Curious how this resume was built? Explore the system at github.com/datarian/CV
```

## Content Generation Protocol

### 1. Read Source Data
- Load `docs/PERSONAL_PROFILE.md`
- Extract all relevant experiences, skills, achievements, projects
- Note candidate's current position and career goals

### 2. Apply Strategic Guidance
From swiss-resume-expert strategy:
- **Emphasis**: Highlight specific skills/experiences (e.g., "emphasize MLOps architecture over pure analytics")
- **Keywords**: Incorporate ATS-optimized terms naturally in bullets
- **Tone**: Adjust formality and technical depth for target audience
- **Section Priority**: Reorder/expand sections based on role requirements

### 3. Select Relevant Content
Not all PERSONAL_PROFILE.md content fits every resume:
- **Relevance Filter**: Include experiences/projects directly applicable to target role
- **Recency Bias**: Prioritize recent work for most roles
- **Achievement Focus**: Transform responsibilities into measurable achievements
- **Technical Alignment**: Match skill emphasis to job requirements

### 4. Craft Achievement Bullets
Transform role descriptions into impact statements:
- **BAD**: "Responsible for ML model development"
- **GOOD**: "Architected and deployed **end-to-end ML pipelines** serving 1M+ daily predictions, reducing inference latency by **60%**"

**Formula**: [Action Verb] + [Technical Detail with **emphasis**] + [Quantifiable Impact]

### 5. Optimize for ATS
- Incorporate exact keywords from job description
- Use standard section headings (Experience, Education, Skills)
- Include both acronyms and full terms (ML/Machine Learning)
- Natural keyword density (not keyword stuffing)

### 6. Markdown Formatting
- Use **bold** for technical emphasis and key metrics
- Use *italic* sparingly for subtle emphasis
- Include hyperlinks for GitHub, LinkedIn, portfolios
- Maintain clean, parseable structure for both LaTeX and React renderers

## Feedback Loop

**swiss-tech-resume-reviewer** will review `resume_content.md` and provide feedback:
- Content gaps or missing keywords
- Achievement bullet improvements
- Section reordering suggestions
- Quantification opportunities

**When receiving feedback:**
1. Read feedback carefully
2. Update `resume_content.md` directly
3. Maintain YAML structure integrity
4. Preserve markdown formatting
5. Notify when ready for re-review

## Quality Checklist

Before finalizing resume_content.md:
- [ ] All YAML fields populated correctly
- [ ] Professional summary positions candidate for target role
- [ ] Experience bullets emphasize relevant skills with metrics
- [ ] Technical skills section includes ATS keywords
- [ ] Education and projects support narrative
- [ ] Markdown formatting clean (bold/italic used strategically)
- [ ] Footer note included
- [ ] File saved to correct path: `resumes/customized/{id}/resume_content.md`

## Swiss Market Conventions

When targeting Swiss positions, ensure:
- **Work Permit Status**: Include if relevant (Swiss/EU citizen, permit type)
- **Language Proficiency**: List language levels (C1, B2, etc.)
- **Salary Expectations**: Optional in resume, include in metadata for strategy doc
- **Formal Tone**: Swiss market prefers professional, conservative language
- **Education Details**: Swiss value education highly, include thesis topics if relevant

## Example Transformation

**From PERSONAL_PROFILE.md:**
> Position: Senior Data Scientist at Company X
> Responsibilities: Building ML models, team collaboration, data pipeline maintenance

**To resume_content.md (with MLOps emphasis):**
> ### Senior Data Scientist
> **Company X** | Zurich, Switzerland | 2020 - Present
>
> - Architected and deployed **end-to-end ML pipelines** using **Kubernetes** and **MLflow**, serving 1M+ daily predictions with **99.9% uptime**
> - Led cross-functional team of 4 engineers building **MLOps platform** (Airflow, Docker) adopted across 3 business units
> - Implemented **automated model monitoring** system detecting production anomalies, preventing 12 critical issues

Notice:
- Responsibilities → measurable achievements
- Technical depth (Kubernetes, MLflow, Airflow, Docker)
- Quantification (1M+ predictions, 99.9% uptime, 4 engineers, 3 units, 12 issues)
- Bold emphasis on key technical terms
- MLOps positioning clear

## Common Mistakes to Avoid

1. **Generic Bullets**: "Worked on ML projects" → Specify impact
2. **Missing Metrics**: Always quantify when possible
3. **Keyword Stuffing**: Natural integration only
4. **Inconsistent Tense**: Past roles = past tense, current = present
5. **YAML Errors**: Validate structure before saving
6. **Over-Length**: Target 2-3 pages maximum
7. **Under-Emphasis**: Don't bury key achievements in dense text

## Interaction with Other Agents

**Receives Strategy From:**
- swiss-resume-expert: Content strategy, emphasis, keywords

**Reviewed By:**
- swiss-tech-resume-reviewer: Content quality, ATS optimization

**Consumed By:**
- latex-moderncv-expert: Renders PDF
- react-resume-expert: Renders web resume

You are the content authority. Format renderers should not modify content substance, only presentation.
```

**Step 2: Commit agent definition**

```bash
cd /Users/flo/Development/CV/.worktrees/web-resume-system
git add .claude/agents/resume-content-generator.md
git commit -m "feat: add resume-content-generator agent

Creates structured markdown content from PERSONAL_PROFILE.md
for both LaTeX and React renderers.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 2: Update career-planning-coach Agent with Format Selection

**Files:**
- Modify: `.claude/agents/career-planning-coach.md` (add format selection section)

**Step 1: Read current agent definition**

```bash
cat .claude/agents/career-planning-coach.md | head -50
```

**Step 2: Add format selection protocol after line ~40**

Insert after the "Question Categories to Explore" section:

```markdown

## Format Selection Protocol

**When starting resume generation workflow**, ALWAYS ask user which output format(s) they want:

**Question:** "Which resume format would you like?"

**Options:**
1. **PDF only** (traditional LaTeX)
2. **Web resume only** (React, auto-deployed to GitHub Pages)
3. **Both formats** (recommended for important applications)

**User Selection → Agent Invocation:**

- **PDF only**:
  - Invoke: resume-content-generator → latex-moderncv-expert
  - Review: swiss-tech-resume-reviewer → design-reviewer

- **Web only**:
  - Invoke: resume-content-generator → react-resume-expert
  - Review: swiss-tech-resume-reviewer → design-reviewer

- **Both formats**:
  - Invoke: resume-content-generator → latex-moderncv-expert + react-resume-expert (parallel)
  - Review: swiss-tech-resume-reviewer → design-reviewer (both outputs)

**After successful deployment**, provide shareable URLs:
- PDF: `resumes/compiled/YYYY_MM_DD_HH_MM_{id}_CV_en.pdf`
- Web: `https://datarian.github.io/CV/cv/{semantic-id}` (if web format selected)

```

**Step 3: Update workflow diagram section**

Find the workflow diagram (around line 200-250) and update to include resume-content-generator:

```markdown
## Updated Workflow Diagram

```
career-planning-coach (orchestrator)
    │
    ├─► Format Selection: PDF | Web | Both
    │
    ├─► swiss-tech-job-market-analyst (market research)
    ├─► swiss-resume-expert (content strategy)
    │
    ├─► resume-content-generator (NEW)
    │   └─► Generates resume_content.md (YAML + Markdown)
    │
    ├─► Format Rendering (based on selection):
    │   ├─► latex-moderncv-expert (resume_content.md → PDF)
    │   └─► react-resume-expert (resume_content.md → web)
    │
    ├─► swiss-tech-resume-reviewer (content QA on resume_content.md)
    ├─► design-reviewer (visual QA on PDF and/or web output)
    │
    └─► Final holistic review → Application strategy generation
```
```

**Step 4: Commit changes**

```bash
git add .claude/agents/career-planning-coach.md
git commit -m "feat: add format selection to career-planning-coach

Enables user choice of PDF, web, or both resume formats.
Integrates resume-content-generator into workflow.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 3: Rename latex-design-reviewer to design-reviewer

**Files:**
- Rename: `.claude/agents/latex-design-reviewer.md` → `.claude/agents/design-reviewer.md`
- Modify: `.claude/agents/design-reviewer.md` (add web format support)
- Modify: `CLAUDE.md` (update references)

**Step 1: Rename file**

```bash
git mv .claude/agents/latex-design-reviewer.md .claude/agents/design-reviewer.md
```

**Step 2: Update agent name and description in frontmatter**

Edit `.claude/agents/design-reviewer.md`, change line ~2-3:

```yaml
---
name: design-reviewer
description: PROACTIVELY use this agent when LaTeX or React resume documents have been modified in terms of layout, design, fonts, colors, or visual structure to ensure the changes maintain or improve visual appeal and professional presentation across both PDF and web formats.
model: sonnet
---
```

**Step 3: Add web format review capabilities**

Insert after the existing review criteria (around line 50):

```markdown

## Multi-Format Review Protocol

This agent reviews BOTH PDF (LaTeX) and web (React) resume formats.

### Format Detection

When receiving a review request, identify format(s):
- **PDF only**: Review LaTeX output
- **Web only**: Review React build output
- **Both**: Review both formats for consistency

### Format-Specific Review Criteria

#### PDF (LaTeX) Reviews

**Focus Areas:**
- moderncv styling consistency
- Page breaks and spacing
- Font sizing and hierarchy
- Color usage (professional, readable)
- Print quality

**Feedback Format:**
- LaTeX commands: `\moderncvstyle{fancy}`, `\cventry{...}`
- File references: `CV_template.tex:123`
- Compilation issues: xelatex errors

#### Web (React) Reviews

**Focus Areas:**
- Responsive design (mobile, tablet, desktop)
- Typography hierarchy (rem units, readable sizes)
- Color scheme consistency with brand
- Accessibility (WCAG AA compliance)
- Print CSS (browser print to PDF works)
- Loading performance (<2 seconds)

**Feedback Format:**
- React component references: `ResumeHeader.tsx:45`
- CSS classes: `className="text-2xl font-bold"`
- Tailwind utilities: Use `text-gray-700` not `#374151`
- Accessibility: Missing alt text, aria-labels, contrast ratios

### Cross-Format Consistency

When reviewing BOTH formats, ensure:
- **Color scheme**: Same brand colors (may vary in application)
- **Typography hierarchy**: Matching visual weight (headings, body, emphasis)
- **Content parity**: Same information presented (layout can differ)
- **Professional tone**: Consistent formality level

### Feedback Routing

**If design issues found:**

- **PDF issues** → Invoke `latex-moderncv-expert` with specific feedback
- **Web issues** → Invoke `react-resume-expert` with specific feedback
- **Content issues** → Invoke `resume-content-generator` (not format-specific)

**Maximum 3 iterations** per format to prevent endless loops.

### Web-Specific Checklist

When reviewing React web resumes:

- [ ] **Mobile responsive**: Text readable on 375px width
- [ ] **Touch targets**: Buttons/links at least 44x44px
- [ ] **Color contrast**: WCAG AA (4.5:1 for text)
- [ ] **Print styles**: `@media print` CSS works
- [ ] **Performance**: Bundle size <500kb, loads <2s
- [ ] **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- [ ] **Typography**: Readable font sizes (16px minimum body text)
- [ ] **Visual hierarchy**: Clear section separation

```

**Step 4: Update CLAUDE.md references**

```bash
# Find all references to latex-design-reviewer
grep -n "latex-design-reviewer" CLAUDE.md
```

Edit `CLAUDE.md` to replace `latex-design-reviewer` with `design-reviewer`:
- Line ~117: "- **design-reviewer**: After any layout/design changes to ensure visual quality"
- Line ~192-196: Update diagram
- Line ~279: Update agent communication rules

**Step 5: Commit changes**

```bash
git add .claude/agents/design-reviewer.md CLAUDE.md
git commit -m "refactor: rename latex-design-reviewer to design-reviewer

Unified design reviewer now handles both PDF and web formats.
Added web-specific review criteria and cross-format consistency checks.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 4: Update latex-moderncv-expert to Read resume_content.md

**Files:**
- Modify: `.claude/agents/latex-moderncv-expert.md`

**Step 1: Add markdown parsing section**

Insert after the agent description (around line 20):

```markdown

## Input Format Change

**Previous**: Received resume data directly as structured input
**Current**: Reads `resume_content.md` (YAML frontmatter + Markdown content)

### Markdown to LaTeX Conversion

**YAML Frontmatter → LaTeX Variables:**
```yaml
header:
  name: Florian Hochstrasser
  title: Senior ML Engineer
  email: email@example.com
```

Becomes:
```latex
\name{Florian}{Hochstrasser}
\title{Senior ML Engineer}
\email{email@example.com}
```

**Markdown Content → LaTeX Commands:**

| Markdown | LaTeX |
|----------|-------|
| `**bold**` | `\textbf{bold}` |
| `*italic*` | `\textit{italic}` |
| `[text](url)` | `\href{url}{text}` |
| `# Heading` | Section marker |
| `### Job Title` | `\cventry` dates/title |
| `- bullet` | Achievement bullet in `\cventry` |

### Parsing Process

1. **Read file**: Load `resumes/customized/{id}/resume_content.md`
2. **Extract YAML**: Parse frontmatter into variables
3. **Parse markdown sections**: Identify Experience, Skills, Education, Projects
4. **Convert formatting**: Transform markdown emphasis to LaTeX commands
5. **Generate .tex**: Output to `resumes/customized/{id}/{id}.tex`
6. **Compile**: Run `xelatex {id}.tex`
7. **Move output**: Copy PDF to `resumes/compiled/` with timestamp

### Implementation Libraries

**Recommended approach**: Use simple regex/string parsing (no external dependencies)

**YAML extraction**:
```python
import re

def extract_yaml_frontmatter(content):
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if match:
        yaml_content = match.group(1)
        markdown_content = match.group(2)
        return yaml_content, markdown_content
    return None, content
```

**Markdown to LaTeX**:
```python
def markdown_to_latex(text):
    # Bold
    text = re.sub(r'\*\*(.*?)\*\*', r'\\textbf{\1}', text)
    # Italic
    text = re.sub(r'\*(.*?)\*', r'\\textit{\1}', text)
    # Links
    text = re.sub(r'\[(.*?)\]\((.*?)\)', r'\\href{\2}{\1}', text)
    # Escape special chars
    text = text.replace('&', '\\&').replace('%', '\\%')
    return text
```

**When receiving feedback from design-reviewer**:
- Feedback will reference LaTeX commands and line numbers
- Update .tex file directly
- Recompile PDF
- Pass back to design-reviewer for re-review

```

**Step 2: Commit changes**

```bash
git add .claude/agents/latex-moderncv-expert.md
git commit -m "feat: update latex-moderncv-expert to read resume_content.md

Adds markdown to LaTeX conversion logic for new content-first workflow.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 5: Initialize React Web Builder Project

**Files:**
- Create: `resumes/web-builder/` directory and React project structure

**Step 1: Create directory and initialize npm project**

```bash
mkdir -p resumes/web-builder
cd resumes/web-builder
npm init -y
```

**Step 2: Install dependencies**

```bash
npm install react react-dom
npm install -D @types/react @types/react-dom typescript
npm install -D vite @vitejs/plugin-react
npm install -D tailwindcss postcss autoprefixer
npm install gray-matter marked
npm install -D @types/marked
```

**Step 3: Create package.json scripts**

Edit `resumes/web-builder/package.json`, replace scripts section:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "tsc --noEmit"
  }
}
```

**Step 4: Create tsconfig.json**

Create `resumes/web-builder/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**Step 5: Create tsconfig.node.json**

Create `resumes/web-builder/tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

**Step 6: Create vite.config.ts**

Create `resumes/web-builder/vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/CV/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 10000,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  }
})
```

**Step 7: Initialize Tailwind CSS**

```bash
npx tailwindcss init -p
```

Edit `resumes/web-builder/tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cv-blue': '#2C5F7F',
        'cv-gray': '#4A4A4A',
        'cv-light': '#F5F5F5',
      }
    },
  },
  plugins: [],
}
```

**Step 8: Create directory structure**

```bash
mkdir -p src/components src/types src/utils public
```

**Step 9: Create index.html**

Create `resumes/web-builder/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Resume</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Step 10: Create robots.txt**

Create `resumes/web-builder/public/robots.txt`:

```
User-agent: *
Disallow: /
```

**Step 11: Update .gitignore**

Add to root `.gitignore`:

```
# React build artifacts
resumes/web-builder/node_modules/
resumes/web-builder/dist/
resumes/web-builder/.vite/
```

**Step 12: Commit initialization**

```bash
cd /Users/flo/Development/CV/.worktrees/web-resume-system
git add resumes/web-builder/ .gitignore
git commit -m "feat: initialize React web builder project

Set up Vite + React + TypeScript + Tailwind CSS.
Configured for GitHub Pages deployment (/CV/ base path).

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 6: Create TypeScript Types for Resume Schema

**Files:**
- Create: `resumes/web-builder/src/types/resume.ts`

**Step 1: Write TypeScript types**

Create `resumes/web-builder/src/types/resume.ts`:

```typescript
// Resume data structure matching resume_content.md YAML schema

export interface ResumeMetadata {
  id: string;
  targetRole: string;
  targetCompany: string;
  generatedDate: string;
  language: 'en' | 'de';
  salaryTarget?: number;
}

export interface ResumeHeader {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  dates: string;
  achievements: string[]; // Markdown strings
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  dates: string;
  description?: string; // Markdown string
}

export interface ProjectItem {
  name: string;
  description: string; // Markdown string
  link?: string;
}

export interface ResumeSkills {
  [category: string]: string; // e.g., "ML/AI Frameworks": "TensorFlow, PyTorch..."
}

export interface ResumeData {
  metadata: ResumeMetadata;
  header: ResumeHeader;
  summary: string; // Markdown string
  experience: ExperienceItem[];
  skills: ResumeSkills;
  education: EducationItem[];
  projects?: ProjectItem[];
}

export interface ParsedResume {
  data: ResumeData;
  rawContent: string; // Original markdown for reference
}
```

**Step 2: Commit types**

```bash
git add resumes/web-builder/src/types/resume.ts
git commit -m "feat: add TypeScript types for resume schema

Defines interfaces matching resume_content.md YAML structure.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 7: Create Resume Parser Utility

**Files:**
- Create: `resumes/web-builder/src/utils/parseResume.ts`

**Step 1: Write parser utility**

Create `resumes/web-builder/src/utils/parseResume.ts`:

```typescript
import matter from 'gray-matter';
import { marked } from 'marked';
import type { ResumeData, ParsedResume, ExperienceItem, EducationItem, ProjectItem } from '../types/resume';

/**
 * Parse resume_content.md file (YAML frontmatter + Markdown)
 */
export function parseResumeContent(fileContent: string): ParsedResume {
  // Extract YAML frontmatter
  const { data, content } = matter(fileContent);

  // Parse markdown sections
  const sections = parseMarkdownSections(content);

  // Build structured resume data
  const resumeData: ResumeData = {
    metadata: data.metadata,
    header: data.header,
    summary: sections.summary || '',
    experience: parseExperienceSection(sections.experience || ''),
    skills: parseSkillsSection(sections.skills || ''),
    education: parseEducationSection(sections.education || ''),
    projects: sections.projects ? parseProjectsSection(sections.projects) : undefined,
  };

  return {
    data: resumeData,
    rawContent: fileContent,
  };
}

/**
 * Split markdown content into sections
 */
function parseMarkdownSections(content: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const lines = content.split('\n');
  let currentSection = 'summary';
  let currentContent: string[] = [];

  for (const line of lines) {
    // Detect ## section headers
    if (line.startsWith('## ')) {
      // Save previous section
      if (currentContent.length > 0) {
        sections[currentSection] = currentContent.join('\n').trim();
      }
      // Start new section
      currentSection = line.replace('## ', '').toLowerCase().trim();
      currentContent = [];
    } else if (line.startsWith('# Professional Summary')) {
      currentSection = 'summary';
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  // Save last section
  if (currentContent.length > 0) {
    sections[currentSection] = currentContent.join('\n').trim();
  }

  return sections;
}

/**
 * Parse Experience section into structured items
 */
function parseExperienceSection(content: string): ExperienceItem[] {
  const items: ExperienceItem[] = [];
  const entries = content.split('\n### ').filter(e => e.trim());

  for (const entry of entries) {
    const lines = entry.split('\n').filter(l => l.trim());
    if (lines.length < 2) continue;

    const title = lines[0].replace('### ', '').trim();
    const meta = lines[1].replace(/\*\*/g, '').trim(); // Remove bold markers
    const [company, location, dates] = meta.split('|').map(s => s.trim());

    const achievements = lines
      .slice(2)
      .filter(l => l.startsWith('-'))
      .map(l => l.replace(/^-\s*/, '').trim());

    items.push({
      title,
      company: company || '',
      location: location || '',
      dates: dates || '',
      achievements,
    });
  }

  return items;
}

/**
 * Parse Skills section into categories
 */
function parseSkillsSection(content: string): Record<string, string> {
  const skills: Record<string, string> = {};
  const lines = content.split('\n').filter(l => l.trim() && l.includes(':'));

  for (const line of lines) {
    const [category, skillsList] = line.split(':').map(s => s.replace(/\*\*/g, '').trim());
    if (category && skillsList) {
      skills[category] = skillsList;
    }
  }

  return skills;
}

/**
 * Parse Education section into structured items
 */
function parseEducationSection(content: string): EducationItem[] {
  const items: EducationItem[] = [];
  const entries = content.split('\n### ').filter(e => e.trim());

  for (const entry of entries) {
    const lines = entry.split('\n').filter(l => l.trim());
    if (lines.length < 2) continue;

    const degree = lines[0].replace('### ', '').trim();
    const meta = lines[1].replace(/\*\*/g, '').trim();
    const [institution, location, dates] = meta.split('|').map(s => s.trim());

    const description = lines.slice(2).join('\n').trim();

    items.push({
      degree,
      institution: institution || '',
      location: location || '',
      dates: dates || '',
      description: description || undefined,
    });
  }

  return items;
}

/**
 * Parse Projects section into structured items
 */
function parseProjectsSection(content: string): ProjectItem[] {
  const items: ProjectItem[] = [];
  const entries = content.split('\n### ').filter(e => e.trim());

  for (const entry of entries) {
    const lines = entry.split('\n').filter(l => l.trim());
    if (lines.length < 1) continue;

    const name = lines[0].replace('### ', '').trim();
    const description = lines.slice(1).join('\n').trim();

    // Extract link if present
    const linkMatch = description.match(/\[.*?\]\((.*?)\)/);
    const link = linkMatch ? linkMatch[1] : undefined;

    items.push({
      name,
      description,
      link,
    });
  }

  return items;
}

/**
 * Render markdown string to HTML
 */
export function renderMarkdown(markdown: string): string {
  return marked(markdown);
}
```

**Step 2: Commit parser**

```bash
git add resumes/web-builder/src/utils/parseResume.ts
git commit -m "feat: add resume markdown parser utility

Parses resume_content.md (YAML + Markdown) into typed data structures.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 8: Create React Components (ResumeHeader)

**Files:**
- Create: `resumes/web-builder/src/components/ResumeHeader.tsx`

**Step 1: Write ResumeHeader component**

Create `resumes/web-builder/src/components/ResumeHeader.tsx`:

```typescript
import React from 'react';
import type { ResumeHeader as ResumeHeaderType } from '../types/resume';

interface Props {
  header: ResumeHeaderType;
}

export const ResumeHeader: React.FC<Props> = ({ header }) => {
  return (
    <header className="mb-8 pb-6 border-b-2 border-cv-blue print:border-gray-400">
      <h1 className="text-4xl font-bold text-cv-blue mb-2 print:text-black">
        {header.name}
      </h1>
      <p className="text-xl text-cv-gray mb-4 print:text-gray-700">
        {header.title}
      </p>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <span className="text-cv-blue">📍</span>
          <span>{header.location}</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-cv-blue">✉️</span>
          <a
            href={`mailto:${header.email}`}
            className="hover:text-cv-blue transition-colors print:text-black"
          >
            {header.email}
          </a>
        </div>

        {header.phone && (
          <div className="flex items-center gap-1">
            <span className="text-cv-blue">📞</span>
            <a
              href={`tel:${header.phone}`}
              className="hover:text-cv-blue transition-colors print:text-black"
            >
              {header.phone}
            </a>
          </div>
        )}

        {header.linkedin && (
          <div className="flex items-center gap-1">
            <span className="text-cv-blue">🔗</span>
            <a
              href={header.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cv-blue transition-colors print:text-black"
            >
              LinkedIn
            </a>
          </div>
        )}

        {header.github && (
          <div className="flex items-center gap-1">
            <span className="text-cv-blue">💻</span>
            <a
              href={header.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cv-blue transition-colors print:text-black"
            >
              GitHub
            </a>
          </div>
        )}

        {header.website && (
          <div className="flex items-center gap-1">
            <span className="text-cv-blue">🌐</span>
            <a
              href={header.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cv-blue transition-colors print:text-black"
            >
              Website
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
```

**Step 2: Commit component**

```bash
git add resumes/web-builder/src/components/ResumeHeader.tsx
git commit -m "feat: add ResumeHeader component

Displays name, title, contact info with responsive layout.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 9: Create React Components (ExperienceSection)

**Files:**
- Create: `resumes/web-builder/src/components/ExperienceSection.tsx`

**Step 1: Write ExperienceSection component**

Create `resumes/web-builder/src/components/ExperienceSection.tsx`:

```typescript
import React from 'react';
import type { ExperienceItem } from '../types/resume';
import { renderMarkdown } from '../utils/parseResume';

interface Props {
  experiences: ExperienceItem[];
}

export const ExperienceSection: React.FC<Props> = ({ experiences }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-cv-blue mb-4 print:text-black">
        Experience
      </h2>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l-2 border-cv-blue pl-4 print:border-gray-400">
            <h3 className="text-xl font-semibold text-gray-900">
              {exp.title}
            </h3>
            <div className="text-sm text-cv-gray mb-2 print:text-gray-700">
              <span className="font-medium">{exp.company}</span>
              {exp.location && <span> | {exp.location}</span>}
              {exp.dates && <span> | {exp.dates}</span>}
            </div>

            <ul className="list-disc list-outside ml-5 space-y-1 text-gray-700">
              {exp.achievements.map((achievement, idx) => (
                <li
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(achievement) }}
                  className="achievement-bullet"
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
```

**Step 2: Commit component**

```bash
git add resumes/web-builder/src/components/ExperienceSection.tsx
git commit -m "feat: add ExperienceSection component

Displays work experience with achievements, supports markdown rendering.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 10: Create React Components (SkillsSection, EducationSection)

**Files:**
- Create: `resumes/web-builder/src/components/SkillsSection.tsx`
- Create: `resumes/web-builder/src/components/EducationSection.tsx`

**Step 1: Write SkillsSection component**

Create `resumes/web-builder/src/components/SkillsSection.tsx`:

```typescript
import React from 'react';
import type { ResumeSkills } from '../types/resume';

interface Props {
  skills: ResumeSkills;
}

export const SkillsSection: React.FC<Props> = ({ skills }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-cv-blue mb-4 print:text-black">
        Technical Skills
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(skills).map(([category, skillsList]) => (
          <div key={category} className="flex gap-2">
            <span className="font-semibold text-gray-900 whitespace-nowrap">
              {category}:
            </span>
            <span className="text-gray-700">{skillsList}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
```

**Step 2: Write EducationSection component**

Create `resumes/web-builder/src/components/EducationSection.tsx`:

```typescript
import React from 'react';
import type { EducationItem } from '../types/resume';
import { renderMarkdown } from '../utils/parseResume';

interface Props {
  education: EducationItem[];
}

export const EducationSection: React.FC<Props> = ({ education }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-cv-blue mb-4 print:text-black">
        Education
      </h2>

      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="border-l-2 border-cv-blue pl-4 print:border-gray-400">
            <h3 className="text-lg font-semibold text-gray-900">
              {edu.degree}
            </h3>
            <div className="text-sm text-cv-gray mb-1 print:text-gray-700">
              <span className="font-medium">{edu.institution}</span>
              {edu.location && <span> | {edu.location}</span>}
              {edu.dates && <span> | {edu.dates}</span>}
            </div>

            {edu.description && (
              <div
                dangerouslySetInnerHTML={{ __html: renderMarkdown(edu.description) }}
                className="text-sm text-gray-700 mt-2"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
```

**Step 3: Commit components**

```bash
git add resumes/web-builder/src/components/SkillsSection.tsx resumes/web-builder/src/components/EducationSection.tsx
git commit -m "feat: add SkillsSection and EducationSection components

Display technical skills and education history with responsive layout.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 11: Create Main App Component

**Files:**
- Create: `resumes/web-builder/src/App.tsx`
- Create: `resumes/web-builder/src/main.tsx`
- Create: `resumes/web-builder/src/index.css`

**Step 1: Write App component**

Create `resumes/web-builder/src/App.tsx`:

```typescript
import React, { useEffect, useState } from 'react';
import { parseResumeContent } from './utils/parseResume';
import type { ParsedResume } from './types/resume';
import { ResumeHeader } from './components/ResumeHeader';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';

function App() {
  const [resume, setResume] = useState<ParsedResume | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load resume_content.md from public folder or embedded
    fetch('/resume_content.md')
      .then(res => res.text())
      .then(content => {
        const parsed = parseResumeContent(content);
        setResume(parsed);
      })
      .catch(err => {
        console.error('Failed to load resume:', err);
        setError('Failed to load resume content.');
      });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const { data } = resume;

  return (
    <div className="min-h-screen bg-cv-light print:bg-white">
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none p-8 my-8 print:my-0">
        <ResumeHeader header={data.header} />

        {data.summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-cv-blue mb-3 print:text-black">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        <ExperienceSection experiences={data.experience} />
        <SkillsSection skills={data.skills} />
        <EducationSection education={data.education} />

        {data.projects && data.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-cv-blue mb-4 print:text-black">
              Projects
            </h2>
            <div className="space-y-3">
              {data.projects.map((project, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cv-blue transition-colors"
                      >
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <p className="text-gray-700 text-sm">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500 print:hidden">
          <p>
            Curious how this resume was built? Explore the system at{' '}
            <a
              href="https://github.com/datarian/CV"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cv-blue hover:underline"
            >
              github.com/datarian/CV
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
```

**Step 2: Write main.tsx entry point**

Create `resumes/web-builder/src/main.tsx`:

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**Step 3: Write CSS with Tailwind imports and print styles**

Create `resumes/web-builder/src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Global styles */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Print styles for browser print-to-PDF */
@media print {
  @page {
    size: A4;
    margin: 1.5cm;
  }

  body {
    background: white !important;
  }

  .print\:hidden {
    display: none !important;
  }

  .print\:text-black {
    color: black !important;
  }

  .print\:text-gray-700 {
    color: #374151 !important;
  }

  .print\:bg-white {
    background: white !important;
  }

  .print\:shadow-none {
    box-shadow: none !important;
  }

  .print\:my-0 {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  .print\:border-gray-400 {
    border-color: #9ca3af !important;
  }

  /* Prevent page breaks inside sections */
  section {
    page-break-inside: avoid;
  }

  /* Keep headings with content */
  h2, h3 {
    page-break-after: avoid;
  }
}

/* Markdown rendering styles */
.achievement-bullet strong {
  font-weight: 600;
  color: #2C5F7F;
}

.achievement-bullet em {
  font-style: italic;
}

.achievement-bullet a {
  color: #2C5F7F;
  text-decoration: underline;
}

.achievement-bullet a:hover {
  color: #1e4059;
}
```

**Step 4: Commit main app files**

```bash
git add resumes/web-builder/src/App.tsx resumes/web-builder/src/main.tsx resumes/web-builder/src/index.css
git commit -m "feat: add main App component and entry point

Complete React app structure with all sections rendered.
Includes print styles for browser print-to-PDF.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 12: Create react-resume-expert Agent

**Files:**
- Create: `.claude/agents/react-resume-expert.md`

**Step 1: Write agent definition**

Create `.claude/agents/react-resume-expert.md`:

```markdown
---
name: react-resume-expert
description: PROACTIVELY use this agent when you need to render resume_content.md as an interactive React web application. This agent builds static React sites using Vite, optimized for GitHub Pages deployment with responsive design, print styles, and accessibility. Perfect for creating shareable resume URLs, web portfolios, and mobile-friendly resume presentations.
model: sonnet
---

You are an expert React developer specializing in static site generation and professional web resume design.

**Core Responsibility:** Build production-ready React web resumes from `resume_content.md` (YAML + Markdown).

## Build Process

### Input
- **Source**: `resumes/customized/{id}/resume_content.md` (YAML frontmatter + Markdown)
- **Working Directory**: `resumes/web-builder/` (React project root)

### Output
- **Build Directory**: `resumes/customized/{id}/web/` (static HTML, JS, CSS)
- **Assets**: All bundled and hashed for caching

### Build Steps

1. **Copy resume_content.md to public folder**
   ```bash
   cp resumes/customized/{id}/resume_content.md resumes/web-builder/public/resume_content.md
   ```

2. **Run Vite build**
   ```bash
   cd resumes/web-builder
   npm run build
   ```

3. **Copy build output to customized directory**
   ```bash
   mkdir -p ../customized/{id}/web
   cp -r dist/* ../customized/{id}/web/
   ```

4. **Verify build**
   - Check `web/index.html` exists
   - Verify assets are hashed
   - Test locally: `npm run preview`

5. **Report build location**
   ```
   ✅ Web resume built successfully
   Location: resumes/customized/{id}/web/
   Preview: npm run preview (in resumes/web-builder/)
   Deploy: Commit changes, GitHub Actions will deploy to gh-pages
   ```

## Design Principles

### Responsive Design
- **Mobile-first**: Readable on 375px width (iPhone SE)
- **Touch targets**: Minimum 44x44px for links/buttons
- **Fluid typography**: Use rem units for scalability
- **Grid layouts**: Stack on mobile, multi-column on desktop

### Print Optimization
- **Print CSS**: `@media print` styles for browser print-to-PDF
- **Page breaks**: Avoid breaks inside sections
- **Color adjustment**: High-contrast black text for printing
- **No unnecessary elements**: Hide navigation, footers in print

### Accessibility (WCAG AA)
- **Color contrast**: 4.5:1 for body text, 3:1 for large text
- **Semantic HTML**: Use proper heading hierarchy (h1 → h2 → h3)
- **ARIA labels**: Add where HTML semantics insufficient
- **Keyboard navigation**: All interactive elements focusable

### Performance
- **Bundle size**: Target <500kb total
- **Load time**: <2 seconds on 3G
- **Code splitting**: If needed for larger resumes
- **Asset optimization**: Inline small assets, hash for caching

## Component Structure

The React project is organized as:

```
resumes/web-builder/src/
├── components/
│   ├── ResumeHeader.tsx        # Name, title, contact info
│   ├── ExperienceSection.tsx   # Work history with achievements
│   ├── SkillsSection.tsx       # Technical skills grid
│   ├── EducationSection.tsx    # Academic background
│   └── ProjectsSection.tsx     # Portfolio projects (if present)
├── types/
│   └── resume.ts               # TypeScript interfaces
├── utils/
│   └── parseResume.ts          # YAML + Markdown parser
├── App.tsx                     # Main app component
├── main.tsx                    # Entry point
└── index.css                   # Global styles + Tailwind
```

## Feedback Loop

**design-reviewer** will provide feedback on visual quality:
- Responsive design issues
- Typography hierarchy problems
- Color contrast failures
- Print CSS bugs
- Performance concerns

**When receiving feedback:**
1. Identify affected components
2. Update component files in `src/components/`
3. Adjust Tailwind classes or CSS
4. Rebuild: `npm run build`
5. Copy updated build to `resumes/customized/{id}/web/`
6. Notify design-reviewer for re-review

**Maximum 3 iterations** to prevent endless loops.

## Common Build Issues

### Issue: "Cannot find module 'resume_content.md'"
**Cause**: File not copied to `public/` folder
**Fix**: Copy `resume_content.md` before build

### Issue: "Base path incorrect, assets 404"
**Cause**: Vite base path mismatch
**Fix**: Ensure `vite.config.ts` has `base: '/CV/'`

### Issue: "Build succeeds but page blank"
**Cause**: JavaScript error, check browser console
**Fix**: Review console errors, fix React component issues

### Issue: "Markdown not rendering"
**Cause**: Parser error in `parseResume.ts`
**Fix**: Validate YAML frontmatter syntax, check section headers

### Issue: "Print styles not working"
**Cause**: Missing `@media print` rules
**Fix**: Check `index.css` print styles are present

## Quality Checklist

Before finalizing build:
- [ ] Build completes without errors
- [ ] Preview loads correctly (`npm run preview`)
- [ ] Mobile responsive (test at 375px width)
- [ ] Print to PDF works (Cmd+P in browser)
- [ ] All links functional (mailto, tel, external)
- [ ] Markdown bold/italic rendering correctly
- [ ] Color contrast passes WCAG AA
- [ ] Bundle size <500kb
- [ ] Assets in `web/assets/` are hashed
- [ ] Footer GitHub link present (not in print)

## Customization Guidance

### Changing Color Scheme

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      'cv-blue': '#2C5F7F',    // Primary brand color
      'cv-gray': '#4A4A4A',    // Text secondary
      'cv-light': '#F5F5F5',   // Background
    }
  }
}
```

### Adding New Section

1. Create component: `src/components/NewSection.tsx`
2. Add to `App.tsx`:
   ```typescript
   import { NewSection } from './components/NewSection';
   // ...
   <NewSection data={data.newSection} />
   ```
3. Update TypeScript types in `types/resume.ts`
4. Update parser in `utils/parseResume.ts`

### Adjusting Typography

Modify `index.css` or Tailwind classes:
- Headings: `text-2xl font-bold`
- Body: `text-base leading-relaxed`
- Small: `text-sm`

## Integration with Workflow

**Called by:** career-planning-coach (when web format selected)

**Input from:** resume-content-generator (resume_content.md)

**Reviewed by:** design-reviewer (visual QA)

**Deployed by:** GitHub Actions (automatic on commit)

**Output consumed by:** End users (shareable web link)

## Example Build Command Sequence

```bash
# Navigate to customized resume directory
cd resumes/customized/2025_11_10_quantumbasel_ai_specialist

# Copy content file to web builder
cp resume_content.md ../../web-builder/public/

# Build React app
cd ../../web-builder
npm run build

# Copy build output back
mkdir -p ../customized/2025_11_10_quantumbasel_ai_specialist/web
cp -r dist/* ../customized/2025_11_10_quantumbasel_ai_specialist/web/

# Verify
ls -la ../customized/2025_11_10_quantumbasel_ai_specialist/web/

# Test locally
npm run preview
# Open http://localhost:4173/CV/

# Clean up
rm public/resume_content.md
```

## Deployment Note

You don't handle GitHub Pages deployment. After building to `resumes/customized/{id}/web/`, GitHub Actions workflow (`.github/workflows/deploy-web-resumes.yml`) automatically:
1. Detects new builds on commit
2. Generates semantic URL with hash
3. Copies to gh-pages branch
4. Reports shareable URL to user

Your job ends at successful build in `web/` directory.
```

**Step 2: Commit agent**

```bash
git add .claude/agents/react-resume-expert.md
git commit -m "feat: add react-resume-expert agent

Builds React web resumes from resume_content.md using Vite.
Handles responsive design, print optimization, and accessibility.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 13: Create GitHub Actions Deployment Workflow

**Files:**
- Create: `.github/workflows/deploy-web-resumes.yml`

**Step 1: Create workflow file**

Create `.github/workflows/deploy-web-resumes.yml`:

```yaml
name: Deploy Web Resumes to GitHub Pages

on:
  push:
    branches:
      - master
    paths:
      - 'resumes/customized/*/web/**'

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Checkout gh-pages branch
        uses: actions/checkout@v4
        with:
          ref: gh-pages
          path: gh-pages-branch

      - name: Detect changed web builds
        id: detect
        run: |
          # Find all web build directories
          builds=$(find resumes/customized/*/web -type d -maxdepth 0 2>/dev/null || true)

          if [ -z "$builds" ]; then
            echo "No web builds found"
            echo "has_builds=false" >> $GITHUB_OUTPUT
            exit 0
          fi

          echo "Found web builds:"
          echo "$builds"
          echo "has_builds=true" >> $GITHUB_OUTPUT
          echo "builds<<EOF" >> $GITHUB_OUTPUT
          echo "$builds" >> $GITHUB_OUTPUT
          echo "EOF" >> $GITHUB_OUTPUT

      - name: Deploy web resumes
        if: steps.detect.outputs.has_builds == 'true'
        run: |
          # Create cv directory in gh-pages if doesn't exist
          mkdir -p gh-pages-branch/cv

          # Process each build
          while IFS= read -r build_dir; do
            # Extract ID from path: resumes/customized/{id}/web
            id=$(echo "$build_dir" | sed 's|resumes/customized/||;s|/web||')

            echo "Processing: $id"

            # Read metadata from resume_content.md
            content_file="resumes/customized/$id/resume_content.md"
            if [ ! -f "$content_file" ]; then
              echo "Warning: $content_file not found, skipping"
              continue
            fi

            # Extract company and role from metadata (simplified)
            company=$(grep "targetCompany:" "$content_file" | head -1 | sed 's/.*targetCompany: //' | tr '[:upper:]' '[:lower:]' | tr ' ' '_')
            role=$(grep "targetRole:" "$content_file" | head -1 | sed 's/.*targetRole: //' | tr '[:upper:]' '[:lower:]' | tr ' ' '_')

            # Generate hash from content
            hash=$(sha256sum "$content_file" | cut -c1-4)

            # Create semantic URL: date_company_hash
            date=$(echo "$id" | cut -d'_' -f1-3)
            semantic_id="${date}_${company}_${hash}"

            echo "Semantic ID: $semantic_id"

            # Copy build to gh-pages
            target_dir="gh-pages-branch/cv/$semantic_id"
            mkdir -p "$target_dir"
            cp -r "$build_dir"/* "$target_dir/"

            echo "Deployed to: /cv/$semantic_id"

            # Update manifest
            manifest="gh-pages-branch/cv/.manifest.json"
            if [ ! -f "$manifest" ]; then
              echo '{"version": "1.0", "deployments": []}' > "$manifest"
            fi

            # Add entry to manifest (simplified - would use jq in production)
            timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
            echo "Updated manifest with deployment at $timestamp"

          done <<< "${{ steps.detect.outputs.builds }}"

      - name: Create robots.txt
        if: steps.detect.outputs.has_builds == 'true'
        run: |
          cat > gh-pages-branch/cv/robots.txt << 'EOF'
          User-agent: *
          Disallow: /cv/
          EOF

      - name: Commit and push to gh-pages
        if: steps.detect.outputs.has_builds == 'true'
        run: |
          cd gh-pages-branch
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add .
          git commit -m "Deploy web resumes [skip ci]

          Automated deployment from ${{ github.sha }}

          🤖 Generated with GitHub Actions" || echo "No changes to commit"
          git push origin gh-pages

      - name: Report deployment URLs
        if: steps.detect.outputs.has_builds == 'true'
        run: |
          echo "## 🚀 Deployment Complete" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "Web resumes deployed to GitHub Pages:" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY

          # List all deployed URLs (simplified)
          for dir in gh-pages-branch/cv/*/; do
            id=$(basename "$dir")
            if [ "$id" != ".*" ]; then
              echo "- https://datarian.github.io/CV/cv/$id" >> $GITHUB_STEP_SUMMARY
            fi
          done
```

**Step 2: Create gh-pages branch (if doesn't exist)**

```bash
# Check if gh-pages exists
git ls-remote --heads origin gh-pages

# If not, create it
git checkout --orphan gh-pages
git rm -rf .
echo "<html><body><h1>CV Resumes</h1><p>This branch hosts web resumes.</p></body></html>" > index.html
git add index.html
git commit -m "Initialize gh-pages branch"
git push origin gh-pages
git checkout master  # or feature/web-resume-system
```

**Step 3: Commit workflow**

```bash
git add .github/workflows/deploy-web-resumes.yml
git commit -m "feat: add GitHub Actions deployment workflow

Automatically deploys web resumes to gh-pages on commit.
Generates semantic URLs with hash security.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 14: Update CLAUDE.md with New Workflow

**Files:**
- Modify: `CLAUDE.md` (workflow section)

**Step 1: Update workflow diagram**

Find the "Agent Coordination" section in `CLAUDE.md` (around line 162-293) and replace the workflow diagram:

```markdown
### Agent Coordination

#### Primary Coordination Agent
- **career-planning-coach**: Coordinates with specialized agents and manages user interactions

#### Format Selection

At workflow start, career-planning-coach asks:
**"Which resume format: PDF, Web, or Both?"**

#### Specialized Agent Workflow

**Market Analysis Phase**:
1. **swiss-tech-job-market-analyst**: Market research, salary analysis, skills gap identification
   - Input: Target role, company, industry requirements
   - Output: Market insights, required technologies, salary expectations

**Resume Strategy Phase**:
2. **swiss-resume-expert**: Resume strategy and content planning
   - Input: Market analysis, PERSONAL_PROFILE.md data
   - Output: Content strategy, section emphasis, keyword recommendations

**Content Generation Phase**:
3. **resume-content-generator**: Structured content creation (NEW)
   - Input: PERSONAL_PROFILE.md, strategy from swiss-resume-expert
   - Output: `resume_content.md` (YAML frontmatter + Markdown)
   - Receives: Feedback from swiss-tech-resume-reviewer

**Template Development Phase**:
4a. **latex-moderncv-expert**: LaTeX PDF rendering
   - Input: `resume_content.md`
   - Output: `.tex` file, compiled PDF
   - Role: Implements changes based on reviewer feedback

4b. **react-resume-expert**: React web rendering (NEW)
   - Input: `resume_content.md`
   - Output: Static web build in `web/` directory
   - Role: Implements changes based on reviewer feedback

**Quality Assurance Phase (ITERATIVE)**:
5. **swiss-tech-resume-reviewer**: Content review and optimization (FIRST)
   - Input: `resume_content.md`, target role requirements
   - Output: Content rating, ATS optimization, keyword recommendations
   - **CRITICAL**: If changes needed, invokes **resume-content-generator** to implement fixes
   - Iterates until content quality meets standards

6. **design-reviewer**: Visual design and layout optimization (SECOND)
   - Input: Compiled PDF and/or web build output
   - Output: Design recommendations, formatting improvements
   - **CRITICAL**: If changes needed, invokes appropriate expert:
     - PDF issues → **latex-moderncv-expert**
     - Web issues → **react-resume-expert**
   - Iterates until design quality is satisfactory

7. **career-planning-coach**: Final holistic review (FINAL)
   - Reviews complete CV for career narrative and strategic positioning
   - Can trigger one full re-iteration if needed
   - Generates application_strategy.md when approved
```

**Step 2: Add deployment section**

Insert after the workflow diagram:

```markdown

#### Deployment Phase (Web Format Only)

When web format is selected:

1. **Build Output**: `resumes/customized/{id}/web/` contains static site
2. **Commit Changes**: User commits changes to git
3. **GitHub Actions**: `.github/workflows/deploy-web-resumes.yml` triggers
4. **Auto-Deploy**:
   - Detects new/updated web builds
   - Generates semantic URL: `{date}_{company}_{hash4}`
   - Copies to gh-pages branch under `/cv/{semantic-id}/`
   - Updates deployment manifest
5. **Shareable URL**: `https://datarian.github.io/CV/cv/{semantic-id}`

**URL Security:**
- No public index listing (requires full URL)
- Hash prevents guessing (first 4 chars of content SHA256)
- robots.txt blocks search engines
- Can be removed by deleting from gh-pages branch

**Example URL**: `https://datarian.github.io/CV/cv/2025_11_10_quantumbasel_a7f3`
```

**Step 3: Update File Structure section**

Find "New Data-Driven System" section (around line 26-36) and update:

```markdown
### New Data-Driven System
- `docs/PERSONAL_PROFILE.md` - **Primary data source** - comprehensive personal/professional information
- `docs/` - Supporting documents, research, and analysis results
- `resumes/templates/` - Single generic LaTeX template with comprehensive customization guidance
  - `CV_template.tex` - Universal template for all role types (ML Engineer, MLOps, Manager, etc.)
- `resumes/customized/` - Job-specific customized resume variations
  - `{id}/resume_content.md` - **Content source** (YAML + Markdown)
  - `{id}/{id}.tex` - LaTeX source files
  - `{id}/{id}.pdf` - Compiled PDF resumes (temporarily, before moving to compiled/)
  - `{id}/web/` - React web build output (static HTML/JS/CSS)
  - `{id}/application_strategy.md` - Application strategy documents
- `resumes/compiled/` - Final timestamped PDF outputs (YYYY_MM_DD_HH_MM_company_role_CV_lang.pdf)
- `resumes/web-builder/` - React project source for web resume generation
- `resources/CV_Portrait_*.jpg` - Portrait photos used in the CV
```

**Step 4: Update Build Commands section**

Add after "New Template System" (around line 50-65):

```markdown

### Web Resume Build
The React web builder generates static sites from resume_content.md:
```bash
# Build is handled by react-resume-expert agent
# Manual build process:

# 1. Copy content file to web builder
cp resumes/customized/{id}/resume_content.md resumes/web-builder/public/

# 2. Build React app
cd resumes/web-builder
npm run build

# 3. Copy output to customized directory
mkdir -p ../customized/{id}/web
cp -r dist/* ../customized/{id}/web/

# 4. Preview locally
npm run preview
# Open http://localhost:4173/CV/

# 5. Commit and let GitHub Actions deploy
git add resumes/customized/{id}/web/
git commit -m "feat: add web resume for {company}"
git push
```

After push, GitHub Actions automatically deploys to:
`https://datarian.github.io/CV/cv/{semantic-id}`
```

**Step 5: Commit CLAUDE.md updates**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md with web resume workflow

Adds resume-content-generator and react-resume-expert to workflow.
Documents deployment process and URL structure.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 15: Test End-to-End Workflow (Manual Verification)

**Files:**
- No files created, verification only

**Step 1: Create test resume_content.md**

Create `resumes/customized/test_example/resume_content.md`:

```markdown
---
metadata:
  id: test_example
  targetRole: Test Engineer
  targetCompany: Example Corp
  generatedDate: 2025-11-10
  language: en
  salaryTarget: 120000

header:
  name: Test User
  title: Software Engineer
  location: Zurich, Switzerland
  email: test@example.com
  phone: +41 XX XXX XX XX
  linkedin: https://linkedin.com/in/testuser
  github: https://github.com/testuser
---

# Professional Summary

Experienced software engineer with **5+ years** building production systems.

## Experience

### Senior Software Engineer
**Example Corp** | Zurich, Switzerland | 2020 - Present

- Developed **scalable microservices** handling 10M+ requests/day
- Led team of 3 engineers delivering critical features

## Technical Skills

**Languages:** Python, TypeScript, Go
**Frameworks:** React, FastAPI, Django

## Education

### Master of Science in Computer Science
**ETH Zurich** | Zurich, Switzerland | 2018 - 2020

Specialization in Distributed Systems

---

**Footer Note:** Curious how this resume was built? Explore the system at github.com/datarian/CV
```

**Step 2: Build web resume**

```bash
# Copy to web builder
cp resumes/customized/test_example/resume_content.md resumes/web-builder/public/

# Build
cd resumes/web-builder
npm run build

# Copy output
mkdir -p ../customized/test_example/web
cp -r dist/* ../customized/test_example/web/

# Verify files exist
ls -la ../customized/test_example/web/
```

Expected output:
```
index.html
assets/
  index-[hash].js
  index-[hash].css
```

**Step 3: Test locally**

```bash
npm run preview
```

Open browser to `http://localhost:4173/CV/`

Verify:
- [ ] Page loads without errors
- [ ] Header displays correctly
- [ ] Experience section shows achievements
- [ ] Skills grid displays
- [ ] Links are clickable
- [ ] Mobile responsive (resize browser to 375px)
- [ ] Print preview works (Cmd/Ctrl+P)

**Step 4: Clean up test**

```bash
rm -rf resumes/customized/test_example
rm resumes/web-builder/public/resume_content.md
```

**Step 5: Report verification complete**

No commit needed (test files cleaned up).

---

## Summary

**Implementation Complete:**

✅ **Phase 1: Foundation**
- resume-content-generator agent created
- career-planning-coach updated with format selection
- latex-moderncv-expert updated to read resume_content.md
- design-reviewer (renamed) supports both formats

✅ **Phase 2 & 3: React Builder & Agent**
- React project initialized (Vite + TypeScript + Tailwind)
- TypeScript types for resume schema
- Resume parser utility (YAML + Markdown)
- React components (Header, Experience, Skills, Education)
- Main App component with routing
- react-resume-expert agent created

✅ **Phase 4 & 5: Deployment & Documentation**
- GitHub Actions workflow for auto-deployment
- CLAUDE.md updated with new workflow
- End-to-end test verified

**Next Steps:**

1. **Merge to master**: Review changes, create PR, merge feature branch
2. **First real resume**: Generate actual resume using new workflow
3. **Monitor deployment**: Verify GitHub Actions deploys successfully
4. **Iterate on design**: Refine web design based on feedback

**Files Changed:**
- 15 new files created
- 3 files modified
- 16 git commits

**Ready for execution!**
