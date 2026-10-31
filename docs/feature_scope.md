# AirPulse — Feature Scope & Product Specification

## 1. Executive Summary
AirPulse is an AI-powered environmental intelligence platform engineered to predict neighbourhood-level air quality before, during, and after Diwali. It transforms complex atmospheric and particulate data into intuitive forecasts and actionable exposure reduction decisions.

---

## 2. Core Features Breakdown

### A. Neighbourhood-Level AQI Prediction
- **Capabilities:**
  - Micro-zone selection across representative urban zones (e.g. Anand Vihar, Lodhi Road, Rohini, IGI Airport).
  - Displays measured CPCB ground observations (PM2.5, PM10, AQI).
  - Renders future multi-hour forecasts with confidence intervals.
  - Transparent labeling: Explicit distinction between *Measured Ground Truth* and *Demonstration Predictive Forecasts*.

### B. 3-Phase Diwali Timeline Forecast
- **Phase 1: Pre-Diwali Build-up (Days -3 to -1):**
  - Tracks agricultural stubble smoke influx, commercial transit, and ambient temperature drop.
- **Phase 2: Diwali Peak Surge (Diwali Day to Day +1 02:00 AM):**
  - Models nocturnal firecracker particulate surge and nocturnal inversion trapping.
- **Phase 3: Post-Diwali Dispersion (Days +2 to +4):**
  - Monitors slow atmospheric clearance under prevailing surface wind patterns.

### C. Neighbourhood Comparison & Pollution Heatmap
- **Capabilities:**
  - Cross-neighbourhood side-by-side disparity analysis.
  - Risk tier categorization according to Indian NAQI standards:
    - Good (0–50) | Satisfactory (51–100) | Moderate (101–200)
    - Poor (201–300) | Very Poor (301–400) | Severe+ (401–500)
  - Identifies comparative clean-air corridors vs critical choke-points.

### D. Environmental Insights & Smart Pollution Alerts
- **Capabilities:**
  - Correlates ambient temperature, relative humidity, and surface wind speed with particulate entrapment.
  - Proactive smart alerts flagging projected extreme threshold breaches (>400 AQI).

---

## 3. Differentiating Feature: Personal Pollution Exposure & Activity Planner

### Purpose
To translate abstract AQI numbers into actionable daily scheduling adjustments, helping users minimize their cumulative inhaled particulate burden.

### User Flow
1. **Activity Selection:** Walking, Outdoor Sports, Commuting, Outdoor Events.
2. **Date & Location Selection:** Choose upcoming festive calendar date and neighbourhood.
3. **Slot Comparison Engine:** Evaluates Early Morning (06:00 – 08:30 AM), Midday Thermal Window (01:00 – 03:30 PM), and Night Festive Window (07:30 – 10:30 PM).
4. **Actionable Recommendations:** Recommends the optimal time slot with estimated exposure reduction percentage (typically 20% to 35% lower during daytime thermal mixing).
5. **Practical Guidance:** Activity-specific tips (e.g., N95 respirator mask usage, vehicle cabin air recirculation, indoor training substitutions).

### Non-Medical Governance Policy
- **No Medical Diagnosis:** Does not diagnose asthma, COPD, or clinical respiratory conditions.
- **No Treatment Prescriptions:** Never recommends altering medication or inhaler regimes.
- **No Absolute Safety Guarantees:** Explicitly clarifies that outdoor activity in compromised air carries baseline physiological stress.
- **Zero Sensitive Data:** Does not solicit, store, or process personal medical histories.

---

## 4. User Personas & Beneficiaries

1. **Vulnerable Citizens & Families:** Parents and senior residents seeking safe hours for outdoor errands.
2. **Schools & Educational Institutions:** Principals and coordinators scheduling outdoor morning assemblies and physical education classes.
3. **Sports Academies & Running Clubs:** Athletes rescheduling training to avoid peak smog windows.
4. **Outdoor Event Organizers:** Cultural and commercial festival planners selecting venues and timing.
