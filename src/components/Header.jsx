import React, { useState } from 'react';
import {
  Search,
  HelpCircle,
  Bell,
  ChevronDown,
  Menu,
  Check,
  Package,
  AlertCircle
} from 'lucide-react';

export default function Header({
  onOpenSearch,
  onOpenMobileSidebar,
  currentCountry,
  setCurrentCountry,
  notificationsCount = 3,
  onOpenHelp
}) {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const countries = [
    { code: 'FR', name: 'France', currency: 'EUR', flag: '🇫🇷' },
    { code: 'US', name: 'United States', currency: 'USD', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧' },
    { code: 'DE', name: 'Germany', currency: 'EUR', flag: '🇩🇪' },
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        {/* Mobile menu toggle */}
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 -ml-2 text-slate-600 rounded-lg hover:bg-slate-100 lg:hidden cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input */}
        <div
          onClick={onOpenSearch}
          className="relative flex items-center w-full max-w-lg px-3.5 py-2 text-sm text-slate-400 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl cursor-pointer transition-all shadow-xs group"
        >
          <Search className="w-4 h-4 mr-2.5 text-slate-400 group-hover:text-slate-600" />
          <span className="flex-1 text-slate-500 font-normal truncate">
            Rechercher une commande, un client, un colis...
          </span>
          <div className="flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-semibold text-slate-500 bg-white border border-slate-200 rounded-md shadow-2xs">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Country & Currency Switcher */}
        <div className="relative">
          <button
            onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-2xs cursor-pointer transition-all"
          >
            <span className="text-sm">{currentCountry.flag}</span>
            <span>{currentCountry.name} - {currentCountry.currency}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isCountryDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 py-1 bg-white rounded-xl shadow-lg border border-slate-100 z-50">
              {countries.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setCurrentCountry(c);
                    setIsCountryDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{c.flag}</span>
                    <span>{c.name} ({c.currency})</span>
                  </div>
                  {currentCountry.code === c.code && (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Help Button */}
        <button
          onClick={onOpenHelp}
          title="Centre d'aide & Documentation"
          className="flex items-center justify-center w-8 h-8 text-slate-500 rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-700 cursor-pointer transition-all shadow-2xs"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            title="Notifications"
            className="relative flex items-center justify-center w-8 h-8 text-slate-500 rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-700 cursor-pointer transition-all shadow-2xs"
          >
            <Bell className="w-4 h-4" />
            {notificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 p-3 bg-white rounded-xl shadow-xl border border-slate-100 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800">Notifications ({notificationsCount})</span>
                <span className="text-[11px] text-emerald-600 font-medium cursor-pointer hover:underline">
                  Tout marquer comme lu
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100 flex items-start gap-2">
                  <Package className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-emerald-950">Commande GS-84290 livrée</p>
                    <p className="text-[11px] text-emerald-700">Hub Berlin il y a 4 min</p>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-100 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-amber-950">Contrôle douanier en cours</p>
                    <p className="text-[11px] text-amber-700">DHL-684201 - Hub Leipzig</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition-all shadow-2xs"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-violet-100 text-violet-700 font-bold text-xs tracking-tight">
              AH
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-800 leading-tight">Admin</div>
              <div className="text-[10px] text-slate-400 font-medium leading-none">Opérations monde</div>
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-52 py-1.5 bg-white rounded-xl shadow-lg border border-slate-100 z-50">
              <div className="px-3.5 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-800">Alexandre Henri</p>
                <p className="text-[11px] text-slate-400">admin@logistics-intl.com</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full px-3.5 py-1.5 text-xs text-left text-slate-700 hover:bg-slate-50"
                >
                  Mon profil
                </button>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full px-3.5 py-1.5 text-xs text-left text-slate-700 hover:bg-slate-50"
                >
                  Paramètres de sécurité
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
