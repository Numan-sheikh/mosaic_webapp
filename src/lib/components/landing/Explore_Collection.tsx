"use client";

import React, { FC } from 'react';
import Image from 'next/image';

const ExploreCollection: FC = () => {
  return (
    // The main section container layout is preserved
    <section className="relative w-full min-h-screen bg-black text-white flex items-start justify-start overflow-hidden p-8 md:p-16">
      
      {/* --- YOUR BLOB EFFECT CODE --- */}
      <div className="absolute w-[14rem] h-[14rem] rounded-full bg-neutral-900/40 blur-[30px] animate-[blob_14s_ease-in-out_infinite] top-[5%] left-[8%]" />
      <div className="absolute w-[12rem] h-[12rem] rounded-full bg-zinc-800/30 blur-[20px] animate-[blob_16s_ease-in-out_infinite] [animation-delay:3s] top-[35%] left-[25%]" />
      <div className="absolute w-[16rem] h-[16rem] rounded-full bg-zinc-800/30 blur-[30px] animate-[blob_18s_ease-in-out_infinite] [animation-delay:6s] bottom-[10%] right-[12%]" />
      <div className="absolute w-[13rem] h-[13rem] rounded-full bg-neutral-900/30 blur-[25px] animate-[blob_15s_ease-in-out_infinite] [animation-delay:9s] bottom-[25%] right-[28%]" />
      
      {/* Content container */}
      <div className="relative z-10 w-full max-w-7xl">
        {/* Heading Block  */}
        <div className="text-left w-full">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">
            Explore the Collection
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl">
            This mosaic is built on three pillars: the written word, the captured moment, and the shared reflection. Choose the path that calls to you below.
          </p>
        </div>
        
        {/* Pillars Container  */}
        <div className="relative mt-24 h-[500px] w-full">

          {/* --- Pillar 1: Poem */}
          <div className="absolute top-[75%] left-[1%] -translate-y-1/2 flex items-center justify-start gap-2">
            <h3 className="text-2xl font-semibold tracking-widest text-gray-300 w-24 text-right shrink-0 mb-15 ">POEM</h3>
            <div className="relative w-30 h-48 shrink-0">
              <Image src="/gothic_eye 1.svg" alt="Poem illustration" layout="fill" className="rounded-full object-cover" />
            </div>
            <p className="mt-10 text-gray-400 max-w-[200px]">
              Verses that piece<br/><b></b> together feelings,<br/><b></b> stories, and<br/><b></b> observations.
            </p>
          </div>

          {/* --- Pillar 2: Photos  */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            <h3 className="text-2xl font-semibold tracking-widest text-gray-300">PHOTOS</h3>
            <div className="relative w-52 h-32">
              <Image src="/pixel_cat 1.svg" alt="Photos illustration" layout="fill" className="rounded-full object-cover" />
            </div>
            <p className="ml-45 text-gray-400 max-w-xs text-left">
              Moments captured in<br/><b></b> light, seeking the beauty<br/><b></b> in the everyday.
            </p>
          </div>

          {/* --- Pillar 3: Reflection (Updated for precise text placement) --- */}
          <div className="absolute bottom-[50%] right-[5%] -translate-y-1/2 flex items-center justify-end gap-2">
            {/* Wrapper for H3 for independent control */}
            <div>
                <h3 className="mr-8 text-2xl font-semibold tracking-widest text-gray-300 w-30 text-left shrink-0 mb-15">REFLECTION</h3>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-30 h-48 shrink-0">
                   <Image src="/anime_smoke 1.svg" alt="Reflection illustration" layout="fill" className="rounded-full object-cover" />
              </div>
              {/* Changed ml-8 to translate-x-8 for precise visual shifting */}
              <div className="translate-x-18">
                  <p className="text-gray-400 max-w-xs text-left">
                    A curated collection<br/><b></b> of quotes and verses<br/><b></b> that inspire and <br/><b></b>resonate.
                  </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExploreCollection;

