# Web Resume System Design

**Date:** 2025-11-10
**Status:** Approved
**Author:** Florian Hochstrasser (with Claude Code)

## Overview

This design extends the existing LaTeX-based CV generation system to support interactive React web resumes with automated GitHub Pages deployment. Users will be able to generate resumes in PDF format, web format, or both simultaneously from a single content source.

## Motivation

**Problem:** LaTeX PDFs are excellent for formal applications but have limitations:
- Not easily shareable via link (requires email attachments)
- No interactivity or dynamic features
- Difficult to view on mobile devices optimally

**Solution:** Add React-based web resume generation that:
- Auto-deploys to GitHub Pages with unique, non-discoverable URLs
- Provides shareable links for quick distribution
- Maintains modern, interactive web design aesthetic
- Shares content pipeline with LaTeX to avoid duplication

**User Experience Goal:** Generate both PDF and web resume from single workflow, receive shareable link automatically after commit.

## Architecture

### Agent Hierarchy (Updated)

```
career-planning-coach (orchestrator)
    ├── swiss-tech-job-market-analyst (market research)
    ├── swiss-resume-expert (content strategy)
    │
    ├── resume-content-generator (NEW) ⭐
    │   └── PERSONAL_PROFILE.md + strategy → resume_content.md
    │
    ├── latex-moderncv-expert (LaTeX renderer)
    │   └── resume_content.md → .tex → PDF
    │
    ├── react-resume-expert (NEW) ⭐
    │   └── resume_content.md → React SPA → static build
    │
    ├── swiss-tech-resume-reviewer (content QA)
    │   └── Reviews resume_content.md, provides feedback to generator
    │
    ├── design-reviewer (RENAMED from latex-design-reviewer) ⭐
    │   └── Reviews both PDF and web outputs for visual quality
    │
    └── Application strategy generation
```

### New Agents

#### 1. resume-content-generator
**Purpose:** Generate structured resume content from PERSONAL_PROFILE.md
**Input:**
- `docs/PERSONAL_PROFILE.md` (data source)
- Strategy from `swiss-resume-expert` (emphasis, keywords, sections)
- Target role/company information

**Output:** `resumes/customized/{id}/resume_content.md` (YAML frontmatter + Markdown)

**Responsibilities:**
- Select relevant experiences, skills, projects for target role
- Apply strategic emphasis (e.g., highlight MLOps over pure data science)
- Incorporate ATS keywords from market analysis
- Generate compelling achievement bullets with metrics
- Output human-readable, git-friendly markdown

**Feedback Loop:** Receives content suggestions from swiss-tech-resume-reviewer, iterates on resume_content.md

#### 2. react-resume-expert
**Purpose:** Render resume_content.md as interactive React web application
**Input:** `resume_content.md`

**Output:** `resumes/customized/{id}/web/` (static build directory)

**Technology Stack:**
- React 18 + TypeScript
- Tailwind CSS (styling)
- Vite (build tool)
- gray-matter (YAML parsing)
- react-markdown (markdown rendering)

**Responsibilities:**
- Parse YAML frontmatter and markdown content
- Render responsive, mobile-friendly web interface
- Generate print-optimized CSS (browser print to PDF)
- Ensure accessibility (WCAG AA compliance)
- Create single-page optimized bundle

**Feedback Loop:** Receives design feedback from design-reviewer, adjusts components/styling

### Modified Agents

#### 3. design-reviewer (renamed from latex-design-reviewer)
**Purpose:** Unified visual quality assurance for both formats

**New Capabilities:**
- Review both PDF and web outputs
- Format-aware feedback:
  - PDF: LaTeX commands, moderncv styling
  - Web: CSS classes, React component structure, responsive design
- Ensure visual consistency across formats (color scheme, typography hierarchy)

#### 4. career-planning-coach
**New Responsibilities:**
- Prompt user for format selection: "PDF", "Web", or "Both"
- Orchestrate content generation → parallel rendering pipeline
- After successful deployment, provide shareable URLs to user
- Update workflow documentation in final output

#### 5. latex-moderncv-expert
**Updated Input:** Now reads `resume_content.md` instead of receiving direct data
**New Responsibility:** Markdown → LaTeX conversion (bold, italic, links, lists)

## Data Flow

### Content Generation Phase

```
PERSONAL_PROFILE.md (source of truth)
         ↓
swiss-resume-expert (strategy)
         ↓
resume-content-generator
         ↓
resume_content.md (YAML + Markdown)
         ↓
swiss-tech-resume-reviewer (content QA)
         ↓ (iterate if needed)
resume-content-generator (revisions)
```

