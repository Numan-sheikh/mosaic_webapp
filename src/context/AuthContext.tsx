"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, FC } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';
import LoginModal from '@/lib/components/auth/LoginModal';
import LogoutModal from '@/lib/components/auth/LogoutModal';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isLogoutModalOpen: boolean;
  openLogoutModal: () => void;
  closeLogoutModal: () => void;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  isAdmin: false,
  loading: true,
  isAuthModalOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
  isLogoutModalOpen: false,
  openLogoutModal: () => {},
  closeLogoutModal: () => {},
});

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  // --- RESTRUCTURED LOGIC ---

  // Effect 1: Handles only Firebase Authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Set loading to false once we know if a user is logged in or not
    });
    // Cleanup the auth listener on unmount
    return () => unsubscribe();
  }, []);

  // Effect 2: Handles only Firestore role checking, and runs ONLY when the user object changes
  useEffect(() => {
    // Condition 1: If there is no user, they cannot be an admin.
    if (!user) {
      setIsAdmin(false);
      return; // Stop here.
    }

    // Condition 2: If there is a user, set up a real-time listener for their document in Firestore.
    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      // Check if the user's document actually exists in the database.
      if (snapshot.exists()) {
        // If it exists, check the 'role' field.
        // This is the explicit condition for being an admin.
        if (snapshot.data().role === 'admin') {
          setIsAdmin(true);
        } else {
          // If the role is anything else ('user', undefined, etc.), they are not an admin.
          setIsAdmin(false);
        }
      } else {
        // If the document doesn't exist at all, they are not an admin.
        setIsAdmin(false);
      }
    });

    // Cleanup the Firestore listener when the user logs out (or the component unmounts)
    return () => unsubscribe();
  }, [user]); // This effect now correctly depends on the user object

  // --- END OF RESTRUCTURED LOGIC ---

  const value = { 
    user, 
    isAdmin, 
    loading, 
    isAuthModalOpen, 
    openAuthModal, 
    closeAuthModal,
    isLogoutModalOpen,
    openLogoutModal,
    closeLogoutModal
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <LoginModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
      <LogoutModal isOpen={isLogoutModalOpen} onClose={closeLogoutModal} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

