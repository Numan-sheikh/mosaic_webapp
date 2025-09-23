"use client";

import React, { FC, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { LogIn, LogOut, User as UserIcon, X } from 'lucide-react';
import { gsap } from 'gsap';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { user, loading } = useAuth();
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

  // --- UPDATED SIGN-IN HANDLER ---
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) { // Type the error as 'any' to access its properties
      // This is the fix: We check for specific, non-critical error codes.
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        // If the user closed the popup, we can log a simple message or do nothing.
        console.log("Sign-in process cancelled by user.");
      } else {
        // For all other, unexpected errors, we still log them as a critical error.
        console.error("An unexpected error occurred during sign-in:", error);
      }
    }
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

        {loading ? (
          <div>
            <p className="text-gray-500 animate-pulse">Checking status...</p>
          </div>
        ) : user ? (
          <div>
            <div className="flex items-center justify-center mb-4">
              <UserIcon className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">You're In!</h2>
            <p className="text-gray-500">Welcome back, {user.displayName}.</p>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center px-4 py-2 mt-6 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Join the Mosaic</h2>
            <p className="text-gray-500">Sign in or create an account to continue.</p>
            <button
              onClick={handleSignIn}
              className="w-full flex items-center justify-center px-4 py-2 mt-6 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign in with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;

