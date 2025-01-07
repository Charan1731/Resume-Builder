import { WorkExperience } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

interface WorkExperienceItemProps {
  experience: WorkExperience;
  onUpdate: (updated: WorkExperience) => void;
  onDelete: () => void;
}

export default function WorkExperienceItem({ experience, onUpdate, onDelete }: WorkExperienceItemProps) {
  const handleResponsibilityChange = (value: string) => {
    onUpdate({
      ...experience,
      responsibilities: value.split('\n').filter(r => r.trim() !== '')
    });
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex-1 space-y-4">
            <div>
              <Label htmlFor={`jobTitle-${experience.id}`}>Job Title</Label>
              <Input
                id={`jobTitle-${experience.id}`}
                value={experience.jobTitle}
                onChange={(e) => onUpdate({ ...experience, jobTitle: e.target.value })}
                placeholder="Senior Software Engineer"
              />
            </div>

            <div>
              <Label htmlFor={`company-${experience.id}`}>Company</Label>
              <Input
                id={`company-${experience.id}`}
                value={experience.company}
                onChange={(e) => onUpdate({ ...experience, company: e.target.value })}
                placeholder="Tech Company Inc."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                <Input
                  id={`startDate-${experience.id}`}
                  value={experience.startDate}
                  onChange={(e) => onUpdate({ ...experience, startDate: e.target.value })}
                  placeholder="MM/YYYY"
                />
              </div>
              <div>
                <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                <Input
                  id={`endDate-${experience.id}`}
                  value={experience.endDate}
                  onChange={(e) => onUpdate({ ...experience, endDate: e.target.value })}
                  placeholder="MM/YYYY or Present"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`responsibilities-${experience.id}`}>Responsibilities</Label>
              <Textarea
                id={`responsibilities-${experience.id}`}
                value={experience.responsibilities.join('\n')}
                onChange={(e) => handleResponsibilityChange(e.target.value)}
                placeholder="• Led a team of 5 developers&#10;• Implemented new features&#10;• Reduced system latency by 40%"
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}