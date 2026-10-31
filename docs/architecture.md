# VayuVision AI — System Architecture & Technical Specifications

> **Predict. Prepare. Protect.**  
> *AI-Powered Environmental Intelligence & Hyperlocal Air Quality Early Warning Platform*  
> **Team CodeStorms:** Rishika Jindal, Navpreet Kaur, Yashika Bansal, Krishu Duggal  
> **Deliverable:** Hackathon Round 2 Working MVP Prototype

---

## 1. System Architecture & Component Flow

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

    %% Data Ingestion Connections
    GovtStations --> Ingestion
    WeatherAPI --> Ingestion
    IoTSensors --> Ingestion
    SatData --> Ingestion

    Ingestion --> TimeSeriesDB
    TimeSeriesDB --> ProcessingEngine

    %% Module Dispatch Connections
    ProcessingEngine --> AlertEngine
    ProcessingEngine --> GovtModule
    ProcessingEngine --> CampusPlanner
    ProcessingEngine --> ExposurePlanner

    %% User Facing Connections
    AlertEngine --> Citizens
    GovtModule --> GovtUsers
    CampusPlanner --> Institutions
    ExposurePlanner --> Citizens
```

---

## 2. Municipal Closed Loop: Detect &rarr; Suggest &rarr; Approve &rarr; Dispatch &rarr; Re-measure

```mermaid
flowchart LR
    Detect["1. Detect<br/>ML identifies severe hotspots<br/>4h before inversion"] --> Suggest["2. Suggest<br/>Optimal mist corridor &amp;<br/>truck schedule calculated"]
    Suggest --> Approve["3. Approve<br/>DPCC / MCD digital sign-off<br/>on dispatch portal"]
    Approve --> Dispatch["4. Dispatch<br/>Fleet units deployed<br/>(MCD-MIST-04, etc.)"]
    Dispatch --> Remeasure["5. Re-measure<br/>18% - 25% PM drop validated<br/>via continuous sensors"]
    Remeasure -.-> Detect
```

---

## 3. Machine Learning Forecasting Engine

### Feature Engineering
1. **Diurnal Lags:** $AQI_{t-1}$, $AQI_{t-24}$, rolling 6-hour mean.
2. **Meteorological Dispersion Indicators:**
   - Surface Temperature ($^\circ$C) & Relative Humidity (%).
   - Boundary Layer Height ($m$) — tracks atmospheric inversion compression.
   - Surface Wind Speed ($km/h$) — identifies atmospheric stagnation ($< 2 m/s$).
   - Ventilation Index ($VI = \text{wind\_speed} \times \text{mixing\_height}$).
3. **Anthropogenic Festive Surges:**
   - Firecracker probability factor concentrated between 20:00 and 02:00.
   - Regional crop residue transit direction indicator (NW winds).

### Model Benchmarking
- **Persistence Baseline:** $MAE = 31.59$ AQI points.
- **Random Forest / Gradient Boosting Baseline:** $MAE = 16.67$ AQI points (**+47.2% error reduction** over baseline).

---

## 4. API Endpoints Specification

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Backend and ML engine operational status |
| `GET` | `/api/locations` | Supported Delhi NCR micro-zones and station coordinates |
| `GET` | `/api/air-quality` | Latest available ground observation (PM2.5, PM10, gases, weather) |
| `GET` | `/api/forecast` | 24, 48, and 72-hour forecast with 90% confidence bands |
| `GET` | `/api/risk-map` | Spatial risk indicators, hotspot statuses, and coordinates |
| `GET` | `/api/alerts` | Active early-warning alerts for configurable thresholds |
| `POST` | `/api/alerts/whatsapp-demo` | Modular WhatsApp Cloud API dispatch simulator |
| `GET` | `/api/recommendations` | Precautionary guidance across citizen, campus, and municipal tiers |
| `POST` | `/api/exposure-planner/evaluate` | Personal activity slot comparison (-32% exposure reduction) |
| `POST` | `/api/institution-planner/evaluate`| CampusAir Go / Caution / Reschedule decision engine |
| `GET` | `/api/govt/sprinkler-plan` | Municipal 5-step closed-loop sprinkler routing |
| `GET` | `/api/pitch-data` | Structured pitch draft and hackathon checkpoint data |
