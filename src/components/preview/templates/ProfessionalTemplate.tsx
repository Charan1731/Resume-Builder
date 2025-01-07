import { Resume } from '@/types/resume';
import { Briefcase, GraduationCap, Award, FolderGit2, Users } from 'lucide-react';

export default function ProfessionalTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="text-center pb-6 border-b">
        <h1 className="text-4xl font-bold tracking-tight">
          {resume.personalInfo.name}
        </h1>
        <div className="mt-3 flex justify-center gap-4 text-sm text-muted-foreground">
          {resume.personalInfo.email && <div>{resume.personalInfo.email}</div>}
          {resume.personalInfo.phone && (
            <>
              <div>•</div>
              <div>{resume.personalInfo.phone}</div>
            </>
          )}
          {resume.personalInfo.address && (
            <>
              <div>•</div>
              <div>{resume.personalInfo.address}</div>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-3">Professional Summary</h2>
          <p className="text-muted-foreground">{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.workExperience.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Professional Experience</h2>
          <div className="space-y-6">
            {resume.workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                    <div className="text-primary font-medium">{exp.company}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <ul className="mt-2 space-y-1 text-muted-foreground list-disc list-inside">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Skills & Expertise</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Technical Skills */}
            <div>
              <h3 className="font-medium mb-2">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resume.skills
                  .filter((skill) => skill.category === 'technical')
                  .map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
              </div>
            </div>
            {/* Soft Skills */}
            <div>
              <h3 className="font-medium mb-2">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resume.skills
                  .filter((skill) => skill.category === 'soft')
                  .map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Education</h2>
          <div className="space-y-4">
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <div className="text-primary">{edu.institution}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {edu.graduationYear}
                  </div>
                </div>
                {edu.achievements && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {edu.achievements}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}