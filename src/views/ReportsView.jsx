import React from 'react';
import {
  BarChart3,
  FileDown,
  TrendingUp,
  Globe2,
  Truck,
  DollarSign,
  Calendar
} from 'lucide-react';

export default function ReportsView({ onExportReport }) {
  const reportsList = [
    {
      title: "Rapport Financier & Chiffre d'Affaires",
      period: "Période : Mensuel (Octobre 2026)",
      size: "2.4 MB • PDF / CSV",
      description: "Détail complet des ventes par canal, encaissements, TVA collectée et marges nettes.",
      icon: DollarSign,
      color: "text-emerald-700 bg-emerald-100"
    },
    {
      title: "Performance & Ponctualité Transporteurs",
      period: "Période : 30 derniers jours",
      size: "1.8 MB • PDF",
      description: "Taux de respect des délais, anomalies de livraison, litiges douaniers par transporteur (DHL, Colissimo, FedEx).",
      icon: Truck,
      color: "text-indigo-700 bg-indigo-100"
    },
    {
      title: "Répartition Géographique des Ventes",
      period: "Période : Trimestriel Q3/Q4",
      size: "3.1 MB • Excel / CSV",
      description: "Parts de marché par pays, volumes expédiés vers l'Europe, le Moyen-Orient et les USA.",
      icon: Globe2,
      color: "text-amber-700 bg-amber-100"
    },
    {
      title: "Audit d'Inventaire & Rotation des Stocks",
      period: "Période : Temps réel",
      size: "950 KB • CSV",
      description: "Valorisation du stock disponible en entrepôt, prévisions de rupture et suggestions de réapprovisionnement.",
      icon: BarChart3,
      color: "text-teal-700 bg-teal-100"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Rapports & Analytique
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Génération de bilans comptables, statistiques logistiques et exports automatisés.
          </p>
        </div>

        <button
          onClick={onExportReport}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all cursor-pointer w-fit"
        >
          <FileDown className="w-4 h-4" />
          <span>Exporter rapport global (CSV)</span>
        </button>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-xs font-medium text-slate-400">Croissance annuelle globale</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">+24,8%</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            Objectif annuel dépassé de 4.2%
          </p>
        </div>

        <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-xs font-medium text-slate-400">Délai moyen d'expédition mondial</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">1,8 jour</div>
          <p className="text-[11px] text-indigo-600 font-semibold mt-1">
            -0.4 jour par rapport au mois passé
          </p>
        </div>

        <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          <span className="text-xs font-medium text-slate-400">Taux de réclamation logistique</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">0,4%</div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Excellent standard de conformité
          </p>
        </div>
      </div>

      {/* Reports Catalog */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportsList.map((rep, idx) => {
          const Icon = rep.icon;
          return (
            <div
              key={idx}
              className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3.5 mb-3">
                  <div className={`p-2.5 rounded-xl shrink-0 ${rep.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{rep.title}</h3>
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {rep.period}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {rep.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="text-slate-400 font-medium text-[11px]">{rep.size}</span>
                <button
                  onClick={onExportReport}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Télécharger</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
