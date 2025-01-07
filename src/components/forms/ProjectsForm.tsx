import { Project } from '@/types/resume';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, FolderGit2 } from 'lucide-react';
import ProjectItem from './projects/ProjectItem';
import { generateId } from '@/lib/utils';

interface ProjectsFormProps {
  value: Project[];
  onChange: (value: Project[]) => void;
}

export default function ProjectsForm({ value, onChange }: ProjectsFormProps) {
  const handleAdd = () => {
    const newProject: Project = {
      id: generateId(),
      name: '',
      description: '',
      technologies: [],
    };
    onChange([...value, newProject]);
  };

  const handleUpdate = (index: number, updated: Project) => {
    const newProjects = [...value];
    newProjects[index] = updated;
    onChange(newProjects);
  };

  const handleDelete = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <FolderGit2 className="w-5 h-5 text-muted-foreground" />
        <h2 className="text-2xl font-semibold">Projects</h2>
      </div>

      <div className="space-y-4">
        {value.map((project, index) => (
          <ProjectItem
            key={project.id}
            project={project}
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
          Add Project
        </Button>
      </div>
    </Card>
  );
}