"use client";

import React, { FC } from "react";

const ExploreCollection: FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#141414] text-white flex items-start justify-start overflow-hidden p-8 md:p-16">
      {/* 🔹 Smaller, refined blobs for premium organic feel */}
      <div className="absolute w-[14rem] h-[14rem] rounded-full bg-neutral-900/40 blur-[30px] animate-[blob_14s_ease-in-out_infinite] top-[5%] left-[8%]" />
      <div className="absolute w-[12rem] h-[12rem] rounded-full bg-zinc-800/30 blur-[20px] animate-[blob_16s_ease-in-out_infinite] [animation-delay:3s] top-[35%] left-[25%]" />
      <div className="absolute w-[16rem] h-[16rem] rounded-full bg-zinc-800/30 blur-[30px] animate-[blob_18s_ease-in-out_infinite] [animation-delay:6s] bottom-[10%] right-[12%]" />
      <div className="absolute w-[13rem] h-[13rem] rounded-full bg-neutral-900/30 blur-[25px] animate-[blob_15s_ease-in-out_infinite] [animation-delay:9s] bottom-[25%] right-[28%]" />

      {/* Content container */}
      <div className="relative z-10 w-full max-w-7xl">
        <div className="text-left w-full">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">
            Explore the Collection
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl">
            This mosaic is built on three pillars: the written word, the
            captured moment, and the shared reflection. Choose the path that
            calls to you below.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExploreCollection;
