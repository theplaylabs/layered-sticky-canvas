import { MOCK_INVITEES } from './mock-data.ts';
import { InviteeData, RSVPSubmission } from './types.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export function createCorsResponse(body: any, status = 200) {
  return new Response(
    JSON.stringify(body),
    { 
      status,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      } 
    }
  );
}

export function handleSearchNames(query: string) {
  const filteredNames = MOCK_INVITEES
    .filter(invitee => invitee.name.toLowerCase().includes(query.toLowerCase()))
    .map(invitee => invitee.name);

  return createCorsResponse({ names: filteredNames });
}

export function handleGetInvitee(name: string) {
  if (!name) {
    return createCorsResponse(
      { error: 'Name parameter required' }, 
      400
    );
  }

  const invitee = MOCK_INVITEES.find(inv => inv.name === name);

  if (!invitee) {
    return createCorsResponse(
      { error: 'Invitee not found' }, 
      404
    );
  }

  return createCorsResponse({ invitee });
}

export function handleRSVPSubmission(rsvpData: RSVPSubmission) {
  console.log('RSVP Submission received:', {
    timestamp: new Date().toISOString(),
    data: rsvpData
  });

  // TODO: Update Google Sheets with RSVP data
  // TODO: Append to CSV log file on Google Drive

  console.log('Would update Google Sheets for:', rsvpData.invitee_name);
  console.log('RSVP Data:', rsvpData);

  return createCorsResponse({ 
    success: true, 
    message: 'RSVP submitted successfully',
    timestamp: new Date().toISOString()
  });
}