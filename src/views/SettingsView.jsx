import React, { useState } from 'react';
import {
  Save,
  Building,
  Truck,
  CheckCircle2
} from 'lucide-react';

export default function SettingsView({ showToast }) {
  const [formData, setFormData] = useState({
    companyName: 'Transit & Import Express Madagascar (Amazon ➔ Mada)',
    contactEmail: 'contact@transit-madagascar.mg',
    hubAddress: 'Agence Centrale Ankorondrano, Antananarivo 101, Madagascar',
    eoriNumber: 'NIF: 3001928471 / STAT: 52291 / GASYNET',
    defaultCarrier: 'Fret Aérien Express (Paris ➔ Ivato)',
    autoDispatch: true,
    customsNotification: true,
    emailAlerts: true,
    stockAlertThreshold: 5,
    currency: 'MGA'
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (showToast) {
      showToast('Paramètres généraux enregistrés avec succès !');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Paramètres du Système
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Préférences de l'entrepôt, transporteurs par défaut et sécurité opérationnelle.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all cursor-pointer w-fit"
        >
          <Save className="w-4 h-4" />
          <span>Enregistrer les modifications</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Organisation & Hub */}
        <div className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Building className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Coordonnées de l'Organisation & Hub Central</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nom commercial</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email administrateur</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Adresse du hub de départ principal</label>
              <input
                type="text"
                value={formData.hubAddress}
                onChange={(e) => setFormData({ ...formData, hubAddress: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Numéro EORI (Douanes UE)</label>
              <input
                type="text"
                value={formData.eoriNumber}
                onChange={(e) => setFormData({ ...formData, eoriNumber: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Devise par défaut</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
              >
                <option value="MGA">MGA (Ariary) - Madagascar 🇲🇬</option>
                <option value="EUR">EUR (€) - Achats Amazon France</option>
                <option value="USD">USD ($) - Achats Amazon USA</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Logistique & Expéditions */}
        <div className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Truck className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Règles d'Expédition Automatisées</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Transporteur prioritaire par défaut</label>
              <select
                value={formData.defaultCarrier}
                onChange={(e) => setFormData({ ...formData, defaultCarrier: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
              >
                <option value="DHL Express">DHL Express (Recommandé)</option>
                <option value="Colissimo">Colissimo International</option>
                <option value="FedEx">FedEx Priority</option>
                <option value="UPS">UPS Worldwide Express</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Seuil d'alerte stock faible (unités)</label>
              <input
                type="number"
                value={formData.stockAlertThreshold}
                onChange={(e) => setFormData({ ...formData, stockAlertThreshold: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.autoDispatch}
                onChange={(e) => setFormData({ ...formData, autoDispatch: e.target.checked })}
                className="w-4 h-4 rounded-md text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-xs font-medium text-slate-700">
                Génération automatique du bordereau de transport dès validation de commande
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.customsNotification}
                onChange={(e) => setFormData({ ...formData, customsNotification: e.target.checked })}
                className="w-4 h-4 rounded-md text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-xs font-medium text-slate-700">
                Alerter immédiatement l'équipe logistique en cas de retenue en douane
              </span>
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Enregistrer toutes les préférences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
