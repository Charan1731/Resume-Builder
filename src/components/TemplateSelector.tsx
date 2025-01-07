import { Resume, ResumeTemplate } from '@/types/resume';
import { templates } from '@/lib/templates';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface TemplateSelectorProps {
  value: ResumeTemplate;
  onChange: (template: ResumeTemplate) => void;
}

export default function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Choose Template</h2>
      <RadioGroup
        value={value}
        onValueChange={(value) => onChange(value as ResumeTemplate)}
        className="grid grid-cols-2 gap-4"
      >
        {(Object.entries(templates) as [ResumeTemplate, typeof templates[keyof typeof templates]][]).map(([key, template]) => (
          <Label
            key={key}
            className={cn(
              "cursor-pointer space-y-2 rounded-lg border-2 p-4 hover:bg-accent transition-colors",
              value === key && "border-primary"
            )}
          >
            <RadioGroupItem value={key} className="sr-only" />
            <img
              src={template.preview}
              alt={template.name}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <div className="font-semibold">{template.name}</div>
            <p className="text-sm text-muted-foreground">{template.description}</p>
          </Label>
        ))}
      </RadioGroup>
    </Card>
  );
}