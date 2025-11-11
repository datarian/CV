import {
  Calendar,
  Activity,
  TrendingUp,
  Target,
  Users,
  Zap,
  Award,
  Clock
} from 'lucide-react';
import type { Highlight } from '../types/resume';

// Map icon names to Lucide components
export const iconMap: Record<string, any> = {
  calendar: Calendar,
  activity: Activity,
  trending: TrendingUp,
  target: Target,
  users: Users,
  zap: Zap,
  award: Award,
  clock: Clock,
};

// Auto-extract highlights from summary text
export function extractHighlights(summaryText: string): Highlight[] {
  const highlights: Highlight[] = [];

  // Pattern 1: Years of experience (e.g., "8+ years", "10 years")
  const yearsMatch = summaryText.match(/(\d+\+?\s*years?)/i);
  if (yearsMatch) {
    highlights.push({
      metric: yearsMatch[1],
      label: 'Experience',
      icon: 'calendar'
    });
  }

  // Pattern 2: Large numbers with units (e.g., "1M+", "500K+", "100+")
  const scaleMatches = summaryText.match(/(\d+(?:\.\d+)?[KMB]\+?)(?:\s+(daily|weekly|monthly|requests|users|systems|models))?/gi);
  if (scaleMatches && scaleMatches.length > 0) {
    // Take up to 2 scale metrics
    scaleMatches.slice(0, 2).forEach(match => {
      const parts = match.split(/\s+/);
      const metric = parts[0];
      const label = parts.slice(1).join(' ') || 'Scale';
      highlights.push({
        metric,
        label: label.charAt(0).toUpperCase() + label.slice(1),
        icon: 'activity'
      });
    });
  }

  // Pattern 3: Percentages (e.g., "99.9%", "23%")
  const percentMatches = summaryText.match(/(\d+(?:\.\d+)?%)\s+(\w+)/g);
  if (percentMatches && percentMatches.length > 0) {
    // Take the first percentage metric
    const match = percentMatches[0];
    const parts = match.split(/\s+/);
    highlights.push({
      metric: parts[0],
      label: parts.slice(1).join(' ').charAt(0).toUpperCase() + parts.slice(1).join(' ').slice(1),
      icon: 'target'
    });
  }

  // Limit to 4 highlights max
  return highlights.slice(0, 4);
}

// Get icon component by name
export function getIconComponent(iconName: string) {
  return iconMap[iconName] || Activity;
}
