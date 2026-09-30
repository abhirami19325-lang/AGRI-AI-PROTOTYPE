import React from 'react';
import { 
  Sprout, 
  Database, 
  BrainCircuit, 
  Sparkles, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  LineChart, 
  MapPin, 
  Layers
} from 'lucide-react';
import { PageId } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 animate-fade-in max-w-5xl mx-auto pb-8">
      {/* Top Project Banner */}
      <section className="bg-gradient-to-br from-agri-dark via-agri-sidebar to-agri-emerald rounded-3xl p-8 sm:p-10 text-white shadow-card border border-agri-gold/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-agri-leaf/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-agri-gold/20 text-agri-gold text-xs font-bold uppercase tracking-wider border border-agri-gold/30">
            <Sparkles className="w-3.5 h-3.5" /> Individual AI & Data Science Field Project
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            About AgriPrice AI
          </h2>

          <p className="text-sm sm:text-base text-agri-cream/90 font-medium leading-relaxed">
            &ldquo;AgriPrice AI is an AI & Data Science field project designed to explore local agricultural market price patterns using real-world field observations.&rdquo;
          </p>

          <div className="pt-3 flex items-center gap-4 text-xs text-agri-cream/70">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
              <User className="w-4 h-4 text-agri-gold" />
              <span className="font-bold text-white">Abhirami — AI & DS Student</span>
            </div>
            <span className="hidden sm:inline">• Academic Field Project 2026</span>
          </div>
        </div>
      </section>

      {/* 3 Core Pillar Cards (Section 22) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Field Research */}
        <div className="bg-white rounded-2xl p-6 border border-agri-dark/8 shadow-soft hover:shadow-card transition-all flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-agri-lightLeaf text-agri-leaf flex items-center justify-center mb-4 text-xl font-bold shadow-xs group-hover:bg-agri-leaf group-hover:text-white transition-all">
              <MapPin className="w-6 h-6" />
            </div>

            <h3 className="font-extrabold text-lg text-agri-dark mb-2">Field Research</h3>
            <p className="text-xs text-agri-slateText leading-relaxed">
              Collect information directly from agricultural markets (Ukkadam, Mettupalayam, Singanallur, Pollachi) through structured field interviews, price sampling, and consignment tracking.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] font-bold text-agri-leaf flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Direct Mandi Verification
          </div>
        </div>

        {/* Card 2: Data Science */}
        <div className="bg-white rounded-2xl p-6 border border-agri-dark/8 shadow-soft hover:shadow-card transition-all flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-agri-amberLight text-agri-gold flex items-center justify-center mb-4 text-xl font-bold shadow-xs group-hover:bg-agri-gold group-hover:text-agri-dark transition-all">
              <Database className="w-6 h-6" />
            </div>

            <h3 className="font-extrabold text-lg text-agri-dark mb-2">Data Science</h3>
            <p className="text-xs text-agri-slateText leading-relaxed">
              Analyze historical market observations, feature distributions, price elasticity, supply vs demand correlations, and seasonal cycles using clean data pipelines.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] font-bold text-agri-gold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-agri-gold" /> Quantitative Trend Analytics
          </div>
        </div>

        {/* Card 3: AI */}
        <div className="bg-white rounded-2xl p-6 border border-agri-dark/8 shadow-soft hover:shadow-card transition-all flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-agri-lightLeaf text-agri-emerald flex items-center justify-center mb-4 text-xl font-bold shadow-xs group-hover:bg-agri-emerald group-hover:text-white transition-all">
              <BrainCircuit className="w-6 h-6" />
            </div>

            <h3 className="font-extrabold text-lg text-agri-dark mb-2">Artificial Intelligence</h3>
            <p className="text-xs text-agri-slateText leading-relaxed">
              Use machine learning concepts and predictive modeling frameworks to estimate future price trends, range intervals, and confidence reliability indicators.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] font-bold text-agri-emerald flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Predictive Intelligence
          </div>
        </div>
      </section>

      {/* Project Workflow Section (Section 22) */}
      <section className="bg-white rounded-2xl p-8 border border-agri-dark/8 shadow-soft space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="font-extrabold text-xl text-agri-dark flex items-center gap-2">
              <Layers className="w-5 h-5 text-agri-leaf" /> Project Workflow Pipeline
            </h3>
            <p className="text-xs text-agri-slateText">
              End-to-end data lifecycle from field recording to interactive prediction visualization.
            </p>
          </div>

          <span className="text-[10px] bg-agri-gold/20 text-agri-dark font-bold px-3 py-1 rounded-full border border-agri-gold/30 uppercase">
            5-Stage Architecture
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
          {/* Stage 1 */}
          <div className="bg-agri-offwhite p-4 rounded-xl border border-agri-dark/10 text-center space-y-1 hover:border-agri-leaf transition-colors">
            <span className="text-xs font-bold text-agri-leaf uppercase">Stage 1</span>
            <h4 className="font-extrabold text-xs text-agri-dark">Field Visit</h4>
            <p className="text-[10px] text-agri-slateText">On-site market survey</p>
          </div>

          <div className="hidden sm:flex justify-center text-agri-gold font-bold">➔</div>

          {/* Stage 2 */}
          <div className="bg-agri-offwhite p-4 rounded-xl border border-agri-dark/10 text-center space-y-1 hover:border-agri-leaf transition-colors">
            <span className="text-xs font-bold text-agri-leaf uppercase">Stage 2</span>
            <h4 className="font-extrabold text-xs text-agri-dark">Data Collection</h4>
            <p className="text-[10px] text-agri-slateText">Log price & weather</p>
          </div>

          <div className="hidden sm:flex justify-center text-agri-gold font-bold">➔</div>

          {/* Stage 3 */}
          <div className="bg-agri-offwhite p-4 rounded-xl border border-agri-dark/10 text-center space-y-1 hover:border-agri-leaf transition-colors">
            <span className="text-xs font-bold text-agri-leaf uppercase">Stage 3</span>
            <h4 className="font-extrabold text-xs text-agri-dark">Data Analysis</h4>
            <p className="text-[10px] text-agri-slateText">Statistical trendlines</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center pt-2 max-w-xl mx-auto">
          <div className="hidden sm:flex justify-center text-agri-gold font-bold col-span-3 text-center">
            ↓
          </div>

          {/* Stage 4 */}
          <div className="bg-agri-creamLight p-4 rounded-xl border border-agri-gold/40 text-center space-y-1">
            <span className="text-xs font-bold text-agri-gold uppercase">Stage 4</span>
            <h4 className="font-extrabold text-xs text-agri-dark">AI Prediction</h4>
            <p className="text-[10px] text-agri-slateText">Price forecasting</p>
          </div>

          <div className="hidden sm:flex justify-center text-agri-gold font-bold">➔</div>

          {/* Stage 5 */}
          <div className="bg-agri-lightLeaf p-4 rounded-xl border border-agri-leaf/30 text-center space-y-1">
            <span className="text-xs font-bold text-agri-leaf uppercase">Stage 5</span>
            <h4 className="font-extrabold text-xs text-agri-dark">Visualization</h4>
            <p className="text-[10px] text-agri-slateText">Interactive dashboard</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-agri-slateText italic">Designed for future API & trained model integration</span>
          <button
            onClick={() => onNavigate('prediction')}
            className="px-4 py-2 bg-agri-dark text-white rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-agri-leaf transition-colors"
          >
            <span>Try AI Predictor</span>
            <ArrowRight className="w-3.5 h-3.5 text-agri-gold" />
          </button>
        </div>
      </section>
    </div>
  );
};
