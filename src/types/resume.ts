export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePicture?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  graduationYear: string;
  achievements: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft';
  level?: number;
}

export type ResumeTemplate = 'minimal' | 'modern' | 'professional' | 'creative';

export interface ResumeCustomization {
  primaryColor: string;
  secondaryColor: string;
  font: string;
  spacing: 'compact' | 'normal' | 'spacious';
  showReferences: boolean;
}

export interface Resume {
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  references: Reference[];
  template: ResumeTemplate;
  customization: ResumeCustomization;
}