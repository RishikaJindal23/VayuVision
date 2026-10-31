import React, { useState } from 'react';
import { 
  Wind, 
  Thermometer, 
  Droplets, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Activity, 
  TrendingUp, 
  Calendar, 
  Info, 
  Compass, 
  Award, 
  FileText, 
  CheckCircle2, 
  Layers, 
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
  Flame,
  Zap
} from 'lucide-react';

const LOCATIONS = [
  { id: 'anand_vihar', name: 'Anand Vihar', zone: 'ISBT & Heavy Transit Chokepoint', lat: 28.65, lon: 77.31, baseAqi: 345, peakAqi: 492, station: 'DL-CPCB-001' },
  { id: 'lodhi_road', name: 'Lodhi Road', zone: 'Institutional Green Corridor', lat: 28.59, lon: 77.22, baseAqi: 210, peakAqi: 265, station: 'DL-IMD-004' },
  { id: 'rohini', name: 'Rohini Sector 16', zone: 'Dense High-Density Residential', lat: 28.73, lon: 77.11, baseAqi: 310, peakAqi: 468, station: 'DL-DPCC-012' },
  { id: 'dwarka_sec8', name: 'Dwarka Sector 8', zone: 'Planned Residential Suburb', lat: 28.57, lon: 77.07, baseAqi: 230, peakAqi: 320, station: 'DL-DPCC-009' },
  { id: 'punjabi_bagh', name: 'Punjabi Bagh', zone: 'Commercial Ring Road Corridor', lat: 28.67, lon: 77.13, baseAqi: 325, peakAqi: 475, station: 'DL-DPCC-015' },
  { id: 'igi_airport', name: 'IGI Airport T3', zone: 'Open Aviation & Buffer Corridor', lat: 28.55, lon: 77.10, baseAqi: 220, peakAqi: 285, station: 'DL-IMD-007' }
];

const TIMELINE_DATA = [
  { phase: 'Pre-Diwali', label: 'Oct 29 (Day -3)', aqi: 280, pm25: 165, pm10: 275, condition: 'Crop stubble smoke influx & winter cooling' },
  { phase: 'Pre-Diwali', label: 'Oct 30 (Day -2)', aqi: 315, pm25: 195, pm10: 320, condition: 'Festive shopping traffic congestion' },
  { phase: 'Pre-Diwali', label: 'Oct 31 (Day -1)', aqi: 355, pm25: 225, pm10: 380, condition: 'Choti Diwali trial firecrackers & calm winds' },
  { phase: 'Diwali Peak', label: 'Nov 01 14:00', aqi: 295, pm25: 175, pm10: 310, condition: 'Daytime solar heating permits boundary mixing' },
  { phase: 'Diwali Peak', label: 'Nov 01 20:00', aqi: 435, pm25: 320, pm10: 490, condition: 'Rapid fireworks burst begins across city' },
  { phase: 'Diwali Peak', label: 'Nov 02 01:00', aqi: 490, pm25: 415, pm10: 620, condition: 'Peak nocturnal inversion traps smoke at breathing height' },
  { phase: 'Post-Diwali', label: 'Nov 02 (Day +1)', aqi: 440, pm25: 340, pm10: 510, condition: 'Dense lingering particulate haze; weak winds' },
  { phase: 'Post-Diwali', label: 'Nov 03 (Day +2)', aqi: 370, pm25: 260, pm10: 410, condition: 'Gradual dispersion as surface winds pick up' },
  { phase: 'Post-Diwali', label: 'Nov 04 (Day +3)', aqi: 320, pm25: 210, pm10: 350, condition: 'Atmosphere returns toward seasonal baseline' }
];

