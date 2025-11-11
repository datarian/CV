import { useEffect, useState } from 'react';
import { parseResumeContent } from './utils/parseResume';
import type { ParsedResume } from './types/resume';
import { ResumeHeader } from './components/ResumeHeader';
import { ProfessionalSummary } from './components/ProfessionalSummary';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { Loader2 } from 'lucide-react';

function App() {
  const [resume, setResume] = useState<ParsedResume | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load resume_content.md from public folder or embedded
    const basePath = (import.meta as any).env?.BASE_URL || '/CV-pages/';
    fetch(`${basePath}resume_content.md`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.text();
      })
      .then(content => {
        const parsed = parseResumeContent(content);
        setResume(parsed);
      })
      .catch(err => {
        console.error('Failed to load resume:', err);
        setError(`Failed to load resume content: ${err.message}`);
      });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cv-light">
        <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-red-500">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cv-light">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-cv-blue animate-spin" />
          <p className="text-cv-gray font-medium">Loading resume...</p>
        </div>
      </div>
    );
  }

  const { data } = resume;

  // Extract top skills for the summary tags (first 5 skills from first category)
  const topSkills = Object.values(data.skills)[0]?.split(',').slice(0, 5).map(s => s.trim()) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cv-light to-white print:bg-white">
      <div className="max-w-5xl mx-auto px-4 py-12 print:py-0">
        <ResumeHeader header={data.header} />

        {data.summary && (
          <ProfessionalSummary
            summary={data.summary}
            skills={topSkills}
            highlights={data.summaryHighlights}
          />
        )}

        <ExperienceSection experiences={data.experience} />
        <SkillsSection skills={data.skills} />
        <EducationSection education={data.education} />

        {data.projects && data.projects.length > 0 && (
          <section className="mb-10">
            <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-cv-green">
              <h2 className="text-3xl font-bold text-cv-blue mb-6 print:text-black">
                Notable Projects
              </h2>
              <div className="space-y-4">
                {data.projects.map((project, index) => (
                  <div key={index} className="group bg-cv-light rounded-lg p-5 hover:shadow-md transition-all duration-200">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-cv-blue transition-colors">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {project.name}
                        </a>
                      ) : (
                        project.name
                      )}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed mt-2">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <footer className="mt-12 pt-8 border-t-2 border-cv-blue/20 text-center print:hidden">
          <p className="text-sm text-gray-600">
            Curious how this resume was built? Explore the system at{' '}
            <a
              href="https://github.com/datarian/CV"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cv-blue hover:text-cv-coral font-medium transition-colors underline"
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
