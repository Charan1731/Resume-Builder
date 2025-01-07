import { Reference } from '@/types/resume';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users } from 'lucide-react';
import { generateId } from '@/lib/utils';

interface ReferencesFormProps {
  value: Reference[];
  onChange: (value: Reference[]) => void;
}

export default function ReferencesForm({ value, onChange }: ReferencesFormProps) {
  const handleAdd = () => {
    const newReference: Reference = {
      id: generateId(),
      name: '',
      position: '',
      company: '',
      email: '',
    };
    onChange([...value, newReference]);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="w-5 h-5 text-muted-foreground" />
        <h2 className="text-2xl font-semibold">References</h2>
      </div>

      <div className="space-y-4">
        {/* TODO: Add ReferenceItem component */}
        <Button
          variant="outline"
          className="w-full"
          onClick={handleAdd}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Reference
        </Button>
      </div>
    </Card>
  );
}