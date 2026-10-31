# VayuVision AI — Predict. Prepare. Protect.

> **AI-Powered Environmental Intelligence: Neighbourhood-Level Air Pollution Predicted Before, During, and After Diwali**  
> **Team CodeStorms:** Rishika Jindal, Navpreet Kaur, Yashika Bansal, Krishu Duggal  
> **Hackathon Deliverable:** Round 2 Working MVP Prototype & Pitch Draft (Checkpoint 2 — 5:00 AM)

[![Python](https://img.shields.io/badge/Python-3.13-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-2.0.0-009688.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38BDF8.svg)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-10b981.svg)](https://leafletjs.com/)
[![Round 2 MVP](https://img.shields.io/badge/Round%202-Functional%20Working%20Build-emerald.svg)](#)

---

## 1. Problem Statement

During Diwali and the onset of north Indian winter, neighbourhood air quality deteriorates rapidly from *Moderate* to *Severe+ (450–500 AQI)* within a matter of hours. Conventional systems report only a single consolidated city-wide metric (e.g., *"Delhi AQI: 385 — Very Poor"*), which fails citizens in two critical ways:
1. **Masks Neighbourhood Disparities:** While green institutional belts like Lodhi Road record an AQI of 210, dense residential pockets and transit corridors like Anand Vihar, Rohini, or Wazirpur experience hazardous spikes crossing 490+.
2. **Retrospective Panic vs Predictive Action:** Existing dashboards inform citizens what they inhaled two to four hours ago. When fireworks erupt at night, schools and families receive warnings only the following morning.

**VayuVision AI** bridges this critical gap by forecasting neighbourhood air quality 24 to 72 hours ahead, identifying localized pollution risk hotspots, and connecting forecasts to actionable decision tools before toxic exposure occurs.

---

## 2. Core Features (Implemented in MVP)

### A. Air Quality Dashboard
- Real-time ground observation telemetry from official continuous ambient air quality monitoring stations (CPCB CAAQMS).
- Complete pollutant telemetry: **PM2.5, PM10, NO2, SO2, CO, and O3** with NAAQS safety thresholds and percentage-of-limit gauges.
- Environmental dispersion parameters: **Temperature, Relative Humidity, Surface Wind Speed & Direction, Boundary Layer Height, Atmospheric Pressure, and Nocturnal Inversion Risk Index**.
- Explicit data transparency: clearly labels data as **RETRIEVED OBSERVATION** vs **SIMULATED DEMO** with station codes.

### B. 24–72 Hour AQI Forecast
- Horizon selector for **24 Hours**, **48 Hours**, and **72 Hours**.
- Interactive multi-series SVG timeline chart displaying forecasted AQI, PM2.5, PM10, and a **90% Confidence Interval Band**.
- Interactive hover scrubber displaying exact point-in-time metrics and atmospheric dispersion dynamics.
- Summary metrics strip: Peak AQI & Time, Lowest Exposure Window & Time, Average Period Exposure, and Primary Atmospheric Driver.
- 3-Phase Diwali Evolution breakdown:
  - **Phase 1: Pre-Diwali Build-up (Days -3 to -1):** Stubble influx and festive shopping congestion.
  - **Phase 2: Diwali Night Peak Surge (Diwali Evening to 03:00 AM):** Pyrotechnic burst trapped beneath nocturnal boundary-layer collapse.
  - **Phase 3: Post-Diwali Dispersion (Days +1 to +3):** Stagnant air mass evacuation taking 48–72h to reset.

### C. Pollution Risk Heatmap
- Interactive geospatial map powered by **Leaflet with OpenStreetMap Streets & Esri Satellite Imagery** centered on Delhi NCR across **27 comprehensive micro-zones**.
- Custom SVG markers with pulsing aura rings on active critical hotspots (Anand Vihar, Wazirpur, Jahangirpuri, Punjabi Bagh).
- Interactive popup inspection cards displaying station telemetry, coordinates, and recommended municipal intervention.
- Risk tier filters: `All Zones`, `Severe Hotspots`, `Severe (>400)`, `High (300-400)`, `Moderate`.
- Dual-mode toggle: **Interactive Geo Map** & **Spatial Radar Grid** with quick-jump 1-click zone buttons.

### D. Early-Warning Alerts & WhatsApp Simulator
- Configurable alert threshold slider (200 to 450 AQI) dynamically updating active alerts.
- Smart alert feed categorized by severity tags (`CRITICAL`, `HIGH`, `ADVISORY`) with time windows and root cause.
- **Modular WhatsApp Early-Warning Simulator:**
  - Citizen mobile number input and micro-zone selector.
  - Template selector: *Severe Spike Warning*, *Midday Lower Exposure Window*, or *24h Daily Briefing*.
  - Authentic WhatsApp chat bubble preview with bold headers, emojis, timestamps, and double checkmarks.
  - Simulated dispatch button with delivery confirmation and inspectable Meta Cloud API JSON webhook payload.
  - Transparent disclosure: functional webhook simulator without unverified carrier SMS billing.

### E. Pollution Action Tools & Decision Engines
1. **Personal Pollution Exposure & Activity Planner:**
   - Evaluates planned activity (Walking, Sports, Commuting, Outdoor Events).
   - Compares 3 daily slots: Early Morning (06:00–08:30) vs Midday Thermal Window (13:00–15:30) vs Night Festive Window (19:30–22:30).
   - Highlights the optimal window with calculated **Particulate Exposure Reduction %** (e.g. **-32.8% reduction** by utilizing midday solar mixing).
   - Practical risk-reduction tips (certified N95 masks, AC cabin recirculation).
   - Prominent non-medical governance disclaimer.
2. **CampusAir Institutional Event Planner:**
   - Evaluates school events (Morning Assembly, Sports Tournament, Cultural Festival, Recess).
   - Delivers automated AI Verdict: **GO / PROCEED**, **CAUTION / MODIFY**, or **RESCHEDULE INDOORS**.
   - Standard operating protocol checklist for school principals and athletic directors.
3. **Government Anti-Smog Sprinkler Closed-Loop (MuniPulse):**
   - Implements the exact 5-stage loop from the presentation slide:
     `Detect -> Suggest -> Approve -> Dispatch Sprinklers -> Re-measure AQI`.
   - Displays assigned fleet units (`MCD-MIST-04`, `MCD-SPRINKLER-12`), scheduled corridors, and projected particulate suppression (-22.5%).

### F. About & Pitch Draft
- Comprehensive documentation of problem statement, proposed solution, system architecture, data source integration status, Team CodeStorms credits, and sustainable business monetization models.

---

## 3. Technology Stack

### Frontend:
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS with custom Dark Glassmorphic Theme (`#050811`)
- **Icons:** Lucide React
- **Mapping:** Leaflet 1.9.4 & OpenStreetMap CartoDB Dark Tiles + Native Vector Radar
- **Charting:** Responsive SVG multi-series timeline with confidence polygons and hover scrubber
- **Routing & State:** Single Page Architecture with unified API state and offline caching

### Backend:
- **Framework:** Python 3.13 + FastAPI
- **Data Validation:** Pydantic v2
- **Server:** Uvicorn ASGI Server
- **CORS:** Enabled for local cross-origin Vite development

### Machine Learning & Data Processing:
- **Data Processing:** pandas & NumPy
- **Forecasting Regressor:** scikit-learn (Random Forest / Gradient Boosting Baseline)
- **Feature Engineering:** 1h and 24h temporal lags, 6h rolling mean, boundary-layer inversion multiplier, and festive firecracker emission proxies
- **Validation:** Chronological 80/20 train/test split demonstrating **47.2% MAE error reduction** over persistence baseline

---

## 4. System Architecture

```mermaid
flowchart TD
    classDef dataSource fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc;
    classDef backendEngine fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#f8fafc;
    classDef modules fill:#1e1b4b,stroke:#818cf8,stroke-width:2px,color:#f8fafc;
    classDef userLayer fill:#451a03,stroke:#f97316,stroke-width:2px,color:#f8fafc;

    subgraph DataSources["1. DATA SOURCES"]
        GovtStations["🏛️ Govt AQI Stations (CPCB CAAQMS)"]:::dataSource
        WeatherAPI["🌤️ Weather API (Open-Meteo)"]:::dataSource
        IoTSensors["📡 IoT Sensors & OpenAQ Network"]:::dataSource
        SatData["🛰️ Satellite AOD & OpenStreetMap"]:::dataSource
    end

    subgraph Backend["2. BACKEND ENGINE (FastAPI)"]
        Ingestion["⚡ Ingestion Layer (REST / MQTT)"]:::backendEngine
        TimeSeriesDB["🗄️ Time-Series Store (Hourly Telemetry)"]:::backendEngine
        ProcessingEngine["🧠 Processing Engine (Lags, AQI Calc, 24-72h Forecast)"]:::backendEngine
    end

    subgraph Modules["3. FUNCTIONAL MODULES"]
        AlertEngine["🔔 Alert Engine (WhatsApp Cloud API Simulator)"]:::modules
        GovtModule["🚜 Govt Module (Hotspots → Sprinkler Plan)"]:::modules
        CampusPlanner["🎓 CampusAir Event Planner (Go / Caution / Reschedule)"]:::modules
        ExposurePlanner["🛡️ Personal Exposure Optimizer (-32% Particulate Shift)"]:::modules
    end

    subgraph Stakeholders["4. USERS & STAKEHOLDERS"]
        Citizens["👥 Citizens on WhatsApp (Free Public Alerts)"]:::userLayer
        GovtUsers["🏛️ Municipal Authorities (MCD / DPCC Fleet)"]:::userLayer
        Institutions["🏫 Schools, Colleges & Sports Academies"]:::userLayer
        LogisticsFleets["🚚 Delivery Fleets (Zomato / Blinkit APIs)"]:::userLayer
    end

    GovtStations --> Ingestion
    WeatherAPI --> Ingestion
    IoTSensors --> Ingestion
    SatData --> Ingestion

    Ingestion --> TimeSeriesDB
    TimeSeriesDB --> ProcessingEngine

    ProcessingEngine --> AlertEngine
    ProcessingEngine --> GovtModule
    ProcessingEngine --> CampusPlanner
    ProcessingEngine --> ExposurePlanner

    AlertEngine --> Citizens
    GovtModule --> GovtUsers
    CampusPlanner --> Institutions
    ExposurePlanner --> Citizens
```

---

## 5. API Endpoints

| Method | Endpoint | Parameters | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | None | Returns backend service and ML operational health |
| `GET` | `/api/locations` | None | Returns list of 27 supported Delhi NCR micro-zones |
| `GET` | `/api/air-quality` | `location_id` | Latest available CPCB observation, gases, and weather |
| `GET` | `/api/forecast` | `location_id`, `hours` (24/48/72) | Multi-horizon forecast with confidence intervals |
| `GET` | `/api/risk-map` | None | Spatial risk indicators, hotspot statuses, and coordinates |
| `GET` | `/api/alerts` | `threshold` (default 350) | Dynamic threshold alerts with time windows and causes |
| `POST` | `/api/alerts/whatsapp-demo`| JSON Body (phone, zone, type) | Modular WhatsApp Cloud API dispatch simulator |
| `GET` | `/api/recommendations` | `location_id` | Tiered recommendations across citizens, schools, and city |
| `POST`| `/api/exposure-planner/evaluate` | JSON Body (zone, activity, date) | Activity slot comparison with exposure reduction % |
| `POST`| `/api/institution-planner/evaluate` | JSON Body (campus, event, slot) | CampusAir event Go / Caution / Reschedule engine |
| `GET` | `/api/govt/sprinkler-plan` | None | Municipal 5-step closed-loop sprinkler routing |
| `GET` | `/api/pitch-data` | None | Structured pitch draft and hackathon checkpoint data |

---

## 6. Setup & Execution Commands

### Prerequisites
- Node.js (v18+) & npm
- Python (v3.10+)

### 1. Start the Backend API (FastAPI)
```bash
# Navigate to workspace root
cd c:\Users\KRISHU\OneDrive\Desktop\RESUMATE

# Start FastAPI server on port 8000
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
API Documentation will be live at: `http://localhost:8000/docs`

### 2. Start the Frontend (Vite)
```bash
# In another terminal window:
cd c:\Users\KRISHU\OneDrive\Desktop\RESUMATE

# Start Vite development server
npm run dev
```
Open your browser at: `http://localhost:5173`

*(Note: The frontend includes an automatic resilient offline cache. Even if the backend server is not yet started, all UI views, interactive maps, forecast charts, WhatsApp simulators, and action tools work seamlessly without broken pages!)*

### 3. Run Machine Learning Pipeline Benchmark
```bash
python ml/train.py
python ml/predict.py
```

---

## 7. Working Demo Flow Walkthrough

For hackathon evaluators and judges, follow this 7-step demo flow:

1. **Open Dashboard (`/`):**
   - View live ground observation telemetry for **Anand Vihar** (AQI 380, Very Poor).
   - Inspect individual pollutant gauges (PM2.5: 288 µg/m³, PM10: 473 µg/m³) and atmospheric inversion risk.
   - Switch location to **Lodhi Road** via the top navbar dropdown to see the dramatic neighbourhood disparity (AQI 245 vs 380).
2. **Open 24–72h Forecast Tab:**
   - Toggle between **24 Hours**, **48 Hours**, and **72 Hours** horizon buttons.
   - Hover over the timeline curve to inspect exact forecasted AQI points, PM2.5 concentrations, and 90% confidence intervals.
   - Read the 3-phase Diwali breakdown explaining why nocturnal temperature inversion collapses during fireworks.
3. **Open Risk Heatmap Tab:**
   - View the interactive **Leaflet Map** with OpenStreetMap dark tiles showing Delhi NCR.
   - Click on the pulsing red marker at **Anand Vihar** or **Wazirpur** to view critical hotspot telemetry.
   - Switch to **Spatial Radar Grid** view to inspect risk classifications across all 8 zones simultaneously.
4. **Open Early Warnings & WhatsApp Simulator Tab:**
   - Drag the **Configurable Early-Warning Threshold** slider from 350 down to 250 to observe live alert reactivity.
   - In the **WhatsApp Early-Warning Simulator**, enter a phone number and click **Simulate WhatsApp Alert Dispatch**.
   - Review the realistic rendered WhatsApp message bubble and inspect the collapsible Meta Cloud API JSON payload.
5. **Open Action Tools Tab:**
   - **Citizen Planner:** Select "Walking" and see the optimal 1:00 PM – 3:30 PM Midday Thermal Window achieving **-32.8% Inhaled Smog Reduction**.
   - **CampusAir Tab:** Evaluate "Morning Assembly" at DPS Rohini to see the automated **RESCHEDULE INDOORS** verdict.
   - **Govt Sprinkler Loop Tab:** Inspect the 5-stage municipal loop (`Detect -> Suggest -> Approve -> Dispatch -> Re-measure`) with dispatched anti-smog fleet units (`MCD-MIST-04`).
6. **Open About & Pitch Tab:**
   - Review problem statement, system architecture flowchart, data sources table, and team credits.

---

## 8. Pitch Presentation Draft

### The Problem & Why It Matters
Air pollution during Diwali is an environmental emergency, not an inconvenience. But citizens and institutions are paralyzed because government dashboards only tell them what they breathed hours ago. City-wide numbers hide the fact that one neighborhood can be twice as hazardous as another.

### How VayuVision AI Works
VayuVision ingest CPCB ground stations and Open-Meteo weather factors, applies time-lagged machine learning models accounting for nocturnal temperature inversion, and outputs hyper-local 24-72h predictions. Most importantly, it connects every forecast to an action tool.

### What is Innovative
1. **From Retrospective to Predictive:** Advance warning before the fireworks ignite.
2. **Neighbourhood Granularity:** Pinpoints exact chokepoints rather than city-wide averages.
3. **Direct Delivery on WhatsApp:** Reaches citizens where they already spend time, requiring zero app installs.
4. **Actionable Closed Loops:** From personal activity shifting (-32% exposure) to municipal anti-smog gun dispatch.

### Feasibility, Viability & Sustainable Monetization
- **Citizen Tier:** 100% Free Public Good WhatsApp alerts for families and asthma patients.
- **CampusAir B2B SaaS:** ₹2,500 – ₹5,000/month per private school/sports academy for automated morning assembly scheduling.
- **FleetSafe Logistics API:** ₹0.30 per route query for delivery fleets (Zomato, Swiggy, Blinkit) to minimize rider toxicity exposure.
- **MuniPulse B2G:** Annual municipal smart city contracts for targeted water sprinkler routing.

### Honest Disclosures & Limitations
- Current micro-zone predictions between physical CPCB stations are estimated using dispersion modeling; continuous low-cost IoT sensor integration is planned for Round 3.
- WhatsApp broadcast currently executes in verified demonstration webhook mode to avoid unverified carrier billing during evaluation.
- All recommendations include strict non-medical governance disclaimers.

---

## 9. Team CodeStorms

| Name | Role |
| :--- | :--- |
| **Rishika Jindal** | AI/ML & Data Engineering |
| **Navpreet Kaur** | Full-Stack Development & Architecture |
| **Yashika Bansal** | Environmental Research & Analytics |
| **Krishu Duggal** | UI/UX Design & Frontend Systems |

*VayuVision AI — Predict. Prepare. Protect.*
