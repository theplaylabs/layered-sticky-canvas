-- Create invitees table to store guest list information
CREATE TABLE public.invitees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  email TEXT,
  guest_count_allowed INTEGER NOT NULL DEFAULT 0,
  invited_to_rehearsal BOOLEAN NOT NULL DEFAULT false,
  has_children BOOLEAN NOT NULL DEFAULT false,
  known_number_of_children INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create RSVP responses table
CREATE TABLE public.rsvp_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invitee_id UUID NOT NULL REFERENCES public.invitees(id) ON DELETE CASCADE,
  rsvp_date_stamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  rsvp_wedding BOOLEAN,
  attendees_wedding INTEGER,
  children_for_childcare_wedding INTEGER DEFAULT 0,
  rsvp_rehearsal_dinner BOOLEAN,
  attendees_rehearsal_dinner INTEGER,
  children_attendees_rehearsal_dinner INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create submission logs table for tracking
CREATE TABLE public.submission_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invitee_name TEXT NOT NULL,
  submission_data JSONB NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.invitees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a public RSVP form)
CREATE POLICY "Invitees are viewable by everyone" 
ON public.invitees 
FOR SELECT 
USING (true);

CREATE POLICY "RSVP responses can be inserted by everyone" 
ON public.rsvp_responses 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "RSVP responses can be updated by everyone" 
ON public.rsvp_responses 
FOR UPDATE 
USING (true);

CREATE POLICY "RSVP responses are viewable by everyone" 
ON public.rsvp_responses 
FOR SELECT 
USING (true);

CREATE POLICY "Submission logs can be inserted by everyone" 
ON public.submission_logs 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_invitees_updated_at
  BEFORE UPDATE ON public.invitees
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rsvp_responses_updated_at
  BEFORE UPDATE ON public.rsvp_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_invitees_name ON public.invitees(name);
CREATE INDEX idx_rsvp_responses_invitee_id ON public.rsvp_responses(invitee_id);
CREATE INDEX idx_submission_logs_timestamp ON public.submission_logs(timestamp);