"use client";

import React, { FC, useState, useRef, useEffect } from 'react';
import Masonry, { Item } from './Masonry'; // Import the Masonry component and its Item type

// --- Mock Data for Each Tab (Updated with dynamic URLs) ---
const poemItems: Item[] = [
  { id: 'p1', img: 'https://placehold.co/500x700/a3e635/171717?text=Poem+1', url: '/posts/p1', height: 700 },
  { id: 'p2', img: 'https://placehold.co/500x500/a3e635/171717?text=Poem+2', url: '/posts/p2', height: 500 },
  { id: 'p3', img: 'https://placehold.co/500x800/a3e635/171717?text=Poem+3', url: '/posts/p3', height: 800 },
  { id: 'p4', img: 'https://placehold.co/500x600/a3e635/171717?text=Poem+4', url: '/posts/p4', height: 600 },
];
const reflectionItems: Item[] = [
  { id: 'r1', img: 'https://placehold.co/500x650/f87171/171717?text=Reflection+1', url: '/posts/r1', height: 650 },
  { id: 'r2', img: 'https://placehold.co/500x550/f87171/171717?text=Reflection+2', url: '/posts/r2', height: 550 },
  { id: 'r3', img: 'https://placehold.co/500x750/f87171/171717?text=Reflection+3', url: '/posts/r3', height: 750 },
];
const photoItems: Item[] = [
  { id: 'ph1', img: 'https://placehold.co/500x800/60a5fa/171717?text=Photo+1', url: '/posts/ph1', height: 800 },
  { id: 'ph2', img: 'https://placehold.co/500x600/60a5fa/171717?text=Photo+2', url: '/posts/ph2', height: 600 },
  { id: 'ph3', img: 'https://placehold.co/500x700/60a5fa/171717?text=Photo+3', url: '/posts/ph3', height: 700 },
  { id: 'ph4', img: 'https://placehold.co/500x500/60a5fa/171717?text=Photo+4', url: '/posts/ph4', height: 500 },
  { id: 'ph5', img: 'https://placehold.co/500x900/60a5fa/171717?text=Photo+5', url: '/posts/ph5', height: 900 },
];


// --- Simplified Tab Definition ---
interface Tab {
  id: string;
  label: string;
}
const tabs: Tab[] = [
  { id: 'poem', label: 'Poem' },
  { id: 'reflection', label: 'Reflection' },
  { id: 'photos', label: 'Photos' },
];

// --- Main Component ---
const TabViewSection: FC = () => {
  const [activeTab, setActiveTab] = useState<string>(tabs[2].id);
  const [gridItems, setGridItems] = useState<Item[]>(photoItems); // Start with photos
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  // This effect simulates fetching new data when the active tab changes
  useEffect(() => {
    // A small timeout to simulate a network request
    const timer = setTimeout(() => {
      switch (activeTab) {
        case 'poem':
          setGridItems(poemItems);
          break;
        case 'reflection':
          setGridItems(reflectionItems);
          break;
        case 'photos':
          setGridItems(photoItems);
          break;
        default:
          setGridItems([]);
      }
    }, 300); // 300ms delay for a smooth transition feel

    return () => clearTimeout(timer);
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
        {/* --- Tab Navigation Bar (No changes needed) --- */}
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
        <div className="mt-12">
          <Masonry items={gridItems} animateFrom="bottom" />
        </div>
      </div>
    </section>
  );
};

export default TabViewSection;

