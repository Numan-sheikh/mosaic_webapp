"use client";

import React from "react";
import Beams from "./beam_bg/Beams";
import ProfileCard from "./profile_card/ProfileCard"; // Import the ProfileCard component

const BehindTheMosaic = () => {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Re-using the Beams background with a different rotation for variety */}
      <Beams
        beamWidth={2}
        beamHeight={30}
        beamNumber={10}
        lightColor="#ffffff"
        speed={0.15}
        noiseIntensity={0.6}
        scale={0.15}
        rotation={-25}
      />

      {/* Content Overlay - Now it just holds the ProfileCard */}
      <div className="relative z-10 p-4">
        <ProfileCard
          name="Numan M. Sheikh"
          title="Software Engineer"
          handle="numan__sheikh"
          status="Online"
          contactText="Contact Me"
          // Using a placeholder for the avatar image
          avatarUrl="/images/numan_pfp-removebg-preview.png"
          iconUrl="/images/numan_pfp_with_glasses.jpg"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
        />
      </div>
    </section>
  );
};

export default BehindTheMosaic;

