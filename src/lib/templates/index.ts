import { ResumeTemplate } from '@/types/resume';

export const templates: Record<ResumeTemplate, {
  name: string;
  description: string;
  preview: string;
}> = {
  minimal: {
    name: 'Minimal',
    description: 'Clean and simple design focusing on content',
    preview: 'assets/minimal.png',
  },
  modern: {
    name: 'Modern',
    description: 'Contemporary layout with a creative touch',
    preview: 'assets/mordern.jpeg',
  },
  professional: {
    name: 'Professional',
    description: 'Traditional format ideal for corporate roles',
    preview: 'assets/professional.avif',
  },
  creative: {
    name: 'Creative',
    description: 'Bold design for creative industries',
    preview: 'assets/creative.jpeg',
  },
};