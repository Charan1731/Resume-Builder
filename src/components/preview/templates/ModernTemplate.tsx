import { Resume } from '@/types/resume';
import { Briefcase, GraduationCap, Award, FolderGit2, Users } from 'lucide-react';

export default function ModernTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="grid grid-cols-3 gap-4 text-left">
      {/* Sidebar */}
      <div className="col-span-1 bg-muted p-2 rounded-lg">
        <div className="space-y-6">
          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <div className="text-sm space-y-1">
              {resume.personalInfo.email && <div>{resume.personalInfo.email}</div>}
              {resume.personalInfo.phone && <div>{resume.personalInfo.phone}</div>}
              {resume.personalInfo.address && (
                <div>{resume.personalInfo.address}</div>
              )}
            </div>
          </div>

          {/* Skills */}
          {resume.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Skills</h2>
              <div className="space-y-1">
                {resume.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="text-sm px-2 py-1 bg-background rounded"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resume.education.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Education</h2>
              <div className="space-y-3">
                {resume.education.map((edu) => (
                  <div key={edu.id} className="text-sm">
                    <div className="font-medium">{edu.degree}</div>
                    <div className="text-muted-foreground">
                      {edu.institution}
                      <br />
                      {edu.graduationYear}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-2 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">{resume.personalInfo.name}</h1>
          {resume.summary && (
            <p className="mt-4 text-muted-foreground">{resume.summary}</p>
          )}
        </div>

        {/* Experience */}
        {resume.workExperience.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Experience</h2>
            <div className="space-y-6">
              {resume.workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-medium">{exp.jobTitle}</h3>
                    <span className="text-sm text-muted-foreground">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="text-primary font-medium">{exp.company}</div>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            <div className="space-y-4">
              {resume.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="text-lg font-medium">{project.name}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}