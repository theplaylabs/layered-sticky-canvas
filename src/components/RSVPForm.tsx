import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SelectItem } from '@/components/ui/select';
import NameSearch from './rsvp/NameSearch';
import WeddingRSVP from './rsvp/WeddingRSVP';
import RehearsalDinnerRSVP from './rsvp/RehearsalDinnerRSVP';
import RSVPConfirmation from './rsvp/RSVPConfirmation';
import { InviteeData, RSVPFormData } from './rsvp/types';
import { useRSVPApi } from '@/hooks/useRSVPApi';

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

  const { searchNames, getInviteeData, submitRSVP, error } = useRSVPApi();

  // Search for names when user types
  useEffect(() => {
    const performSearch = async () => {
      const results = await searchNames(nameQuery);
      setSuggestions(results);
    };

    const timeoutId = setTimeout(performSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [nameQuery, searchNames]);

  const handleNameSelect = async (name: string) => {
    setNameQuery(name);
    setSuggestions([]);

    const inviteeData = await getInviteeData(name);
    if (inviteeData) {
      setSelectedInvitee(inviteeData);
      resetFormData();
    }
  };

  const resetFormData = () => {
    setFormData({
      rsvp_wedding: null,
      attendees_wedding: null,
      children_for_childcare_wedding: null,
      rsvp_rehearsal_dinner: null,
      attendees_rehearsal_dinner: null,
      children_attendees_rehearsal_dinner: null,
    });
    setErrors({});
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

    const success = await submitRSVP(selectedInvitee.name, formData);
    
    if (success) {
      setSubmitted(true);
    } else {
      alert(error || 'There was an error submitting your RSVP. Please try again.');
    }
    
    setIsSubmitting(false);
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
    return <RSVPConfirmation />;
  }

  return (
    <div className="space-y-8">
      <NameSearch
        nameQuery={nameQuery}
        setNameQuery={setNameQuery}
        suggestions={suggestions}
        handleNameSelect={handleNameSelect}
      />

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
          
          <WeddingRSVP
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            selectedInvitee={selectedInvitee}
            generateNumberOptions={generateNumberOptions}
          />
          
          <RehearsalDinnerRSVP
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            selectedInvitee={selectedInvitee}
            generateNumberOptions={generateNumberOptions}
          />

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