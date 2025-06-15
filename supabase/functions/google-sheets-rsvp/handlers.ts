import { InviteeData, RSVPSubmission } from './types.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SPREADSHEET_ID = '1p5a84w99mVNag0M-aWzW8KJTVVYmqf_1yN64IdercvM';
const INVITEES_RANGE = 'Invitees!A:H'; // Adjust based on your sheet structure
const RSVP_RANGE = 'RSVP Responses!A:H'; // Adjust based on your sheet structure

async function getAccessToken(): Promise<string> {
  const privateKey = Deno.env.get('GOOGLE_SHEETS_PRIVATE_KEY')?.replace(/\\n/g, '\n');
  const clientEmail = Deno.env.get('GOOGLE_SHEETS_CLIENT_EMAIL');
  
  if (!privateKey || !clientEmail) {
    throw new Error('Missing Google Sheets credentials');
  }

  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };

  const payload = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  // Create JWT
  const encoder = new TextEncoder();
  const headerB64 = btoa(JSON.stringify(header)).replace(/[+/]/g, (c) => c === '+' ? '-' : '_').replace(/=/g, '');
  const payloadB64 = btoa(JSON.stringify(payload)).replace(/[+/]/g, (c) => c === '+' ? '-' : '_').replace(/=/g, '');
  const unsignedToken = `${headerB64}.${payloadB64}`;

  // Import private key
  const keyData = await crypto.subtle.importKey(
    'pkcs8',
    encoder.encode(privateKey),
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );

  // Sign the token
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    keyData,
    encoder.encode(unsignedToken)
  );

  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/[+/]/g, (c) => c === '+' ? '-' : '_')
    .replace(/=/g, '');

  const jwt = `${unsignedToken}.${signatureB64}`;

  // Exchange JWT for access token
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.statusText}`);
  }

  const tokenData = await response.json();
  return tokenData.access_token;
}

async function readFromGoogleSheets(range: string): Promise<any[][]> {
  const accessToken = await getAccessToken();
  
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to read from Google Sheets: ${response.statusText}`);
  }

  const data = await response.json();
  return data.values || [];
}

async function writeToGoogleSheets(range: string, values: any[][]): Promise<void> {
  const accessToken = await getAccessToken();
  
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}:append?valueInputOption=RAW`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: values,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to write to Google Sheets: ${response.statusText}`);
  }
}

async function getInviteesFromSheet(): Promise<InviteeData[]> {
  try {
    const values = await readFromGoogleSheets(INVITEES_RANGE);
    
    if (values.length === 0) {
      return [];
    }

    // Skip header row, map data to InviteeData interface
    return values.slice(1).map(row => ({
      name: row[0] || '',
      email: row[1] || undefined,
      guest_count_allowed: parseInt(row[2]) || 0,
      invited_to_rehearsal: row[3]?.toLowerCase() === 'true',
      has_children: row[4]?.toLowerCase() === 'true',
      known_number_of_children: parseInt(row[5]) || 0,
    })).filter(invitee => invitee.name.trim() !== '');
  } catch (error) {
    console.error('Error fetching invitees from Google Sheets:', error);
    return [];
  }
}

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

export async function handleSearchNames(query: string) {
  try {
    const invitees = await getInviteesFromSheet();
    const filteredNames = invitees
      .filter(invitee => invitee.name.toLowerCase().includes(query.toLowerCase()))
      .map(invitee => invitee.name);

    return createCorsResponse({ names: filteredNames });
  } catch (error) {
    console.error('Error searching names:', error);
    return createCorsResponse(
      { error: 'Failed to search names' }, 
      500
    );
  }
}

export async function handleGetInvitee(name: string) {
  if (!name) {
    return createCorsResponse(
      { error: 'Name parameter required' }, 
      400
    );
  }

  try {
    const invitees = await getInviteesFromSheet();
    const invitee = invitees.find(inv => inv.name === name);

    if (!invitee) {
      return createCorsResponse(
        { error: 'Invitee not found' }, 
        404
      );
    }

    return createCorsResponse({ invitee });
  } catch (error) {
    console.error('Error getting invitee:', error);
    return createCorsResponse(
      { error: 'Failed to get invitee data' }, 
      500
    );
  }
}

export async function handleRSVPSubmission(rsvpData: RSVPSubmission) {
  console.log('RSVP Submission received:', {
    timestamp: new Date().toISOString(),
    data: rsvpData
  });

  try {
    // Prepare data for Google Sheets
    const rsvpRow = [
      new Date().toISOString(), // Timestamp
      rsvpData.invitee_name,
      rsvpData.rsvp_wedding?.toString() || '',
      rsvpData.attendees_wedding?.toString() || '',
      rsvpData.children_for_childcare_wedding?.toString() || '',
      rsvpData.rsvp_rehearsal_dinner?.toString() || '',
      rsvpData.attendees_rehearsal_dinner?.toString() || '',
      rsvpData.children_attendees_rehearsal_dinner?.toString() || '',
    ];

    // Write to Google Sheets
    await writeToGoogleSheets(RSVP_RANGE, [rsvpRow]);

    console.log('Successfully updated Google Sheets for:', rsvpData.invitee_name);

    return createCorsResponse({ 
      success: true, 
      message: 'RSVP submitted successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return createCorsResponse(
      { 
        error: 'Failed to submit RSVP',
        message: error.message 
      }, 
      500
    );
  }
}