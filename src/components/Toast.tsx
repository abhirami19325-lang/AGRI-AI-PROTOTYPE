import React, { useEffect } from 'react';
import { CheckCircle, X, Sparkles } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 4000 }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-fade-in">
      <div className="bg-agri-dark text-white px-4 py-3 rounded-2xl shadow-2xl border border-agri-gold/40 flex items-center gap-3 max-w-md">
        <div className="w-8 h-8 rounded-xl bg-agri-leaf text-white flex items-center justify-center shrink-0 shadow-sm">
          <CheckCircle className="w-5 h-5 text-agri-gold" />
        </div>

        <div className="overflow-hidden">
          <div className="flex items-center gap-1.5 text-xs font-bold text-agri-gold">
            <Sparkles className="w-3 h-3" /> Action Confirmed
          </div>
          <p className="text-xs text-agri-cream font-medium truncate mt-0.5">
            {message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 text-agri-cream/70 hover:text-white transition-colors ml-2"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
