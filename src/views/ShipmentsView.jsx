import React, { useState } from 'react';
import {
  Plane,
  Ship,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ScanLine
} from 'lucide-react';
import { initialShipments } from '../data/mockData';

export default function ShipmentsView({ onOpenScan }) {
  const [shipments] = useState(initialShipments);
  const [filterMode, setFilterMode] = useState('ALL');

  const filteredShipments = shipments.filter((s) => {
    if (filterMode === 'ALL') return true;
    if (filterMode === 'CHINA') return s.sourceMarket.toLowerCase().includes('1688') || s.sourceMarket.toLowerCase().includes('alibaba');
    if (filterMode === 'AIR') return s.service.toLowerCase().includes('aérien');
    if (filterMode === 'SEA') return s.service.toLowerCase().includes('maritime');
    if (filterMode === 'CUSTOMS') return s.status === 'Contrôle';
    if (filterMode === 'READY') return s.status === 'Livrée' || s.destination.includes('Agence');
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Expéditions & Fret vers Madagascar 🇲🇬
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Gestion du transit des colis commandés en Chine (1688, Alibaba), Europe (Amazon) et USA vers Madagascar.
          </p>
        </div>

        <button
          onClick={onOpenScan}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#2f6f52] hover:bg-[#255841] rounded-xl shadow-xs transition-all cursor-pointer w-fit"
        >
          <ScanLine className="w-4 h-4" />
          <span>Scanner colis à l'arrivée (Ivato / Agence)</span>
        </button>
      </div>

      {/* KPI Stats adaptés à Madagascar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-teal-100 text-teal-700">
            <Plane className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-400">Colis en vol vers Ivato</span>
            <div className="text-xl font-extrabold text-slate-900">28 colis</div>
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700">
            <Ship className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-400">En mer (Port Toamasina)</span>
            <div className="text-xl font-extrabold text-indigo-600">14 colis</div>
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-100 text-rose-600">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-400">Dédouanement en cours</span>
            <div className="text-xl font-extrabold text-rose-600">1 dossier</div>
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-400">Prêt en agence / Livré</span>
            <div className="text-xl font-extrabold text-emerald-600">96,8% livré</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs by Transit Mode */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { key: 'ALL', label: 'Toutes les expéditions' },
          { key: 'CHINA', label: '🇨🇳 Chine (1688 / Alibaba)' },
          { key: 'AIR', label: '✈️ Fret Aérien (Express Ivato)' },
          { key: 'SEA', label: '🚢 Fret Maritime (Toamasina)' },
          { key: 'CUSTOMS', label: '⚠️ Dédouanement Ivato' },
          { key: 'READY', label: '✅ Prêt en agence Tana' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilterMode(f.key)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl cursor-pointer transition-all whitespace-nowrap ${
              filterMode === f.key
                ? 'bg-[#2f6f52] text-white shadow-xs font-extrabold'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Shipments Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredShipments.map((s) => (
          <div
            key={s.id}
            className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{s.service}</span>
                  <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    Source : {s.sourceMarket || 'Amazon'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Commande client : <strong className="text-indigo-600 font-semibold">{s.orderId}</strong> • Poids : {s.weight}
                </p>
              </div>

              <span
                className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                  s.statusColor === 'emerald'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : s.statusColor === 'amber'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : s.statusColor === 'rose'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}
              >
                {s.status}
              </span>
            </div>

            {/* Route visual : Hub France ➔ Acheminement ➔ Madagascar */}
            <div className="my-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                <span className="flex items-center gap-1 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {s.origin}
                </span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  {s.destination}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    s.statusColor === 'emerald' ? 'bg-emerald-500' : 'bg-[#10b981]'
                  }`}
                  style={{ width: `${s.progress}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                <span>Statut réel : <strong>{s.currentLocation}</strong></span>
                <span className="font-bold text-slate-700">{s.progress}%</span>
              </div>
            </div>

            {/* Footer ETA & Transporteur */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Arrivée : <strong className="text-slate-800">{s.eta}</strong>
              </span>

              <button
                onClick={() => alert(`Bordereau GASYNET / Transit pour ${s.orderId}`)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Bordereau Transit</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
