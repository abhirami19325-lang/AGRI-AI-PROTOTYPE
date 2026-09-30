import React from 'react';
import { 
  LayoutDashboard, 
  ClipboardEdit, 
  Store, 
  BrainCircuit, 
  BarChart3, 
  MapPin, 
  Map as MapIcon, 
  Info, 
  Sparkles, 
  User, 
  X,
  ChevronRight
} from 'lucide-react';
import { PageId } from '../types';

interface SidebarProps {
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onPageChange,
  isOpen,
  onClose,
}) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'field-observation', label: 'Field Observation', icon: ClipboardEdit, badge: 'Form' },
    { id: 'market-explorer', label: 'Market Explorer', icon: Store },
    { id: 'prediction', label: 'AI Prediction', icon: BrainCircuit, badge: 'AI' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'field-visits', label: 'Field Visits', icon: MapPin },
    { id: 'market-map', label: 'Market Map', icon: MapIcon },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <>
      {/* Backdrop for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-agri-sidebar text-white flex flex-col justify-between border-r border-[#3A2B4D] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Brand */}
        <div>
          <div className="p-5 flex items-center justify-between border-b border-[#3A2B4D]">
            <button 
              onClick={() => { onPageChange('landing'); onClose(); }}
              className="flex items-center gap-3 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-agri-leaf to-[#CBB2ED] flex items-center justify-center text-xl shadow-md group-hover:rotate-6 group-hover:scale-110 transition-transform border border-[#CBB2ED]/40 animate-float">
                🌾
              </div>
              <div>
                <h1 className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
                  AgriPrice AI
                  <Sparkles className="w-3.5 h-3.5 text-agri-gold animate-pulse" />
                </h1>
                <p className="text-[11px] text-[#D8C7F0] font-medium">
                  Pure Lavender AI Theme
                </p>
              </div>
            </button>

            <button 
              onClick={onClose}
              className="lg:hidden text-[#D8C7F0]/80 hover:text-white p-1 rounded-lg hover:bg-[#3A2B4D]"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-agri-leaf to-[#875BBF] text-white shadow-glow border border-[#CBB2ED]/40 font-semibold scale-[1.02]'
                      : 'text-[#E3D9F2] hover:bg-[#3A2B4D]/70 hover:text-white hover:translate-x-1'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-agri-gold animate-bounce' : 'text-[#CBB2ED]'}`} />
                    <span>{item.label}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        item.badge === 'AI' 
                          ? 'bg-agri-gold/20 text-agri-gold border border-agri-gold/40 animate-pulse' 
                          : 'bg-[#3A2B4D] text-[#E3D9F2]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-agri-gold" />}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-[#3A2B4D] space-y-3 bg-agri-darker/60">
          {/* AI Engine Status */}
          <div className="bg-[#342745] border border-[#48375E] rounded-xl p-2.5 flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-agri-gold animate-pulse" />
              <span className="text-xs font-medium text-[#F4EDFA]">AI Engine</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#1F172B] px-2 py-0.5 rounded-full border border-[#9B72CF]/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-semibold text-emerald-300">Ready</span>
            </div>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#342745] border border-[#48375E]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-agri-gold to-amber-300 text-agri-dark flex items-center justify-center font-bold text-sm shadow-md animate-float-slow">
              <User className="w-5 h-5 text-agri-dark" />
            </div>
            <div className="overflow-hidden">
              <h2 className="text-sm font-semibold text-white truncate">Abhirami</h2>
              <p className="text-[11px] text-agri-gold font-medium truncate">AI & DS Student</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
