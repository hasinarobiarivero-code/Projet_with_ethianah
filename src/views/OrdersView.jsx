import React, { useState } from 'react';
import {
  Search,
  Plus,
  FileDown,
  MoreHorizontal,
  Eye,
  CheckCircle
} from 'lucide-react';

export default function OrdersView({
  orders,
  onSelectOrder,
  onCreateOrder,
  onExportReport,
  onUpdateStatus,
  onDeleteOrder
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [activeMenuId, setActiveMenuId] = useState(null);

  const statuses = [
    { key: 'ALL', label: 'Toutes les commandes' },
    { key: 'À préparer', label: 'À préparer' },
    { key: 'En transit', label: 'En transit' },
    { key: 'Expédiée', label: 'Expédiée' },
    { key: 'Livrée', label: 'Livrée' },
    { key: 'Contrôle', label: 'Contrôle' },
  ];

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || o.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Gestion des Commandes
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Gestion centralisée des commandes d'importation Amazon (France & USA) à destination de Madagascar 🇲🇬
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExportReport}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-2xs transition-all cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-slate-500" />
            <span>Exporter CSV</span>
          </button>
          <button
            onClick={onCreateOrder}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Créer une commande</span>
          </button>
        </div>
      </div>

      {/* Mini Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-xs font-medium text-slate-400">Total commandes</span>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{orders.length}</div>
        </div>
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-xs font-medium text-slate-400">En transit</span>
          <div className="text-xl font-extrabold text-amber-600 mt-1">
            {orders.filter((o) => o.status === 'En transit').length}
          </div>
        </div>
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-xs font-medium text-slate-400">À préparer</span>
          <div className="text-xl font-extrabold text-blue-600 mt-1">
            {orders.filter((o) => o.status === 'À préparer').length}
          </div>
        </div>
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-xs font-medium text-slate-400">Livrées avec succès</span>
          <div className="text-xl font-extrabold text-emerald-600 mt-1">
            {orders.filter((o) => o.status === 'Livrée').length}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par n° de commande, client, ville..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {statuses.map((st) => (
              <button
                key={st.key}
                onClick={() => setSelectedStatus(st.key)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                  selectedStatus === st.key
                    ? 'bg-[#2f6f52] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-3">COMMANDE</th>
                <th className="py-3 px-3">CLIENT</th>
                <th className="py-3 px-3">CANAL</th>
                <th className="py-3 px-3">DESTINATION</th>
                <th className="py-3 px-3">DATE</th>
                <th className="py-3 px-3 text-right">TOTAL</th>
                <th className="py-3 px-3 text-center">STATUT</th>
                <th className="py-3 px-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => onSelectOrder(order)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-3 font-bold text-indigo-600 hover:underline">
                    {order.id}
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="font-semibold text-slate-800">{order.client}</div>
                    <div className="text-[11px] text-slate-400">{order.email}</div>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <span className={`w-1.5 h-1.5 rounded-full ${order.channelColor || 'bg-blue-600'}`}></span>
                      <span>{order.channel}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <span className="text-sm">{order.flag}</span>
                      <span>{order.destination}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 text-[11px]">
                    {order.date}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="font-bold text-slate-900">
                      {order.total.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                    </div>
                    {order.totalMGA && (
                      <div className="text-[10px] text-emerald-700 font-semibold">{order.totalMGA}</div>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="py-3.5 px-3 text-right relative" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setActiveMenuId(activeMenuId === order.id ? null : order.id)}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {activeMenuId === order.id && (
                      <div className="absolute right-3 top-9 w-44 py-1 bg-white rounded-xl shadow-xl border border-slate-100 z-30 text-xs text-left">
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
                            onUpdateStatus(order.id, order.status === 'Livrée' ? 'Expédiée' : 'Livrée');
                            setActiveMenuId(null);
                          }}
                          className="w-full flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 cursor-pointer"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Marquer {order.status === 'Livrée' ? 'Expédiée' : 'Livrée'}</span>
                        </button>
                        <div className="my-1 border-t border-slate-100" />
                        <button
                          onClick={() => {
                            onDeleteOrder(order.id);
                            setActiveMenuId(null);
                          }}
                          className="w-full px-3.5 py-2 text-rose-600 hover:bg-rose-50 cursor-pointer font-medium"
                        >
                          Supprimer commande
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
    </div>
  );
}
