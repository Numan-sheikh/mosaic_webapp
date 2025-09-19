"use client";

import React, { FC } from 'react';
import Image from 'next/image';

const ExploreCollection: FC = () => {
  return (
    // The main section container layout is preserved
    <section className="relative w-full min-h-screen bg-black text-white flex items-start justify-start overflow-hidden p-8 md:p-16">
      
      {/* --- YOUR BLOB EFFECT CODE (RESTORED) --- */}
      <div className="absolute w-[14rem] h-[14rem] rounded-full bg-neutral-900/40 blur-[30px] animate-[blob_14s_ease-in-out_infinite] top-[5%] left-[8%]" />
      <div className="absolute w-[12rem] h-[12rem] rounded-full bg-zinc-800/30 blur-[20px] animate-[blob_16s_ease-in-out_infinite] [animation-delay:3s] top-[35%] left-[25%]" />
      <div className="absolute w-[16rem] h-[16rem] rounded-full bg-zinc-800/30 blur-[30px] animate-[blob_18s_ease-in-out_infinite] [animation-delay:6s] bottom-[10%] right-[12%]" />
      <div className="absolute w-[13rem] h-[13rem] rounded-full bg-neutral-900/30 blur-[25px] animate-[blob_15s_ease-in-out_infinite] [animation-delay:9s] bottom-[25%] right-[28%]" />
      
      {/* Content container is preserved */}
      <div className="relative z-10 w-full max-w-7xl">
        {/* Heading Block is preserved */}
        <div className="text-left w-full">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">
            Explore the Collection
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl">
            This mosaic is built on three pillars: the written word, the captured moment, and the shared reflection. Choose the path that calls to you below.
          </p>
        </div>
        
        {/* Pillars Container is preserved */}
        <div className="relative mt-24 h-[500px] w-full">

          {/* --- Pillar 1: Poem (Restructured for correct alignment) --- */}
          <div className="absolute top-[75%] left-[1%] -translate-y-1/2 flex items-center justify-start gap-2">
            <h3 className="text-2xl font-semibold tracking-widest text-gray-300 w-24 text-right shrink-0 mb-15 ">POEM</h3>
            <div className="relative w-30 h-48 shrink-0">
              <Image src="/gothic_eye 1.svg" alt="Poem illustration" layout="fill" className="rounded-full object-cover" />
            </div>
            <p className="mt-10 text-gray-400 max-w-[200px]">
              Verses that piece<br/><b/> together feelings,<br/><b/> stories, and<br/><b/> observations.
            </p>
          </div>

          {/* --- Pillar 2: Photos (Centered layout) --- */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            <h3 className="text-2xl font-semibold tracking-widest text-gray-300">PHOTOS</h3>
            <div className="relative w-52 h-32">
              <Image src="/pixel_cat 1.svg" alt="Photos illustration" layout="fill" className="rounded-full object-cover" />
            </div>
            <p className="ml-45 text-gray-400 max-w-xs text-left">
              Moments captured in<br/><b/> light, seeking the beauty<br/><b/> in the everyday.
            </p>
          </div>

          {/* --- Pillar 3: Reflection (Restructured for correct alignment) --- */}
          <div className="absolute bottom-[75%] right-[1%] -translate-y-1/2 flex items-center justify-end gap-2">
             <div className="text-right">
              <h3 className="text-2xl font-semibold tracking-widest text-gray-300">REFLECTION</h3>
              <p className="mt-2 text-gray-400 max-w-xs text-left">
                A curated collection of quotes <br/><b/>and verses that inspire and <br/><b/>resonate.
              </p>
            </div>
            <div className="relative w-30 h-48 shrink-0">
               <Image src="/anime_smoke 1.svg" alt="Reflection illustration" layout="fill" className="rounded-full object-cover" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExploreCollection;

