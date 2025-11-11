# Web Resume Agent-Driven Deployment Design

**Date:** 2025-11-11
**Status:** Approved
**Author:** Claude Code + Florian Hochstrasser

## Executive Summary

This design replaces the failed GitHub Actions workflow approach with an agent-driven deployment system for web resumes. The new system ensures zero base repository pollution, enforces review-first workflow, maintains privacy by deploying exclusively to the private `CV-pages` repository, and includes local preview functionality.

**Key decisions:**
- Web deployment is an agent action, not an automated workflow
- Base repo (`datarian/CV`) never contains web build artifacts
- All builds happen in temporary memory locations
- Deployment only occurs after `swiss-tech-resume-reviewer` approval
- Local preview available before deployment
- Web URLs recorded in application strategy documents

## Problem Statement

### Issues with Previous Approach

1. **Privacy Violation:**
   - Web builds stored at `resumes/customized/*/web/` in public base repo
   - Full resume content exposed in public repository
   - Attempted fix with private CV-pages deployment still leaked source files

2. **Workflow Integration:**
   - Build happened BEFORE review (wasted iterations)
   - Should be: Content review → Approve → Build once
   - Was: Build → Review → Rebuild cycle

3. **GitHub Workflow Failures:**
   - Workflows referenced `master` instead of `main` branch
   - Triggered on every push (not selective)
   - Workflows only existed in feature branch, never merged
   - Repeated merge/revert cycles (5+ times)

### Requirements

- **Privacy:** No private resume content in public base repository
- **Review-first:** Web building only after content approval
- **Deployment:** Private-only access via `CV-pages` repository
- **Preview:** Local preview before deploying to CV-pages
- **Traceability:** Web URLs recorded in application materials
- **Control:** Explicit user visibility into deployment process

## Architecture

### Core Principle

**Agent-driven deployment with zero base repository pollution.**

The system separates content creation (in base repo) from web deployment (entirely in memory and private repo). The base repo never contains web build artifacts beyond the structured `resume_content.md` file.

### Repository Separation

```
datarian/CV (PUBLIC)
├── resumes/customized/{id}/resume_content.md     ✅ Structured data only
├── resumes/customized/{id}/{id}.tex              ✅ LaTeX source
├── resumes/customized/{id}/{id}.pdf              ✅ Compiled PDF
├── resumes/customized/{id}/application_strategy.md  ✅ Strategy doc
└── resumes/web-builder/                          ✅ Tooling (no private data)
    ├── src/                                      ✅ React source code
    ├── dist/                                     ❌ GITIGNORED (never committed)
    └── public/resume_content.md                  ❌ GITIGNORED (temporary)

datarian/CV-pages (PRIVATE)
└── cv/{semantic-id}/                             ✅ Deployed web resumes
    ├── index.html
    ├── assets/
    └── resources/
```

### Architectural Decisions

1. **react-resume-expert agent** owns entire deployment lifecycle (preview + deploy)
2. All web building happens in temporary memory (no disk writes in base repo)
3. Private CV-pages repo cloned fresh for each deployment
4. Semantic IDs generated from content hash for privacy
5. Preview mode builds locally and starts dev server (no deployment)
6. Deployment URLs reported immediately and recorded in application strategy

## Component Responsibilities

### New Agent: react-resume-expert

**Location:** `.claude/agents/react-resume-expert.md`

**Invoked by:**
- `career-planning-coach` after `swiss-tech-resume-reviewer` approval
- `/preview-web-resume` slash command (preview mode only)

**Modes:**
- **Preview mode** (`preview=true`): Build locally, start dev server, open browser
- **Deploy mode** (`preview=false`): Build, deploy to CV-pages, report URL

**Responsibilities:**

**Preview Mode:**
- Validate `resume_content.md` exists
- Copy content to web builder's public directory (temporary)
- Run `npm run build` in `resumes/web-builder/`
- Start Vite preview server on http://localhost:4173/CV-pages/
- Open browser automatically (macOS: `open -a "Google Chrome"`, Linux: `xdg-open`)
- Keep server running in background
- Report preview URL and instructions to stop
- Clean up on server stop

**Deploy Mode:**
- All preview steps PLUS:
- Clone private CV-pages repo (requires `CV_PAGES_TOKEN`)
- Generate semantic ID: `{date}_{company_lowercase}_{content_hash_4char}`
- Copy build output to `cv-pages-repo/cv/{semantic-id}/`
- Commit and push to `gh-pages` branch
- Report deployment URL to user
- Clean up all temporary files
- Return structured output to `career-planning-coach`

**Output format (deploy mode):**
```json
{
  "status": "success",
  "url": "https://datarian.github.io/CV-pages/cv/{semantic_id}",
  "semantic_id": "{semantic_id}",
  "deployed_at": "{timestamp}"
}
```

### New Slash Command: /preview-web-resume

**Location:** `.claude/commands/preview-web-resume.md`

**Usage:** `/preview-web-resume {id}`

**Example:** `/preview-web-resume 2025_11_10_quantumbasel_ai_specialist`

