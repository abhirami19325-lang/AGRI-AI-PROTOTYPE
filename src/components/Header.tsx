import React from 'react';
import { Menu, PlusCircle, BellRing, Home, Calendar, Sparkles } from 'lucide-react';
import { PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  onOpenSidebar: () => void;
  onPageChange: (page: PageId) => void;
  onOpenAlertModal: () => void;
}

const PAGE_TITLES: Record<PageId, { title: string; subtitle: string }> = {
  landing: {
    title: 'AgriPrice AI Platform',
    subtitle: 'AI-Based Local Agricultural Market Price Prediction'
  },
  dashboard: {
    title: 'Market Intelligence Dashboard',
    subtitle: 'An overview of local agricultural market activity.'
  },
  'field-observation': {
    title: 'Field Observation',
    subtitle: 'Record agricultural market information during your field visit.'
  },
  'market-explorer': {
    title: 'Market Explorer',
    subtitle: 'Browse and inspect regional Mandis across Tamil Nadu.'
  },
  prediction: {
    title: 'AI Price Predictor',
    subtitle: 'Estimate future agricultural prices using market indicators.'
  },
  analytics: {
    title: 'Market Analytics',
    subtitle: 'Deep-dive analytics on historical prices, seasonal trends, and supply metrics.'
  },
  'field-visits': {
    title: 'Field Visit History',
    subtitle: 'Log of completed and scheduled agricultural field research visits.'
  },
  'market-map': {
    title: 'Market Map',
    subtitle: 'Interactive geographical mapping of monitored markets and current prices.'
  },
  about: {
    title: 'About AgriPrice AI',
    subtitle: 'Project background, methodology, field research, and AI engine concept.'
  }
};

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onOpenSidebar,
  onPageChange,
  onOpenAlertModal,
}) => {
  const currentInfo = PAGE_TITLES[currentPage] || PAGE_TITLES.dashboard;

  return (
    <header className="bg-white/85 backdrop-blur-md sticky top-0 z-30 border-b border-purple-200/50 px-4 md:px-8 py-4 flex items-center justify-between transition-all shadow-xs">
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-agri-dark hover:bg-agri-lightLeaf transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <h1 className="text-xl md:text-2xl font-black text-agri-dark tracking-tight flex items-center gap-2">
            {currentInfo.title}
          </h1>
          <p className="text-xs md:text-sm text-agri-slateText hidden sm:block font-medium">
            {currentInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Header Right Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Current Date Badge */}
        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-agri-offwhite border border-purple-200 text-xs font-semibold text-agri-slateText shadow-xs">
          <Calendar className="w-3.5 h-3.5 text-agri-leaf" />
          <span>30 Sep 2026</span>
        </div>

        {/* Landing Home Toggle */}
        <button
          onClick={() => onPageChange(currentPage === 'landing' ? 'dashboard' : 'landing')}
          className="p-2 md:px-3.5 md:py-2 rounded-xl border border-purple-200 hover:border-agri-leaf text-agri-dark text-xs font-bold flex items-center gap-1.5 hover:bg-agri-lightLeaf transition-all shadow-xs"
          title="Toggle Landing / Dashboard"
        >
          <Home className="w-4 h-4 text-agri-leaf" />
          <span className="hidden md:inline">
            {currentPage === 'landing' ? 'Go to Dashboard' : 'Home Hero'}
          </span>
        </button>

        {/* Price Alert Button */}
        <button
          onClick={onOpenAlertModal}
          className="p-2 md:px-3.5 md:py-2 rounded-xl border border-agri-gold/40 bg-agri-amberLight text-agri-dark text-xs font-bold flex items-center gap-1.5 hover:bg-agri-gold/20 transition-all shadow-xs"
        >
          <BellRing className="w-4 h-4 text-agri-gold animate-bounce" />
          <span className="hidden md:inline">Price Alert</span>
        </button>

        {/* Record Visit Action */}
        <button
          onClick={() => onPageChange('field-observation')}
          className="px-3.5 md:px-4.5 py-2 rounded-xl bg-gradient-to-r from-agri-leaf to-purple-600 text-white text-xs font-extrabold shadow-glow-purple hover:scale-105 hover:from-agri-leafHover hover:to-purple-700 flex items-center gap-1.5 transition-all"
        >
          <PlusCircle className="w-4 h-4 text-agri-gold" />
          <span className="hidden sm:inline">Record Visit</span>
        </button>
      </div>
    </header>
  );
};
