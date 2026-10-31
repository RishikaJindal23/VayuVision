# AirPulse — Machine Learning Pipeline & Research Blueprint

## 1. Objective & Problem Formulation
The goal of the AirPulse machine learning component is to forecast neighbourhood-level air pollution—specifically particulate concentrations (PM2.5 and PM10) and the composite National Air Quality Index (NAQI)—across three critical temporal phases:
1. **Pre-Diwali Build-up (Days -3 to -1):** Regional crop-residue transit, festive commercial transport, and ambient temperature drop.
2. **Diwali Peak Surge (Diwali Night to Day +1):** Intense nocturnal firecracker emissions combined with shallow planetary boundary layer inversion.
3. **Post-Diwali Dispersion (Days +2 to +4):** Slow atmospheric evacuation under weak surface wind conditions.

---

## 2. Input Data Requirements

### A. Historical Continuous Ambient Observations (CPCB / CAAQMS)
- **Hourly PM2.5 & PM10 concentrations (µg/m³)**
- **Gaseous co-pollutants:** NO2, SO2, CO, Ozone (O3)
- Minimum history: 3 to 5 prior festival seasons (2019–2025) across representative urban micro-zones (choke-points, green corridors, residential pockets).

### B. High-Resolution Meteorological Indicators (IMD / OpenWeather / ERA5 Reanalysis)
- **Planetary Boundary Layer Height (PBLH):** Critical indicator of thermal inversion volume.
- **Surface Wind Velocity (m/s) & Direction (degrees):** Controls dispersion vs accumulation.
- **Ambient Temperature (°C) & Relative Humidity (%):** Drives secondary aerosol formation and photochemical reactions.
- **Atmospheric Ventilation Index:** Product of mixing height and wind speed.

### C. Festive Proxies & Temporal Features
- **Diwali Day Offset:** Categorical/integer distance relative to Diwali Night ($t_0$).
- **Diwali Night Hourly Indicator:** Binary flag for the critical 8:00 PM – 2:00 AM firecracker window.
- **Traffic Congestion Index:** Commercial and transit density proxies.

---

## 3. Data Cleaning, Preprocessing & Feature Engineering

1. **Temporal Imputation:** 
   - Linear interpolation for isolated sensor dropouts ($\le 2$ consecutive hours).
   - Spatial k-nearest neighbour imputation using adjacent CAAQMS stations for extended outages.
2. **Lagged Features:**
   - Rolling 6-hour, 12-hour, 24-hour, and 48-hour moving averages.
   - Exponential moving averages ($\alpha = 0.3$) to capture trend velocity.
   - 24-hour seasonal lag ($AQI_{t-24}$) capturing diurnal diurnal patterns.
3. **Atmospheric Stagnation Feature:**
   - Inverted ventilation ratio: $\text{Stagnation} = \frac{1}{\max(\text{WindSpeed}, 0.5) \times \text{MixingHeight}}$.

---

## 4. Modeling Strategy & Baseline Comparison

### A. The Persistence Baseline (Essential Benchmark)
In time-series modeling, a model must prove superiority over the **Persistence Baseline**:
$$\hat{Y}_{t+h} = Y_t$$
Or the **Seasonal Persistence Baseline**:
$$\hat{Y}_{t+h} = Y_{t+h - 24}$$
*If a proposed machine learning model cannot beat this baseline on unseen test splits, it offers zero genuine algorithmic utility.*

### B. Proposed Regressors
1. **Random Forest Regressor:** Handles non-linear feature interactions without overfitting; provides feature importance metrics.
2. **Gradient Boosting Regressor (LightGBM / XGBoost):** Optimizes asymmetric loss functions penalizing underestimation of extreme hazard spikes.
3. **Temporal Convolutional Networks (TCN) / LSTM (Round 2 Roadmap):** Captures multi-day sequence dependencies.

---

## 5. Evaluation Protocol & Scientific Rigor

### Evaluation Metrics
- **Mean Absolute Error (MAE):** Reflects average absolute deviation in AQI points.
- **Root Mean Squared Error (RMSE):** Penalizes extreme forecast misses during sudden spikes.
- **Peak Timing Accuracy ($\Delta t$):** Measures precision in predicting the exact hour of maximum nocturnal concentration.

### Train-Validation-Test Splitting
- **Strict Chronological Splitting:** K-Fold cross-validation is **strictly prohibited** in time-series forecasting due to temporal data leakage.
- Historical years 2019–2023 form the training/validation sets, while 2024 and 2025 festival episodes serve as out-of-sample test benchmarks.

---

## 6. Academic Transparency & Implementation Status

| Component | Status | Description |
| :--- | :--- | :--- |
| **Data Ingestion Scaffolding** | Implemented | Mock CPCB schema & data structures created |
| **Baseline Regressor Pipeline** | Implemented (`train.py`) | Runnable regression benchmark with MAE/RMSE calculation |
| **Inference Script** | Implemented (`predict.py`) | Multi-phase forecast generator with confidence bounds |
| **Full Historical Sensor Training** | Planned (Round 2) | Pending verification of multi-year CPCB API datasets |
| **Real-time Satellite AOD Integration** | Planned (Round 3) | Sentinel-5P TROPOMI data integration |

*Zero fabricated accuracy statistics: In Round 1, AirPulse operates with honest prototype demonstration models and clearly communicates ongoing research milestones.*
