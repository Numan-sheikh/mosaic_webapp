"use client";

import React, { FC, useState, useRef, useEffect } from 'react';
import Masonry, { Item } from './Masonry'; // Import Masonry and its Item type
import { db } from '@/lib/firebase/config'; // Import your Firestore instance
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

// --- Simplified Tab Definition ---
interface Tab {
  id: 'Poem' | 'Reflection' | 'Photo'; // Use exact category names
  label: string;
}
const tabs: Tab[] = [
  { id: 'Poem', label: 'Poem' },
  { id: 'Reflection', label: 'Reflection' },
  { id: 'Photo', label: 'Photos' }, // Label can be different
];

// --- Main Component ---
const TabViewSection: FC = () => {
  const [activeTab, setActiveTab] = useState<Tab['id']>('Photo');
  const [gridItems, setGridItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true); // --- NEW: Loading state ---
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  // --- NEW: This effect fetches live data from Firestore ---
  useEffect(() => {
    setLoading(true); // Start loading when the tab changes

    // Create a query to get posts that match the active category, ordered by creation date
    const postsQuery = query(
      collection(db, "posts"), 
      where("category", "==", activeTab),
      orderBy("createdAt", "desc")
    );

    // onSnapshot creates a real-time listener
    const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
      const itemsFromFirestore: Item[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Transform Firestore data into the 'Item' format for the Masonry component
        itemsFromFirestore.push({
          id: doc.id,
          img: data.imageUrl,
          url: `/posts/${doc.id}`, // Link to the dynamic post page
          height: 800, // You can make this dynamic if you store image dimensions
        });
      });
      setGridItems(itemsFromFirestore);
      setLoading(false); // Stop loading once data is fetched
    }, (error) => {
      console.error("Error fetching posts: ", error);
      setLoading(false); // Stop loading even if there's an error
    });

    // Clean up the listener when the component unmounts or the tab changes
    return () => unsubscribe();
  }, [activeTab]); // Rerun this effect whenever the activeTab changes


  useEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
    const activeTabRef = tabRefs.current[activeIndex];
    if (activeTabRef) {
      setIndicatorStyle({
        left: activeTabRef.offsetLeft,
        width: activeTabRef.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <section className="bg-white w-full py-12 md:py-20 flex justify-center">
      <div className="w-full max-w-5xl px-4">
        {/* Tab Navigation Bar */}
        <div className="relative bg-gray-200 rounded-full p-2 flex items-center justify-around max-w-md mx-auto">
          <div
            className="absolute top-2 h-[calc(100%-1rem)] bg-white rounded-full shadow-md transition-all duration-300 ease-in-out"
            style={indicatorStyle}
          />
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[index] = el; }}
              onClick={() => setActiveTab(tab.id)}
              className={`relative z-10 w-full py-2 px-4 rounded-full text-center font-semibold transition-colors duration-300 ${
                activeTab === tab.id ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* --- Tab Content --- */}
        <div className="mt-12 min-h-[500px]">
          {loading ? (
            <div className="flex justify-center items-center h-full pt-20">
              <Loader2 className="w-10 h-10 text-gray-400 animate-spin" />
            </div>
          ) : (
            <Masonry items={gridItems} animateFrom="bottom" />
          )}
        </div>
      </div>
    </section>
  );
};

export default TabViewSection;

