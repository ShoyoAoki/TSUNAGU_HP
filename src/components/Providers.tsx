"use client";

import { ContactProvider, useContact } from "@/context/ContactContext";
import ContactModal from "@/components/ContactModal";

function GlobalContactModal() {
  const { isContactOpen, closeContact } = useContact();
  return <ContactModal isOpen={isContactOpen} onClose={closeContact} />;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ContactProvider>
      {children}
      <GlobalContactModal />
    </ContactProvider>
  );
}
