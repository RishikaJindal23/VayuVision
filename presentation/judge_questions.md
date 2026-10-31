# AirPulse — Likely Judge Questions & Winning Answers

This guide prepares the team for tough questions during the Round 1 hackathon evaluation. Every answer balances technical rigor, operational feasibility, and ethical awareness.

---

### Q1: "There are already apps like IQAir, SAFAR, and Google Weather. Why do we need AirPulse?"

**Suggested Winning Answer:**
> "That is a great question. Most existing platforms suffer from two major limitations:
> 1. **Lack of Hyperlocal Festive Forecasting:** IQAir and SAFAR primarily report *what already happened* or broad city-level averages (e.g. 'Delhi: 380'). They do not model the localized, 3-phase temporal dynamics of Diwali (Pre-Diwali accumulation, midnight firecracker surge, and post-Diwali inversion persistence) at a neighbourhood level.
> 2. **Lack of Actionable Decision Support:** Existing apps give users an alarming red number and stop there. AirPulse's **Personal Pollution Exposure Planner** translates forecast trends into actionable slot comparisons for walking, commuting, or sports, helping citizens shift their activities to windows that can reduce inhaled particulate exposure by 20% to 35%."

---

### Q2: "How can you predict firecracker pollution accurately when firecracker usage is illegal, irregular, and unmetered?"

**Suggested Winning Answer:**
> "You've pinpointed one of the hardest challenges in environmental modeling. Firecracker emissions are episodic human anomalies, not smooth natural cycles.
> Our methodology tackles this through a two-part strategy:
> 1. **Historical Episodic Baselining:** We analyze CPCB sensor spikes from past Diwali nights (2020–2024) across specific neighbourhoods to calculate localized 'festive surge multipliers' (e.g. dense residential pockets consistently spike 2.5x to 3.5x over baseline between 8 PM and 1 AM, while open airport zones show lower spikes).
> 2. **Atmospheric Entrapment Modeling:** What makes firecrackers devastating is not just the emission, but the weather condition trapping them. By ingesting boundary layer inversion height, ambient temperature drop, and surface wind velocity (<2 m/s), our model forecasts *how severely and how long* those firecracker emissions will remain trapped near the ground."

---

### Q3: "What is your Machine Learning model, and what accuracy score did you achieve?"

**Suggested Winning Answer:**
> "In Round 1, we deliberately refrained from claiming an invented '99% accuracy score' because claiming that on an unvalidated prototype would be dishonest.
> Our ML architecture is designed around time-series regression using **Random Forest and Gradient Boosting (GBR)** as our primary models, scaffolded in `ml/train.py`.
> Crucially, our evaluation protocol benchmarks the model against a **Persistence Baseline** ('tomorrow equals today') using **Mean Absolute Error (MAE)** and **Root Mean Squared Error (RMSE)**. If an ML model cannot beat the persistence baseline on unseen chronological test splits, it provides no genuine value. In our current prototype, we display clearly labeled demonstration forecast curves while the full training on multi-year CPCB data is scheduled for Round 2."

---

### Q4: "Is your Personal Exposure Planner giving medical advice? Isn't that dangerous?"

**Suggested Winning Answer:**
> "We have instituted strict ethical and legal boundaries: **AirPulse is an environmental awareness and activity-scheduling tool, NOT a medical diagnostic system.**
> - We do not diagnose asthma, COPD, or respiratory ailments.
> - We never prescribe or suggest changing medications or treatments.
> - We never claim any outdoor activity or location is '100% safe'.
> - We collect zero personal medical or health records.
> What we do provide is atmospheric exposure awareness: calculating the mathematical relationship between activity exertion levels (ventilation volume) and forecast ambient PM2.5 levels across morning, afternoon, and evening windows, along with practical non-clinical guidance like wearing certified N95 masks."

---

### Q5: "How will you get neighbourhood-level data if CPCB only has 40 stations in Delhi NCR?"