**Behavior:**
- Invokes `react-resume-expert` agent with `preview=true`
- Does NOT require approval (useful during content iteration)
- Does NOT deploy to CV-pages
- Opens local preview server
- Reports instructions to stop server

**Use cases:**
- Quick preview during content development
- Visual check before requesting review
- Testing web builder changes
- Demonstrating to others locally

### Modified Agent: career-planning-coach

**Changes:**
- Add format selection logic: "Would you like PDF, web resume, or both?"
- Offer preview before deployment: "Preview web resume before deploying?"
- Invoke `react-resume-expert` with appropriate mode
- Capture deployment URL from agent response
- Include web URL in application strategy document
- Report deployment status to user

**New workflow step:**
```
After swiss-tech-resume-reviewer approval:
1. Ask user: "Format selection: PDF, web, or both?"
2. If "web" or "both":
   a. Ask: "Preview before deploying? (recommended)"
   b. If yes: Invoke react-resume-expert(preview=true)
   c. User reviews preview
   d. Ask: "Deploy to CV-pages?"
   e. If yes: Invoke react-resume-expert(preview=false, deploy=true)
3. Capture URL from agent response
4. Include URL in application_strategy.md template
5. Report all materials to user
```

### Modified Files

**CLAUDE.md:**
- Update workflow diagrams to show preview + web deployment flow
- Remove GitHub Actions deployment workflow references
- Add token requirement to "Key Constraints" section
- Update "Web Resume Build" section with agent-driven approach
- Document `/preview-web-resume` slash command

**README.md:**
- Add "Setup" section documenting `CV_PAGES_TOKEN` requirement
- Include token creation and configuration instructions
- Explain privacy model and repository separation
- Document preview workflow

**resumes/web-builder/vite.config.ts:**
- Verify `base: '/CV-pages/'` for correct GitHub Pages paths
- Ensure preview server configuration: `preview: { port: 4173 }`

**.claude/commands/preview-web-resume.md:**
- New file: Slash command for quick preview access

### Removed Components

**Delete from feature branch:**
- `.worktrees/web-resume-system/.github/workflows/deploy-web-resumes.yml`
- `.worktrees/web-resume-system/.github/workflows/delete-web-resume.yml`

**Reasoning:** These workflows are replaced entirely by agent-driven deployment. No automated CI/CD deployment needed.

## Data Flow

### Flow 1: Preview During Development

```
User: "/preview-web-resume 2025_11_10_quantumbasel_ai_specialist"

react-resume-expert (preview=true):
1. cp resume_content.md → resumes/web-builder/public/
2. cd resumes/web-builder && npm run build
3. npm run preview (starts server in background)
4. open -a "Google Chrome" http://localhost:4173/CV-pages/
5. Report: "Preview running at http://localhost:4173/CV-pages/"
6. Keep server running until user stops (Ctrl+C or explicit stop)

User reviews in browser, makes adjustments, repeats as needed
```

### Flow 2: Full Deployment Workflow

```
1. User: "Apply to Company X for ML Engineer role"

2. career-planning-coach orchestrates:
   → swiss-tech-job-market-analyst (market research)
   → swiss-resume-expert (content strategy)
   → resume-content-generator (creates resume_content.md)

3. swiss-tech-resume-reviewer:
   → Reviews resume_content.md
   → Provides feedback OR approves ✅

4. career-planning-coach:
   → "Format selection: PDF, web, or both?"
   → User selects "web" or "both"

5. career-planning-coach (if web selected):
   → "Preview before deploying? (recommended)"

   If user wants preview:
   a. Invoke react-resume-expert(preview=true)
   b. User reviews at http://localhost:4173/CV-pages/
   c. Ask: "Satisfied with preview? Deploy to CV-pages?"

6. react-resume-expert (deploy mode):
   a. Validate environment (CV_PAGES_TOKEN exists)
   b. cp resume_content.md → resumes/web-builder/public/
   c. cd resumes/web-builder && npm run build
   d. git clone CV-pages to /tmp/cv-pages-{timestamp}
   e. Generate semantic_id from content hash
   f. cp -r dist/* /tmp/cv-pages-{timestamp}/cv/{semantic_id}/
   g. cd /tmp/cv-pages-{timestamp} && git add . && git commit && git push
   h. Report URL: https://datarian.github.io/CV-pages/cv/{semantic_id}
   i. rm -rf /tmp/cv-pages-{timestamp}
   j. rm resumes/web-builder/public/resume_content.md
   k. Return structured output to career-planning-coach

7. career-planning-coach generates application_strategy.md:
   → Includes PDF path (if generated)
   → Includes web URL (if deployed)
   → Both sections if "both" selected

8. User receives:
   - PDF (if selected): resumes/compiled/{timestamp}_{id}_CV_en.pdf
   - Web URL (if selected): https://datarian.github.io/CV-pages/cv/{semantic_id}
   - Application strategy: resumes/customized/{id}/application_strategy.md (with URL)
```

### Key Insights

1. **Preview is optional but recommended** - helps catch visual issues before deployment
2. **Preview doesn't require CV_PAGES_TOKEN** - works offline, no credentials needed
3. **Web builds never exist on disk in base repo** - `dist/` is gitignored, cleaned up immediately
4. **Multiple previews allowed** - user can iterate on content, preview each time
5. **Preview server runs in background** - user can continue working while reviewing

