export interface InviteeData {
  name: string;
  email?: string;
  guest_count_allowed: number;
  invited_to_rehearsal: boolean;
  has_children: boolean;
  known_number_of_children: number;
}

export interface RSVPSubmission {
  invitee_name: string;
  rsvp_wedding: boolean;
  attendees_wedding?: number;
  children_for_childcare_wedding?: number;
  rsvp_rehearsal_dinner?: boolean;
  attendees_rehearsal_dinner?: number;
  children_attendees_rehearsal_dinner?: number;
}