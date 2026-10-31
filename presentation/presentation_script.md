# AirPulse — Presentation Script & Speaker Notes

**Project Title:** AirPulse: AI-Powered Diwali Air Quality Prediction  
**Tagline:** *Predict Pollution. Understand Exposure. Make Better Decisions.*  
**Target Duration:** 6 to 8 minutes (approx. 45–60 seconds per slide)  
**Format:** Natural English with conversational cues and Hinglish presentation tips.

---

## Presentation Delivery Tips for Student Teams

1. **Pacing:** Aim for a steady, confident pace (approx. 130–140 words per minute).
2. **Honesty as a Strength:** Hackathon judges immediately respect teams that clearly distinguish between *working prototype features* and *planned ML research components*. Never claim an unverified 99% accuracy score.
3. **Micro-Zone Storytelling:** Always anchor your pitch on the core reality that **city averages hide extreme local suffering**.
4. **Health Ethics:** Reiterate that AirPulse is an **exposure-awareness and activity-scheduling tool**, *not* a medical diagnostic or individual safety guarantee system.

---

## Slide-by-Slide Script

---

### Slide 1 — Title Slide
- **Slide Title:** AirPulse — AI-Powered Diwali Air Quality Prediction
- **Time Allocated:** 30–45 seconds
- **Key Takeaway for Judges:** The team is tackling a high-impact, seasonal environmental crisis with a clear focus on actionable neighbourhood-level decision support.

#### Spoken Script (English):
> "Good morning, respected judges and mentors. We are Team **[Your Team Name]**, and today we are excited to present **AirPulse: AI-Powered Diwali Air Quality Prediction**.
>
> Our philosophy is captured in our tagline: **'Predict Pollution. Understand Exposure. Make Better Decisions.'**
>
> During the festive season in Indian cities, citizens are inundated with terrifying pollution headlines and generic city-wide numbers. But numbers alone don't protect lungs—actionable foresight does. Over the next seven minutes, we will walk you through why city averages fail our neighbourhoods, how AirPulse transforms multi-source environmental data into actionable forecasts, our unique Personal Exposure Planner, and our engineering roadmap."

#### Hinglish Delivery Tip:
> *"Humara focus sirf ek number dikhana nahi hai, balki logo ko aisi actionable guidance dena hai jisse wo Diwali ke dangerous pollution hours se apni health ko protect kar sakein."*

---

### Slide 2 — Problem Statement: Beyond The City Average
- **Slide Title:** Problem Statement: Beyond The City Average
- **Time Allocated:** 50–60 seconds
- **Key Takeaway for Judges:** City-level AQI averages mask huge neighbourhood variations; the combination of firecrackers, winter inversion, and calm winds creates critical localized hotspots that citizens cannot anticipate.

#### Spoken Script (English):
> "Let us look at the fundamental problem we are solving.
>
> When a citizen opens a conventional weather app around Diwali, they typically see a single aggregate metric—for instance, *'Delhi AQI: 380 — Very Poor'*. But air pollution is not homogeneous across an entire metropolis. 
>
> In reality, simultaneously on Diwali night, an open green area like Lodhi Road or Dwarka might record an AQI of 240, while a dense traffic corridor and firecracker hotspot like Anand Vihar or Jahangirpuri crosses 490 into the hazardous severe-plus zone. That is a massive 250-point delta!
>
> During Diwali, three compounding factors occur: first, an intense nocturnal burst of fireworks; second, winter meteorological temperature inversion that traps particulates near ground level; and third, near-zero surface wind speeds that prevent dispersion for 48 to 72 hours.
>
> Existing platforms are purely reactive—they inform citizens what they already inhaled hours ago. Citizens, schools, asthmatic patients, and outdoor workers need predictive foresight at the neighbourhood level."

#### Hinglish Delivery Tip:
> *"City average 380 bolna bohot misleading hai. Ek locality me 240 ho sakta hai aur dusri me 490+. Logo ko pata hi nahi chalta ki unke specific area me pollution kab peak karega."*

---

### Slide 3 — Our Solution: AirPulse Environmental Intelligence
- **Slide Title:** Our Solution: AirPulse Environmental Intelligence
- **Time Allocated:** 50–60 seconds
- **Key Takeaway for Judges:** AirPulse uses a clean 4-step data-to-decision pipeline spanning ingestion, feature engineering, predictive modeling, and user empowerment.

