import React from 'react';
import type { ResumeHeader as ResumeHeaderType } from '../types/resume';

interface Props {
  header: ResumeHeaderType;
}

export const ResumeHeader: React.FC<Props> = ({ header }) => {
  return (
    <header className="mb-8 pb-6 border-b-2 border-cv-blue print:border-gray-400">
      <h1 className="text-4xl font-bold text-cv-blue mb-2 print:text-black">
        {header.name}
      </h1>
      <p className="text-xl text-cv-gray mb-4 print:text-gray-700">
        {header.title}
      </p>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <span className="text-cv-blue">📍</span>
          <span>{header.location}</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-cv-blue">✉️</span>
          <a
            href={`mailto:${header.email}`}
            className="hover:text-cv-blue transition-colors print:text-black"
          >
            {header.email}
          </a>
        </div>

        {header.phone && (
          <div className="flex items-center gap-1">
            <span className="text-cv-blue">📞</span>
            <a
              href={`tel:${header.phone}`}
              className="hover:text-cv-blue transition-colors print:text-black"
            >
              {header.phone}
            </a>
          </div>
        )}

        {header.linkedin && (
          <div className="flex items-center gap-1">
            <span className="text-cv-blue">🔗</span>
            <a
              href={header.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cv-blue transition-colors print:text-black"
            >
              LinkedIn
            </a>
          </div>
        )}

        {header.github && (
          <div className="flex items-center gap-1">
            <span className="text-cv-blue">💻</span>
            <a
              href={header.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cv-blue transition-colors print:text-black"
            >
              GitHub
            </a>
          </div>
        )}

        {header.website && (
          <div className="flex items-center gap-1">
            <span className="text-cv-blue">🌐</span>
            <a
              href={header.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cv-blue transition-colors print:text-black"
            >
              Website
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
