import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Map as MapIcon, 
  MapPin, 
  AlertTriangle, 
  Layers, 
  Filter, 
  Flame, 
  Wind, 
  Info, 
  ChevronRight, 
  Search, 
  Crosshair,
  Satellite,
  Eye,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Compass
} from 'lucide-react';
import { getAqiCategory } from '../services/api';

export default function RiskMapView({ 
  riskMapData, 
  loading, 
  onSelectZone 
}) {
  const [selectedZone, setSelectedZone] = useState(null);
  const [filterTier, setFilterTier] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [mapStyle, setMapStyle] = useState('streets'); // 'streets' (OSM), 'satellite' (Esri), 'esri_streets' (Esri Real Streets)
  const [showHeatmapCircles, setShowHeatmapCircles] = useState(true);
  const [showStationMarkers, setShowStationMarkers] = useState(true);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const heatLayerRef = useRef(null);
  const markersLayerRef = useRef(null);

  const zones = riskMapData?.zones || [];
  const activeHotspotsCount = riskMapData?.active_hotspots_count || 0;

  // Real Map Tile Provider Configurations
  const TILE_PROVIDERS = {
    streets: {
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    },
    esri_streets: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; High-Res World Street Map',
      maxZoom: 19
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri World Imagery (High-Res Satellite from Space)',
      maxZoom: 18
    }
  };

  // 1. Initialize & Handle Leaflet Map Safely in React 18
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Safety check: destroy existing map and clear leaflet container id
    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.remove();
      } catch (e) {
        console.warn('Map cleanup error:', e);
      }
      mapInstanceRef.current = null;
    }
    if (mapContainerRef.current._leaflet_id) {
      mapContainerRef.current._leaflet_id = null;
    }

    try {
      // Create new Leaflet instance centered on Delhi NCR
      const map = L.map(mapContainerRef.current, {
        center: [28.6350, 77.2150],
        zoom: 11,
        minZoom: 9,
        maxZoom: 18,
        zoomControl: true,
        scrollWheelZoom: true
      });

      const provider = TILE_PROVIDERS[mapStyle] || TILE_PROVIDERS.streets;
      L.tileLayer(provider.url, {
        attribution: provider.attribution,
        maxZoom: provider.maxZoom
      }).addTo(map);

      // Layer groups
      heatLayerRef.current = L.layerGroup().addTo(map);
      markersLayerRef.current = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;

      // Invalidate size on staggered timers to guarantee tile canvas layout
      setTimeout(() => map.invalidateSize(), 100);
      setTimeout(() => map.invalidateSize(), 300);
      setTimeout(() => map.invalidateSize(), 700);
    } catch (err) {
      console.error('Leaflet initialization error:', err);
    }

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {}
        mapInstanceRef.current = null;
      }
      if (mapContainerRef.current && mapContainerRef.current._leaflet_id) {
        mapContainerRef.current._leaflet_id = null;
      }
    };
  }, [mapStyle]);

  // 2. Render Heatmap and Pins when zones, filters, or layers change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || zones.length === 0) return;

    // Filter zones
    const visibleZones = zones.filter((z) => {
      const matchTier = filterTier === 'ALL' || (filterTier === 'HOTSPOTS' ? z.hotspot_status : z.risk_level.toUpperCase() === filterTier);
      const matchSearch = !searchQuery || z.name.toLowerCase().includes(searchQuery.toLowerCase()) || z.short_name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTier && matchSearch;
    });

    // Render Pollution Risk Heatmap Circles
    if (heatLayerRef.current) {
      heatLayerRef.current.clearLayers();

      if (showHeatmapCircles) {
        visibleZones.forEach((z) => {
          const aqi = z.peak_forecast_aqi;

          let radius = 3200;
          let color = '#eab308';
          let fillOpacity = 0.40;

          if (aqi >= 450) {
            radius = 5200;
            color = '#ef4444';
            fillOpacity = 0.55;
          } else if (aqi >= 380) {
            radius = 4200;
            color = '#f97316';
            fillOpacity = 0.45;
          } else if (aqi >= 260) {
            radius = 3400;
            color = '#eab308';
            fillOpacity = 0.35;
          } else {
            radius = 2800;
            color = '#10b981';
            fillOpacity = 0.30;
          }

          // Outer smoke dispersion halo
          L.circle([z.latitude, z.longitude], {
            radius: radius * 1.35,
            color: 'transparent',
            fillColor: color,
            fillOpacity: fillOpacity * 0.35,
            interactive: false
          }).addTo(heatLayerRef.current);

          // Core concentration heat bloom
          L.circle([z.latitude, z.longitude], {
            radius: radius,
            color: color,
            weight: 2,
            opacity: 0.8,
            fillColor: color,
            fillOpacity: fillOpacity,
            interactive: false
          }).addTo(heatLayerRef.current);
        });
      }
    }

    // Render Station Pins with Locality Name & Peak AQI
    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers();

      if (showStationMarkers) {
        visibleZones.forEach((z) => {
          const isHotspot = z.hotspot_status;
          const peak = z.peak_forecast_aqi;

          const customHtml = `
            <div style="position: relative; cursor: pointer; display: flex; flex-direction: column; align-items: center;">
              ${isHotspot ? `
                <div style="position: absolute; top: -8px; left: -8px; width: 48px; height: 48px; border-radius: 50%; background: ${z.risk_color}; opacity: 0.45; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              ` : ''}
              <div style="
                background: #090f1d;
                border: 2px solid ${z.risk_color};
                border-radius: 12px;
                padding: 4px 8px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.8), 0 0 12px ${z.risk_color}88;
                display: flex;
                align-items: center;
                gap: 5px;
                white-space: nowrap;
                color: white;
                font-family: system-ui, sans-serif;
              ">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: ${z.risk_color};"></span>
                <span style="font-size: 11px; font-weight: 800; color: white;">${z.short_name}</span>
                <span style="font-size: 11px; font-weight: 900; color: ${z.risk_color}; font-family: monospace;">${peak}</span>
              </div>
              <div style="
                width: 0; 
                height: 0; 
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid ${z.risk_color};
                margin-top: -1px;
              "></div>
            </div>
          `;

          const customIcon = L.divIcon({
            html: customHtml,
            className: 'custom-aqi-station-badge',
            iconSize: [120, 36],
            iconAnchor: [60, 34]
          });

          const marker = L.marker([z.latitude, z.longitude], { icon: customIcon }).addTo(markersLayerRef.current);

          const popupContent = `
            <div style="color: #0f172a; font-family: sans-serif; min-width: 220px; padding: 4px;">
              <div style="font-weight: 800; font-size: 14px; color: #020617; margin-bottom: 2px;">${z.name}</div>
              <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">${z.zone_type}</div>
              
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px; margin-bottom: 8px;">
                <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
                  <span style="color: #64748b;">Current Measured AQI:</span>
                  <span style="font-weight: 700; color: #0f172a;">${z.current_aqi} (${z.current_category})</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 11px;">
                  <span style="color: #64748b;">Projected Diwali Peak:</span>
                  <span style="font-weight: 900; color: ${z.risk_color}; font-size: 12px;">${z.peak_forecast_aqi} (${z.peak_category})</span>
                </div>
              </div>

              <div style="font-size: 10.5px; background: #eff6ff; border-left: 3px solid #3b82f6; padding: 6px; color: #1e3a8a; border-radius: 4px; line-height: 1.4;">
                <b>Action:</b> ${z.recommended_action}
              </div>
            </div>
          `;

          marker.bindPopup(popupContent, { maxWidth: 280 });
          marker.on('click', () => setSelectedZone(z));
        });
      }
    }
  }, [zones, filterTier, searchQuery, showHeatmapCircles, showStationMarkers]);

  // Smooth Fly-to-Zone
  const handleFlyToZone = (zone) => {
    setSelectedZone(zone);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([zone.latitude, zone.longitude], 13, { duration: 1.2 });
    }
  };

  const handleResetMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([28.6350, 77.2150], 11, { duration: 1 });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Real Map Style Switcher */}
      <div className="p-4 rounded-xl bg-slate-900/95 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MapIcon className="w-4 h-4 text-cyan-400" />
              Delhi NCR Real Pollution Risk Heatmap ({zones.length} Localities)
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Real Map Loaded
            </span>
          </div>
          <p className="text-slate-400 mt-1">
            Real geographical maps with live atmospheric dispersion heat layers across Delhi, Noida, Gurugram, Ghaziabad, and Faridabad.
          </p>
        </div>

        {/* Real Map Tile Switcher & Layer Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Map Layer Radios */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setMapStyle('streets')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                mapStyle === 'streets'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Real Streets (OSM)</span>
            </button>

            <button
              onClick={() => setMapStyle('esri_streets')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                mapStyle === 'esri_streets'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Esri Streets</span>
            </button>

            <button
              onClick={() => setMapStyle('satellite')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                mapStyle === 'satellite'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Satellite className="w-3.5 h-3.5" />
              <span>Satellite Photos</span>
            </button>
          </div>

          {/* Toggle Checkboxes */}
          <div className="flex items-center gap-2 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 text-[11px]">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
              <input
                type="checkbox"
                checked={showHeatmapCircles}
                onChange={(e) => setShowHeatmapCircles(e.target.checked)}
                className="accent-cyan-400 rounded cursor-pointer"
              />
              <span>Heat Layers</span>
            </label>
            <span className="text-slate-700">|</span>
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
              <input
                type="checkbox"
                checked={showStationMarkers}
                onChange={(e) => setShowStationMarkers(e.target.checked)}
                className="accent-cyan-400 rounded cursor-pointer"
              />
              <span>Station Pins</span>
            </label>
          </div>

          <button
            onClick={handleResetMap}
            title="Reset Map View to Central Delhi"
            className="p-1.5 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Locality Search & 1-Click Quick Jump Toolbar */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Real-time search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any locality (e.g. Noida, Anand Vihar, Rohini, Gurugram, Dwarka)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Risk Tier Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            {[
              { id: 'ALL', label: `All Localities (${zones.length})` },
              { id: 'HOTSPOTS', label: 'Severe Hotspots (!)', highlight: true },
              { id: 'SEVERE', label: 'Severe (>400)' },
              { id: 'HIGH', label: 'High (300-400)' },
              { id: 'MODERATE', label: 'Moderate' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterTier(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filterTier === f.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1-Click Locality Quick Jump Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 text-[11px]">
          <span className="text-slate-400 shrink-0 font-semibold flex items-center gap-1">
            <Crosshair className="w-3.5 h-3.5 text-cyan-400" /> Click to Zoom:
          </span>
          {zones.slice(0, 12).map((z) => (
            <button
              key={z.id}
              onClick={() => handleFlyToZone(z)}
              className={`px-3 py-1 rounded-full border whitespace-nowrap transition-all font-medium ${
                selectedZone?.id === z.id
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              {z.short_name} <span className="font-mono font-bold text-[10px] ml-1" style={{ color: selectedZone?.id === z.id ? '#020617' : z.risk_color }}>{z.peak_forecast_aqi}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Real Map + Station Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Real Leaflet Map Container */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden relative shadow-2xl h-[580px] min-h-[580px]">
          {/* Actual Leaflet Map Canvas with Explicit Inline Sizing */}
          <div 
            ref={mapContainerRef} 
            style={{ width: '100%', height: '100%', minHeight: '580px', position: 'relative' }} 
            className="z-10" 
          />

          {/* In-Map Real Street Legend Overlay */}
          <div className="absolute bottom-3 left-3 z-20 bg-slate-950/90 backdrop-blur border border-slate-800 px-3.5 py-2 rounded-xl text-[11px] text-slate-200 flex items-center gap-2 pointer-events-none shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>Real Map Active ({mapStyle === 'streets' ? 'OpenStreetMap Streets' : (mapStyle === 'satellite' ? 'Esri Satellite Photos' : 'Esri High-Res Streets')}). Zoom & pan anywhere in Delhi NCR.</span>
          </div>
        </div>

        {/* Selected Locality Details Card */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          {selectedZone ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
                    {selectedZone.zone_type.split('/')[0]}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1.5">{selectedZone.name}</h4>
                </div>
                {selectedZone.hotspot_status && (
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[10px] font-bold animate-pulse">
                    CRITICAL HOTSPOT
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[11px] block">Current AQI</span>
                  <span className="text-xl font-bold text-white mt-0.5 block">{selectedZone.current_aqi}</span>
                  <span className="text-[10px] text-slate-400">{selectedZone.current_category}</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[11px] block">Projected Peak</span>
                  <span className="text-xl font-bold text-rose-400 mt-0.5 block">{selectedZone.peak_forecast_aqi}</span>
                  <span className="text-[10px] text-rose-400 font-semibold">{selectedZone.peak_category}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/70">
                  <span className="text-slate-400 block text-[11px] font-semibold">Primary Stressor:</span>
                  <span className="text-slate-200 mt-0.5 block">{selectedZone.primary_stressor}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/70">
                  <span className="text-slate-400 block text-[11px] font-semibold">Atmospheric Dispersion:</span>
                  <span className="text-slate-200 mt-0.5 block">{selectedZone.dispersion_potential}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-800/40">
                  <span className="text-cyan-400 block text-[11px] font-semibold">Recommended Intervention:</span>
                  <span className="text-cyan-200 mt-0.5 block">{selectedZone.recommended_action}</span>
                </div>
              </div>

              <button
                onClick={() => onSelectZone(selectedZone.id)}
                className="w-full mt-2 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                Inspect 72h Forecast For {selectedZone.short_name} <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <MapPin className="w-10 h-10 text-cyan-500/40 animate-bounce" />
              <h4 className="text-sm font-bold text-slate-300">Select Any Locality on the Map</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Click on any of the 27 station pins across the real map to view localized particulate entrapment and recommended interventions.
              </p>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-start gap-1.5">
            <Info className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              Real cartography powered by OpenStreetMap & Esri World Imagery with overlaid localized particulate diffusion models.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
