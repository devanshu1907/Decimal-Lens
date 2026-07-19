"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Shield, TrendingUp, Cpu } from "lucide-react";
import { ScopePipelineDiagram } from "@/components/ScopePipelineDiagram";

export default function AboutPage() {
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
            About Decimal Lens
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed max-w-2xl font-sans">
            Decimal Lens is an enterprise-grade financial extraction and arithmetic verification platform designed to restore absolute trust in corporate reporting.
          </p>
        </motion.div>

        {/* Pillars Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.015 }}
            transition={{ duration: 0.3, delay: 0.05, type: "spring", stiffness: 350, damping: 25 }}
            className="bg-panel border border-border rounded-lg p-6 shadow-sm flex flex-col gap-3 cursor-pointer transition-shadow hover:shadow-md"
          >
            <div className="w-9 h-9 bg-bg rounded-lg border border-border flex items-center justify-center text-accent-navy dark:text-blue-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-text-primary font-sans">
              Deterministic Math Engine
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed font-sans">
              Unlike typical financial analyzers that suffer from floating-point accumulation errors, our engine recomputes every formula using pythonic decimal-precision interval arithmetic, providing absolute validation bounds.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.015 }}
            transition={{ duration: 0.3, delay: 0.1, type: "spring", stiffness: 350, damping: 25 }}
            className="bg-panel border border-border rounded-lg p-6 shadow-sm flex flex-col gap-3 cursor-pointer transition-shadow hover:shadow-md"
          >
            <div className="w-9 h-9 bg-bg rounded-lg border border-border flex items-center justify-center text-verified dark:text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-text-primary font-sans">
              Dual-Agent Architecture
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed font-sans">
              We leverage a pipeline where an Auditor Agent scans and extracts claims with context verification, and a Forecaster Agent constructs risk-adjusted 3-year projections, automatically deprecating trust on any math discrepancies.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.015 }}
            transition={{ duration: 0.3, delay: 0.15, type: "spring", stiffness: 350, damping: 25 }}
            className="bg-panel border border-border rounded-lg p-6 shadow-sm flex flex-col gap-3 cursor-pointer transition-shadow hover:shadow-md"
          >
            <div className="w-9 h-9 bg-bg rounded-lg border border-border flex items-center justify-center text-accent-navy dark:text-blue-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-text-primary font-sans">
              Risk-Adjusted Projections
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed font-sans">
              Projections built on top of erroneous or unverified claims are flagged as high risk, preserving model integrity and highlighting mathematical errors for institutional analysts.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.015 }}
            transition={{ duration: 0.3, delay: 0.2, type: "spring", stiffness: 350, damping: 25 }}
            className="bg-panel border border-border rounded-lg p-6 shadow-sm flex flex-col gap-3 cursor-pointer transition-shadow hover:shadow-md"
          >
            <div className="w-9 h-9 bg-bg rounded-lg border border-border flex items-center justify-center text-verified dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-text-primary font-sans">
              Audit Transparency
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed font-sans">
              A split view directly maps extracted claims to their direct PDF citation. Click any metric to scroll to and highlight the exact text in the source report, ensuring complete traceability.
            </p>
          </motion.div>
        </div>

        {/* Interactive Scope & Architecture Pipeline Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.22 }}
        >
          <ScopePipelineDiagram />
        </motion.div>

        {/* Narrative Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-panel border border-border rounded-lg p-6 sm:p-8 shadow-sm flex flex-col gap-4"
        >
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary font-sans">
            Our Mission
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed font-sans">
            Decimal Lens was founded by a team of quantitative analysts and software engineers who recognized a critical gap in automated financial analysis: standard LLM and retrieval-augmented systems are prone to hallucinating math. 
          </p>
          <p className="text-xs text-text-secondary leading-relaxed font-sans">
            By combining AI-driven semantic extraction with deterministic compiler-style verification engines, we deliver a firewall against mathematical inaccuracy in enterprise research, enabling analysts to focus on insight rather than audits.
          </p>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
