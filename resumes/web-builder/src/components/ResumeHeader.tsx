import React from 'react';
import { MapPin, Mail, Phone, Linkedin, Github, Globe } from 'lucide-react';
import type { ResumeHeader as ResumeHeaderType } from '../types/resume';

interface Props {
  header: ResumeHeaderType;
}

export const ResumeHeader: React.FC<Props> = ({ header }) => {
  return (
    <header className="mb-10">
      {/* Name and Title */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-6 border-l-4 border-cv-blue">
        <h1 className="text-5xl font-bold text-cv-dark-gray mb-2 tracking-tight">
          {header.name}
        </h1>
        <p className="text-2xl text-cv-gray font-light mb-6">
          {header.title}
        </p>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cv-light group-hover:bg-cv-blue/10 transition-colors">
              <MapPin className="w-5 h-5 text-cv-blue" />
            </div>
            <span className="text-gray-700">{header.location}</span>
          </div>

          <div className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cv-light group-hover:bg-cv-blue/10 transition-colors">
              <Mail className="w-5 h-5 text-cv-blue" />
            </div>
            <a
              href={`mailto:${header.email}`}
              className="text-gray-700 hover:text-cv-blue transition-colors"
            >
              {header.email}
            </a>
          </div>

          {header.phone && (
            <div className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cv-light group-hover:bg-cv-blue/10 transition-colors">
                <Phone className="w-5 h-5 text-cv-blue" />
              </div>
              <a
                href={`tel:${header.phone}`}
                className="text-gray-700 hover:text-cv-blue transition-colors"
              >
                {header.phone}
              </a>
            </div>
          )}

          {header.linkedin && (
            <div className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cv-light group-hover:bg-cv-blue/10 transition-colors">
                <Linkedin className="w-5 h-5 text-cv-blue" />
              </div>
              <a
                href={header.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-cv-blue transition-colors"
              >
                LinkedIn
              </a>
            </div>
          )}

          {header.github && (
            <div className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cv-light group-hover:bg-cv-blue/10 transition-colors">
                <Github className="w-5 h-5 text-cv-blue" />
              </div>
              <a
                href={header.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-cv-blue transition-colors"
              >
                GitHub
              </a>
            </div>
          )}

          {header.website && (
            <div className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cv-light group-hover:bg-cv-blue/10 transition-colors">
                <Globe className="w-5 h-5 text-cv-blue" />
              </div>
              <a
                href={header.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-cv-blue transition-colors"
              >
                Website
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
