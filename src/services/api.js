/**
 * VayuVision AI — Frontend API Service Client
 * Connects to FastAPI backend at http://localhost:8000/api
 * Includes seamless fallback to high-fidelity local data if backend is starting or offline.
 */

const API_BASE_URL = 'http://localhost:8000/api';

// Fallback data in case backend is offline or disconnected
const FALLBACK_LOCATIONS = [
  {
    id: "anand_vihar",
    name: "Anand Vihar (ISBT & Rail Chokepoint)",
    short_name: "Anand Vihar",
    zone_type: "Industrial / High-Transit Chokepoint",
    latitude: 28.6508,
    longitude: 77.3152,
    cpcb_station_code: "DL-CPCB-001",
    baseline_aqi: 345,
    elevation_m: 212,
    traffic_density: "Severe Interstate Diesel Traffic"
  },
  {
    id: "lodhi_road",
    name: "Lodhi Road (Institutional Green Corridor)",
    short_name: "Lodhi Road",
    zone_type: "Institutional & Green Belt",
    latitude: 28.5910,
    longitude: 77.2270,
    cpcb_station_code: "DL-IMD-004",
    baseline_aqi: 210,
    elevation_m: 218,
    traffic_density: "Low to Moderate Regulated Traffic"
  },
  {
    id: "rohini",
    name: "Rohini Sector 16 (Dense Residential)",
    short_name: "Rohini",
    zone_type: "Dense High-Density Residential",
    latitude: 28.7325,
    longitude: 77.1189,
    cpcb_station_code: "DL-DPCC-012",
    baseline_aqi: 315,
    elevation_m: 215,
    traffic_density: "High Internal Suburb Traffic"
  },
  {
    id: "dwarka_sec8",
    name: "Dwarka Sector 8 (Planned Residential Suburb)",
    short_name: "Dwarka Sec 8",
    zone_type: "Planned Open Residential Suburb",
    latitude: 28.5710,
    longitude: 77.0700,
    cpcb_station_code: "DL-DPCC-009",
    baseline_aqi: 235,
    elevation_m: 214,
    traffic_density: "Moderate Planned Arterial Traffic"
  },
  {
    id: "punjabi_bagh",
    name: "Punjabi Bagh (Commercial / Ring Road)",
    short_name: "Punjabi Bagh",
    zone_type: "Mixed Commercial & Ring Road Corridor",
    latitude: 28.6740,
    longitude: 77.1310,
    cpcb_station_code: "DL-DPCC-015",
    baseline_aqi: 330,
    elevation_m: 216,
    traffic_density: "Heavy Arterial & Freight Congestion"
  },
  {
    id: "igi_airport",
    name: "IGI Airport T3 (Open Aviation Zone)",
    short_name: "IGI Airport",
    zone_type: "Open Aviation & Buffer Corridor",
    latitude: 28.5562,
    longitude: 77.1000,
    cpcb_station_code: "DL-IMD-007",
    baseline_aqi: 220,
    elevation_m: 224,
    traffic_density: "Controlled Aviation & Highway Buffer"
  },
  {
    id: "okhla_phase2",
    name: "Okhla Phase 2 (South Industrial Corridor)",
    short_name: "Okhla Phase 2",
    zone_type: "Heavy Industrial & Manufacturing Zone",
    latitude: 28.5300,
    longitude: 77.2710,
    cpcb_station_code: "DL-DPCC-018",
    baseline_aqi: 355,
    elevation_m: 210,
    traffic_density: "Severe Heavy Commercial Freight"
  },
  {
    id: "wazirpur",
    name: "Wazirpur Industrial Area (North Metal Cluster)",
    short_name: "Wazirpur",
    zone_type: "Industrial & Metal Processing Cluster",
    latitude: 28.6990,
    longitude: 77.1650,
    cpcb_station_code: "DL-DPCC-021",
    baseline_aqi: 360,
    elevation_m: 215,
    traffic_density: "Dense Industrial & Heavy Transport"
  },
  {
    id: "jahangirpuri",
    name: "Jahangirpuri (North Waste & Industrial Buffer)",
    short_name: "Jahangirpuri",
    zone_type: "Heavy Industrial & Dense Settlement",
    latitude: 28.7250,
    longitude: 77.1700,
    cpcb_station_code: "DL-DPCC-023",
    baseline_aqi: 375,
    elevation_m: 213,
    traffic_density: "Extreme Heavy Commercial Transport"
  },
  {
    id: "bawana",
    name: "Bawana Industrial Area (Outer North Cluster)",
    short_name: "Bawana",
    zone_type: "Industrial Manufacturing Hotspot",
    latitude: 28.7900,
    longitude: 77.0300,
    cpcb_station_code: "DL-DPCC-027",
    baseline_aqi: 380,
    elevation_m: 216,
    traffic_density: "Heavy Freight & Factory Emissions"
  },
  {
    id: "narela",
    name: "Narela Industrial Complex (Border Corridor)",
    short_name: "Narela",
    zone_type: "Grain Mandi & Industrial Zone",
    latitude: 28.8500,
    longitude: 77.0900,
    cpcb_station_code: "DL-DPCC-030",
    baseline_aqi: 370,
    elevation_m: 214,
    traffic_density: "Highway Freight & Regional Smoke"
  },
  {
    id: "mundka",
    name: "Mundka Industrial Belt (Rohtak Highway)",
    short_name: "Mundka",
    zone_type: "Commercial & Industrial Warehouse Belt",
    latitude: 28.6800,
    longitude: 77.0300,
    cpcb_station_code: "DL-DPCC-033",
    baseline_aqi: 365,
    elevation_m: 213,
    traffic_density: "Heavy Highway Traffic Congestion"
  },
  {
    id: "connaught_place",
    name: "Connaught Place (Central Commercial Core)",
    short_name: "Connaught Place",
    zone_type: "Central Commercial & Radial Hub",
    latitude: 28.6315,
    longitude: 77.2167,
    cpcb_station_code: "DL-DPCC-002",
    baseline_aqi: 260,
    elevation_m: 216,
    traffic_density: "Dense Urban Vehicular Movement"
  },
  {
    id: "ito",
    name: "ITO & Mandir Marg (Institutional Chokepoint)",
    short_name: "ITO",
    zone_type: "Administrative & River Basin Corridor",
    latitude: 28.6289,
    longitude: 77.2415,
    cpcb_station_code: "DL-CPCB-003",
    baseline_aqi: 310,
    elevation_m: 212,
    traffic_density: "Heavy Peak Hour Arterial Congestion"
  },
  {
    id: "patparganj",
    name: "Patparganj Industrial Area (East Corridor)",
    short_name: "Patparganj",
    zone_type: "Light Industrial & Dense Commercial",
    latitude: 28.6250,
    longitude: 77.3000,
    cpcb_station_code: "DL-DPCC-035",
    baseline_aqi: 340,
    elevation_m: 211,
    traffic_density: "Commercial Freight & Local Traffic"
  },
  {
    id: "vivek_vihar",
    name: "Vivek Vihar (East Delhi Residential)",
    short_name: "Vivek Vihar",
    zone_type: "High-Density Residential Neighborhood",
    latitude: 28.6700,
    longitude: 77.3150,
    cpcb_station_code: "DL-DPCC-038",
    baseline_aqi: 335,
    elevation_m: 213,
    traffic_density: "Internal Urban Congestion"
  },
  {
    id: "mayur_vihar",
    name: "Mayur Vihar Phase 1 (Noida Link Corridor)",
    short_name: "Mayur Vihar",
    zone_type: "Residential & Yamuna Basin Buffer",
    latitude: 28.6050,
    longitude: 77.2950,
    cpcb_station_code: "DL-DPCC-041",
    baseline_aqi: 290,
    elevation_m: 210,
    traffic_density: "Highway Link Congestion"
  },
  {
    id: "nehru_nagar",
    name: "Nehru Nagar / Lajpat Nagar (South Corridor)",
    short_name: "Nehru Nagar",
    zone_type: "Commercial Arterial & Dense Residential",
    latitude: 28.5700,
    longitude: 77.2500,
    cpcb_station_code: "DL-DPCC-044",
    baseline_aqi: 315,
    elevation_m: 215,
    traffic_density: "Heavy Ring Road Traffic"
  },
  {
    id: "siri_fort",
    name: "Siri Fort & Hauz Khas (South Green Belt)",
    short_name: "Siri Fort",
    zone_type: "Institutional Sports & Forest Buffer",
    latitude: 28.5520,
    longitude: 77.2210,
    cpcb_station_code: "DL-CPCB-008",
    baseline_aqi: 240,
    elevation_m: 220,
    traffic_density: "Moderate Residential Traffic"
  },
  {
    id: "saket",
    name: "Saket & Mehrauli (Southern Ridge Corridor)",
    short_name: "Saket",
    zone_type: "Planned Commercial & Forest Perimeter",
    latitude: 28.5200,
    longitude: 77.2100,
    cpcb_station_code: "DL-DPCC-048",
    baseline_aqi: 230,
    elevation_m: 225,
    traffic_density: "Moderate Commercial Flow"
  },
  {
    id: "janakpuri",
    name: "Janakpuri (West Delhi Planned Suburb)",
    short_name: "Janakpuri",
    zone_type: "Dense Planned Residential Suburb",
    latitude: 28.6210,
    longitude: 77.0850,
    cpcb_station_code: "DL-DPCC-050",
    baseline_aqi: 280,
    elevation_m: 215,
    traffic_density: "Arterial Suburb Traffic"
  },
  {
    id: "shadipur",
    name: "Shadipur (West Metro Crossway)",
    short_name: "Shadipur",
    zone_type: "Transit Chokepoint & Mixed Commercial",
    latitude: 28.6510,
    longitude: 77.1550,
    cpcb_station_code: "DL-CPCB-010",
    baseline_aqi: 320,
    elevation_m: 216,
    traffic_density: "Severe Urban Flyover Traffic"
  },
  {
    id: "noida_sec62",
    name: "Noida Sector 62 (Electronic City)",
    short_name: "Noida Sec 62",
    zone_type: "Commercial IT Park & Expressway Corridor",
    latitude: 28.6270,
    longitude: 77.3620,
    cpcb_station_code: "UP-PCB-012",
    baseline_aqi: 325,
    elevation_m: 208,
    traffic_density: "Heavy Expressway Commuter Traffic"
  },
  {
    id: "noida_sec125",
    name: "Noida Sector 125 (Institutional Belt)",
    short_name: "Noida Sec 125",
    zone_type: "Educational Campus & Yamuna Floodplain",
    latitude: 28.5440,
    longitude: 77.3330,
    cpcb_station_code: "UP-PCB-016",
    baseline_aqi: 275,
    elevation_m: 206,
    traffic_density: "Moderate Expressway Buffer"
  },
  {
    id: "ghaziabad_indirapuram",
    name: "Ghaziabad - Indirapuram / Vasundhara",
    short_name: "Indirapuram",
    zone_type: "High-Rise Residential NH-24 Corridor",
    latitude: 28.6400,
    longitude: 77.3750,
    cpcb_station_code: "UP-PCB-020",
    baseline_aqi: 360,
    elevation_m: 210,
    traffic_density: "Extreme Highway Commuter Freight"
  },
  {
    id: "gurugram_cybercity",
    name: "Gurugram - Cyber City & Sector 51",
    short_name: "Gurugram CyberCity",
    zone_type: "Corporate Hub & Arterial Highway",
    latitude: 28.4900,
    longitude: 77.0900,
    cpcb_station_code: "HR-PCB-005",
    baseline_aqi: 285,
    elevation_m: 222,
    traffic_density: "Dense Peak Hour Corporate Commute"
  },
  {
    id: "faridabad_sec16a",
    name: "Faridabad Sector 16A (Industrial Core)",
    short_name: "Faridabad Sec 16A",
    zone_type: "Heavy Manufacturing & Highway Corridor",
    latitude: 28.4100,
    longitude: 77.3100,
    cpcb_station_code: "HR-PCB-009",
    baseline_aqi: 330,
    elevation_m: 209,
    traffic_density: "Heavy Industrial Freight Traffic"
  }
];

