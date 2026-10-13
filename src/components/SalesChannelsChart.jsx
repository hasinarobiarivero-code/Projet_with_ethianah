import React, { useState } from 'react';
import { salesChannels } from '../data/mockData';

export default function SalesChannelsChart() {
  const [hoveredChannel, setHoveredChannel] = useState(null);

  // Donut chart calculations
  const size = 170;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="mb-2">
        <h3 className="text-sm font-bold text-slate-800">Canaux de vente</h3>
        <p className="text-xs text-slate-400 mt-0.5">Part du chiffre d'affaires</p>
      </div>

      {/* Donut Chart with Center Text */}
      <div className="relative flex items-center justify-center my-3">
        <svg width={size} height={size} className="transform -rotate-90 overflow-visible">
          {salesChannels.map((channel, i) => {
            const strokeDasharray = `${(channel.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
            accumulatedPercent += channel.percentage;

            const isHovered = hoveredChannel === channel.name;

            return (
              <circle
                key={channel.name}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={channel.color}
                strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredChannel(channel.name)}
                onMouseLeave={() => setHoveredChannel(null)}
              />
            );
          })}
        </svg>

        {/* Center Total Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">
            {hoveredChannel
              ? salesChannels.find(c => c.name === hoveredChannel)?.amount
              : '284,8 k€'}
          </span>
          <span className="text-[10px] font-bold text-slate-400 tracking-wider mt-1 uppercase">
            {hoveredChannel || 'TOTAL'}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 gap-1.5 pt-1">
        {salesChannels.map((channel) => (
          <div
            key={channel.name}
            className={`flex items-center justify-between text-xs py-1 px-2 rounded-lg transition-colors cursor-pointer ${
              hoveredChannel === channel.name ? 'bg-slate-50 font-bold' : ''
            }`}
            onMouseEnter={() => setHoveredChannel(channel.name)}
            onMouseLeave={() => setHoveredChannel(null)}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: channel.color }}
              />
              <span className="text-slate-600 font-medium text-xs">{channel.name}</span>
            </div>
            <span className="font-bold text-slate-800 text-xs">{channel.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
