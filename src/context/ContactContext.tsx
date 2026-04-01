"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ContactContextType {
  isContactOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  return (
    <ContactContext.Provider value={{
      isContactOpen,
      openContact: () => setIsContactOpen(true),
      closeContact: () => setIsContactOpen(false),
    }}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContact() {
  const context = useContext(ContactContext);
  if (!context) throw new Error("useContact must be used within ContactProvider");
  return context;
}
