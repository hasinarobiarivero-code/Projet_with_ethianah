import React from 'react';

export default function KpiCard({
  title,
  value,
  trend,
  trendSubtext,
  icon: Icon,
  iconBg,
  iconColor,
  waveColor,
  wavePath
}) {
  return (
    <div className="relative p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      {/* Top Header: Title and Icon */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-semibold text-slate-500 tracking-wide">{title}</span>
        <div className={`flex items-center justify-center w-7 h-7 rounded-lg ${iconBg} ${iconColor}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {/* Main KPI Value */}
      <div className="text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
        {value}
      </div>

      {/* Bottom Row: Trend + Wave Sparkline */}
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="flex items-center text-emerald-600 font-bold">
            <span className="text-[10px] mr-0.5">▲</span>
            {trend}
          </span>
          <span className="text-slate-400 font-normal text-[11px] truncate max-w-[120px]">
            {trendSubtext}
          </span>
        </div>

        {/* SVG Sparkline */}
        <div className="w-20 h-7 overflow-visible">
          <svg
            viewBox="0 0 100 35"
            className="w-full h-full overflow-visible"
            fill="none"
          >
            <path
              d={wavePath}
              stroke={waveColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
