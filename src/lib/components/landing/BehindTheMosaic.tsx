"use client";

import React, { FC } from "react";
import Image from "next/image"; // Import the Next.js Image component
import Beams from "./beam_bg/Beams";
import ProfileCard from "./profile_card/ProfileCard";
import Carousel from "./Carousel";
import PixelCard from "./PixelCard";
import { Zap, Code } from "lucide-react";

const BehindTheMosaic: FC = () => {
  return (
    // The main section now just centers the content block
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center p-6 md:p-16">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <Beams
          beamWidth={2}
          beamHeight={25}
          beamNumber={12}
          lightColor="#f1a3a3ff"
          speed={2}
          noiseIntensity={1.5}
          scale={0.15}
          rotation={25}
        />
      </div>
      
      {/* A vertical container to stack the heading and the two-column layout */}
      <div className="relative z-10 flex flex-col w-full max-w-7xl gap-12">
        
        {/* --- Heading Block --- */}
        <div className="text-left w-full">
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tighter">
            Behind the Mosaic
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl">
            This is a space for slowing down, for finding meaning in scattered
            moments, and for creating something whole from the pieces life
            offers.
          </p>
        </div>

        {/* --- Two-Column Layout --- */}
        <div className="flex flex-col md:flex-row items-start justify-start gap-12 w-full">
          {/* --- Left Column: Profile Card --- */}
          <div className="flex justify-center md:justify-start w-full md:w-1/2">
            <ProfileCard
              name="Numan M. Sheikh"
              title="Software Engineer"
              handle="numan__sheikh"
              status="Online"
              contactUrl="https://www.instagram.com/numan__sheikh/?hl=en"
              avatarUrl="/images/numan_pfp-removebg-preview.png"
              iconUrl="/images/numan_pfp_with_glasses.jpg"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log("Contact clicked")}
            />
          </div>

          {/* --- Right Column: Interactive Grid (Container size changed) --- */}
          <div className="w-full md:w-1/2 max-w-md flex flex-col gap-6">
            {/* Group 1: Carousels */}
            <div className="grid grid-cols-2 gap-6 w-full">
              <div className="aspect-square rounded-2xl">
                <Carousel autoplay loop />
              </div>
              <div className="aspect-square rounded-2xl">
                <Carousel autoplay loop autoplayDelay={4000} />
              </div>
            </div>

            {/* Group 2: Pixel Cards with Images */}
            <div className="grid grid-cols-2 gap-6 w-full">
              {/* Card 1: Image in PixelCard */}
              <div className="aspect-square relative rounded-2xl">
                <PixelCard variant="yellow">
                  <Image 
                    src="/images/white_homan.jpeg" 
                    alt="A person in white clothing" 
                    fill 
                    className="object-cover rounded-2xl" 
                  />
                </PixelCard>
              </div>
              {/* Card 2: Image in PixelCard */}
              <div className="aspect-square relative rounded-2xl">
                <PixelCard variant="blue">
                   <Image 
                    src="/images/duck_cig.jpeg" 
                    alt="A duck with a cigarette" 
                    fill 
                    className="object-cover rounded-2xl" 
                  />
                </PixelCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BehindTheMosaic;

