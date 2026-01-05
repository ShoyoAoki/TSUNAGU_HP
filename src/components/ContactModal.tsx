"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormState("success");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[70] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-white overflow-hidden shadow-2xl pointer-events-auto relative max-h-[90vh] overflow-y-auto"
            >
              {/* Tech Header */}
              <div className="bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-500 animate-pulse" />
                  <span className="text-white font-mono font-bold tracking-wider text-sm">
                    SYSTEM.CONTACT
                  </span>
                </div>
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                {formState === "success" ? (
                  <div className="text-center py-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent</h3>
                    <p className="text-gray-500 mb-8">
                      お問い合わせありがとうございます。<br />
                      担当者より順次ご連絡させていただきます。
                    </p>
                    <button
                      onClick={onClose}
                      className="px-8 py-3 bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors w-full"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                        Company Name
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 font-medium focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                        placeholder="株式会社Bridg"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                          Name
                        </label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 font-medium focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                          placeholder="山田 太郎"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                          Email
                        </label>
                        <input 
                          type="email" 
                          required
                          className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 font-medium focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                          placeholder="hello@bridg.co.jp"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                        Message
                      </label>
                      <textarea 
                        required
                        rows={4}
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-gray-900 font-medium focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
                        placeholder="ご用件をご記入ください..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                      {formState === "submitting" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10 flex items-center gap-2">
                            Send Message
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Decorative Corner Accents */}
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gray-200" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gray-200" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

