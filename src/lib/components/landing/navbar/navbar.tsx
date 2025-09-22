"use client";

import React, { FC } from 'react';
import CardNav, { CardNavItem } from './CardNav';

const Navbar: FC = () => {
  // Add the CardNavItem[] type to the items array
  const items: CardNavItem[] = [
    {
      label: "About",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "About", href: "#", ariaLabel: "About Page" },
        { label: "Contact", href: "#", ariaLabel: "Contact Me" },
        { label: "Careers", href: "#", ariaLabel: "About Careers" },
      ]
    },
    {
      label: "Pages",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Home", href: "/", ariaLabel: "Home Page" },
        { label: "Post", href: "/post_page", ariaLabel: "Post Page" },
        { label: "Blog", href: "#", ariaLabel: "Blog Page" },
      ]
    },
    {
      label: "Posts",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "PHOTOS", href: "#", ariaLabel: "PHOTOS Page" },
        { label: "POEM", href: "#", ariaLabel: "POEM Page" },
        { label: "REFLECTION", href: "#", ariaLabel: "REFLECTION Page" },
      ]
    }
  ];

  return (
    <CardNav
      logo="Mosaic" // Reverted to the simpler text logo
      logoAlt="Mosaic Logo"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
      // The ctaText prop is not used here, so the button will show its default "Get Started"
    />
  );
};

export default Navbar;
