import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GoogleSheetsRow {
  name: string;
  email?: string;
  guest_count_allowed: number;
  invited_to_rehearsal: boolean;
  has_children: boolean;
  known_number_of_children: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    if (req.method === 'POST') {
      // Import data from Google Sheets to Supabase
      const { rows } = await req.json() as { rows: GoogleSheetsRow[] };
      
      console.log('Importing rows to Supabase:', rows.length);

      // Insert or update invitees
      for (const row of rows) {
        const { error } = await supabaseClient
          .from('invitees')
          .upsert({
            name: row.name,
            email: row.email || null,
            guest_count_allowed: row.guest_count_allowed,
            invited_to_rehearsal: row.invited_to_rehearsal,
            has_children: row.has_children,
            known_number_of_children: row.known_number_of_children,
          }, {
            onConflict: 'name'
          });

        if (error) {
          console.error('Error inserting/updating invitee:', error);
          throw error;
        }
      }

      return new Response(
        JSON.stringify({ success: true, imported: rows.length }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    if (req.method === 'GET') {
      // Export RSVP responses to Google Sheets format
      const { data: responses, error } = await supabaseClient
        .from('rsvp_responses')
        .select(`
          *,
          invitees:invitee_id (
            name,
            email,
            guest_count_allowed,
            invited_to_rehearsal,
            has_children,
            known_number_of_children
          )
        `)
        .order('rsvp_date_stamp', { ascending: false });

      if (error) {
        throw error;
      }

      // Format data for Google Sheets
      const formattedData = responses?.map(response => ({
        invitee_name: response.invitees?.name,
        email: response.invitees?.email,
        guest_count_allowed: response.invitees?.guest_count_allowed,
        invited_to_rehearsal: response.invitees?.invited_to_rehearsal,
        has_children: response.invitees?.has_children,
        known_number_of_children: response.invitees?.known_number_of_children,
        rsvp_date_stamp: response.rsvp_date_stamp,
        rsvp_wedding: response.rsvp_wedding,
        attendees_wedding: response.attendees_wedding,
        children_for_childcare_wedding: response.children_for_childcare_wedding,
        rsvp_rehearsal_dinner: response.rsvp_rehearsal_dinner,
        attendees_rehearsal_dinner: response.attendees_rehearsal_dinner,
        children_attendees_rehearsal_dinner: response.children_attendees_rehearsal_dinner,
      })) || [];

      return new Response(
        JSON.stringify({ data: formattedData }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Error in google-sheets-sync function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);