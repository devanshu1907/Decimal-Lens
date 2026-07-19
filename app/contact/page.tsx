"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <Header />
      
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 flex flex-col gap-10">
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center sm:text-left border-b border-border pb-6"
        >
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight font-sans">
            Contact Us
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed max-w-2xl font-sans">
            Get in touch with the Decimal Lens team for enterprise integrations, product inquiries, or quantitative API access.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="md:col-span-2 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary font-sans">
                Corporate Headquarters
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed font-sans">
                Our quant engineering team is based in India, building determinism for financial analysts globally.
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-panel border border-border flex items-center justify-center text-accent-navy shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-text-secondary font-semibold font-sans">Email Support</span>
                  <span className="font-mono text-xs text-text-primary">support@decimallens.com</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-panel border border-border flex items-center justify-center text-accent-navy shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-text-secondary font-semibold font-sans">Direct Line</span>
                  <span className="font-mono text-xs text-text-primary">+91 (80) 4555-0192</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-panel border border-border flex items-center justify-center text-accent-navy shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-text-secondary font-semibold font-sans">Location</span>
                  <span className="text-xs text-text-primary font-sans">Bengaluru, Karnataka, India</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="md:col-span-3 bg-panel border border-border rounded-lg p-6 shadow-sm flex flex-col gap-4"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary font-sans border-b border-border/60 pb-2 mb-1">
              Send a Message
            </h3>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center flex flex-col items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-verified-bg border border-verified/10 flex items-center justify-center text-verified">
                  <Send className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-text-primary font-sans">Message Dispatched Successfully</span>
                <p className="text-xs text-text-secondary font-sans max-w-xs leading-relaxed">
                  Thank you for reaching out. A quantitative support specialist will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-accent-navy hover:underline font-semibold mt-2 cursor-pointer font-sans"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-text-secondary font-semibold block mb-1">Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full border border-border rounded px-2.5 py-1.5 outline-none focus:border-accent-navy text-xs font-sans bg-bg text-text-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-text-secondary font-semibold block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full border border-border rounded px-2.5 py-1.5 outline-none focus:border-accent-navy text-xs font-mono bg-bg text-text-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-text-secondary font-semibold block mb-1">Message</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry, request, or feedback..."
                    className="w-full border border-border rounded px-2.5 py-1.5 outline-none focus:border-accent-navy text-xs font-sans bg-bg text-text-primary resize-none leading-relaxed"
                    required
                  />
                </div>

                <div className="flex justify-end pt-2 border-t border-border/40 mt-1">
                  <motion.button
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    type="submit"
                    className="px-4 py-2 rounded bg-accent-navy text-white hover:bg-opacity-90 transition-all font-semibold shadow-sm cursor-pointer"
                  >
                    Submit Inquiry
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
