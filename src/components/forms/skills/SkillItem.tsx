import { Skill } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2 } from 'lucide-react';

interface SkillItemProps {
  skill: Skill;
  onUpdate: (updated: Skill) => void;
  onDelete: () => void;
}

export default function SkillItem({ skill, onUpdate, onDelete }: SkillItemProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1 space-y-4">
          <div>
            <Label htmlFor={`skill-${skill.id}`}>Skill Name</Label>
            <Input
              id={`skill-${skill.id}`}
              value={skill.name}
              onChange={(e) => onUpdate({ ...skill, name: e.target.value })}
              placeholder="React.js"
            />
          </div>
          
          <div>
            <Label htmlFor={`category-${skill.id}`}>Category</Label>
            <Select
              value={skill.category}
              onValueChange={(value: 'technical' | 'soft') => 
                onUpdate({ ...skill, category: value })
              }
            >
              <SelectTrigger id={`category-${skill.id}`}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="soft">Soft Skill</SelectItem>
              </SelectContent>
            </Select>
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
    </Card>
  );
}