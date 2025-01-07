import { Project } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

interface ProjectItemProps {
  project: Project;
  onUpdate: (updated: Project) => void;
  onDelete: () => void;
}

export default function ProjectItem({ project, onUpdate, onDelete }: ProjectItemProps) {
  const handleTechnologiesChange = (value: string) => {
    onUpdate({
      ...project,
      technologies: value.split(',').map(t => t.trim()).filter(t => t !== '')
    });
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex-1 space-y-4">
            <div>
              <Label htmlFor={`name-${project.id}`}>Project Name</Label>
              <Input
                id={`name-${project.id}`}
                value={project.name}
                onChange={(e) => onUpdate({ ...project, name: e.target.value })}
                placeholder="E-commerce Platform"
              />
            </div>

            <div>
              <Label htmlFor={`description-${project.id}`}>Description</Label>
              <Textarea
                id={`description-${project.id}`}
                value={project.description}
                onChange={(e) => onUpdate({ ...project, description: e.target.value })}
                placeholder="A full-stack e-commerce platform with real-time inventory management..."
                className="min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor={`technologies-${project.id}`}>Technologies</Label>
              <Input
                id={`technologies-${project.id}`}
                value={project.technologies.join(', ')}
                onChange={(e) => handleTechnologiesChange(e.target.value)}
                placeholder="React, Node.js, PostgreSQL"
              />
            </div>

            <div>
              <Label htmlFor={`link-${project.id}`}>Project Link (Optional)</Label>
              <Input
                id={`link-${project.id}`}
                value={project.link || ''}
                onChange={(e) => onUpdate({ ...project, link: e.target.value })}
                placeholder="https://github.com/username/project"
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