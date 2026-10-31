import React from 'react';
import { 
  Wind, 
  Thermometer, 
  Droplets, 
  Compass, 
  Layers, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Info, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles,
  Gauge,
  Flame,
  Activity
} from 'lucide-react';
import { getAqiCategory } from '../services/api';

export default function DashboardView({ 
  airQuality, 
  loading, 
  onNavigateToForecast, 
  onNavigateToAlerts 
}) {
  if (loading || !airQuality) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
        <p className="text-sm text-slate-400">Retrieving neighbourhood environmental data...</p>
      </div>
    );
  }

  const { location, aqi, category, health_statement, pollutants, weather, timestamp, data_source, is_live_or_retrieved } = airQuality;
  const aqiTheme = getAqiCategory(aqi);

  // Pollutants metadata with safe limits based on Indian National Ambient Air Quality Standards (NAAQS)
  const pollutantCards = [
    { name: 'PM2.5', label: 'Fine Particulates', value: pollutants.pm25, unit: 'µg/m³', limit: 60, formula: 'PM₂.₅', desc: 'Deep lung penetrating combustion & pyrotechnic particles' },
    { name: 'PM10', label: 'Inhalable Dust', value: pollutants.pm10, unit: 'µg/m³', limit: 100, formula: 'PM₁₀', desc: 'Coarse road dust and surface construction matter' },
    { name: 'NO2', label: 'Nitrogen Dioxide', value: pollutants.no2, unit: 'µg/m³', limit: 80, formula: 'NO₂', desc: 'Heavy diesel exhaust & vehicle combustion' },
    { name: 'SO2', label: 'Sulfur Dioxide', value: pollutants.so2, unit: 'µg/m³', limit: 80, formula: 'SO₂', desc: 'Fireworks propellant & industrial emissions' },
    { name: 'CO', label: 'Carbon Monoxide', value: pollutants.co, unit: 'mg/m³', limit: 2.0, formula: 'CO', desc: 'Incomplete combustion in idling vehicle traffic' },
    { name: 'O3', label: 'Surface Ozone', value: pollutants.o3, unit: 'µg/m³', limit: 100, formula: 'O₃', desc: 'Photochemical smog secondary pollutant' },
  ];

  return (
    <div className="space-y-6">
      {/* Transparency & Data Source Status Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <div>
            <span className="font-semibold text-slate-100">Station Ground Truth: </span>
            <span className="text-slate-300">{data_source}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold text-[11px]">
            {is_live_or_retrieved ? 'RETRIEVED OBSERVATION' : 'SIMULATED DEMO'}
          </span>
          <span className="text-slate-400 text-[11px] flex items-center gap-1">
            <Clock className="w-3 h-3" /> {timestamp}
          </span>
        </div>
      </div>

      {/* Main AQI Overview Hero Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Giant AQI Score Gauge */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900/95 via-[#0c1527] to-slate-900/90 border border-slate-800/90 rounded-2xl p-6 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <h2 className="text-base font-bold text-white">{location.name}</h2>
            </div>
            <span className="text-[11px] font-medium text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-700/60">
              {location.cpcb_station_code}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center py-4">
            {/* Visual Gauge Meter */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                {/* Background Track */}
                <circle
                  cx="80"
                  cy="80"
                  r="64"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-slate-800/80"
                  fill="transparent"
                />
                {/* Colored Progress Arc */}
                <circle
                  cx="80"
                  cy="80"
                  r="64"
                  stroke={aqiTheme.hex}
                  strokeWidth="12"
                  strokeDasharray={402}
                  strokeDashoffset={402 - (402 * Math.min(500, aqi)) / 500}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                  fill="transparent"
                />
              </svg>
              
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">{aqi}</span>
                <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold mt-0.5">AQI INDEX</span>
              </div>
            </div>

            {/* Category Pill */}
            <div className={`mt-3 px-4 py-1.5 rounded-full border ${aqiTheme.border} ${aqiTheme.bg} flex items-center gap-2`}>
              <span className={`w-2.5 h-2.5 rounded-full ${aqiTheme.badge}`}></span>
              <span className={`text-sm font-bold ${aqiTheme.text}`}>{category}</span>
            </div>

            <p className="mt-3 text-xs text-center text-slate-300 max-w-sm leading-relaxed">
              {health_statement}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-center text-xs">
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
              <span className="text-slate-400 block text-[11px]">Zone Classification</span>
              <span className="font-semibold text-slate-200 mt-0.5 block truncate" title={location.zone_type}>
                {location.zone_type.split('/')[0]}
              </span>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
              <span className="text-slate-400 block text-[11px]">Elevation & Terrain</span>
              <span className="font-semibold text-slate-200 mt-0.5 block">{location.elevation_m}m MSL (Basin)</span>
            </div>
          </div>
        </div>

        {/* Right: Meteorological & Dispersion Context */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quick Warning Alert Banner if AQI is high */}
          {aqi >= 300 && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-rose-900/20 to-slate-900 border border-rose-500/40 flex items-start gap-3.5 shadow-lg shadow-rose-950/20">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-rose-300 text-sm">Elevated Particulate Warning in Effect</h4>
                  <button 
                    onClick={onNavigateToAlerts}
                    className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 text-[11px]"
                  >
                    View Alerts <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  Nocturnal inversion layer collapse is exacerbating pyrotechnic and diesel particulate trapping in {location.short_name}. Avoid early morning aerobic outdoor exercise.
                </p>
              </div>
            </div>
          )}

          {/* Environmental Indicators Grid */}
          <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Atmospheric & Dispersion Drivers</h3>
              </div>
              <span className="text-xs text-slate-400">Open-Meteo Integration</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/70">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs">Temperature</span>
                  <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="text-xl font-bold text-white">{weather.temperature_c}°C</div>
                <span className="text-[10px] text-slate-400">Rapid night cooling</span>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/70">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs">Humidity</span>
                  <Droplets className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div className="text-xl font-bold text-white">{weather.humidity_pct}%</div>
                <span className="text-[10px] text-slate-400">Smog aerosol hydration</span>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/70">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs">Surface Wind</span>
                  <Wind className="w-3.5 h-3.5 text-teal-400" />
                </div>
                <div className="text-xl font-bold text-white">{weather.wind_speed_kmh} <span className="text-xs font-normal">km/h</span></div>
                <span className="text-[10px] text-slate-400 truncate block" title={weather.wind_direction}>{weather.wind_direction.split(' ')[0]}</span>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/70">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs">Boundary Layer</span>
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <div className="text-xl font-bold text-white">{weather.boundary_layer_height_m} <span className="text-xs font-normal">m</span></div>
                <span className="text-[10px] text-rose-400 font-medium">Shallow trapping height</span>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/70">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs">Inversion Risk</span>
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-sm font-bold text-amber-300 mt-1">{weather.inversion_risk.split(' ')[0]}</div>
                <span className="text-[10px] text-slate-400">Traps smoke at surface</span>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/70">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs">Pressure</span>
                  <Compass className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <div className="text-xl font-bold text-white">{weather.atmospheric_pressure_hpa} <span className="text-xs font-normal">hPa</span></div>
                <span className="text-[10px] text-slate-400">High pressure ridge</span>
              </div>
            </div>

            {/* Quick Forecast Teaser */}
            <div className="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Curious how this changes over the next 24 to 72 hours?
              </span>
              <button
                onClick={onNavigateToForecast}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 font-semibold transition-colors flex items-center gap-1.5"
              >
                Inspect 72h Forecast <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pollutant Breakdown Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Continuous Ground Pollutant Telemetry
            </h3>
            <p className="text-xs text-slate-400">
              Parameters measured against National Ambient Air Quality Standards (NAAQS 24-Hour Limits).
            </p>
          </div>
          <span className="text-[11px] font-semibold text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">
            CPCB CAAQMS Protocol
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pollutantCards.map((p) => {
            const ratio = p.value / p.limit;
            const pct = Math.min(100, Math.round(ratio * 100));
            const isHazard = ratio > 2.0;
            const isElevated = ratio > 1.0;

            let barColor = 'bg-emerald-500';
            let textColor = 'text-emerald-400';
            if (isHazard) {
              barColor = 'bg-rose-500';
              textColor = 'text-rose-400';
            } else if (isElevated) {
              barColor = 'bg-amber-500';
              textColor = 'text-amber-400';
            }

            return (
              <div 
                key={p.name}
                className="bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 rounded-xl p-4 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                      {p.formula}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1.5">{p.label}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-white">{p.value}</span>
                    <span className="text-xs text-slate-400 ml-1">{p.unit}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-400">NAAQS Safe Limit: {p.limit} {p.unit}</span>
                    <span className={`font-semibold ${textColor}`}>{Math.round(ratio * 100)}% of limit</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${barColor} rounded-full transition-all duration-700`}
                      style={{ width: `${Math.min(100, pct)}%` }}
                    ></div>
                  </div>
                </div>

                <p className="mt-2.5 text-[11px] text-slate-400 leading-normal">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
