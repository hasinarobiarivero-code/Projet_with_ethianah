import React, { useState } from 'react';
import { ArrowRight, Filter, MoreHorizontal, Check, Eye, Trash2, Edit2 } from 'lucide-react';

export default function RecentOrdersTable({
  orders,
  onSelectOrder,
  onDeleteOrder,
  onStatusChange
}) {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const statuses = [
    { key: 'ALL', label: 'Tous les statuts' },
    { key: 'Expédiée', label: 'Expédiée' },
    { key: 'Livrée', label: 'Livrée' },
    { key: 'En transit', label: 'En transit' },
    { key: 'À préparer', label: 'À préparer' },
    { key: 'Contrôle', label: 'Contrôle' },
  ];

  const filteredOrders = filterStatus === 'ALL'
    ? orders
    : orders.filter((o) => o.status === filterStatus);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Expédiée':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Expédiée
          </span>
        );
      case 'Livrée':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Livrée
          </span>
        );
      case 'En transit':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            En transit
          </span>
        );
      case 'À préparer':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            À préparer
          </span>
        );
      case 'Contrôle':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/60 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Contrôle
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 text-xs font-semibold text-slate-600 bg-slate-100 rounded-full">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Commandes récentes</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {filteredOrders.length} {filteredOrders.length > 1 ? 'commandes' : 'commande'} à traiter en priorité
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilterStatus('ALL')}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
          >
            <span>Toutes les commandes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Filter Popover */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border rounded-lg cursor-pointer transition-all ${
                filterStatus !== 'ALL'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filtrer</span>
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-44 py-1 bg-white rounded-xl shadow-xl border border-slate-100 z-30">
                {statuses.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => {
                      setFilterStatus(s.key);
                      setIsFilterOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-left text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <span>{s.label}</span>
                    {filterStatus === s.key && (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[620px]">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-3 px-2">COMMANDE</th>
              <th className="py-3 px-2">CLIENT</th>
              <th className="py-3 px-2">CANAL</th>
              <th className="py-3 px-2">DESTINATION</th>
              <th className="py-3 px-2 text-right">TOTAL</th>
              <th className="py-3 px-2 text-center">STATUT</th>
              <th className="py-3 px-2 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-xs">
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                onClick={() => onSelectOrder(order)}
              >
                {/* Commande ID */}
                <td className="py-3 px-2 font-bold text-indigo-600 hover:underline">
                  {order.id}
                </td>

                {/* Client */}
                <td className="py-3 px-2">
                  <div className="font-semibold text-slate-800">{order.client}</div>
                  <div className="text-[11px] text-slate-400">{order.email}</div>
                </td>

                {/* Canal */}
                <td className="py-3 px-2">
                  <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <span className={`w-1.5 h-1.5 rounded-full ${order.channelColor || 'bg-blue-600'}`}></span>
                    <span>{order.channel}</span>
                  </div>
                </td>

                {/* Destination */}
                <td className="py-3 px-2">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <span className="text-sm">{order.flag}</span>
                    <span>{order.destination}</span>
                  </div>
                </td>

                {/* Total */}
                <td className="py-3 px-2 text-right">
                  <div className="font-bold text-slate-900">
                    {order.total.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                  </div>
                  {order.totalMGA && (
                    <div className="text-[10px] text-emerald-700 font-semibold">{order.totalMGA}</div>
                  )}
                </td>

                {/* Statut Badge */}
                <td className="py-3 px-2 text-center">
                  {getStatusBadge(order.status)}
                </td>

                {/* Actions Dropdown */}
                <td className="py-3 px-2 text-right relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setActiveMenuId(activeMenuId === order.id ? null : order.id)}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {activeMenuId === order.id && (
                    <div className="absolute right-2 top-8 w-44 py-1 bg-white rounded-xl shadow-xl border border-slate-100 z-30 text-xs">
                      <button
                        onClick={() => {
                          onSelectOrder(order);
                          setActiveMenuId(null);
                        }}
                        className="w-full flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Voir les détails</span>
                      </button>
                      <button
                        onClick={() => {
                          onStatusChange(order.id, order.status === 'Livrée' ? 'Expédiée' : 'Livrée');
                          setActiveMenuId(null);
                        }}
                        className="w-full flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Changer statut</span>
                      </button>
                      <div className="my-1 border-t border-slate-100" />
                      <button
                        onClick={() => {
                          onDeleteOrder(order.id);
                          setActiveMenuId(null);
                        }}
                        className="w-full flex items-center gap-2 px-3.5 py-2 text-rose-600 hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
