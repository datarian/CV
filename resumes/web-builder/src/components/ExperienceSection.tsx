import React from 'react';
import { Briefcase, MapPin, Calendar, TrendingUp } from 'lucide-react';
import type { ExperienceItem } from '../types/resume';
import { renderMarkdown } from '../utils/parseResume';

interface Props {
  experiences: ExperienceItem[];
}

export const ExperienceSection: React.FC<Props> = ({ experiences }) => {
  return (
    <section className="mb-10">
      <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-cv-coral">
        <h2 className="text-3xl font-bold text-cv-blue mb-8 flex items-center gap-3">
          <Briefcase className="w-8 h-8" />
          Professional Experience
        </h2>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cv-blue via-cv-coral to-cv-green" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-16">
                {/* Timeline Dot */}
                <div className="absolute left-0 top-2 flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-cv-coral shadow-lg z-10">
                  <TrendingUp className="w-5 h-5 text-cv-coral" />
                </div>

                {/* Experience Card */}
                <div className="group bg-gradient-to-br from-white to-cv-light rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-cv-blue/30">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-cv-blue transition-colors">
                      {exp.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-cv-gray">
                      <div className="flex items-center gap-2 font-semibold">
                        <Briefcase className="w-4 h-4 text-cv-blue" />
                        <span>{exp.company}</span>
                      </div>

                      {exp.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-cv-coral" />
                          <span>{exp.location}</span>
                        </div>
                      )}

                      {exp.dates && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-cv-green" />
                          <span>{exp.dates}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Achievements */}
                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-700 leading-relaxed"
                      >
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-cv-blue mt-2" />
                        <div
                          dangerouslySetInnerHTML={{ __html: renderMarkdown(achievement) }}
                          className="achievement-bullet flex-1"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
