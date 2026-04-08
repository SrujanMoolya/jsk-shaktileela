import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ShowsSection from '@/components/ShowsSection';
import BookingSection from '@/components/BookingSection';
import GallerySection from '@/components/GallerySection';
import HighlightsSection from '@/components/HighlightsSection';
import MissionSection from '@/components/MissionSection';
import InviteSection from '@/components/InviteSection';
import FooterSection from '@/components/FooterSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ShowsSection />
      <HighlightsSection />
      <GallerySection />
      <BookingSection />
      <MissionSection />
      <InviteSection />
      <FooterSection />
    </div>
  );
};

export default Index;