### Rendering Phase (Parallel)

```
resume_content.md (approved content)
         ↓
    ┌────┴────┐
    ↓         ↓
latex-      react-
moderncv    resume
-expert     -expert
    ↓         ↓
  .tex      React
    ↓       build
xelatex      ↓
    ↓       web/
  .pdf    (static)
    ↓         ↓
    └────┬────┘
         ↓
design-reviewer (visual QA)
         ↓ (iterate if needed)
respective expert (fixes)
         ↓
career-planning-coach (final approval)
```

### Deployment Phase

```
git commit (web/ changes)
         ↓
GitHub Actions triggered
         ↓
Deploy to gh-pages branch
         ↓
Generate shareable URL
         ↓
User receives link
```

## File Structure

### Repository Organization

```
/Users/flo/Development/CV/
├── docs/
│   ├── PERSONAL_PROFILE.md          # Single source of truth
│   └── plans/
│       └── 2025-11-10-web-resume-system-design.md
│
├── resumes/
│   ├── templates/
│   │   └── CV_template.tex          # LaTeX template (unchanged)
│   │
│   ├── customized/
│   │   └── {id}/                    # Per-application directory
│   │       ├── resume_content.md    # ⭐ Content source (YAML + MD)
│   │       ├── {id}.tex             # Generated LaTeX
│   │       ├── {id}.pdf             # Compiled PDF
│   │       ├── web/                 # ⭐ React build output
│   │       │   ├── index.html
│   │       │   ├── assets/
│   │       │   │   ├── index-[hash].js
│   │       │   │   └── index-[hash].css
│   │       │   └── resume-content.md  # Embedded for reference
│   │       └── application_strategy.md
│   │
│   ├── compiled/                    # Final PDFs with timestamps
│   │   └── YYYY_MM_DD_HH_MM_{id}_CV_en.pdf
│   │
│   └── web-builder/                 # ⭐ React project source
│       ├── src/
│       │   ├── components/
│       │   │   ├── ResumeHeader.tsx
│       │   │   ├── ExperienceSection.tsx
│       │   │   ├── SkillsSection.tsx
│       │   │   ├── EducationSection.tsx
│       │   │   └── ProjectsSection.tsx
│       │   ├── types/
│       │   │   └── resume.ts         # TypeScript types for YAML schema
│       │   ├── utils/
│       │   │   └── parseResume.ts    # YAML + MD parser
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── public/
│       │   └── robots.txt            # Disallow search indexing
│       ├── package.json
│       ├── vite.config.ts
│       ├── tailwind.config.js
│       └── tsconfig.json
│
├── .github/
│   └── workflows/
│       └── deploy-web-resumes.yml    # ⭐ Auto-deployment workflow
│
└── .gitignore                        # Exclude node_modules, build artifacts
```

### resume_content.md Format

**YAML Frontmatter + Markdown Sections**

```markdown
---
metadata:
  id: 2025_11_10_quantumbasel_ai_specialist
  targetRole: AI Specialist
  targetCompany: Quantum Basel
  generatedDate: 2025-11-10
  language: en
  salaryTarget: 140000

header:
  name: Florian Hochstrasser
  title: Senior ML Engineer | MLOps Specialist
  location: Zurich, Switzerland
  email: florian.hochstrasser@example.com
  phone: +41 XX XXX XX XX
  linkedin: linkedin.com/in/florian-hochstrasser
  github: github.com/datarian
  website: https://datarian.github.io/CV
---

# Professional Summary

Experienced ML Engineer with 8+ years building **production ML systems**...

## Experience

### Senior Data Scientist
**Current Company** | Zurich, Switzerland | 2020 - Present

- Architected and deployed **end-to-end ML pipelines** serving 1M+ daily predictions
- Led team of 4 engineers building **MLOps platform**

## Technical Skills

**ML/AI Frameworks:** TensorFlow, PyTorch, Scikit-learn...

## Education

### Master of Science in Computer Science
**University Name** | Location | 2015 - 2017

---

**Footer Note:** Curious how this resume was built? Explore the system at github.com/datarian/CV
```

**Benefits:**
- Human-readable and editable
- Git-friendly diffs
- Consistent with PERSONAL_PROFILE.md format
- Supports rich formatting (bold, italic, links)
- Parseable by both LaTeX and React renderers

## GitHub Actions Deployment

### Workflow Configuration

**File:** `.github/workflows/deploy-web-resumes.yml`

**Trigger:** Push to `master` branch with changes matching `resumes/customized/*/web/**`

