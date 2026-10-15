import React, { useState } from 'react';
import {
  CreditCard,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { initialPayments } from '../data/mockData';

export default function PaymentsView() {
  const [payments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = payments.filter((p) =>
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Paiements & Règlements
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Passerelles de paiement sécurisées, transactions enregistrées et commissions.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Passerelles chiffrées SSL 256-bit</span>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-xs font-medium text-slate-400">Total encaissé ce mois</span>
          <div className="text-xl font-extrabold text-slate-900 mt-1">284 760 €</div>
        </div>
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-xs font-medium text-slate-400">Taux d'acceptation</span>
          <div className="text-xl font-extrabold text-emerald-600 mt-1">99,8%</div>
        </div>
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-xs font-medium text-slate-400">Frais bancaires moyens</span>
          <div className="text-xl font-extrabold text-slate-700 mt-1">1,35%</div>
        </div>
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-xs font-medium text-slate-400">En cours de compensation</span>
          <div className="text-xl font-extrabold text-amber-600 mt-1">1 245 €</div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par ID transaction, commande, méthode..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Payments Table */}
      <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-3">RÉFÉRENCE</th>
                <th className="py-3 px-3">COMMANDE</th>
                <th className="py-3 px-3">PAYEUR</th>
                <th className="py-3 px-3">MÉTHODE</th>
                <th className="py-3 px-3">DATE & HEURE</th>
                <th className="py-3 px-3 text-right">MONTANT</th>
                <th className="py-3 px-3 text-right">FRAIS</th>
                <th className="py-3 px-3 text-center">STATUT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {filteredPayments.map((pay) => (
                <tr key={pay.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-800">
                    {pay.id}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-indigo-600 hover:underline">
                    {pay.orderId}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-800">
                    {pay.client}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 font-medium">
                      <CreditCard className="w-3.5 h-3.5 text-slate-500" />
                      {pay.method}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 text-[11px]">
                    {pay.date}
                  </td>
                  <td className="py-3.5 px-3 text-right font-extrabold text-slate-900">
                    {pay.amount.toFixed(2)} €
                  </td>
                  <td className="py-3.5 px-3 text-right text-slate-400 font-medium">
                    {pay.fee.toFixed(2)} €
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    {pay.status === 'Validé' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        Validé
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full">
                        <Clock className="w-3 h-3 text-amber-500" />
                        En compensation
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
