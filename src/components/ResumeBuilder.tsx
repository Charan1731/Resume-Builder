import { useState, useRef } from 'react';
import { Resume } from '@/types/resume';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import SummaryForm from '@/components/forms/SummaryForm';
import EducationForm from '@/components/forms/EducationForm';
import WorkExperienceForm from '@/components/forms/WorkExperienceForm';
import SkillsForm from '@/components/forms/SkillsForm';
import ProjectsForm from '@/components/forms/ProjectsForm';
import CertificationsForm from '@/components/forms/CertificationsForm';
import ReferencesForm from '@/components/forms/ReferencesForm';
import ResumePreview from '@/components/preview/ResumePreview';
import TemplateSelector from '@/components/TemplateSelector';
import { Button } from '@/components/ui/button';
import { Download, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { exportToPDF } from '@/lib/export';

const defaultResume: Resume = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
  },
  summary: '',
  education: [],
  workExperience: [],
  skills: [],
  projects: [],
  certifications: [],
  references: [],
  template: 'minimal',
  customization: {
    primaryColor: '#2563eb',
    secondaryColor: '#6b7280',
    font: 'Inter',
    spacing: 'normal',
    showReferences: true,
  },
};

export default function ResumeBuilder() {
  const [resume, setResume] = useState<Resume>(() => {
    const saved = localStorage.getItem('resume');
    return saved ? JSON.parse(saved) : defaultResume;
  });
  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    localStorage.setItem('resume', JSON.stringify(resume));
    toast({
      title: 'Resume saved',
      description: 'Your resume has been saved locally.',
    });
  };

  const handleExport = async () => {
    if (!previewRef.current) return;

    toast({
      title: 'Generating PDF...',
      description: 'Please wait while we prepare your resume.',
    });

    const success = await exportToPDF(resume, previewRef.current);

    if (success) {
      toast({
        title: 'PDF generated',
        description: 'Your resume has been downloaded.',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to generate PDF. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold hover:text-blue-500 hover:cursor-pointer">Resume Builder</h1>
        <div className="space-x-4">
          <Button onClick={handleSave} variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <TemplateSelector
            value={resume.template}
            onChange={(template) => setResume({ ...resume, template })}
          />
          
          <Card className="p-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-4 gap-4 mb-8">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="additional">Additional</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <div className="space-y-8">
                  <PersonalInfoForm
                    value={resume.personalInfo}
                    onChange={(personalInfo) =>
                      setResume({ ...resume, personalInfo })
                    }
                  />
                  <SummaryForm
                    value={resume.summary}
                    onChange={(summary) => setResume({ ...resume, summary })}
                  />
                </div>
              </TabsContent>

              <TabsContent value="experience">
                <div className="space-y-8">
                  <EducationForm
                    value={resume.education}
                    onChange={(education) => setResume({ ...resume, education })}
                  />
                  <WorkExperienceForm
                    value={resume.workExperience}
                    onChange={(workExperience) =>
                      setResume({ ...resume, workExperience })
                    }
                  />
                </div>
              </TabsContent>

              <TabsContent value="skills">
                <SkillsForm
                  value={resume.skills}
                  onChange={(skills) => setResume({ ...resume, skills })}
                />
              </TabsContent>

              <TabsContent value="additional">
                <div className="space-y-8">
                  <ProjectsForm
                    value={resume.projects}
                    onChange={(projects) => setResume({ ...resume, projects })}
                  />
                  <CertificationsForm
                    value={resume.certifications}
                    onChange={(certifications) =>
                      setResume({ ...resume, certifications })
                    }
                  />
                  <ReferencesForm
                    value={resume.references}
                    onChange={(references) => setResume({ ...resume, references })}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <div ref={previewRef}>
          <ResumePreview resume={resume} />
        </div>
      </div>
    </div>
  );
}