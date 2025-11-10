import React from 'react';
import type { ExperienceItem } from '../types/resume';
import { renderMarkdown } from '../utils/parseResume';

interface Props {
  experiences: ExperienceItem[];
}

export const ExperienceSection: React.FC<Props> = ({ experiences }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-cv-blue mb-4 print:text-black">
        Experience
      </h2>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l-2 border-cv-blue pl-4 print:border-gray-400">
            <h3 className="text-xl font-semibold text-gray-900">
              {exp.title}
            </h3>
            <div className="text-sm text-cv-gray mb-2 print:text-gray-700">
              <span className="font-medium">{exp.company}</span>
              {exp.location && <span> | {exp.location}</span>}
              {exp.dates && <span> | {exp.dates}</span>}
            </div>

            <ul className="list-disc list-outside ml-5 space-y-1 text-gray-700">
              {exp.achievements.map((achievement, idx) => (
                <li
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(achievement) }}
                  className="achievement-bullet"
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
