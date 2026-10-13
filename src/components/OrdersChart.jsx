import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { chartDatasets } from '../data/mockData';

export default function OrdersChart() {
  const [selectedPeriod, setSelectedPeriod] = useState('7 jours');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const dataset = chartDatasets[selectedPeriod] || chartDatasets['7 jours'];
  const { labels, points, tooltipValue, tooltipLabel } = dataset;

  // Chart coordinate mapping
  const width = 480;
  const height = 180;
  const paddingLeft = 45;
  const paddingRight = 25;
  const paddingTop = 20;
  const paddingBottom = 25;

  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  const yTicks = [
    { label: '80 k€', val: 80 },
    { label: '60 k€', val: 60 },
    { label: '40 k€', val: 40 },
    { label: '20 k€', val: 20 },
  ];

  const coords = points.map((val, idx) => {
    const x = paddingLeft + (idx / (points.length - 1)) * chartW;
    const y = paddingTop + chartH - ((val / 80) * chartH);
    return { x, y, val, label: labels[idx] };
  });

  // Generate smooth SVG Bezier path
  const generateSmoothPath = (pts) => {
    if (pts.length < 2) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const linePath = generateSmoothPath(coords);
  const lastPoint = coords[coords.length - 1];
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${paddingTop + chartH} L ${coords[0].x} ${paddingTop + chartH} Z`;

  return (
    <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Évolution des commandes</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Revenus encaissés sur les {selectedPeriod.toLowerCase()}
          </p>
        </div>

        {/* Period Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer shadow-2xs transition-all"
          >
            <span>{selectedPeriod}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-28 py-1 bg-white rounded-lg shadow-lg border border-slate-100 z-20 text-xs">
              {['7 jours', '14 jours', '30 jours'].map((period) => (
                <button
                  key={period}
                  onClick={() => {
                    setSelectedPeriod(period);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 cursor-pointer ${
                    selectedPeriod === period ? 'text-emerald-600 font-bold' : 'text-slate-600'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SVG Interactive Chart */}
      <div className="relative w-full h-[210px] mt-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="orderChartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines and Y labels */}
          {yTicks.map((tick) => {
            const y = paddingTop + chartH - ((tick.val / 80) * chartH);
            return (
              <g key={tick.val}>
                <text
                  x={paddingLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[9px] fill-slate-300 font-medium select-none"
                >
                  {tick.label}
                </text>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              </g>
            );
          })}

          {/* Area Gradient */}
          <path d={areaPath} fill="url(#orderChartGradient)" />

          {/* Smooth Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Interactive and visible points */}
          {coords.map((pt, i) => (
            <g
              key={i}
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredPoint(pt)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <circle
                cx={pt.x}
                cy={pt.y}
                r="3.5"
                fill="#ffffff"
                stroke="#6366f1"
                strokeWidth="2"
              />
              {/* Invisible larger hit target */}
              <circle cx={pt.x} cy={pt.y} r="12" fill="transparent" />
            </g>
          ))}

          {/* X Axis labels */}
          {coords.map((pt, i) => (
            <text
              key={i}
              x={pt.x}
              y={height - 2}
              textAnchor="middle"
              className="text-[9px] fill-slate-400 font-normal select-none"
            >
              {pt.label}
            </text>
          ))}
        </svg>

        {/* Pinned Callout Badge for "Aujourd'hui" (as in image) */}
        {lastPoint && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-full pointer-events-none transition-all duration-300"
            style={{
              left: `${(lastPoint.x / width) * 100}%`,
              top: `${(lastPoint.y / height) * 100 - 8}%`
            }}
          >
            <div className="relative px-3 py-1 rounded-lg bg-slate-900 text-white shadow-xl text-center">
              <span className="block text-[9px] text-slate-300 uppercase tracking-wider font-semibold">
                {tooltipLabel}
              </span>
              <span className="block text-xs font-bold text-white tracking-tight">
                {hoveredPoint ? `${hoveredPoint.val.toFixed(3).replace('.', ' ')} €` : tooltipValue}
              </span>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-0.5 border-4 border-transparent border-t-slate-900" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
