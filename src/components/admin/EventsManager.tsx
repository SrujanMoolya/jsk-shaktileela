import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';
import ImageUpload from './ImageUpload';
import { deleteFileFromStorage } from '@/utils/storage-utils';

type Event = Tables<'events'>;

const emptyForm: Partial<TablesInsert<'events'>> = {
  name: '', date: '', location: '', description: '', status: 'upcoming', video_link: '', photos: [],
};

export default function EventsManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    const { data } = await supabase.from('events').select('*').order('display_order');
    if (data) setEvents(data);
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleSave = async () => {
    if (!form.name || !form.date || !form.location) {
      toast.error('Name, date, and location are required');
      return;
    }
    setLoading(true);
    if (editingId) {
      const { error } = await supabase.from('events').update(form).eq('id', editingId);
      if (error) toast.error(error.message);
      else toast.success('Event updated');
    } else {
      const { error } = await supabase.from('events').insert(form as TablesInsert<'events'>);
      if (error) toast.error(error.message);
      else toast.success('Event created');
    }
    setForm(emptyForm);
    setEditingId(null);
    setLoading(false);
    fetchEvents();
  };

  const handleEdit = (event: Event) => {
    setEditingId(event.id);
    setForm({ name: event.name, date: event.date, location: event.location, description: event.description, status: event.status, video_link: event.video_link, photos: event.photos ?? [] });
  };

  const handleDelete = async (event: any) => {
    if (!confirm('Delete this event?')) return;

    // Delete all photos from storage
    if (event.photos && Array.isArray(event.photos)) {
      for (const url of event.photos) {
        await deleteFileFromStorage(url);
      }
    }

    const { error } = await supabase.from('events').delete().eq('id', event.id);
    if (error) toast.error(error.message);
    else { toast.success('Event deleted'); fetchEvents(); }
  };

  const addPhoto = (url: string) => {
    setForm(prev => ({ ...prev, photos: [...(prev.photos || []), url] }));
  };

  const removePhoto = async (index: number) => {
    const urlToRemove = form.photos?.[index];
    if (urlToRemove) {
      await deleteFileFromStorage(urlToRemove);
    }
    setForm(prev => ({ ...prev, photos: (prev.photos || []).filter((_, i) => i !== index) }));
  };

  return (
    <div className="space-y-6">
      <div className="warm-card p-4 md:p-6 space-y-4">
        <h2 className="font-heading text-lg">{editingId ? 'Edit Event' : 'Add Event'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Event Name" value={form.name || ''} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
          <Input placeholder="Date (e.g. January 2025)" value={form.date || ''} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
          <Input placeholder="Location" value={form.location || ''} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} />
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={form.status || 'upcoming'}
            onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
          >
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
          <Input placeholder="Video Link (optional)" value={form.video_link || ''} onChange={e => setForm(p => ({ ...p, video_link: e.target.value }))} />
        </div>
        <Textarea placeholder="Description" value={form.description || ''} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />

        <div>
          <p className="text-sm font-medium mb-2">Photos</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {(form.photos || []).map((url, i) => (
              <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-border">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button onClick={() => removePhoto(i)} className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-bl text-xs px-1">✕</button>
              </div>
            ))}
          </div>
          <ImageUpload onUpload={addPhoto} folder="events" />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={loading}>{editingId ? 'Update' : 'Create'}</Button>
          {editingId && <Button variant="outline" onClick={() => { setForm(emptyForm); setEditingId(null); }}>Cancel</Button>}
        </div>
      </div>

      <div className="space-y-3">
        {events.map(event => (
          <div key={event.id} className="warm-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${event.status === 'past' ? 'bg-muted text-muted-foreground' : 'bg-primary/20 text-primary'}`}>
                  {event.status}
                </span>
                <strong className="font-heading text-lg">{event.name}</strong>
              </div>
              <p className="text-muted-foreground text-sm">{event.date} • {event.location}</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button size="sm" variant="outline" className="flex-1 sm:flex-none" onClick={() => handleEdit(event)}>Edit</Button>
               <Button size="sm" variant="destructive" className="flex-1 sm:flex-none" onClick={() => handleDelete(event)}>Delete</Button>
            </div>
          </div>
        ))}
        {events.length === 0 && <p className="text-muted-foreground text-sm text-center py-8">No events yet. Add your first event above.</p>}
      </div>
    </div>
  );
}
