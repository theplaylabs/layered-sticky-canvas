import { useState, useCallback } from 'react';
import { InviteeData, RSVPFormData } from '@/components/rsvp/types';

const SUPABASE_FUNCTION_URL = 'https://tzhytnszwzazoxjmiyrl.supabase.co/functions/v1/google-sheets-rsvp';
const SUPABASE_AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6aHl0bnN6d3phem94am1peXJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMDQzNDMsImV4cCI6MjA2NTU4MDM0M30.-2eZn_s2V_TwiE69raP3XnyI2BQbN0t_HbIyqYfiOyA';

export const useRSVPApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchNames = useCallback(async (query: string): Promise<string[]> => {
    if (query.length < 2) return [];
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${SUPABASE_FUNCTION_URL}?action=search_names&q=${encodeURIComponent(query)}`,
        {
          headers: {
            'Authorization': SUPABASE_AUTH_TOKEN,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to search names');

      const result = await response.json();
      return result.names || [];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search names';
      setError(errorMessage);
      console.error('Error searching names:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getInviteeData = useCallback(async (name: string): Promise<InviteeData | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${SUPABASE_FUNCTION_URL}?action=get_invitee&name=${encodeURIComponent(name)}`,
        {
          headers: {
            'Authorization': SUPABASE_AUTH_TOKEN,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to get invitee data');

      const result = await response.json();
      return result.invitee;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get invitee data';
      setError(errorMessage);
      console.error('Error getting invitee data:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitRSVP = useCallback(async (inviteeName: string, formData: RSVPFormData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const submissionData = {
        invitee_name: inviteeName,
        ...formData,
      };

      const response = await fetch(SUPABASE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': SUPABASE_AUTH_TOKEN,
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) throw new Error('Failed to submit RSVP');

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit RSVP';
      setError(errorMessage);
      console.error('Error submitting RSVP:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    searchNames,
    getInviteeData,
    submitRSVP,
    isLoading,
    error,
  };
};