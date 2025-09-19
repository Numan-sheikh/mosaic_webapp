"use client";

import React, { FC } from 'react';
import Image from 'next/image';

// --- Reusable Testimonial Card Component ---
interface TestimonialCardProps {
  quote: string;
  name: string;
  description: string;
  avatarUrl: string;
}

const TestimonialCard: FC<TestimonialCardProps> = ({ quote, name, description, avatarUrl }) => {
  return (
    <div className="bg-white text-black p-6 rounded-2xl shadow-lg flex flex-col h-full">
      <p className="text-xl font-semibold">"{quote}"</p>
      <div className="mt-auto pt-4 flex items-center gap-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image src={avatarUrl} alt={name} layout="fill" className="object-cover" />
        </div>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};


// --- Main Section Component ---
const BecomePartOfMosaic: FC = () => {
  return (
    // Removed min-h-screen and simplified the flex layout
    <section className="relative w-full bg-black text-white flex flex-col items-center overflow-hidden p-8 md:p-16">
      
      {/* --- Blob Effect Code Added --- */}
      <div className="absolute w-[14rem] h-[14rem] rounded-full bg-neutral-900/40 blur-[30px] animate-[blob_14s_ease-in-out_infinite] top-[5%] left-[8%]" />
      <div className="absolute w-[12rem] h-[12rem] rounded-full bg-zinc-800/30 blur-[20px] animate-[blob_16s_ease-in-out_infinite] [animation-delay:3s] top-[35%] left-[25%]" />
      <div className="absolute w-[16rem] h-[16rem] rounded-full bg-zinc-800/30 blur-[30px] animate-[blob_18s_ease-in-out_infinite] [animation-delay:6s] bottom-[10%] right-[12%]" />
      <div className="absolute w-[13rem] h-[13rem] rounded-full bg-neutral-900/30 blur-[25px] animate-[blob_15s_ease-in-out_infinite] [animation-delay:9s] bottom-[25%] right-[28%]" />
      
      {/* A single container for all content, centered with max-width */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-12">
        {/* --- Heading Block --- */}
        <div className="text-left w-full">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">
            Become Part of the Mosaic
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl">
            You'll receive a short letter from me whenever new poems, photos, and reflections are added to the mosaic. No spam, just art delivered quietly to your inbox.
          </p>
        </div>

        {/* --- Testimonials Grid --- */}
        <div className="grid md:grid-cols-3 gap-8 w-full">
          <TestimonialCard 
            quote="A terrific piece of praise"
            name="Alex Johnson"
            description="Creative Director"
            avatarUrl="/pixel_cat 1.svg"
          />
          <TestimonialCard 
            quote="A fantastic bit of feedback"
            name="Samantha Lee"
            description="Lead Designer"
            avatarUrl="/pixel_cat 1.svg"
          />
          <TestimonialCard 
            quote="A genuinely glowing review"
            name="Michael Chen"
            description="Art Enthusiast"
            avatarUrl="/pixel_cat 1.svg"
          />
        </div>
      </div>

    </section>
  );
};

export default BecomePartOfMosaic;

