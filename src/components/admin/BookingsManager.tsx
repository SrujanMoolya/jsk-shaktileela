import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export default function BookingsManager() {
  const { data: bookings, isLoading, refetch } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div className="p-4 text-muted-foreground">Loading bookings...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading text-saffron-gradient">Booking Inquiries</h2>
          <p className="text-sm text-muted-foreground">Manage and view all incoming team booking requests.</p>
        </div>
        <button 
          onClick={() => refetch()}
          className="text-sm text-primary hover:underline"
        >
          Refresh List
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {bookings && bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/30">
                <tr>
                  <th className="px-4 py-3">Date Received</th>
                  <th className="px-4 py-3">Name / Org</th>
                  <th className="px-4 py-3">Event Type</th>
                  <th className="px-4 py-3">Pref. Date</th>
                  <th className="px-4 py-3">Details</th>
                  <th className="px-4 py-3">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {bookings.map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold">{booking.name}</div>
                      <div className="text-muted-foreground text-xs">{booking.organization || '-'}</div>
                    </td>
                    <td className="px-4 py-3">{booking.event_type}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {booking.preferred_date ? new Date(booking.preferred_date).toLocaleDateString() : 'Not set'}
                    </td>
                    <td className="px-4 py-3">
                      <div><span className="text-muted-foreground text-xs">Ph:</span> {booking.phone}</div>
                      <div><span className="text-muted-foreground text-xs">Loc:</span> {booking.location}</div>
                    </td>
                    <td className="px-4 py-3 max-w-[250px] truncate" title={booking.message || ''}>
                      {booking.message || <span className="text-muted-foreground/50 italic">No message</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            No booking inquiries received yet.
          </div>
        )}
      </div>
    </div>
  );
}
