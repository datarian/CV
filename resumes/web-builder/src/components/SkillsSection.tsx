import React from 'react';
import {
  Code2, Database, Cloud, GitBranch, Box, Terminal,
  Braces, Server, Brain, LineChart, Cpu, Package
} from 'lucide-react';
import type { ResumeSkills } from '../types/resume';

interface Props {
  skills: ResumeSkills;
}

// Map skill categories to icons
const categoryIcons: Record<string, React.ComponentType<any>> = {
  'ML/AI Frameworks': Brain,
  'Cloud & Infrastructure': Cloud,
  'Programming Languages': Code2,
  'Data Engineering': Database,
  'MLOps & DevOps': GitBranch,
  'Databases': Database,
  'Tools & Technologies': Package,
  'Backend Development': Server,
  'Frontend Development': Braces,
  'Version Control': GitBranch,
  'Containerization': Box,
  'Monitoring': LineChart,
  'CI/CD': Terminal,
  'Compute': Cpu,
};

export const SkillsSection: React.FC<Props> = ({ skills }) => {
  const getIcon = (category: string) => {
    // Try exact match first
    if (categoryIcons[category]) return categoryIcons[category];

    // Fuzzy match
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('ml') || lowerCategory.includes('ai')) return Brain;
    if (lowerCategory.includes('cloud')) return Cloud;
    if (lowerCategory.includes('data')) return Database;
    if (lowerCategory.includes('lang')) return Code2;
    if (lowerCategory.includes('dev')) return Terminal;

    // Default
    return Package;
  };

  return (
    <section id="skills-section" className="mb-10 scroll-mt-8">
      <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-cv-green">
        <h2 className="text-3xl font-bold text-cv-blue mb-6 flex items-center gap-3">
          <Code2 className="w-8 h-8" />
          Technical Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, skillsList]) => {
            const Icon = getIcon(category);
            return (
              <div
                key={category}
                className="group bg-cv-light rounded-lg p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-1 border border-transparent hover:border-cv-blue/20"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white group-hover:bg-cv-blue/10 transition-colors flex-shrink-0 shadow-sm">
                    <Icon className="w-6 h-6 text-cv-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">
                      {category}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {skillsList}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