**Steps:**
1. Checkout repository
2. Detect changed web builds (compare with gh-pages)
3. For each new/updated resume:
   - Extract metadata from resume_content.md
   - Generate semantic URL with security hash
   - Copy build to gh-pages branch under `/cv/{semantic-id}/`
4. Update deployment manifest
5. Push to gh-pages branch
6. Comment on commit with shareable URLs

### URL Structure

**Format:** `https://datarian.github.io/CV/cv/{date}_{company}_{hash4}`

**Example:** `https://datarian.github.io/CV/cv/2025_11_10_quantumbasel_a7f3`

**Components:**
- `date`: YYYY_MM_DD (when resume was generated)
- `company`: Sanitized company name (lowercase, no spaces)
- `hash4`: First 4 characters of SHA256(resume_content.md)

**Security Features:**
- No public index listing (requires full URL)
- Hash prevents URL guessing
- `robots.txt` disallows search engine crawling
- Can be taken down by removing from gh-pages branch

### Deployment Manifest

**File (gh-pages branch):** `cv/.manifest.json`

```json
{
  "version": "1.0",
  "deployments": [
    {
      "id": "2025_11_10_quantumbasel_a7f3",
      "company": "Quantum Basel",
      "role": "AI Specialist",
      "deployedAt": "2025-11-10T14:23:00Z",
      "url": "/cv/2025_11_10_quantumbasel_a7f3",
      "sourceCommit": "903493a"
    }
  ]
}
```

**Purpose:** Track deployments without exposing them publicly

### GitHub Actions Free Tier

- Public repos: **Unlimited minutes** (free)
- Private repos: 2,000 minutes/month free
- Estimated usage: ~2 minutes per deployment
- Well within free tier limits

## Technology Stack

### React Web Builder

**Core:**
- React 18.3+ (UI framework)
- TypeScript 5.3+ (type safety)
- Vite 5.0+ (build tool, dev server)

**Styling:**
- Tailwind CSS 3.4+ (utility-first CSS)
- PostCSS (CSS processing)

**Parsing:**
- gray-matter (YAML frontmatter parsing)
- marked or react-markdown (markdown rendering)

**Build Output:**
- Single-page bundle (one HTML + JS + CSS)
- Inlined small assets
- Optimized for fast loading

**Browser Support:**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (iOS Safari, Android Chrome)
- Print-optimized (can print to PDF)

### LaTeX Pipeline (Unchanged)

- moderncv (fancy style)
- XeLaTeX compiler
- Custom fonts (Roboto, Lato, Roboto Slab)

## User Experience Flow

### Resume Generation Workflow

```
1. User: "Create resume for Quantum Basel AI Specialist role"
         ↓
2. career-planning-coach: "Which format?"
   Options: [PDF] [Web] [Both]
         ↓
3. User: "Both"
         ↓
4. Market Analysis Phase
   - swiss-tech-job-market-analyst researches role
   - swiss-resume-expert creates content strategy
         ↓
5. Content Generation Phase
   - resume-content-generator creates resume_content.md
   - swiss-tech-resume-reviewer reviews content
   - [Iterate if needed]
         ↓
6. Rendering Phase (Parallel)
   - latex-moderncv-expert generates PDF
   - react-resume-expert builds web resume
         ↓
7. Design Review Phase
   - design-reviewer checks both formats
   - [Iterate with respective experts if needed]
         ↓
8. Final Approval
   - career-planning-coach holistic review
   - Generate application_strategy.md
         ↓
9. User commits changes to git
         ↓
10. GitHub Actions auto-deploys web resume
         ↓
11. User receives:
    ✅ PDF: resumes/compiled/2025_11_10_14_23_quantumbasel_CV_en.pdf
    ✅ Web: https://datarian.github.io/CV/cv/2025_11_10_quantumbasel_a7f3
    ✅ Strategy: application_strategy.md
```

### Sharing Resume with Target Audience

**Use Case:** User wants to share different resumes with different companies

**Solution:**
- Each resume gets unique URL with hash
- User shares specific URL with specific company
- URLs not discoverable without knowing full path
- Can track which resumes are deployed via manifest

**Example:**
```
Company A: https://datarian.github.io/CV/cv/2025_11_10_quantumbasel_a7f3
Company B: https://datarian.github.io/CV/cv/2025_11_15_google_x9k2
Company C: https://datarian.github.io/CV/cv/2025_11_20_meta_m4h8
```

Each URL is independent, non-discoverable, and can be removed individually.

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Create `resume-content-generator` agent
- [ ] Update `career-planning-coach` with format selection
- [ ] Update `latex-moderncv-expert` to read resume_content.md
- [ ] Test content generation + LaTeX rendering pipeline