### Semantic ID Generation

**Format:** `{date}_{company_lowercase}_{hash}`

**Example:** `2025_11_10_quantumbasel_a3f2`

**Algorithm:**
```bash
# Extract from resume_content.md YAML frontmatter
date=$(echo "$id" | cut -d'_' -f1-3)
company=$(grep "targetCompany:" resume_content.md | sed 's/.*targetCompany: //' | tr '[:upper:]' '[:lower:]' | tr ' ' '_')
hash=$(sha256sum resume_content.md | cut -c1-4)
semantic_id="${date}_${company}_${hash}"
```

**Benefits:**
- Privacy: No personally identifiable information in URL
- Collision resistance: Content hash ensures uniqueness
- Readability: Date and company hint at content without exposing details

## Error Handling

### Critical Failure Points

#### 1. Missing CV_PAGES_TOKEN (Deploy Mode Only)

**Detection:** Check environment variable before cloning

**Error message:**
```
❌ CV_PAGES_TOKEN not configured

Web deployment requires a GitHub Personal Access Token.

Setup instructions:
1. Create token at: https://github.com/settings/tokens
2. Select scope: 'repo' (Full control of private repositories)
3. Export in shell:
   export CV_PAGES_TOKEN="ghp_your_token_here"
4. Add to ~/.zshrc for persistence

See README.md for detailed setup instructions.

Note: Preview mode works without token - use /preview-web-resume for local testing
```

**Recovery:** User configures token, re-invokes agent

#### 2. npm Build Fails

**Detection:** Check exit code of `npm run build`

**Error message:**
```
❌ Web build failed

Build command exited with code {exit_code}

Error output:
{stderr}

Common causes:
- Missing dependencies: Run 'npm install' in resumes/web-builder/
- TypeScript errors: Check build output above
- Invalid resume_content.md: Verify YAML frontmatter

To debug: cd resumes/web-builder && npm run build
```

**Recovery:** Agent provides build logs, user fixes web-builder code

#### 3. Preview Server Fails to Start

**Detection:** Check exit code of `npm run preview`

**Error message:**
```
❌ Preview server failed to start

Common causes:
- Port 4173 already in use (another preview running?)
- Build output missing (run build first)

To manually test:
cd resumes/web-builder
npm run build
npm run preview
```

**Recovery:** Kill existing preview server, retry

#### 4. CV-pages Clone/Push Fails

**Detection:** Git command exit codes

**Error messages:**

*Clone failure:*
```
❌ Failed to clone CV-pages repository

Git error: {error_message}

Possible causes:
- Token lacks 'repo' scope
- Token expired or revoked
- Network connectivity issues

Verify token permissions at: https://github.com/settings/tokens

Try preview mode first: /preview-web-resume {id}
```

*Push failure:*
```
❌ Failed to push to CV-pages repository

Git error: {error_message}

Possible causes:
- Network connection interrupted
- Repository permissions changed
- Concurrent push conflict

You can retry deployment - previous attempt was rolled back.
Preview is still available locally.
```

**Recovery:** Agent reports error, user can retry deployment

#### 5. Semantic ID Collision

**Detection:** Directory already exists in CV-pages repo

**Resolution:** Append timestamp to semantic ID

**Warning message:**
```
⚠️  Semantic ID collision detected

Original: 2025_11_10_company_a3f2
Using: 2025_11_10_company_a3f2_1731312000

This is rare but can happen if content hash matches existing resume.
```

#### 6. Partial Deployment

**Scenario:** Build succeeded, but push failed

**State:** Web files copied to CV-pages repo but not pushed

**Detection:** Agent detects uncommitted changes in cloned repo

**Recovery prompt:**
```
⚠️  Deployment incomplete

Web resume built successfully but push failed.

Options:
1. Retry push (recommended if network issue)
2. Clean up and start fresh

The base repository is unchanged.
Preview is still available: http://localhost:4173/CV-pages/
```

### Validation Checks

**Preview mode:**
- ✅ `resume_content.md` exists at expected path
- ✅ YAML frontmatter is valid
- ✅ Required fields present: `id`, `targetCompany`, `targetRole`
- ✅ Build output contains expected files (`index.html`, `assets/`)

**Deploy mode (all preview checks PLUS):**
- ✅ `CV_PAGES_TOKEN` environment variable set
- ✅ CV-pages repo cloned on `gh-pages` branch
- ✅ Semantic ID unique (or timestamped if collision)

## Configuration & Setup

### One-Time Setup: CV_PAGES_TOKEN

**User (Florian) configuration:**

1. Create GitHub Personal Access Token:
   - Navigate to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Name: "CV Web Resume Deployment"
   - Scopes: `repo` (Full control of private repositories)
   - Generate and copy token

2. Configure environment variable:
   ```bash
   # Add to ~/.zshrc (or ~/.bashrc)
   export CV_PAGES_TOKEN="ghp_your_token_here"

   # Reload shell
   source ~/.zshrc

   # Verify
   echo $CV_PAGES_TOKEN | grep -q "ghp_" && echo "✅ Token configured"
   ```

