import React, { useState } from 'react';
import {
  Search,
  Plus,
  Mail,
  Phone
} from 'lucide-react';
import { initialClients } from '../data/mockData';

export default function ClientsView() {
  const [clients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'ALL' || c.type.includes(selectedType);
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Répertoire Clients
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Gestion des comptes clients, segments professionnels et historiques d'achats.
          </p>
        </div>

        <button
          onClick={() => alert("Formulaire d'ajout client ouvert")}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau client</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-xs font-medium text-slate-400">Total clients actifs</span>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{clients.length}</div>
        </div>
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-xs font-medium text-slate-400">Clients VIP & Pro</span>
          <div className="text-xl font-extrabold text-indigo-600 mt-1">
            {clients.filter(c => c.status === 'VIP').length}
          </div>
        </div>
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-xs font-medium text-slate-400">Dépense cumulée</span>
          <div className="text-xl font-extrabold text-emerald-600 mt-1">21 321 €</div>
        </div>
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-xs font-medium text-slate-400">Taux de réachat</span>
          <div className="text-xl font-extrabold text-teal-600 mt-1">74,2%</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par nom, email, pays..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {['ALL', 'Particulier', 'Professionnel', 'VIP'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl cursor-pointer transition-all ${
                selectedType === type
                  ? 'bg-[#2f6f52] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type === 'ALL' ? 'Tous' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Clients Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-[#2f6f52] font-bold text-sm">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{client.name}</h3>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <span>{client.flag}</span> {client.city}, {client.country}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 text-[11px] font-bold rounded-full ${
                    client.status === 'VIP'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {client.type}
                </span>
              </div>

              {/* Contact info */}
              <div className="space-y-1.5 my-3 text-xs text-slate-600 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{client.phone}</span>
                </div>
              </div>
            </div>

            {/* Bottom summary */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <div>
                <span className="block text-[10px] text-slate-400">Total dépensé</span>
                <span className="font-extrabold text-slate-900">
                  {client.totalSpent.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                </span>
              </div>

              <div className="text-right">
                <span className="block text-[10px] text-slate-400">Commandes</span>
                <span className="font-bold text-indigo-600">{client.ordersCount} passées</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
