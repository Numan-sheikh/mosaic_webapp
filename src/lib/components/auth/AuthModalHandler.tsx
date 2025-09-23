"use client";

import { useAuth } from "@/context/AuthContext";
import LoginModal from "./LoginModal";

// This small component acts as a bridge between your server layout and the client-side context
const AuthModalHandler = () => {
  // Get the modal state and the close function from the context
  const { isAuthModalOpen, closeAuthModal } = useAuth();

  // Render the modal with the correct props
  return <LoginModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />;
};

export default AuthModalHandler;
