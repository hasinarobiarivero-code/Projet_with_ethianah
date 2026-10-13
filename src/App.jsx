import React, { useState, useEffect } from 'react';
import {
  RotateCw,
  Euro,
  ShoppingBag,
  Receipt,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Package,
  Layers,
  ArrowLeft
} from 'lucide-react';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KpiCard from './components/KpiCard';
import OrdersChart from './components/OrdersChart';
import SalesChannelsChart from './components/SalesChannelsChart';
import PriorityTracking from './components/PriorityTracking';
import RecentOrdersTable from './components/RecentOrdersTable';
import LiveActivity from './components/LiveActivity';
import QuickActions from './components/QuickActions';
import {
  CreateOrderModal,
  OrderDetailsModal,
  ScanModal,
  GlobalSearchModal
} from './components/Modals';

import { initialOrders, initialActivities } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [orders, setOrders] = useState(initialOrders);
  const [activities, setActivities] = useState(initialActivities);
  const [currentCountry, setCurrentCountry] = useState({
    code: 'FR',
    name: 'France',
    currency: 'EUR',
    flag: '🇫🇷'
  });

  // Modals state
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Refresh & Toast
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdatedText, setLastUpdatedText] = useState("Mis à jour à l'instant");
  const [toastMessage, setToastMessage] = useState(null);

  // Global Cmd+K / Ctrl+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Refresh data handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdatedText(`Mis à jour à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`);
      showToast('Données et statistiques actualisées avec succès.');
    }, 650);
  };

  // Add order handler
  const handleAddOrder = (newOrder) => {
    setOrders([newOrder, ...orders]);
    // Also push a live activity
    const newAct = {
      id: Date.now(),
      type: 'delivery',
      title: `Nouvelle commande ${newOrder.id} créée`,
      details: `${newOrder.destination} • À l'instant`,
      iconBg: 'bg-emerald-100 text-emerald-600',
      badge: null
    };
    setActivities([newAct, ...activities]);
    showToast(`Commande ${newOrder.id} (${newOrder.client}) enregistrée !`);
  };

  // Delete order handler
  const handleDeleteOrder = (orderId) => {
    setOrders(orders.filter(o => o.id !== orderId));
    showToast(`Commande ${orderId} supprimée.`);
  };

  // Update order status handler
  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
    showToast(`Statut de ${orderId} mis à jour : ${newStatus}`);
  };

  // Export report to CSV
  const handleExportReport = () => {
    const headers = ["ID,Client,Email,Canal,Destination,Total,Statut,Date,Transporteur\n"];
    const rows = orders.map(o =>
      `"${o.id}","${o.client}","${o.email}","${o.channel}","${o.destination}","${o.total}","${o.status}","${o.date}","${o.carrier || 'DHL'}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `rapport_commandes_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Export du rapport CSV généré avec succès !');
  };

  return (
    <div className="flex min-h-screen bg-[#f3f6f4] text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 text-xs font-semibold text-white bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        orderCount={orders.length}
        onLogout={() => showToast('Session déconnectée avec succès.')}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top Header */}
        <Header
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenMobileSidebar={() => setIsMobileOpen(true)}
          currentCountry={currentCountry}
          setCurrentCountry={setCurrentCountry}
          notificationsCount={3}
          onOpenHelp={() => showToast('Centre de documentation ouvert.')}
        />

        {/* Dashboard Main View */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === 'overview' ? (
            <>
              {/* Dashboard Title & Quick Refresh */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Dashboard
                    </h1>
                  </div>
                  <p className="text-xs md:text-sm text-slate-500 mt-1">
                    Voici l'état des ventes, des commandes et des expéditions internationales.
                  </p>
                </div>

                {/* Refresh Button */}
                <button
                  onClick={handleRefresh}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200/90 rounded-xl hover:bg-slate-50 shadow-2xs transition-all cursor-pointer w-fit"
                >
                  <RotateCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
                  <span>{lastUpdatedText}</span>
                </button>
              </div>

              {/* Row 1: 4 KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Chiffre d'affaires */}
                <KpiCard
                  title="Chiffre d'affaires"
                  value="284 760 €"
                  trend="+12,4%"
                  trendSubtext="vs période précédente"
                  icon={Euro}
                  iconBg="bg-purple-100"
                  iconColor="text-purple-600"
                  waveColor="#8b5cf6"
                  wavePath="M 0 25 C 20 28, 35 15, 55 18 C 75 22, 85 5, 100 8"
                />

                {/* 2. Commandes */}
                <KpiCard
                  title="Commandes"
                  value="1 842"
                  trend="+8,1%"
                  trendSubtext="146 aujourd'hui"
                  icon={ShoppingBag}
                  iconBg="bg-amber-100"
                  iconColor="text-amber-600"
                  waveColor="#f59e0b"
                  wavePath="M 0 26 C 25 26, 40 18, 60 22 C 75 26, 85 10, 100 12"
                />

                {/* 3. Panier moyen */}
                <KpiCard
                  title="Panier moyen"
                  value="154,59 €"
                  trend="+3,6%"
                  trendSubtext="sur 30 jours"
                  icon={Receipt}
                  iconBg="bg-violet-100"
                  iconColor="text-violet-600"
                  waveColor="#a855f7"
                  wavePath="M 0 22 C 25 15, 45 28, 70 20 C 85 15, 95 8, 100 10"
                />

                {/* 4. Livraison à temps */}
                <KpiCard
                  title="Livraison à temps"
                  value="96,8%"
                  trend="+1,2 pt"
                  trendSubtext="1 324 colis actifs"
                  icon={CheckCircle2}
                  iconBg="bg-emerald-100"
                  iconColor="text-emerald-600"
                  waveColor="#10b981"
                  wavePath="M 0 28 C 30 25, 50 15, 75 16 C 85 17, 95 6, 100 4"
                />
              </div>

              {/* Row 2: Charts & Tracking (3 Columns) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Évolution des commandes (approx 45% -> 5 cols) */}
                <div className="lg:col-span-5">
                  <OrdersChart />
                </div>

                {/* Canaux de vente (approx 27% -> 3.5 cols -> 3 cols) */}
                <div className="lg:col-span-3">
                  <SalesChannelsChart />
                </div>

                {/* Suivi prioritaire (approx 33% -> 4 cols) */}
                <div className="lg:col-span-4">
                  <PriorityTracking
                    onOpenDetails={() => {
                      const priority = orders.find(o => o.id === 'GS-84289') || orders[0];
                      setSelectedOrder(priority);
                    }}
                  />
                </div>
              </div>

              {/* Row 3: Recent Orders Table (Left) & Right Sidebar (Activity + Quick Actions) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* Recent Orders (approx 65% -> 8 cols) */}
                <div className="lg:col-span-8">
                  <RecentOrdersTable
                    orders={orders}
                    onSelectOrder={(order) => setSelectedOrder(order)}
                    onDeleteOrder={handleDeleteOrder}
                    onStatusChange={handleUpdateStatus}
                  />
                </div>

                {/* Right Column: Live Activity + Quick Actions (approx 35% -> 4 cols) */}
                <div className="lg:col-span-4 space-y-5">
                  <LiveActivity
                    activities={activities}
                    onOpenJournal={() => showToast('Journal complet ouvert.')}
                  />

                  <QuickActions
                    onCreateOrder={() => setIsCreateOrderOpen(true)}
                    onScanPackage={() => setIsScanOpen(true)}
                    onExportReport={handleExportReport}
                  />
                </div>
              </div>
            </>
          ) : (
            /* Alternate tab placeholder view with easy back button */
            <div className="p-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 capitalize">
                Section : {activeTab}
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Cette vue est connectée au système central. Vous pouvez revenir à la vue d'ensemble du tableau de bord à tout moment.
              </p>
              <button
                onClick={() => setActiveTab('overview')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#2f6f52] hover:bg-[#255841] rounded-xl cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour au Dashboard</span>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <CreateOrderModal
        isOpen={isCreateOrderOpen}
        onClose={() => setIsCreateOrderOpen(false)}
        onAddOrder={handleAddOrder}
      />

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={handleUpdateStatus}
      />

      <ScanModal
        isOpen={isScanOpen}
        onClose={() => setIsScanOpen(false)}
        orders={orders}
        onSelectOrder={(order) => setSelectedOrder(order)}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        orders={orders}
        onSelectOrder={(order) => setSelectedOrder(order)}
      />
    </div>
  );
}
