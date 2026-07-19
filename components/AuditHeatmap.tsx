"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Grid, FileSpreadsheet } from "lucide-react";

interface ClaimItem {
  id: string;
  metric: string;
  reported: string;
  verified: boolean;
  page: number;
}

interface AuditHeatmapProps {
  claims: ClaimItem[];
}

interface SectionCategory {
  id: string;
  title: string;
  description: string;
  keywords: string[];
}

const SECTION_CATEGORIES: SectionCategory[] = [
  {
    id: "income",
    title: "Income Statement",
    description: "Revenue, Gross Profit, Operating Income, Expenses",
    keywords: ["revenue", "profit", "income", "cogs", "r&d", "sg&a", "expense", "margin", "sales"],
  },
  {
    id: "balance",
    title: "Balance Sheet",
    description: "Assets, Liabilities, Cash, Debt, Equity",
    keywords: ["asset", "liability", "cash", "debt", "equity", "inventory", "payable", "receivable"],
  },
  {
    id: "cashflow",
    title: "Cash Flow Statement",
    description: "Operating Cash, CapEx, Free Cash Flow, Financing",
    keywords: ["cash flow", "capex", "capital", "operating cash", "free cash", "dividend"],
  },
  {
    id: "notes",
    title: "Footnotes & Disclosures",
    description: "Segment details, GAAP reconciliations, Guidance",
    keywords: ["footnote", "sec", "segment", "reconciliation", "guidance", "international", "domestic"],
  },
];

export const AuditHeatmap: React.FC<AuditHeatmapProps> = ({ claims }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Categorize claims by section keywords
  const getSectionClaims = (sec: SectionCategory) => {
    return claims.filter((c) => {
      const metricLower = c.metric.toLowerCase();
      return sec.keywords.some((kw) => metricLower.includes(kw));
    });
  };

  // Remaining claims that didn't match specific keywords go to general/income
  const categorizedIds = new Set<string>();
  SECTION_CATEGORIES.forEach((sec) => {
    getSectionClaims(sec).forEach((c) => categorizedIds.add(c.id));
  });

  const uncategorizedClaims = claims.filter((c) => !categorizedIds.has(c.id));

  return (
    <div className="bg-panel border border-border rounded-lg p-3.5 shadow-xs space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Grid className="w-4 h-4 text-accent-navy dark:text-blue-400" />
          <div>
            <h4 className="font-semibold text-text-primary text-xs">
              Audit Coverage & Discrepancy Heatmap
            </h4>
            <p className="text-[10px] text-text-secondary">
              Filing section verification density and mathematical integrity
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="flex items-center gap-1 text-verified dark:text-emerald-400 font-semibold">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#15803D] dark:bg-emerald-500" /> Verified (0 Error)
          </span>
          <span className="flex items-center gap-1 text-flagged dark:text-amber-400 font-semibold">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#B45309] dark:bg-amber-500" /> Mismatch Alert
          </span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {SECTION_CATEGORIES.map((sec, idx) => {
          let secClaims = getSectionClaims(sec);
          // If first section (Income Statement), attach uncategorized claims as baseline fallback
          if (idx === 0 && uncategorizedClaims.length > 0) {
            secClaims = [...secClaims, ...uncategorizedClaims];
          }

          const verifiedCount = secClaims.filter((c) => c.verified).length;
          const flaggedCount = secClaims.filter((c) => !c.verified).length;
          const total = secClaims.length;
          const passRate = total > 0 ? Math.round((verifiedCount / total) * 100) : 100;
          const isSelected = activeSection === sec.id;

          return (
            <motion.div
              key={sec.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => setActiveSection(isSelected ? null : sec.id)}
              className={`border rounded-md p-2.5 cursor-pointer transition-all ${
                isSelected
                  ? "border-accent-navy bg-bg/80 shadow-sm"
                  : flaggedCount > 0
                  ? "border-amber-500/30 bg-amber-500/10 dark:bg-amber-950/20 hover:bg-amber-500/15"
                  : "border-border/80 bg-bg/40 hover:bg-bg/80"
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-1.5 font-medium text-text-primary text-[11px]">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-text-secondary" />
                  <span>{sec.title}</span>
                </div>
                <span className="font-mono text-[10px] text-text-secondary">
                  {total > 0 ? `${verifiedCount}/${total} Passed` : "0 Mapped"}
                </span>
              </div>

              {/* Heat Cells */}
              <div className="flex items-center gap-1 flex-wrap min-h-[22px]">
                {total === 0 ? (
                  <span className="text-[10px] text-text-secondary italic">No line items in this scope</span>
                ) : (
                  secClaims.map((c) => (
                    <span
                      key={c.id}
                      title={`${c.metric}: ${c.reported} (${c.verified ? "Verified Match" : "Math Mismatch Delta"})`}
                      className={`h-4 min-w-[16px] px-1.5 rounded-xs flex items-center justify-center text-[9px] font-mono font-bold transition-all ${
                        c.verified
                          ? "bg-[#15803D] dark:bg-emerald-600 text-white"
                          : "bg-[#B45309] dark:bg-amber-600 text-white animate-pulse"
                      }`}
                    >
                      P{c.page}
                    </span>
                  ))
                )}
              </div>

              {/* Sub-label */}
              <div className="flex items-center justify-between text-[9px] text-text-secondary pt-1.5 mt-1 border-t border-border/40 font-mono">
                <span className="truncate max-w-[180px] font-sans">{sec.description}</span>
                <span className={`font-semibold ${flaggedCount > 0 ? "text-flagged dark:text-amber-400" : "text-verified dark:text-emerald-400"}`}>
                  {passRate}% Integrity
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