3. Security notes:
   - Never commit token to repository
   - Token grants write access to private repos
   - Rotate token if compromised

**Note:** Token is only required for deployment. Preview mode works without token.

### Repository Configuration

**Update .gitignore:**
```gitignore
# Web builder outputs (verify present)
resumes/web-builder/dist/
resumes/web-builder/public/resume_content.md
resumes/web-builder/.vite/

# Temporary deployment directories
/tmp/cv-pages-*
```

**Update README.md:**

Add new section "Setup for Web Resume Deployment":

```markdown
## Setup for Web Resume Deployment

### Preview (Local Testing)

No setup required! Preview works immediately:

```bash
/preview-web-resume 2025_11_10_quantumbasel_ai_specialist
```

Preview opens at: http://localhost:4173/CV-pages/

### Deployment (CV-pages Repository)

To deploy web resumes to the private CV-pages repository, configure:

**CV_PAGES_TOKEN: GitHub Personal Access Token**

**Required for:** Web resume deployment to private repository
**Not required for:** Local preview

**Setup steps:**
1. Create token at: https://github.com/settings/tokens
2. Select scope: `repo` (Full control of private repositories)
3. Set environment variable:
   ```bash
   export CV_PAGES_TOKEN="ghp_your_token_here"
   ```
4. Add to shell profile (~/.zshrc or ~/.bashrc) for persistence:
   ```bash
   echo 'export CV_PAGES_TOKEN="ghp_your_token_here"' >> ~/.zshrc
   source ~/.zshrc
   ```

**Verification:**
```bash
echo $CV_PAGES_TOKEN | grep -q "ghp_" && echo "✅ Token configured" || echo "❌ Token missing"
```

**Without this token:** Deployment will fail with authentication error (preview still works).

**Security:** Never commit this token to the repository. It grants write access to private repositories.

### Web Builder Dependencies

Install once:
```bash
cd resumes/web-builder
npm install
```

### Usage

**Preview locally (no deployment):**
```bash
/preview-web-resume {id}
```

**Deploy to CV-pages (after approval):**
- Agent workflow handles automatically
- career-planning-coach offers preview before deployment
- Requires CV_PAGES_TOKEN configured
```

**Update CLAUDE.md:**

Replace "Web Resume Build" section:

```markdown
### Web Resume Build

Web resumes are built and deployed by the `react-resume-expert` agent after content approval.

**Workflow:**
1. `swiss-tech-resume-reviewer` approves `resume_content.md`
2. `career-planning-coach` asks user: "Format: PDF, web, or both?"
3. If web selected:
   a. Ask: "Preview before deploying? (recommended)"
   b. If yes: Invoke `react-resume-expert(preview=true)`
   c. User reviews at http://localhost:4173/CV-pages/
   d. Ask: "Deploy to CV-pages?"
   e. If yes: Invoke `react-resume-expert(deploy=true)`
4. Agent returns URL to `career-planning-coach`
5. URL included in `application_strategy.md`

**Preview Mode:**
- Slash command: `/preview-web-resume {id}`
- No CV_PAGES_TOKEN required
- Opens local server: http://localhost:4173/CV-pages/
- Use during development or before final deployment

**Deploy Mode:**
- Requires `CV_PAGES_TOKEN` environment variable (see README.md)
- Deploys to private `CV-pages` repository `gh-pages` branch
- URL: https://datarian.github.io/CV-pages/cv/{semantic-id}

**Requirements:**
- Preview: Web builder dependencies installed (`npm install`)
- Deploy: CV_PAGES_TOKEN configured + private CV-pages repo exists

**Important:** Web builds NEVER exist in base repository. All building happens in temporary memory locations and is cleaned up immediately.

**Deployment URL format:**
`https://datarian.github.io/CV-pages/cv/{semantic-id}`

Where `{semantic-id}` = `{date}_{company_lowercase}_{content_hash}`

**Manual commands:**
```bash
# Preview locally
/preview-web-resume 2025_11_10_quantumbasel_ai_specialist

# Manual build (if needed)
cd resumes/web-builder
cp ../customized/{id}/resume_content.md public/
npm run build
npm run preview
```
```

Add to "Key Constraints":
```markdown
- **CV_PAGES_TOKEN**: Required environment variable for web deployment (not preview)
- **Web build privacy**: Web builds NEVER committed to base repo (gitignored)
- **Deployment timing**: Web building ONLY after swiss-tech-resume-reviewer approval
- **Preview availability**: Preview mode available anytime, no approval required
```

**Create .claude/commands/preview-web-resume.md:**

```markdown
---
name: preview-web-resume
description: Preview web resume locally without deploying to CV-pages
---

# Preview Web Resume

Build and preview a web resume locally in your browser without deploying to CV-pages.

## Usage

Provide the resume ID to preview:

**Resume ID:** {id}

Example: `2025_11_10_quantumbasel_ai_specialist`

The agent will:
1. Build the web resume from `resumes/customized/{id}/resume_content.md`
2. Start local preview server at http://localhost:4173/CV-pages/
3. Open in your default browser
4. Keep server running for review