#### Spoken Script (English):
> "To bridge this gap, we built **AirPulse**. Our solution is designed as a continuous 4-step pipeline that transforms raw environmental indicators into personal protective decisions.
>
> In **Step 1: Data Ingestion**, we ingest continuous historical air-quality observations from CPCB ground stations (PM2.5, PM10, NO2, CO), coupled with meteorological atmospheric data like boundary layer height, temperature, and wind speed, plus festive traffic patterns.
>
> In **Step 2: Processing & Feature Engineering**, we compute rolling temporal lag windows, ventilation indices, and localized firecracker surge anomalies.
>
> In **Step 3: Forecasting**, we architect a time-aware machine learning pipeline tailored around the three distinct phases of Diwali: the Pre-Diwali build-up, the Peak Diwali surge, and the Post-Diwali dispersion phase.
>
> And in **Step 4: Actionable Output**, our platform serves micro-zone forecasts, neighbourhood comparison heatmaps, and smart alerts that empower citizens to make practical scheduling choices."

---

### Slide 4 — Core Features: Granular Insights for Citizens
- **Slide Title:** Core Features: Granular Insights for Citizens
- **Time Allocated:** 50–60 seconds
- **Key Takeaway for Judges:** The platform features four dedicated capabilities: micro-zone forecasting, a 3-phase temporal timeline, cross-neighbourhood comparisons/heatmaps, and environmental insights with smart alerts.

#### Spoken Script (English):
> "Slide 4 shows the four pillars of our user experience:
>
> 1. **Neighbourhood-Level Forecasting:** Users select specific monitored zones—like Anand Vihar, Lodhi Road, or Rohini. Crucially, we clearly distinguish between *measured sensor ground truth* and *demonstration predictive forecasts*.
> 2. **3-Phase Diwali Timeline:** Instead of a single static number, we visualize the temporal curve across Pre-Diwali ambient accumulation, the Diwali Night surge, and the slow multi-day post-festival clearance.
> 3. **Neighbourhood Comparison & Heatmap:** Users can compare disparate zones side-by-side to understand relative air toxicity and locate safer micro-environments.
> 4. **Environmental Trend & Smart Alerts:** We correlate weather parameters like wind speed and humidity with particulate retention, and fire proactive smart alerts whenever a neighbourhood is projected to breach severe thresholds."

---

### Slide 5 — Unique Extra Feature: Personal Pollution Exposure Planner
- **Slide Title:** Unique Feature: Personal Pollution Exposure Planner
- **Time Allocated:** 60–75 seconds
- **Key Takeaway for Judges:** This is the core differentiator. It translates passive AQI numbers into active time-slot optimization, backed by a strict, responsible non-medical disclaimer.

#### Spoken Script (English):
> "Now, we would like to highlight our most distinctive innovation: the **Personal Pollution Exposure & Activity Planner**.
>
> Merely knowing an AQI score is 420 often causes paralysis: *'What should I actually do?'* Exposure is a function of particulate concentration multiplied by ventilation volume and time.
>
> With AirPulse, a user selects an intended activity—such as **Walking**, **Outdoor Sports**, **Daily Commuting**, or **Outdoor Social Events**. The user then selects a date, and our engine evaluates morning, afternoon, and evening forecast windows.
>
> As shown in our demonstration interface: a morning jog in Anand Vihar at 6:00 AM coincides with peak nocturnal inversion, exposing the runner to an AQI of 425. By contrast, at 1:30 PM, surface heating creates thermal turbulence and temporarily improves ventilation, lowering the forecast AQI to 295. Our planner recommends shifting the workout, resulting in an estimated 31% reduction in inhaled particulate exposure!
>
> **Most importantly, we take health governance very seriously:** AirPulse is an *environmental awareness and activity-scheduling tool*, **NOT a medical diagnostic or individual safety guarantee system**. We never diagnose asthma or lung conditions, we never advise altering medical prescriptions, and we collect zero sensitive patient records."

