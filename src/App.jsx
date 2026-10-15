import React, { useState, useEffect } from 'react';
import {
  RotateCw,
  Euro,
  ShoppingBag,
  Receipt,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KpiCard from './components/KpiCard';
import OrdersChart from './components/OrdersChart';
import SalesChannelsChart from './components/SalesChannelsChart';
import PriorityTracking from './components/PriorityTracking';
import RecentOrdersTable from './components/RecentOrdersTable';
import LiveActivity from './components/LiveActivity';
import {
  CreateOrderModal,
  OrderDetailsModal,
  ScanModal,
  GlobalSearchModal
} from './components/Modals';

// Import all complete views for each sidebar item
import OrdersView from './views/OrdersView';
import ShipmentsView from './views/ShipmentsView';
import ClientsView from './views/ClientsView';
import CatalogView from './views/CatalogView';
import PaymentsView from './views/PaymentsView';
import ReportsView from './views/ReportsView';
import CommentsView from './views/CommentsView';
import ClientReviewPage from './views/ClientReviewPage';
import SettingsView from './views/SettingsView';
import { AdminProfileView, AdminSecurityView } from './views/AdminAccountViews';
import AdminAuthView from './views/AdminAuthView';

import { initialOrders, initialActivities } from './data/mockData';

const ADMIN_SESSION_KEY = 'transit-admin-session';

function readAdminSession() {
  try {
    const storedSession = window.sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!storedSession) return null;

    const session = JSON.parse(storedSession);
    if (typeof session?.name !== 'string' || typeof session?.email !== 'string') {
      throw new Error('Les données de session administrateur sont invalides.');
    }
    return { name: session.name, email: session.email, phone: session.phone || '' };
  } catch (error) {
    console.error('Impossible de restaurer la session administrateur :', error);
    return null;
  }
}

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
    adminReply: "Merci pour votre retour ! Le délai est dû à un contrôle douanier exceptionnel. Nous nous excusons pour la gêne.",
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

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [orders, setOrders] = useState(initialOrders);
  const [activities, setActivities] = useState(initialActivities);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [authenticatedAdmin, setAuthenticatedAdmin] = useState(readAdminSession);
  const [adminProfile, setAdminProfile] = useState(() =>
    readAdminSession() || { name: '', email: '', phone: '' }
  );
  const [currentCountry, setCurrentCountry] = useState({
    code: 'MG',
    name: 'Madagascar',
    currency: 'MGA (Ariary)',
    flag: '🇲🇬'
  });

  // Detect client review mode via URL param ?client=true
  const isClientMode = new URLSearchParams(window.location.search).get('client') === 'true';

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

  const handleAuthenticate = (profile) => {
    window.sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(profile));
    setAuthenticatedAdmin(profile);
    setAdminProfile(profile);
  };

  const handleLogout = () => {
    try {
      window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch (error) {
      console.error('Impossible de supprimer la session administrateur :', error);
    }
    setAuthenticatedAdmin(null);
    setAdminProfile({ name: '', email: '', phone: '' });
    setActiveTab('overview');
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

  // Add client review handler
  const handleSubmitReview = (review) => {
    setReviews(prev => [review, ...prev]);
  };

  // Admin reply handler
  const handleAddReply = (reviewId, replyText) => {
    setReviews(prev => prev.map(r =>
      r.id === reviewId ? { ...r, adminReply: replyText } : r
    ));
  };

  // Main content renderer based on active sidebar tab
  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <OrdersView
            orders={orders}
            onSelectOrder={(order) => setSelectedOrder(order)}
            onCreateOrder={() => setIsCreateOrderOpen(true)}
            onExportReport={handleExportReport}
            onUpdateStatus={handleUpdateStatus}
            onDeleteOrder={handleDeleteOrder}
          />
        );

      case 'shipments':
        return (
          <ShipmentsView
            onOpenScan={() => setIsScanOpen(true)}
          />
        );

      case 'clients':
        return <ClientsView />;

      case 'catalog':
        return <CatalogView />;

      case 'payments':
        return <PaymentsView />;

      case 'reports':
        return <ReportsView onExportReport={handleExportReport} />;

      case 'comments':
        return (
          <CommentsView
            reviews={reviews}
            onAddReply={handleAddReply}
            showToast={showToast}
          />
        );

      case 'settings':
        return <SettingsView showToast={showToast} />;

      case 'admin-profile':
        return (
          <AdminProfileView
            profile={adminProfile}
          />
        );

      case 'admin-security':
        return <AdminSecurityView showToast={showToast} />;

      case 'overview':
      default:
        return (
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
                  Suivi des commandes et du fret international vers Madagascar 🇲🇬 (Alibaba, 1688, Amazon, AliExpress, Shein...)
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
              {/* Évolution des commandes (5 cols) */}
              <div className="lg:col-span-5">
                <OrdersChart />
              </div>

              {/* Bénéfices, Pertes & Canaux de vente (4 cols) */}
              <div className="lg:col-span-4">
                <SalesChannelsChart />
              </div>

              {/* Suivi prioritaire (3 cols) */}
              <div className="lg:col-span-3">
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

              {/* Right Column: Live Activity (4 cols) */}
              <div className="lg:col-span-4">
                <LiveActivity
                  activities={activities}
                  onOpenJournal={() => showToast('Journal complet ouvert.')}
                />
              </div>
            </div>
          </>
        );
    }
  };

  // Render client review page when ?client=true
  if (isClientMode) {
    return <ClientReviewPage onSubmitReview={handleSubmitReview} />;
  }

  if (!authenticatedAdmin) {
    return <AdminAuthView onAuthenticate={handleAuthenticate} />;
  }

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
        onLogout={handleLogout}
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
          adminProfile={adminProfile}
          onNavigateToProfile={() => setActiveTab('admin-profile')}
          onNavigateToSecurity={() => setActiveTab('admin-security')}
        />

        {/* Dynamic Main View */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {renderContent()}
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
