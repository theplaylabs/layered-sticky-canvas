import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Plus, Download } from 'lucide-react';

interface Invitee {
  id: string;
  name: string;
  email?: string;
  guest_count_allowed: number;
  invited_to_rehearsal: boolean;
  has_children: boolean;
  known_number_of_children: number;
}

interface RSVPResponse {
  id: string;
  invitee_name: string;
  rsvp_wedding: boolean;
  attendees_wedding: number;
  children_for_childcare_wedding: number;
  rsvp_rehearsal_dinner?: boolean;
  attendees_rehearsal_dinner?: number;
  children_attendees_rehearsal_dinner: number;
  rsvp_date_stamp: string;
}

export default function AdminPanel() {
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  const [responses, setResponses] = useState<RSVPResponse[]>([]);
  const [newInvitee, setNewInvitee] = useState({
    name: '',
    email: '',
    guest_count_allowed: 1,
    invited_to_rehearsal: false,
    has_children: false,
    known_number_of_children: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchInvitees();
    fetchResponses();
  }, []);

  const fetchInvitees = async () => {
    const { data, error } = await supabase
      .from('invitees')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching invitees:', error);
      toast({
        title: "Error",
        description: "Failed to fetch invitees",
        variant: "destructive"
      });
      return;
    }

    setInvitees(data || []);
  };

  const fetchResponses = async () => {
    const { data, error } = await supabase
      .from('rsvp_responses')
      .select(`
        *,
        invitees:invitee_id (name)
      `)
      .order('rsvp_date_stamp', { ascending: false });

    if (error) {
      console.error('Error fetching responses:', error);
      return;
    }

    const formattedResponses = data?.map(response => ({
      ...response,
      invitee_name: response.invitees?.name || 'Unknown'
    })) || [];

    setResponses(formattedResponses);
  };

  const addInvitee = async () => {
    if (!newInvitee.name.trim()) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    const { error } = await supabase
      .from('invitees')
      .insert([{
        name: newInvitee.name,
        email: newInvitee.email || null,
        guest_count_allowed: newInvitee.guest_count_allowed,
        invited_to_rehearsal: newInvitee.invited_to_rehearsal,
        has_children: newInvitee.has_children,
        known_number_of_children: newInvitee.known_number_of_children,
      }]);

    if (error) {
      console.error('Error adding invitee:', error);
      toast({
        title: "Error",
        description: "Failed to add invitee",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Invitee added successfully",
      });
      setNewInvitee({
        name: '',
        email: '',
        guest_count_allowed: 1,
        invited_to_rehearsal: false,
        has_children: false,
        known_number_of_children: 0,
      });
      fetchInvitees();
    }

    setIsLoading(false);
  };

  const deleteInvitee = async (id: string) => {
    if (!confirm('Are you sure you want to delete this invitee? This will also delete their RSVP responses.')) {
      return;
    }

    const { error } = await supabase
      .from('invitees')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting invitee:', error);
      toast({
        title: "Error",
        description: "Failed to delete invitee",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Invitee deleted successfully",
      });
      fetchInvitees();
      fetchResponses();
    }
  };

  const exportToCSV = () => {
    const csvData = responses.map(response => ({
      'Invitee Name': response.invitee_name,
      'RSVP Date': new Date(response.rsvp_date_stamp).toLocaleDateString(),
      'Coming to Wedding': response.rsvp_wedding ? 'Yes' : 'No',
      'Wedding Attendees': response.attendees_wedding || 0,
      'Children for Childcare': response.children_for_childcare_wedding || 0,
      'Coming to Rehearsal': response.rsvp_rehearsal_dinner ? 'Yes' : 'No',
      'Rehearsal Attendees': response.attendees_rehearsal_dinner || 0,
      'Children at Rehearsal': response.children_attendees_rehearsal_dinner || 0,
    }));

    const csv = [
      Object.keys(csvData[0] || {}).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rsvp-responses.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const addSampleData = async () => {
    const sampleInvitees = [
      {
        name: "John & Jane Smith",
        email: "john.smith@email.com",
        guest_count_allowed: 2,
        invited_to_rehearsal: true,
        has_children: true,
        known_number_of_children: 2
      },
      {
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        guest_count_allowed: 1,
        invited_to_rehearsal: false,
        has_children: false,
        known_number_of_children: 0
      },
      {
        name: "Mike & Lisa Wilson",
        email: "wilson.family@email.com",
        guest_count_allowed: 3,
        invited_to_rehearsal: true,
        has_children: true,
        known_number_of_children: 1
      }
    ];

    const { error } = await supabase
      .from('invitees')
      .insert(sampleInvitees);

    if (error) {
      console.error('Error adding sample data:', error);
      toast({
        title: "Error",
        description: "Failed to add sample data",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Sample data added successfully",
      });
      fetchInvitees();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">RSVP Admin Panel</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Invitees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{invitees.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Total Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{responses.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {invitees.length > 0 ? Math.round((responses.length / invitees.length) * 100) : 0}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add Invitee Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Invitee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={newInvitee.name}
                onChange={(e) => setNewInvitee({ ...newInvitee, name: e.target.value })}
                placeholder="Enter full name"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newInvitee.email}
                onChange={(e) => setNewInvitee({ ...newInvitee, email: e.target.value })}
                placeholder="Enter email"
              />
            </div>
            
            <div>
              <Label htmlFor="guestCount">Guest Count Allowed</Label>
              <Input
                id="guestCount"
                type="number"
                min="1"
                max="10"
                value={newInvitee.guest_count_allowed}
                onChange={(e) => setNewInvitee({ ...newInvitee, guest_count_allowed: parseInt(e.target.value) })}
              />
            </div>
            
            <div>
              <Label htmlFor="childrenCount">Known Number of Children</Label>
              <Input
                id="childrenCount"
                type="number"
                min="0"
                max="10"
                value={newInvitee.known_number_of_children}
                onChange={(e) => setNewInvitee({ ...newInvitee, known_number_of_children: parseInt(e.target.value) })}
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="rehearsal"
                checked={newInvitee.invited_to_rehearsal}
                onCheckedChange={(checked) => setNewInvitee({ ...newInvitee, invited_to_rehearsal: checked })}
              />
              <Label htmlFor="rehearsal">Invited to Rehearsal Dinner</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="children"
                checked={newInvitee.has_children}
                onCheckedChange={(checked) => setNewInvitee({ ...newInvitee, has_children: checked })}
              />
              <Label htmlFor="children">Has Children</Label>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={addInvitee} disabled={isLoading}>
              <Plus className="w-4 h-4 mr-2" />
              Add Invitee
            </Button>
            
            <Button onClick={addSampleData} variant="outline">
              Add Sample Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={exportToCSV} disabled={responses.length === 0}>
            <Download className="w-4 h-4 mr-2" />
            Export RSVP Responses to CSV
          </Button>
        </CardContent>
      </Card>

      {/* Invitees List */}
      <Card>
        <CardHeader>
          <CardTitle>All Invitees ({invitees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {invitees.map((invitee) => (
              <div key={invitee.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{invitee.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {invitee.email} • {invitee.guest_count_allowed + 1} max guests
                    {invitee.invited_to_rehearsal && " • Rehearsal invited"}
                    {invitee.has_children && ` • ${invitee.known_number_of_children} children`}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteInvitee(invitee.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Responses */}
      <Card>
        <CardHeader>
          <CardTitle>Recent RSVP Responses ({responses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {responses.map((response) => (
              <div key={response.id} className="p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{response.invitee_name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Submitted: {new Date(response.rsvp_date_stamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <p>Wedding: {response.rsvp_wedding ? `Yes (${response.attendees_wedding} adults)` : 'No'}</p>
                    {response.rsvp_rehearsal_dinner !== null && (
                      <p>Rehearsal: {response.rsvp_rehearsal_dinner ? `Yes (${response.attendees_rehearsal_dinner} adults)` : 'No'}</p>
                    )}
                    {(response.children_for_childcare_wedding > 0 || response.children_attendees_rehearsal_dinner > 0) && (
                      <p>Children: {response.children_for_childcare_wedding + response.children_attendees_rehearsal_dinner}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}