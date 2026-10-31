import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { useTitle } from '../../hooks/useTitle';

/**
 * NotFoundView Component (404 Page)
 * Demonstrates: Catch-All 404 Route, React Router Links, useNavigate hook.
 */
export default function NotFoundView() {
  useTitle('404 Page Not Found');
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <GlassCard glowColor="amber" className="max-w-md w-full p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-4xl font-extrabold font-mono text-white">404</h1>
          <h2 className="text-lg font-bold text-slate-200 mt-1">Page Not Found</h2>
          <p className="text-xs text-slate-400 mt-2">
            The route you are trying to access does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Go Back
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-glow-cyan flex items-center justify-center gap-1.5 transition-all"
          >
            <Home className="w-3.5 h-3.5" /> Return Home
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
