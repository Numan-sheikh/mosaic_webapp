"use client";

import React, { FC, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { LogOut, User as UserIcon, X } from 'lucide-react';
import { gsap } from 'gsap';
import Image from 'next/image';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal: FC<LogoutModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.3 });
      gsap.to(modalRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(modalRef.current, { 
      opacity: 0, 
      y: -20, 
      scale: 0.95, 
      duration: 0.2, 
      ease: 'power2.in' 
    });
    gsap.to(backdropRef.current, { 
      opacity: 0, 
      duration: 0.2, 
      onComplete: onClose 
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      handleClose(); 
    } catch (error) {
      console.error("Error signing out", error);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div 
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-opacity-60 backdrop-blur-sm opacity-0"
      onClick={handleClose}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg text-center opacity-0 transform -translate-y-5 scale-95"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {user && (
          <div>
            <div className="flex justify-center mb-4">
              <Image 
                src={user.photoURL || 'https://placehold.co/64x64'} 
                alt={user.displayName || 'User'}
                width={64}
                height={64}
                className="rounded-full"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Sign Out</h2>
            <p className="text-gray-500">Are you sure you want to hop off?</p>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleClose}
                className="w-full px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Confirm Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoutModal;
