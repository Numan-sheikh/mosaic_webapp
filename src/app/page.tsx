import HeroSection from "@/lib/components/landing/hero_section";
import Navbar from "@/lib/components/landing/navbar/navbar";
import BehindTheMosaic from "@/lib/components/landing/BehindTheMosaic";
import ExploreCollection from "@/lib/components/landing/Explore_Collection";
import BecomePartOfMosaic from "@/lib/components/landing/Become_Part_of_Mosaic";
import Footer from "@/lib/components/landing/Footer";

// --- Main Page Component ---

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BehindTheMosaic/>
      <ExploreCollection/>
      <BecomePartOfMosaic/>
      <Footer />
    </>
  );
}