**No deployment** - this is local only, no CV_PAGES_TOKEN required.

To stop preview server: Press Ctrl+C or close the terminal.
```

### Feature Branch Cleanup

**Delete workflow files:**
```bash
cd .worktrees/web-resume-system
rm -rf .github/workflows/deploy-web-resumes.yml
rm -rf .github/workflows/delete-web-resume.yml
git add .github/
git commit -m "chore: remove GitHub Actions workflows (replaced by agent-driven deployment)"
```

**Rationale:** These workflows are completely replaced by agent-driven deployment and should not be merged to main branch.

## Application Strategy Integration

### Web URL Recording

When `career-planning-coach` generates `application_strategy.md`, it includes web resume URLs for future reference.

**Template section:**

```markdown
## Resume Versions

This application uses the following resume materials:

**PDF Resume:**
- Location: `resumes/compiled/{timestamp}_{id}_CV_en.pdf`
- Generated: {timestamp}

**Web Resume:** (if deployed)
- URL: https://datarian.github.io/CV-pages/cv/{semantic_id}
- Semantic ID: {semantic_id}
- Access: Private (share only with intended recipients)
- Preview: Available locally via `/preview-web-resume {id}`
- Note: This interactive web version provides a modern presentation of your qualifications

**Usage Recommendations:**
- Submit PDF for ATS systems and formal applications
- Share web URL in follow-up emails or when specifically requested
- Use web version for portfolio demonstrations or technical discussions
- Preview locally before sharing: `/preview-web-resume {id}`
- Web version showcases technical skills through modern web presentation
```

**Benefits:**
- All application materials stay together in `resumes/customized/{id}/` directory
- Web URL always available when preparing for interviews or follow-ups
- Preview command documented for easy re-access
- Clear guidance on when to use each format
- Permanent record of deployed URLs

### Agent Communication Protocol

**react-resume-expert** returns structured output:

**Preview mode:**
```json
{
  "status": "success",
  "mode": "preview",
  "url": "http://localhost:4173/CV-pages/",
  "message": "Preview running. Press Ctrl+C to stop."
}
```

**Deploy mode:**
```json
{
  "status": "success",
  "mode": "deploy",
  "url": "https://datarian.github.io/CV-pages/cv/2025_11_10_quantumbasel_a3f2",
  "semantic_id": "2025_11_10_quantumbasel_a3f2",
  "deployed_at": "2025-11-10T22:30:45Z"
}
```

**career-planning-coach** uses this data to populate application strategy template:
- URL → "Web Resume" section
- Semantic ID → For reference and debugging
- Deployed timestamp → For tracking
- Mode → Determines which URL format to use

## Implementation Details

### react-resume-expert Agent Specification

**File:** `.claude/agents/react-resume-expert.md`

```markdown
---
name: react-resume-expert
description: Build and deploy React web resumes to private CV-pages repository after content approval. Supports preview mode for local testing.
---

# React Resume Expert Agent

## Role

You build and deploy web resumes using the React web builder in `resumes/web-builder/`.

**Modes:**
- **Preview mode**: Build locally, start dev server, no deployment
- **Deploy mode**: Build and deploy to private CV-pages repository

**CRITICAL (Deploy mode only):** You are ONLY invoked after `swiss-tech-resume-reviewer` has approved `resume_content.md`.

## Parameters

- `id`: Resume ID (e.g., `2025_11_10_quantumbasel_ai_specialist`)
- `preview`: Boolean (default: `false`)
  - `true`: Preview mode (local only)
  - `false`: Deploy mode (requires approval + CV_PAGES_TOKEN)

## Prerequisites Check

**Preview mode:**
1. ✅ `resume_content.md` exists at: `resumes/customized/{id}/resume_content.md`
2. ✅ YAML frontmatter valid with fields: `id`, `targetCompany`, `targetRole`

**Deploy mode (all preview checks PLUS):**
3. ✅ `CV_PAGES_TOKEN` environment variable is set
4. ✅ Content has been approved by swiss-tech-resume-reviewer

If any check fails, report error and halt.

## Preview Mode Process

### Step 1: Validate Content

```bash
id="2025_11_10_quantumbasel_ai_specialist"
content_file="resumes/customized/${id}/resume_content.md"

if [ ! -f "$content_file" ]; then
  echo "❌ Resume content not found: $content_file"
  exit 1
fi

echo "✅ Content found"
```

### Step 2: Prepare Build

```bash
# Copy content to web builder
cp "$content_file" resumes/web-builder/public/

# Navigate to builder
cd resumes/web-builder
```

### Step 3: Build Web Resume

```bash
# Clean previous builds
rm -rf dist/

# Run build
npm run build

# Verify output
if [ ! -f "dist/index.html" ]; then
  echo "❌ Build failed: dist/index.html not found"
  exit 1
fi

echo "✅ Build successful"
```

### Step 4: Start Preview Server

