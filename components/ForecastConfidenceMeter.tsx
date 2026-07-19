"use client";

import React from "react";
import { AlertOctagon, CheckCircle2, TrendingUp, AlertTriangle } from "lucide-react";

interface ForecastConfidenceMeterProps {
  confidence: string; // "High" | "Low"
  riskAssessment: string;
  flaggedClaimsCount?: number;
}

export const ForecastConfidenceMeter: React.FC<ForecastConfidenceMeterProps> = ({
  confidence,
  riskAssessment,
  flaggedClaimsCount = 0,
}) => {
  const isHighConfidence = confidence.toLowerCase() === "high";

  return (
    <div
      className={`border rounded-lg p-3.5 shadow-xs text-xs space-y-2 transition-all ${
        isHighConfidence
          ? "bg-panel border-border text-text-primary"
          : "bg-amber-500/10 dark:bg-amber-950/40 border-[#B45309]/40 text-text-primary"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#1E3A5F] dark:text-blue-400" />
          <span className="font-semibold text-text-primary dark:text-slate-100 text-xs">
            Forecaster Risk Assessment
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          {isHighConfidence ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#15803D]/10 text-[#15803D] dark:text-emerald-400 border border-[#15803D]/20 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> High Confidence Model
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#B45309]/15 text-[#B45309] dark:text-amber-400 border border-[#B45309]/30 font-semibold animate-pulse">
              <AlertOctagon className="w-3.5 h-3.5" /> Caution: Low Confidence
            </span>
          )}
        </div>
      </div>

      {/* Subtext / Risk Assessment Explanation */}
      <p className="text-[11px] font-normal leading-relaxed text-slate-700 dark:text-slate-200">
        {riskAssessment ||
          (isHighConfidence
            ? "All baseline claims were verified arithmetic matches. Projections carry standard baseline confidence."
            : `Warning: ${flaggedClaimsCount} baseline claim(s) failed arithmetic verification. Projection models carry downstream risk.`)}
      </p>

      {!isHighConfidence && (
        <div className="flex items-center gap-1.5 text-[10px] text-[#B45309] dark:text-amber-400 font-semibold pt-1 border-t border-[#B45309]/20">
          <AlertTriangle className="w-3 h-3 shrink-0" />
          <span>Do not build financial valuations on unverified baseline inputs without adjusting risk premiums.</span>
        </div>
      )}
    </div>
  );
};
