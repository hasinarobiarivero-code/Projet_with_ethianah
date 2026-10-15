import React, { useState } from 'react';
import { MessageSquare, Star, Send, CheckCircle, Link, ExternalLink, CornerDownRight } from 'lucide-react';

const INITIAL_REVIEWS = [
  {
    id: 1,
    clientName: 'Faly Rakotomalala',
    orderId: 'CMD-MG-84291',
    rating: 5,
    message: 'Livraison très rapide ! Le colis est arrivé en parfait état. Je suis très satisfait du service, je recommande !',
    date: '14 Oct 2026, 09:22',
    adminReply: null,
  },
  {
    id: 2,
    clientName: 'Haingo Razafindrabe',
    orderId: 'CMD-MG-84290',
    rating: 4,
    message: "Bon service dans l'ensemble, juste un léger retard de 2 jours par rapport à la date prévue. Mais le produit est bien emballé.",
    date: '14 Oct 2026, 08:50',
    adminReply: 'Merci pour votre retour ! Le délai est dû à un contrôle douanier exceptionnel. Nous nous excusons pour la gêne.',
  },
  {
    id: 3,
    clientName: 'Tantely Rasoanaivo',
    orderId: 'CMD-MG-84288',
    rating: 3,
    message: "Service correct mais j'aurais aimé avoir plus de mises à jour sur le suivi de mon colis.",
    date: '14 Oct 2026, 07:10',
    adminReply: null,
  },
];

function StarDisplay({ rating, size = 'sm' }) {
  const sz = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star
          key={s}
          className={`${sz} ${s <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
        />
      ))}
    </div>
  );
}

const ratingLabel = (r) => ['', 'Très insatisfait', 'Insatisfait', 'Correct', 'Satisfait', 'Très satisfait'][r];
const ratingColor = (r) => {
  if (r >= 5) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
  if (r >= 4) return 'text-blue-600 bg-blue-50 border-blue-200';
  if (r >= 3) return 'text-amber-600 bg-amber-50 border-amber-200';
  return 'text-rose-600 bg-rose-50 border-rose-200';
};

export default function CommentsView({ reviews, onAddReply, showToast }) {
  const [replyTexts, setReplyTexts] = useState({});
  const [openReplyId, setOpenReplyId] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const clientPageUrl = `${window.location.origin}${window.location.pathname}?client=true`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(clientPageUrl).then(() => {
      setCopiedLink(true);
      if (showToast) showToast('Lien client copié dans le presse-papiers !');
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleSendReply = (id) => {
    const text = (replyTexts[id] || '').trim();
    if (!text) return;
    if (onAddReply) onAddReply(id, text);
    setReplyTexts(prev => ({ ...prev, [id]: '' }));
    setOpenReplyId(null);
    if (showToast) showToast('Réponse envoyée au client.');
  };

  const unanswered = reviews.filter(r => !r.adminReply).length;
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '—';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Commentaires clients
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Avis reçus des clients · Répondez directement depuis cette interface.
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-700">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{avgRating} / 5</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-700">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
            <span>{reviews.length} avis</span>
          </div>
          {unanswered > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 shadow-xs text-xs font-bold text-amber-700">
              <span>{unanswered} sans réponse</span>
            </div>
          )}
        </div>
      </div>

      {/* Client link share */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-[#2f6f52]/5 border border-[#2f6f52]/20 rounded-2xl">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Link className="w-4 h-4 text-[#2f6f52] flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-700">Lien à partager avec vos clients</p>
            <p className="text-[11px] text-slate-400 truncate">{clientPageUrl}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopyLink}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              copiedLink
                ? 'bg-emerald-600 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {copiedLink ? <CheckCircle className="w-3.5 h-3.5" /> : <Link className="w-3.5 h-3.5" />}
            {copiedLink ? 'Copié !' : 'Copier le lien'}
          </button>
          <a
            href={clientPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#2f6f52] bg-white border border-[#2f6f52]/30 rounded-lg hover:bg-[#2f6f52]/5 transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Aperçu
          </a>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <MessageSquare className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm font-medium">Aucun avis client reçu pour l'instant.</p>
            <p className="text-xs mt-1">Partagez le lien ci-dessus avec vos clients.</p>
          </div>
        ) : (
          reviews.map(review => (
            <div
              key={review.id}
              className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden"
            >
              {/* Review header */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-bold text-white text-sm shadow-sm">
                      {review.clientName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{review.clientName}</p>
                      <p className="text-[11px] text-slate-400">{review.orderId} · {review.date}</p>
                    </div>
                  </div>

                  {/* Rating badge */}
                  <div className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-bold ${ratingColor(review.rating)}`}>
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {review.rating}/5
                  </div>
                </div>

                {/* Stars */}
                <StarDisplay rating={review.rating} />
                <p className="text-[11px] text-slate-400 mt-0.5">{ratingLabel(review.rating)}</p>

                {/* Message */}
                <p className="text-sm text-slate-700 leading-relaxed mt-3 bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
                  "{review.message}"
                </p>
              </div>

              {/* Admin reply (if exists) */}
              {review.adminReply && (
                <div className="px-4 pb-4">
                  <div className="flex gap-2 bg-[#2f6f52]/5 border border-[#2f6f52]/15 rounded-xl p-3">
                    <CornerDownRight className="w-3.5 h-3.5 text-[#2f6f52] flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-[#2f6f52] mb-1">Réponse de l'équipe</p>
                      <p className="text-xs text-slate-700 leading-relaxed">{review.adminReply}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Reply area */}
              {!review.adminReply && (
                <div className="border-t border-slate-100 px-4 py-3">
                  {openReplyId === review.id ? (
                    <div className="space-y-2">
                      <textarea
                        rows={2}
                        autoFocus
                        value={replyTexts[review.id] || ''}
                        onChange={e => setReplyTexts(prev => ({ ...prev, [review.id]: e.target.value }))}
                        placeholder="Écrivez votre réponse au client..."
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setOpenReplyId(null)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-500 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
                        >
                          Annuler
                        </button>
                        <button
                          onClick={() => handleSendReply(review.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#2f6f52] rounded-lg hover:bg-[#245841] transition-all cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          Répondre
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setOpenReplyId(review.id)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#2f6f52] hover:text-[#245841] transition-colors cursor-pointer"
                    >
                      <CornerDownRight className="w-3.5 h-3.5" />
                      Répondre à ce client
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
