import React from 'react';
import { 
  Info, 
  Target, 
  Layers, 
  Database, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  TrendingUp, 
  ExternalLink,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Building,
  Smartphone,
  Cpu
} from 'lucide-react';

export default function AboutPitchView() {
  const teamMembers = [
    { name: "Rishika Jindal", role: "AI/ML & Data Engineering" },
    { name: "Navpreet Kaur", role: "Full-Stack Development & Architecture" },
    { name: "Yashika Bansal", role: "Environmental Research & Analytics" },
    { name: "Krishu Duggal", role: "UI/UX Design & Frontend Systems" },
  ];

  const dataSources = [
    {
      source: "CPCB CAAQMS",
      type: "Official Government Stations",
      status: "Integrated Ground Truth",
      details: "Continuous Ambient Air Quality Monitoring Station ground sensor readings for PM2.5, PM10, NO2, SO2, CO, O3.",
      statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
    },
    {
      source: "Open-Meteo API",
      type: "Atmospheric & Weather Telemetry",
      status: "Integrated Live Stream",
      details: "Hourly surface temperature, boundary layer height, relative humidity, wind speed, and nocturnal cooling index.",
      statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
    },
    {
      source: "OpenAQ Network",
      type: "Open Sensor Interoperability",
      status: "Standard Schema Mapped",
      details: "Cross-comparison with international low-cost sensor nodes and community air monitors.",
      statusColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10"
    },
    {
      source: "OpenStreetMap & CARTO",
      type: "Spatial Geography & Road Density",
      status: "Integrated Cartography",
      details: "High-contrast dark geospatial tiles and arterial highway coordinate layers.",
      statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
    }
  ];

  const businessTiers = [
    {
      tier: "Citizens & Vulnerable Families",
      price: "100% Free Public Good",
      model: "WhatsApp Early Warnings",
      desc: "Instant proactive alerts when forecasted AQI breaches hazardous levels; zero app download friction.",
      icon: Smartphone,
      color: "border-emerald-500/40 bg-emerald-500/5 text-emerald-300"
    },
    {
      tier: "CampusAir (Schools & Academies)",
      price: "₹2,500 – ₹5,000 / month",
      model: "B2B Educational SaaS",
      desc: "Morning assembly & sports rescheduling advisories with automated WhatsApp broadcast to parents.",
      icon: Building,
      color: "border-cyan-500/40 bg-cyan-500/5 text-cyan-300"
    },
    {
      tier: "FleetSafe Logistics API",
      price: "₹0.30 / query or Subscriptions",
      model: "B2B REST API for Logistics",
      desc: "Dynamic routing for Zomato, Swiggy, Blinkit fleets to bypass toxic pollution choke-points.",
      icon: Cpu,
      color: "border-blue-500/40 bg-blue-500/5 text-blue-300"
    },
    {
      tier: "MuniPulse (Smart Cities)",
      price: "Annual Municipal Contracts",
      model: "B2G Smart Governance",
      desc: "Closed-loop detection & route planning for DPCC / MCD anti-smog water sprinklers.",
      icon: Award,
      color: "border-purple-500/40 bg-purple-500/5 text-purple-300"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0a1526] to-slate-900 border border-cyan-500/30 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
            Hackathon Round 2: MVP Prototype & Pitch
          </span>
          <span className="text-xs font-bold text-slate-400">
            Team CodeStorms
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            VayuVision AI — <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Predict. Prepare. Protect.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            AI-powered environmental intelligence: neighbourhood-level air pollution forecasted 24 to 72 hours before, during, and after Diwali to convert retrospective panic into proactive decision making.
          </p>
        </div>

        {/* Team Credits Strip */}
        <div className="pt-4 border-t border-slate-800/80">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
            Team CodeStorms Members
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {teamMembers.map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="font-bold text-white block">{m.name}</span>
                <span className="text-[11px] text-cyan-400 block mt-0.5">{m.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Idea: Problem vs Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-rose-500/30 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 text-sm font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            The Core Problem
          </div>
          <h3 className="text-lg font-bold text-white">
            Diwali pushes air quality from poor to severe within hours — but city-wide tools report after the damage is done.
          </h3>
          <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">•</span>
              <span><b>City-Wide Averages Mask Realities:</b> While Lodhi Road registers 210 AQI, Anand Vihar or Wazirpur crosses 490+ (Severe+). Citizens are left uninformed about their specific street canyon.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">•</span>
              <span><b>Retrospective Monitoring:</b> Dashboards tell you what you breathed 2 hours ago. When fireworks erupt at 9 PM, citizens receive warnings the next morning.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-400 font-bold">•</span>
              <span><b>The Decision Void:</b> Citizens, school principals, and municipal authorities lack tools that recommend <i>when</i> to shift events or schedule sprinklers.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            The VayuVision Solution
          </div>
          <h3 className="text-lg font-bold text-white">
            Predict AQI and pollutant spikes 24 to 72 hours ahead for each locality, then connect forecasts directly to action.
          </h3>
          <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><b>Hyperlocal 24–72h Forecasting:</b> Multi-horizon ML model integrating diurnal boundary-layer inversion, surface wind stagnation, and pyrotechnic proxies.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><b>Pollution Risk Heatmap:</b> Interactive Leaflet cartography visually highlighting micro-zone risk disparities and severe hotspots.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><b>Direct WhatsApp Early Warnings:</b> Pushing proactive notifications to citizens on WhatsApp where they already are.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span><b>Action Decision Engines:</b> Personal Exposure Planner (-32% smog reduction window), CampusAir event decision engine, and Govt Sprinkler Loop.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Technical Approach & System Architecture (Matching Slide) */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Architecture Specification</span>
          <h3 className="text-lg font-bold text-white mt-1">
            End-to-End Technical Approach & Data Pipeline
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Collect &rarr; Clean & Feature Engineer &rarr; Predict &rarr; Map & Evaluate &rarr; Alert.
          </p>
        </div>

        {/* Visual Architecture Flow Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Data Sources */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">1. Data Sources</div>
            <div className="space-y-1.5 font-medium text-slate-200">
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800">Govt AQI Stations (CPCB)</div>
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800">Weather API (Open-Meteo)</div>
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800">Satellite / IoT Sensor Grids</div>
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800">OpenStreetMap Cartography</div>
            </div>
          </div>

          {/* Backend Ingestion & Processing */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-teal-400">2. Backend Engine</div>
            <div className="space-y-1.5 font-medium text-slate-200">
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800">Ingestion (FastAPI / REST)</div>
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800">Feature Pipeline (Lags & Inversion)</div>
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800">ML Forecast Regressor (24-72h)</div>
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800">Risk Classifier & Heatmap Grids</div>
            </div>
          </div>

          {/* Modules */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400">3. Functional Modules</div>
            <div className="space-y-1.5 font-medium text-slate-200">
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800">Alert Engine (WhatsApp Cloud API)</div>
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800">Govt Module (Hotspot & Sprinklers)</div>
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800">CampusAir (Go / Caution / Reschedule)</div>
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800">Exposure Planner (-32% Slot Shift)</div>
            </div>
          </div>

          {/* Users */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">4. Target Stakeholders</div>
            <div className="space-y-1.5 font-medium text-slate-200">
              <div className="p-2 rounded bg-emerald-950/30 border border-emerald-800/40 text-emerald-200">Citizens on WhatsApp</div>
              <div className="p-2 rounded bg-cyan-950/30 border border-cyan-800/40 text-cyan-200">Government Heatmap & Fleet</div>
              <div className="p-2 rounded bg-blue-950/30 border border-blue-800/40 text-blue-200">Schools & Event Planners</div>
              <div className="p-2 rounded bg-purple-950/30 border border-purple-800/40 text-purple-200">Delivery Logistics Fleets</div>
            </div>
          </div>
        </div>

        {/* Govt Closed Loop Box from slide */}
        <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/20 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="font-bold text-cyan-400">Government Closed-Loop:</span>
          <span className="text-slate-300 font-medium">
            Detect &rarr; Suggest &rarr; Approve &rarr; Dispatch Sprinklers &rarr; Re-measure AQI
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold">18% – 25% PM Drop Target</span>
        </div>
      </div>

      {/* Data Sources Status Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" />
          Data Sources & Integration Status
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dataSources.map((ds, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">{ds.source}</h4>
                  <span className="text-slate-400 text-[11px]">{ds.type}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${ds.statusColor}`}>
                  {ds.status}
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed pt-1">
                {ds.details}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainable Viability & Business Model */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-cyan-400" />
          Viability, Feasibility & Monetization Strategy
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {businessTiers.map((bt, idx) => {
            const Icon = bt.icon;
            return (
              <div key={idx} className={`p-4 rounded-xl border ${bt.color} flex flex-col justify-between space-y-3`}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-4 h-4 opacity-90" />
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{bt.model}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{bt.tier}</h4>
                  <div className="text-xs font-mono font-bold mt-1 text-slate-200">{bt.price}</div>
                </div>
                <p className="text-[11px] text-slate-300 leading-normal border-t border-slate-800/80 pt-2">
                  {bt.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Limitations & Future Roadmap */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          Honest Technical Disclosures & Round 3 Roadmap
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="font-bold text-rose-400 block text-xs">Current MVP Scope & Limitations</span>
            <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
              <li>Sensors are clustered around select government stations; intermediate street-level values are statistical dispersion models.</li>
              <li>Atmospheric firecracker emission intensity varies with seasonal cracker enforcement.</li>
              <li>WhatsApp alerts in this prototype run in modular interactive simulation mode without carrier billing.</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="font-bold text-cyan-400 block text-xs">Round 3 & Production Roadmap</span>
            <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
              <li>Ingest INSAT-3D and Sentinel-5P satellite aerosol optical depth (AOD) feeds.</li>
              <li>Expand from Delhi NCR MVP to Mumbai, Kolkata, Lucknow, and Chandigarh.</li>
              <li>Complete production deployment of Meta Verified Business Cloud API with template approvals.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
