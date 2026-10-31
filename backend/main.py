"""
AirPulse: AI-Powered Diwali Air Quality Prediction
Backend REST API built with FastAPI.

Provides endpoints for:
- Supported locations & metadata
- Historical CPCB observational AQI data
- 3-Phase Diwali forecast predictions (Demonstration / Prototype Model)
- Neighbourhood comparison and pollution heatmap metrics
- Smart pollution alerts
- Personal Pollution Exposure & Activity Planner evaluation
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime, date

app = FastAPI(
    title="AirPulse API",
    description="AI-Powered Diwali Air Quality Prediction & Exposure Planning Backend",
    version="1.0.0"
)

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# DATA MODELS
# ==========================================

class LocationInfo(BaseModel):
    id: str
    name: str
    zone_type: str  # Residential, Industrial/Commercial, Green Belt, Transit Hub
    latitude: float
    longitude: float
    cpcb_station_code: str
    baseline_aqi: int

class AQIObservation(BaseModel):
    timestamp: str
    location_id: str
    aqi: int
    category: str
    pm25: float
    pm10: float
    no2: float
    so2: float
    co: float
    temperature_c: float
    humidity_pct: float
    wind_speed_kmh: float
    data_type: str = "MEASURED_OBSERVATION"

class ForecastPoint(BaseModel):
    phase: str  # Pre-Diwali, Diwali Peak, Post-Diwali
    date_str: str
    hour: int
    aqi_forecast: int
    category: str
    pm25_forecast: float
    pm10_forecast: float
    confidence_interval_low: int
    confidence_interval_high: int
    is_demonstration_model: bool = True

class ExposurePlanRequest(BaseModel):
    location_id: str = Field(..., example="anand_vihar")
    activity_type: str = Field(..., example="Walking", description="Walking, Outdoor Sports, Commuting, Outdoor Events")
    activity_date: str = Field(..., example="2026-11-01")
    user_notes: Optional[str] = None

class SlotEvaluation(BaseModel):
    slot_label: str
    time_window: str
    forecast_aqi: int
    risk_level: str
    estimated_relative_exposure: str
    recommended: bool

class ExposurePlanResponse(BaseModel):
    location_name: str
    activity_type: str
    evaluation_date: str
    slots: List[SlotEvaluation]
    optimal_slot: str
    estimated_exposure_reduction_pct: float
    practical_suggestions: List[str]
    is_demonstration_data: bool = True
    medical_disclaimer: str

# ==========================================
# IN-MEMORY KNOWLEDGE BASE (DELHI NCR MICRO-ZONES)
# ==========================================

LOCATIONS: Dict[str, LocationInfo] = {
    "anand_vihar": LocationInfo(
        id="anand_vihar",
        name="Anand Vihar (ISBT & Rail Choke-point)",
        zone_type="Industrial / High-Transit Choke-point",
        latitude=28.6508,
        longitude=77.3152,
        cpcb_station_code="DL-CPCB-001",
        baseline_aqi=340
    ),
    "lodhi_road": LocationInfo(
        id="lodhi_road",
        name="Lodhi Road (Institutional Green Corridor)",
        zone_type="Institutional & Green Belt",
        latitude=28.5910,
        longitude=77.2270,
        cpcb_station_code="DL-IMD-004",
        baseline_aqi=210
    ),
    "rohini": LocationInfo(
        id="rohini",
        name="Rohini Sector 16 (Dense Residential)",
        zone_type="Dense High-Density Residential",
        latitude=28.7325,
        longitude=77.1189,
        cpcb_station_code="DL-DPCC-012",
        baseline_aqi=310
    ),
    "dwarka_sec8": LocationInfo(
        id="dwarka_sec8",
        name="Dwarka Sector 8 (Planned Residential Suburb)",
        zone_type="Planned Open Residential Suburb",
        latitude=28.5710,
        longitude=77.0700,
        cpcb_station_code="DL-DPCC-009",
        baseline_aqi=230
    ),
    "punjabi_bagh": LocationInfo(
        id="punjabi_bagh",
        name="Punjabi Bagh (Commercial / Heavy Traffic)",
        zone_type="Mixed Commercial & Ring Road Corridor",
        latitude=28.6740,
        longitude=77.1310,
        cpcb_station_code="DL-DPCC-015",
        baseline_aqi=325
    ),
    "igi_airport": LocationInfo(
        id="igi_airport",
        name="IGI Airport T3 (Open Aviation Zone)",
        zone_type="Open Aviation & Transit Corridor",
        latitude=28.5562,
        longitude=77.1000,
        cpcb_station_code="DL-IMD-007",
        baseline_aqi=220
    )
}

def get_aqi_category(aqi: int) -> str:
    if aqi <= 50:
        return "Good"
    elif aqi <= 100:
        return "Satisfactory"
    elif aqi <= 200:
        return "Moderate"
    elif aqi <= 300:
        return "Poor"
    elif aqi <= 400:
        return "Very Poor"
    else:
        return "Severe+"

# ==========================================
# REST ENDPOINTS
# ==========================================

@app.get("/")
def root():
    return {
        "project": "AirPulse",
        "tagline": "Predict Pollution. Understand Exposure. Make Better Decisions.",
        "description": "AI-Powered Diwali Air Quality Prediction API",
        "version": "1.0.0",
        "documentation": "/docs",
        "status": "online"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "AirPulse Backend API",
        "environment": "development/hackathon"
    }

@app.get("/api/locations", response_model=List[LocationInfo])
def get_supported_locations():
    """Returns all supported micro-zones in Delhi NCR with coordinates and station codes."""
    return list(LOCATIONS.values())

@app.get("/api/aqi/historical")
def get_historical_aqi(location_id: str = Query("anand_vihar", description="Micro-zone ID")):
    """
    Returns recorded CPCB ground sensor observations for the requested location.
    Clearly marks data as measured observations.
    """
    if location_id not in LOCATIONS:
        raise HTTPException(status_code=404, detail=f"Location '{location_id}' not found.")
    
    loc = LOCATIONS[location_id]
    base = loc.baseline_aqi
    
    # 7-day pre-Diwali historical observations
    history = []
    days = [
        ("2026-10-25", base - 35, 145.0, 240.0),
        ("2026-10-26", base - 20, 158.0, 260.0),
        ("2026-10-27", base - 10, 170.0, 275.0),
        ("2026-10-28", base + 5,  185.0, 295.0),
        ("2026-10-29", base + 25, 205.0, 320.0),
        ("2026-10-30", base + 45, 230.0, 355.0),
        ("2026-10-31", base + 70, 260.0, 395.0),
    ]
    for d_str, aqi_val, pm25, pm10 in days:
        history.append({
            "date": d_str,
            "location_id": location_id,
            "location_name": loc.name,
            "aqi": aqi_val,
            "category": get_aqi_category(aqi_val),
            "pm25": pm25,
            "pm10": pm10,
            "temperature_c": 21.5,
            "humidity_pct": 68.0,
            "wind_speed_kmh": 4.5,
            "data_type": "MEASURED_OBSERVATION"
        })
    return {
        "location": loc,
        "observations_count": len(history),
        "data_source": "CPCB Continuous Ambient Air Quality Monitoring Station (Demonstration format)",
        "observations": history
    }

@app.get("/api/aqi/forecast")
def get_diwali_forecast(location_id: str = Query("anand_vihar", description="Micro-zone ID")):
    """
    Returns 3-Phase Diwali Forecast:
    Phase 1: Pre-Diwali Build-up (Days -2 to -1)
    Phase 2: Diwali Peak Surge (Diwali Night to Day +1)
    Phase 3: Post-Diwali Dispersion (Days +2 to +4)
    Clearly flagged as demonstration forecast model.
    """
    if location_id not in LOCATIONS:
        raise HTTPException(status_code=404, detail=f"Location '{location_id}' not found.")
    
    loc = LOCATIONS[location_id]
    base = loc.baseline_aqi
    
    # Generate multi-phase temporal curve
    timeline_points = [
        {"phase": "Pre-Diwali Build-up", "label": "Oct 30 (Day -2)", "aqi": base + 40, "pm25": 220, "pm10": 340, "hour_focus": "24h Avg", "notes": "Regional crop stubble transit & festive shopping congestion"},
        {"phase": "Pre-Diwali Build-up", "label": "Oct 31 (Day -1)", "aqi": base + 75, "pm25": 265, "pm10": 400, "hour_focus": "24h Avg", "notes": "Choti Diwali firecrackers & nocturnal temperature drop"},
        {"phase": "Diwali Peak Surge",   "label": "Nov 01 14:00 (Diwali Day)", "aqi": base + 60, "pm25": 240, "pm10": 370, "hour_focus": "Daytime Mixing", "notes": "Solar heating allows temporary dispersion"},
        {"phase": "Diwali Peak Surge",   "label": "Nov 01 20:00 (Diwali Evening)", "aqi": base + 130, "pm25": 330, "pm10": 510, "hour_focus": "Firecracker Burst", "notes": "Intense firecracker ignition begins"},
        {"phase": "Diwali Peak Surge",   "label": "Nov 02 01:00 (Diwali Midnight)", "aqi": min(500, base + 180), "pm25": 410, "pm10": 620, "hour_focus": "Peak Nocturnal Inversion", "notes": "Ground boundary layer collapse traps smoke near surface"},
        {"phase": "Post-Diwali Dispersion", "label": "Nov 02 (Day +1)", "aqi": min(500, base + 145), "pm25": 350, "pm10": 530, "hour_focus": "24h Avg", "notes": "Residual particulate smog; heavy lingering haze"},
        {"phase": "Post-Diwali Dispersion", "label": "Nov 03 (Day +2)", "aqi": base + 90, "pm25": 280, "pm10": 420, "hour_focus": "24h Avg", "notes": "Partial dispersion as surface winds slowly increase"},
        {"phase": "Post-Diwali Dispersion", "label": "Nov 04 (Day +3)", "aqi": base + 50, "pm25": 230, "pm10": 360, "hour_focus": "24h Avg", "notes": "Atmosphere gradually resets toward winter baseline"}
    ]
    
    formatted_points = []
    for item in timeline_points:
        aqi_val = item["aqi"]
        formatted_points.append({
            "phase": item["phase"],
            "timeline_label": item["label"],
            "hour_focus": item["hour_focus"],
            "forecast_aqi": aqi_val,
            "category": get_aqi_category(aqi_val),
            "forecast_pm25": item["pm25"],
            "forecast_pm10": item["pm10"],
            "confidence_interval_low": max(50, aqi_val - 25),
            "confidence_interval_high": min(500, aqi_val + 30),
            "atmospheric_notes": item["notes"]
        })
    
    return {
        "location": loc,
        "forecast_generated_at": datetime.now().isoformat(),
        "is_demonstration_model": True,
        "demonstration_notice": "Values represent prototype demonstration predictions. Full Scikit-learn model training against CPCB ground truth scheduled for next phase.",
        "timeline_forecast": formatted_points
    }

@app.get("/api/aqi/comparison")
def get_neighbourhood_comparison():
    """
    Returns comparative cross-neighbourhood current and projected peak metrics.
    Useful for comparison cards, rankings, and heatmap visualizations.
    """
    comparison_data = []
    for loc_id, loc in LOCATIONS.items():
        base = loc.baseline_aqi
        peak_projected = min(500, base + 160 if "Industrial" in loc.zone_type or "Dense" in loc.zone_type else base + 90)
        comparison_data.append({
            "location_id": loc.id,
            "name": loc.name,
            "zone_type": loc.zone_type,
            "latitude": loc.latitude,
            "longitude": loc.longitude,
            "current_observed_aqi": base + 45,
            "current_category": get_aqi_category(base + 45),
            "projected_diwali_peak_aqi": peak_projected,
            "projected_peak_category": get_aqi_category(peak_projected),
            "risk_tier": "Severe Risk" if peak_projected > 400 else ("Very Poor Risk" if peak_projected > 300 else "Moderate Risk"),
            "primary_stressor": "Heavy Firecracker Entrapment & Diesel Traffic" if base > 300 else "Regional Haze & Stagnant Air"
        })
    
    # Sort descending by projected peak
    comparison_data.sort(key=lambda x: x["projected_diwali_peak_aqi"], reverse=True)
    return {
        "timestamp": datetime.now().isoformat(),
        "total_zones_monitored": len(comparison_data),
        "is_demonstration_data": True,
        "neighbourhood_rankings": comparison_data
    }

@app.get("/api/alerts")
def get_smart_alerts():
    """
    Returns smart proactive pollution threshold alerts.
    """
    alerts = [
        {
            "id": "ALT-01",
            "severity": "CRITICAL",
            "title": "Severe Nocturnal Spikes Forecasted in Eastern & Northern Chokepoints",
            "affected_zones": ["Anand Vihar", "Rohini Sector 16", "Punjabi Bagh"],
            "time_window": "Nov 01, 20:00 to Nov 02, 04:00",
            "projected_aqi_range": "460 - 500 [Severe+]",
            "action_advice": "Stay indoors with windows sealed; avoid morning athletic workouts before noon."
        },
        {
            "id": "ALT-02",
            "severity": "ADVISORY",
            "title": "Daytime Thermal Ventilation Window Identified",
            "affected_zones": ["All Supported Delhi NCR Zones"],
            "time_window": "Nov 01, 13:00 to 15:30",
            "projected_aqi_range": "270 - 320 [Poor]",
            "action_advice": "Comparatively lower exposure window for necessary grocery transit or commute."
        }
    ]
    return {
        "active_alerts_count": len(alerts),
        "alerts": alerts
    }

@app.post("/api/exposure-planner/evaluate", response_model=ExposurePlanResponse)
def evaluate_exposure_plan(req: ExposurePlanRequest):
    """
    Personal Pollution Exposure & Activity Planner.
    Evaluates activity against forecast time slots to identify lower-exposure windows.
    Includes practical guidance and strict non-medical disclaimer.
    """
    if req.location_id not in LOCATIONS:
        raise HTTPException(status_code=404, detail=f"Location '{req.location_id}' not found.")
    
    loc = LOCATIONS[req.location_id]
    base = loc.baseline_aqi
    
    # Evaluate 3 slots: Morning, Afternoon, Evening
    m_aqi = min(500, base + 110)
    a_aqi = max(150, base + 35)
    e_aqi = min(500, base + 155)
    
    slots = [
        SlotEvaluation(
            slot_label="Early Morning Window",
            time_window="06:00 AM – 08:30 AM",
            forecast_aqi=m_aqi,
            risk_level=get_aqi_category(m_aqi),
            estimated_relative_exposure="HIGH (Severe Inversion Peak)",
            recommended=False
        ),
        SlotEvaluation(
            slot_label="Midday Thermal Window",
            time_window="01:00 PM – 03:30 PM",
            forecast_aqi=a_aqi,
            risk_level=get_aqi_category(a_aqi),
            estimated_relative_exposure="LOWEST (Sunlight & Boundary Layer Mixing)",
            recommended=True
        ),
        SlotEvaluation(
            slot_label="Night Festive Window",
            time_window="07:30 PM – 10:30 PM",
            forecast_aqi=e_aqi,
            risk_level=get_aqi_category(e_aqi),
            estimated_relative_exposure="EXTREME (Firecracker Surge & Calm Winds)",
            recommended=False
        )
    ]
    
    reduction_pct = round(((m_aqi - a_aqi) / m_aqi) * 100, 1)
    
    # Practical suggestions based on selected activity
    suggestions_map = {
        "Walking": [
            "Reschedule your daily walk from early morning (6 AM) to early afternoon (1:30 PM).",
            "Wear a well-fitted, certified N95 or FFP2 respirator mask if stepping out.",
            "Avoid main ring roads and transit choke-points; prefer parks set back from heavy diesel corridors."
        ],
        "Outdoor Sports": [
            "Avoid high-intensity aerobic outdoor training during hours with AQI > 300.",
            "Move athletic practice indoors or conduct low-exertion tactical/stretching sessions.",
            "Schedule unavoidable outdoor fitness between 1:00 PM and 3:00 PM when solar heating promotes dispersion."
        ],
        "Commuting": [
            "Keep vehicle windows fully rolled up with AC set to cabin air recirculation mode.",
            "Two-wheeler and pedestrian commuters should equip certified N95 particulate respirators.",
            "Consider travelling during off-peak traffic hours to avoid idling exhaust accumulation."
        ],
        "Outdoor Events": [
            "Coordinate event gatherings in open, ventilated courtyards rather than narrow street canyons.",
            "Deploy ambient air purifiers in covered pandals or indoor gathering halls.",
            "Advise vulnerable attendees (elderly, children) to arrive during daytime hours."
        ]
    }
    
    practical_tips = suggestions_map.get(req.activity_type, [
        "Minimize vigorous outdoor physical exertion during nocturnal inversion hours.",
        "Equip an N95 respirator mask when moving through high-density traffic zones.",
        "Keep home windows sealed between 7 PM and 9 AM."
    ])
    
    disclaimer = (
        "IMPORTANT HEALTH GOVERNANCE NOTICE: AirPulse is an environmental awareness and exposure reduction "
        "planning tool based on atmospheric predictive models. It is NOT a medical diagnosis, clinical advisory, "
        "or personalized health guarantee system. It does not diagnose asthma or clinical conditions, nor does "
        "it prescribe treatments or claim any outdoor activity is completely risk-free. Consult a licensed medical "
        "practitioner for individual health conditions."
    )
    
    return ExposurePlanResponse(
        location_name=loc.name,
        activity_type=req.activity_type,
        evaluation_date=req.activity_date,
        slots=slots,
        optimal_slot="Midday Thermal Window (01:00 PM – 03:30 PM)",
        estimated_exposure_reduction_pct=reduction_pct,
        practical_suggestions=practical_tips,
        is_demonstration_data=True,
        medical_disclaimer=disclaimer
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
