import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import type { EducationItem } from '../types/resume';
import { renderMarkdown } from '../utils/parseResume';

interface Props {
  education: EducationItem[];
}

export const EducationSection: React.FC<Props> = ({ education }) => {
  return (
    <section className="mb-10">
      <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-cv-blue">
        <h2 className="text-3xl font-bold text-cv-blue mb-6 flex items-center gap-3 print:text-black">
          <GraduationCap className="w-8 h-8 print:hidden" />
          Education
        </h2>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="group bg-cv-light rounded-lg p-6 hover:shadow-md transition-all duration-200 border border-transparent hover:border-cv-blue/20 print:shadow-none print:bg-white"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-cv-blue transition-colors">
                {edu.degree}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-sm text-cv-gray mb-3 print:text-gray-700">
                <div className="flex items-center gap-2 font-semibold">
                  <GraduationCap className="w-4 h-4 text-cv-blue print:hidden" />
                  <span>{edu.institution}</span>
                </div>

                {edu.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cv-coral print:hidden" />
                    <span>{edu.location}</span>
                  </div>
                )}

                {edu.dates && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cv-green print:hidden" />
                    <span>{edu.dates}</span>
                  </div>
                )}
              </div>

              {edu.description && (
                <div
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(edu.description) }}
                  className="text-gray-700 text-sm leading-relaxed mt-2"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
