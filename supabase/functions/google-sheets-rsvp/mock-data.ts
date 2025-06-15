import { InviteeData } from './types.ts';

export const MOCK_INVITEES: InviteeData[] = [
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
  },
  {
    name: "Sarah Davis",
    email: "sarah@example.com",
    guest_count_allowed: 1,
    invited_to_rehearsal: false,
    has_children: false,
    known_number_of_children: 0
  },
  {
    name: "Michael and Lisa Brown",
    email: "michael@example.com",
    guest_count_allowed: 0,
    invited_to_rehearsal: true,
    has_children: true,
    known_number_of_children: 1
  }
];