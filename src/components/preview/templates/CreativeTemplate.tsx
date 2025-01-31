import { Resume } from '@/types/resume';

export default function CreativeTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="relative text-left">
      {/* Header with Background */}
      <div className="bg-primary text-primary-foreground p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold">{resume.personalInfo.name}</h1>
        <div className="mt-4 space-y-1 text-primary-foreground/80">
          {resume.personalInfo.email && <div>{resume.personalInfo.email}</div>}
          {resume.personalInfo.phone && <div>{resume.personalInfo.phone}</div>}
          {resume.personalInfo.address && <div>{resume.personalInfo.address}</div>}
        </div>
        {resume.summary && (
          <p className="mt-6 text-primary-foreground/90 max-w-2xl">
            {resume.summary}
          </p>
        )}
      </div>

      <div className="space-y-8 px-8">
        {/* Skills */}
        {resume.skills.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary">Expertise</h2>
            <div className="grid grid-cols-2 gap-8">
              {/* Technical Skills */}
              <div>
                <h3 className="font-semibold mb-3">Technical</h3>
                <div className="flex flex-wrap gap-2">
                  {resume.skills
                    .filter((skill) => skill.category === 'technical')
                    .map((skill) => (
                      <span
                        key={skill.id}
                        className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm"
                      >
                        {skill.name}
                      </span>
                    ))}
                </div>
              </div>
              {/* Soft Skills */}
              <div>
                <h3 className="font-semibold mb-3">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {resume.skills
                    .filter((skill) => skill.category === 'soft')
                    .map((skill) => (
                      <span
                        key={skill.id}
                        className="px-3 py-1 border border-primary text-primary rounded-full text-sm"
                      >
                        {skill.name}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Experience */}
        {resume.workExperience.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-primary">Experience</h2>
            <div className="space-y-8">
              {resume.workExperience.map((exp) => (
                <div
                  key={exp.id}
                  className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-primary"
                >
                  <div className="absolute left-0 top-2 w-2 h-2 bg-primary rounded-full -translate-x-[5px]" />
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xl font-semibold">{exp.jobTitle}</h3>
                      <span className="text-sm text-muted-foreground">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <div className="text-primary font-medium">{exp.company}</div>
                    <ul className="space-y-2 text-muted-foreground">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-primary">Projects</h2>
            <div className="grid grid-cols-2 gap-6">
              {resume.projects.map((project) => (
                <div
                  key={project.id}
                  className="p-6 rounded-lg border border-primary/20 hover:border-primary transition-colors"
                >
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-primary hover:underline"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-primary">Education</h2>
            <div className="grid grid-cols-2 gap-6">
              {resume.education.map((edu) => (
                <div key={edu.id} className="space-y-2">
                  <h3 className="text-lg font-semibold">{edu.degree}</h3>
                  <div className="text-primary">{edu.institution}</div>
                  <div className="text-sm text-muted-foreground">
                    {edu.graduationYear}
                  </div>
                  {edu.achievements && (
                    <p className="text-sm text-muted-foreground">
                      {edu.achievements}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}