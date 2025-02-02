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
import { motion } from 'framer-motion';

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
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-white via-indigo-50 to-indigo-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full opacity-30 blur-3xl -z-10 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-r from-indigo-200 to-pink-200 rounded-full opacity-30 blur-3xl -z-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full opacity-20 blur-3xl -z-10 animate-blob animation-delay-4000"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1 
            className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span 
              className="block"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Resume Builder
            </motion.span>
            <motion.span 
              className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Craft Your Perfect Resume
            </motion.span>
          </motion.h1>
        </motion.div>

        <div className="mt-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side: Forms */}
            <div className="space-y-8">
              <TemplateSelector
                value={resume.template}
                onChange={(template) => setResume({ ...resume, template })}
              />
              
              <Card className="p-6 bg-gradient-to-br from-white to-indigo-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
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

            {/* Right Side: Preview */}
            <div ref={previewRef}>
              <ResumePreview resume={resume} />
            </div>
          </div>

          {/* Save and Export Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            <Button onClick={handleSave} variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button onClick={handleExport} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}