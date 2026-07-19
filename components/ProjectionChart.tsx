"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Info } from "lucide-react";

interface ProjectionData {
  year: string;
  projected_revenue: string;
  projected_operating_income: string;
  projected_operating_margin: string;
  projected_revenue_growth: string;
  risk_weight: string;
}

interface ProjectionChartProps {
  projections: ProjectionData[];
  baselineRevenue?: string;
  baselineMargin?: string;
}

export const formatCompactNumber = (val: string | number): string => {
  if (val === undefined || val === null || val === "") return "$0";
  let num = 0;
  if (typeof val === "number") {
    num = val;
  } else {
    const str = String(val);
    const isTrillion = /T(rillion)?/i.test(str);
    const isBillion = /B(illion)?/i.test(str);
    const isMillion = /M(illion)?/i.test(str);
    const isThousand = /K(thousand)?/i.test(str);
    const clean = str.replace(/[^0-9.-]+/g, "");
    num = Math.abs(parseFloat(clean)) || 0;
    if (isTrillion) num *= 1_000_000_000_000;
    else if (isBillion) num *= 1_000_000_000;
    else if (isMillion) num *= 1_000_000;
    else if (isThousand) num *= 1_000;
  }

  if (num >= 1_000_000_000_000) {
    return `$${(num / 1_000_000_000_000).toFixed(2)}T`;
  }
  if (num >= 1_000_000_000) {
    return `$${(num / 1_000_000_000).toFixed(2)}B`;
  }
  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(2)}M`;
  }
  if (num >= 1_000) {
    return `$${(num / 1_000).toFixed(1)}K`;
  }
  return `$${num.toFixed(0)}`;
};

export const ProjectionChart: React.FC<ProjectionChartProps> = ({
  projections,
  baselineRevenue = "$142.5M",
  baselineMargin = "24.50%",
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!projections || projections.length === 0) return null;

  // Parse numeric values for chart height calculations (handling K/M/B/T suffixes)
  const parseNum = (str: string | number) => {
    if (typeof str === "number") return str;
    if (!str) return 0;
    const isTrillion = /T(rillion)?/i.test(str);
    const isBillion = /B(illion)?/i.test(str);
    const isMillion = /M(illion)?/i.test(str);
    const isThousand = /K(thousand)?/i.test(str);
    const clean = str.replace(/[^0-9.-]+/g, "");
    let val = Math.abs(parseFloat(clean)) || 0;
    if (isTrillion) val *= 1_000_000_000_000;
    else if (isBillion) val *= 1_000_000_000;
    else if (isMillion) val *= 1_000_000;
    else if (isThousand) val *= 1_000;
    return val;
  };

  const parsedBaselineRev = parseNum(baselineRevenue) || 142500000;

  const chartData = [
    {
      year: "FY25 (Actual)",
      revenueStr: baselineRevenue,
      marginStr: baselineMargin,
      growthStr: "Baseline",
      revVal: parsedBaselineRev,
      marginVal: parseNum(baselineMargin) || 24.5,
      isActual: true,
      risk: "Verified Baseline",
    },
    ...projections.map((p) => ({
      year: p.year.replace(/\s*\(Est\)/i, ""),
      revenueStr: p.projected_revenue,
      marginStr: p.projected_operating_margin,
      growthStr: p.projected_revenue_growth,
      revVal: parseNum(p.projected_revenue) || parsedBaselineRev * 1.08,
      marginVal: parseNum(p.projected_operating_margin) || 24.5,
      isActual: false,
      risk: p.risk_weight,
    })),
  ];

  // MAGNITUDE GUARDRAIL: Automatically align orders of magnitude between Actual and Projected values
  // Prevents unit mismatch issues (e.g. Actual = $77.7K vs Projected = $84.19M due to table header 'in millions')
  if (chartData.length > 1 && chartData[0].revVal > 0 && chartData[1].revVal > 0) {
    const ratio = chartData[1].revVal / chartData[0].revVal;
    if (ratio > 5) {
      // Projected is > 5x actual (e.g., millions vs raw) -> scale actual revVal to match projected order
      const order = Math.pow(10, Math.floor(Math.log10(ratio)));
      chartData[0].revVal *= order;
    } else if (ratio < 0.2) {
      // Actual is > 5x projected -> scale projected revVal to match actual order
      const order = Math.pow(10, Math.floor(Math.log10(1 / ratio)));
      for (let i = 1; i < chartData.length; i++) {
        chartData[i].revVal *= order;
      }
    }
  }

  const maxRev = Math.max(...chartData.map((d) => d.revVal), 1);
  const maxMargin = Math.max(...chartData.map((d) => d.marginVal), 30);

  // SVG dimensions
  const svgWidth = 420;
  const svgHeight = 140;
  const paddingX = 40;
  const paddingY = 20;
  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;

  // Compute points for the margin line
  const points = chartData.map((d, i) => {
    const x = paddingX + (i / (chartData.length - 1)) * chartW;
    const y = svgHeight - paddingY - (d.marginVal / maxMargin) * chartH;
    return { x, y, margin: d.marginVal, marginStr: d.marginStr };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="bg-panel border border-border rounded-lg p-3.5 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#1E3A5F] dark:text-blue-400" />
          <span className="font-semibold text-text-primary text-xs">
            Revenue & Margin Trajectory (3-Year Forecast)
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono">
          <span className="flex items-center gap-1 text-text-secondary">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#1E3A5F] dark:bg-blue-500" /> Revenue
          </span>
          <span className="flex items-center gap-1 text-text-secondary">
            <span className="w-2.5 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" /> Operating Margin %
          </span>
        </div>
      </div>

      {/* Visual SVG Chart */}
      <div className="relative w-full overflow-hidden bg-bg/40 border border-border/50 rounded-md p-2">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
          {/* Horizontal Grid lines */}
          {[0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = svgHeight - paddingY - ratio * chartH;
            return (
              <line
                key={idx}
                x1={paddingX - 10}
                y1={y}
                x2={svgWidth - paddingX + 10}
                y2={y}
                stroke="currentColor"
                className="text-border/40"
                strokeDasharray="2 2"
                strokeWidth="1"
              />
            );
          })}

          {/* Revenue Columns */}
          {chartData.map((d, i) => {
            const colWidth = 36;
            const x = points[i].x - colWidth / 2;
            const barH = (d.revVal / maxRev) * chartH;
            const y = svgHeight - paddingY - barH;
            const isHovered = hoveredIdx === i;

            return (
              <g key={i} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
                <rect
                  x={x}
                  y={y}
                  width={colWidth}
                  height={barH}
                  rx={3}
                  className={`transition-opacity duration-200 cursor-pointer ${
                    d.isActual
                      ? "fill-[#1E3A5F] dark:fill-blue-600"
                      : d.risk.toLowerCase().includes("high")
                      ? "fill-[#B45309] dark:fill-amber-600"
                      : "fill-[#1E3A5F]/75 dark:fill-blue-500/75"
                  } ${isHovered ? "opacity-100 stroke-2 stroke-text-primary" : "opacity-90"}`}
                />

                {/* Bar Value text above bar */}
                <text
                  x={points[i].x}
                  y={y - 5}
                  textAnchor="middle"
                  className="fill-text-primary dark:fill-slate-100 font-mono text-[9px] font-semibold"
                >
                  {formatCompactNumber(d.revVal)}
                </text>

                {/* X-axis Year Label */}
                <text
                  x={points[i].x}
                  y={svgHeight - 4}
                  textAnchor="middle"
                  className={`font-mono text-[9px] ${
                    d.isActual ? "fill-text-primary dark:fill-slate-100 font-semibold" : "fill-text-secondary dark:fill-slate-300"
                  }`}
                >
                  {d.year}
                </text>
              </g>
            );
          })}

          {/* Margin Line Overlay */}
          <polyline
            fill="none"
            className="stroke-emerald-600 dark:stroke-emerald-400"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={polylinePoints}
          />

          {/* Margin Points */}
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={hoveredIdx === i ? "4" : "3"}
              className="fill-bg stroke-emerald-600 dark:stroke-emerald-400 stroke-2 cursor-pointer transition-all"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            />
          ))}
        </svg>

        {/* Hover Information Box */}
        {hoveredIdx !== null && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 bg-panel dark:bg-slate-900 border border-border rounded p-2 text-[10px] font-mono flex items-center justify-between shadow-sm text-text-primary dark:text-slate-100"
          >
            <div>
              <span className="font-semibold text-text-primary dark:text-slate-100">{chartData[hoveredIdx].year}</span>:{" "}
              <span className="text-text-primary dark:text-slate-200">Revenue {chartData[hoveredIdx].revenueStr}</span> |{" "}
              <span className="text-[#15803D] dark:text-emerald-400 font-semibold">Margin {chartData[hoveredIdx].marginStr}</span>
            </div>
            <div className="text-text-secondary dark:text-slate-300">
              Growth: <span className="font-semibold text-text-primary dark:text-slate-100">{chartData[hoveredIdx].growthStr}</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer Pill Badges */}
      <div className="grid grid-cols-4 gap-2 pt-1 font-mono text-[10px]">
        {chartData.map((d, i) => (
          <div
            key={i}
            className={`p-1.5 rounded border text-center ${
              d.isActual
                ? "bg-bg border-border text-text-primary"
                : "bg-panel border-border/80 text-text-secondary"
            }`}
          >
            <div className="text-[9px] uppercase text-text-secondary truncate">{d.year}</div>
            <div className="font-semibold text-text-primary text-[11px] mt-0.5">{d.growthStr}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
