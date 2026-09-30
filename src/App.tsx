import React, { useState } from 'react';
import { PageId, FieldObservation, Market } from './types';
import { mockMarketService } from './services/mockMarketService';
import { DemoBanner } from './components/DemoBanner';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Toast } from './components/Toast';
import { PriceAlertModal } from './components/PriceAlertModal';

// Pages
import { LandingHero } from './pages/LandingHero';
import { Dashboard } from './pages/Dashboard';
import { FieldObservationPage } from './pages/FieldObservationPage';
import { MarketExplorer } from './pages/MarketExplorer';
import { PredictionPage } from './pages/PredictionPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { FieldVisitsPage } from './pages/FieldVisitsPage';
import { MarketMapPage } from './pages/MarketMapPage';
import { AboutPage } from './pages/AboutPage';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);

  const [observations, setObservations] = useState<FieldObservation[]>(
    mockMarketService.getObservations()
  );

  const [selectedMarketForMap, setSelectedMarketForMap] = useState<Market | null>(null);

  const handleAddObservation = (newObs: FieldObservation) => {
    setObservations(prev => [newObs, ...prev]);
  };

  const handleShowToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleSelectMarketForMap = (m: Market) => {
    setSelectedMarketForMap(m);
    setCurrentPage('market-map');
  };

  return (
    <div className="min-h-screen bg-agri-offwhite text-agri-charcoal font-sans flex flex-col antialiased">
      {/* Top Persistent Demo Banner */}
      <DemoBanner />

      <div className="flex-1 flex relative">
        {/* Left Sidebar */}
        <Sidebar
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area (offset by sidebar width on desktop) */}
        <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
          {/* Header */}
          <Header
            currentPage={currentPage}
            onOpenSidebar={() => setIsSidebarOpen(true)}
            onPageChange={(page) => setCurrentPage(page)}
            onOpenAlertModal={() => setIsAlertModalOpen(true)}
          />

          {/* Page Body View */}
          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
            {currentPage === 'landing' && (
              <LandingHero onNavigate={(page) => setCurrentPage(page)} />
            )}

            {currentPage === 'dashboard' && (
              <Dashboard 
                observations={observations} 
                onNavigate={(page) => setCurrentPage(page)} 
              />
            )}

            {currentPage === 'field-observation' && (
              <FieldObservationPage
                onAddObservation={handleAddObservation}
                onShowToast={handleShowToast}
              />
            )}

            {currentPage === 'market-explorer' && (
              <MarketExplorer
                onNavigate={(page) => setCurrentPage(page)}
                onSelectMarketForMap={handleSelectMarketForMap}
              />
            )}

            {currentPage === 'prediction' && (
              <PredictionPage />
            )}

            {currentPage === 'analytics' && (
              <AnalyticsPage />
            )}

            {currentPage === 'field-visits' && (
              <FieldVisitsPage onNavigate={(page) => setCurrentPage(page)} />
            )}

            {currentPage === 'market-map' && (
              <MarketMapPage
                initialSelectedMarket={selectedMarketForMap}
                onNavigate={(page) => setCurrentPage(page)}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage onNavigate={(page) => setCurrentPage(page)} />
            )}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-agri-dark/5 p-6 text-center text-xs text-agri-slateText">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-semibold text-agri-dark">
                <span>🌾 AgriPrice AI</span>
                <span className="text-gray-300">•</span>
                <span>Individual AI & Data Science Field Project</span>
              </div>
              <div>
                Developed by <strong className="text-agri-dark font-bold">Abhirami</strong> (AI & DS Student)
              </div>
              <div className="text-[11px] text-agri-leaf font-bold">
                ● Demo Data Mode Active
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Global Modals & Toasts */}
      <PriceAlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        onShowToast={handleShowToast}
      />

      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};
