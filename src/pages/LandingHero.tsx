import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  BrainCircuit, 
  Store, 
  TrendingUp, 
  BarChart3, 
  ShieldCheck, 
  Layers,
  Sprout
} from 'lucide-react';
import { PageId } from '../types';

interface LandingHeroProps {
  onNavigate: (page: PageId) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 pb-8 animate-fade-in">
      {/* Hero Section */}
      <section className="relative rounded-3xl bg-gradient-to-br from-agri-dark via-agri-sidebar to-purple-900 p-8 sm:p-12 md:p-16 text-white overflow-hidden shadow-card border border-purple-500/30">
        {/* Subtle Moveable Glow Circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-agri-gold/20 rounded-full blur-3xl pointer-events-none animate-float-slow" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-agri-gold/20 border border-agri-gold/40 text-agri-gold text-xs font-bold tracking-wide uppercase shadow-sm animate-float">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-agri-gold" />
            <span>AI & Data Science Field Project • Lavender Edition</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Turning Field Data Into <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-agri-gold via-amber-300 to-purple-300">
              Agricultural Intelligence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-purple-100/90 font-medium max-w-2xl mx-auto leading-relaxed">
            &ldquo;Explore local agricultural prices, understand market trends, and visualize AI-powered price predictions.&rdquo;
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-agri-gold via-amber-400 to-agri-gold text-agri-dark font-extrabold text-sm shadow-gold-glow hover:scale-105 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('field-observation')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm backdrop-blur-md transition-all flex items-center justify-center gap-2 hover:scale-105"
            >
              <Sprout className="w-4 h-4 text-agri-gold" />
              <span>Record Field Visit</span>
            </button>
          </div>
        </div>

        {/* Moveable Hero Visual Flow Section */}
        <div className="mt-16 pt-10 border-t border-purple-500/30 relative z-10">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-agri-gold mb-8">
            Platform Field-To-Intelligence Workflow Flow
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 max-w-5xl mx-auto items-center">
            {/* Step 1: Farm */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center group hover:border-agri-gold hover:scale-105 transition-all animate-float">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-2xl mx-auto mb-2 border border-emerald-500/40 shadow-sm">
                🌾
              </div>
              <h4 className="font-bold text-xs text-white">1. Farm</h4>
              <p className="text-[11px] text-purple-200/70 mt-0.5">Crop harvest & yield</p>
            </div>

            {/* Connecting Arrow */}
            <div className="hidden sm:flex justify-center text-agri-gold font-bold text-lg animate-pulse">
              ↓
            </div>

            {/* Step 2: Market */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center group hover:border-agri-gold hover:scale-105 transition-all animate-float style={{ animationDelay: '0.2s' }}">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-2xl mx-auto mb-2 border border-amber-500/40 shadow-sm">
                🏪
              </div>
              <h4 className="font-bold text-xs text-white">2. Market</h4>
              <p className="text-[11px] text-purple-200/70 mt-0.5">Mandi spot trading</p>
            </div>

            {/* Connecting Arrow */}
            <div className="hidden sm:flex justify-center text-agri-gold font-bold text-lg animate-pulse">
              ↓
            </div>

            {/* Step 3: Data */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center group hover:border-agri-gold hover:scale-105 transition-all animate-float style={{ animationDelay: '0.4s' }}">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/30 text-purple-200 flex items-center justify-center text-2xl mx-auto mb-2 border border-purple-400/40 shadow-sm">
                📊
              </div>
              <h4 className="font-bold text-xs text-white">3. Data</h4>
              <p className="text-[11px] text-purple-200/70 mt-0.5">Field observation logs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto items-center mt-4">
            <div className="hidden sm:flex justify-center text-agri-gold font-bold text-lg animate-pulse col-span-3 text-center">
              ↓
            </div>

            {/* Step 4: AI */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center group hover:border-agri-gold hover:scale-105 transition-all col-span-1 animate-float">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/40 text-purple-200 flex items-center justify-center text-2xl mx-auto mb-2 border border-purple-400/50 shadow-sm">
                🤖
              </div>
              <h4 className="font-bold text-xs text-white">4. AI Engine</h4>
              <p className="text-[11px] text-purple-200/70 mt-0.5">Pattern learning model</p>
            </div>

            {/* Arrow */}
            <div className="hidden sm:flex justify-center text-agri-gold font-bold text-lg animate-pulse">
              ➔
            </div>

            {/* Step 5: Price Prediction */}
            <div className="bg-gradient-to-br from-agri-gold/30 via-amber-500/30 to-purple-600/30 backdrop-blur-md p-4 rounded-2xl border border-agri-gold text-center group hover:scale-105 transition-all col-span-1 shadow-gold-glow">
              <div className="w-12 h-12 rounded-2xl bg-agri-gold text-agri-dark flex items-center justify-center text-2xl mx-auto mb-2 font-black shadow-md animate-bounce">
                💰
              </div>
              <h4 className="font-extrabold text-xs text-agri-gold">5. Price Prediction</h4>
              <p className="text-[11px] text-white font-semibold mt-0.5">Forecast & Reliability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-agri-dark/8 shadow-soft card-hover-lift">
          <div className="w-11 h-11 rounded-2xl bg-agri-lightLeaf text-agri-leaf flex items-center justify-center mb-4 shadow-xs">
            <Store className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-agri-dark mb-1">Local Market Directory</h3>
          <p className="text-xs text-agri-slateText leading-relaxed">
            Coimbatore, Mettupalayam, Singanallur, and Pollachi Mandis monitored daily for supply & pricing fluctuations.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-agri-dark/8 shadow-soft card-hover-lift">
          <div className="w-11 h-11 rounded-2xl bg-agri-amberLight text-agri-gold flex items-center justify-center mb-4 shadow-xs">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-agri-dark mb-1">Lavender AI Engine</h3>
          <p className="text-xs text-agri-slateText leading-relaxed">
            Machine learning framework structure evaluating availability, demand, weather factors, and historical price drift.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-agri-dark/8 shadow-soft card-hover-lift">
          <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-agri-dark mb-1">Field Intelligence Score</h3>
          <p className="text-xs text-agri-slateText leading-relaxed">
            Data confidence scoring metric ensuring high-quality evidence collection and verified sample sizes.
          </p>
        </div>
      </section>
    </div>
  );
};
