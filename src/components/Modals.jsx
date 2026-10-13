import React, { useState } from 'react';
import {
  X,
  Plus,
  Package,
  User,
  Mail,
  MapPin,
  DollarSign,
  Truck,
  ScanLine,
  CheckCircle,
  FileText,
  Printer,
  Search,
  ExternalLink
} from 'lucide-react';

/* --- MODAL CRÉER UNE COMMANDE --- */
export function CreateOrderModal({ isOpen, onClose, onAddOrder }) {
  const [formData, setFormData] = useState({
    client: '',
    email: '',
    destination: 'Paris, FR',
    flag: '🇫🇷',
    channel: 'Web',
    total: '',
    status: 'À préparer',
    carrier: 'DHL Express',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.client || !formData.total) return;

    const newOrder = {
      id: `GS-${Math.floor(84292 + Math.random() * 1000)}`,
      client: formData.client,
      email: formData.email || `${formData.client.toLowerCase().replace(/\s+/g, '.')}@mail.com`,
      channel: formData.channel,
      channelColor: formData.channel === 'App' ? 'bg-purple-600' : formData.channel === 'Amazon' ? 'bg-amber-500' : 'bg-blue-600',
      destination: formData.destination,
      flag: formData.flag,
      total: parseFloat(formData.total),
      status: formData.status,
      date: new Date().toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }),
      carrier: formData.carrier,
      trackingNumber: `TRK-${Math.floor(100000000 + Math.random() * 900000000)}`,
      items: [{ name: 'Produit logistique premium', qty: 1, price: parseFloat(formData.total) }]
    };

    onAddOrder(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Créer une nouvelle commande</h3>
              <p className="text-xs text-slate-500">Ajout immédiat au registre d'expédition</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nom du client</label>
              <input
                type="text"
                required
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="Ex: Camille Dubois"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="client@domaine.com"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Destination</label>
              <select
                value={formData.destination}
                onChange={(e) => {
                  const flags = { 'Paris, FR': '🇫🇷', 'Berlin, DE': '🇩🇪', 'Londres, GB': '🇬🇧', 'Madrid, ES': '🇪🇸', 'Milan, IT': '🇮🇹', 'Dubaï, AE': '🇦🇪' };
                  setFormData({ ...formData, destination: e.target.value, flag: flags[e.target.value] || '🌐' });
                }}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
              >
                <option value="Paris, FR">🇫🇷 Paris, FR</option>
                <option value="Berlin, DE">🇩🇪 Berlin, DE</option>
                <option value="Londres, GB">🇬🇧 Londres, GB</option>
                <option value="Madrid, ES">🇪🇸 Madrid, ES</option>
                <option value="Milan, IT">🇮🇹 Milan, IT</option>
                <option value="Dubaï, AE">🇦🇪 Dubaï, AE</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Canal</label>
              <select
                value={formData.channel}
                onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
              >
                <option value="Web">Boutique Web</option>
                <option value="App">Application Mobile</option>
                <option value="Amazon">Amazon Marketplace</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Total (€)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.total}
                onChange={(e) => setFormData({ ...formData, total: e.target.value })}
                placeholder="249.50"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Transporteur</label>
              <select
                value={formData.carrier}
                onChange={(e) => setFormData({ ...formData, carrier: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
              >
                <option value="DHL Express">DHL Express</option>
                <option value="Colissimo">Colissimo</option>
                <option value="FedEx">FedEx International</option>
                <option value="UPS">UPS Worldwide</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Statut initial</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
              >
                <option value="À préparer">À préparer</option>
                <option value="En transit">En transit</option>
                <option value="Expédiée">Expédiée</option>
                <option value="Livrée">Livrée</option>
                <option value="Contrôle">Contrôle</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl cursor-pointer shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Enregistrer la commande</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* --- MODAL DÉTAILS DE COMMANDE --- */
export function OrderDetailsModal({ order, isOpen, onClose, onUpdateStatus }) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-800">Commande {order.id}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  {order.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">Enregistrée le {order.date}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Customer & Shipping Summary */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 font-medium">Client</span>
              <p className="font-bold text-slate-800 mt-0.5">{order.client}</p>
              <p className="text-slate-500">{order.email}</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Destination</span>
              <p className="font-bold text-slate-800 mt-0.5 flex items-center gap-1">
                <span>{order.flag}</span> {order.destination}
              </p>
              <p className="text-slate-500">Transporteur: {order.carrier || 'DHL Express'}</p>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Articles commandés</h4>
            <div className="border border-slate-100 rounded-xl divide-y divide-slate-100 overflow-hidden text-xs">
              {(order.items || [{ name: 'Produit standard', qty: 1, price: order.total }]).map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3">
                  <div className="font-medium text-slate-800">
                    {item.name} <span className="text-slate-400 font-normal">× {item.qty}</span>
                  </div>
                  <div className="font-bold text-slate-900">
                    {(item.price * item.qty).toFixed(2)} €
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between p-3 bg-slate-50/70 font-bold text-sm">
                <span>Montant Total</span>
                <span className="text-emerald-700 font-extrabold">{order.total.toFixed(2)} €</span>
              </div>
            </div>
          </div>

          {/* Tracking Barcode Visual */}
          <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/40 text-center">
            <div className="text-[11px] font-semibold text-slate-500 mb-1">
              Numéro de suivi: {order.trackingNumber || `EXP-${order.id}`}
            </div>
            {/* Simulated barcode */}
            <div className="flex justify-center items-center gap-1 h-8 my-2">
              {[4, 2, 6, 2, 8, 4, 2, 7, 3, 5, 2, 8, 3, 6, 2, 4, 7, 2, 5, 3, 6, 2].map((w, idx) => (
                <div key={idx} className="bg-slate-800 h-full" style={{ width: `${w * 1.5}px` }}></div>
              ))}
            </div>
          </div>

          {/* Status Changer */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-semibold text-slate-600">Modifier le statut :</span>
            <div className="flex gap-1.5 flex-wrap">
              {['À préparer', 'En transit', 'Expédiée', 'Livrée', 'Contrôle'].map((st) => (
                <button
                  key={st}
                  onClick={() => onUpdateStatus(order.id, st)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium cursor-pointer transition-all ${
                    order.status === st
                      ? 'bg-slate-900 text-white shadow-xs font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-3.5 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimer étiquette</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-xl cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

/* --- MODAL SCANNER DE COLIS --- */
export function ScanModal({ isOpen, onClose, orders, onSelectOrder }) {
  const [scanCode, setScanCode] = useState('');
  const [foundOrder, setFoundOrder] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleScan = (codeToSearch) => {
    const query = (codeToSearch || scanCode).trim().toLowerCase();
    setHasSearched(true);
    const result = orders.find(
      (o) =>
        o.id.toLowerCase().includes(query) ||
        (o.trackingNumber && o.trackingNumber.toLowerCase().includes(query)) ||
        o.client.toLowerCase().includes(query)
    );
    setFoundOrder(result || null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-100 text-teal-700">
              <ScanLine className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Scanner un colis</h3>
              <p className="text-xs text-slate-400">Reconnaissance de code-barres / QR</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Simulated Scanner Viewport */}
          <div className="relative h-44 rounded-2xl bg-slate-950 flex flex-col items-center justify-center text-white overflow-hidden border-2 border-emerald-500/50">
            {/* Laser Line Animation */}
            <div className="absolute inset-x-0 h-0.5 bg-emerald-400 shadow-[0_0_12px_#34d399] animate-bounce"></div>
            
            <ScanLine className="w-12 h-12 text-emerald-400/80 mb-2" />
            <p className="text-xs font-semibold text-emerald-200">Viseur optique prêt</p>
            <p className="text-[10px] text-slate-400 mt-1">Placez l'étiquette face à la caméra ou saisissez le code</p>
          </div>

          {/* Quick code triggers */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Exemples rapides :</span>
            <button
              onClick={() => { setScanCode('GS-84289'); handleScan('GS-84289'); }}
              className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold cursor-pointer"
            >
              GS-84289
            </button>
            <button
              onClick={() => { setScanCode('GS-84291'); handleScan('GS-84291'); }}
              className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold cursor-pointer"
            >
              GS-84291
            </button>
          </div>

          {/* Input field */}
          <div className="flex gap-2">
            <input
              type="text"
              value={scanCode}
              onChange={(e) => setScanCode(e.target.value)}
              placeholder="Code colis ou n° de suivi..."
              className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
            <button
              onClick={() => handleScan()}
              className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl cursor-pointer"
            >
              Vérifier
            </button>
          </div>

          {/* Search Result */}
          {hasSearched && (
            <div className="mt-2">
              {foundOrder ? (
                <div
                  onClick={() => {
                    onSelectOrder(foundOrder);
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between cursor-pointer hover:bg-emerald-100/70 transition-colors"
                >
                  <div>
                    <span className="text-xs font-bold text-emerald-900">{foundOrder.id} - {foundOrder.client}</span>
                    <p className="text-[11px] text-emerald-700">Statut: {foundOrder.status} • {foundOrder.destination}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">Voir →</span>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 text-center font-medium">
                  Aucun colis trouvé pour le code "{scanCode}".
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* --- MODAL RECHERCHE GLOBALE (CMD+K) --- */
export function GlobalSearchModal({ isOpen, onClose, orders, onSelectOrder }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? orders.filter(
        (o) =>
          o.id.toLowerCase().includes(query.toLowerCase()) ||
          o.client.toLowerCase().includes(query.toLowerCase()) ||
          o.destination.toLowerCase().includes(query.toLowerCase()) ||
          o.status.toLowerCase().includes(query.toLowerCase())
      )
    : orders;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une commande, un client, un pays..."
            className="w-full text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-50">
          {results.length > 0 ? (
            results.map((o) => (
              <div
                key={o.id}
                onClick={() => {
                  onSelectOrder(o);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{o.flag}</span>
                  <div>
                    <span className="text-xs font-bold text-slate-800">{o.client}</span>
                    <span className="text-xs text-indigo-600 font-semibold ml-2">({o.id})</span>
                    <p className="text-[11px] text-slate-400">{o.destination} • {o.channel}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-900">{o.total.toFixed(2)} €</span>
                  <p className="text-[11px] text-emerald-600 font-medium">{o.status}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              Aucun résultat pour "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