**Suggested Winning Answer:**
> "In Delhi NCR, CPCB and DPCC currently operate around 40 Continuous Ambient Air Quality Monitoring Stations (CAAQMS). While 40 stations provide reasonable coverage of major zones (e.g. Anand Vihar, Punjabi Bagh, RK Puram, Dwarka), there are gaps in between.
> For locations without a dedicated ground station, our architecture uses:
> 1. **Spatial Inverse Distance Weighting (IDW) & Kriging Interpolation** between adjacent ground stations, conditioned on local green cover and road density.
> 2. **Satellite AOD (Aerosol Optical Depth):** In our future scope, we plan to ingest high-resolution Sentinel-5P / MODIS satellite data.
> 3. **Honest System Transparency:** When a requested neighbourhood has insufficient data, our API returns an explicit 'Data Unavailable' response rather than fabricating random numbers."

---

### Q6: "Why did you choose FastAPI over Flask or Django?"

**Suggested Winning Answer:**
> "FastAPI was chosen for three key engineering reasons:
> 1. **Native Asynchronous Performance:** FastAPI is built on Starlette and ASGI, giving it NodeJS-like concurrent request throughput, which is essential for serving real-time forecast data to thousands of simultaneous users during peak Diwali evenings.
> 2. **Data Validation via Pydantic:** Pydantic models automatically validate incoming requests and outgoing forecast structures, catching malformed queries before they hit prediction routines.
> 3. **Automatic OpenAPI/Swagger Documentation:** FastAPI generates interactive API documentation out of the box (`/docs`), making backend integration and judge inspection effortless."

---

### Q7: "What is your business model or startup vision for AirPulse? How do you actually make a profit?"

**Suggested Winning Answer:**
> "We structured AirPulse as a sustainable B2B2C environmental intelligence startup with three clear revenue streams, ensuring our core citizen tool remains 100% free while enterprises fund the business:
> 1. **B2B CampusAir SaaS (Schools & Sports Academies):**
>    - Value Prop: Protects school children from toxic morning assembly exposure and automates WhatsApp advisory broadcasts to parents.
>    - Pricing: ₹2,000 – ₹5,000 / month per institution. With just 100 schools in Delhi NCR, this yields ₹2.5 Lakhs Monthly Recurring Revenue (MRR) (~₹30 Lakhs ARR).
> 2. **B2B Logistics FleetSafe API (Zomato, Swiggy, Blinkit, Zepto):**
>    - Value Prop: Protects delivery riders during peak festive delivery surges by routing them away from critical particulate choke-points and dynamically triggering N95 mask mandates.
>    - Pricing: ₹0.30 per routing query or ₹35,000 / month enterprise license per city hub.
> 3. **Contextual Clean Air Marketplace (Affiliate Commerce):**
>    - Value Prop: When neighbourhood AQI breaches 350+, users receive in-app recommendations for certified N95/FFP2 respirators and room-sized HEPA purifiers.
>    - Pricing: 8% to 12% affiliate commission from Amazon/Flipkart/D2C brands. During Diwali peak week, 10,000 orders generate ₹1.5L – ₹3L in high-margin passive cashflow.
> 4. **B2G Municipal Smart City Contracts:**
>    - Predictive routing for municipal anti-smog water sprinklers to wet dust before nocturnal inversion traps it."

---

### Q8: "What features are already working right now in your repository?"

**Suggested Winning Answer:**
> "In our Round 1 submission:
> - **Frontend (React 18 + Vite + Tailwind):** The full interactive dashboard, neighbourhood selector, current AQI overview, 3-phase Diwali forecast timeline with charts, neighbourhood comparison heatmap, smart alerts panel, and the Personal Exposure Planner UI are live.
> - **Backend (FastAPI):** All REST endpoints (`/api/health`, `/api/locations`, `/api/aqi/forecast`, `/api/aqi/comparison`, `/api/exposure-planner/evaluate`, `/api/alerts`) are functional, return structured Pydantic responses, and handle CORS.
> - **ML & Data Infrastructure:** The machine learning pipeline structure (`ml/train.py`, `ml/predict.py`) and data source schemas are fully established. Demonstration forecast curves are clearly tagged to ensure complete academic transparency."

---
*End of Judge Q&A Guide*
