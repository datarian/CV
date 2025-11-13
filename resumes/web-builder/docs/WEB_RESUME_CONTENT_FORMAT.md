# Web Resume Content Format

This document describes the content format for web resumes, including optional fields for enhanced visual presentation.

## File Structure

Web resumes use `resume_content.md` files with YAML frontmatter and Markdown content:

```markdown
---
metadata:
  id: sample_resume
  targetRole: Senior ML Engineer
  targetCompany: Demo Company
  generatedDate: 2025-11-11
  language: en

header:
  name: Full Name
  title: Professional Title
  location: City, Country
  email: email@example.com
  phone: +XX XX XXX XX XX
  linkedin: https://linkedin.com/in/username
  github: https://github.com/username
  website: https://example.com

# OPTIONAL: Manual Summary Highlights
summary_highlights:
  - metric: "8+ Years"
    label: "ML Engineering"
    icon: "calendar"
  - metric: "1M+"
    label: "Daily Requests"
    icon: "activity"
  - metric: "99.9%"
    label: "Uptime"
    icon: "target"
---

# Professional Summary

Your summary text here with **bold** formatting for key terms...

## Experience

### Job Title
**Company Name** | Location | Dates

- Achievement with **bold key terms**
- Another achievement

## Technical Skills

**Category Name**: Skill1, Skill2, Skill3

## Education

### Degree Name
**Institution** | Location | Dates

Description text
```

## Summary Highlights Feature

### Primary Approach: Content Generator Provides Highlights

The **resume-content-generator** agent strategically selects 3-4 key metrics and includes them in the YAML `summary_highlights` field. This ensures:
- Both PDF and web formats highlight the same metrics
- Strategic selection aligned with target role
- Consistent storytelling across formats

**Expected workflow:** Content generator ALWAYS provides summary_highlights.

### Fallback: Auto-Extraction (Backward Compatibility)

If `summary_highlights` is NOT provided in YAML (legacy content or manual files), the web resume will **automatically extract** highlights from the summary text using pattern matching:

**Extracted Patterns:**
1. **Years of Experience**: `"8+ years"`, `"10 years"` → Calendar icon
2. **Scale Metrics**: `"1M+"`, `"500K+"`, `"100+ models"` → Activity icon
3. **Percentages**: `"99.9% uptime"`, `"23% improvement"` → Target icon

**Auto-Extraction Logic:**
- Scans summary text for numeric patterns
- Extracts up to 4 highlights automatically
- Assigns appropriate icons based on context
- Uses metric + context as label

**Example Summary for Auto-Extraction:**
```markdown
# Professional Summary

Experienced ML Engineer with **8+ years** building production systems.
Led development of systems serving **1M+ daily requests** with **99.9% uptime**.
Improved model accuracy by **23%** over baseline.
```

This would automatically generate:
- `8+ years` → Experience (calendar icon)
- `1M+` → Daily requests (activity icon)
- `99.9%` → Uptime (target icon)
- `23%` → Improvement (trending icon)

### Manual Override (Optional)

For precise control, include `summary_highlights` in YAML frontmatter:

```yaml
summary_highlights:
  - metric: "10+"
    label: "Production Models"
    icon: "zap"
  - metric: "4x"
    label: "Performance Boost"
    icon: "trending"
  - metric: "$2M"
    label: "Cost Savings"
    icon: "award"
```

### Available Icons

Icon names from Lucide React library:

| Icon Name | Use Case | Visual |
|-----------|----------|--------|
| `calendar` | Years of experience, tenure | 📅 |
| `activity` | Scale metrics, throughput, requests | 📊 |
| `target` | Accuracy, precision, percentages | 🎯 |
| `trending` | Improvements, growth metrics | 📈 |
| `users` | Team size, user counts | 👥 |
| `zap` | Performance, speed metrics | ⚡ |
| `award` | Achievements, recognition | 🏆 |
| `clock` | Time-related metrics | ⏰ |

### Best Practices for Content Agents

**Primary Workflow (resume-content-generator):**
- ALWAYS provide `summary_highlights` in YAML frontmatter
- Select 3-4 strategic metrics aligned with target role
- Choose appropriate icons for each metric type
- Ensure summary text mentions the same metrics (with **bold** formatting)
- This ensures consistency across PDF and web formats

**Fallback Workflow (manual or legacy content):**
If creating content manually without using resume-content-generator:
- Either provide explicit `summary_highlights` in YAML
- OR write summary with clear **bold** metrics for auto-extraction
- Use formats like `**8+ years**`, `**1M+ daily requests**`, `**99.9% uptime**`
- Include context words: "years", "requests", "uptime", "users", "models"

**Example Well-Formatted Summary:**
```markdown
Senior ML Engineer with **8+ years** building production AI systems.
Specialized in MLOps infrastructure serving **1M+ daily requests**
with **99.9% uptime**. Led teams of **4+ engineers** and improved
model accuracy by **23%** over baseline.
```

This will auto-extract 4 clear highlights with appropriate icons and labels.

## Markdown Formatting in Summary

The summary text supports full Markdown formatting:
- **Bold text** (`**text**`) - Rendered in brand blue color
- *Italic text* (`*text*`) - Rendered in coral color
- Automatically parsed and styled for visual hierarchy

## Visual Layout

On desktop (lg breakpoint and above):
- Summary text: Left side (60-65% width)
- Highlight cards: Right side (35-40% width), stacked vertically

On mobile/tablet:
- Summary text: Full width, top
- Highlight cards: Horizontal row below summary

Each highlight card features:
- Icon in circular background (brand colors)
- Large metric text (changes color on hover)
- Descriptive label
- Hover effects (border color, shadow, color transitions)
