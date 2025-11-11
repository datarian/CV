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

export interface Highlight {
  metric: string;  // e.g., "8+ Years", "1M+"
  label: string;   // e.g., "Experience", "Daily Requests"
  icon: string;    // Lucide icon name: "calendar", "activity", "target", etc.
}

export interface ResumeData {
  metadata: ResumeMetadata;
  header: ResumeHeader;
  summary: string; // Markdown string
  summaryHighlights?: Highlight[]; // Optional manual highlights for summary section
  experience: ExperienceItem[];
  skills: ResumeSkills;
  education: EducationItem[];
  projects?: ProjectItem[];
}

export interface ParsedResume {
  data: ResumeData;
  rawContent: string; // Original markdown for reference
}
