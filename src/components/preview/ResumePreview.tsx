import { Resume } from '@/types/resume';
import { Card } from '@/components/ui/card';
import MinimalTemplate from './templates/MinimalTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';

interface ResumePreviewProps {
  resume: Resume;
}

export default function ResumePreview({ resume }: ResumePreviewProps) {
  const TemplateComponent = {
    minimal: MinimalTemplate,
    modern: ModernTemplate,
    professional: ProfessionalTemplate,
    creative: CreativeTemplate,
  }[resume.template];

  return (
    <Card className="p-6 sticky top-8">
      <h2 className="text-2xl font-semibold mb-6">Preview</h2>
      <div className="prose max-w-none">
        <TemplateComponent resume={resume} />
      </div>
    </Card>
  );
}