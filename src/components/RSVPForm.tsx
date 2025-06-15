import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

interface InviteeData {
  name: string;
  email?: string;
  guest_count_allowed: number;
  invited_to_rehearsal: boolean;
  has_children: boolean;
  known_number_of_children: number;
}

interface RSVPFormData {
  rsvp_wedding: boolean | null;
  attendees_wedding: number | null;
  children_for_childcare_wedding: number | null;
  rsvp_rehearsal_dinner: boolean | null;
  attendees_rehearsal_dinner: number | null;
  children_attendees_rehearsal_dinner: number | null;
}

const RSVPForm: React.FC = () => {
  const [nameQuery, setNameQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedInvitee, setSelectedInvitee] = useState<InviteeData | null>(null);
  const [formData, setFormData] = useState<RSVPFormData>({
    rsvp_wedding: null,
    attendees_wedding: null,
    children_for_childcare_wedding: null,
    rsvp_rehearsal_dinner: null,
    attendees_rehearsal_dinner: null,
    children_attendees_rehearsal_dinner: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Search for names when user types
  useEffect(() => {
    const searchNames = async () => {
      if (nameQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `https://tzhytnszwzazoxjmiyrl.supabase.co/functions/v1/google-sheets-rsvp?action=search_names&q=${encodeURIComponent(nameQuery)}`,
          {
            headers: {
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6aHl0bnN6d3phem94am1peXJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMDQzNDMsImV4cCI6MjA2NTU4MDM0M30.-2eZn_s2V_TwiE69raP3XnyI2BQbN0t_HbIyqYfiOyA`,
            },
          }
        );

        if (!response.ok) throw new Error('Failed to search names');

        const result = await response.json();
        setSuggestions(result.names || []);
      } catch (error) {
        console.error('Error searching names:', error);
        setSuggestions([]);
      }
    };

    const timeoutId = setTimeout(searchNames, 300);
    return () => clearTimeout(timeoutId);
  }, [nameQuery]);

  const handleNameSelect = async (name: string) => {
    setNameQuery(name);
    setSuggestions([]);

    try {
      const response = await fetch(
        `https://tzhytnszwzazoxjmiyrl.supabase.co/functions/v1/google-sheets-rsvp?action=get_invitee&name=${encodeURIComponent(name)}`,
        {
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6aHl0bnN6d3phem94am1peXJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMDQzNDMsImV4cCI6MjA2NTU4MDM0M30.-2eZn_s2V_TwiE69raP3XnyI2BQbN0t_HbIyqYfiOyA`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to get invitee data');

      const result = await response.json();
      setSelectedInvitee(result.invitee);
      
      // Reset form data when selecting a new invitee
      setFormData({
        rsvp_wedding: null,
        attendees_wedding: null,
        children_for_childcare_wedding: null,
        rsvp_rehearsal_dinner: null,
        attendees_rehearsal_dinner: null,
        children_attendees_rehearsal_dinner: null,
      });
      setErrors({});
    } catch (error) {
      console.error('Error getting invitee data:', error);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.rsvp_wedding === null) {
      newErrors.rsvp_wedding = 'Please select if you are coming to the wedding';
    }

    if (formData.rsvp_wedding === true && formData.attendees_wedding === null) {
      newErrors.attendees_wedding = 'Please select number of adults attending the wedding';
    }

    if (selectedInvitee?.has_children && formData.rsvp_wedding === true && formData.children_for_childcare_wedding === null) {
      newErrors.children_for_childcare_wedding = 'Please select number of children for childcare';
    }

    if (selectedInvitee?.invited_to_rehearsal && formData.rsvp_rehearsal_dinner === null) {
      newErrors.rsvp_rehearsal_dinner = 'Please select if you are coming to the rehearsal dinner';
    }

    if (selectedInvitee?.invited_to_rehearsal && formData.rsvp_rehearsal_dinner === true && formData.attendees_rehearsal_dinner === null) {
      newErrors.attendees_rehearsal_dinner = 'Please select number of adults attending the rehearsal dinner';
    }

    if (selectedInvitee?.invited_to_rehearsal && selectedInvitee?.has_children && formData.rsvp_rehearsal_dinner === true && formData.children_attendees_rehearsal_dinner === null) {
      newErrors.children_attendees_rehearsal_dinner = 'Please select number of children attending the rehearsal dinner';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedInvitee || !validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        invitee_name: selectedInvitee.name,
        ...formData,
      };

      const response = await fetch(
        `https://tzhytnszwzazoxjmiyrl.supabase.co/functions/v1/google-sheets-rsvp`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6aHl0bnN6d3phem94am1peXJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMDQzNDMsImV4cCI6MjA2NTU4MDM0M30.-2eZn_s2V_TwiE69raP3XnyI2BQbN0t_HbIyqYfiOyA`,
          },
          body: JSON.stringify(submissionData),
        }
      );

      if (!response.ok) throw new Error('Failed to submit RSVP');

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('There was an error submitting your RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateNumberOptions = (min: number, max: number) => {
    const options = [];
    for (let i = min; i <= max; i++) {
      options.push(
        <SelectItem key={i} value={i.toString()}>
          {i}
        </SelectItem>
      );
    }
    return options;
  };

  if (submitted) {
    return (
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-primary font-medium text-primary">
          Thank you for your RSVP!
        </h3>
        <p className="text-muted-foreground">
          We have received your response and will be in touch with any additional details.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label htmlFor="name-search" className="text-2xl font-secondary" style={{ color: '#738a6e' }}>
          What's your name?
        </Label>
        <div className="relative">
          <Input
            id="name-search"
            type="text"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
            placeholder="Start typing your name..."
            className="w-full rounded-none focus-visible:ring-2"
            style={{ 
              '--tw-ring-color': '#738a6e'
            } as React.CSSProperties}
          />
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
              {suggestions.map((name, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleNameSelect(name)}
                  className="w-full text-left px-4 py-2 hover:bg-accent transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedInvitee && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-medium text-primary">
              RSVP for {selectedInvitee.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              You may bring up to {selectedInvitee.guest_count_allowed} additional guest{selectedInvitee.guest_count_allowed !== 1 ? 's' : ''}
              {selectedInvitee.has_children && ` and have ${selectedInvitee.known_number_of_children} children`}.
            </p>
          </div>

          {/* Wedding RSVP */}
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

          {/* Rehearsal Dinner RSVP */}
          {selectedInvitee.invited_to_rehearsal && (
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
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
          </Button>
        </form>
      )}
    </div>
  );
};

export default RSVPForm;