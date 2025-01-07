import { Education } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface EducationItemProps {
  education: Education;
  onUpdate: (updated: Education) => void;
  onDelete: () => void;
}

export default function EducationItem({ education, onUpdate, onDelete }: EducationItemProps) {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex-1 space-y-4">
            <div>
              <Label htmlFor={`degree-${education.id}`}>Degree</Label>
              <Input
                id={`degree-${education.id}`}
                value={education.degree}
                onChange={(e) => onUpdate({ ...education, degree: e.target.value })}
                placeholder="Bachelor of Science in Computer Science"
              />
            </div>

            <div>
              <Label htmlFor={`institution-${education.id}`}>Institution</Label>
              <Input
                id={`institution-${education.id}`}
                value={education.institution}
                onChange={(e) => onUpdate({ ...education, institution: e.target.value })}
                placeholder="University Name"
              />
            </div>

            <div>
              <Label htmlFor={`year-${education.id}`}>Graduation Year</Label>
              <Input
                id={`year-${education.id}`}
                value={education.graduationYear}
                onChange={(e) => onUpdate({ ...education, graduationYear: e.target.value })}
                placeholder="2023"
              />
            </div>

            <div>
              <Label htmlFor={`achievements-${education.id}`}>Achievements</Label>
              <Textarea
                id={`achievements-${education.id}`}
                value={education.achievements}
                onChange={(e) => onUpdate({ ...education, achievements: e.target.value })}
                placeholder="Dean's List, Academic Scholarships, Notable Projects..."
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