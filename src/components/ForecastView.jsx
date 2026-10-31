import React, { useState } from 'react';
import { 
  TrendingUp, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  Info, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  Activity, 
  ArrowDownRight, 
  ArrowUpRight,
  Flame,
  Wind
} from 'lucide-react';
import { getAqiCategory } from '../services/api';

export default function ForecastView({ 
  forecastData, 
  loading, 
  forecastPeriod, 
  setForecastPeriod, 
  locations, 
  selectedLocId, 
  setSelectedLocId 
}) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  if (loading || !forecastData) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
        <p className="text-sm text-slate-400">Computing 24-72h atmospheric forecast curves...</p>
      </div>
    );
  }

  const { location, summary, hourly_forecast, is_demonstration_model, model_name, model_description } = forecastData;

  // Chart Dimensions
  const chartWidth = 900;
  const chartHeight = 280;
  const padding = { top: 25, right: 35, bottom: 45, left: 55 };
  const graphWidth = chartWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;

  // Max and Min scales
  const maxAqi = 500;
  const minAqi = 0;

  // Coordinate mapper
  const getX = (index) => padding.left + (index / (hourly_forecast.length - 1)) * graphWidth;
  const getY = (val) => padding.top + graphHeight - ((val - minAqi) / (maxAqi - minAqi)) * graphHeight;

  // Generate SVG path for AQI Line
  const aqiPathD = hourly_forecast.reduce((acc, pt, idx) => {
    const x = getX(idx);
    const y = getY(pt.forecast_aqi);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // Generate SVG path for Confidence Band (Upper + Lower Polygon)
  const upperPoints = hourly_forecast.map((pt, idx) => `${getX(idx)},${getY(pt.confidence_interval_high)}`);
  const lowerPoints = [...hourly_forecast].reverse().map((pt, idx) => {
    const origIdx = hourly_forecast.length - 1 - idx;
    return `${getX(origIdx)},${getY(pt.confidence_interval_low)}`;
  });
  const confidencePolygon = `${upperPoints.join(' ')} ${lowerPoints.join(' ')}`;

  // 3-Phase Timeline cards breakdown
  const phaseCards = [
    {
      phase: "Phase 1: Pre-Diwali Build-up",
      window: "Days -3 to -1 (Oct 29 – Oct 31)",
      aqiRange: "280 – 360 [Poor to Very Poor]",
      color: "border-amber-500/40 bg-amber-500/5 text-amber-300",
      notes: "Driven by regional stubble burning transit, festive shopping vehicle idling, and early nocturnal temperature drops."
    },
    {
      phase: "Phase 2: Diwali Night Peak Surge",
      window: "Diwali Evening to 03:00 AM (Nov 01 – Nov 02)",
      aqiRange: "430 – 500 [Severe+ Hazard]",
      color: "border-rose-500/40 bg-rose-500/5 text-rose-300",
      notes: "Severe pyrotechnic emission bursts trapped near ground level by calm surface winds (<1.5 m/s) and nocturnal inversion collapse."
    },
    {
      phase: "Phase 3: Post-Diwali Dispersion",
      window: "Days +1 to +3 (Nov 02 – Nov 04)",
      aqiRange: "340 – 440 [Gradual Recovery]",
      color: "border-cyan-500/40 bg-cyan-500/5 text-cyan-300",
      notes: "Smog evacuation is heavily constrained by stagnant winter air; slow daytime ventilation takes 48–72 hours to reset."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Model Transparency Disclosure Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">{model_name}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-400">
                Demonstration Model
              </span>
            </div>
            <p className="text-slate-400 mt-0.5">{model_description}</p>
          </div>
        </div>

        {/* Horizon Selector */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 shrink-0">
          {[24, 48, 72].map((hrs) => (
            <button
              key={hrs}
              onClick={() => setForecastPeriod(hrs)}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                forecastPeriod === hrs
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {hrs} Hours
            </button>
          ))}
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Projected Peak AQI</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400">{summary.peak_aqi}</div>
          <span className="text-[11px] text-slate-400 block truncate" title={summary.peak_time}>
            At {summary.peak_time}
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Lowest Exposure Window</span>
            <ArrowDownRight className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{summary.lowest_aqi}</div>
          <span className="text-[11px] text-slate-400 block truncate" title={summary.lowest_time}>
            At {summary.lowest_time}
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Average {forecastPeriod}h AQI</span>
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">{summary.average_aqi}</div>
          <span className="text-[11px] text-slate-400">
            {getAqiCategory(summary.average_aqi).name} Mean Exposure
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Target Location</span>
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-lg font-bold text-white truncate" title={location.name}>
            {location.short_name}
          </div>
          <span className="text-[11px] text-slate-400 truncate block">
            Baseline: {location.baseline_aqi} AQI
          </span>
        </div>
      </div>

      {/* Interactive SVG Timeline Forecast Chart */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Hourly Projected Air Quality & Uncertainty Band
            </h3>
            <p className="text-xs text-slate-400">
              Hover over timeline points to inspect predicted AQI, PM2.5 concentrations, and atmospheric notes.
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-cyan-400 rounded-full"></span>
              <span className="text-slate-300">Predicted AQI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-2 bg-cyan-500/20 border border-cyan-500/40 rounded-sm"></span>
              <span className="text-slate-400">90% Confidence Interval</span>
            </div>
          </div>
        </div>

        {/* SVG Chart Container */}
        <div className="relative w-full overflow-x-auto no-scrollbar">
          <div className="min-w-[700px]">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto select-none">
              <defs>
                <linearGradient id="aqiLineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="45%" stopColor="#f43f5e" />
                  <stop offset="70%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
                <linearGradient id="confGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* AQI Reference Horizontal Threshold Lines */}
              {[100, 200, 300, 400, 500].map((level) => {
                const y = getY(level);
                return (
                  <g key={level} opacity="0.35">
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={chartWidth - padding.right}
                      y2={y}
                      stroke="#475569"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={padding.left - 8}
                      y={y + 3.5}
                      fill="#94a3b8"
                      fontSize="9"
                      textAnchor="end"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {level}
                    </text>
                  </g>
                );
              })}

              {/* Shaded Confidence Band */}
              <polygon points={confidencePolygon} fill="url(#confGradient)" />

              {/* Main Forecast AQI Line */}
              <path
                d={aqiPathD}
                fill="none"
                stroke="url(#aqiLineGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Key Data Point Dots & Hover Scrubbers */}
              {hourly_forecast.map((pt, idx) => {
                const x = getX(idx);
                const y = getY(pt.forecast_aqi);
                const isHovered = hoveredPoint && hoveredPoint.hour_offset === pt.hour_offset;
                
                // Show dot every few hours to keep clean
                const step = forecastPeriod === 24 ? 2 : (forecastPeriod === 48 ? 4 : 6);
                const showDot = idx % step === 0 || idx === hourly_forecast.length - 1;

                return (
                  <g key={idx}>
                    {/* Hover target rect for seamless mouseover */}
                    <rect
                      x={x - (graphWidth / hourly_forecast.length) / 2}
                      y={padding.top}
                      width={graphWidth / hourly_forecast.length}
                      height={graphHeight}
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredPoint(pt)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />

                    {/* Timeline tick label on bottom axis */}
                    {showDot && (
                      <g>
                        <line x1={x} y1={padding.top + graphHeight} x2={x} y2={padding.top + graphHeight + 4} stroke="#64748b" />
                        <text
                          x={x}
                          y={padding.top + graphHeight + 16}
                          fill="#94a3b8"
                          fontSize="9"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                        >
                          {pt.time_str.split(' ')[0]}
                        </text>
                        <text
                          x={x}
                          y={padding.top + graphHeight + 27}
                          fill="#64748b"
                          fontSize="8"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                        >
                          {pt.date_str}
                        </text>
                      </g>
                    )}

                    {/* Visible Circle marker */}
                    {(showDot || isHovered) && (
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? 6 : 3.5}
                        fill={isHovered ? '#ffffff' : getAqiCategory(pt.forecast_aqi).hex}
                        stroke="#0f172a"
                        strokeWidth="2"
                        className="transition-all duration-150"
                      />
                    )}
                  </g>
                );
              })}

              {/* Active Hover Guide Line */}
              {hoveredPoint && (
                <line
                  x1={getX(hourly_forecast.findIndex(p => p.hour_offset === hoveredPoint.hour_offset))}
                  y1={padding.top}
                  x2={getX(hourly_forecast.findIndex(p => p.hour_offset === hoveredPoint.hour_offset))}
                  y2={padding.top + graphHeight}
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              )}
            </svg>
          </div>
        </div>

        {/* Hover Inspector Tooltip Panel */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 min-h-[72px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          {hoveredPoint ? (
            <>
              <div className="flex items-center gap-3">
                <div className={`px-2.5 py-1 rounded font-bold text-xs ${getAqiCategory(hoveredPoint.forecast_aqi).bg} ${getAqiCategory(hoveredPoint.forecast_aqi).border} border ${getAqiCategory(hoveredPoint.forecast_aqi).text}`}>
                  {hoveredPoint.forecast_aqi} AQI ({hoveredPoint.category})
                </div>
                <div>
                  <span className="font-semibold text-white">
                    {hoveredPoint.date_str} at {hoveredPoint.time_str} (+{hoveredPoint.hour_offset}h)
                  </span>
                  <p className="text-slate-400 text-[11px] mt-0.5">{hoveredPoint.atmospheric_notes}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[11px] shrink-0">
                <div>
                  <span className="text-slate-400">PM2.5: </span>
                  <span className="font-bold text-white">{hoveredPoint.pm25} µg/m³</span>
                </div>
                <div>
                  <span className="text-slate-400">PM10: </span>
                  <span className="font-bold text-white">{hoveredPoint.pm10} µg/m³</span>
                </div>
                <div>
                  <span className="text-slate-400">90% Range: </span>
                  <span className="font-mono text-cyan-300">[{hoveredPoint.confidence_interval_low} - {hoveredPoint.confidence_interval_high}]</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-slate-400 text-xs flex items-center gap-2 italic">
              <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              Hover across the timeline curve above to inspect exact hourly values and atmospheric inversion factors.
            </div>
          )}
        </div>
      </div>

      {/* 3-Phase Diwali Pollution Timeline Explanations */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-cyan-400" />
          The 3-Phase Diwali Pollution Evolution Cycle
        </h3>
        <p className="text-xs text-slate-400">
          Understanding the meteorological and anthropogenic mechanisms behind high-pollution spikes in Delhi NCR.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {phaseCards.map((c, i) => (
            <div key={i} className={`p-4 rounded-xl border ${c.color} flex flex-col justify-between space-y-3`}>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider block opacity-90">{c.phase}</span>
                <div className="text-sm font-semibold text-white mt-1">{c.window}</div>
                <div className="text-xs font-mono font-bold mt-1 text-slate-200">{c.aqiRange}</div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-2.5">
                {c.notes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
