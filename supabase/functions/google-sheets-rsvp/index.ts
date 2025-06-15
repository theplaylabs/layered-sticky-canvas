import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface InviteeData {
  name: string;
  email?: string;
  guest_count_allowed: number;
  invited_to_rehearsal: boolean;
  has_children: boolean;
  known_number_of_children: number;
}

interface RSVPSubmission {
  invitee_name: string;
  rsvp_wedding: boolean;
  attendees_wedding?: number;
  children_for_childcare_wedding?: number;
  rsvp_rehearsal_dinner?: boolean;
  attendees_rehearsal_dinner?: number;
  children_attendees_rehearsal_dinner?: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action');

    if (action === 'search_names') {
      const query = url.searchParams.get('q')?.toLowerCase() || '';
      
      // TODO: Replace with actual Google Sheets API call
      // For now, return mock data that matches the expected structure
      const mockInvitees: InviteeData[] = [
        {
          name: "John Smith",
          email: "john@example.com",
          guest_count_allowed: 1,
          invited_to_rehearsal: true,
          has_children: false,
          known_number_of_children: 0
        },
        {
          name: "Jane and Mark Johnson",
          email: "jane@example.com",
          guest_count_allowed: 0,
          invited_to_rehearsal: true,
          has_children: true,
          known_number_of_children: 2
        },
        {
          name: "The Williams Family",
          guest_count_allowed: 2,
          invited_to_rehearsal: false,
          has_children: true,
          known_number_of_children: 3
        }
      ];

      const filteredNames = mockInvitees
        .filter(invitee => invitee.name.toLowerCase().includes(query))
        .map(invitee => invitee.name);

      return new Response(
        JSON.stringify({ names: filteredNames }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      );
    }

    if (action === 'get_invitee') {
      const name = url.searchParams.get('name');
      
      if (!name) {
        return new Response(
          JSON.stringify({ error: 'Name parameter required' }),
          { 
            status: 400,
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json' 
            } 
          }
        );
      }

      // TODO: Replace with actual Google Sheets API call
      const mockInvitees: InviteeData[] = [
        {
          name: "John Smith",
          email: "john@example.com",
          guest_count_allowed: 1,
          invited_to_rehearsal: true,
          has_children: false,
          known_number_of_children: 0
        },
        {
          name: "Jane and Mark Johnson",
          email: "jane@example.com",
          guest_count_allowed: 0,
          invited_to_rehearsal: true,
          has_children: true,
          known_number_of_children: 2
        },
        {
          name: "The Williams Family",
          guest_count_allowed: 2,
          invited_to_rehearsal: false,
          has_children: true,
          known_number_of_children: 3
        }
      ];

      const invitee = mockInvitees.find(inv => inv.name === name);

      if (!invitee) {
        return new Response(
          JSON.stringify({ error: 'Invitee not found' }),
          { 
            status: 404,
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json' 
            } 
          }
        );
      }

      return new Response(
        JSON.stringify({ invitee }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      );
    }

    if (req.method === 'POST') {
      const rsvpData: RSVPSubmission = await req.json();

      console.log('RSVP Submission received:', {
        timestamp: new Date().toISOString(),
        data: rsvpData
      });

      // TODO: Update Google Sheets with RSVP data
      // TODO: Append to CSV log file on Google Drive

      // For now, just log the submission
      console.log('Would update Google Sheets for:', rsvpData.invitee_name);
      console.log('RSVP Data:', rsvpData);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'RSVP submitted successfully',
          timestamp: new Date().toISOString()
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in google-sheets-rsvp function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});