import HeroSection from "@/lib/components/landing/hero_section";
import Navbar from "@/lib/components/landing/navbar/navbar";
import BehindTheMosaic from "@/lib/components/landing/BehindTheMosaic";
import ExploreCollection from "@/lib/components/landing/Explore_Collection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BehindTheMosaic/>
      <ExploreCollection/>
    </>
  );
}

