import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  Loader2, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Package, 
  ShoppingCart, 
  CloudRain, 
  AlertCircle,
  BarChart2,
  CheckCircle2
} from 'lucide-react';
import { DEMO_PRODUCTS } from '../data/demoProducts';
import { DEMO_MARKETS } from '../data/demoMarkets';
import { mockPredictionService } from '../services/mockPredictionService';
import { PredictionInput, PredictionResult, AvailabilityLevel, DemandLevel } from '../types';

export const PredictionCard: React.FC = () => {
  const [product, setProduct] = useState<string>('Tomato');
  const [market, setMarket] = useState<string>('Ukkadam Market');
  const [periodDays, setPeriodDays] = useState<number>(7);
  const [availability, setAvailability] = useState<AvailabilityLevel>('Medium');
  const [demand, setDemand] = useState<DemandLevel>('High');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    const input: PredictionInput = {
      product,
      market,
      periodDays,
      availability,
      demand,
    };

    try {
      const res = await mockPredictionService.generatePrediction(input);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Input Form Card */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-agri-dark/8 shadow-soft">
        <div className="flex items-center justify-between border-b border-agri-dark/5 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-agri-gold/20 text-agri-dark flex items-center justify-center border border-agri-gold/40 shadow-xs">
              <BrainCircuit className="w-6 h-6 text-agri-dark" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-agri-dark">
                Configure Price Prediction Parameters
              </h3>
              <p className="text-xs text-agri-slateText">
                Select target crop, market location, and market indicators to estimate spot prices.
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 bg-agri-gold/20 text-agri-dark border border-agri-gold/40 px-2.5 py-1 rounded-full text-xs font-bold uppercase">
            <Sparkles className="w-3 h-3 text-agri-gold animate-pulse" /> Frontend Mock AI Model
          </span>
        </div>

        <form onSubmit={handleGenerate} className="space-y-6">
          {/* Row 1: Product & Market */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-agri-dark uppercase tracking-wider mb-2">
                Select Crop / Product
              </label>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full bg-agri-offwhite border border-agri-dark/15 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-agri-dark focus:ring-2 focus:ring-agri-leaf cursor-pointer shadow-xs"
              >
                {DEMO_PRODUCTS.map(p => (
                  <option key={p.id} value={p.name}>
                    {p.icon} {p.name} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-agri-dark uppercase tracking-wider mb-2">
                Select Target Market
              </label>
              <select
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                className="w-full bg-agri-offwhite border border-agri-dark/15 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-agri-dark focus:ring-2 focus:ring-agri-leaf cursor-pointer shadow-xs"
              >
                {DEMO_MARKETS.map(m => (
                  <option key={m.id} value={m.name}>
                    📍 {m.name} ({m.city})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Period Selection */}
          <div>
            <label className="block text-xs font-bold text-agri-dark uppercase tracking-wider mb-2">
              Prediction Horizon Period
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[1, 3, 7, 14].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setPeriodDays(days)}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all border ${
                    periodDays === days
                      ? 'bg-agri-dark text-white border-agri-dark shadow-md scale-[1.02]'
                      : 'bg-agri-offwhite text-agri-slateText border-agri-dark/10 hover:border-agri-leaf'
                  }`}
                >
                  {days} {days === 1 ? 'Day' : 'Days'}
                </button>
              ))}
            </div>
          </div>

          {/* Row 3: Availability & Demand Radios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-agri-offwhite/70 rounded-2xl border border-agri-dark/5">
            {/* Availability */}
            <div>
              <label className="block text-xs font-bold text-agri-dark uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-agri-leaf" /> Market Availability
              </label>
              <div className="flex items-center gap-4">
                {(['Low', 'Medium', 'High'] as AvailabilityLevel[]).map((level) => (
                  <label key={level} className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-agri-dark">
                    <input
                      type="radio"
                      name="availability"
                      value={level}
                      checked={availability === level}
                      onChange={() => setAvailability(level)}
                      className="accent-agri-leaf w-4 h-4"
                    />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Demand */}
            <div>
              <label className="block text-xs font-bold text-agri-dark uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShoppingCart className="w-4 h-4 text-agri-gold" /> Buyer Demand Level
              </label>
              <div className="flex items-center gap-4">
                {(['Low', 'Medium', 'High'] as DemandLevel[]).map((level) => (
                  <label key={level} className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-agri-dark">
                    <input
                      type="radio"
                      name="demand"
                      value={level}
                      checked={demand === level}
                      onChange={() => setDemand(level)}
                      className="accent-agri-gold w-4 h-4"
                    />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-agri-leaf via-agri-emerald to-agri-dark text-white font-extrabold text-sm shadow-md hover:shadow-lg hover:scale-[1.005] transition-all flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-agri-gold" />
                <span>Analyzing market patterns...</span>
              </>
            ) : (
              <>
                <BrainCircuit className="w-5 h-5 text-agri-gold" />
                <span>Generate Price Prediction</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Prediction Results Section */}
      {result && (
        <div className="space-y-6 animate-fade-in">
          {/* Main Result Card */}
          <div className="bg-gradient-to-br from-agri-dark via-agri-sidebar to-agri-emerald rounded-2xl p-6 md:p-8 text-white shadow-card relative overflow-hidden border border-agri-gold/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-agri-gold/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-agri-gold bg-agri-gold/20 border border-agri-gold/30 px-2.5 py-0.5 rounded-full">
                    Estimated {result.periodDays}-Day Forecast
                  </span>
                  <span className="text-xs text-agri-cream/60">📍 {result.market}</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  {result.product}
                </h2>

                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-4xl md:text-5xl font-black text-agri-gold tracking-tight">
                    ₹{result.predictedPrice}
                  </span>
                  <span className="text-base text-agri-cream/80 font-medium">/ kg</span>

                  <div className={`ml-2 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                    result.trend === 'Up' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                      : result.trend === 'Down'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}>
                    {result.trend === 'Up' && <TrendingUp className="w-4 h-4" />}
                    {result.trend === 'Down' && <TrendingDown className="w-4 h-4" />}
                    {result.trend === 'Stable' && <Minus className="w-4 h-4" />}
                    <span>{result.trend === 'Up' ? '↗ Increasing Trend' : result.trend === 'Down' ? '↘ Decreasing Trend' : '➔ Stable'}</span>
                  </div>
                </div>

                <div className="mt-3 text-xs text-agri-cream/80 font-medium">
                  Estimated Range: <strong className="text-white font-bold">₹{result.rangeMin} – ₹{result.rangeMax} / kg</strong>
                </div>
              </div>

              {/* Visual Prediction Reliability Gauge */}
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 flex flex-col items-center justify-center text-center shrink-0 min-w-[200px]">
                <div className="w-20 h-20 rounded-full border-4 border-agri-gold/40 border-t-agri-gold flex items-center justify-center mb-2 bg-agri-dark/40 shadow-inner">
                  <span className="text-2xl font-black text-white">{result.reliabilityScore}%</span>
                </div>

                <span className="text-xs font-bold text-agri-gold uppercase tracking-wider">
                  Prediction Reliability
                </span>
                <span className="text-[10px] text-agri-cream/70 mt-0.5">
                  Demo model indicator
                </span>
              </div>
            </div>
          </div>

          {/* Section 15: What Influenced This Estimate? */}
          <div className="bg-white rounded-2xl p-6 border border-agri-dark/8 shadow-soft">
            <h3 className="font-extrabold text-lg text-agri-dark mb-4 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-agri-leaf" /> What influenced this estimate?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-agri-offwhite p-4 rounded-xl border border-agri-dark/5 space-y-2">
                <div className="flex items-center gap-2 text-agri-leaf font-bold text-xs">
                  <TrendingUp className="w-4 h-4 text-agri-gold" />
                  <span>Previous Price Trend</span>
                </div>
                <p className="text-xs text-agri-slateText leading-relaxed">
                  Prices have shown an upward movement across local Coimbatore regional mandis.
                </p>
              </div>

              <div className="bg-agri-offwhite p-4 rounded-xl border border-agri-dark/5 space-y-2">
                <div className="flex items-center gap-2 text-agri-leaf font-bold text-xs">
                  <Package className="w-4 h-4 text-agri-leaf" />
                  <span>Availability</span>
                </div>
                <p className="text-xs text-agri-slateText leading-relaxed">
                  Current logged market availability is reported as <strong>{availability.toLowerCase()}</strong>.
                </p>
              </div>

              <div className="bg-agri-offwhite p-4 rounded-xl border border-agri-dark/5 space-y-2">
                <div className="flex items-center gap-2 text-agri-leaf font-bold text-xs">
                  <ShoppingCart className="w-4 h-4 text-agri-gold" />
                  <span>Demand</span>
                </div>
                <p className="text-xs text-agri-slateText leading-relaxed">
                  Local buyer and hotel demand is recorded at <strong>{demand.toLowerCase()}</strong> level.
                </p>
              </div>

              <div className="bg-agri-offwhite p-4 rounded-xl border border-agri-dark/5 space-y-2">
                <div className="flex items-center gap-2 text-agri-leaf font-bold text-xs">
                  <CloudRain className="w-4 h-4 text-blue-600" />
                  <span>Weather Conditions</span>
                </div>
                <p className="text-xs text-agri-slateText leading-relaxed">
                  Monsoon transport corridor humidity may moderately influence upcoming arrivals.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-agri-dark/5 flex items-center justify-between text-[11px] text-agri-slateText italic">
              <span>* Simulated inference generated at {result.generatedAt}</span>
              <span className="font-bold text-agri-leaf flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Validated demo output
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Empty State when no prediction generated yet */}
      {!result && !isLoading && (
        <div className="bg-white rounded-2xl p-8 border border-dashed border-agri-dark/15 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-agri-offwhite text-agri-slateText flex items-center justify-center mx-auto border border-agri-dark/10">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-agri-dark">No prediction generated yet</h4>
          <p className="text-xs text-agri-slateText max-w-sm mx-auto">
            Select your desired crop, market, and indicator levels above, then click &ldquo;Generate Prediction&rdquo; to simulate AI price estimation.
          </p>
        </div>
      )}
    </div>
  );
};
