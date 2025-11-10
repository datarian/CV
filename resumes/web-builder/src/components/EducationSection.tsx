import React from 'react';
import type { EducationItem } from '../types/resume';
import { renderMarkdown } from '../utils/parseResume';

interface Props {
  education: EducationItem[];
}

export const EducationSection: React.FC<Props> = ({ education }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-cv-blue mb-4 print:text-black">
        Education
      </h2>

      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="border-l-2 border-cv-blue pl-4 print:border-gray-400">
            <h3 className="text-lg font-semibold text-gray-900">
              {edu.degree}
            </h3>
            <div className="text-sm text-cv-gray mb-1 print:text-gray-700">
              <span className="font-medium">{edu.institution}</span>
              {edu.location && <span> | {edu.location}</span>}
              {edu.dates && <span> | {edu.dates}</span>}
            </div>

            {edu.description && (
              <div
                dangerouslySetInnerHTML={{ __html: renderMarkdown(edu.description) }}
                className="text-sm text-gray-700 mt-2"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
