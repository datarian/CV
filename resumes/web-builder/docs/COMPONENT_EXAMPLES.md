# React Component Examples
## Implementation Reference for Web Resume Components

**Purpose:** Complete TypeScript/React implementations for web resume components
**Version:** 1.0
**Date:** 2025-11-13

---

## Overview

This document contains full component implementations extracted from the react-resume-expert agent. Use these as reference implementations when building or debugging web resumes.

**Related Documentation:**
- **Content Format:** [`WEB_RESUME_CONTENT_FORMAT.md`](WEB_RESUME_CONTENT_FORMAT.md)
- **Style Guide:** [`../../docs/style-guide/web/WEB_RESUME_STYLE_GUIDE.md`](../../docs/style-guide/web/WEB_RESUME_STYLE_GUIDE.md)

---

## Table of Contents

1. [Type Definitions](#type-definitions)
2. [Utility: extractHighlights.ts](#utility-extracthighlightsts)
3. [Component: ProfessionalSummary.tsx](#component-professionalsummarytsx)
4. [Tailwind Configuration](#tailwind-configuration)
5. [Dependencies](#dependencies)

---

## Type Definitions

**File:** `src/types/resume.ts`

```typescript
export interface Highlight {
  metric: string;      // e.g., "8+ Years", "1M+", "99.9%"
  label: string;       // e.g., "Experience", "Daily Requests", "Uptime"
  icon: string;        // e.g., "calendar", "activity", "target"
}

export interface ResumeMetadata {
  id: string;
  targetRole: string;
  targetCompany: string;
  generatedDate: string;
  language: string;
  salaryTarget?: number;
}

export interface HeaderData {
  name: string;
  title: string;
  location: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  dates: string;
  achievements: string[];  // Markdown strings
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  dates: string;
  description?: string;
}

export interface ResumeData {
  metadata: ResumeMetadata;
  header: HeaderData;
  summary: string;
  summary_highlights?: Highlight[];  // Optional, auto-extracted if omitted
  experience: Experience[];
  skills: SkillCategory[];
  education: Education[];
}
```

---

## Utility: extractHighlights.ts

**File:** `src/utils/extractHighlights.ts`

**Purpose:** Auto-extract key metrics from summary text when manual highlights not provided

```typescript
import {
  Calendar,
  Activity,
  TrendingUp,
  Target,
  Users,
  Zap,
  Award,
  Clock
} from 'lucide-react';
import type { Highlight } from '../types/resume';

// Map icon names to Lucide components
export const iconMap: Record<string, any> = {
  calendar: Calendar,
  activity: Activity,
  trending: TrendingUp,
  target: Target,
  users: Users,
  zap: Zap,
  award: Award,
  clock: Clock,
};

/**
 * Auto-extract highlights from summary text using pattern matching
 *
 * @param summaryText - Raw summary text with metrics (ideally bolded)
 * @returns Array of up to 4 highlights with metrics, labels, and icons
 *
 * @example
 * const summary = "Experienced engineer with **8+ years** building systems serving **1M+ requests** with **99.9% uptime**";
 * const highlights = extractHighlights(summary);
 * // Returns:
 * // [
 * //   { metric: "8+ years", label: "Experience", icon: "calendar" },
 * //   { metric: "1M+", label: "Requests", icon: "activity" },
 * //   { metric: "99.9%", label: "Uptime", icon: "target" }
 * // ]
 */
export function extractHighlights(summaryText: string): Highlight[] {
  const highlights: Highlight[] = [];

  // Pattern 1: Years of experience (e.g., "8+ years", "10 years")
  const yearsMatch = summaryText.match(/(\d+\+?\s*years?)/i);
  if (yearsMatch) {
    highlights.push({
      metric: yearsMatch[1],
      label: 'Experience',
      icon: 'calendar'
    });
  }

  // Pattern 2: Large numbers with units (e.g., "1M+", "500K+", "100+")
  const scaleMatches = summaryText.match(/(\d+(?:\.\d+)?[KMB]\+?)(?:\s+(daily|weekly|monthly|requests|users|systems|models))?/gi);
  if (scaleMatches && scaleMatches.length > 0) {
    // Take up to 2 scale metrics
    scaleMatches.slice(0, 2).forEach(match => {
      const parts = match.split(/\s+/);
      const metric = parts[0];
      const label = parts.slice(1).join(' ') || 'Scale';
      highlights.push({
        metric,
        label: label.charAt(0).toUpperCase() + label.slice(1),
        icon: 'activity'
      });
    });
  }

  // Pattern 3: Percentages (e.g., "99.9%", "23%")
  const percentMatches = summaryText.match(/(\d+(?:\.\d+)?%)\s+(\w+)/g);
  if (percentMatches && percentMatches.length > 0) {
    // Take the first percentage metric
    const match = percentMatches[0];
    const parts = match.split(/\s+/);
    highlights.push({
      metric: parts[0],
      label: parts.slice(1).join(' ').charAt(0).toUpperCase() + parts.slice(1).join(' ').slice(1),
      icon: 'target'
    });
  }

  // Limit to 4 highlights max
  return highlights.slice(0, 4);
}

/**
 * Get Lucide icon component by name
 *
 * @param iconName - Icon name from Highlight.icon field
 * @returns Lucide React component
 *
 * @example
 * const Icon = getIconComponent('calendar');
 * return <Icon className="w-6 h-6" />;
 */
export function getIconComponent(iconName: string) {
  return iconMap[iconName] || Activity;
}
```

---

## Component: ProfessionalSummary.tsx

**File:** `src/components/ProfessionalSummary.tsx`

**Purpose:** Two-column layout with summary text (left) and highlight cards (right)

**Features:**
- Markdown rendering with custom styling (bold → blue, italic → coral)
- Auto-extraction of highlights from summary text
- Manual override via YAML `summary_highlights` field
- Responsive: Two-column on desktop, single column on mobile
- Interactive highlight cards with hover effects

```typescript
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Sparkles } from 'lucide-react';
import { extractHighlights, getIconComponent } from '../utils/extractHighlights';
import type { Highlight } from '../types/resume';

interface Props {
  summary: string;                  // Markdown summary text
  skills?: string[];                // Optional: Top skills to display as tags
  highlights?: Highlight[];         // Optional: Manual highlights from YAML (auto-extracted if omitted)
}

export const ProfessionalSummary: React.FC<Props> = ({
  summary,
  skills = [],
  highlights
}) => {
  // Smooth scroll to skills section when tag clicked
  const scrollToSkills = () => {
    document.getElementById('skills-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Use provided highlights or auto-extract from summary
  const displayHighlights = highlights || extractHighlights(summary);

  return (
    <section className="mb-10">
      <div className="bg-gradient-to-br from-white to-cv-light rounded-lg shadow-md p-8 border-l-4 border-cv-blue">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cv-blue/10">
            <Sparkles className="w-6 h-6 text-cv-blue" />
          </div>
          <h2 className="text-3xl font-bold text-cv-blue">
            Professional Summary
          </h2>
        </div>

        {/* Two-column layout: Summary text (left) + Highlights (right) */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left Column: Summary Text */}
          <div className="flex-1 text-lg text-gray-700 leading-relaxed prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                // Paragraph: Add consistent spacing
                p: ({node, ...props}) => <p className="mb-4 last:mb-0" {...props} />,

                // Bold: Render in brand blue
                strong: ({node, ...props}) => <strong className="font-bold text-cv-blue" {...props} />,

                // Italic: Render in coral accent
                em: ({node, ...props}) => <em className="italic text-cv-coral" {...props} />,
              }}
            >
              {summary}
            </ReactMarkdown>
          </div>

          {/* Right Column: Highlight Cards */}
          {displayHighlights.length > 0 && (
            <div className="lg:w-80 flex flex-row lg:flex-col gap-4">
              {displayHighlights.map((highlight, index) => {
                const IconComponent = getIconComponent(highlight.icon);
                return (
                  <div
                    key={index}
                    className="flex-1 lg:flex-none bg-white rounded-lg p-4 shadow-sm border-2 border-cv-blue/20 hover:border-cv-blue hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex flex-col items-center text-center gap-2">
                      {/* Icon */}
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cv-blue/10 group-hover:bg-cv-blue/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-cv-blue" />
                      </div>

                      {/* Metric */}
                      <div className="text-2xl font-bold text-cv-blue group-hover:text-cv-coral transition-colors">
                        {highlight.metric}
                      </div>

                      {/* Label */}
                      <div className="text-sm text-gray-600 font-medium">
                        {highlight.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Optional: Core Competencies Tags */}
        {skills.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm font-semibold text-cv-gray mb-3">
              Core Competencies:
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <button
                  key={index}
                  onClick={scrollToSkills}
                  className="px-4 py-2 bg-white border-2 border-cv-blue text-cv-blue rounded-full text-sm font-medium hover:bg-cv-blue hover:text-white transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
```

---

## Tailwind Configuration

**File:** `tailwind.config.js`

Ensure custom colors are defined:

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
        'cv-blue': '#2C5F7F',    // Primary brand color
        'cv-coral': '#E87461',   // Secondary accent (for italic text)
        'cv-gray': '#4A4A4A',    // Body text color
        'cv-light': '#F5F5F5',   // Subtle background
      },
    },
  },
  plugins: [],
}
```

---

## Dependencies

**File:** `package.json`

Ensure required packages are installed:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-markdown": "^9.0.1",
    "lucide-react": "^0.263.1",
    "gray-matter": "^4.0.3"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.0.0",
    "vite": "^4.3.0"
  }
}
```

**Install command:**
```bash
npm install
```

---

## Usage Examples

### Example 1: Auto-Extracted Highlights

**Input (`resume_content.md`):**
```yaml
---
metadata:
  id: sample_resume
  # ... other fields ...
---

# Professional Summary

Experienced ML Engineer with **8+ years** building production AI systems.
Led development of platforms serving **1M+ daily requests** with **99.9% uptime**.
Managed teams of **6+ engineers** while improving model accuracy by **23%**.
```

**Result:** Automatically extracts 4 highlights:
- `8+ years` → Experience (calendar icon)
- `1M+` → Daily requests (activity icon)
- `99.9%` → Uptime (target icon)
- `6+` → Engineers (users icon)

### Example 2: Manual Highlights Override

**Input (`resume_content.md`):**
```yaml
---
metadata:
  id: sample_resume
  # ... other fields ...

summary_highlights:
  - metric: "10+"
    label: "Production Models"
    icon: "zap"
  - metric: "4x"
    label: "Performance Gain"
    icon: "trending"
  - metric: "$2M"
    label: "Cost Savings"
    icon: "award"
---

# Professional Summary

Your summary text here (highlights above used instead of auto-extraction)...
```

**Result:** Uses manual highlights exactly as specified.

---

## Styling Notes

### Responsive Behavior

**Desktop (lg breakpoint: 1024px+):**
- Two-column layout: `flex-row`
- Summary text: Flexible width (`flex-1`)
- Highlights: Fixed width (`w-80`), stacked vertically (`flex-col`)

**Mobile/Tablet (<1024px):**
- Single column: `flex-col`
- Summary text: Full width
- Highlights: Horizontal row (`flex-row`), equal width (`flex-1`)

### Hover Effects

**Highlight Cards:**
- Border color: `cv-blue/20` → `cv-blue`
- Shadow: `shadow-sm` → `shadow-md`
- Metric color: `cv-blue` → `cv-coral`
- Icon background: `cv-blue/10` → `cv-blue/20`
- Transition: 200ms smooth

**Skill Tags:**
- Background: `white` → `cv-blue`
- Text color: `cv-blue` → `white`
- Transform: Lift up 2px (`-translate-y-0.5`)

### Print Styles

Add to `index.css`:

```css
@media print {
  /* Hide interactive elements */
  .group:hover { /* Reset hover states */ }

  /* Ensure proper page breaks */
  .mb-10 {
    page-break-inside: avoid;
  }
}
```

---

## Troubleshooting

### Highlights Not Appearing

**Problem:** No highlight cards visible

**Solutions:**
1. Check summary has **bold** metrics: `**8+ years**`
2. Verify YAML `summary_highlights` syntax if manual
3. Check browser console for parsing errors

### Markdown Not Rendering

**Problem:** Raw markdown visible (asterisks, etc.)

**Solutions:**
1. Verify `react-markdown` installed: `npm list react-markdown`
2. Check YAML frontmatter syntax (triple dashes)
3. Validate with gray-matter parser

### Colors Not Working

**Problem:** Colors don't match brand

**Solutions:**
1. Check `tailwind.config.js` has custom colors defined
2. Use `text-cv-blue` not `text-blue-500`
3. Run `npm run build` to regenerate CSS

---

## Component Variations

### Minimal Summary (No Highlights)

```typescript
<ProfessionalSummary
  summary={data.summary}
  // Omit highlights prop - will auto-extract or show none if no metrics found
/>
```

### Summary with Top Skills Tags

```typescript
<ProfessionalSummary
  summary={data.summary}
  skills={['Python', 'Kubernetes', 'LLMs', 'FastAPI']}
  // Skills appear as clickable tags below summary
/>
```

### Summary with Manual Highlights

```typescript
<ProfessionalSummary
  summary={data.summary}
  highlights={data.summary_highlights}  // From YAML frontmatter
/>
```

---

## Related Components

**Other resume components to implement:**

- **ResumeHeader.tsx**: Name, title, contact info, location
- **ExperienceSection.tsx**: Work history with achievements
- **SkillsSection.tsx**: Categorized technical skills
- **EducationSection.tsx**: Academic background
- **ProjectsSection.tsx**: Portfolio projects (optional)

---

**Created:** 2025-11-13
**Extracted from:** `.claude/agents/react-resume-expert.md`
**Maintained by:** react-resume-expert agent
**Repository:** github.com/datarian/CV

---

**Quick Reference:**
- Need content format? → [`WEB_RESUME_CONTENT_FORMAT.md`](WEB_RESUME_CONTENT_FORMAT.md)
- Need full style guide? → [`../../docs/style-guide/web/WEB_RESUME_STYLE_GUIDE.md`](../../docs/style-guide/web/WEB_RESUME_STYLE_GUIDE.md)
- Need agent instructions? → `.claude/agents/react-resume-expert.md`
