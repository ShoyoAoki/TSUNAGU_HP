"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle } from "lucide-react";
import { useState, useEffect, useId, useRef } from "react";
import { usePathname } from "next/navigation";
import { getStrings } from "@/lib/i18n/strings";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// The contact page and legacy dialogs share the same fields and submission flow.
export function ContactForm({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const t = getStrings(pathname.startsWith("/zh") ? "zh" : "ja").contactModal;
  const formId = useId();
  const statusRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const submitting = formState === "submitting";

  useEffect(() => {
    if (formState === "success") statusRef.current?.focus();
  }, [formState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setFormState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      // Keep errors localized; the API itself returns Japanese messages.
      if (!res.ok) throw new Error(t.errorGeneric);
      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <div ref={statusRef} role="status" tabIndex={-1} className="text-center py-10 outline-none">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-700" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.successTitle}</h3>
        <p className="text-sm leading-loose text-slate-600 whitespace-pre-line">{t.successBody}</p>
        {onClose && (
          <button type="button" onClick={onClose} className="mt-8 w-full px-8 py-3 bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors">
            {t.close}
          </button>
        )}
      </div>
    );
  }

  const fields = [
    { key: "company", label: t.companyLabel, placeholder: t.companyPlaceholder, type: "text", autoComplete: "organization", required: false },
    { key: "name", label: t.nameLabel, placeholder: t.namePlaceholder, type: "text", autoComplete: "name", required: true },
    { key: "email", label: t.emailLabel, placeholder: t.emailPlaceholder, type: "email", autoComplete: "email", required: true },
    { key: "phone", label: t.phoneLabel, placeholder: t.phonePlaceholder, type: "tel", autoComplete: "tel", required: false },
  ] as const;
  const inputClass = "w-full min-w-0 rounded-sm bg-white border border-slate-300 px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-colors disabled:bg-slate-50";

  return (
    <form onSubmit={handleSubmit} aria-busy={submitting}>
      {formState === "error" && (
        <div role="alert" className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm leading-relaxed">
          {t.errorGeneric}
        </div>
      )}
      <fieldset disabled={submitting} className="min-w-0 space-y-7">
        {fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <label htmlFor={`${formId}-${field.key}`} className="text-sm font-bold text-slate-700 flex items-center gap-3">
              {field.label}
              {field.required && <span className="text-xs font-medium text-red-700">{t.required}</span>}
            </label>
            <input
              id={`${formId}-${field.key}`}
              name={field.key}
              type={field.type}
              autoComplete={field.autoComplete}
              required={field.required}
              value={formData[field.key]}
              onChange={(e) => setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))}
              className={inputClass}
              placeholder={field.placeholder}
            />
          </div>
        ))}
        <div className="space-y-2">
          <label htmlFor={`${formId}-message`} className="text-sm font-bold text-slate-700 flex items-center gap-3">
            {t.messageLabel}
            <span className="text-xs font-medium text-red-700">{t.required}</span>
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
            className={`${inputClass} resize-y`}
            placeholder={t.messagePlaceholder}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-sm bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-4 transition-colors flex items-center justify-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <><Loader2 className="w-5 h-5 animate-spin motion-reduce:animate-none" aria-hidden="true" /><span>{t.submitting}</span></>
          ) : (
            <><span>{t.submit}</span><Send className="w-4 h-4" aria-hidden="true" /></>
          )}
        </button>
      </fieldset>
    </form>
  );
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const pathname = usePathname();
  const t = getStrings(pathname.startsWith("/zh") ? "zh" : "ja").contactModal;
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <div className="fixed inset-0 flex items-center justify-center z-[70] p-4 pointer-events-none">
            <motion.div
              role="dialog" aria-modal="true" aria-labelledby={titleId}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-white shadow-2xl pointer-events-auto relative max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-800">
                <span id={titleId} className="text-white font-mono font-bold tracking-wider text-sm">{t.title}</span>
                <button type="button" onClick={onClose} aria-label={t.close} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <div className="p-6 sm:p-8"><ContactForm onClose={onClose} /></div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
