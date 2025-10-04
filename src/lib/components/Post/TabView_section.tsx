"use client";

import React, { FC, useState, useRef, useEffect } from 'react';
import Masonry, { Item } from './Masonry';
import { db } from '@/lib/firebase/config';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { Loader2, FolderOpen } from 'lucide-react';

// --- THE FIX: The 'id' values now match the case-sensitive category names from your dashboard ---
interface Tab {
  id: 'Poem' | 'Reflection' | 'Photo';
  label: string;
}
const tabs: Tab[] = [
  { id: 'Poem', label: 'Poem' },
  { id: 'Reflection', label: 'Reflection' },
  { id: 'Photo', label: 'Photos' },
];
// --- END OF FIX ---

// --- Main Component ---
const TabViewSection: FC = () => {
  const [activeTab, setActiveTab] = useState<Tab['id']>('Photo');
  const [gridItems, setGridItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    setLoading(true);
    const postsQuery = query(
      collection(db, "posts"), 
      where("category", "==", activeTab),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
      const itemsFromFirestore: Item[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        itemsFromFirestore.push({
          id: doc.id,
          img: data.imageUrl,
          url: `/posts/${doc.id}`,
          height: 800,
        });
      });
      setGridItems(itemsFromFirestore);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching posts: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [activeTab]);


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
        {/* --- Tab Navigation Bar --- */}
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
          ) : gridItems.length > 0 ? (
            <Masonry items={gridItems} animateFrom="bottom" />
          ) : (
            <div className="flex flex-col items-center justify-center h-full pt-20 text-center">
              <FolderOpen className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-2xl font-bold text-gray-700">Nothing Here Yet</h3>
              <p className="text-gray-500 mt-2">Posts in the "{activeTab}" category will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TabViewSection;

