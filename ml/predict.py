"""
AirPulse: Machine Learning Inference Engine (predict.py)

Generates multi-phase hourly AQI predictions for supported micro-zones
using environmental inputs and festive temporal indicators.
Clearly marks demonstration mode when using prototype models.
"""

from typing import Dict, Any, List

def predict_diwali_timeline(location_baseline_aqi: int, weather_profile: Dict[str, float]) -> List[Dict[str, Any]]:
    """
    Simulates multi-phase inference for a given location baseline and weather profile.
    
    Phases generated:
    1. Pre-Diwali Build-up (Day -2 to Day -1)
    2. Diwali Night Peak Surge (Diwali Day to Day +1 02:00 AM)
    3. Post-Diwali Dispersion (Day +2 to Day +4)
    """
    wind = weather_profile.get("wind_speed_kmh", 3.5)
    humidity = weather_profile.get("humidity_pct", 70.0)
    
    # Inversion factor: higher humidity and low wind exacerbate particulate accumulation
    inversion_multiplier = 1.0 + max(0.0, (5.0 - wind) * 0.08) + (0.1 if humidity > 75 else 0.0)

    phases = [
        {
            "phase": "Pre-Diwali Build-up",
            "time_label": "Oct 30 (Day -2)",
            "base_multiplier": 1.15,
            "description": "Background winter accumulation and agricultural smoke transit"
        },
        {
            "phase": "Pre-Diwali Build-up",
            "time_label": "Oct 31 (Day -1)",
            "base_multiplier": 1.25,
            "description": "Festive eve traffic emissions and localized firecracker trial bursts"
        },
        {
            "phase": "Diwali Peak Surge",
            "time_label": "Nov 01 14:00 (Diwali Day)",
            "base_multiplier": 1.20,
            "description": "Daytime boundary layer expansion provides brief relative dispersion"
        },
        {
            "phase": "Diwali Peak Surge",
            "time_label": "Nov 01 20:00 (Diwali Night)",
            "base_multiplier": 1.45,
            "description": "Rapid nocturnal firecracker burst begins; sharp PM2.5 escalation"
        },
        {
            "phase": "Diwali Peak Surge",
            "time_label": "Nov 02 01:00 (Diwali Midnight)",
            "base_multiplier": 1.70,
            "description": "Nocturnal boundary layer collapse traps concentrated pyrotechnic smoke"
        },
        {
            "phase": "Post-Diwali Dispersion",
            "time_label": "Nov 02 (Day +1)",
            "base_multiplier": 1.50,
            "description": "Heavy lingering toxic haze; slow atmospheric ventilation"
        },
        {
            "phase": "Post-Diwali Dispersion",
            "time_label": "Nov 03 (Day +2)",
            "base_multiplier": 1.30,
            "description": "Partial dispersion as surface mixing height recovers"
        },
        {
            "phase": "Post-Diwali Dispersion",
            "time_label": "Nov 04 (Day +3)",
            "base_multiplier": 1.18,
            "description": "Particulates settle toward prevailing early-winter ambient baseline"
        }
    ]

    forecasts = []
    for p in phases:
        raw_pred = int(location_baseline_aqi * p["base_multiplier"] * inversion_multiplier)
        capped_pred = min(500, max(50, raw_pred))
        forecasts.append({
            "phase": p["phase"],
            "time_label": p["time_label"],
            "predicted_aqi": capped_pred,
            "confidence_band": [max(50, capped_pred - 25), min(500, capped_pred + 30)],
            "meteorological_factor": round(inversion_multiplier, 2),
            "description": p["description"],
            "is_demonstration": True
        })

    return forecasts

if __name__ == "__main__":
    print("Testing AirPulse Inference Routine...")
    sample_weather = {"wind_speed_kmh": 3.2, "humidity_pct": 74.0}
    results = predict_diwali_timeline(location_baseline_aqi=320, weather_profile=sample_weather)
    print(f"Generated {len(results)} forecast timeline steps:")
    for r in results:
        print(f"[{r['phase']:<22}] {r['time_label']:<24}: Predicted AQI {r['predicted_aqi']} {r['confidence_band']}")
