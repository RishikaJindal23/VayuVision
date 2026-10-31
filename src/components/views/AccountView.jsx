import React from 'react';
import { ShieldCheck, User, Sparkles, CheckCircle2, History } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { useTitle } from '../../hooks/useTitle';

/**
 * AccountView Component (Protected Page)
 * Demonstrates: Protected Routes destination, List rendering, Props consumption.
 */
export default function AccountView({ user, scanHistory = [] }) {
  useTitle('User Account & Security Dashboard');

  return (
    <div className="space-y-8 py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>PROTECTED MEMBER DASHBOARD</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Welcome back, {user?.name || 'Explorer'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Your account is active. Below is your saved ATS scan history and profile metadata.
        </p>
      </div>

      {/* User Profile Card */}
      <GlassCard glowColor="cyan" className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold text-xl">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              {user?.name || 'Demo Member'}
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </h2>
            <p className="text-xs text-slate-400">{user?.email || 'user@resumate.io'}</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Tier: {user?.tier || 'Pro Member'}
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Saved Scan History (Rendering Lists & Conditional Rendering) */}
      <GlassCard glowColor="none" className="space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-400" />
          Your Recent ATS Scans ({scanHistory.length})
        </h3>

        {scanHistory.length > 0 ? (
          <div className="space-y-2.5">
            {scanHistory.map((scan) => (
              <div
                key={scan.id}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="text-xs font-bold text-white">{scan.role}</p>
                  <p className="text-[11px] text-slate-400 font-mono">{scan.company} • {scan.date}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                    {scan.score}% Match
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">No ATS scans saved yet.</p>
        )}
      </GlassCard>

    </div>
  );
}