```bash
# Start preview server in background
npm run preview &
preview_pid=$!

# Wait for server to start
sleep 2

# Open in browser
if [[ "$OSTYPE" == "darwin"* ]]; then
  open -a "Google Chrome" http://localhost:4173/CV-pages/
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  xdg-open http://localhost:4173/CV-pages/
fi

echo ""
echo "✅ Preview running at http://localhost:4173/CV-pages/"
echo ""
echo "Press Ctrl+C to stop preview server"
echo "PID: $preview_pid"
```

### Step 5: Report Success

```
🖥️  Web Resume Preview

URL: http://localhost:4173/CV-pages/
Status: Running (PID: {preview_pid})

The preview is running locally on your machine.
Your browser should open automatically.

To stop: Press Ctrl+C or run: kill {preview_pid}

Note: This is preview only - no deployment to CV-pages.
```

Return to caller:
```json
{
  "status": "success",
  "mode": "preview",
  "url": "http://localhost:4173/CV-pages/",
  "pid": "{preview_pid}",
  "message": "Preview running. Press Ctrl+C to stop."
}
```

## Deploy Mode Process

### Step 1: Validate Environment

```bash
# Check token exists and starts with ghp_
if ! echo "$CV_PAGES_TOKEN" | grep -q "^ghp_"; then
  echo "❌ CV_PAGES_TOKEN not configured or invalid"
  echo ""
  echo "See README.md for setup instructions."
  echo ""
  echo "To preview without deploying: /preview-web-resume {id}"
  exit 1
fi

echo "✅ CV_PAGES_TOKEN configured"
```

### Step 2-3: Same as Preview Mode

Build locally first (Steps 2-3 from preview mode)

### Step 4: Clone CV-pages Repository

```bash
# Create temporary directory with timestamp
tmp_dir="/tmp/cv-pages-$(date +%s)"

# Clone private repo
git clone "https://x-access-token:${CV_PAGES_TOKEN}@github.com/datarian/CV-pages.git" "$tmp_dir"

# Checkout gh-pages branch
cd "$tmp_dir"
git checkout gh-pages

echo "✅ CV-pages repository ready"
```

### Step 5: Generate Semantic ID

```bash
# Extract metadata from resume_content.md
content_file="../../resumes/customized/${id}/resume_content.md"

date=$(echo "$id" | cut -d'_' -f1-3)
company=$(grep "targetCompany:" "$content_file" | sed 's/.*targetCompany: //' | tr '[:upper:]' '[:lower:]' | tr ' ' '_')
hash=$(sha256sum "$content_file" | cut -c1-4)

semantic_id="${date}_${company}_${hash}"

# Check for collision
if [ -d "cv/${semantic_id}" ]; then
  echo "⚠️  Semantic ID collision detected"
  timestamp=$(date +%s)
  semantic_id="${semantic_id}_${timestamp}"
  echo "Using: $semantic_id"
fi

echo "Semantic ID: $semantic_id"
```

### Step 6: Deploy Build

```bash
# Create target directory
mkdir -p "cv/${semantic_id}"

# Copy build files
cp -r "../../resumes/web-builder/dist/"* "cv/${semantic_id}/"

# Update robots.txt if needed
if [ ! -f "cv/robots.txt" ]; then
  cat > cv/robots.txt << 'EOF'
User-agent: *
Disallow: /cv/
EOF
fi

echo "✅ Files copied to cv/${semantic_id}"
```

### Step 7: Commit and Push

```bash
# Configure git
git config user.name "Claude Code Web Resume Builder"
git config user.email "noreply@anthropic.com"

# Stage changes
git add .

# Extract company name for commit message
company_name=$(grep "targetCompany:" "$content_file" | sed 's/.*targetCompany: //')

# Create commit with metadata
git commit -m "Deploy web resume: ${semantic_id}" \
           -m "" \
           -m "Resume ID: ${id}" \
           -m "Target: ${company_name}" \
           -m "" \
           -m "🤖 Generated with Claude Code" \
           -m "Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to gh-pages
git push origin gh-pages

echo "✅ Deployed to CV-pages repository"
```

### Step 8: Cleanup and Report

```bash
# Remove temporary repo
rm -rf "$tmp_dir"

# Remove copied content from web builder
rm resumes/web-builder/public/resume_content.md

# Report success
deployment_url="https://datarian.github.io/CV-pages/cv/${semantic_id}"
deployed_at=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo ""
echo "✅ Web resume deployed successfully"
echo ""
echo "URL: ${deployment_url}"
echo "Semantic ID: ${semantic_id}"
echo "Deployed: ${deployed_at}"
echo ""
echo "Note: This URL is private. Share only with intended recipients."
echo ""
echo "To preview locally: /preview-web-resume ${id}"
```

### Step 9: Return Structured Output

Return to `career-planning-coach`:

```json
{
  "status": "success",
  "mode": "deploy",
  "url": "https://datarian.github.io/CV-pages/cv/{semantic_id}",
  "semantic_id": "{semantic_id}",
  "deployed_at": "{timestamp}"
}
```

## Error Handling

Each step checks exit codes and reports specific errors:

**Preview mode:**
- **Content missing:** File path, suggestions to create
- **Build failed:** npm output, common causes (dependencies, TypeScript errors)
- **Server failed:** Port conflict, build output missing