### Phase 2: React Builder (Week 1-2)
- [ ] Set up React project in `resumes/web-builder/`
- [ ] Implement TypeScript types for resume schema
- [ ] Create React components (Header, Experience, Skills, Education)
- [ ] Implement YAML + Markdown parser
- [ ] Build responsive Tailwind CSS design
- [ ] Test local builds

### Phase 3: React Agent (Week 2)
- [ ] Create `react-resume-expert` agent
- [ ] Implement build orchestration (vite build)
- [ ] Handle errors and edge cases
- [ ] Test agent integration with resume_content.md

### Phase 4: Design Review (Week 2)
- [ ] Rename `latex-design-reviewer` → `design-reviewer`
- [ ] Add web format review capabilities
- [ ] Update feedback routing to appropriate experts
- [ ] Test iterative feedback loops

### Phase 5: GitHub Actions (Week 3)
- [ ] Create `.github/workflows/deploy-web-resumes.yml`
- [ ] Implement change detection logic
- [ ] Implement URL generation with hash
- [ ] Test deployment to gh-pages branch
- [ ] Set up robots.txt

### Phase 6: Integration & Testing (Week 3)
- [ ] End-to-end test: full resume generation workflow
- [ ] Test both "PDF only", "Web only", and "Both" paths
- [ ] Verify URLs are non-discoverable
- [ ] Update CLAUDE.md with new workflow
- [ ] Document agent usage in README

### Phase 7: Polish & Documentation (Week 4)
- [ ] Add deployment manifest tracking
- [ ] Create user guide for web resume features
- [ ] Add examples and screenshots to docs
- [ ] Performance optimization (bundle size, load time)
- [ ] Accessibility audit (WCAG AA)

## Success Criteria

### Functional Requirements
- ✅ User can select PDF, Web, or Both formats
- ✅ Single content source (resume_content.md) drives both formats
- ✅ Web resumes auto-deploy to GitHub Pages on commit
- ✅ URLs are semantic, unique, and non-discoverable
- ✅ Design review covers both formats

### Quality Requirements
- ✅ Web resume is mobile-responsive
- ✅ Web resume is print-optimized (browser print works)
- ✅ Accessibility: WCAG AA compliant
- ✅ Performance: Web resume loads in <2 seconds
- ✅ SEO: Not indexed by search engines

### User Experience
- ✅ Workflow feels natural (not disruptive)
- ✅ Format choice is clear and intuitive
- ✅ Shareable URLs are easy to copy/share
- ✅ Visual consistency between PDF and web formats

## Risks & Mitigations

### Risk 1: GitHub Pages Build Failures
**Impact:** Web resumes don't deploy
**Mitigation:**
- Comprehensive error handling in workflow
- Fallback to local builds if Actions fail
- Email notifications on deployment failures

### Risk 2: URL Collisions
**Impact:** Different resumes overwrite each other
**Mitigation:**
- Include content hash in URL (prevents collisions)
- Deployment manifest tracks all URLs
- Pre-deployment collision check

### Risk 3: Resume Content Leakage
**Impact:** Resumes accidentally become public
**Mitigation:**
- No public index page
- robots.txt blocks crawlers
- Hash-based URLs prevent guessing
- User can remove deployments manually

### Risk 4: React Build Complexity
**Impact:** Agent struggles with build errors
**Mitigation:**
- Simple, well-tested React components
- Comprehensive error messages
- Fallback to static HTML if build fails
- Detailed logs for debugging

### Risk 5: Design Inconsistency
**Impact:** PDF and web formats look too different
**Mitigation:**
- Unified design-reviewer agent
- Shared color scheme and typography
- Design tokens/constants shared between formats
- Side-by-side review during QA

## Future Enhancements

### Phase 2 Features (Post-MVP)
- **Interactive filtering:** Filter experience by tech stack
- **Dark mode:** Toggle light/dark theme
- **Multi-language:** Switch between English/German
- **Analytics:** Track resume views (privacy-respecting)
- **Export:** Download resume as PDF from web interface

### Advanced Features
- **Custom domains:** Support custom domain mapping (resume.florian.ch)
- **QR codes:** Generate QR code for easy sharing
- **Version history:** Browse previous versions of resume
- **A/B testing:** Compare different resume versions
- **Template library:** Multiple web design themes

## Conclusion

This design extends the CV generation system with React-based web resumes while maintaining the proven LaTeX pipeline. The content-first architecture (resume_content.md) ensures consistency across formats, and GitHub Actions automation provides seamless deployment to shareable URLs.

The implementation is incremental, low-risk, and preserves the existing workflow for users who prefer PDF-only resumes.
