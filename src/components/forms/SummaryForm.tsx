import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';

interface SummaryFormProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SummaryForm({ value, onChange }: SummaryFormProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <FileText className="w-5 h-5 text-muted-foreground" />
        <h2 className="text-2xl font-semibold">Professional Summary</h2>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="summary">Write a brief summary about yourself</Label>
        <Textarea
          id="summary"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Experienced software developer with a passion for creating user-friendly applications..."
          className="min-h-[150px] resize-none"
        />
        <p className="text-sm text-muted-foreground">
          Tip: Keep your summary concise and focused on your key strengths and career goals.
        </p>
      </div>
    </Card>
  );
}