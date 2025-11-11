# Web Resume Agent Test Plan

## Test 1: Preview Mode (No Credentials)

**Goal:** Verify preview works without CV_PAGES_TOKEN

**Steps:**
1. Ensure CV_PAGES_TOKEN is NOT set: `unset CV_PAGES_TOKEN`
2. Run: `/preview-web-resume 2025_11_10_quantumbasel_ai_specialist`
3. Verify server starts and browser opens
4. Check resume displays correctly
5. Stop server with Ctrl+C

**Expected:** Preview works perfectly, no errors about missing token

## Test 2: Deploy Mode (With Credentials)

**Goal:** Verify deployment to CV-pages repository

**Prerequisites:**
- CV_PAGES_TOKEN configured
- Content approved by swiss-tech-resume-reviewer

**Steps:**
1. Verify token: `echo $CV_PAGES_TOKEN | grep -q "ghp_" && echo "OK"`
2. Run career-planning-coach workflow with web format selected
3. Choose "deploy" option
4. Verify deployment succeeds
5. Check URL is accessible: `https://datarian.github.io/CV-pages/cv/{semantic-id}`
6. Verify application_strategy.md includes URL

**Expected:** Deployment succeeds, URL works, no files in base repo

## Test 3: Error Handling (Missing Token)

**Goal:** Verify clear error when token missing during deployment

**Steps:**
1. Unset token: `unset CV_PAGES_TOKEN`
2. Attempt deployment via career-planning-coach (skip preview)
3. Verify error message is helpful

**Expected:**
- Clear error about missing CV_PAGES_TOKEN
- Instructions for setup
- Suggestion to use preview mode instead

## Test 4: Privacy Verification

**Goal:** Ensure no private data in base repo

**Steps:**
1. After any preview or deployment
2. Run: `git status`
3. Run: `ls resumes/customized/*/web/ 2>/dev/null`
4. Run: `ls resumes/web-builder/dist/ 2>/dev/null`

**Expected:**
- `git status` shows clean (or only intended commits)
- No web/ directories in resumes/customized/
- No dist/ directory or it's gitignored

## Test 5: Multiple Previews

**Goal:** Verify can run preview multiple times during iteration

**Steps:**
1. Run preview for resume A
2. While server running, edit resume_content.md
3. Stop first preview (Ctrl+C)
4. Run preview again for same resume
5. Verify changes reflected

**Expected:** Second preview shows updated content, no conflicts

## Success Criteria

All tests pass with:
- ✅ Preview works without credentials
- ✅ Deploy requires and uses credentials correctly
- ✅ Error messages helpful and actionable
- ✅ No private data in base repo
- ✅ Multiple iterations work smoothly
