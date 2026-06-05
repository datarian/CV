# Personal Profile Data Schema

This document defines the structure for the `PERSONAL_PROFILE.md` file, which serves as the single source of truth for all resume variations.

## Purpose

The Personal Profile is a comprehensive markdown file containing all your professional information. It enables:
- **Data-driven resume generation**: Pull specific sections for different roles
- **Consistency**: Single source of truth across all resume variations
- **Easy updates**: Update once, regenerate all resumes
- **Version control**: Track career progression over time

## File Location

**Path**: `docs/PERSONAL_PROFILE.md`

**Privacy**: This file is `.gitignore`d to protect your personal information. You can commit an anonymized version or example if sharing the repository.

## Complete Schema

```markdown
# Personal Profile

## Basic Information

- **Name**: Full Legal Name
- **Professional Title**: Current or Target Title (e.g., "Senior ML Engineer")
- **Location**: City, Canton, Country
- **Email**: professional.email@example.com
- **Phone**: +41 XX XXX XX XX
- **LinkedIn**: linkedin.com/in/username
- **GitHub**: github.com/username
- **Website**: personalwebsite.com (optional)
- **Date of Birth**: DD.MM.YYYY (Swiss format, optional but common)
- **Nationality**: Swiss / EU / Other
- **Work Authorization**: Swiss citizen / B permit / C permit / EU citizen - no permit required

## Professional Summary

Write 2-3 sentences capturing:
- Professional identity and years of experience
- Core expertise areas and technologies
- What you're looking for in your next role

Example:
> Senior Data Scientist with 8+ years building production ML systems in fintech
> and e-commerce. Specialized in MLOps, model deployment, and cross-functional
> team leadership. Seeking senior technical roles in ML infrastructure and AI
> platform engineering in the Zurich area.

## Current Situation

- **Current Role**: Exact job title
- **Current Company**: Company name
- **Start Date**: MM/YYYY
- **Current Salary**: XXX kCHF (gross annual)
- **Target Salary**: XXX kCHF (desired for next role)
- **Target Roles**: List of 3-5 target job titles
- **Target Market**: Geographic region and preferred companies
- **Notice Period**: X weeks/months

## Career Objectives

### Short-term (Next Role - 0-2 years)
Describe what you want in your immediate next position:
- Role type and seniority
- Industry preferences
- Company size/culture
- Must-have requirements

### Mid-term (2-5 years)
Career direction over the next few years:
- Career track (IC vs management)
- Skill development goals
- Industry positioning

### Long-term (5+ years)
Ultimate career vision:
- Aspirational role
- Impact goals
- Work-life balance considerations

## Professional Experience

### [Company Name] | [Job Title]
**Location**: City, Country
**Duration**: MM/YYYY - MM/YYYY (or Present)
**Technologies**: Python, TensorFlow, AWS, Docker, Kubernetes, PostgreSQL

**Context**:
Brief description of company, team size, your role in the organization.

**Key Responsibilities**:
- Responsibility 1 (focus on scope and ownership)
- Responsibility 2
- Responsibility 3

**Major Achievements**:
- Achievement 1 with quantified impact (e.g., "Reduced inference latency by 60%
  from 800ms to 320ms, improving user experience for 2M+ daily users")
- Achievement 2 with business metrics (e.g., "Delivered recommendation system
  generating CHF 12M incremental annual revenue")
- Achievement 3 with scale metrics (e.g., "Built data pipeline processing 50M+
  events daily with 99.95% uptime")

**Technical Deep Dive** (optional for key roles):
Detailed description of 1-2 most impressive projects:
- Problem statement and business context
- Technical approach and architecture decisions
- Technologies and tools used
- Challenges overcome
- Results and impact

**Leadership & Collaboration**:
- Team size led/mentored
- Cross-functional collaboration
- Stakeholder management
- Knowledge sharing (presentations, documentation, mentoring)

### [Previous Company] | [Previous Role]
[Repeat structure above for each role]

## Education

### [Degree] in [Field] | [Institution]
**Location**: City, Country
**Duration**: MM/YYYY - MM/YYYY
**Grade**: GPA / Final Grade / Distinction (if notable)

**Thesis/Capstone** (if relevant):
- Title: "Thesis Title"
- Description: Brief summary
- Supervisor: Prof. Name
- Publications: If resulted in papers

**Relevant Coursework**:
- Course 1 (especially relevant to target roles)
- Course 2
- Course 3

**Academic Achievements**:
- Scholarships, awards, honors
- Dean's list, cum laude, etc.
- Academic competitions

### [Additional Degrees]
[Repeat structure for Masters, PhD, Postdoc, etc.]

## Technical Skills

Organize by category, list from strongest to weakest within each category.

### Programming Languages
- **Expert**: Python (8+ years), SQL (7+ years)
- **Proficient**: Java, Scala, R
- **Familiar**: Go, JavaScript, C++

### Machine Learning & AI
- **Frameworks**: PyTorch, TensorFlow, scikit-learn, XGBoost, Hugging Face
- **Specializations**: NLP, Computer Vision, Time Series, Recommendation Systems
- **MLOps**: MLflow, Kubeflow, SageMaker, Vertex AI

### Data Engineering
- **Processing**: Apache Spark, Airflow, Kafka, Flink
- **Databases**: PostgreSQL, MongoDB, Redis, Elasticsearch
- **Warehousing**: Snowflake, BigQuery, Redshift

### Cloud & Infrastructure
- **AWS**: EC2, S3, Lambda, SageMaker, EMR, RDS (Certified Solutions Architect)
- **GCP**: Compute Engine, BigQuery, Vertex AI
- **Azure**: Basic knowledge
- **Containerization**: Docker, Kubernetes, Docker Compose
- **IaC**: Terraform, CloudFormation

### Software Engineering
- **Version Control**: Git, GitHub, GitLab
- **CI/CD**: Jenkins, GitHub Actions, CircleCI
- **Testing**: Pytest, Unittest, Integration Testing
- **APIs**: REST, GraphQL, gRPC

### Other Tools & Technologies
- **Visualization**: Matplotlib, Plotly, Tableau, Looker
- **Notebooks**: Jupyter, Google Colab
- **Collaboration**: Jira, Confluence, Slack, Notion

## Language Proficiency

Use Common European Framework of Reference (CEFR) levels: A1, A2, B1, B2, C1, C2

### [Language 1]
- **Level**: C2 (Native)
- **Context**: Native speaker / Raised bilingual / 20+ years

### [Language 2]
- **Level**: C1 (Advanced)
- **Context**: Professional working proficiency / Daily business use

### [Language 3]
- **Level**: B2 (Upper Intermediate)
- **Context**: Comfortable in professional settings / Can present and negotiate

### [Language 4]
- **Level**: A2 (Elementary)
- **Context**: Basic conversation / Actively learning

## Certifications & Training

### Professional Certifications
- **AWS Certified Solutions Architect - Associate** (MM/YYYY - MM/YYYY)
  - Credential ID: XXXXX
  - Verification: aws.amazon.com/verification/XXXXX

- **Google Cloud Professional Data Engineer** (MM/YYYY)
- **Certified Kubernetes Administrator (CKA)** (MM/YYYY)

### Academic Certificates
- **CAS in Applied Data Science** | ETH Zurich (MM/YYYY - MM/YYYY)
- **Deep Learning Specialization** | Coursera (MM/YYYY)

### Workshops & Bootcamps
- **Advanced NLP with Transformers** | Hugging Face (MM/YYYY)
- **MLOps Bootcamp** | Full Stack Deep Learning (MM/YYYY)

## Publications & Patents

### Peer-Reviewed Publications
1. **Author1, You, Author3** (YYYY). "Paper Title." *Conference/Journal Name*.
   DOI: XX.XXXX/XXXXX. [Link](URL)
   - Brief description of contribution and impact
   - Citations: XX (Google Scholar)

2. **You, Co-author** (YYYY). "Another Paper." *Venue*.

### Patents
1. **Patent Title** - Patent Number: US XXXXXXX
   - Filed: MM/YYYY | Granted: MM/YYYY
   - Brief description of invention

### Preprints & Technical Reports
- **You et al.** (YYYY). "Title." arXiv:XXXX.XXXXX. [Link](URL)

## Open Source Contributions

### Projects You Maintain
1. **ProjectName** | github.com/username/project
   - Description: Brief description of what it does
   - Stars: XXX | Forks: XX | Contributors: XX
   - Technologies: Python, TensorFlow, FastAPI
   - Impact: Downloaded XXX times/month, used by YYY companies

### Significant Contributions
1. **PopularProject** | Contributor since MM/YYYY
   - Contribution: Description of major PRs or features
   - PRs Merged: XX
   - Impact: Feature used by XX% of users

2. **AnotherProject**
   - Contribution: Bug fixes, documentation improvements
   - PRs: #XXX, #XXX, #XXX

## Conference Presentations & Public Speaking

### Conference Talks
1. **"Talk Title"** | Conference Name | City, Country | MM/YYYY
   - Audience: ~XXX attendees
   - Topic: Brief description
   - Recording: [Link](URL) (if available)

### Meetups & Workshops
1. **"Workshop: Hands-on MLOps"** | Zurich Python Meetup | MM/YYYY
   - Organized hands-on workshop for XX participants
   - Materials: [GitHub](URL)

### Podcasts & Interviews
1. **Podcast Name** - Episode: "Episode Title" | MM/YYYY
   - Link: [URL](URL)
   - Topics discussed

## Professional Memberships & Community

### Professional Organizations
- **Swiss Data Science Association** (Member since YYYY)
- **ACM** (Association for Computing Machinery) - Member ID: XXXXX

### Community Involvement
- **Zurich Machine Learning Meetup** - Co-organizer (YYYY - Present)
  - Organize monthly events with XXX+ regular attendees
- **PyData Zurich** - Volunteer speaker coordinator

## Awards & Recognition

### Professional Awards
1. **Best ML Innovation Award** | Company Internal Awards | YYYY
   - Recognized for developing novel approach to XYZ
   - Impact: Saved company CHF 2M annually

### Academic Honors
1. **Dean's List** | University Name | YYYY-YYYY
2. **Best Master's Thesis Award** | Department Name | YYYY

### Hackathons & Competitions
1. **Kaggle Competition: Competition Name** - Top 5% (Rank: XX/XXXX) | MM/YYYY
   - Approach: Brief technical description

## Side Projects & Personal Work

### Active Projects
1. **ProjectName** | github.com/username/project | MM/YYYY - Present
   - Description: What problem it solves
   - Technologies: Tech stack
   - Users/Impact: XX users, YY downloads, etc.
   - Learnings: What you learned building this

### Completed Projects
1. **ProjectName** | MM/YYYY - MM/YYYY
   - Description and outcome

## Volunteer Work & Social Impact

### Tech-for-Good Projects
1. **Organization Name** | Role | MM/YYYY - MM/YYYY
   - Description of contribution
   - Impact: Quantified social impact

### Mentorship & Teaching
1. **Mentor** | Platform/Organization | MM/YYYY - Present
   - Mentored XX students/professionals in data science career transitions
   - Focus areas: ML engineering, career development

## Interests & Hobbies

Choose professionally relevant or team-oriented activities that show culture fit:

### Technical Interests
- Contributing to open-source ML projects
- Blogging about MLOps best practices (blog.example.com)
- Experimenting with new ML frameworks and tools

### Personal Interests
- Mountain hiking (Swiss Alps, 4000m+ peaks)
- Chess (FIDE rating: XXXX)
- Photography (focus on landscape/nature)

**Why include**: Shows work-life balance, team activities, cultural fit

## References

### Professional References

**Reference 1**:
- Name: Dr. FirstName LastName
- Title: Principal ML Engineer
- Company: Company Name
- Relationship: Direct manager for 3 years (2020-2023)
- Email: reference1@company.com
- Phone: +41 XX XXX XX XX

**Reference 2**:
- Name: FirstName LastName
- Title: VP of Engineering
- Company: Company Name
- Relationship: Skip-level manager / Executive sponsor
- Email: reference2@company.com

**Reference 3**:
- Name: Prof. FirstName LastName
- Title: Professor of Computer Science
- Institution: ETH Zurich
- Relationship: Master's thesis advisor
- Email: reference3@ethz.ch

**Note**: Always ask permission before listing someone as a reference

## Additional Information

### Military Service (Swiss nationals)
- **Swiss Military Service** (YYYY-YYYY): Rank, Specialization
  - Example: "Swiss Military Service (2010-2011): IT Systems Specialist"

### Civil Status (optional, becoming less common)
- Married / Single / Divorced (generally omit unless specifically requested)

### Visa Sponsorship Needs
- Clearly state if you need sponsorship or have existing authorization
- Example: "B permit valid until MM/YYYY" or "No visa sponsorship required (EU citizen)"

### Salary History (for negotiation reference)
Track your compensation progression:
- Company 1 (YYYY-YYYY): XXX kCHF
- Company 2 (YYYY-YYYY): XXX kCHF
- Current: XXX kCHF
- Target: XXX kCHF (+ equity/bonus if applicable)

### Geographic Preferences
- Willing to relocate: Yes/No
- Preferred locations: Zurich, Zug, Basel
- Remote work preference: Hybrid (3 days office) / Fully remote / Office-based

### Notice Period & Availability
- Current notice period: X months
- Preferred start date: MM/YYYY
- Vacation planned: Dates (if relevant for job search timing)

---

## Usage Guidelines

### Keeping It Updated
- Update after completing major projects or achievements
- Add new skills and technologies as you learn them
- Update salary information after raises/bonuses
- Track certifications and renewals

### Privacy Considerations
- Do NOT commit PERSONAL_PROFILE.md with real personal data to public repos
- Use PERSONAL_PROFILE.example.md with anonymized data for sharing
- Gitignore the actual PERSONAL_PROFILE.md file

### Resume Generation Workflow
1. Maintain comprehensive PERSONAL_PROFILE.md with ALL experience
2. For each job application, pull relevant sections
3. Tailor emphasis and keywords to specific job posting
4. Quantify achievements differently based on what matters to that role

### Quantification Tips
Always include at least one of:
- **Scale**: "Processing 50M events daily", "Serving 2M users"
- **Performance**: "Reduced latency by 60%", "Improved accuracy from 85% to 94%"
- **Business Impact**: "Generated CHF 12M revenue", "Saved CHF 2M annually"
- **Efficiency**: "Reduced deployment time by 65%", "Cut costs by 40%"
- **Team/Scope**: "Led team of 5", "Managed $2M budget"

---

## Template Download

Create your PERSONAL_PROFILE.md:

```bash
cp docs/PERSONAL_PROFILE.example.md docs/PERSONAL_PROFILE.md
# Then fill in with your actual information
```

**Remember**: This is your single source of truth. Keep it comprehensive, quantified, and up-to-date!
