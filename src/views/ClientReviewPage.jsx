import React, { useState } from 'react';
import { Star, Send, CheckCircle, Globe, Package } from 'lucide-react';

const ORDERS_FOR_CLIENT = [
  { id: 'CMD-MG-84291', label: 'CMD-MG-84291 — Montres Connectées' },
  { id: 'CMD-MG-84290', label: 'CMD-MG-84290 — Casque Audio ANC' },
  { id: 'CMD-MG-84289', label: 'CMD-MG-84289 — Matériel Informatique' },
  { id: 'CMD-MG-84288', label: 'CMD-MG-84288 — Accessoires Électroniques' },
  { id: 'CMD-MG-84287', label: 'CMD-MG-84287 — Équipement Réseau' },
  { id: 'CMD-MG-84286', label: 'CMD-MG-84286 — Colis Vêtements & Chaussures' },
];

export default function ClientReviewPage({ onSubmitReview }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [message, setMessage] = useState('');
  const [clientName, setClientName] = useState('');
  const [orderId, setOrderId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!rating || !message.trim() || !clientName.trim() || !orderId) return;

    const review = {
      id: Date.now(),
      clientName: clientName.trim(),
      orderId,
      rating,
      message: message.trim(),
      date: new Date().toLocaleString('fr-FR', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }),
      adminReply: null,
    };

    if (onSubmitReview) onSubmitReview(review);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mx-auto">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Merci pour votre avis !</h2>
          <p className="text-sm text-slate-500">
            Votre commentaire a bien été envoyé. Notre équipe en prendra connaissance et vous répondra si nécessaire.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setRating(0);
              setMessage('');
              setClientName('');
              setOrderId('');
            }}
            className="mt-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-all cursor-pointer"
          >
            Laisser un autre avis
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 px-4 py-10">
      {/* Brand header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#2f6f52] shadow-lg">
          <Globe className="w-6 h-6 text-emerald-200" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Transit Mondial</p>
          <p className="text-base font-extrabold text-slate-800 leading-tight">Votre avis compte 🇲🇬</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-xl font-extrabold text-slate-900">Évaluez votre expérience</h1>
          <p className="text-xs text-slate-400 mt-1">Quelques secondes pour nous aider à nous améliorer</p>
        </div>

        {/* Client name */}
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Votre nom</label>
          <input
            type="text"
            value={clientName}
            onChange={e => setClientName(e.target.value)}
            placeholder="Ex : Faly Rakotomalala"
            className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Order */}
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Votre commande</label>
          <div className="relative">
            <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={orderId}
              onChange={e => setOrderId(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 appearance-none"
            >
              <option value="">— Sélectionner votre commande —</option>
              {ORDERS_FOR_CLIENT.map(o => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Star rating */}
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Note globale</label>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                className="transition-transform hover:scale-110 cursor-pointer"
              >
                <Star
                  className={`w-9 h-9 transition-colors ${
                    star <= (hovered || rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-200'
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-center text-xs text-slate-400 mt-1.5">
              {['', 'Très insatisfait', 'Insatisfait', 'Correct', 'Satisfait', 'Très satisfait'][rating]}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">Votre message</label>
          <textarea
            rows={4}
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Décrivez votre expérience : délai de livraison, état du colis, service client..."
            className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!rating || !message.trim() || !clientName.trim() || !orderId}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-[#2f6f52] rounded-xl hover:bg-[#245841] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          <Send className="w-4 h-4" />
          Envoyer mon avis
        </button>
      </div>

      <p className="mt-6 text-[11px] text-slate-400 text-center">
        Transit Mondial Madagascar · Vos données restent confidentielles
      </p>
    </div>
  );
}
