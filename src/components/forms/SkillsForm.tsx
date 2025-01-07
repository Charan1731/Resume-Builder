import { Skill } from '@/types/resume';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Code2 } from 'lucide-react';
import SkillItem from './skills/SkillItem';
import { generateId } from '@/lib/utils';

interface SkillsFormProps {
  value: Skill[];
  onChange: (value: Skill[]) => void;
}

export default function SkillsForm({ value, onChange }: SkillsFormProps) {
  const handleAdd = () => {
    const newSkill: Skill = {
      id: generateId(),
      name: '',
      category: 'technical',
    };
    onChange([...value, newSkill]);
  };

  const handleUpdate = (index: number, updated: Skill) => {
    const newSkills = [...value];
    newSkills[index] = updated;
    onChange(newSkills);
  };

  const handleDelete = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Code2 className="w-5 h-5 text-muted-foreground" />
        <h2 className="text-2xl font-semibold">Skills</h2>
      </div>

      <div className="space-y-4">
        {value.map((skill, index) => (
          <SkillItem
            key={skill.id}
            skill={skill}
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
          Add Skill
        </Button>
      </div>
    </Card>
  );
}