**Deploy mode (all preview errors PLUS):**
- **Token missing:** Detailed setup instructions, suggest preview mode
- **Clone failed:** Token permissions, network issues
- **Push failed:** Network, permissions, conflicts
- **Semantic collision:** Append timestamp to ID

On any error:
1. Clean up partial work (rm temp directories, stop servers)
2. Report specific error with context
3. Provide actionable recovery instructions
4. Suggest preview mode if deployment failed
5. Return error status to caller

## Output Requirements

**Preview mode:**
- 🖥️  Status indicator with local URL
- 🔧 PID for server management
- 📋 Instructions to stop server
- 💡 Reminder this is local only

**Deploy mode:**
- ✅ Status indicator (success/failure)
- 🔗 Full deployment URL
- 🆔 Semantic ID for reference
- 🕒 Deployment timestamp
- 📋 Privacy reminder
- 🖥️  Preview command for future reference

Format output for copy-paste usability.
```

### Slash Command: /preview-web-resume

**File:** `.claude/commands/preview-web-resume.md`

```markdown
---
name: preview-web-resume
description: Preview web resume locally without deploying to CV-pages
---

# Preview Web Resume

Build and preview a web resume locally in your browser without deploying to CV-pages.

## What You Need

Provide the resume ID to preview (e.g., `2025_11_10_quantumbasel_ai_specialist`)

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
- Review before requesting formal approval
- Test web builder changes
- Demonstrate locally to others

## Stopping Preview

Press `Ctrl+C` in the terminal or close the terminal window.

## Next Steps

If you're happy with the preview and content is approved:
- Use the career-planning-coach workflow to deploy to CV-pages
- Or manually deploy via `react-resume-expert` agent in deploy mode
```

### career-planning-coach Modifications

**Add preview integration after approval:**

```markdown
## After Content Approval

When `swiss-tech-resume-reviewer` approves `resume_content.md`:

1. Ask user for format selection:
   ```
   Resume content approved! Which format would you like?

   Options:
   - PDF only (traditional, ATS-optimized)
   - Web only (modern, interactive)
   - Both PDF and web (recommended)
   ```

2. If user selects "web" or "both":

   a. Offer preview:
   ```
   Preview web resume before deploying? (recommended)

   Options:
   - Yes, show me a preview first
   - No, deploy directly to CV-pages
   ```

   b. If preview requested:
      - Invoke `react-resume-expert(id={id}, preview=true)`
      - Agent opens http://localhost:4173/CV-pages/
      - User reviews in browser

   c. After preview (or if skipped):
   ```
   Deploy to CV-pages?

   This will make the web resume available at:
   https://datarian.github.io/CV-pages/cv/{semantic-id}

   Note: This URL is private - share only with intended recipients.
   ```

   d. If user confirms deployment:
      - Invoke `react-resume-expert(id={id}, preview=false)`
      - Capture deployment URL from response

3. Generate PDF if requested:
   - Invoke `latex-moderncv-expert`
   - Capture PDF path

4. Generate `application_strategy.md`:
   - Include "Resume Versions" section
   - Add PDF location if generated
   - Add web URL if deployed
   - Add preview command for future reference
   - Provide usage recommendations

5. Report to user:
   ```
   ✅ Resume generation complete

   Materials created:
   - PDF: resumes/compiled/{timestamp}_{id}_CV_en.pdf
   - Web: https://datarian.github.io/CV-pages/cv/{semantic_id}
   - Strategy: resumes/customized/{id}/application_strategy.md

   Preview locally: /preview-web-resume {id}

   Next steps:
   - Review application strategy for cover letter guidance
   - Submit PDF to ATS systems
   - Share web URL in follow-up communications
   ```
```

## Testing Strategy

### Manual Testing Checklist

Before considering implementation complete, test:

**Preview Mode:**
- [ ] Preview works without CV_PAGES_TOKEN
- [ ] Build succeeds with valid resume_content.md
- [ ] Server starts on port 4173
- [ ] Browser opens automatically
- [ ] Resume renders correctly
- [ ] Multiple previews work (server restart)
- [ ] Cleanup happens (temp files removed)

**Deploy Mode:**
- [ ] **Environment setup:**
  - [ ] CV_PAGES_TOKEN configured correctly
  - [ ] Token has `repo` scope
  - [ ] Token can push to CV-pages repo

- [ ] **Happy path deployment:**
  - [ ] Build succeeds with valid resume_content.md
  - [ ] Semantic ID generated correctly
  - [ ] Files deployed to CV-pages repo
  - [ ] URL accessible and renders correctly
  - [ ] Application strategy includes URL and preview command

**Error Handling:**
- [ ] Missing token (deploy mode) produces clear error + suggests preview
- [ ] Invalid token caught early
- [ ] Build failures reported with details
- [ ] Network issues handled gracefully
- [ ] Partial deployments cleaned up
- [ ] Preview server port conflicts handled

**Cleanup Verification:**
- [ ] No web files in base repo after preview
- [ ] No web files in base repo after deployment
- [ ] Temporary directories removed
- [ ] resume_content.md removed from web-builder/public/
- [ ] Preview server stops cleanly

**Integration:**
- [ ] career-planning-coach offers preview
- [ ] career-planning-coach captures deployment URL
- [ ] Application strategy template populated correctly
- [ ] User receives all expected materials
- [ ] /preview-web-resume slash command works

### Validation Commands

```bash
# Verify no web builds committed
git status | grep -q "resumes/customized/.*/web" && echo "❌ Web files in repo!" || echo "✅ Clean"

