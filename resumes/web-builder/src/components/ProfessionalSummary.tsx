import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Sparkles } from 'lucide-react';
import { extractHighlights, getIconComponent } from '../utils/extractHighlights';
import type { Highlight } from '../types/resume';

interface Props {
  summary: string;
  skills?: string[]; // Top skills to highlight as tags
  highlights?: Highlight[]; // Optional manual highlights from YAML
}

export const ProfessionalSummary: React.FC<Props> = ({ summary, skills = [], highlights }) => {
  const scrollToSkills = () => {
    document.getElementById('skills-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Use provided highlights or auto-extract from summary
  const displayHighlights = highlights || extractHighlights(summary);

  return (
    <section className="mb-10">
      <div className="bg-gradient-to-br from-white to-cv-light rounded-lg shadow-md p-8 border-l-4 border-cv-blue">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cv-blue/10">
            <Sparkles className="w-6 h-6 text-cv-blue" />
          </div>
          <h2 className="text-3xl font-bold text-cv-blue">
            Professional Summary
          </h2>
        </div>

        {/* Two-column layout: Summary text (left) + Highlights (right) */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Summary text */}
          <div className="flex-1 text-lg text-gray-700 leading-relaxed prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                p: ({node, ...props}) => <p className="mb-4 last:mb-0" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-cv-blue" {...props} />,
                em: ({node, ...props}) => <em className="italic text-cv-coral" {...props} />,
              }}
            >
              {summary}
            </ReactMarkdown>
          </div>

          {/* Right: Highlight cards */}
          {displayHighlights.length > 0 && (
            <div className="lg:w-80 flex flex-row lg:flex-col gap-4">
              {displayHighlights.map((highlight, index) => {
                const IconComponent = getIconComponent(highlight.icon);
                return (
                  <div
                    key={index}
                    className="flex-1 lg:flex-none bg-white rounded-lg p-4 shadow-sm border-2 border-cv-blue/20 hover:border-cv-blue hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cv-blue/10 group-hover:bg-cv-blue/20 transition-colors">
                        <IconComponent className="w-6 h-6 text-cv-blue" />
                      </div>
                      <div className="text-2xl font-bold text-cv-blue group-hover:text-cv-coral transition-colors">
                        {highlight.metric}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {highlight.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {skills.length > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm font-semibold text-cv-gray mb-3">
              Core Competencies:
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <button
                  key={index}
                  onClick={scrollToSkills}
                  className="px-4 py-2 bg-white border-2 border-cv-blue text-cv-blue rounded-full text-sm font-medium hover:bg-cv-blue hover:text-white transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
