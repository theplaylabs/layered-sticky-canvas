import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { RSVPSubmission } from './types.ts';
import { 
  createCorsResponse, 
  handleSearchNames, 
  handleGetInvitee, 
  handleRSVPSubmission 
} from './handlers.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action');

    // Handle GET requests with actions
    if (req.method === 'GET') {
      switch (action) {
        case 'search_names': {
          const query = url.searchParams.get('q') || '';
          return handleSearchNames(query);
        }
        
        case 'get_invitee': {
          const name = url.searchParams.get('name') || '';
          return handleGetInvitee(name);
        }
        
        default:
          return createCorsResponse(
            { error: 'Invalid action parameter' }, 
            400
          );
      }
    }

    // Handle POST requests for RSVP submission
    if (req.method === 'POST') {
      const rsvpData: RSVPSubmission = await req.json();
      return handleRSVPSubmission(rsvpData);
    }

    return createCorsResponse(
      { error: 'Method not allowed' }, 
      405
    );

  } catch (error) {
    console.error('Error in google-sheets-rsvp function:', error);
    
    return createCorsResponse(
      { 
        error: 'Internal server error',
        message: error.message 
      }, 
      500
    );
  }
});