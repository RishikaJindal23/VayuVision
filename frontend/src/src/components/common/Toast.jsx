import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

/**
 * ToastContainer Component
 * A basic React component that displays toast notifications.
 * Receives the array of active toasts and a function to remove a toast.
 */
export default function ToastContainer({ toasts = [], onRemoveToast }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let borderStyle = 'border-cyan-500/40 text-cyan-300';
        let Icon = CheckCircle2;

        if (toast.type === 'error') {
          borderStyle = 'border-red-500/40 text-red-300';
          Icon = AlertCircle;
        } else if (toast.type === 'info') {
          borderStyle = 'border-violet-500/40 text-violet-300';
          Icon = Info;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl glass-panel border shadow-lg flex items-center justify-between gap-3 animate-in slide-in-from-bottom-2 fade-in duration-200 ${borderStyle}`}
          >
            <div className="flex items-center gap-2.5">
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-medium text-slate-100">{toast.message}</span>
            </div>
            <button
              onClick={() => onRemoveToast && onRemoveToast(toast.id)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
