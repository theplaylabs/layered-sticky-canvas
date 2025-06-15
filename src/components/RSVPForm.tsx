import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface Invitee {
  id: string;
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
  children_for_childcare_wedding: number;
  rsvp_rehearsal_dinner: boolean | null;
  attendees_rehearsal_dinner: number | null;
  children_attendees_rehearsal_dinner: number;
}

export default function RSVPForm() {
  const [nameSearch, setNameSearch] = useState('');
  const [inviteeOptions, setInviteeOptions] = useState<Invitee[]>([]);
  const [selectedInvitee, setSelectedInvitee] = useState<Invitee | null>(null);
  const [formData, setFormData] = useState<RSVPFormData>({
    rsvp_wedding: null,
    attendees_wedding: null,
    children_for_childcare_wedding: 0,
    rsvp_rehearsal_dinner: null,
    attendees_rehearsal_dinner: null,
    children_attendees_rehearsal_dinner: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  // Search for invitees as user types
  useEffect(() => {
    const searchInvitees = async () => {
      if (nameSearch.length < 2) {
        setInviteeOptions([]);
        return;
      }

      const { data, error } = await supabase
        .from('invitees')
        .select('*')
        .ilike('name', `%${nameSearch}%`)
        .limit(10);

      if (error) {
        console.error('Error searching invitees:', error);
        return;
      }

      setInviteeOptions(data || []);
    };

    const debounceTimer = setTimeout(searchInvitees, 300);
    return () => clearTimeout(debounceTimer);
  }, [nameSearch]);

  const handleInviteeSelect = (invitee: Invitee) => {
    setSelectedInvitee(invitee);
    setNameSearch(invitee.name);
    setInviteeOptions([]);
    setShowForm(true);
    setSubmitted(false);
    
    // Reset form data
    setFormData({
      rsvp_wedding: null,
      attendees_wedding: null,
      children_for_childcare_wedding: 0,
      rsvp_rehearsal_dinner: null,
      attendees_rehearsal_dinner: null,
      children_attendees_rehearsal_dinner: 0,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedInvitee) return;

    // Validation
    const errors: string[] = [];
    
    if (formData.rsvp_wedding === null) {
      errors.push('Please select if you are coming to the wedding');
    }
    
    if (formData.rsvp_wedding === true && !formData.attendees_wedding) {
      errors.push('Please select number of adults attending the wedding');
    }
    
    if (selectedInvitee.invited_to_rehearsal && formData.rsvp_rehearsal_dinner === null) {
      errors.push('Please select if you are coming to the rehearsal dinner');
    }
    
    if (selectedInvitee.invited_to_rehearsal && formData.rsvp_rehearsal_dinner === true && !formData.attendees_rehearsal_dinner) {
      errors.push('Please select number of adults attending the rehearsal dinner');
    }

    if (errors.length > 0) {
      toast({
        title: "Please complete all required fields",
        description: errors.join(', '),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if RSVP already exists
      const { data: existingRSVP } = await supabase
        .from('rsvp_responses')
        .select('id')
        .eq('invitee_id', selectedInvitee.id)
        .single();

      const rsvpData = {
        invitee_id: selectedInvitee.id,
        rsvp_wedding: formData.rsvp_wedding,
        attendees_wedding: formData.rsvp_wedding ? formData.attendees_wedding : null,
        children_for_childcare_wedding: formData.children_for_childcare_wedding,
        rsvp_rehearsal_dinner: selectedInvitee.invited_to_rehearsal ? formData.rsvp_rehearsal_dinner : null,
        attendees_rehearsal_dinner: selectedInvitee.invited_to_rehearsal && formData.rsvp_rehearsal_dinner ? formData.attendees_rehearsal_dinner : null,
        children_attendees_rehearsal_dinner: formData.children_attendees_rehearsal_dinner,
        rsvp_date_stamp: new Date().toISOString(),
      };

      let result;
      if (existingRSVP) {
        // Update existing RSVP
        result = await supabase
          .from('rsvp_responses')
          .update(rsvpData)
          .eq('id', existingRSVP.id);
      } else {
        // Insert new RSVP
        result = await supabase
          .from('rsvp_responses')
          .insert([rsvpData]);
      }

      if (result.error) {
        throw result.error;
      }

      // Log the submission
      await supabase
        .from('submission_logs')
        .insert({
          invitee_name: selectedInvitee.name,
          submission_data: {
            ...formData,
            invitee_name: selectedInvitee.name,
            invitee_id: selectedInvitee.id,
            timestamp: new Date().toISOString()
          }
        });

      setSubmitted(true);
      toast({
        title: "RSVP Submitted Successfully!",
        description: "Thank you for your RSVP!",
      });

    } catch (error) {
      console.error('Error submitting RSVP:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your RSVP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate dropdown options
  const generateAttendeeOptions = (max: number) => {
    return Array.from({ length: max }, (_, i) => i + 1);
  };

  const generateChildrenOptions = (max: number) => {
    return Array.from({ length: max + 1 }, (_, i) => i);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Wedding RSVP</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name Search */}
          <div className="space-y-2">
            <Label htmlFor="name-search">What's your name?</Label>
            <div className="relative">
              <Input
                id="name-search"
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                placeholder="Start typing your name..."
                disabled={showForm && !!selectedInvitee}
              />
              
              {/* Dropdown with name options */}
              {inviteeOptions.length > 0 && !showForm && (
                <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                  {inviteeOptions.map((invitee) => (
                    <button
                      key={invitee.id}
                      onClick={() => handleInviteeSelect(invitee)}
                      className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-none"
                    >
                      {invitee.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Dynamic RSVP Form */}
          {showForm && selectedInvitee && !submitted && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Wedding RSVP */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Wedding RSVP</h3>
                
                <div className="space-y-2">
                  <Label>Coming to the Wedding? *</Label>
                  <Select
                    value={formData.rsvp_wedding?.toString() || ""}
                    onValueChange={(value) => setFormData(prev => ({ 
                      ...prev, 
                      rsvp_wedding: value === "true",
                      attendees_wedding: value === "true" ? 1 : null
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Yes or No" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.rsvp_wedding === true && (
                  <div className="space-y-2">
                    <Label>Number of Adults Attending the Wedding? *</Label>
                    <Select
                      value={formData.attendees_wedding?.toString() || ""}
                      onValueChange={(value) => setFormData(prev => ({ 
                        ...prev, 
                        attendees_wedding: parseInt(value)
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of adults" />
                      </SelectTrigger>
                      <SelectContent>
                        {generateAttendeeOptions(selectedInvitee.guest_count_allowed + 1).map(num => (
                          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedInvitee.has_children && formData.rsvp_wedding === true && (
                  <div className="space-y-2">
                    <Label>Number of Children for Childcare for the Wedding?</Label>
                    <Select
                      value={formData.children_for_childcare_wedding.toString()}
                      onValueChange={(value) => setFormData(prev => ({ 
                        ...prev, 
                        children_for_childcare_wedding: parseInt(value)
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {generateChildrenOptions(selectedInvitee.known_number_of_children).map(num => (
                          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Rehearsal Dinner RSVP */}
              {selectedInvitee.invited_to_rehearsal && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Rehearsal Dinner RSVP</h3>
                  
                  <div className="space-y-2">
                    <Label>Coming to the Rehearsal Dinner? *</Label>
                    <Select
                      value={formData.rsvp_rehearsal_dinner?.toString() || ""}
                      onValueChange={(value) => setFormData(prev => ({ 
                        ...prev, 
                        rsvp_rehearsal_dinner: value === "true",
                        attendees_rehearsal_dinner: value === "true" ? 1 : null
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Yes or No" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.rsvp_rehearsal_dinner === true && (
                    <div className="space-y-2">
                      <Label>Number of Adults Attending the Rehearsal Dinner? *</Label>
                      <Select
                        value={formData.attendees_rehearsal_dinner?.toString() || ""}
                        onValueChange={(value) => setFormData(prev => ({ 
                          ...prev, 
                          attendees_rehearsal_dinner: parseInt(value)
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select number of adults" />
                        </SelectTrigger>
                        <SelectContent>
                          {generateAttendeeOptions(selectedInvitee.guest_count_allowed + 1).map(num => (
                            <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {selectedInvitee.has_children && formData.rsvp_rehearsal_dinner === true && (
                    <div className="space-y-2">
                      <Label>Number of Children Attending the Rehearsal Dinner?</Label>
                      <Select
                        value={formData.children_attendees_rehearsal_dinner.toString()}
                        onValueChange={(value) => setFormData(prev => ({ 
                          ...prev, 
                          children_attendees_rehearsal_dinner: parseInt(value)
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {generateChildrenOptions(selectedInvitee.known_number_of_children).map(num => (
                            <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
              </Button>
            </form>
          )}

          {/* Success Message */}
          {submitted && (
            <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Thank you for your RSVP!
              </h3>
              <p className="text-green-600">
                Your response has been successfully submitted.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}