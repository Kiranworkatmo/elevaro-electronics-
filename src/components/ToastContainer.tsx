'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
        let borderClass = 'border-emerald-500/30';
        let bgGlow = 'rgba(16, 185, 129, 0.08)';

        if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
          borderClass = 'border-rose-500/30';
          bgGlow = 'rgba(244, 63, 94, 0.08)';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-gold-400 shrink-0" />;
          borderClass = 'border-gold-500/30';
          bgGlow = 'rgba(201, 169, 110, 0.08)';
        }

        return (
          <div
            key={toast.id}
            style={{ background: `linear-gradient(135deg, #161616 0%, #111111 100%), ${bgGlow}` }}
            className={`pointer-events-auto p-4 rounded-xl border ${borderClass} shadow-2xl backdrop-blur-md flex items-start gap-3 transition-all duration-300 transform translate-y-0`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white tracking-wide">{toast.title}</h4>
              <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white transition-colors p-1 -mr-1 -mt-1"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
