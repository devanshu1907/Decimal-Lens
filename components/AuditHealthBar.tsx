"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, HelpCircle, ShieldCheck } from "lucide-react";

interface AuditHealthBarProps {
  totalClaims: number;
  verifiedCount: number;
  flaggedCount: number;
  unverifiableCount?: number;
}

export const AuditHealthBar: React.FC<AuditHealthBarProps> = ({
  totalClaims,
  verifiedCount,
  flaggedCount,
  unverifiableCount = 0,
}) => {
  if (totalClaims === 0) return null;

  const verifiedPct = Math.round((verifiedCount / totalClaims) * 100);
  const flaggedPct = Math.round((flaggedCount / totalClaims) * 100);
  const unverifiablePct = Math.max(0, 100 - verifiedPct - flaggedPct);

  return (
    <div className="bg-panel border border-border rounded-lg p-3.5 shadow-xs space-y-2.5">
      {/* Header Info */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-medium text-text-primary">
          <ShieldCheck className="w-4 h-4 text-accent-navy dark:text-blue-400" />
          <span>Mathematical Audit Integrity</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="flex items-center gap-1 text-verified dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {verifiedCount} Verified ({verifiedPct}%)
          </span>
          {flaggedCount > 0 && (
            <span className="flex items-center gap-1 text-flagged dark:text-amber-400 font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              {flaggedCount} Mismatched ({flaggedPct}%)
            </span>
          )}
          {unverifiableCount > 0 && (
            <span className="flex items-center gap-1 text-text-secondary">
              <HelpCircle className="w-3.5 h-3.5" />
              {unverifiableCount} Text Only
            </span>
          )}
        </div>
      </div>

      {/* Segmented Progress Bar */}
      <div className="h-2.5 w-full bg-bg rounded-full overflow-hidden flex gap-0.5 p-0.5 border border-border/60">
        {verifiedPct > 0 && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${verifiedPct}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-[#15803D] dark:bg-emerald-500 rounded-xs"
            title={`${verifiedCount} Verified (${verifiedPct}%)`}
          />
        )}
        {flaggedPct > 0 && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${flaggedPct}%` }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="h-full bg-[#B45309] dark:bg-amber-500 rounded-xs"
            title={`${flaggedCount} Math Discrepancies (${flaggedPct}%)`}
          />
        )}
        {unverifiablePct > 0 && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${unverifiablePct}%` }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="h-full bg-slate-400/40 dark:bg-slate-600/40 rounded-xs"
            title={`${unverifiableCount} Text Claims`}
          />
        )}
      </div>

      {/* Footer Subtext */}
      <div className="flex items-center justify-between text-[10px] text-text-secondary">
        <span>Deterministic Python `decimal` verification</span>
        <span className="font-mono">{totalClaims} total claims evaluated</span>
      </div>
    </div>
  );
};
