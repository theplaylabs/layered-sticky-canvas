import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InviteeData, RSVPFormData } from './types';

interface WeddingRSVPProps {
  formData: RSVPFormData;
  setFormData: React.Dispatch<React.SetStateAction<RSVPFormData>>;
  errors: Record<string, string>;
  selectedInvitee: InviteeData;
  generateNumberOptions: (min: number, max: number) => JSX.Element[];
}

const WeddingRSVP: React.FC<WeddingRSVPProps> = ({
  formData,
  setFormData,
  errors,
  selectedInvitee,
  generateNumberOptions,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-base font-medium">Coming to the Wedding? *</Label>
        <Select
          value={formData.rsvp_wedding?.toString() || ''}
          onValueChange={(value) => setFormData({ ...formData, rsvp_wedding: value === 'true' })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
        {errors.rsvp_wedding && <p className="text-sm text-destructive">{errors.rsvp_wedding}</p>}
      </div>

      {formData.rsvp_wedding === true && (
        <>
          <div className="space-y-2">
            <Label className="text-base font-medium">Number of Adults Attending the Wedding? *</Label>
            <Select
              value={formData.attendees_wedding?.toString() || ''}
              onValueChange={(value) => setFormData({ ...formData, attendees_wedding: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {generateNumberOptions(1, 1 + selectedInvitee.guest_count_allowed)}
              </SelectContent>
            </Select>
            {errors.attendees_wedding && <p className="text-sm text-destructive">{errors.attendees_wedding}</p>}
          </div>

          {selectedInvitee.has_children && (
            <div className="space-y-2">
              <Label className="text-base font-medium">Number of Children for Childcare for the Wedding? *</Label>
              <Select
                value={formData.children_for_childcare_wedding?.toString() || ''}
                onValueChange={(value) => setFormData({ ...formData, children_for_childcare_wedding: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {generateNumberOptions(0, selectedInvitee.known_number_of_children)}
                </SelectContent>
              </Select>
              {errors.children_for_childcare_wedding && <p className="text-sm text-destructive">{errors.children_for_childcare_wedding}</p>}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WeddingRSVP;