"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, FC } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import LoginModal from '@/lib/components/auth/LoginModal';
import LogoutModal from '@/lib/components/auth/LogoutModal'; // 1. Import the new LogoutModal

// 2. Update the context's type to include state and functions for both modals
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isLogoutModalOpen: boolean;
  openLogoutModal: () => void;
  closeLogoutModal: () => void;
}

// 3. Update the default context value
const AuthContext = createContext<AuthContextType>({ 
  user: null, 
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
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // 4. Add state for the logout modal

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const openLogoutModal = () => setIsLogoutModalOpen(true); // 5. Add functions to control the logout modal
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      // Automatically close the login modal on successful login/logout
      if (user) {
        setIsAuthModalOpen(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 6. Provide the new values to all child components
  const value = { 
    user, 
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
      {/* Render both modals so they are available on every page */}
      <LoginModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
      <LogoutModal isOpen={isLogoutModalOpen} onClose={closeLogoutModal} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