#### Hinglish Delivery Tip:
> *"Hum sirf number nahi dikhate, hum user ko batate hain: agar aap apna jogging time subah 6 baje se dopahar 1:30 baje shift karte hain, to aapka pollution exposure 30% tak kam ho sakta hai. Aur hum clearly disclaimer dete hain ki ye koi medical diagnosis nahi hai."*

---

### Slide 6 — System Architecture: Modular & Transparent Pipeline
- **Slide Title:** System Architecture: End-to-End Modular Pipeline
- **Time Allocated:** 50–60 seconds
- **Key Takeaway for Judges:** Clean, production-grade decoupled architecture (React + FastAPI + Python Data Pipeline) with complete academic honesty on current prototype status vs planned ML milestones.

#### Spoken Script (English):
> "Turning to our engineering architecture: we prioritized clean separation of concerns and high performance.
>
> At the presentation layer, our **React 18** client built with **Vite**, **Tailwind CSS**, and **Recharts** provides a responsive, dark environmental-tech dashboard.
>
> This communicates via REST with our **FastAPI** backend microservice in Python. FastAPI provides asynchronous request handling, OpenAPI auto-documentation, and strict Pydantic data validation schemas.
>
> Our backend coordinates with our data ingestion and preprocessing pipeline, handling missing sensor data and generating temporal lag features.
>
> For our machine learning layer, we have scaffolded a Scikit-learn regression pipeline. As reflected in our slide labels, our frontend dashboard, FastAPI endpoints, demonstration forecast engine, and exposure evaluator are **fully implemented and operational today**, while multi-year model training on live CPCB streams is our designated Round 2 deliverable."

---

### Slide 7 — Technology Stack & Scientific Feasibility
- **Slide Title:** Technology Stack & Scientific Feasibility
- **Time Allocated:** 50–60 seconds
- **Key Takeaway for Judges:** The stack is lightweight and maintainable; the ML validation methodology relies on standard metrics (MAE, RMSE) and benchmarks against a persistence baseline with zero fabricated metrics.

#### Spoken Script (English):
> "On Slide 7, we address engineering feasibility and scientific rigor.
>
> We chose React and FastAPI because they are modular, beginner-friendly, and production-tested. But more importantly, let us speak about our validation methodology.
>
> We have intentionally avoided claiming an invented '98.5% accuracy'. In air pollution forecasting, especially during irregular festive events, claiming high accuracy without extensive real-world testing is scientifically ungrounded.
>
> Our proposed evaluation protocol uses **chronological train-test splits**—preventing data leakage—evaluated via **Mean Absolute Error (MAE)** and **Root Mean Squared Error (RMSE)**.
>
> Furthermore, all models must be benchmarked against a **Persistence Baseline**—the hypothesis that tomorrow's AQI equals today's AQI. A model only delivers genuine machine learning value if it consistently outperforms this baseline. When neighbourhood sensors are missing, we use spatial interpolation rather than hallucinated data."

---

### Slide 8 — Impact & Future Scope: Environmental Intelligence
- **Slide Title:** Impact & Future Scope: Environmental Intelligence
- **Time Allocated:** 45–60 seconds
- **Key Takeaway for Judges:** AirPulse has immediate utility for citizens, schools, and outdoor event planners, with a clear roadmap toward a full-scale environmental intelligence startup.

#### Spoken Script (English):
> "To conclude, AirPulse is designed for tangible societal impact.
>
> In the short term, our platform helps vulnerable citizens, senior residents, parents of young children, schools, and sports academies make informed outdoor scheduling decisions during the most toxic week of the year.
>
> Looking ahead to our future scope and startup vision:
> 1. We plan to train advanced temporal models like Temporal Convolutional Networks and XGBoost on multi-year festival datasets.
> 2. We aim to integrate satellite aerosol optical depth from Sentinel-5P and low-cost hyperlocal sensor networks.
> 3. We will expand coverage beyond Delhi NCR across industrial cities in northern India.
> 4. We will deploy automated WhatsApp and push notification alerts for severe hourly threshold breaches.
>
> We believe clean air starts with clear awareness.
>
> **AirPulse — Predict Pollution. Understand Exposure. Make Better Decisions.**
>
> Thank you, judges. We are now open for your questions!"

---
*End of Presentation Script*
