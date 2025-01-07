import { Education } from '@/types/resume';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, GraduationCap } from 'lucide-react';
import EducationItem from './education/EducationItem';
import { generateId } from '@/lib/utils';

interface EducationFormProps {
  value: Education[];
  onChange: (value: Education[]) => void;
}

export default function EducationForm({ value, onChange }: EducationFormProps) {
  const handleAdd = () => {
    const newEducation: Education = {
      id: generateId(),
      degree: '',
      institution: '',
      graduationYear: '',
      achievements: '',
    };
    onChange([...value, newEducation]);
  };

  const handleUpdate = (index: number, updated: Education) => {
    const newEducation = [...value];
    newEducation[index] = updated;
    onChange(newEducation);
  };

  const handleDelete = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <GraduationCap className="w-5 h-5 text-muted-foreground" />
        <h2 className="text-2xl font-semibold">Education</h2>
      </div>

      <div className="space-y-4">
        {value.map((education, index) => (
          <EducationItem
            key={education.id}
            education={education}
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
          Add Education
        </Button>
      </div>
    </Card>
  );
}