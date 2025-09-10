"use client";

import React from "react";
// We are now using the standard <img> tag, so the 'next/image' import is not strictly needed but can be left.
import Image from "next/image"; 
// The Navbar is no longer imported or used here.
import Beams from "../landing/beam_bg/Beams";

// An array of the image paths, reordered to match your desired layout.
const images = [
  // Top Row
  { src: "/willo_tree 1.svg", alt: "A willow tree by the water", w: 113, h: 150 },
  { src: "/girl_in_red 1.svg", alt: "An illustration of a girl in red", w: 84, h: 150 },
  { src: "/Digital_horror1 1.svg", alt: "Digital horror art", w: 113, h: 150 },
  // Bottom Row
  { src: "/black_cat_wiggly 1.svg", alt: "An illustration of a black cat", w: 113, h: 150 },
  { src: "/ESOSM 1.svg", alt: "Abstract art piece", w: 84, h: 150 },
  { src: "/metro_seat_01 1.svg", alt: "An empty seat on a metro train", w: 113, h: 150 },
];

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background remains */}
      <Beams
        beamWidth={2}
        beamHeight={25}
        beamNumber={12}
        lightColor="#ffffff"
        speed={2}
        noiseIntensity={1.5}
        scale={0.15}
        rotation={25}
      />
      {/* The <Navbar /> component has been removed from this file. */}

      {/* Main Content Area */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center text-white px-4 md:px-6">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col gap-5 text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
              Mosaic: A Collection of Poems, Photos, and Reflections.
            </h1>
            <p className="max-w-md text-lg text-gray-300">
              A quiet space where scattered moments are pieced together into
              art. I hope you find a moment of peace and a piece of yourself
              here.
            </p>
          </div>

          {/* Right Column: Manually structured 2x3 grid */}
          <div className="flex flex-col items-center justify-center gap-3 md:gap-4">
            {/* --- Top Row --- */}
            <div className="flex items-center justify-center gap-3 md:gap-4">
              {images.slice(0, 3).map((image) => (
                <div
                  key={image.src}
                  className="relative shrink-0" // shrink-0 prevents flex items from shrinking
                  style={{
                    width: `${image.w}px`,
                    height: `${image.h}px`,
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full rounded-2xl object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
            {/* --- Bottom Row --- */}
            <div className="flex items-center justify-center gap-3 md:gap-4">
              {images.slice(3, 6).map((image) => (
                <div
                  key={image.src}
                  className="relative shrink-0"
                  style={{
                    width: `${image.w}px`,
                    height: `${image.h}px`,
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full rounded-2xl object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;

