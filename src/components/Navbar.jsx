import React from 'react';
import { 
  Wind, 
  MapPin, 
  Activity, 
  TrendingUp, 
  Map, 
  Bell, 
  Sliders, 
  Info, 
  Radio,
  Search
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  locations, 
  selectedLocId, 
  setSelectedLocId,
  backendConnected 
}) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'forecast', label: '24–72h Forecast', icon: TrendingUp },
    { id: 'risk-map', label: 'Risk Heatmap', icon: Map },
    { id: 'alerts', label: 'Early Warnings', icon: Bell },
    { id: 'action-tools', label: 'Action Tools', icon: Sliders },
    { id: 'about', label: 'About & Pitch', icon: Info },
  ];

  // Helper to categorize 27 micro-zones into intuitive regional optgroups
  const getRegion = (loc) => {
    const id = loc.id;
    if (['connaught_place', 'ito', 'lodhi_road'].includes(id)) return 'Central Delhi';
    if (['anand_vihar', 'patparganj', 'vivek_vihar', 'mayur_vihar'].includes(id)) return 'East Delhi';
    if (['rohini', 'wazirpur', 'jahangirpuri', 'bawana', 'narela'].includes(id)) return 'North Delhi';
    if (['punjabi_bagh', 'janakpuri', 'shadipur', 'mundka'].includes(id)) return 'West Delhi';
    if (['okhla_phase2', 'nehru_nagar', 'siri_fort', 'saket'].includes(id)) return 'South Delhi';
    if (['dwarka_sec8', 'igi_airport'].includes(id)) return 'South-West Delhi';
    return 'NCR Satellite Cities (Noida/Gurugram/Ghaziabad/Faridabad)';
  };

  const regionsOrder = [
    'East Delhi',
    'North Delhi',
    'Central Delhi',
    'West Delhi',
    'South Delhi',
    'South-West Delhi',
    'NCR Satellite Cities (Noida/Gurugram/Ghaziabad/Faridabad)'
  ];

  return (
    <header className="border-b border-slate-800/80 bg-[#070c18]/95 backdrop-blur-md sticky top-0 z-50 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-400/40">
              <Wind className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                  VayuVision AI
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  Round 2 MVP
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium tracking-wide">
                Predict. Prepare. Protect. <span className="text-slate-600">|</span> <span className="text-slate-400">Team CodeStorms</span>
              </p>
            </div>
          </div>

          {/* Mobile status */}
          <div className="md:hidden flex items-center gap-1.5 text-xs">
            <span className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`}></span>
            <span className="text-slate-400 text-[11px]">{backendConnected ? 'Live API' : 'Ready'}</span>
          </div>
        </div>

        {/* Global Controls & Status */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Categorized Micro-Zone selector across all 27 Delhi NCR areas */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 hover:border-cyan-500/50 transition-colors rounded-xl px-3 py-1.5 text-xs shadow-inner">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="text-slate-400 hidden sm:inline font-semibold">Locality ({locations.length}):</span>
            <select 
              value={selectedLocId} 
              onChange={(e) => setSelectedLocId(e.target.value)}
              className="bg-transparent font-semibold text-white outline-none cursor-pointer max-w-[210px] sm:max-w-[260px] truncate"
            >
              {regionsOrder.map(reg => {
                const regLocs = locations.filter(l => getRegion(l) === reg);
                if (regLocs.length === 0) return null;
                return (
                  <optgroup key={reg} label={`📍 ${reg}`} className="bg-slate-950 font-bold text-cyan-400">
                    {regLocs.map(l => (
                      <option key={l.id} value={l.id} className="bg-slate-900 text-slate-100 font-medium">
                        {l.name}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </select>
          </div>

          {/* Backend Connection Status Pill */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-xl border text-xs font-medium bg-slate-900/60 border-slate-800">
            {backendConnected ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 text-[11px] font-semibold">FastAPI Connected</span>
              </>
            ) : (
              <>
                <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                <span className="text-cyan-300 text-[11px] font-medium">27 Zones Operational</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="max-w-7xl mx-auto mt-3 pt-2.5 border-t border-slate-800/60 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}
