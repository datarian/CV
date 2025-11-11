# Web Resume Agent Implementation - Quick Start Guide

## What Was Implemented

This implementation replaces the failed GitHub Actions workflow approach with an agent-driven deployment system for web resumes.

### New Components

1. **react-resume-expert agent** (`.claude/agents/react-resume-expert.md`)
   - Handles both preview and deploy modes
   - Preview: Local dev server, no credentials needed
   - Deploy: Builds and pushes to private CV-pages repo
   - Complete error handling and user feedback

2. **/preview-web-resume command** (`.claude/commands/preview-web-resume.md`)
   - Quick access to preview mode during development
   - No approval required
   - No credentials required

3. **Updated career-planning-coach** (`.claude/agents/career-planning-coach.md`)
   - Format selection (PDF, web, both)
   - Offers preview before deployment
   - Integrates web URL into application strategy

4. **Documentation**
   - README.md: Setup instructions for CV_PAGES_TOKEN
   - CLAUDE.md: Agent workflow and constraints
   - Design doc: Complete architecture
   - Test plan: Manual verification checklist

### Key Features

✅ **Privacy-first:** No web builds ever touch base repository
✅ **Review-first:** Deployment only after approval
✅ **Preview mode:** Test locally without credentials
✅ **Clear errors:** Helpful messages with recovery instructions
✅ **Traceability:** URLs recorded in application strategy

## Before First Use

### 1. Install Web Builder Dependencies

```bash
cd resumes/web-builder
npm install
```

### 2. Configure Deployment Token (Optional for Preview)

Only needed for deployment to CV-pages:

```bash
# Create token at: https://github.com/settings/tokens
# Scope: 'repo'

export CV_PAGES_TOKEN="ghp_your_token_here"

# Add to shell profile for persistence
echo 'export CV_PAGES_TOKEN="ghp_your_token_here"' >> ~/.zshrc
source ~/.zshrc
```

### 3. Verify Setup

```bash
# Test preview (no token needed)
/preview-web-resume {existing_resume_id}

# Verify token (only for deployment)
echo $CV_PAGES_TOKEN | grep -q "ghp_" && echo "✅ Token OK" || echo "⚠️  Token missing"
```

## Usage Examples

### Preview During Development

```bash
# Quick preview while iterating on content
/preview-web-resume 2025_11_10_quantumbasel_ai_specialist

# Opens: http://localhost:4173/CV-pages/
# Stop: Ctrl+C
```

### Deploy After Approval

1. Complete normal resume workflow
2. Get swiss-tech-resume-reviewer approval
3. career-planning-coach asks: "Format?"
4. Select: "web" or "both"
5. Choose: "Preview first" (recommended)
6. Review in browser
7. Confirm: "Deploy to CV-pages"
8. Get URL: `https://datarian.github.io/CV-pages/cv/{semantic-id}`

## Testing

Run manual tests from: `docs/plans/2025-11-11-web-resume-test-plan.md`

### Quick Test Checklist

- [ ] Preview works without CV_PAGES_TOKEN
- [ ] Browser opens automatically
- [ ] Resume displays correctly
- [ ] Deploy works with CV_PAGES_TOKEN
- [ ] URL is accessible on CV-pages
- [ ] No web files in base repo (`git status` clean)
- [ ] Application strategy includes URL

## Troubleshooting

### Preview server won't start

```bash
# Kill existing server on port 4173
lsof -ti:4173 | xargs kill

# Try again
/preview-web-resume {id}
```

### Deploy fails with auth error

```bash
# Check token configured
echo $CV_PAGES_TOKEN

# Verify token scope at: https://github.com/settings/tokens
# Must have 'repo' scope
```

### Build fails

```bash
# Reinstall dependencies
cd resumes/web-builder
rm -rf node_modules package-lock.json
npm install
```

## Migration Notes

### What Was Removed

- GitHub Actions workflows (deploy-web-resumes.yml, delete-web-resume.yml)
- Automated CI/CD deployment on every push
- Complex workflow debugging requirements

### What Was Replaced

- Manual workflow triggers → Agent invocations
- GitHub secrets → Local environment variable
- Automated deployment → User-controlled deployment with preview

### Why Agent-Driven Is Better

1. **Visibility:** User sees exactly when deployment happens
2. **Control:** Preview before deploy, no surprises
3. **Privacy:** No risk of automated leaks
4. **Simplicity:** No workflow YAML to debug
5. **Flexibility:** Easy to customize per resume

## Next Steps

1. **Test thoroughly** using test plan
2. **Deploy test resume** to CV-pages (non-production)
3. **Verify privacy** (git status clean)
4. **Document any issues** encountered
5. **Merge to main** when all tests pass

## Support

- Design: `docs/plans/2025-11-11-web-resume-agent-deployment-design.md`
- Tests: `docs/plans/2025-11-11-web-resume-test-plan.md`
- CLAUDE.md: Agent workflow documentation
- README.md: Setup instructions