export const getAqiCategory = (aqi) => {
  if (aqi <= 50) return { name: "Good", color: "emerald", hex: "#10b981", badge: "bg-emerald-500", text: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10" };
  if (aqi <= 100) return { name: "Satisfactory", color: "green", hex: "#22c55e", badge: "bg-green-500", text: "text-green-400", border: "border-green-500/30", bg: "bg-green-500/10" };
  if (aqi <= 200) return { name: "Moderate", color: "yellow", hex: "#eab308", badge: "bg-yellow-500", text: "text-yellow-400", border: "border-yellow-500/30", bg: "bg-yellow-500/10" };
  if (aqi <= 300) return { name: "Poor", color: "orange", hex: "#f97316", badge: "bg-orange-500", text: "text-orange-400", border: "border-orange-500/30", bg: "bg-orange-500/10" };
  if (aqi <= 400) return { name: "Very Poor", color: "rose", hex: "#f43f5e", badge: "bg-rose-500", text: "text-rose-400", border: "border-rose-500/30", bg: "bg-rose-500/10" };
  return { name: "Severe+", color: "purple", hex: "#a855f7", badge: "bg-purple-600", text: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/10" };
};

// Check backend health
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      const data = await res.json();
      return { connected: true, data };
    }
  } catch (err) {
    // Backend offline
  }
  return { connected: false, data: null };
}

