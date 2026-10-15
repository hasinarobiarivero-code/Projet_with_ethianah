import React, { useState } from 'react';
import {
  Plus,
  Search,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { initialProducts } from '../data/mockData';

export default function CatalogView() {
  const [products] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'High-Tech', 'Informatique', 'Audio', 'Périphériques', 'Accessoires'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const getStockBadge = (status, stock) => {
    if (status === 'Stock critique' || stock <= 3) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-full">
          <AlertCircle className="w-3 h-3 text-rose-500" />
          {stock} restants (Critique)
        </span>
      );
    }
    if (status === 'Stock faible' || stock <= 10) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full">
          <AlertCircle className="w-3 h-3 text-amber-500" />
          {stock} restants (Faible)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full">
        <CheckCircle className="w-3 h-3 text-emerald-500" />
        {stock} en stock
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Catalogue & Niveaux de Stock
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Gestion du stock en entrepôt, fiches produits, prix de vente et marges.
          </p>
        </div>

        <button
          onClick={() => alert("Formulaire d'ajout de produit ouvert")}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter une référence</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-xs font-medium text-slate-400">Total références</span>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{products.length} articles</div>
        </div>
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-xs font-medium text-slate-400">Valeur stock entrepôt</span>
          <div className="text-xl font-extrabold text-emerald-600 mt-1">48 950 €</div>
        </div>
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-xs font-medium text-slate-400">Alertes réassort</span>
          <div className="text-xl font-extrabold text-rose-600 mt-1">2 produits</div>
        </div>
        <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-xs font-medium text-slate-400">Marge brute moyenne</span>
          <div className="text-xl font-extrabold text-indigo-600 mt-1">46,8%</div>
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par libellé ou référence SKU..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl cursor-pointer transition-all ${
                selectedCategory === cat
                  ? 'bg-[#2f6f52] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'Toutes catégories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-3">PRODUIT</th>
                <th className="py-3 px-3">CATÉGORIE</th>
                <th className="py-3 px-3">SKU</th>
                <th className="py-3 px-3 text-right">PRIX VENTE</th>
                <th className="py-3 px-3 text-right">COÛT ACHAT</th>
                <th className="py-3 px-3 text-right">MARGE</th>
                <th className="py-3 px-3 text-center">ÉTAT DU STOCK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {filteredProducts.map((p) => {
                const margin = (((p.price - p.cost) / p.price) * 100).toFixed(1);
                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-slate-900">{p.name}</div>
                      <div className="text-[11px] text-slate-400">Note: ⭐ {p.rating} ({p.sales} vendus)</div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 font-medium">{p.category}</td>
                    <td className="py-3.5 px-3 font-mono text-[11px] text-slate-500">{p.sku}</td>
                    <td className="py-3.5 px-3 text-right font-extrabold text-slate-900">
                      {p.price.toFixed(2)} €
                    </td>
                    <td className="py-3.5 px-3 text-right text-slate-400 font-medium">
                      {p.cost.toFixed(2)} €
                    </td>
                    <td className="py-3.5 px-3 text-right font-bold text-emerald-600">
                      +{margin}%
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      {getStockBadge(p.status, p.stock)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
