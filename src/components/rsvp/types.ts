export interface InviteeData {
  name: string;
  email?: string;
  guest_count_allowed: number;
  invited_to_rehearsal: boolean;
  has_children: boolean;
  known_number_of_children: number;
}

export interface RSVPFormData {
  rsvp_wedding: boolean | null;
  attendees_wedding: number | null;
  children_for_childcare_wedding: number | null;
  rsvp_rehearsal_dinner: boolean | null;
  attendees_rehearsal_dinner: number | null;
  children_attendees_rehearsal_dinner: number | null;
}