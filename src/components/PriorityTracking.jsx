import React from 'react';
import { ArrowRight, MapPin, Truck, ExternalLink } from 'lucide-react';

export default function PriorityTracking({ onOpenDetails }) {
  return (
    <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">Suivi prioritaire</h3>
          <button
            onClick={onOpenDetails}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
          >
            <span>Détails</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">Colis #GS-84289 - DHL Express</p>
      </div>

      {/* Visual Tracking Route */}
      <div className="relative py-4 my-2">
        {/* SVG Route Wave */}
        <div className="w-full h-16">
          <svg viewBox="0 0 320 60" className="w-full h-full overflow-visible" fill="none">
            {/* Background Path */}
            <path
              d="M 20 40 Q 90 10, 160 40 T 300 20"
              stroke="#e2e8f0"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Progress Path */}
            <path
              d="M 20 40 Q 90 10, 160 40"
              stroke="#6366f1"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Stop 1: Paris */}
            <circle cx="20" cy="40" r="5" fill="#6366f1" />
            <circle cx="20" cy="40" r="2.5" fill="#ffffff" />

            {/* Stop 2: Leipzig (Active transit node with pulse) */}
            <circle cx="160" cy="40" r="9" fill="#6366f1" fillOpacity="0.2">
              <animate attributeName="r" values="6;11;6" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="160" cy="40" r="5" fill="#6366f1" />
            <circle cx="160" cy="40" r="2" fill="#ffffff" />

            {/* Stop 3: Londres */}
            <circle cx="300" cy="20" r="5" fill="#cbd5e1" />
            <circle cx="300" cy="20" r="2.5" fill="#ffffff" />
          </svg>
        </div>

        {/* City Labels */}
        <div className="flex justify-between text-[11px] font-medium text-slate-500 px-1 -mt-2">
          <span>Paris</span>
          <span className="font-bold text-indigo-600">Leipzig</span>
          <span>Londres</span>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          En transit
        </span>
      </div>

      {/* Footer Info */}
      <div className="flex items-end justify-between pt-2 border-t border-slate-100 text-xs">
        <div>
          <span className="block text-[11px] text-slate-400">Départ du hub international</span>
        </div>
        <div className="text-right">
          <span className="block text-[11px] text-slate-400">Arrivée estimée</span>
          <span className="font-bold text-slate-900 text-xs">Demain, 14:30</span>
        </div>
      </div>
    </div>
  );
}