# Verify gitignore rules
cat .gitignore | grep -q "resumes/web-builder/dist/" && echo "✅ Gitignore configured"

# Verify token configured (optional for preview)
echo "$CV_PAGES_TOKEN" | grep -q "^ghp_" && echo "✅ Token present" || echo "⚠️  Token missing (preview still works)"

# Test web builder locally
cd resumes/web-builder
npm install
npm run build
npm run preview
```

### Test Scenarios

**Scenario 1: Preview During Development**
```
User: "/preview-web-resume 2025_11_10_quantumbasel_ai_specialist"
Expected: Server starts, browser opens, resume displays
Verify: No deployment, no CV_PAGES_TOKEN required
```

**Scenario 2: Preview Before Deployment**
```
User: Completes resume workflow, selects "web", chooses "preview first"
Expected: Preview opens, user reviews, confirms deployment
Verify: Two agent invocations (preview + deploy), both successful
```

**Scenario 3: Deploy Without Preview**
```
User: Completes resume workflow, selects "web", chooses "deploy directly"
Expected: Deployment succeeds, URL returned
Verify: Single agent invocation (deploy only), application strategy has URL
```

**Scenario 4: Preview Without Token**
```
User: "/preview-web-resume {id}" with CV_PAGES_TOKEN unset
Expected: Preview works fine, no error about missing token
Verify: Preview mode doesn't check for token
```

**Scenario 5: Deploy Without Token**
```
User: Attempts deployment with CV_PAGES_TOKEN unset
Expected: Clear error message, suggestion to use preview mode
Verify: No partial deployment, clean failure
```

## Success Criteria

Implementation is complete when:

1. ✅ `react-resume-expert` agent exists with preview + deploy modes
2. ✅ `/preview-web-resume` slash command works
3. ✅ `career-planning-coach` integrates preview offer
4. ✅ Preview works without CV_PAGES_TOKEN
5. ✅ Web deployments succeed without touching base repo
6. ✅ Application strategies include web URLs + preview command
7. ✅ README.md documents CV_PAGES_TOKEN setup and preview usage
8. ✅ CLAUDE.md reflects agent-driven workflow with preview
9. ✅ GitHub Actions workflows removed from feature branch
10. ✅ All manual testing checklist items pass
11. ✅ User can preview and deploy web resume end-to-end successfully

## Migration Path

### From Current State to New System

1. **Feature branch cleanup:**
   - Delete GitHub Actions workflows
   - Commit deletion: "chore: remove GitHub workflows (replaced by agent)"

2. **Main branch updates:**
   - Merge cleaned feature branch (workflows removed)
   - Update README.md with setup and preview instructions
   - Update CLAUDE.md with new workflow

3. **Agent implementation:**
   - Create `.claude/agents/react-resume-expert.md` (with preview mode)
   - Create `.claude/commands/preview-web-resume.md`
   - Update `.claude/agents/career-planning-coach.md`
   - Test preview with existing resume
   - Test deployment with existing resume

4. **Verification:**
   - Run through manual testing checklist
   - Deploy test web resume to CV-pages
   - Verify privacy (no web files in base repo)
   - Test preview mode extensively

5. **Documentation:**
   - Commit design document
   - Update any remaining references to workflows

### Rollback Plan

If deployment fails in production:
1. No rollback needed for base repo (no changes committed)
2. Delete problematic deployment from CV-pages repo
3. Fix agent issues
4. Test with preview mode first
5. Retry deployment

Preview mode provides safe testing ground before deployment.

## Future Enhancements

Potential improvements (not in scope for initial implementation):

- **Deployment history:** Track all deployments in manifest file
- **Deletion command:** Slash command to remove old web resumes
- **A/B testing:** Deploy multiple versions with different formatting
- **Analytics:** Track which web resumes get visited
- **Customization:** Per-resume themes or styling options
- **Multi-browser preview:** Test in different browsers automatically
- **Mobile preview:** Preview in mobile viewport sizes

## Conclusion

This design replaces unreliable GitHub Actions workflows with a robust, agent-driven deployment system that:

- ✅ Enforces review-first workflow naturally
- ✅ Maintains strict privacy (no data in public repo)
- ✅ Provides preview before deployment
- ✅ Gives user visibility and control
- ✅ Records deployment URLs for future reference
- ✅ Works offline for preview (no token needed)
- ✅ Simplifies maintenance (no workflow debugging)

The preview functionality adds significant value by allowing rapid iteration during development without requiring deployment credentials or approval processes.

The agent-based approach aligns with the existing CV generation system and provides a cleaner, more maintainable, and more user-friendly solution than automated CI/CD workflows.
