"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed max-w-2xl font-sans">
            Effective Date: July 19, 2026. This Privacy Policy details how Decimal Lens processes uploaded financial documents and corporate filings.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="bg-panel border border-border rounded-lg p-6 sm:p-8 shadow-sm flex flex-col gap-6 text-xs text-text-secondary leading-relaxed font-sans"
        >
          <section className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-text-primary">
              1. Document Retention & Processing
            </h3>
            <p>
              Decimal Lens acts strictly as a stateless document auditor. When you upload PDF, CSV, or text filings, the content is parsed in-memory (or stored under temporary randomized filenames using UUID headers in an upload directory) solely for processing claims extraction and math verification.
            </p>
            <p>
              Documents are never ingested into vector databases, long-term embeddings, or persistent search databases. You can clear your session history at any time using the "Clear History" button on the dashboard, which permanently deletes all corresponding local storage session state references.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-text-primary">
              2. LLM Inference & Data Confidentiality
            </h3>
            <p>
              The semantic extraction and forecasting layers utilize Groq's high-speed inference engine via standard SDK endpoints. Uploaded text is forwarded solely for structural extraction (Auditor Agent) and analytical projections (Forecaster Agent).
            </p>
            <p>
              Per our security guidelines, API keys are kept strictly backend-side in server environment variables and are never transmitted to, or exposed on, client browsers. Text payloads sent to inference endpoints are subject to standard API provider data privacy bounds which exclude them from LLM model training.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-text-primary">
              3. Local Storage Policy
            </h3>
            <p>
              To provide a convenient workspace, recent sessions (filename, timestamps, verified claims list, and forecaster responses) are persisted locally in your browser's `localStorage` context. This data is private to your browser session and never sent to external telemetry servers.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-text-primary">
              4. Contact Information
            </h3>
            <p>
              For questions regarding security audits or data compliance, please reach out to our privacy compliance office at <span className="font-mono text-text-primary">privacy@decimallens.com</span>.
            </p>
          </section>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
