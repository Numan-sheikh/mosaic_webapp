"use client";

import React, { FC } from 'react';
import { Facebook, Linkedin, Youtube, Instagram } from 'lucide-react';

const Footer: FC = () => {
  return (
    <footer className="w-full bg-white text-black border-t border-gray-200 py-12 px-8 md:px-16">
      <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        
        {/* --- Left Column --- */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold">Mosaic.</h2>
          </div>
          <div className="mt-8 md:mt-0">
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-black">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-black">
                <Linkedin size={20} />
              </a>
              <a href="#" aria-label="YouTube" className="text-gray-500 hover:text-black">
                <Youtube size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-black">
                <Instagram size={20} />
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              © 2025 Numan | All Rights Reserved.
            </p>
          </div>
        </div>

        {/* --- Right Column (Link Grid) --- */}
        <div className="grid grid-cols-3 gap-8">
          {/* Link Column 1 */}
          <div>
            <h3 className="font-semibold mb-4">Mosaic</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-black">Home</a></li>
              <li><a href="#" className="text-gray-500 hover:text-black">Contact</a></li>
              <li><a href="#" className="text-gray-500 hover:text-black">Menu</a></li>
            </ul>
          </div>
          {/* Link Column 2 */}
          <div>
            <h3 className="font-semibold mb-4">Poems</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-black">Hope is Next Door</a></li>
              <li><a href="#" className="text-gray-500 hover:text-black">Silence</a></li>
              <li><a href="#" className="text-gray-500 hover:text-black">Reflections</a></li>
            </ul>
          </div>
          {/* Link Column 3 */}
          <div>
            <h3 className="font-semibold mb-4">Photos</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-black">Outdoor</a></li>
              <li><a href="#" className="text-gray-500 hover:text-black">Found</a></li>
              <li><a href="#" className="text-gray-500 hover:text-black">Taken</a></li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
