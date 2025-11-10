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
