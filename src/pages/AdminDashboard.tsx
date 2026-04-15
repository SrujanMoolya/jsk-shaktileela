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
      <header className="border-b border-primary/10 bg-card px-4 py-3 sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <h1 className="font-heading text-lg md:text-xl text-devi-gradient uppercase tracking-widest text-center sm:text-left">Shakti Leela Admin</h1>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-primary/5">
            <span className="text-primary/60 text-xs md:text-sm font-medium truncate max-w-[150px] md:max-w-none">{user.email}</span>
            <Button variant="outline" size="sm" className="h-8 px-2 md:px-3 border-primary/20 hover:bg-primary/5 text-primary text-xs" onClick={() => { signOut(); navigate('/'); }}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-2 md:px-4 py-4 md:py-8">
        <Tabs defaultValue="bookings" className="w-full">
          <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
            <TabsList className="inline-flex w-auto min-w-full bg-primary/5 p-1 mb-2 whitespace-nowrap">
              <TabsTrigger value="bookings" className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white text-xs md:text-sm">Bookings</TabsTrigger>
              <TabsTrigger value="auditions" className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white text-xs md:text-sm">Auditions</TabsTrigger>
              <TabsTrigger value="reviews" className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white text-xs md:text-sm">Reviews</TabsTrigger>
              <TabsTrigger value="events" className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white text-xs md:text-sm">Events</TabsTrigger>
              <TabsTrigger value="characters" className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white text-xs md:text-sm">Characters</TabsTrigger>
              <TabsTrigger value="gallery" className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white text-xs md:text-sm">Gallery</TabsTrigger>
            </TabsList>
          </div>

          <div className="mt-4 md:mt-6">
            <TabsContent value="bookings" className="m-0 focus-visible:outline-none"><BookingsManager /></TabsContent>
            <TabsContent value="auditions" className="m-0 focus-visible:outline-none"><AuditionsManager /></TabsContent>
            <TabsContent value="reviews" className="m-0 focus-visible:outline-none"><ReviewsManager /></TabsContent>
            <TabsContent value="events" className="m-0 focus-visible:outline-none"><EventsManager /></TabsContent>
            <TabsContent value="characters" className="m-0 focus-visible:outline-none"><CharactersManager /></TabsContent>
            <TabsContent value="gallery" className="m-0 focus-visible:outline-none"><GalleryManager /></TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
