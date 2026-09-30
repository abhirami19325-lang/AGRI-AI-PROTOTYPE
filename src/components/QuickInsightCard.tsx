import React from 'react';
import { Sparkles, ArrowRight, Bot } from 'lucide-react';
import { PageId } from '../types';

interface QuickInsightCardProps {
  onNavigate: (page: PageId) => void;
}

export const QuickInsightCard: React.FC<QuickInsightCardProps> = ({ onNavigate }) => {
  return (
    <div className="bg-gradient-to-r from-agri-creamLight via-white to-agri-amberLight rounded-2xl p-6 border border-agri-gold/30 shadow-soft relative overflow-hidden flex flex-col justify-between">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-agri-gold/20 text-agri-dark flex items-center justify-center border border-agri-gold/40 shadow-sm">
            <Bot className="w-5 h-5 text-agri-dark" />
          </div>
          <div>
            <h3 className="font-bold text-base text-agri-dark flex items-center gap-1.5">
              AI Market Insight
            </h3>
            <span className="text-[10px] bg-agri-gold/20 text-agri-dark font-bold px-2 py-0.5 rounded border border-agri-gold/30">
              Mock AI Narrative
            </span>
          </div>
        </div>

        <Sparkles className="w-5 h-5 text-agri-gold animate-pulse" />
      </div>

      <p className="text-xs md:text-sm text-agri-charcoal/90 leading-relaxed font-medium my-2">
        &ldquo;Tomato prices have shown a gradual increase in the selected period while reported availability remains moderate across Ukkadam and Mettupalayam terminals. Supply from Nilgiris routes is expected to stabilize over the next 48 hours.&rdquo;
      </p>

      <div className="mt-4 pt-3 border-t border-agri-gold/20 flex items-center justify-between">
        <span className="text-[11px] text-agri-slateText italic">Generated from field record aggregate data</span>

        <button
          onClick={() => onNavigate('prediction')}
          className="inline-flex items-center gap-1 text-xs font-bold text-agri-dark hover:text-agri-leaf transition-colors group"
        >
          <span>View Full Analysis</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-agri-leaf" />
        </button>
      </div>
    </div>
  );
};
