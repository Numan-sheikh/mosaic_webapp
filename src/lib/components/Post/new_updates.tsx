"use client";

import React, { FC, useState, useEffect } from 'react';
// The Next.js Image component is no longer needed here
import { ArrowLeft, ArrowRight } from 'lucide-react';

// --- TypeScript Type Definition for a single card ---
interface UpdateCardProps {
  heading: string;
  subheading: string;
  imageUrl: string;
}

// --- Placeholder Data ---
const updates: UpdateCardProps[] = [
  {
    heading: "The Willow's Secret",
    subheading: "A poem on nature and time.",
    imageUrl: "/images/willo_tree.jpg",
  },
  {
    heading: "City Corner",
    subheading: "Finding beauty in urban decay.",
    imageUrl: "/images/Redfort Old delhi.jpeg",
  },
  {
    heading: "On Reflection",
    subheading: "A short essay on introspection.",
    imageUrl: "/images/atonement .jpeg" ,
  },
    {
    heading: "Fourth Update",
    subheading: "Another interesting topic.",
    imageUrl: "/images/cairo.jpeg",
  },
];

// --- Main Component ---
const NewUpdates: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? updates.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === updates.length - 1 ? 0 : prevIndex + 1));
  };

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Change card every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount or when activeIndex changes
  }, [activeIndex]);


  return (
    <section className="bg-white w-full pt-20 md:pt-28 pb-12 md:pb-20 overflow-hidden">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">New Updates</h2>
        
        {/* Wider container with relative positioning for buttons */}
        <div className="relative flex items-center justify-center w-full max-w-6xl">
          
          {/* --- Left Arrow Button (Absolutely Positioned) --- */}
          <button 
            onClick={handlePrev} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            aria-label="Previous update"
          >
            <ArrowLeft size={24} />
          </button>

          {/* --- Cards Container --- */}
          {/* This container defines the 3D space and allows side cards to be visible */}
          <div className="relative w-[32rem] h-96" style={{ perspective: '1000px' }}>
            {updates.map((card, index) => {
              const totalItems = updates.length;
              let offset = index - activeIndex;

              // This is the new logic for circular swiping
              if (offset < -totalItems / 2) {
                offset += totalItems;
              } else if (offset > totalItems / 2) {
                offset -= totalItems;
              }
              
              // Determine the style based on the card's position relative to the active index
              let style = {
                transform: `translateX(${offset * 100}%) scale(0.7) rotateY(${offset > 0 ? -45 : 45}deg)`,
                opacity: '0',
                zIndex: totalItems - Math.abs(offset),
                filter: 'blur(10px)',
              };

              if (offset === 0) {
                // Active card (center)
                style = {
                  transform: 'translateX(0) scale(1)',
                  opacity: '1',
                  zIndex: totalItems,
                  filter: 'blur(0px)',
                };
              } else if (offset === -1) {
                // Previous card (left)
                 style = {
                  transform: 'translateX(-60%) scale(0.85) rotateY(45deg)',
                  opacity: '0.5',
                  zIndex: totalItems - 1,
                  filter: 'blur(4px)',
                };
              } else if (offset === 1) {
                // Next card (right)
                style = {
                  transform: 'translateX(60%) scale(0.85) rotateY(-45deg)',
                  opacity: '0.5',
                  zIndex: totalItems - 1,
                  filter: 'blur(4px)',
                };
              }
              
              return (
                <div 
                  key={index} 
                  className="absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out"
                  style={{...style, transformStyle: 'preserve-3d'}}
                >
                  <div className="bg-gray-100 rounded-3xl p-6 shadow-xl w-full h-full flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800">{card.heading}</h3>
                    {/* --- THE FIX --- */}
                    <div className="relative my-4 flex-grow rounded-xl overflow-hidden flex items-center justify-center">
                      <img 
                        src={card.imageUrl} 
                        alt={card.heading} 
                        className="max-h-full max-w-full object-contain rounded-xl" 
                      />
                    </div>
                    <p className="text-gray-600">{card.subheading}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* --- Right Arrow Button (Absolutely Positioned) --- */}
          <button 
            onClick={handleNext} 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            aria-label="Next update"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewUpdates;

