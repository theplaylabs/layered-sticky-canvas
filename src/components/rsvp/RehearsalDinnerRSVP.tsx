import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InviteeData, RSVPFormData } from './types';

interface RehearsalDinnerRSVPProps {
  formData: RSVPFormData;
  setFormData: React.Dispatch<React.SetStateAction<RSVPFormData>>;
  errors: Record<string, string>;
  selectedInvitee: InviteeData;
  generateNumberOptions: (min: number, max: number) => JSX.Element[];
}

const RehearsalDinnerRSVP: React.FC<RehearsalDinnerRSVPProps> = ({
  formData,
  setFormData,
  errors,
  selectedInvitee,
  generateNumberOptions,
}) => {
  if (!selectedInvitee.invited_to_rehearsal) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-base font-medium">Coming to the Rehearsal Dinner? *</Label>
        <Select
          value={formData.rsvp_rehearsal_dinner?.toString() || ''}
          onValueChange={(value) => setFormData({ ...formData, rsvp_rehearsal_dinner: value === 'true' })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
        {errors.rsvp_rehearsal_dinner && <p className="text-sm text-destructive">{errors.rsvp_rehearsal_dinner}</p>}
      </div>

      {formData.rsvp_rehearsal_dinner === true && (
        <>
          <div className="space-y-2">
            <Label className="text-base font-medium">Number of Adults Attending the Rehearsal Dinner? *</Label>
            <Select
              value={formData.attendees_rehearsal_dinner?.toString() || ''}
              onValueChange={(value) => setFormData({ ...formData, attendees_rehearsal_dinner: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {generateNumberOptions(1, 1 + selectedInvitee.guest_count_allowed)}
              </SelectContent>
            </Select>
            {errors.attendees_rehearsal_dinner && <p className="text-sm text-destructive">{errors.attendees_rehearsal_dinner}</p>}
          </div>

          {selectedInvitee.has_children && (
            <div className="space-y-2">
              <Label className="text-base font-medium">Number of Children Attending the Rehearsal Dinner? *</Label>
              <Select
                value={formData.children_attendees_rehearsal_dinner?.toString() || ''}
                onValueChange={(value) => setFormData({ ...formData, children_attendees_rehearsal_dinner: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {generateNumberOptions(0, selectedInvitee.known_number_of_children)}
                </SelectContent>
              </Select>
              {errors.children_attendees_rehearsal_dinner && <p className="text-sm text-destructive">{errors.children_attendees_rehearsal_dinner}</p>}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RehearsalDinnerRSVP;