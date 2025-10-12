"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, FC } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { onUserRoleChange } from '@/lib/firebase/firestore'; // 1. Import the new service function
import LoginModal from '@/lib/components/auth/LoginModal';       // Corrected path
import LogoutModal from '@/lib/components/auth/LogoutModal';     // Corrected path

// (Interfaces and createContext remain the same)
export type UserRole = 'user' | 'editor' | 'subadmin' | 'admin' | 'superadmin';

interface AuthContextType {
  user: User | null;
  userRole: UserRole | null;
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
  userRole: null,
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
  const [userRole, setUserRole] = useState<UserRole | null>(null);
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
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Effect 2: Handles only Firestore role checking
  useEffect(() => {
    if (!user) {
      setUserRole(null);
      return;
    }

    // 2. Use the new service function to listen for role changes.
    // The complex Firestore logic is now neatly abstracted away.
    const unsubscribe = onUserRoleChange(user.uid, (role) => {
      setUserRole(role);
    });

    return () => unsubscribe();
  }, [user]);

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