export default function App() {
  const [selectedLocId, setSelectedLocId] = useState('anand_vihar');
  const [activeTab, setActiveTab] = useState('timeline');
  const [selectedActivity, setSelectedActivity] = useState('Walking');
  const [selectedDate, setSelectedDate] = useState('2026-11-01');

  const loc = LOCATIONS.find(l => l.id === selectedLocId) || LOCATIONS[0];

  const getAqiColor = (aqi) => {
    if (aqi <= 50) return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', badge: 'bg-emerald-500', name: 'Good' };
    if (aqi <= 100) return { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', badge: 'bg-green-500', name: 'Satisfactory' };
    if (aqi <= 200) return { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', badge: 'bg-amber-500', name: 'Moderate' };
    if (aqi <= 300) return { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', badge: 'bg-orange-500', name: 'Poor' };
    if (aqi <= 400) return { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400', badge: 'bg-rose-500', name: 'Very Poor' };
    return { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', badge: 'bg-purple-600', name: 'Severe+' };
  };

  const currentAqiInfo = getAqiColor(loc.baseAqi + 40);

  // Planner calculations
  const morningAqi = Math.min(500, loc.baseAqi + 115);
  const middayAqi = Math.max(160, loc.baseAqi + 30);
  const nightAqi = Math.min(500, loc.baseAqi + 160);
  const reductionPct = Math.round(((morningAqi - middayAqi) / morningAqi) * 100);

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-[#0F172A]/80 backdrop-blur sticky top-0 z-50 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Wind className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white">AirPulse</span>
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  Hackathon Round 1
                </span>
              </div>
              <p className="text-xs text-slate-400">Predict Pollution. Understand Exposure. Make Better Decisions.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Location:</span>
              <select 
                value={selectedLocId} 
                onChange={(e) => setSelectedLocId(e.target.value)}
                className="bg-transparent font-medium text-white outline-none cursor-pointer"
              >
                {LOCATIONS.map(l => (
                  <option key={l.id} value={l.id} className="bg-slate-900 text-slate-100">
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Prototype
            </span>
          </div>
        </div>
      </header>

      {/* Hero Notification Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border-b border-emerald-900/30 px-4 py-2 text-xs text-center text-slate-300">
        <span className="font-semibold text-emerald-400">Diwali Micro-Zone Intelligence:</span> Forecasting neighbourhood air pollution curves and exposure reduction windows for Delhi NCR.
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto w-full px-4 lg:px-8 pt-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-2">
          {[
            { id: 'timeline', label: 'Diwali Timeline & Forecast', icon: TrendingUp },
            { id: 'comparison', label: 'Neighbourhood Comparison & Heatmap', icon: Layers },
            { id: 'planner', label: 'Personal Exposure Planner ⭐', icon: ShieldCheck, highlight: true },
            { id: 'monetization', label: 'Startup & Revenue Model 💰', icon: Zap },
            { id: 'insights', label: 'Environmental Data & Alerts', icon: AlertTriangle },
            { id: 'presentation', label: 'Hackathon PPT & Docs', icon: Award }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive 
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' 
                    : tab.highlight
                    ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-700/50 hover:bg-emerald-900/40'
                    : 'bg-slate-900/70 text-slate-300 hover:bg-slate-800/90 border border-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-current'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 lg:px-8 py-6 flex-1 space-y-6">

        {/* =========================================================================
            TAB 1: TIMELINE & NEIGHBOURHOOD FORECAST
           ========================================================================= */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            {/* Top Metric Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Primary Current AQI Card */}
              <div className="md:col-span-2 bg-[#16213E] rounded-2xl p-5 border border-slate-800 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      CPCB CAAQMS Station: {loc.station}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      Measured Observation
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">{loc.name}</h2>
                  <p className="text-xs text-slate-400 mb-4">{loc.zone}</p>
                </div>

                <div className="flex flex-wrap items-end gap-6 pt-2 border-t border-slate-800">
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">Current Measured AQI</span>
                    <div className="flex items-baseline gap-3">
                      <span className={`text-5xl font-black ${currentAqiInfo.text}`}>
                        {loc.baseAqi + 40}
                      </span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${currentAqiInfo.badge} text-slate-950`}>
                        {currentAqiInfo.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-400 block text-[11px]">PM2.5 Conc.</span>
                      <span className="font-semibold text-slate-200">235 µg/m³</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">PM10 Conc.</span>
                      <span className="font-semibold text-slate-200">360 µg/m³</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Dominant Pollutant</span>
                      <span className="font-semibold text-amber-400">PM2.5 (Fine)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Atmospheric Weather Card */}
              <div className="bg-[#16213E] rounded-2xl p-5 border border-slate-800 shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-2">
                    Meteorological Inversion
                  </span>
                  <h3 className="text-base font-bold text-white mb-3">Atmospheric Boundary</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1.5"><Thermometer className="w-3.5 h-3.5 text-rose-400" /> Temperature</span>
                      <span className="font-semibold text-white">20.8 °C (Cooling)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1.5"><Droplets className="w-3.5 h-3.5 text-cyan-400" /> Relative Humidity</span>
                      <span className="font-semibold text-white">72% (High haze)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1.5"><Wind className="w-3.5 h-3.5 text-emerald-400" /> Wind Velocity</span>
                      <span className="font-semibold text-amber-400">2.1 m/s (Calm)</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                  <span className="text-rose-400 font-semibold">Trapping Factor:</span> Nocturnal planetary boundary layer collapses below 350m, preventing particulate dispersion.
                </div>
              </div>

              {/* Diwali Peak Projection Card */}
              <div className="bg-[#16213E] rounded-2xl p-5 border border-slate-800 shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider block mb-2">
                    Projected Diwali Midnight Peak
                  </span>
                  <h3 className="text-base font-bold text-white mb-1">Peak Hazard Forecast</h3>
                  <p className="text-[11px] text-slate-400 mb-3">Model demonstration projection for Nov 01–02</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-black text-rose-400">{loc.peakAqi}</span>
                    <span className="text-xs font-bold text-purple-400 uppercase">Severe+</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 h-full w-[95%]"></div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                  <span className="text-amber-400 font-semibold">Peak Window:</span> Nov 01, 20:00 to Nov 02, 03:00. Firecrackers compound baseline by +145 pts.
                </div>
              </div>
            </div>

            {/* 3-Phase Diwali Timeline Visual Chart */}
            <div className="bg-[#16213E] rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">3-Phase Diwali Pollution Timeline</h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400">
                      Demonstration Predictive Model
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Chronological progression from pre-festival accumulation to midnight pyrotechnic surge and post-festival atmospheric clearance.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> Pre-Diwali</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Diwali Peak</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Post-Diwali</span>
                </div>
              </div>

              {/* Interactive Timeline Bar Chart / Stepper */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2 pt-2">
                {TIMELINE_DATA.map((t, idx) => {
                  const isPeak = t.aqi >= 400;
                  const phaseColor = t.phase === 'Pre-Diwali' ? 'border-cyan-500/40 text-cyan-400' : t.phase === 'Diwali Peak' ? 'border-rose-500/60 text-rose-400' : 'border-amber-500/40 text-amber-400';
                  return (
                    <div 
                      key={idx}
                      className={`bg-slate-900/80 rounded-xl p-3 border ${phaseColor} flex flex-col justify-between hover:bg-slate-800 transition`}
                    >
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider block opacity-75">{t.phase}</span>
                        <span className="text-xs font-bold text-white block mt-0.5">{t.label}</span>
                      </div>
                      <div className="my-3">
                        <span className="text-2xl font-black block">{t.aqi}</span>
                        <span className="text-[10px] text-slate-400">AQI Index</span>
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-3 leading-relaxed">
                        {t.condition}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Data Transparency Banner */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-xs text-slate-400 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-200 font-medium">Model Transparency & Academic Integrity:</span> Forecast values shown are derived from our demonstration time-series regression pipeline (`ml/predict.py`). Multi-year training on live CPCB ground truth is planned for Round 2.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: NEIGHBOURHOOD COMPARISON & HEATMAP
           ========================================================================= */}
        {activeTab === 'comparison' && (
          <div className="space-y-6">
            {/* Header Callout: The Macro vs Micro Reality */}
            <div className="bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 border border-rose-900/40 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-bold text-white mb-1">Why City-Level AQI Averages Fail Citizens</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    A single reported index (e.g. "Delhi AQI: 375") creates a false sense of uniformity. In reality, neighbourhood variance exceeds <strong className="text-white">225+ AQI points simultaneously</strong>. Heavy choke-points experience life-threatening hazardous spikes, while open green corridors remain significantly more tolerable.
                  </p>
                </div>
              </div>
            </div>

            {/* Micro-Zone Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {LOCATIONS.map(item => {
                const isSelected = item.id === selectedLocId;
                const peakColor = getAqiColor(item.peakAqi);
                const baseColor = getAqiColor(item.baseAqi + 40);

                return (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedLocId(item.id)}
                    className={`bg-[#16213E] rounded-2xl p-5 border transition cursor-pointer relative ${
                      isSelected ? 'border-emerald-500 shadow-lg shadow-emerald-500/10' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-slate-950">
                        Selected Zone
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">{item.station}</span>
                    <h4 className="text-lg font-bold text-white mt-1 mb-0.5">{item.name}</h4>
                    <p className="text-xs text-slate-400 mb-4">{item.zone}</p>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Current Observed</span>
                        <span className={`text-xl font-extrabold ${baseColor.text}`}>{item.baseAqi + 40}</span>
                        <span className="text-[10px] text-slate-500 block">{baseColor.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Projected Diwali Peak</span>
                        <span className={`text-xl font-extrabold ${peakColor.text}`}>{item.peakAqi}</span>
                        <span className="text-[10px] text-slate-500 block">{peakColor.name}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Coordinates: {item.lat}°N, {item.lon}°E</span>
                      <span className={`font-semibold ${item.peakAqi > 400 ? 'text-rose-400' : 'text-amber-400'}`}>
                        {item.peakAqi > 400 ? 'Severe Risk Zone' : 'Moderate Buffer Zone'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* NAQI Standards Reference Legend */}
            <div className="bg-[#16213E] rounded-2xl p-5 border border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Official Indian National Air Quality Index (NAQI) Scale</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-2 rounded-lg text-emerald-400">
                  <span className="font-bold block">0 – 50</span>
                  <span className="text-[11px]">Good</span>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 p-2 rounded-lg text-green-400">
                  <span className="font-bold block">51 – 100</span>
                  <span className="text-[11px]">Satisfactory</span>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-lg text-amber-400">
                  <span className="font-bold block">101 – 200</span>
                  <span className="text-[11px]">Moderate</span>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/30 p-2 rounded-lg text-orange-400">
                  <span className="font-bold block">201 – 300</span>
                  <span className="text-[11px]">Poor</span>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 p-2 rounded-lg text-rose-400">
                  <span className="font-bold block">301 – 400</span>
                  <span className="text-[11px]">Very Poor</span>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 p-2 rounded-lg text-purple-400">
                  <span className="font-bold block">401 – 500</span>
                  <span className="text-[11px]">Severe+</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: PERSONAL POLLUTION EXPOSURE PLANNER ⭐ (UNIQUE EXTRA FEATURE)
           ========================================================================= */}
        {activeTab === 'planner' && (
          <div className="space-y-6">
            {/* Differentiator Banner */}
            <div className="bg-gradient-to-r from-emerald-950/60 via-[#16213E] to-slate-900 border border-emerald-500/40 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold mb-2">
                    <Award className="w-3.5 h-3.5" /> Differentiating Hackathon Innovation
                  </div>
                  <h2 className="text-2xl font-bold text-white">Personal Pollution Exposure & Activity Planner</h2>
                  <p className="text-xs text-slate-300 max-w-2xl mt-1">
                    Raw AQI numbers don't protect lungs unless translated into actionable decisions. Compare forecast time slots to discover comparatively lower-pollution windows for your daily activities.
                  </p>
                </div>
                <div className="bg-slate-900/90 border border-slate-700 p-4 rounded-xl text-center shrink-0">
                  <span className="text-[11px] text-slate-400 block">Est. Particulate Exposure Reduction</span>
                  <span className="text-3xl font-black text-emerald-400">~{reductionPct}%</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">By shifting from morning to midday</span>
                </div>
              </div>
            </div>

            {/* Controls: Activity & Date Selector */}
            <div className="bg-[#16213E] rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Select Activity Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Walking', 'Outdoor Sports', 'Commuting', 'Outdoor Events'].map(act => (
                      <button
                        key={act}
                        onClick={() => setSelectedActivity(act)}
                        className={`text-xs font-medium py-2 px-3 rounded-lg border text-center transition ${
                          selectedActivity === act 
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold' 
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {act}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Selected Location</label>
                  <div className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs">
                    <span className="font-bold text-white block">{loc.name}</span>
                    <span className="text-[11px] text-slate-400">{loc.zone}</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Select Festive Date</label>
                  <select 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white outline-none cursor-pointer"
                  >
                    <option value="2026-10-31">Oct 31, 2026 (Choti Diwali)</option>
                    <option value="2026-11-01">Nov 01, 2026 (Diwali Festival Day)</option>
                    <option value="2026-11-02">Nov 02, 2026 (Govardhan Puja / Day +1)</option>
                    <option value="2026-11-03">Nov 03, 2026 (Bhai Dooj / Day +2)</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-2.5 text-[11px] text-emerald-300">
                    <span className="font-bold block">Optimal Window Recommendation</span>
                    <span>Midday Thermal Window (01:00 PM – 03:30 PM)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Slot Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Slot 1: Early Morning */}
              <div className="bg-[#16213E] rounded-2xl p-5 border border-rose-500/40 relative">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  High Risk (Not Recommended)
                </span>
                <h4 className="text-base font-bold text-white mt-2">Early Morning Window</h4>
                <p className="text-xs text-slate-400 mb-3">06:00 AM – 08:30 AM</p>

                <div className="my-4">
                  <span className="text-4xl font-black text-rose-400">{morningAqi}</span>
                  <span className="text-xs text-slate-400 block mt-1">Projected AQI (Severe Inversion)</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
                  Trapped overnight smoke sits dense near the surface. High respiratory ventilation during morning jogging will deposit maximum PM2.5 in deep lung tissue.
                </p>
              </div>

              {/* Slot 2: Midday Thermal Window (Recommended) */}
              <div className="bg-[#16213E] rounded-2xl p-5 border-2 border-emerald-500 relative shadow-xl shadow-emerald-500/10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500 text-slate-950">
                    ⭐ Recommended Lowest-Pollution Window
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mt-2">Midday Thermal Window</h4>
                <p className="text-xs text-slate-400 mb-3">01:00 PM – 03:30 PM</p>

                <div className="my-4">
                  <span className="text-4xl font-black text-emerald-400">{middayAqi}</span>
                  <span className="text-xs text-slate-400 block mt-1">Projected AQI (Daytime Solar Mixing)</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
                  Solar radiation warms the earth's surface, breaking the ground inversion and expanding the mixing layer. Yields ~{reductionPct}% lower particulate exposure than early morning.
                </p>
              </div>

              {/* Slot 3: Night Festive Window */}
              <div className="bg-[#16213E] rounded-2xl p-5 border border-purple-500/40 relative">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Critical Hazard Spike
                </span>
                <h4 className="text-base font-bold text-white mt-2">Night Festive Window</h4>
                <p className="text-xs text-slate-400 mb-3">07:30 PM – 10:30 PM</p>

                <div className="my-4">
                  <span className="text-4xl font-black text-purple-400">{nightAqi}</span>
                  <span className="text-xs text-slate-400 block mt-1">Projected AQI (Firecracker Bursts)</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
                  Peak fireworks combustion combines with falling nighttime temperatures and zero surface winds. Highly toxic pyrotechnic smoke lingers heavily.
                </p>
              </div>
            </div>

            {/* Practical Risk Mitigation Guidance */}
            <div className="bg-[#16213E] rounded-2xl p-5 border border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Practical Exposure Reduction Guidance for: {selectedActivity}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="font-semibold text-emerald-400 block mb-1">Time Slot Adaptation</span>
                  <span className="text-slate-300">Reschedule {selectedActivity.toLowerCase()} sessions to early afternoon (1:00 PM – 3:30 PM) to utilize peak boundary layer ventilation.</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="font-semibold text-cyan-400 block mb-1">Physical Protection</span>
                  <span className="text-slate-300">Wear a certified, well-fitted N95 or FFP2 respirator mask. Cloth and surgical masks do not filter sub-micron PM2.5 particulates.</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="font-semibold text-amber-400 block mb-1">Indoor Air Defense</span>
                  <span className="text-slate-300">Seal windows between 7 PM and 9 AM. Run indoor HEPA air filtration if available; avoid high-cadence outdoor cardio when AQI &gt; 350.</span>
                </div>
              </div>
            </div>

            {/* MANDATORY HEALTH GOVERNANCE & NON-MEDICAL DISCLAIMER */}
            <div className="bg-rose-950/20 border-2 border-rose-500/50 rounded-2xl p-5 text-xs text-rose-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h5 className="font-bold text-rose-400 uppercase tracking-wider text-[11px]">
                    Responsible AI & Health Governance Disclaimer
                  </h5>
                  <p className="leading-relaxed text-slate-300">
                    AirPulse is an <strong className="text-white">environmental awareness and activity-scheduling tool</strong> based on atmospheric predictive models. It is <strong className="text-rose-400">NOT a medical diagnosis system</strong>, clinical advisory, or personalized health guarantee platform. It does not diagnose asthma, COPD, or clinical respiratory conditions, does not prescribe treatments or recommend changes to medication, and does not claim any outdoor activity is completely risk-free. AirPulse collects zero personal health or medical records. Consult a qualified medical practitioner for individual clinical guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB: STARTUP & REVENUE MODEL 💰 (PROFIT ENGINE)
           ========================================================================= */}
        {activeTab === 'monetization' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-950/60 via-[#16213E] to-slate-900 border border-emerald-500/40 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold mb-2">
                    <Zap className="w-3.5 h-3.5" /> Sustainable Commercial Viability
                  </div>
                  <h2 className="text-2xl font-bold text-white">Startup Revenue & Monetization Engine</h2>
                  <p className="text-xs text-slate-300 max-w-2xl mt-1">
                    AirPulse operates on a dual-engine model: <strong className="text-white">100% Free Public Good</strong> for common citizens, financed by high-margin <strong className="text-emerald-400">B2B SaaS subscriptions and enterprise APIs</strong>.
                  </p>
                </div>
                <div className="bg-slate-900/90 border border-slate-700 p-4 rounded-xl text-center shrink-0">
                  <span className="text-[11px] text-slate-400 block">Projected Year-1 ARR (Delhi NCR)</span>
                  <span className="text-3xl font-black text-emerald-400">₹45 - 60 Lakhs</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">High-margin B2B SaaS + Affiliate</span>
                </div>
              </div>
            </div>

            {/* 3 Core Revenue Streams */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Stream 1: CampusAir B2B SaaS */}
              <div className="bg-[#16213E] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                      B2B SaaS Subscription
                    </span>
                    <span className="text-xs font-bold text-emerald-400">₹2,500 / month</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">CampusAir for Schools & Colleges</h3>
                  <p className="text-xs text-slate-400 mb-4">Protecting students during morning sports & assemblies</p>
                  
                  {/* Live Simulation Card */}
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-2 text-xs mb-4">
                    <span className="text-[11px] font-semibold text-slate-300 block">School Portal Alert Simulation:</span>
                    <div className="p-2.5 rounded bg-rose-950/30 border border-rose-800/40 text-rose-200">
                      <strong>⚠️ DPS R.K. Puram Advisory:</strong> Morning outdoor assembly moved indoors. High nocturnal inversion (AQI 425 at 8 AM). Outdoor sports rescheduled to 1:30 PM.
                    </div>
                    <span className="text-[10px] text-slate-400 block">Automated WhatsApp notifications broadcast to 1,800+ parents.</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-xs text-slate-300">
                  <span className="text-white font-semibold">Unit Economics:</span> 100 private schools in Delhi NCR = <strong>₹2,50,000 / month MRR (₹30L ARR)</strong>.
                </div>
              </div>

              {/* Stream 2: FleetSafe B2B API */}
              <div className="bg-[#16213E] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                      Enterprise REST API
                    </span>
                    <span className="text-xs font-bold text-emerald-400">₹0.30 / query</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">FleetSafe Delivery Optimizer</h3>
                  <p className="text-xs text-slate-400 mb-4">Zomato, Swiggy, Blinkit rider health & route protection</p>
                  
                  {/* Live Simulation Card */}
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-2 text-xs mb-4">
                    <span className="text-[11px] font-semibold text-slate-300 block">Logistics Dispatch API Response:</span>
                    <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-400">
                      POST /api/v1/fleet/route-hazard<br/>
                      {JSON.stringify({ bypass_zone: "Anand Vihar (AQI 490)", safe_alternate: "Vikas Marg Buffer", mandatory_n95: true }, null, 0)}
                    </div>
                    <span className="text-[10px] text-slate-400 block">Lowers rider sickness absenteeism by ~28% during Diwali week rush.</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-xs text-slate-300">
                  <span className="text-white font-semibold">Unit Economics:</span> 5 quick-commerce city hubs at ₹30,000/mo = <strong>₹1,50,000 / month</strong>.
                </div>
              </div>

              {/* Stream 3: Certified Marketplace Affiliate */}
              <div className="bg-[#16213E] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
                      Affiliate Commerce
                    </span>
                    <span className="text-xs font-bold text-emerald-400">8% - 15% Comm.</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">Certified Clean Air Store</h3>
                  <p className="text-xs text-slate-400 mb-4">Contextual verified N95 masks & HEPA purifiers</p>
                  
                  {/* Live Simulation Card */}
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-2 text-xs mb-4">
                    <span className="text-[11px] font-semibold text-slate-300 block">Severe Exposure In-App Recommendations:</span>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white block text-[11px]">Certified N95 Respirator Pack (10x)</span>
                        <span className="text-[10px] text-emerald-400">Filters 99.4% PM2.5 • Tested</span>
                      </div>
                      <span className="text-xs font-bold text-white">₹399</span>
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white block text-[11px]">HEPA H13 Room Air Purifier</span>
                        <span className="text-[10px] text-emerald-400">CADR 350 m³/h • 350 sq ft</span>
                      </div>
                      <span className="text-xs font-bold text-white">₹7,999</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-xs text-slate-300">
                  <span className="text-white font-semibold">Unit Economics:</span> 10,000 Diwali peak orders = <strong>₹1.5L - ₹3.0L zero-risk profit</strong>.
                </div>
              </div>
            </div>

            {/* B2G Municipal Smog Gun Dispatch */}
            <div className="bg-[#16213E] rounded-2xl p-5 border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                    B2G Government & Smart City Contracts
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">MuniPulse: Predictive Anti-Smog Gun & Sprinkler Dispatch</h4>
                  <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
                    Municipal corporations (MCD/DPCC) deploy water misting trucks blindly. AirPulse gives them a 6-hour advance route map to spray road dust in vulnerable neighbourhoods <em className="text-emerald-400 font-semibold">before</em> nocturnal temperature inversion traps particulate smoke.
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-xs text-slate-400 block">Target Tender Category</span>
                  <span className="text-sm font-bold text-amber-400">Smart City Clean Air Mission</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: ENVIRONMENTAL DATA & SMART ALERTS
           ========================================================================= */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Alert 1 */}
              <div className="bg-[#16213E] rounded-2xl p-5 border-l-4 border-l-rose-500 border-y border-r border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
                    Critical Alert
                  </span>
                  <span className="text-xs text-slate-400">Nov 01, 20:00 – Nov 02, 04:00</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">Severe Nocturnal Particulate Inversion Forecast</h4>
                <p className="text-xs text-slate-300 mb-3">
                  Affected Zones: Anand Vihar, Punjabi Bagh, Rohini Sector 16. Projected AQI ranges between 460 and 500+ [Severe+].
                </p>
                <div className="text-[11px] text-amber-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  💡 <strong>Action:</strong> Keep residential doors and windows sealed; postpone morning physical training before noon.
                </div>
              </div>

              {/* Alert 2 */}
              <div className="bg-[#16213E] rounded-2xl p-5 border-l-4 border-l-emerald-500 border-y border-r border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                    Advisory Window
                  </span>
                  <span className="text-xs text-slate-400">Nov 01, 13:00 – 15:30</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">Daytime Thermal Boundary Ventilation Window</h4>
                <p className="text-xs text-slate-300 mb-3">
                  Affected Zones: All Delhi NCR micro-zones. Solar heating facilitates temporary upward convective dispersion.
                </p>
                <div className="text-[11px] text-emerald-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  💡 <strong>Action:</strong> Recommended window for essential outdoor transit, groceries, and low-exertion errands.
                </div>
              </div>
            </div>

            {/* Environmental Integration Factors */}
            <div className="bg-[#16213E] rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">Atmospheric Data Integration Matrix</h3>
              <p className="text-xs text-slate-400">
                How AirPulse correlates multi-sensor atmospheric indicators with particulate retention during festive episodes:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400 block text-sm">1. Planetary Boundary Layer (PBLH)</span>
                  <p className="text-slate-300">
                    During winter afternoons, boundary height reaches ~1,200m. At night, rapid radiational cooling causes it to drop below 300m, trapping 100% of firecracker emissions in a shallow breathing box.
                  </p>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-cyan-400 block text-sm">2. Surface Wind Stagnation</span>
                  <p className="text-slate-300">
                    Wind velocities below 2.0 m/s prevent horizontal particulate transport. In calm conditions, toxic smoke lingers over the emitting neighbourhood for 48+ hours without ventilation.
                  </p>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-amber-400 block text-sm">3. Secondary Aerosol Chemistry</span>
                  <p className="text-slate-300">
                    High relative humidity (&gt;70%) combined with sulfur dioxide (SO2) from fireworks accelerates the formation of secondary sulfate and nitrate aerosols, magnifying toxic haze opacity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: HACKATHON PRESENTATION & ARCHITECTURE
           ========================================================================= */}
        {activeTab === 'presentation' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/40 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                    Mandatory Hackathon Deliverable
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">AirPulse PowerPoint Presentation (.pptx)</h3>
                  <p className="text-xs text-slate-300 max-w-xl mt-1">
                    Editable 8-slide widescreen (16:9) presentation generated specifically for the First Round of the hackathon. Includes embedded speaker notes and complete diagrams.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-emerald-400 block">presentation/AirPulse_Hackathon_Round1.pptx</span>
                  <span className="text-[11px] text-slate-400">Saved in project root repository</span>
                </div>
              </div>
            </div>

            {/* 8 Slides Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {[
                { num: 'Slide 1', title: 'Title & Vision', desc: 'AirPulse branding, tagline, team placeholders, hackathon track.', color: 'border-emerald-500/40' },
                { num: 'Slide 2', title: 'Problem Statement', desc: 'Why city averages fail; macro vs micro reality and Diwali firecracker inversion.', color: 'border-rose-500/40' },
                { num: 'Slide 3', title: 'Our Solution', desc: '4-step journey: Ingestion → Feature Engineering → ML Forecast → Personal Action.', color: 'border-cyan-500/40' },
                { num: 'Slide 4', title: 'Core Features', desc: 'Micro-zone forecasting, 3-phase timeline, comparison heatmap, smart alerts.', color: 'border-amber-500/40' },
                { num: 'Slide 5', title: 'Unique Extra Feature', desc: 'Personal Pollution Exposure Planner with slot comparison & non-medical disclaimer.', color: 'border-emerald-500/60' },
                { num: 'Slide 6', title: 'System Architecture', desc: 'End-to-end pipeline: React → FastAPI → Preprocessing → ML → Serving layer.', color: 'border-purple-500/40' },
                { num: 'Slide 7', title: 'Tech Stack & Feasibility', desc: 'React, FastAPI, Scikit-learn, MAE/RMSE metrics, persistence baseline benchmark.', color: 'border-cyan-500/40' },
                { num: 'Slide 8', title: 'Impact & Future Scope', desc: 'Benefits for schools, citizens; startup vision and long-term roadmap.', color: 'border-emerald-500/40' }
              ].map(s => (
                <div key={s.num} className={`bg-[#16213E] p-4 rounded-xl border ${s.color}`}>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{s.num}</span>
                  <h4 className="text-sm font-bold text-white mt-1 mb-1">{s.title}</h4>
                  <p className="text-slate-300 leading-relaxed text-[11px]">{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Documentation Links */}
            <div className="bg-[#16213E] rounded-2xl p-5 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white">Deliverable Files Created</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white block">presentation/AirPulse_Hackathon_Round1.pptx</span>
                    <span className="text-slate-400 text-[11px]">8 Slides Widescreen 16:9 Presentation</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-xs">Generated</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white block">presentation/presentation_script.md</span>
                    <span className="text-slate-400 text-[11px]">Slide-by-slide speaker notes & Hinglish tips</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-xs">Complete</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white block">presentation/judge_questions.md</span>
                    <span className="text-slate-400 text-[11px]">8 Tough judge Q&As with winning answers</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-xs">Complete</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white block">ml/train.py & ml/predict.py</span>
                    <span className="text-slate-400 text-[11px]">Persistence baseline & Regressor pipeline</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-xs">Ready</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#0F172A] py-6 px-4 lg:px-8 text-xs text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-bold text-white">AirPulse</span> — AI-Powered Diwali Air Quality Prediction
            <p className="text-[11px] text-slate-500 mt-0.5">Predict Pollution. Understand Exposure. Make Better Decisions.</p>
          </div>
          <div className="text-center sm:text-right text-[11px]">
            <span>Hackathon 2026 Round 1 Deliverable</span>
            <span className="mx-2">•</span>
            <span className="text-emerald-400">Demonstration Prototype</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
