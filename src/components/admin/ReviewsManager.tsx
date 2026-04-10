import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Star, CheckCircle, XCircle, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export default function ReviewsManager() {
  const { data: reviews, isLoading, refetch } = useQuery({
    queryKey: ['all_reviews_admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const toggleVisibility = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ is_visible: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Review ${!currentStatus ? 'is now visible' : 'is now hidden'}`);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update review visibility');
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const { error } = await supabase.from('reviews').delete().eq('id', id);
      if (error) throw error;
      toast.success('Review deleted');
      refetch();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete review');
    }
  };

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading reviews...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading text-saffron-gradient">Testimonial Moderation</h2>
          <p className="text-sm text-muted-foreground">Approve, hide or delete reviews submitted by users.</p>
        </div>
        <Button onClick={() => refetch()} variant="outline" size="sm">Refresh</Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {reviews && reviews.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/30">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Person</th>
                  <th className="px-4 py-3">Review Content</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {reviews.map((review: any) => (
                  <tr key={review.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold">{review.name}</div>
                      <div className="text-xs text-muted-foreground">{review.designation || 'Visitor'}</div>
                      <div className="flex gap-0.5 mt-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} size={10} className="fill-primary text-primary" />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 max-w-[300px]">
                      <p className="line-clamp-2 text-foreground/80" title={review.content}>{review.content}</p>
                    </td>
                    <td className="px-4 py-3">
                      {review.is_visible ? (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                          <CheckCircle size={10} /> Visible
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                          <XCircle size={10} /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          onClick={() => toggleVisibility(review.id, review.is_visible)}
                          variant="ghost" 
                          size="icon" 
                          className={review.is_visible ? 'text-amber-600 hover:text-amber-700' : 'text-green-600 hover:text-green-700'}
                          title={review.is_visible ? 'Hide from site' : 'Make visible'}
                        >
                          {review.is_visible ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                        <Button 
                          onClick={() => deleteReview(review.id)}
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:text-destructive/80"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            No reviews submitted yet.
          </div>
        )}
      </div>
    </div>
  );
}
