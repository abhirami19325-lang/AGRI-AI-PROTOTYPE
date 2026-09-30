import React, { useState } from 'react';
import { Award, Info, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

export const IntelligenceScoreCard: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const score = 82;
  const strokeDashoffset = 283 - (283 * score) / 100;

  return (
    <div className="bg-gradient-to-br from-agri-dark via-agri-sidebar to-purple-900 rounded-3xl p-6 sm:p-7 text-white shadow-card relative overflow-hidden card-hover-lift border border-purple-500/30">
      {/* Decorative gradient blur circle */}
      <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-purple-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -left-8 -top-8 w-36 h-36 bg-agri-gold/20 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-agri-gold/20 text-agri-gold flex items-center justify-center border border-agri-gold/40 shadow-xs animate-float">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white flex items-center gap-1.5">
              Field Intelligence Score
            </h3>
            <p className="text-[11px] text-purple-200/70 font-medium">Field Data Confidence Index</p>
          </div>
        </div>

        <div className="relative">
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-purple-100 transition-colors"
            aria-label="Score breakdown info"
          >
            <Info className="w-4.5 h-4.5" />
          </button>

          {showTooltip && (
            <div className="absolute right-0 top-10 w-64 p-3.5 bg-white text-agri-dark text-xs rounded-2xl shadow-2xl border border-purple-200 z-30 animate-fade-in">
              <div className="font-bold border-b border-purple-100 pb-1 mb-1.5 text-agri-leaf flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Score Calculation
              </div>
              <ul className="space-y-1.5 text-[11px] text-agri-slateText">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Market Coverage: 4 Mandis</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Sample Density: 186 Records</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Multi-vendor Verification: Active</li>
              </ul>
              <div className="mt-2 pt-1.5 border-t border-purple-100 text-[10px] text-agri-gold font-bold uppercase">
                Demo Metric Indicator
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 py-2 relative z-10">
        {/* SVG Circular Gauge */}
        <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle
              cx="50"
              cy="50"
              r="45"
              className="text-white/10"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Progress Bar */}
            <circle
              cx="50"
              cy="50"
              r="45"
              className="text-agri-gold transition-all duration-1000 ease-out"
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-white tracking-tight">82</span>
            <span className="text-[10px] font-bold text-agri-gold uppercase">/ 100</span>
          </div>
        </div>

        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-agri-gold/20 border border-agri-gold/40 text-agri-gold text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> High Data Quality
          </div>
          <p className="text-xs text-purple-100/90 leading-relaxed font-medium">
            Based on the completeness of field observations, market coverage, and historical transaction records.
          </p>
          <p className="text-[11px] text-purple-200/60 italic">
            * Clearly designated as a <strong className="text-agri-gold font-semibold">demo metric</strong> for evaluation.
          </p>
        </div>
      </div>
    </div>
  );
};
