import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventsManager from '@/components/admin/EventsManager';
import CharactersManager from '@/components/admin/CharactersManager';
import GalleryManager from '@/components/admin/GalleryManager';
import BookingsManager from '@/components/admin/BookingsManager';
import AuditionsManager from '@/components/admin/AuditionsManager';
import ReviewsManager from '@/components/admin/ReviewsManager';

export default function AdminDashboard() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background text-primary">
      <header className="border-b border-primary/10 bg-card px-4 py-3 flex items-center justify-between">
        <h1 className="font-heading text-xl text-devi-gradient uppercase tracking-widest">Shakti Leela Admin</h1>
        <div className="flex items-center gap-3">
          <span className="text-primary/60 text-sm font-medium">{user.email}</span>
          <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5 text-primary" onClick={() => { signOut(); navigate('/'); }}>
            Sign Out
          </Button>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="bookings">
          <TabsList className="mb-6 flex flex-wrap h-auto bg-primary/5 p-1">
            <TabsTrigger value="bookings" className="data-[state=active]:bg-primary data-[state=active]:text-white">Bookings</TabsTrigger>
            <TabsTrigger value="auditions" className="data-[state=active]:bg-primary data-[state=active]:text-white">Auditions</TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-white">Reviews</TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-primary data-[state=active]:text-white">Events</TabsTrigger>
            <TabsTrigger value="characters" className="data-[state=active]:bg-primary data-[state=active]:text-white">Characters</TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-primary data-[state=active]:text-white">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings"><BookingsManager /></TabsContent>
          <TabsContent value="auditions"><AuditionsManager /></TabsContent>
          <TabsContent value="reviews"><ReviewsManager /></TabsContent>
          <TabsContent value="events"><EventsManager /></TabsContent>
          <TabsContent value="characters"><CharactersManager /></TabsContent>
          <TabsContent value="gallery"><GalleryManager /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
