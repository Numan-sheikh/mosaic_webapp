"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, FC } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';
import LoginModal from '@/lib/components/auth/LoginModal'; // Corrected path
import LogoutModal from '@/lib/components/auth/LogoutModal'; // Corrected path

// --- NEW: Define the possible user roles ---
export type UserRole = 'user' | 'editor' | 'subadmin' | 'admin' | 'superadmin';

interface AuthContextType {
  user: User | null;
  userRole: UserRole | null; // Changed from isAdmin to userRole
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
  userRole: null, // Default to null
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
  const [userRole, setUserRole] = useState<UserRole | null>(null); // State for the user's role
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  // Effect 1: Handles only Firebase Authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      // We set loading to false in the second effect now
    });
    return () => unsubscribe();
  }, []);

  // Effect 2: Handles only Firestore role checking
  useEffect(() => {
    if (!user) {
      setUserRole(null);
      setLoading(false);
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      if (snapshot.exists()) {
        // Read the role from the document and set it
        setUserRole(snapshot.data().role as UserRole);
      } else {
        // If no document exists, they are a standard user
        setUserRole('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]); // This effect now correctly depends on the user object

  const value = { 
    user, 
    userRole, 
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

