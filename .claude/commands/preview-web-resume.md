---
name: preview-web-resume
description: Preview web resume locally without deploying to CV-pages
---

# Preview Web Resume

Build and preview a web resume locally in your browser without deploying to CV-pages.

## What You Need

Provide the resume ID to preview.

**Format:** `YYYY_MM_DD_company_role`

**Example:** `2025_11_10_quantumbasel_ai_specialist`

## What Happens

The `react-resume-expert` agent will:

1. ✅ Load resume content from `resumes/customized/{id}/resume_content.md`
2. 🔨 Build the web resume using React + Vite
3. 🚀 Start local preview server at http://localhost:4173/CV-pages/
4. 🌐 Open in your default browser
5. 🎯 Keep server running for your review

**No deployment** - this is local only, no CV_PAGES_TOKEN required.

## Use Cases

- Quick visual check during content development
- Review before requesting formal approval from swiss-tech-resume-reviewer
- Test web builder changes or styling
- Demonstrate locally to others without sharing private URL

## Stopping Preview

Press `Ctrl+C` in the terminal or close the terminal window.

The preview server runs in the background, so you can continue working in Claude while reviewing in your browser.

## Next Steps

**If you're happy with the preview:**
- Continue with normal workflow to get content approved
- Use career-planning-coach to deploy to CV-pages after approval

**If you need to make changes:**
- Edit `resume_content.md`
- Run `/preview-web-resume {id}` again to see updates

## Requirements

- Resume content exists at: `resumes/customized/{id}/resume_content.md`
- Web builder dependencies installed: `cd resumes/web-builder && npm install`
- Port 4173 available (not already running another preview)

## Troubleshooting

**Port already in use:**
```bash
# Find and kill existing preview server
lsof -ti:4173 | xargs kill
```

**Build fails:**
```bash
# Reinstall dependencies
cd resumes/web-builder
rm -rf node_modules
npm install
```

**Content not found:**
Verify the resume ID matches the directory structure:
```bash
ls resumes/customized/
```
