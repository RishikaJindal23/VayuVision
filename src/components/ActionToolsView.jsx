import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  UserCheck, 
  GraduationCap, 
  Truck, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  RotateCcw,
  Layers,
  Wind,
  Info
} from 'lucide-react';
import { 
  evaluateExposurePlan, 
  evaluateInstitutionPlan, 
  fetchGovtSprinklerPlan,
  getAqiCategory 
} from '../services/api';

export default function ActionToolsView({ 
  locations, 
  selectedLocId 
}) {
  const [activeSubTab, setActiveSubTab] = useState('citizen'); // 'citizen', 'campus', 'govt'

  // Citizen Planner State
  const [citizenLoc, setCitizenLoc] = useState(selectedLocId || 'anand_vihar');
  const [activityType, setActivityType] = useState('Walking');
  const [activityDate, setActivityDate] = useState('2026-11-01');
  const [exposurePlan, setExposurePlan] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(false);

  // Campus Planner State
  const [campusName, setCampusName] = useState('Delhi Public School, Rohini');
  const [campusLoc, setCampusLoc] = useState('rohini');
  const [eventType, setEventType] = useState('Morning Assembly');
  const [timeSlot, setTimeSlot] = useState('08:00 AM – 09:30 AM');
  const [institutionPlan, setInstitutionPlan] = useState(null);
  const [loadingCampus, setLoadingCampus] = useState(false);

  // Govt Sprinkler State
  const [govtPlan, setGovtPlan] = useState(null);
  const [loadingGovt, setLoadingGovt] = useState(false);

  // Initial load
  useEffect(() => {
    runExposurePlan();
    runCampusPlan();
    loadGovtPlan();
  }, []);

  const runExposurePlan = async () => {
    setLoadingPlan(true);
    try {
      const res = await evaluateExposurePlan({
        location_id: citizenLoc,
        activity_type: activityType,
        activity_date: activityDate
      });
      setExposurePlan(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPlan(false);
    }
  };

  const runCampusPlan = async () => {
    setLoadingCampus(true);
    try {
      const res = await evaluateInstitutionPlan({
        campus_name: campusName,
        location_id: campusLoc,
        event_type: eventType,
        event_date: '2026-11-01',
        event_time_slot: timeSlot
      });
      setInstitutionPlan(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCampus(false);
    }
  };

  const loadGovtPlan = async () => {
    setLoadingGovt(true);
    try {
      const res = await fetchGovtSprinklerPlan();
      setGovtPlan(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingGovt(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-Tab Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            VayuVision Action Tools & Decision Engines
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Connecting predictive atmospheric science to actionable daily choices for citizens, institutions, and municipal agencies.
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveSubTab('citizen')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'citizen'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Citizen Planner</span>
          </button>
          <button
            onClick={() => setActiveSubTab('campus')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'campus'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>CampusAir</span>
          </button>
          <button
            onClick={() => setActiveSubTab('govt')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'govt'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Govt Sprinkler Loop</span>
          </button>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 1. CITIZEN EXPOSURE & ACTIVITY PLANNER */}
      {/* ==================================================== */}
      {activeSubTab === 'citizen' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Config Card */}
            <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-cyan-400" />
                Schedule Outdoor Activity
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Target Micro-Zone</label>
                  <select
                    value={citizenLoc}
                    onChange={(e) => setCitizenLoc(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium focus:border-cyan-500 outline-none"
                  >
                    {locations.map((l) => (
                      <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Activity Type</label>
                  <select
                    value={activityType}
                    onChange={(e) => setActivityType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium focus:border-cyan-500 outline-none"
                  >
                    <option value="Walking">Daily Walk & Jogging</option>
                    <option value="Outdoor Sports">Outdoor Athletic & Fitness</option>
                    <option value="Commuting">Daily Commute (Two-wheeler / Public)</option>
                    <option value="Outdoor Events">Festive Social & Outdoor Gathering</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Date</label>
                  <input
                    type="date"
                    value={activityDate}
                    onChange={(e) => setActivityDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:border-cyan-500 outline-none"
                  />
                </div>

                <button
                  onClick={runExposurePlan}
                  disabled={loadingPlan}
                  className="w-full mt-2 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Evaluate Inhaled Particulate Burden</span>
                </button>
              </div>

              {/* Highlights callout */}
              {exposurePlan && (
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-950 border border-emerald-500/30 text-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                    Calculated Health Benefit
                  </span>
                  <div className="text-2xl font-black text-emerald-400">
                    -{exposurePlan.estimated_exposure_reduction_pct}% Inhaled Smog
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    By shifting from early morning inversion hours to the midday thermal window, you avoid peak particulate accumulation trapped at breathing height.
                  </p>
                </div>
              )}
            </div>

            {/* Right Comparison Slots */}
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                Hourly Exposure Windows & Slot Evaluation
              </h3>

              {exposurePlan ? (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {exposurePlan.slots.map((slot, i) => {
                      const isRec = slot.recommended;
                      return (
                        <div
                          key={i}
                          className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${
                            isRec
                              ? 'border-emerald-500/60 bg-emerald-500/10 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                              : 'border-slate-800 bg-slate-900/80 opacity-90'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                {slot.slot_label}
                              </span>
                              {isRec && (
                                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                                  OPTIMAL
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-semibold text-white mt-1">{slot.time_window}</div>
                            <div className="mt-3 flex items-baseline gap-2">
                              <span className="text-2xl font-black text-white">{slot.forecast_aqi}</span>
                              <span className="text-xs text-slate-400">AQI ({slot.risk_level})</span>
                            </div>
                          </div>

                          <p className="text-[11px] text-slate-300 leading-normal border-t border-slate-800/80 pt-2.5">
                            {slot.details}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Practical Recommendations Card */}
                  <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      Practical Guidance for {activityType} in {exposurePlan.location_name}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      {exposurePlan.practical_suggestions.map((tip, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-300 leading-relaxed">
                          <span className="font-bold text-cyan-400 block mb-1">0{idx + 1}.</span>
                          {tip}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Medical Governance Notice */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
                    <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{exposurePlan.medical_disclaimer}</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 2. CAMPUSAIR INSTITUTIONAL EVENT PLANNER */}
      {/* ==================================================== */}
      {activeSubTab === 'campus' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Setup Card */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                CampusAir: Event Protocol Engine
              </h3>
              <p className="text-xs text-slate-400">
                Automated risk assessment for schools, colleges, and sports academies before student assemblies or sports meets.
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Educational Institution Name</label>
                  <input
                    type="text"
                    value={campusName}
                    onChange={(e) => setCampusName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Campus Micro-Zone</label>
                  <select
                    value={campusLoc}
                    onChange={(e) => setCampusLoc(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium focus:border-cyan-500 outline-none"
                  >
                    {locations.map((l) => (
                      <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Scheduled Event</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium focus:border-cyan-500 outline-none"
                    >
                      <option value="Morning Assembly">Morning Assembly</option>
                      <option value="Sports Tournament">Sports Tournament / Match</option>
                      <option value="Open Air Cultural Festival">Open Air Cultural Festival</option>
                      <option value="School Recess">Outdoor Lunch & Recess</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Scheduled Slot</label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium focus:border-cyan-500 outline-none"
                    >
                      <option value="08:00 AM – 09:30 AM">08:00 AM – 09:30 AM</option>
                      <option value="11:00 AM – 12:30 PM">11:00 AM – 12:30 PM</option>
                      <option value="01:30 PM – 03:00 PM">01:30 PM – 03:00 PM</option>
                      <option value="05:30 PM – 07:00 PM">05:30 PM – 07:00 PM</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={runCampusPlan}
                  disabled={loadingCampus}
                  className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Campus Safety Advisory</span>
                </button>
              </div>
            </div>

            {/* Right Verdict Display */}
            <div className="lg:col-span-7 space-y-4">
              {institutionPlan && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {institutionPlan.campus_name}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-0.5">
                        {institutionPlan.event_type} ({timeSlot})
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Forecast AQI</span>
                        <span className="text-xl font-black text-white">{institutionPlan.projected_aqi}</span>
                      </div>
                      <div 
                        className="px-3.5 py-2 rounded-xl font-black text-xs uppercase tracking-wider text-white shadow-lg"
                        style={{ backgroundColor: institutionPlan.verdict_color }}
                      >
                        {institutionPlan.verdict}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {institutionPlan.risk_summary}
                  </p>

                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      Standard Safety & Operating Protocols:
                    </h4>
                    <div className="space-y-2 text-xs">
                      {institutionPlan.protocol_steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{institutionPlan.medical_disclaimer}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 3. GOVT ANTI-SMOG SPRINKLER CLOSED-LOOP */}
      {/* ==================================================== */}
      {activeSubTab === 'govt' && (
        <div className="space-y-6">
          {/* Closed Loop Visual Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0c1b2b] to-slate-900 border border-cyan-500/30 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                  Municipal Intervention Closed Loop
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  VayuVision MuniPulse: Hotspot Sprinkler & Smog Gun Dispatch
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                DPCC & MCD Autonomous Workflow
              </span>
            </div>

            {/* 5-Step Visual Loop */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-center text-xs">
              {[
                { step: "1. Detect", title: "ML Hotspots", desc: "Predicts severe surges 4h ahead" },
                { step: "2. Suggest", title: "Route Planning", desc: "Calculates optimal mist corridors" },
                { step: "3. Approve", title: "DPCC Sign-off", desc: "Digital verification dispatch" },
                { step: "4. Dispatch", title: "Fleet En Route", desc: "Real-time truck telemetry" },
                { step: "5. Re-measure", title: "Verify Impact", desc: "18-22% PM drop validated" }
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-black text-cyan-400 block">{item.step}</span>
                  <div className="font-bold text-white text-xs">{item.title}</div>
                  <span className="text-[10px] text-slate-400 block">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Hotspot Fleet Assignments */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Truck className="w-4 h-4 text-cyan-400" />
              Active Target Hotspots & Dispatched Fleet Corridors
            </h3>

            {govtPlan?.hotspots_detected?.map((hs) => (
              <div key={hs.hotspot_id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/60 border border-rose-800/40 px-2 py-0.5 rounded">
                        Hotspot #{hs.rank}
                      </span>
                      <h4 className="text-base font-bold text-white">{hs.zone_name}</h4>
                    </div>
                    <span className="text-xs text-slate-400 mt-1 block">
                      Corridor: <b>{hs.route_corridor}</b>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right text-xs">
                      <span className="text-slate-400 block">Current vs Peak</span>
                      <span className="font-bold text-white">{hs.current_aqi} &rarr; <span className="text-rose-400">{hs.projected_peak_aqi} AQI</span></span>
                    </div>
                    <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/15 border border-emerald-500/40 text-emerald-300">
                      {hs.approval_status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Assigned Fleet Units</span>
                    <div className="font-semibold text-white mt-1 space-y-1">
                      {hs.recommended_fleet.map((f, fi) => (
                        <div key={fi} className="truncate">
                          • {f.unit_id} ({f.capacity})
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Deployment Timing</span>
                    <span className="font-bold text-cyan-300 mt-1 block">{hs.trigger_time}</span>
                    <span className="text-[10px] text-slate-400">Pre-inversion atmospheric dampening</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Projected Particulate Drop</span>
                    <span className="font-bold text-emerald-400 text-base mt-0.5 block">
                      -{hs.estimated_particulate_reduction_pct}% PM Concentrations
                    </span>
                    <span className="text-[10px] text-slate-400">Re-measure Target: ~{hs.remeasure_target_aqi} AQI</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
