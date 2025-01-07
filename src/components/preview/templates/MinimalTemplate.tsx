import { Resume } from '@/types/resume';
import { Briefcase, GraduationCap, Award, FolderGit2, Users } from 'lucide-react';

export default function MinimalTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold">{resume.personalInfo.name}</h1>
        <div className="text-sm text-muted-foreground mt-2 space-y-1">
          {resume.personalInfo.email && <div>{resume.personalInfo.email}</div>}
          {resume.personalInfo.phone && <div>{resume.personalInfo.phone}</div>}
          {resume.personalInfo.address && <div>{resume.personalInfo.address}</div>}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div>
          <p className="text-muted-foreground">{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.workExperience.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-4 h-4" />
            <h2 className="text-lg font-semibold">Experience</h2>
          </div>
          <div className="space-y-4">
            {resume.workExperience.map((exp) => (
              <div key={exp.id}>
                <h3 className="font-medium">{exp.jobTitle}</h3>
                <div className="text-sm text-muted-foreground">
                  {exp.company} | {exp.startDate} - {exp.endDate}
                </div>
                <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
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
          <h2 className="text-lg font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <span
                key={skill.id}
                className="px-2 py-1 bg-muted rounded-md text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-4 h-4" />
            <h2 className="text-lg font-semibold">Education</h2>
          </div>
          <div className="space-y-4">
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-medium">{edu.degree}</h3>
                <div className="text-sm text-muted-foreground">
                  {edu.institution} | {edu.graduationYear}
                </div>
                {edu.achievements && (
                  <p className="text-sm text-muted-foreground mt-1">
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