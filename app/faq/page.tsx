"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HelpCircle } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "What is Decimal Lens and how does it differ from RAG?",
    a: "Decimal Lens is a single-document extraction and math verification pipeline, not a retrieval-augmented generation (RAG) system. The entire document context is evaluated directly by the dual-agent sequence, ensuring absolute audit traceability and preventing context fragmentation or hallucinated citations."
  },
  {
    q: "How does the Math Verification Engine ensure precision?",
    a: "Every financial number is modeled as a rounding interval [value - HULP, value + HULP) based on its decimal structure. Calculations are evaluated deterministically in Python using the decimal module for absolute precision (no floats). Tolerance limits automatically scale with the operand count to prevent false flags on rounding accumulations."
  },
  {
    q: "What is the Dual-Agent workflow?",
    a: "We enforce a strict two-agent sequence: 1) Auditor Agent extracts claims, reported values, and formula expressions from the document text. 2) Forecaster Agent receives verified claims. If any baseline claim used in forecasting has verified: false, the Forecaster drops confidence to low, labels downstream years as high risk, and highlights the math error in the risk assessment."
  },
  {
    q: "How do I resolve a flagged math error in the Auditor grid?",
    a: "Click the Edit Claim button in the details panel, correct the reported value, formula context, or the raw mathematical expression (e.g. gross_profit - rd - sga), and click Save & Re-verify. The system will recalculate the math and automatically re-run downstream projections."
  },
  {
    q: "What file formats and sizes are supported?",
    a: "You can upload PDF (.pdf), CSV (.csv), Markdown (.md, .markdown), and Text (.txt) files up to 25MB. PDF uploads undergo extension spoofing checks using magic-byte headers."
  },
  {
    q: "Can I export my auditing reports and projections?",
    a: "Yes. Click the CSV export button in the header once audit analysis is complete to download a comprehensive spreadsheet detailing claim metrics, reported vs recalculated values, basis point variance, verification status, and 3-year growth projections."
  }
];

export default function FAQPage() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <Header />
      
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-12 flex flex-col gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center sm:text-left border-b border-border pb-6 flex items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight font-sans">
              Frequently Asked Questions
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed font-sans">
              Learn about Decimal Lens' architecture, deterministic verification engine, and dual-agent forecasting flow.
            </p>
          </div>
          <HelpCircle className="w-10 h-10 text-accent-navy shrink-0 opacity-80" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="bg-panel border border-border rounded-lg p-6 sm:p-8 shadow-sm flex flex-col divide-y divide-border/60"
        >
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = activeIdx === idx;
            return (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <button
                  onClick={() => setActiveIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-text-primary hover:text-accent-navy transition-colors py-1 cursor-pointer font-sans"
                >
                  <span>{item.q}</span>
                  <span className="text-text-secondary font-mono text-[10px] sm:text-xs select-none ml-4 shrink-0">
                    {isOpen ? "▲" : "▼"}
                  </span>
                </button>
                {isOpen && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-xs text-text-secondary leading-relaxed mt-2.5 font-sans whitespace-pre-line"
                  >
                    {item.a}
                  </motion.p>
                )}
              </div>
            );
          })}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
