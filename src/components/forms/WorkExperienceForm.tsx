import { WorkExperience } from '@/types/resume';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Briefcase } from 'lucide-react';
import WorkExperienceItem from './work-experience/WorkExperienceItem';
import { generateId } from '@/lib/utils';

interface WorkExperienceFormProps {
  value: WorkExperience[];
  onChange: (value: WorkExperience[]) => void;
}

export default function WorkExperienceForm({ value, onChange }: WorkExperienceFormProps) {
  const handleAdd = () => {
    const newExperience: WorkExperience = {
      id: generateId(),
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      responsibilities: [],
    };
    onChange([...value, newExperience]);
  };

  const handleUpdate = (index: number, updated: WorkExperience) => {
    const newExperience = [...value];
    newExperience[index] = updated;
    onChange(newExperience);
  };

  const handleDelete = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Briefcase className="w-5 h-5 text-muted-foreground" />
        <h2 className="text-2xl font-semibold">Work Experience</h2>
      </div>

      <div className="space-y-4">
        {value.map((experience, index) => (
          <WorkExperienceItem
            key={experience.id}
            experience={experience}
            onUpdate={(updated) => handleUpdate(index, updated)}
            onDelete={() => handleDelete(index)}
          />
        ))}

        <Button
          variant="outline"
          className="w-full"
          onClick={handleAdd}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Work Experience
        </Button>
      </div>
    </Card>
  );
}