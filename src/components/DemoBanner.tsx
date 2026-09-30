import React from 'react';
import { Sparkles, TrendingUp, Info } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const tickerItems = [
    '🍅 Tomato: ₹42/kg (+5%)',
    '🧅 Onion: ₹38/kg (Stable)',
    '🥔 Potato: ₹30/kg (-2%)',
    '🥕 Carrot: ₹55/kg (+8%)',
    '🍆 Brinjal: ₹34/kg (Stable)',
    '🫛 Beans: ₹62/kg (+12%)',
    '🌶️ Green Chilli: ₹48/kg (+4%)',
  ];

  return (
    <div className="bg-gradient-to-r from-agri-dark via-agri-emerald to-agri-dark text-white px-4 py-2 text-xs font-medium border-b border-[#48375E] shadow-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
        {/* Badge & Title */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1 bg-agri-gold/20 text-agri-gold border border-agri-gold/40 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase">
            <Sparkles className="w-3 h-3 text-agri-gold animate-pulse" /> Lavender Theme
          </span>
          <span className="hidden lg:inline text-[#E3D9F2] font-medium">
            AgriPrice AI Platform • Tamil Nadu Market Intelligence
          </span>
        </div>

        {/* Moveable Price Marquee Ticker */}
        <div className="hidden sm:flex-1 overflow-hidden relative max-w-xl mx-4 py-0.5 mask-linear">
          <div className="flex items-center gap-6 whitespace-nowrap animate-marquee">
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 text-[11px] text-[#F4EDFA] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                <TrendingUp className="w-3 h-3 text-agri-gold" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Student Credit */}
        <div className="flex items-center gap-2 text-[11px] text-[#E3D9F2] shrink-0">
          <Info className="w-3.5 h-3.5 text-agri-gold" />
          <span className="hidden md:inline font-semibold">Abhirami — AI & DS Field Project</span>
          <span className="md:hidden font-semibold">Demo Data</span>
        </div>
      </div>
    </div>
  );
};
