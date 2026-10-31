# AirPulse — System Architecture & Data Engineering Pipeline

## 1. High-Level Architectural Flow

```mermaid
flowchart TD
    classDef implemented fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#f8fafc;
    classDef planned fill:#4c1d95,stroke:#8b5cf6,stroke-width:2px,stroke-dasharray: 5 5,color:#f8fafc;
    classDef userLayer fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#f8fafc;

    User["👤 End Citizen / Student / School Coordinator"]:::userLayer

    subgraph PresentationLayer["Presentation Layer (Implemented)"]
        ReactDash["💻 React 18 Dashboard & Activity Planner (Vite + Tailwind + Recharts)"]:::implemented
    end

    subgraph ServiceLayer["API Gateway Layer (Implemented)"]
        FastAPIApp["⚡ FastAPI Asynchronous Microservice (Pydantic + CORS + OpenAPI)"]:::implemented
    end

    subgraph PipelineLayer["Data Processing & Feature Pipeline (Implemented/Prototype)"]
        DataProc["⚙️ Data Preprocessing & Temporal Lag Engineering"]:::implemented
    end

    subgraph DataStorageLayer["Data Ingestion Layer (Verified / Integration Planned)"]
        HistoricalData["📊 Historical CPCB AQI & Meteorological Archives (Ground Truth)"]:::implemented
        LiveSensorFeed["📡 Live Sensor API & Satellite AOD Streaming Feed"]:::planned
    end

    subgraph IntelligenceLayer["Intelligence & ML Layer"]
        ScikitLearnModel["🧠 Proposed Machine Learning Forecasting Engine (Random Forest / Gradient Boosting)"]:::planned
        BaselinePersistence["📏 Persistence Baseline Benchmark (Yesterday = Today)"]:::implemented
    end

    subgraph ServingLayer["Forecast & Decision Serving Layer (Implemented)"]
        AQIForecastEngine["📈 3-Phase Diwali Timeline & Smart Alert Engine"]:::implemented
        ExposureEvaluator["🛡️ Personal Exposure & Slot Optimizer with Non-Medical Guidance"]:::implemented
    end

    %% Flow Connections
    User -->|Accesses Web Interface| ReactDash
    ReactDash -->|REST API Requests JSON| FastAPIApp
    FastAPIApp -->|Requests Processed Features| DataProc
    DataProc -->|Reads Historical Observations| HistoricalData
    DataProc -.->|Future Streaming Ingestion| LiveSensorFeed
    DataProc -->|Feeds Engineered Lags| ScikitLearnModel
    HistoricalData -->|Feeds Evaluation Baseline| BaselinePersistence
    ScikitLearnModel -.->|Generates Multi-Phase Forecasts| AQIForecastEngine
    BaselinePersistence -->|Benchmarks Accuracy MAE/RMSE| ScikitLearnModel
    AQIForecastEngine -->|Returns Multi-Phase Timeline| FastAPIApp
    ExposureEvaluator -->|Returns Slot Optimization| FastAPIApp
    FastAPIApp -->|Delivers Clean GeoJSON & Trends| ReactDash
    ReactDash -->|Presents Actionable Insights| User
```

---

## 2. Component Breakdown & Implementation Audit

| Component | Technology | Status in Round 1 | Description |
| :--- | :--- | :--- | :--- |
| **User Dashboard** | React 18, Vite, Lucide | **IMPLEMENTED** | Interactive client for location selection, timeline viewing, comparison, and planner. |
| **Data Visualizations** | Recharts, Tailwind CSS | **IMPLEMENTED** | 3-phase temporal trend line charts, risk meters, and neighbourhood cards. |
| **API Gateway** | Python 3, FastAPI, Uvicorn | **IMPLEMENTED** | High-throughput asynchronous endpoints with Pydantic schema validation. |
| **Data Preprocessing** | Pandas, NumPy | **IMPLEMENTED** | Temporal lag generation, ventilation index calculation, missing-value imputation. |
| **Baseline Model** | Python / NumPy | **IMPLEMENTED** | 24-hour persistence baseline benchmark calculating MAE and RMSE. |
| **ML Regressors** | Scikit-learn (RF / GBR) | **SCAFFOLDED / PLANNED** | Runnable in `ml/train.py`; full training against multi-year CPCB scheduled for Round 2. |
| **Smart Alerts Engine** | FastAPI Logic | **IMPLEMENTED** | Automated threshold breach detection (>400 AQI hazard flags). |
| **Personal Exposure Planner** | FastAPI & React | **IMPLEMENTED** | Time-slot comparison engine with strict non-medical exposure-reduction guidance. |
| **Live Sensor Stream** | WebSockets / Kafka | **PLANNED** | Direct streaming ingestion of live CAAQMS telemetry. |

---

## 3. Security, Performance & Scalability

1. **Client Performance:** Vite bundling produces optimized static assets with fast paint times.
2. **API Throughput:** FastAPI's asynchronous execution ensures sub-50ms response times for forecast queries.
3. **Data Protection:** The platform does not require user accounts, passwords, or personal health records.
4. **CORS Governance:** Explicit origins permitted to prevent cross-site request forgery during development and staging.
