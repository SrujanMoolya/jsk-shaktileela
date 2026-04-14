import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink, Trash2, Calendar, User, MapPin, Video, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function AuditionsManager() {
  const { toast } = useToast();
  const { data: auditions, isLoading, refetch } = useQuery({
    queryKey: ['auditions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('auditions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this audition submission?')) return;
    
    try {
      const { error } = await supabase
        .from('auditions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Successfully removed",
        description: "The audition record has been deleted.",
      });
      refetch();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error deleting",
        description: error.message,
      });
    }
  };

  if (isLoading) return <div className="p-4 text-muted-foreground">Loading auditions...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading text-primary uppercase">Audition Submissions</h2>
          <p className="text-sm text-muted-foreground">Review incoming talent for the Shakti Leela divine play.</p>
        </div>
        <button 
          onClick={() => refetch()}
          className="text-sm text-primary hover:underline font-bold"
        >
          Refresh List
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        {auditions && auditions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-secondary/10">
                <tr>
                  <th className="px-4 py-4">Submission Date</th>
                  <th className="px-4 py-4">Talent Info</th>
                  <th className="px-4 py-4">Performance Link</th>
                  <th className="px-4 py-4">Details</th>
                  <th className="px-4 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {auditions.map((audition: any) => (
                  <tr key={audition.id} className="hover:bg-secondary/5 transition-colors group">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(audition.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold flex items-center gap-2 text-primary">
                          <User className="w-4 h-4" />
                          {audition.name}
                        </span>
                        <span className="text-muted-foreground text-xs flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {audition.location}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {audition.video_url ? (
                        <a 
                          href={audition.video_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary hover:text-gold transition-colors font-semibold"
                        >
                          <Video className="w-4 h-4" />
                          Watch Performance
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground/50 italic">No link</span>
                      )}
                    </td>
                    <td className="px-4 py-4 max-w-[300px]">
                      <div className="flex gap-2">
                        <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <p className="text-muted-foreground line-clamp-3" title={audition.details}>
                          {audition.details}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(audition.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-muted-foreground italic bg-secondary/5">
            No audition submissions found in the divine records.
          </div>
        )}
      </div>
    </div>
  );
}
