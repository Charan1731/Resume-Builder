import { Certification } from '@/types/resume';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Award } from 'lucide-react';
import { generateId } from '@/lib/utils';

interface CertificationsFormProps {
  value: Certification[];
  onChange: (value: Certification[]) => void;
}

export default function CertificationsForm({ value, onChange }: CertificationsFormProps) {
  const handleAdd = () => {
    const newCertification: Certification = {
      id: generateId(),
      name: '',
      issuer: '',
      date: '',
    };
    onChange([...value, newCertification]);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Award className="w-5 h-5 text-muted-foreground" />
        <h2 className="text-2xl font-semibold">Certifications</h2>
      </div>

      <div className="space-y-4">
        {/* TODO: Add CertificationItem component */}
        <Button
          variant="outline"
          className="w-full"
          onClick={handleAdd}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Certification
        </Button>
      </div>
    </Card>
  );
}