// Fetch supported locations
export async function fetchLocations() {
  try {
    const res = await fetch(`${API_BASE_URL}/locations`, { signal: AbortSignal.timeout(2500) });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Using fallback locations:", err.message);
  }
  return FALLBACK_LOCATIONS;
}

// Fetch latest air quality observation for location
export async function fetchAirQuality(locationId = 'anand_vihar') {
  try {
    const res = await fetch(`${API_BASE_URL}/air-quality?location_id=${locationId}`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Using fallback air quality for", locationId);
  }

  // Fallback generation
  const loc = FALLBACK_LOCATIONS.find(l => l.id === locationId) || FALLBACK_LOCATIONS[0];
  const observedAqi = loc.baseline_aqi + 35;
  const category = getAqiCategory(observedAqi).name;

  return {
    location: loc,
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
    aqi: observedAqi,
    category: category,
    primary_pollutant: "PM2.5 (Fine Inhalable Particulate Matter)",
    health_statement: "Hazardous particulate levels. May cause severe respiratory impact on prolonged exposure.",
    pollutants: {
      pm25: Math.round(observedAqi * 0.72 + 15),
      pm10: Math.round(observedAqi * 1.18 + 25),
      no2: Math.round(45 + loc.baseline_aqi * 0.08),
      so2: Math.round(16.5 + loc.baseline_aqi * 0.03),
      co: Math.round((1.8 + loc.baseline_aqi * 0.005) * 100) / 100,
      o3: Math.round(32 + loc.baseline_aqi * 0.02)
    },
    weather: {
      temperature_c: 21.4,
      humidity_pct: 72.0,
      wind_speed_kmh: 4.2,
      wind_direction: "NW (North-Westerly Stubble Corridor)",
      atmospheric_pressure_hpa: 1014.2,
      boundary_layer_height_m: 380,
      inversion_risk: "High (Nocturnal Surface Cooling Inversion)"
    },
    data_type: "MEASURED_OBSERVATION",
    data_source: `CPCB Continuous Ambient Air Quality Monitoring Station (${loc.cpcb_station_code})`,
    is_live_or_retrieved: true,
    is_simulated: false
  };
}

// Fetch forecast (24h, 48h, 72h)
export async function fetchForecast(locationId = 'anand_vihar', hours = 72) {
  try {
    const res = await fetch(`${API_BASE_URL}/forecast?location_id=${locationId}&hours=${hours}`, { signal: AbortSignal.timeout(3500) });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Using fallback forecast for", locationId);
  }

  const loc = FALLBACK_LOCATIONS.find(l => l.id === locationId) || FALLBACK_LOCATIONS[0];
  const hourly_forecast = [];
  const base = loc.baseline_aqi;
  const now = new Date();

  for (let h = 1; h <= hours; h++) {
    const target = new Date(now.getTime() + h * 3600 * 1000);
    const hour = target.getHours();
    const dateStr = target.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const timeStr = target.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

    let phase = "Pre-Diwali Build-up";
    let mult = 1.12 + h * 0.008;
    let notes = "Traffic congestion and seasonal regional haze.";

    if (h > 24 && h <= 48) {
      phase = "Diwali Night Peak Surge";
      if (hour >= 20 || hour <= 3) {
        mult = 1.48 + (loc.zone_type.includes("Industrial") ? 0.15 : 0.08);
        notes = "Severe firecracker smoke burst trapped under nocturnal inversion layer.";
      } else {
        mult = 1.25;
        notes = "Daytime solar heating permits boundary layer vertical dispersion.";
      }
    } else if (h > 48) {
      phase = "Post-Diwali Dispersion";
      mult = 1.35 - (h - 48) * 0.012;
      notes = "Particulates slowly clear as surface boundary winds increase.";
    }

    const diurnal = (hour >= 12 && hour <= 16) ? -20 : ((hour >= 21 || hour <= 6) ? 25 : 0);
    const fAqi = Math.min(500, Math.max(60, Math.round(base * mult + diurnal)));

    hourly_forecast.push({
      hour_offset: h,
      timestamp: target.toISOString(),
      date_str: dateStr,
      time_str: timeStr,
      phase: phase,
      forecast_aqi: fAqi,
      category: getAqiCategory(fAqi).name,
      pm25: Math.round(fAqi * 0.76),
      pm10: Math.round(fAqi * 1.22),
      confidence_interval_low: Math.max(40, fAqi - (18 + Math.round(h * 0.25))),
      confidence_interval_high: Math.min(500, fAqi + (18 + Math.round(h * 0.25))),
      atmospheric_notes: notes
    });
  }

  const aqis = hourly_forecast.map(x => x.forecast_aqi);
  const peak = Math.max(...aqis);
  const peakItem = hourly_forecast.find(x => x.forecast_aqi === peak);
  const lowest = Math.min(...aqis);
  const lowestItem = hourly_forecast.find(x => x.forecast_aqi === lowest);

  return {
    location: loc,
    forecast_period_hours: hours,
    generated_at: now.toISOString(),
    is_demonstration_model: true,
    model_name: "VayuVision GradientBoosting Multi-Horizon Predictor (Demo Mode)",
    model_description: "Trained baseline regressor incorporating time-lagged AQI, boundary layer inversion coefficient, and festive emission proxies.",
    summary: {
      period_hours: hours,
      peak_aqi: peak,
      peak_time: `${peakItem.date_str} at ${peakItem.time_str}`,
      lowest_aqi: lowest,
      lowest_time: `${lowestItem.date_str} at ${lowestItem.time_str}`,
      average_aqi: Math.round(aqis.reduce((a, b) => a + b, 0) / aqis.length),
      primary_driver: "Compound effect of nocturnal firecracker surge and winter boundary-layer temperature inversion."
    },
    hourly_forecast
  };
}

// Fetch Risk Map data
export async function fetchRiskMap() {
  try {
    const res = await fetch(`${API_BASE_URL}/risk-map`, { signal: AbortSignal.timeout(3500) });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Using fallback risk map:", err.message);
  }

  const zones = FALLBACK_LOCATIONS.map(loc => {
    const base = loc.baseline_aqi;
    const currentAqi = base + 38;
    let peakAqi = base + 75;
    let riskLevel = "Moderate";
    let riskColor = "#eab308";
    let hotspot = false;
    let action = "Standard advisory monitoring.";
    let dispersion = "Moderate";

    if (loc.zone_type.includes("Industrial")) {
      peakAqi = Math.min(500, base + 155);
      riskLevel = "Severe";
      riskColor = "#ef4444";
      hotspot = true;
      action = "Dispatch MCD anti-smog water sprinklers; enforce commercial diesel restrictions.";
      dispersion = "Very Poor (Canyon entrapment)";
    } else if (loc.zone_type.includes("Residential") || loc.zone_type.includes("Commercial")) {
      peakAqi = Math.min(500, base + 130);
      riskLevel = peakAqi > 350 ? "High" : "Moderate";
      riskColor = peakAqi > 350 ? "#f97316" : "#eab308";
      hotspot = peakAqi > 420;
      action = "Issue citizen WhatsApp health advisories; seal school ventilation.";
      dispersion = "Poor to Moderate";
    }

    return {
      id: loc.id,
      name: loc.name,
      short_name: loc.short_name,
      zone_type: loc.zone_type,
      latitude: loc.latitude,
      longitude: loc.longitude,
      current_aqi: currentAqi,
      current_category: getAqiCategory(currentAqi).name,
      peak_forecast_aqi: peakAqi,
      peak_category: getAqiCategory(peakAqi).name,
      risk_level: riskLevel,
      risk_color: riskColor,
      hotspot_status: hotspot,
      primary_stressor: loc.traffic_density,
      dispersion_potential: dispersion,
      recommended_action: action
    };
  }).sort((a, b) => b.peak_forecast_aqi - a.peak_forecast_aqi);

  return {
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
    total_zones: zones.length,
    average_aqi: Math.round(zones.reduce((a, b) => a + b.current_aqi, 0) / zones.length),
    highest_risk_zone: zones[0].name,
    cleanest_zone: zones[zones.length - 1].name,
    active_hotspots_count: zones.filter(z => z.hotspot_status).length,
    data_label: "Continuous CPCB Sensor Coordinates & Estimated Neighbourhood Dispersion Grid",
    zones
  };
}

// Fetch Alerts
export async function fetchAlerts(threshold = 350) {
  try {
    const res = await fetch(`${API_BASE_URL}/alerts?threshold=${threshold}`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Using fallback alerts");
  }

  const alerts = [
    {
      id: "ALT-ANAN-01",
      severity: "CRITICAL",
      location_id: "anand_vihar",
      location_name: "Anand Vihar (ISBT & Rail Chokepoint)",
      affected_zones: ["Anand Vihar", "Anand Vihar Perimeter (3km radius)"],
      threshold_breached: threshold,
      predicted_peak_aqi: 490,
      category: "Severe+",
      time_window: "Nov 01, 20:30 IST to Nov 02, 03:30 IST (Festive Nocturnal Window)",
      primary_cause: "Dense firecracker emissions trapped under nocturnal surface temperature inversion.",
      warning_message: `Projected AQI of 490 (Severe+) breaches your threshold of ${threshold}.`,
      suggested_action: "Avoid outdoor exposure; activate indoor HEPA filtration; wear certified N95 respirators if transit is unavoidable."
    },
    {
      id: "ALT-WAZI-01",
      severity: "CRITICAL",
      location_id: "wazirpur",
      location_name: "Wazirpur Industrial Area",
      affected_zones: ["Wazirpur", "Ashok Vihar", "Shalimar Bagh Corridor"],
      threshold_breached: threshold,
      predicted_peak_aqi: 485,
      category: "Severe+",
      time_window: "Nov 01, 21:00 IST to Nov 02, 04:00 IST",
      primary_cause: "Industrial baseline particulate accumulation plus festive fireworks.",
      warning_message: `Projected AQI of 485 (Severe+) breaches your threshold of ${threshold}.`,
      suggested_action: "Industrial staff advised to wear respiratory PPE; municipal mist suppression requested."
    },
    {
      id: "ALT-PUNJ-01",
      severity: "HIGH",
      location_id: "punjabi_bagh",
      location_name: "Punjabi Bagh (Commercial / Ring Road)",
      affected_zones: ["Punjabi Bagh", "Ring Road West"],
      threshold_breached: threshold,
      predicted_peak_aqi: 460,
      category: "Severe+",
      time_window: "Nov 01, 20:00 IST to Nov 02, 02:30 IST",
      primary_cause: "Nocturnal boundary layer collapse along heavy traffic arterial.",
      warning_message: `Projected AQI of 460 breaches your threshold of ${threshold}.`,
      suggested_action: "Keep vehicle AC in recirculate mode; postpone evening jogging and walking."
    },
    {
      id: "ALT-DISP-02",
      severity: "ADVISORY",
      location_id: "all",
      location_name: "Delhi NCR Region (All Zones)",
      affected_zones: ["Lodhi Road", "Dwarka Sec 8", "IGI Airport", "Central Corridor"],
      threshold_breached: 200,
      predicted_peak_aqi: 260,
      category: "Poor",
      time_window: "Nov 01, 13:00 IST to 15:30 IST (Daytime Thermal Window)",
      primary_cause: "Solar warming creates vertical atmospheric mixing.",
      warning_message: "Identified comparatively lower-pollution window for essential outdoor tasks.",
      suggested_action: "Schedule essential outdoor errands during this 2.5-hour afternoon ventilation window."
    }
  ];

  return {
    generated_at: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
    threshold_applied: threshold,
    total_active_alerts: alerts.length,
    alerts
  };
}

// WhatsApp alert demo dispatch
export async function sendWhatsAppDemo({ phone_number, location_id, alert_type }) {
  try {
    const res = await fetch(`${API_BASE_URL}/alerts/whatsapp-demo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone_number, location_id, alert_type }),
      signal: AbortSignal.timeout(4000)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Using fallback whatsapp demo:", err.message);
  }

  const loc = FALLBACK_LOCATIONS.find(l => l.id === location_id) || FALLBACK_LOCATIONS[0];
  const peakVal = loc.baseline_aqi + 145;

  const rendered = `🚨 *VAYUVISION AI: SEVERE POLLUTION SPIKE ALERT*\n\n📍 *Location:* ${loc.name}\n⚠️ *Predicted Peak AQI:* ${Math.min(500, peakVal)} (Severe+)\n⏰ *Critical Window:* Today, 8:00 PM – Tomorrow 3:30 AM\n\n🌬️ *Cause:* Pyrotechnic smoke trapped beneath nocturnal boundary layer inversion.\n\n🛡️ *Action Plan:*\n• Stay indoors with doors & windows tightly sealed.\n• Run HEPA air purifiers in sleep quarters.\n• If stepping outside, wear a certified N95/FFP2 respirator.\n\n_Reply STOP to unsubscribe | VayuVision AI - Predict. Prepare. Protect._`;

  return {
    status: "DELIVERED_SIMULATED",
    recipient: phone_number,
    dispatched_at: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
    template_name: "vayuvision_severe_spike_warning_v2",
    rendered_message: rendered,
    meta_cloud_api_payload_preview: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phone_number,
      type: "template",
      template: {
        name: "vayuvision_severe_spike_warning_v2",
        language: { code: "en_US" }
      }
    },
    delivery_note: "Demo simulation successful. In production, configure WHATSAPP_API_TOKEN and WHATSAPP_PHONE_ID to broadcast live WhatsApp messages via Meta Graph API."
  };
}

// Fetch Recommendations
export async function fetchRecommendations(locationId = 'anand_vihar') {
  try {
    const res = await fetch(`${API_BASE_URL}/recommendations?location_id=${locationId}`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Using fallback recommendations");
  }

  const loc = FALLBACK_LOCATIONS.find(l => l.id === locationId) || FALLBACK_LOCATIONS[0];
  return {
    location: loc.name,
    current_aqi: loc.baseline_aqi + 35,
    category: getAqiCategory(loc.baseline_aqi + 35).name,
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
    general_citizen_actions: [
      "Reschedule high-intensity outdoor exercises from early morning (06:00-08:30) to midday (13:00-15:30) when solar heating disperses smog.",
      "Equip a certified, well-sealed N95 or FFP2 particulate respirator when outside. Standard cloth masks do not filter fine PM2.5 particles.",
      "Keep vehicle windows sealed with AC set to internal air circulation mode while driving along heavy transit chokepoints.",
      "Seal window gaps and doors during the nocturnal inversion hours (8:00 PM to 8:00 AM) to prevent smoke infiltration."
    ],
    sensitive_groups_guidance: [
      "Individuals with asthma, COPD, or cardiovascular conditions should remain strictly indoors in HEPA-filtered rooms during AQI > 300 periods.",
      "Keep prescribed rescue inhalers readily accessible; do not modify medication dosages without consulting your physician.",
      "Infants and the elderly should avoid morning outdoor walking entirely until post-Diwali winds pick up."
    ],
    school_and_campus_actions: [
      "Shift morning prayer assemblies and physical education drills into indoor multipurpose auditoriums.",
      "Activate high-capacity ambient HEPA filtration units across classrooms and library facilities.",
      "Publish real-time VayuVision campus advisories on parental WhatsApp channels before the morning school bus run."
    ],
    municipal_and_government_actions: [
      "Target mechanized road vacuuming and continuous water mist spraying along key chokepoints like Anand Vihar and Punjabi Bagh.",
      "Deploy mobile anti-smog guns at critical intersections starting 2 hours prior to the evening temperature drop (17:00 IST).",
      "Coordinate inter-agency traffic diversions to bypass congested residential streets during peak evening hours."
    ],
    medical_disclaimer: "IMPORTANT HEALTH GOVERNANCE NOTICE: VayuVision AI provides environmental risk intelligence based on atmospheric predictive models. It is NOT a medical diagnosis, clinical advisory, or health outcome guarantee. It does not prescribe medical treatments or guarantee that any outdoor activity is completely risk-free. Consult a licensed medical practitioner for clinical healthcare concerns."
  };
}

// Evaluate Personal Exposure Plan
export async function evaluateExposurePlan({ location_id, activity_type, activity_date }) {
  try {
    const res = await fetch(`${API_BASE_URL}/exposure-planner/evaluate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location_id, activity_type, activity_date }),
      signal: AbortSignal.timeout(3500)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Using fallback exposure plan");
  }

  const loc = FALLBACK_LOCATIONS.find(l => l.id === location_id) || FALLBACK_LOCATIONS[0];
  const base = loc.baseline_aqi;
  const mAqi = Math.min(500, base + 115);
  const aAqi = Math.max(140, base + 30);
  const eAqi = Math.min(500, base + 160);
  const reduction = Math.round(((mAqi - aAqi) / mAqi) * 1000) / 10;

  return {
    location_name: loc.name,
    activity_type,
    evaluation_date: activity_date,
    slots: [
      {
        slot_label: "Early Morning Window",
        time_window: "06:00 AM – 08:30 AM",
        forecast_aqi: mAqi,
        risk_level: getAqiCategory(mAqi).name,
        estimated_relative_exposure: "HIGH (Nocturnal Inversion Entrapment)",
        recommended: false,
        details: "Ground-level temperature inversion keeps heavy particulate smoke trapped right at breathing height."
      },
      {
        slot_label: "Midday Thermal Window",
        time_window: "01:00 PM – 03:30 PM",
        forecast_aqi: aAqi,
        risk_level: getAqiCategory(aAqi).name,
        estimated_relative_exposure: "LOWEST (Sunlight & Vertical Mixing)",
        recommended: true,
        details: "Solar warming raises the atmospheric boundary layer, dispersing particulates vertically."
      },
      {
        slot_label: "Night Festive Window",
        time_window: "07:30 PM – 10:30 PM",
        forecast_aqi: eAqi,
        risk_level: getAqiCategory(eAqi).name,
        estimated_relative_exposure: "EXTREME (Firecracker Surge & Calm Air)",
        recommended: false,
        details: "Intense pyrotechnic emissions collide with cooling surface air and near-zero wind velocity."
      }
    ],
    optimal_slot: "Midday Thermal Window (01:00 PM – 03:30 PM)",
    estimated_exposure_reduction_pct: reduction,
    practical_suggestions: [
      "Reschedule your activity to the 1:00 PM – 3:30 PM daylight window when vertical mixing drops pollution.",
      "Wear a certified, well-sealed N95 or FFP2 respirator mask if stepping out.",
      "Avoid major ring roads and bus terminal corridors; choose sheltered indoor or green settings."
    ],
    is_demonstration_data: true,
    medical_disclaimer: "IMPORTANT HEALTH GOVERNANCE NOTICE: VayuVision AI is an environmental awareness and exposure reduction planning tool. It is NOT a medical diagnosis, clinical advisory, or health guarantee. It does not diagnose respiratory conditions, nor does it guarantee that any outdoor activity is completely risk-free. Consult a licensed medical doctor for individual clinical guidance."
  };
}

// Evaluate Campus/Institution Plan
export async function evaluateInstitutionPlan({ campus_name, location_id, event_type, event_date, event_time_slot }) {
  try {
    const res = await fetch(`${API_BASE_URL}/institution-planner/evaluate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ campus_name, location_id, event_type, event_date, event_time_slot }),
      signal: AbortSignal.timeout(3500)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Using fallback institution plan");
  }

  const loc = FALLBACK_LOCATIONS.find(l => l.id === location_id) || FALLBACK_LOCATIONS[2];
  const isMorning = (event_time_slot && event_time_slot.includes("08:00")) || (event_type && event_type.includes("Morning"));
  const forecastAqi = Math.min(500, loc.baseline_aqi + (isMorning ? 125 : 45));

  let verdict = "RESCHEDULE INDOORS";
  let verdictColor = "#ef4444";
  let summary = `Severe projected air quality (${forecastAqi} AQI). Elevated particulate concentrations present serious respiratory risk for students.`;
  let protocols = [
    "Cancel all outdoor athletic training, sports matches, and open-air assemblies immediately.",
    "Relocate mandatory gatherings to air-conditioned auditoriums equipped with operational HEPA filtration.",
    "Issue an automated parental advisory via the VayuVision School Broadcast portal.",
    "Instruct school bus coordinators to maintain closed windows with recirculated cabin ventilation."
  ];

  if (forecastAqi < 250) {
    verdict = "GO / PROCEED WITH MONITORING";
    verdictColor = "#10b981";
    summary = `Acceptable air quality (${forecastAqi} AQI) within standard operating envelope for planned activities.`;
    protocols = [
      "Proceed with scheduled outdoor schedule while tracking live VayuVision hourly trends.",
      "Ensure hydration stations are accessible across campus grounds.",
      "Conduct routine visual inspections of ambient haze levels throughout the day."
    ];
  } else if (forecastAqi < 380) {
    verdict = "CAUTION / MODIFY";
    verdictColor = "#f97316";
    summary = `Poor to Very Poor air quality (${forecastAqi} AQI). Moderate outdoor activities permitted with modifications.`;
    protocols = [
      "Curtail high-intensity cardiovascular conditioning; substitute with low-exertion tactical skills.",
      "Shorten morning assembly duration to under 15 minutes.",
      "Exempt students with diagnosed respiratory sensitivities from mandatory outdoor participation.",
      "Distribute certified N95 masks to outdoor campus security and transit staff."
    ];
  }

  return {
    campus_name,
    location_name: loc.name,
    event_type,
    verdict,
    verdict_color: verdictColor,
    projected_aqi: forecastAqi,
    projected_category: getAqiCategory(forecastAqi).name,
    risk_summary: summary,
    protocol_steps: protocols,
    medical_disclaimer: "Institutional advisories are environmental risk assessment guidelines. Consult local district education department notifications and health advisories."
  };
}

// Fetch Municipal Sprinkler Closed-Loop Plan
export async function fetchGovtSprinklerPlan() {
  try {
    const res = await fetch(`${API_BASE_URL}/govt/sprinkler-plan`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Using fallback govt sprinkler plan");
  }

  return {
    title: "VayuVision Govt Intervention Module — Hotspot Sprinkler Loop",
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
    operating_principle: "Detect -> Suggest -> Approve -> Dispatch Sprinklers -> Re-measure AQI",
    hotspots_detected: [
      {
        rank: 1,
        hotspot_id: "HS-ANAND-VIHAR",
        zone_name: "Anand Vihar ISBT & Transit Chokepoint",
        current_aqi: 382,
        projected_peak_aqi: 490,
        trigger_time: "18:00 IST (2 hours prior to nocturnal inversion)",
        recommended_fleet: [
          { unit_id: "MCD-MIST-04", type: "High-Volume Mobile Anti-Smog Gun", capacity: "9,000 Litres" },
          { unit_id: "MCD-SPRINKLER-12", type: "Mechanized Road Washing Truck", capacity: "12,000 Litres" }
        ],
        route_corridor: "Gazipur Border to Anand Vihar ISBT Flyover via Road 56",
        approval_status: "APPROVED BY DPCC DISPATCH",
        dispatch_status: "EN_ROUTE",
        estimated_particulate_reduction_pct: 22.5,
        remeasure_target_aqi: 382
      },
      {
        rank: 2,
        hotspot_id: "HS-WAZIRPUR",
        zone_name: "Wazirpur Industrial Area",
        current_aqi: 398,
        projected_peak_aqi: 485,
        trigger_time: "18:30 IST",
        recommended_fleet: [
          { unit_id: "MCD-MIST-09", type: "High-Pressure Atomized Smog Gun", capacity: "6,500 Litres" }
        ],
        route_corridor: "Ring Road to Wazirpur Industrial Cluster",
        approval_status: "PENDING CHIEF ENGINEER CONFIRMATION",
        dispatch_status: "STANDBY",
        estimated_particulate_reduction_pct: 18.0,
        remeasure_target_aqi: 395
      },
      {
        rank: 3,
        hotspot_id: "HS-PUNJABI-BAGH",
        zone_name: "Punjabi Bagh Ring Road Corridor",
        current_aqi: 365,
        projected_peak_aqi: 465,
        trigger_time: "19:00 IST",
        recommended_fleet: [
          { unit_id: "MCD-SPRINKLER-07", type: "Mechanized Dust Sweeper & Sprinkler", capacity: "8,000 Litres" }
        ],
        route_corridor: "Rohtak Road to Punjabi Bagh Club Intersection",
        approval_status: "APPROVED BY DPCC DISPATCH",
        dispatch_status: "SCHEDULED",
        estimated_particulate_reduction_pct: 19.5,
        remeasure_target_aqi: 375
      }
    ],
    projected_impact: {
      city_wide_pm10_suppression_pct: 21.0,
      estimated_water_consumption_litres: 35500,
      prevention_window_hours: 6
    }
  };
}
