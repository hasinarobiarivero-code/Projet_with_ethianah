import React from 'react';
import { Plus, ScanLine, FileDown, ArrowRight, Zap } from 'lucide-react';

export default function QuickActions({
  onCreateOrder,
  onScanPackage,
  onExportReport
}) {
  return (
    <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-800">Actions rapides</h3>
        <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
      </div>

      {/* Action Buttons Stack */}
      <div className="space-y-2.5">
        {/* Action 1: Créer une commande */}
        <button
          onClick={onCreateOrder}
          className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#f2f4ff] hover:bg-[#e8ebff] border border-indigo-100/80 text-indigo-700 transition-all font-semibold text-xs cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center gap-2.5">
            <Plus className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
            <span>Créer une commande</span>
          </div>
          <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Action 2: Scanner un colis */}
        <button
          onClick={onScanPackage}
          className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#eefbf7] hover:bg-[#e2f8f0] border border-emerald-100 text-teal-800 transition-all font-semibold text-xs cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center gap-2.5">
            <ScanLine className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
            <span>Scanner un colis</span>
          </div>
          <ArrowRight className="w-4 h-4 text-teal-500 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Action 3: Exporter le rapport */}
        <button
          onClick={onExportReport}
          className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-white transition-all font-bold text-xs cursor-pointer group shadow-xs hover:shadow-md"
        >
          <div className="flex items-center gap-2.5">
            <FileDown className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <span>Exporter le rapport</span>
          </div>
          <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
