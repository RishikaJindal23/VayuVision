import React, { useState, useEffect } from 'react';
import { X, Sparkles, User, Mail, Shield, CheckCircle2, Zap } from 'lucide-react';

/**
 * AuthModal Component
 * Simple modal component for managing user profile & guest login.
 * Receives isOpen, onClose, user, onSaveUser, and onGuestLogin as basic props.
 */
export default function AuthModal({ 
  isOpen, 
  onClose, 
  user, 
  onSaveUser, 
  onGuestLogin 
}) {
  // useState hooks for input fields
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  // Keep input fields updated when user prop changes
  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSaveUser) {
      onSaveUser(name, email);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/30 shadow-glow-cyan">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 p-[1px]">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
              Resumate Account
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </h3>
            <p className="text-xs text-slate-400">Save your ATS scans, templates, and job board</p>
          </div>
        </div>

        {/* Current User Status Banner */}
        <div className="p-3.5 bg-slate-900/80 rounded-xl border border-white/10 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold text-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="text-xs font-semibold text-white">{user?.name || 'Guest User'}</p>
              <p className="text-[11px] text-slate-400">{user?.email || 'guest@resumate.io'}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-xs font-medium focus:ring-1 focus:ring-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.rivera@email.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-xs font-medium focus:ring-1 focus:ring-cyan-400"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-glow-cyan flex items-center justify-center gap-1.5 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" /> Save Profile Information
            </button>

            <button
              type="button"
              onClick={() => {
                if (onGuestLogin) onGuestLogin();
                if (onClose) onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs border border-white/10 flex items-center justify-center gap-1.5 transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" /> Switch to 1-Click Guest Mode
            </button>
          </div>
        </form>

        <div className="mt-5 pt-4 border-t border-white/10 text-center">
          <p className="text-[11px] text-slate-400">
            All resume data & interview logs are stored locally in your browser with zero tracking.
          </p>
        </div>
      </div>
    </div>
  );
}
