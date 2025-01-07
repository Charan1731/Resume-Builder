import { PersonalInfo } from '@/types/resume';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, MapPin } from 'lucide-react';

interface PersonalInfoFormProps {
  value: PersonalInfo;
  onChange: (value: PersonalInfo) => void;
}

export default function PersonalInfoForm({ value, onChange }: PersonalInfoFormProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <User className="w-5 h-5 text-muted-foreground" />
          <div className="flex-1">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={value.name}
              onChange={(e) => onChange({ ...value, name: e.target.value })}
              placeholder="Sripaada"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Mail className="w-5 h-5 text-muted-foreground" />
          <div className="flex-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={value.email}
              onChange={(e) => onChange({ ...value, email: e.target.value })}
              placeholder="sripaada@example.com"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Phone className="w-5 h-5 text-muted-foreground" />
          <div className="flex-1">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={value.phone}
              onChange={(e) => onChange({ ...value, phone: e.target.value })}
              placeholder="+91 "
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <MapPin className="w-5 h-5 text-muted-foreground" />
          <div className="flex-1">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={value.address}
              onChange={(e) => onChange({ ...value, address: e.target.value })}
              placeholder="Gayathri Nagar , Hyderabad"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}