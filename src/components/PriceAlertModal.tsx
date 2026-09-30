import React, { useState } from 'react';
import { BellRing, Trash2, X, Sparkles, CheckCircle } from 'lucide-react';
import { DEMO_PRODUCTS } from '../data/demoProducts';
import { mockMarketService } from '../services/mockMarketService';
import { PriceAlert } from '../types';

interface PriceAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const PriceAlertModal: React.FC<PriceAlertModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<string>('Tomato');
  const [threshold, setThreshold] = useState<number>(10);
  const [alerts, setAlerts] = useState<PriceAlert[]>(mockMarketService.getAlerts());

  if (!isOpen) return null;

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const created = mockMarketService.addAlert({
      product: selectedProduct,
      thresholdPercent: threshold,
    });
    setAlerts([created, ...alerts]);
    onShowToast(`Demo price alert created for ${selectedProduct} (±${threshold}%).`);
  };

  const handleDelete = (id: string) => {
    mockMarketService.deleteAlert(id);
    setAlerts(alerts.filter(a => a.id !== id));
    onShowToast('Price alert removed.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-agri-dark/10 relative">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-agri-amberLight text-agri-gold flex items-center justify-center">
              <BellRing className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-agri-dark">Set Price Alert</h3>
              <p className="text-[11px] text-agri-slateText">Get notified on simulated volatility threshold</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-agri-slateText hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleCreateAlert} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-agri-dark mb-1.5">
              Select Product
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full bg-agri-offwhite border border-agri-dark/15 rounded-xl px-3 py-2 text-xs font-semibold text-agri-dark focus:ring-2 focus:ring-agri-leaf"
            >
              {DEMO_PRODUCTS.map(p => (
                <option key={p.id} value={p.name}>
                  {p.icon} {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-agri-dark mb-1.5">
              Price Variance Threshold (%)
            </label>
            <select
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full bg-agri-offwhite border border-agri-dark/15 rounded-xl px-3 py-2 text-xs font-semibold text-agri-dark focus:ring-2 focus:ring-agri-leaf"
            >
              <option value={5}>5% fluctuation</option>
              <option value={10}>10% fluctuation</option>
              <option value={15}>15% fluctuation</option>
              <option value={20}>20% fluctuation</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-agri-leaf to-agri-emerald text-white text-xs font-bold shadow hover:shadow-md hover:from-agri-leafHover flex items-center justify-center gap-1.5 transition-all"
          >
            <BellRing className="w-4 h-4" />
            <span>Set Alert</span>
          </button>
        </form>

        {/* Saved Alerts */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-agri-dark flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-agri-leaf" /> Active Alerts ({alerts.length})
            </span>
            <span className="text-[10px] bg-agri-lightLeaf text-agri-leaf px-1.5 py-0.5 rounded font-semibold">
              <Sparkles className="w-2.5 h-2.5 inline mr-0.5" /> Demo Alert List
            </span>
          </div>

          <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
            {alerts.length === 0 ? (
              <p className="text-xs text-agri-slateText italic text-center py-2">No active price alerts set.</p>
            ) : (
              alerts.map((alt) => (
                <div
                  key={alt.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-agri-offwhite border border-agri-dark/5 text-xs"
                >
                  <div>
                    <span className="font-bold text-agri-dark">{alt.product}</span>
                    <span className="text-agri-slateText text-[11px] ml-2">±{alt.thresholdPercent}% change</span>
                  </div>

                  <button
                    onClick={() => handleDelete(alt.id)}
                    className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                    title="Delete Alert"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
