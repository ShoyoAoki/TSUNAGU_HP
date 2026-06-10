"use client";

import { MotionConfig } from "framer-motion";
import { ContactProvider, useContact } from "@/context/ContactContext";
import ContactModal from "@/components/ContactModal";

function GlobalContactModal() {
  const { isContactOpen, closeContact } = useContact();
  return <ContactModal isOpen={isContactOpen} onClose={closeContact} />;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // reducedMotion="user": OSの「視差効果を減らす」設定を尊重する
    <MotionConfig reducedMotion="user">
      <ContactProvider>
        {children}
        <GlobalContactModal />
      </ContactProvider>
    </MotionConfig>
  );
}
