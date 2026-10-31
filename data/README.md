# AirPulse — Data Sources, Schemas & Limitations

## 1. Overview
AirPulse integrates historical and near-real-time environmental indicators across three distinct data domains:
1. **Air Quality Observations (Ground Truth)**
2. **Meteorological Indicators (Atmospheric Dispersion)**
3. **Festive & Urban Mobility Proxies (Emission Drivers)**

---

## 2. Potential & Integrated Data Sources

### A. Central Pollution Control Board (CPCB) / CAAQMS
- **Description:** Official network of Continuous Ambient Air Quality Monitoring Stations across India.
- **Monitored Parameters:** PM2.5, PM10, Nitrogen Dioxide (NO2), Sulfur Dioxide (SO2), Carbon Monoxide (CO), Ozone (O3).
- **Access Protocol:** National Air Quality Index (NAQI) portal and Open Government Data (OGD) Platform India (`data.gov.in`).
- **Resolution:** Hourly and 24-hour moving averages.
- **Attribution & Licensing:** Government Open Data License - India (GODL). Free for non-commercial and public-interest educational research.
- **Verification Status in Prototype:** Verified historical structure; prototype uses verified schema with labeled demonstration values.

### B. Meteorological Data (IMD / OpenWeather / ECMWF ERA5)
- **Description:** Ground and atmospheric weather reanalysis datasets.
- **Monitored Parameters:** Ambient temperature (°C), relative humidity (%), surface wind speed (m/s), wind direction (degrees), and planetary boundary layer mixing height (m).
- **Access Protocol:** OpenWeather Historical Weather API / IMD Pune Gridded Meteorological Data.
- **Attribution & Licensing:** OpenWeather API terms (Creative Commons / Open Database License).

### C. Urban Mobility & Festive Indicators
- **Description:** Relative traffic congestion indices and historical firecracker timing markers.
- **Proxies Used:** TomTom Traffic Index / Google Distance Matrix proxy metrics during pre-festival shopping hours (5:00 PM – 9:00 PM).

---

## 3. Data Schema Specifications

### Hourly Observation Record (`cpcb_observation`)
```json
{
  "timestamp": "2026-10-31T20:00:00Z",
  "station_code": "DL-CPCB-001",
  "location_id": "anand_vihar",
  "latitude": 28.6508,
  "longitude": 77.3152,
  "pm25": 285.4,
  "pm10": 430.1,
  "no2": 78.2,
  "so2": 18.5,
  "co": 2.4,
  "ozone": 34.1,
  "aqi": 412,
  "aqi_category": "Severe+",
  "data_status": "MEASURED_OBSERVATION"
}
```

### 3-Phase Forecast Record (`airpulse_forecast`)
```json
{
  "forecast_id": "FC-20261101-01",
  "location_id": "anand_vihar",
  "phase": "Diwali Peak Surge",
  "target_timestamp": "2026-11-02T01:00:00Z",
  "forecast_aqi": 490,
  "confidence_interval": [465, 500],
  "dominant_pollutant": "PM2.5",
  "meteorological_conditions": {
    "wind_speed_kmh": 2.1,
    "temperature_c": 16.5,
    "humidity_pct": 78.0,
    "inversion_risk": "CRITICAL"
  },
  "is_demonstration_model": true
}
```

---

## 4. Limitations & Missing Data Handling

1. **Station Spatial Density:** In Delhi NCR, CAAQMS stations are separated by several kilometres. Areas located between sensors require spatial inverse-distance weighting (IDW) or spatial kriging.
2. **Sensor Dropout / Maintenance Windows:** Ground sensors occasionally lose calibration or power during peak episodes. AirPulse applies rolling imputation for gaps $\le 2$ hours and flags extended dropouts as `DATA_UNAVAILABLE`.
3. **Nocturnal Fireworks Irregularity:** Firecracker emissions depend on community compliance and localized enforcement, which cannot be measured deterministically in advance. AirPulse models these as probabilistic episodic surge distributions.

---

## 5. Security & Ethical Standards
- **No Secret Leakage:** No private API keys or credentials are committed to version control.
- **Transparency:** All prototype demonstration data is explicitly labeled with `is_demonstration_data: true`.
