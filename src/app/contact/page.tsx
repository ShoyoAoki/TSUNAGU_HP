"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContact } from "@/context/ContactContext";

export default function ContactPage() {
  const router = useRouter();
  const { openContact } = useContact();

  useEffect(() => {
    openContact();
    router.replace("/");
  }, [openContact, router]);

  return null;
}
