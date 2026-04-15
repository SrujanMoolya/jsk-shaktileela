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

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        {bookings && bookings.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-secondary/30">
                  <tr>
                    <th className="px-4 py-3">Date Received</th>
                    <th className="px-4 py-3">Name / Org</th>
                    <th className="px-4 py-3">Event Type</th>
                    <th className="px-4 py-3">Pref. Date</th>
                    <th className="px-4 py-3">Contact/Loc</th>
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
                        <div className="text-xs">
                          <span className="text-primary font-medium">Ph:</span> {booking.phone}
                        </div>
                        <div className="text-xs truncate max-w-[150px]">
                          <span className="text-primary font-medium">Loc:</span> {booking.location}
                        </div>
                      </td>
                      <td className="px-4 py-3 max-w-[200px] truncate" title={booking.message || ''}>
                        {booking.message || <span className="text-muted-foreground/50 italic">No message</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden divide-y divide-border">
              {bookings.map((booking: any) => (
                <div key={booking.id} className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-primary">{booking.name}</h3>
                      <p className="text-xs text-muted-foreground">{booking.organization || 'No Organization'}</p>
                    </div>
                    <span className="text-[10px] bg-secondary px-2 py-0.5 rounded text-muted-foreground uppercase font-bold">
                      {booking.event_type}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Received: {new Date(booking.created_at).toLocaleDateString()}</p>
                      <p className="font-medium">Pref: {booking.preferred_date ? new Date(booking.preferred_date).toLocaleDateString() : 'TBD'}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="font-medium">{booking.phone}</p>
                      <p className="text-muted-foreground truncate">{booking.location}</p>
                    </div>
                  </div>

                  {booking.message && (
                    <div className="bg-secondary/5 rounded p-2 text-xs text-muted-foreground italic">
                      "{booking.message}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="p-12 text-center text-muted-foreground italic font-medium">
            No booking inquiries received yet.
          </div>
        )}
      </div>
    </div>
  );
}
