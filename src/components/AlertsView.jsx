import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  MessageSquare, 
  ShieldAlert, 
  Send, 
  CheckCheck, 
  SlidersHorizontal, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Code, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info
} from 'lucide-react';
import { sendWhatsAppDemo } from '../services/api';

export default function AlertsView({ 
  alertsData, 
  loading, 
  threshold, 
  setThreshold, 
  locations, 
  selectedLocId 
}) {
  const [phone, setPhone] = useState('+91 98765 43210');
  const [waLocation, setWaLocation] = useState(selectedLocId || 'anand_vihar');
  const [alertType, setAlertType] = useState('spike_warning');
  const [dispatchStatus, setDispatchStatus] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [showPayload, setShowPayload] = useState(false);

  const activeAlerts = alertsData?.alerts || [];

  const handleSendWhatsApp = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setDispatchStatus(null);

    try {
      const res = await sendWhatsAppDemo({
        phone_number: phone,
        location_id: waLocation,
        alert_type: alertType
      });
      setDispatchStatus(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const selectedLocObj = locations.find(l => l.id === waLocation) || locations[0];

  // Dynamic preview text for WhatsApp bubble
  const getPreviewText = () => {
    const locName = selectedLocObj?.name || 'Anand Vihar';
    const peak = Math.min(500, (selectedLocObj?.baseline_aqi || 345) + 145);

    if (alertType === 'spike_warning') {
      return (
        <>
          <p className="font-bold text-emerald-400">🚨 VAYUVISION AI: SEVERE POLLUTION SPIKE ALERT</p>
          <p className="mt-2">📍 <b>Location:</b> {locName}</p>
          <p>⚠️ <b>Predicted Peak AQI:</b> {peak} (Severe+ Hazard)</p>
          <p>⏰ <b>Critical Window:</b> Tonight, 8:00 PM – Tomorrow 3:30 AM</p>
          <p className="mt-2 text-slate-300">🌬️ <b>Cause:</b> Intense firecracker emissions trapped under nocturnal surface temperature inversion.</p>
          <p className="mt-2 font-semibold">🛡️ Recommended Precaution:</p>
          <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
            <li>Stay indoors with doors & windows tightly sealed.</li>
            <li>Run HEPA purifiers in bedrooms.</li>
            <li>Wear certified N95 respirators if transit is unavoidable.</li>
          </ul>
          <p className="mt-2 text-[10px] text-slate-400 italic">Reply STOP to mute | VayuVision AI</p>
        </>
      );
    } else if (alertType === 'clearing_window') {
      return (
        <>
          <p className="font-bold text-cyan-400">🌤️ VAYUVISION AI: LOWER EXPOSURE WINDOW</p>
          <p className="mt-2">📍 <b>Location:</b> {locName}</p>
          <p>📊 <b>Estimated AQI:</b> 260 (Poor vs Nighttime 475)</p>
          <p>⏰ <b>Optimal Slot:</b> Today, 1:00 PM – 3:30 PM</p>
          <p className="mt-2 text-slate-300">💡 <b>Action:</b> Best 2.5-hour window for essential errands or transit. Particulate exposure is reduced by ~35% due to midday thermal mixing.</p>
          <p className="mt-2 text-[10px] text-slate-400 italic">VayuVision AI - Predict. Prepare. Protect.</p>
        </>
      );
    } else {
      return (
        <>
          <p className="font-bold text-amber-400">📋 VAYUVISION AI: 24-HOUR AIR QUALITY BRIEFING</p>
          <p className="mt-2">📍 <b>Location:</b> {locName}</p>
          <p>📈 <b>Projected Range:</b> 250 – 485 AQI</p>
          <p>🎯 <b>Worst Hour:</b> 1:00 AM (485 AQI - Severe+)</p>
          <p>🌟 <b>Best Hour:</b> 2:00 PM (250 AQI - Poor)</p>
          <p className="mt-2 text-slate-300">Check full interactive heatmap at VayuVision Dashboard.</p>
        </>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Configurable Alert Threshold Control Panel */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900 to-[#0d1629] border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Configurable Early-Warning Threshold</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Adjust the AQI trigger point to filter automated warnings when neighbourhood predictions exceed your risk tolerance.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Threshold Trigger:</span>
                <span className="font-black text-cyan-300 font-mono text-sm ml-2">{threshold} AQI</span>
              </div>
              <input
                type="range"
                min="200"
                max="450"
                step="25"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-48 sm:w-64 accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>200 (Poor)</span>
                <span>350 (Very Poor)</span>
                <span>450 (Hazardous)</span>
              </div>
            </div>

            <div className="border-l border-slate-800 pl-4 text-center">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Active Alerts</span>
              <span className="text-2xl font-black text-rose-400">{activeAlerts.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: In-App Active Alerts Feed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
              <Bell className="w-4 h-4 text-cyan-400" />
              Active Early-Warning Alerts ({activeAlerts.length})
            </h3>
            <span className="text-xs text-slate-400">Triggered at &ge; {threshold} AQI</span>
          </div>

          {activeAlerts.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-8 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">No Active Alerts Above {threshold} AQI</h4>
              <p className="text-xs text-slate-400">All monitored micro-zones are currently projected within your safety threshold.</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {activeAlerts.map((alt) => {
                const isCritical = alt.severity === 'CRITICAL';
                const isHigh = alt.severity === 'HIGH';

                let borderCls = 'border-amber-500/30 bg-amber-500/5';
                let badgeCls = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
                if (isCritical) {
                  borderCls = 'border-rose-500/40 bg-rose-500/5';
                  badgeCls = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
                } else if (isHigh) {
                  borderCls = 'border-orange-500/40 bg-orange-500/5';
                  badgeCls = 'bg-orange-500/20 text-orange-300 border-orange-500/40';
                }

                return (
                  <div key={alt.id} className={`p-4 rounded-xl border ${borderCls} space-y-3 shadow-md`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border uppercase tracking-wider ${badgeCls}`}>
                            {alt.severity} ALERT
                          </span>
                          <span className="text-xs font-mono text-slate-400">{alt.id}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1.5">{alt.location_name}</h4>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-lg font-black text-white">{alt.predicted_peak_aqi}</span>
                        <span className="text-xs text-slate-400 block">{alt.category}</span>
                      </div>
                    </div>

                    <div className="text-xs space-y-1.5 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="font-semibold">Time Window: </span>
                        <span>{alt.time_window}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span className="font-semibold">Primary Factor: </span>
                        <span>{alt.primary_cause}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      {alt.warning_message}
                    </p>

                    <div className="text-[11px] text-cyan-300 bg-cyan-950/30 p-2.5 rounded-lg border border-cyan-800/30">
                      <span className="font-bold">Suggested Action: </span>
                      {alt.suggested_action}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: WhatsApp Early-Warning Simulator */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              WhatsApp Early-Warning Simulator
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              Modular Demo Flow
            </span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              VayuVision delivers early warnings where citizens already are. Test the automated WhatsApp Cloud alert formatting and notification flow:
            </p>

            <form onSubmit={handleSendWhatsApp} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Citizen Mobile Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-mono focus:border-emerald-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Target Micro-Zone</label>
                  <select
                    value={waLocation}
                    onChange={(e) => setWaLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium focus:border-emerald-500 outline-none truncate"
                  >
                    {locations.map((l) => (
                      <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Alert Template</label>
                  <select
                    value={alertType}
                    onChange={(e) => setAlertType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium focus:border-emerald-500 outline-none truncate"
                  >
                    <option value="spike_warning">Severe Spike Warning</option>
                    <option value="clearing_window">Lower Exposure Window</option>
                    <option value="daily_briefing">24h Daily Briefing</option>
                  </select>
                </div>
              </div>

              {/* Realistic WhatsApp Chat Preview Widget */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Live WhatsApp Message Preview
                </span>
                
                <div className="bg-[#0b141a] border border-[#222e35] rounded-xl p-3.5 relative overflow-hidden shadow-inner">
                  {/* WhatsApp chat bubble */}
                  <div className="bg-[#005c4b] text-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-xs shadow-md space-y-1.5 max-w-[95%]">
                    {getPreviewText()}
                    <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-200 mt-1">
                      <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dispatch Action Button */}
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSending ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                    <span>Formatting & Simulating Dispatch...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Simulate WhatsApp Alert Dispatch</span>
                  </>
                )}
              </button>
            </form>

            {/* Dispatch Result Feedback */}
            {dispatchStatus && (
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs space-y-2">
                <div className="flex items-center justify-between text-emerald-300">
                  <span className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Simulated Dispatch Successful
                  </span>
                  <span className="font-mono text-[11px] text-emerald-400 font-semibold">{dispatchStatus.status}</span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  Alert payload generated for <b>{dispatchStatus.recipient}</b> using template <code>{dispatchStatus.template_name}</code>.
                </p>

                <button
                  onClick={() => setShowPayload(!showPayload)}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold pt-1"
                >
                  <Code className="w-3 h-3" />
                  {showPayload ? 'Hide Meta Cloud API Payload' : 'Inspect Meta Cloud API Payload'}
                  {showPayload ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                {showPayload && (
                  <pre className="bg-slate-950 p-2.5 rounded-lg text-[10px] text-slate-300 font-mono overflow-x-auto border border-slate-800">
                    {JSON.stringify(dispatchStatus.meta_cloud_api_payload_preview, null, 2)}
                  </pre>
                )}
              </div>
            )}

            {/* Transparency Note */}
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <b>Demo Transparency:</b> Demonstrates the complete WhatsApp Cloud API webhook data flow without charging unverified SMS/WhatsApp carrier gateways during evaluation.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
