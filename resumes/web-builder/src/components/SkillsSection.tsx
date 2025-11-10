import React from 'react';
import type { ResumeSkills } from '../types/resume';

interface Props {
  skills: ResumeSkills;
}

export const SkillsSection: React.FC<Props> = ({ skills }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-cv-blue mb-4 print:text-black">
        Technical Skills
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(skills).map(([category, skillsList]) => (
          <div key={category} className="flex gap-2">
            <span className="font-semibold text-gray-900 whitespace-nowrap">
              {category}:
            </span>
            <span className="text-gray-700">{skillsList}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
