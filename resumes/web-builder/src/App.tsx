import React, { useEffect, useState } from 'react';
import { parseResumeContent } from './utils/parseResume';
import type { ParsedResume } from './types/resume';
import { ResumeHeader } from './components/ResumeHeader';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';

function App() {
  const [resume, setResume] = useState<ParsedResume | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load resume_content.md from public folder or embedded
    fetch('/resume_content.md')
      .then(res => res.text())
      .then(content => {
        const parsed = parseResumeContent(content);
        setResume(parsed);
      })
      .catch(err => {
        console.error('Failed to load resume:', err);
        setError('Failed to load resume content.');
      });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const { data } = resume;

  return (
    <div className="min-h-screen bg-cv-light print:bg-white">
      <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none p-8 my-8 print:my-0">
        <ResumeHeader header={data.header} />

        {data.summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-cv-blue mb-3 print:text-black">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        <ExperienceSection experiences={data.experience} />
        <SkillsSection skills={data.skills} />
        <EducationSection education={data.education} />

        {data.projects && data.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-cv-blue mb-4 print:text-black">
              Projects
            </h2>
            <div className="space-y-3">
              {data.projects.map((project, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cv-blue transition-colors"
                      >
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <p className="text-gray-700 text-sm">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500 print:hidden">
          <p>
            Curious how this resume was built? Explore the system at{' '}
            <a
              href="https://github.com/datarian/CV"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cv-blue hover:underline"
            >
              github.com/datarian/CV
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
