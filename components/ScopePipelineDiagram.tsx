"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Cpu, AlertTriangle, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

interface PipelineStep {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  darkColor: string;
  badge: string;
  details: string[];
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: "ingestion",
    number: "01",
    title: "Single-Doc Parsing",
    subtitle: "PDF / Direct Financial Ingestion",
    icon: FileText,
    color: "#1E3A5F",
    darkColor: "#60A5FA",
    badge: "Input Stage",
    details: [
      "Full document context extraction (10-K, 10-Q, Footnotes)",
      "Zero RAG vector embedding truncation — complete doc reasoning",
      "Page & paragraph bounding-box coordinate tracking",
    ],
  },
  {
    id: "auditor",
    number: "02",
    title: "Auditor Agent Engine",
    subtitle: "Python Decimal Math Engine",
    icon: Cpu,
    color: "#1E3A5F",
    darkColor: "#60A5FA",
    badge: "0-Error Precision",
    details: [
      "Re-computes stated financial sums with exact `decimal` precision",
      "Extracts formulas, operands, and reported line items",
      "Assigns `verified: true/false` status flags per claim",
    ],
  },
  {
    id: "discrepancy",
    number: "03",
    title: "Discrepancy Lineage",
    subtitle: "Arithmetic Audit & Citation Mapping",
    icon: AlertTriangle,
    color: "#B45309",
    darkColor: "#F59E0B",
    badge: "Risk Flagging",
    details: [
      "Flags math errors, rounding near-misses, & omitted disclosures",
      "Side-by-side Reported vs Re-calculated split-bar visualization",
      "Synchronized click-to-scroll PDF citation tracing",
    ],
  },
  {
    id: "forecaster",
    number: "04",
    title: "Forecaster Agent",
    subtitle: "Risk-Adjusted 3-Year Projections",
    icon: TrendingUp,
    color: "#15803D",
    darkColor: "#10B981",
    badge: "Downstream Output",
    details: [
      "Generates 3-year growth projections (FY26–FY28)",
      "Deprecates trust automatically if built on unverified claims",
      "Outputs confidence meters & multi-year trajectory graphs",
    ],
  },
];

export const ScopePipelineDiagram: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<string>("auditor");

  const activeStep = PIPELINE_STEPS.find((s) => s.id === selectedStep) || PIPELINE_STEPS[1];

  return (
    <div className="bg-panel border border-border rounded-lg p-5 shadow-sm space-y-5">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-accent-navy dark:text-blue-400" />
            <h3 className="font-bold text-text-primary text-sm font-sans">
              Decimal Lens Architecture & Scope Pipeline
            </h3>
          </div>
          <p className="text-xs text-text-secondary mt-0.5 font-sans">
            Interactive dual-agent pipeline: Single-Document Extraction → Deterministic Math Verification → Risk-Adjusted Forecasts
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded bg-accent-navy/10 text-accent-navy dark:text-blue-400 font-semibold border border-accent-navy/20">
          Dual-Agent Sequence
        </span>
      </div>

      {/* Flow Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative">
        {PIPELINE_STEPS.map((step, idx) => {
          const IconComp = step.icon;
          const isSelected = selectedStep === step.id;

          return (
            <motion.div
              key={step.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedStep(step.id)}
              className={`border rounded-lg p-3.5 cursor-pointer transition-all relative flex flex-col justify-between ${
                isSelected
                  ? "bg-bg border-accent-navy shadow-md ring-1 ring-accent-navy"
                  : "bg-panel border-border/80 hover:bg-bg/50"
              }`}
            >
              {/* Step Header */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono font-bold text-text-secondary text-[11px]">
                  {step.number}
                </span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-border bg-bg/80 text-text-primary">
                  {step.badge}
                </span>
              </div>

              {/* Icon & Title */}
              <div className="space-y-1 my-1">
                <div className="w-8 h-8 rounded-md bg-accent-navy/10 dark:bg-blue-500/20 text-accent-navy dark:text-blue-400 flex items-center justify-center mb-2">
                  <IconComp className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-text-primary text-xs font-sans">
                  {step.title}
                </h4>
                <p className="text-[10px] text-text-secondary line-clamp-1 font-sans">
                  {step.subtitle}
                </p>
              </div>

              {/* Connecting Arrow (Desktop) */}
              {idx < PIPELINE_STEPS.length - 1 && (
                <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-4 h-4 text-border" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Selected Node Details Box */}
      <motion.div
        key={activeStep.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-bg/80 border border-border/80 rounded-md p-4 space-y-2.5"
      >
        <div className="flex items-center justify-between border-b border-border/50 pb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-accent-navy dark:text-blue-400">
              Step {activeStep.number}: {activeStep.title}
            </span>
            <span className="text-xs text-text-secondary">— {activeStep.subtitle}</span>
          </div>
          <span className="text-[10px] font-mono text-text-secondary">Decimal Lens Core Specification</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
          {activeStep.details.map((detail, idx) => (
            <div key={idx} className="flex items-start gap-2 text-text-primary bg-panel p-2.5 rounded border border-border/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-verified dark:text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-[11px] leading-relaxed font-sans">{detail}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
