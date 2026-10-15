import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Layers
} from 'lucide-react';

export default function SalesChannelsChart() {
  // Periode active: 'jour', 'semaine', ou 'mois'
  const [period, setPeriod] = useState('jour');
  const [showChannelDetail, setShowChannelDetail] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Données financières précises pour Jour, Semaine et Mois
  const financialPeriods = {
    jour: {
      periodLabel: "Aujourd'hui (24h)",
      profit: "+4 850 €",
      loss: "-380 €",
      revenue: "8 340 €",
      margin: "58,2%",
      centerLabel: "BÉNÉFICE JOUR",
      centerValue: "+4 850 €",
      breakdown: [
        { name: "Bénéfice net", amount: "+4 850 €", percentage: 58, color: "#10b981", type: "profit" },
        { name: "Coûts de revient", amount: "-2 350 €", percentage: 28, color: "#4f46e5", type: "cost" },
        { name: "Frais logistiques", amount: "-760 €", percentage: 9, color: "#f59e0b", type: "shipping" },
        { name: "Pertes & retours", amount: "-380 €", percentage: 5, color: "#f43f5e", type: "loss" }
      ],
      channels: [
        { name: "Boutique web", profit: "+2 420 €", loss: "-180 €", margin: "56%", color: "#4f46e5" },
        { name: "Application", profit: "+1 560 €", loss: "-90 €", margin: "62%", color: "#06b6d4" },
        { name: "Marketplaces", profit: "+610 €", loss: "-80 €", margin: "47%", color: "#f59e0b" },
        { name: "Partenaires", profit: "+260 €", loss: "-30 €", margin: "64%", color: "#10b981" }
      ]
    },
    semaine: {
      periodLabel: "Cette semaine (7 jours)",
      profit: "+36 400 €",
      loss: "-2 850 €",
      revenue: "66 429 €",
      margin: "54,8%",
      centerLabel: "BÉNÉFICE SEMAINE",
      centerValue: "+36,4 k€",
      breakdown: [
        { name: "Bénéfice net", amount: "+36 400 €", percentage: 55, color: "#10b981", type: "profit" },
        { name: "Coûts de revient", amount: "-18 600 €", percentage: 28, color: "#4f46e5", type: "cost" },
        { name: "Frais logistiques", amount: "-8 579 €", percentage: 13, color: "#f59e0b", type: "shipping" },
        { name: "Pertes & retours", amount: "-2 850 €", percentage: 4, color: "#f43f5e", type: "loss" }
      ],
      channels: [
        { name: "Boutique web", profit: "+17 800 €", loss: "-1 320 €", margin: "55%", color: "#4f46e5" },
        { name: "Application", profit: "+10 900 €", loss: "-640 €", margin: "60%", color: "#06b6d4" },
        { name: "Marketplaces", profit: "+5 100 €", loss: "-680 €", margin: "46%", color: "#f59e0b" },
        { name: "Partenaires", profit: "+2 600 €", loss: "-210 €", margin: "62%", color: "#10b981" }
      ]
    },
    mois: {
      periodLabel: "Ce mois (30 jours)",
      profit: "+156 640 €",
      loss: "-14 220 €",
      revenue: "284 760 €",
      margin: "55,0%",
      centerLabel: "BÉNÉFICE MOIS",
      centerValue: "+156,6 k€",
      breakdown: [
        { name: "Bénéfice net", amount: "+156 640 €", percentage: 55, color: "#10b981", type: "profit" },
        { name: "Coûts de revient", amount: "-79 730 €", percentage: 28, color: "#4f46e5", type: "cost" },
        { name: "Frais logistiques", amount: "-34 170 €", percentage: 12, color: "#f59e0b", type: "shipping" },
        { name: "Pertes & retours", amount: "-14 220 €", percentage: 5, color: "#f43f5e", type: "loss" }
      ],
      channels: [
        { name: "Boutique web", profit: "+74 200 €", loss: "-5 200 €", margin: "54%", color: "#4f46e5" },
        { name: "Application", profit: "+46 800 €", loss: "-2 400 €", margin: "59%", color: "#06b6d4" },
        { name: "Marketplaces", profit: "+23 500 €", loss: "-5 120 €", margin: "48%", color: "#f59e0b" },
        { name: "Partenaires", profit: "+12 140 €", loss: "-1 500 €", margin: "61%", color: "#10b981" }
      ]
    }
  };

  const current = financialPeriods[period];

  // Calculs Donut Chart SVG
  const size = 150;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const donutSegments = current.breakdown.map((item, index) => {
    const previousTotal = current.breakdown
      .slice(0, index)
      .reduce((sum, currentItem) => sum + currentItem.percentage, 0);

    return {
      ...item,
      strokeDasharray: `${(item.percentage / 100) * circumference} ${circumference}`,
      strokeDashoffset: -((previousTotal / 100) * circumference)
    };
  });

  return (
    <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs flex flex-col justify-between overflow-hidden">
      {/* 1. Header du composant */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <span>Bénéfices & Pertes</span>
              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
                P&L
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{current.periodLabel}</p>
          </div>
        </div>

        {/* Sélecteur de période temporel : 100% largeur avec grille 3 colonnes, sans aucun débordement */}
        <div className="w-full grid grid-cols-3 gap-1 p-1 mb-3 bg-slate-100 rounded-xl text-xs font-bold shadow-inner">
          <button
            type="button"
            onClick={() => { setPeriod('jour'); setHoveredItem(null); }}
            className={`py-1.5 px-2 text-center rounded-lg transition-all cursor-pointer truncate ${
              period === 'jour'
                ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Jour
          </button>
          <button
            type="button"
            onClick={() => { setPeriod('semaine'); setHoveredItem(null); }}
            className={`py-1.5 px-2 text-center rounded-lg transition-all cursor-pointer truncate ${
              period === 'semaine'
                ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semaine
          </button>
          <button
            type="button"
            onClick={() => { setPeriod('mois'); setHoveredItem(null); }}
            className={`py-1.5 px-2 text-center rounded-lg transition-all cursor-pointer truncate ${
              period === 'mois'
                ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mois
          </button>
        </div>

        {/* 2. Cartouches Bénéfice vs Perte pour la période */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {/* Bénéfice Net */}
          <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-bold text-emerald-800">
              <span>Bénéfice net</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            </div>
            <div className="text-base font-extrabold text-emerald-700 tracking-tight mt-1 truncate">
              {current.profit}
            </div>
            <span className="text-[10px] text-emerald-600 font-medium mt-0.5 truncate">
              Marge : {current.margin}
            </span>
          </div>

          {/* Pertes & Retours */}
          <div className="p-2.5 rounded-xl bg-rose-50/80 border border-rose-200/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-bold text-rose-800">
              <span>Pertes/Retours</span>
              <TrendingDown className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            </div>
            <div className="text-base font-extrabold text-rose-600 tracking-tight mt-1 truncate">
              {current.loss}
            </div>
            <span className="text-[10px] text-rose-500 font-medium mt-0.5 truncate">
              Litiges déduits
            </span>
          </div>
        </div>
      </div>

      {/* 3. Graphique Donut SVG interactif */}
      <div className="relative flex items-center justify-center my-1">
        <svg width={size} height={size} className="transform -rotate-90 overflow-visible">
          {donutSegments.map((item) => {
            const isHovered = hoveredItem === item.name;

            return (
              <circle
                key={item.name}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
                strokeDasharray={item.strokeDasharray}
                strokeDashoffset={item.strokeDashoffset}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              />
            );
          })}
        </svg>

        {/* Texte central dynamique */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-1">
          <span className="text-sm font-extrabold text-emerald-600 tracking-tight leading-none">
            {hoveredItem
              ? current.breakdown.find(c => c.name === hoveredItem)?.amount
              : current.centerValue}
          </span>
          <span className="text-[9px] font-bold text-slate-400 tracking-wider mt-1 uppercase max-w-[90px] truncate">
            {hoveredItem || current.centerLabel}
          </span>
        </div>
      </div>

      {/* 4. Légende des flux financiers */}
      <div className="space-y-1 pt-1">
        {current.breakdown.map((item) => (
          <div
            key={item.name}
            className={`flex items-center justify-between text-xs py-1 px-1.5 rounded-lg transition-colors cursor-pointer ${
              hoveredItem === item.name ? 'bg-slate-50 font-bold' : ''
            }`}
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-700 font-medium text-xs truncate max-w-[120px]">{item.name}</span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className={`text-xs font-bold ${
                item.amount.startsWith('+')
                  ? 'text-emerald-600'
                  : item.type === 'loss'
                  ? 'text-rose-600'
                  : 'text-slate-600'
              }`}>
                {item.amount}
              </span>
              <span className="font-semibold text-slate-400 text-[10px] w-5 text-right">
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Bouton pour afficher la ventilation par canal */}
      <div className="pt-2 mt-2 border-t border-slate-100">
        <button
          onClick={() => setShowChannelDetail(!showChannelDetail)}
          className="w-full flex items-center justify-between text-[11px] font-bold text-slate-700 hover:text-emerald-700 cursor-pointer py-1 transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Détail par canal ({period})</span>
          </span>
          <span className="text-emerald-600 text-xs">
            {showChannelDetail ? 'Masquer ▲' : 'Voir le détail ▼'}
          </span>
        </button>

        {showChannelDetail && (
          <div className="space-y-1.5 pt-2 animate-in fade-in duration-200">
            {current.channels.map((ch) => (
              <div
                key={ch.name}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px]"
              >
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: ch.color }}></span>
                  <span className="truncate max-w-[90px]">{ch.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-emerald-600 font-bold">{ch.profit}</span>
                  <span className="text-rose-500 font-medium">{ch.loss}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
