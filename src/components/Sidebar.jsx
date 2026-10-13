import React from 'react';
import {
  LayoutGrid,
  Mail,
  Truck,
  Users,
  Box,
  CreditCard,
  BarChart3,
  Blocks,
  Settings,
  Rocket,
  LogOut,
  Send,
  Globe,
  X
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen,
  orderCount = 10,
  onLogout
}) {
  const mainNavItems = [
    { id: 'overview', label: "Vue d'ensemble", icon: LayoutGrid, count: null },
    { id: 'orders', label: "Commandes", icon: Mail, count: orderCount },
    { id: 'shipments', label: "Expéditions", icon: Truck, count: null },
    { id: 'clients', label: "Clients", icon: Users, count: null },
    { id: 'catalog', label: "Catalogue", icon: Box, count: null },
    { id: 'payments', label: "Paiements", icon: CreditCard, count: null },
    { id: 'reports', label: "Rapports", icon: BarChart3, count: null },
  ];

  const systemNavItems = [
    { id: 'integrations', label: "Intégrations", icon: Blocks, count: null },
    { id: 'settings', label: "Paramètres", icon: Settings, count: null },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-xs"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between w-64 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-100'
        }`}
        style={{ backgroundColor: '#2f6f52' }}
      >
        <div className="flex flex-col flex-1 px-4 py-5 overflow-y-auto">
          {/* Logo & Brand Header */}
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-emerald-400/40 bg-[#245841] shadow-inner">
                {/* Globe Icon */}
                <Globe className="w-7 h-7 text-emerald-200 stroke-[1.5]" />
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#2f6f52]"></div>
              </div>
            </div>
            {/* Close button on mobile */}
            <button
              className="p-1 rounded-lg text-emerald-100 hover:bg-emerald-800/40 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Title */}
          <div className="flex items-center gap-2.5 px-3 py-2 mb-4 text-emerald-100/90 font-medium text-base">
            <Send className="w-4 h-4 rotate-45 text-emerald-300" />
            <span className="tracking-wide">Navigation</span>
          </div>

          {/* ACCUEIL Section */}
          <div className="mb-6">
            <div className="px-3 mb-2 text-[11px] font-bold tracking-wider uppercase text-emerald-200/60">
              ACCUEIL
            </div>
            <nav className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-white text-[#2a694d] shadow-sm font-semibold'
                        : 'text-emerald-100/90 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#2a694d]' : 'text-emerald-200/80'}`} />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.count !== null && (
                      <span className="px-2 py-0.5 text-xs font-bold text-white bg-amber-500 rounded-full shadow-xs">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* SYSTÈME Section */}
          <div className="mb-4">
            <div className="px-3 mb-2 text-[11px] font-bold tracking-wider uppercase text-emerald-200/60">
              SYSTÈME
            </div>
            <nav className="space-y-1">
              {systemNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-white text-[#2a694d] shadow-sm font-semibold'
                        : 'text-emerald-100/90 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#2a694d]' : 'text-emerald-200/80'}`} />
                    <span className="flex-1 text-left">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Status Card & Logout */}
        <div className="p-4 space-y-3">
          {/* Status Box */}
          <div className="p-3.5 rounded-2xl bg-[#1d4d38]/90 border border-emerald-600/30 text-white shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300">
                <Rocket className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">99,2%</span>
            </div>
            <div className="text-xs font-semibold text-white/95">Réseau opérationnel</div>
            <div className="text-[11px] text-emerald-200/70 mt-0.5 leading-tight">
              42 packages actifs dans 18 pays
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-emerald-100/90 border border-emerald-500/30 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-emerald-300" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
}
