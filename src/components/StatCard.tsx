import React from 'react';
import { TrendingUp, Sparkles } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trendText?: string;
  trendUp?: boolean;
  accentColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trendText = '+12% this week',
  trendUp = true,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-agri-dark/8 shadow-soft hover:shadow-card transition-all duration-300 relative overflow-hidden group">
      {/* Subtle top accent border line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-agri-leaf via-agri-gold to-agri-emerald opacity-80 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-xs font-semibold text-agri-slateText uppercase tracking-wider">
              {title}
            </span>
            <span className="text-[10px] bg-agri-lightLeaf text-agri-leaf font-bold px-1.5 py-0.5 rounded border border-agri-leaf/20">
              Demo Data
            </span>
          </div>

          <div className="text-3xl font-extrabold text-agri-dark tracking-tight my-1">
            {value}
          </div>
        </div>

        <div className="w-12 h-12 rounded-xl bg-agri-lightLeaf text-agri-leaf flex items-center justify-center group-hover:scale-110 group-hover:bg-agri-leaf group-hover:text-white transition-all shadow-sm">
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {/* Trend indicator */}
      <div className="mt-3 pt-3 border-t border-agri-dark/5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 font-medium text-emerald-700">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{trendText}</span>
        </div>
        
        <span className="text-[11px] text-agri-slateText/70 flex items-center gap-0.5">
          <Sparkles className="w-3 h-3 text-agri-gold" /> Mock metric
        </span>
      </div>
    </div>
  );
};
