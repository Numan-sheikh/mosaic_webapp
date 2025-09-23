// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// --- 1. Import your Auth components ---
import AuthProvider from "@/context/AuthContext";
import AuthModalHandler from "@/lib/components/auth/AuthModalHandler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", 
});

export const metadata: Metadata = {
  title: "Mosaic",
  description: "A Collection of Poems, Photos, and Reflections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        {/* 2. Wrap your application with the AuthProvider */}
        <AuthProvider>
          {children}
          
          {/* 3. Add the AuthModalHandler here */}
          {/* This component will now safely render the modal when needed */}
          <AuthModalHandler />
        </AuthProvider>
      </body>
    </html>
  );
}

