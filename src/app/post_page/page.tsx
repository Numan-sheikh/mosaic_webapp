import Navbar from '@/lib/components/landing/navbar/navbar';
import NewUpdates from '@/lib/components/Post/new_updates';
import Footer from '@/lib/components/landing/Footer';
import TabViewSection from '@/lib/components/Post/TabView_section';


// --- Main Page Component ---

export default function Home() {
  return (
    <>
      <Navbar />
      <NewUpdates/>
      <TabViewSection/>
      <Footer />
    </>
  );
}