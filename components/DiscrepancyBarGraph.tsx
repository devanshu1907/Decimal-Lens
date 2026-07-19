"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface DiscrepancyBarGraphProps {
  reportedText: string;
  recalculatedText: string;
  reportedNum?: number;
  recalculatedNum?: number;
  isVerified: boolean;
  metricName: string;
}

export const DiscrepancyBarGraph: React.FC<DiscrepancyBarGraphProps> = ({
  reportedText,
  recalculatedText,
  reportedNum,
  recalculatedNum,
  isVerified,
  metricName,
}) => {
  // If numbers aren't provided, try parsing or default to basic text view
  const val1 = reportedNum ?? Math.abs(parseFloat(reportedText.replace(/[^0-9.-]+/g, "")) || 100);
  const val2 = recalculatedNum ?? Math.abs(parseFloat(recalculatedText.replace(/[^0-9.-]+/g, "")) || 100);
  const maxVal = Math.max(val1, val2, 1);

  const pct1 = Math.min(100, Math.max(10, Math.round((val1 / maxVal) * 100)));
  const pct2 = Math.min(100, Math.max(10, Math.round((val2 / maxVal) * 100)));

  // Calculate variance percentage
  let variancePct = "0.00%";
  if (val1 !== 0) {
    const diff = ((val2 - val1) / val1) * 100;
    variancePct = `${diff > 0 ? "+" : ""}${diff.toFixed(2)}%`;
  }

  return (
    <div className="bg-bg/70 dark:bg-slate-900/50 border border-border/80 rounded-md p-3 text-xs space-y-2.5 my-2">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-text-primary text-[11px] truncate max-w-[240px]">
          {metricName} — Variance Analysis
        </span>
        <div className="flex items-center gap-1.5 font-mono text-[10px]">
          {isVerified ? (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-verified dark:text-emerald-400 font-medium border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" /> Exact Match (0.00% Δ)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/10 text-flagged dark:text-amber-400 font-semibold border border-amber-500/20">
              <AlertCircle className="w-3 h-3" /> Discrepancy: {variancePct} Δ
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 font-mono text-[11px]">
        {/* Reported Stated Bar */}
        <div className="space-y-0.5">
          <div className="flex justify-between text-[10px] text-text-secondary">
            <span>Stated in Filing:</span>
            <span className="font-semibold text-text-primary">{reportedText}</span>
          </div>
          <div className="h-2 w-full bg-border/40 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct1}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full bg-accent-navy dark:bg-blue-500 rounded-full"
            />
          </div>
        </div>

        {/* Backend Re-calculated Bar */}
        <div className="space-y-0.5">
          <div className="flex justify-between text-[10px] text-text-secondary">
            <span>Deterministic Math Re-computation:</span>
            <span className={`font-semibold ${isVerified ? "text-verified dark:text-emerald-400" : "text-flagged dark:text-amber-400"}`}>
              {recalculatedText}
            </span>
          </div>
          <div className="h-2 w-full bg-border/40 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct2}%` }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              className={`h-full rounded-full ${isVerified ? "bg-[#15803D] dark:bg-emerald-500" : "bg-[#B45309] dark:bg-amber-500"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
