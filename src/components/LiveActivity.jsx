import React from 'react';
import { ArrowRight, CheckCircle2, CreditCard, AlertTriangle, UserPlus } from 'lucide-react';

export default function LiveActivity({ activities, onOpenJournal }) {
  const getIcon = (type) => {
    switch (type) {
      case 'delivery':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-purple-600" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      case 'user':
        return <UserPlus className="w-4 h-4 text-blue-600" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Activité en direct</h3>
          <p className="text-xs text-slate-400 mt-0.5">Événements sur l'ensemble du réseau</p>
        </div>
        <button
          onClick={onOpenJournal}
          className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
        >
          <span>Journal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-start justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className={`flex items-center justify-center w-8 h-8 rounded-xl shrink-0 ${act.iconBg}`}>
                {getIcon(act.type)}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 leading-snug">{act.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{act.details}</p>
              </div>
            </div>

            {/* Red alert dot if needed (as in the image for douane) */}
            {act.badge === 'red' && (
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-2"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
