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
  Info,
  Copy,
  Bot,
  Zap
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
  const [botApiKey, setBotApiKey] = useState('');
  const [autoOpenWa, setAutoOpenWa] = useState(true);
  const [dispatchStatus, setDispatchStatus] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [showPayload, setShowPayload] = useState(false);
  const [showBotHelp, setShowBotHelp] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeAlerts = alertsData?.alerts || [];

  const handleSendWhatsApp = async (e) => {
    if (e) e.preventDefault();
    setIsSending(true);
    setDispatchStatus(null);
    setCopied(false);

    try {
      const res = await sendWhatsAppDemo({
        phone_number: phone,
        location_id: waLocation,
        alert_type: alertType,
        bot_api_key: botApiKey
      });
      setDispatchStatus(res);

      // If user enabled auto-open and wa_direct_url is returned, launch WhatsApp
      if (autoOpenWa && res?.wa_direct_url) {
        window.open(res.wa_direct_url, '_blank');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const handleCopyMessage = () => {
    if (!dispatchStatus?.rendered_message) return;
    navigator.clipboard.writeText(dispatchStatus.rendered_message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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

        {/* Right Column: WhatsApp Early-Warning Simulator & Real Bot */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Real WhatsApp Alert & Bot Gateway
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Dispatch
            </span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              VayuVision delivers early warnings where citizens already are. Enter your phone number to dispatch the real formatted WhatsApp alert:
            </p>

            <form onSubmit={handleSendWhatsApp} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Citizen Mobile Number <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210 or +91 98765 43210"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-mono focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-colors"
                  required
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Tip: Apne phone number par real alert dekhne ke liye apna 10-digit number dalein.
                </span>
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
                    <option value="spike_warning">🚨 Severe Spike Warning</option>
                    <option value="clearing_window">🌤️ Lower Exposure Window</option>
                    <option value="daily_briefing">📋 24h Daily Briefing</option>
                  </select>
                </div>
              </div>

              {/* Bot Key Toggle (Optional for background automated delivery) */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-300 font-semibold text-[11px]">
                    <Bot className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Automated Bot Key (Optional)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowBotHelp(!showBotHelp)}
                    className="text-[10px] text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                  >
                    {showBotHelp ? 'Hide guide' : 'How to get free key?'}
                  </button>
                </div>

                <input
                  type="text"
                  value={botApiKey}
                  onChange={(e) => setBotApiKey(e.target.value)}
                  placeholder="Enter CallMeBot API Key (optional)"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white font-mono text-[11px] focus:border-cyan-500 outline-none"
                />

                {showBotHelp && (
                  <div className="text-[10px] text-slate-400 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 space-y-1">
                    <p className="font-semibold text-cyan-300">Free 30-Second Bot Activation:</p>
                    <ol className="list-decimal list-inside space-y-0.5">
                      <li>Apne WhatsApp se <b>+34 644 14 36 67</b> par message bhejein: <code className="text-emerald-400">I allow callmebot to send me messages</code></li>
                      <li>CallMeBot turant aapko ek API key reply karega.</li>
                      <li>Wo key yahan paste kar dein — messages background me automatic push honge!</li>
                    </ol>
                  </div>
                )}
              </div>

              {/* Checkbox: Auto Open WhatsApp */}
              <label className="flex items-center gap-2 cursor-pointer select-none text-[11px] text-slate-300">
                <input
                  type="checkbox"
                  checked={autoOpenWa}
                  onChange={(e) => setAutoOpenWa(e.target.checked)}
                  className="w-3.5 h-3.5 rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
                />
                <span>Direct WhatsApp Web / App auto-open karein on dispatch</span>
              </label>

              {/* Realistic WhatsApp Chat Preview Widget */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Live WhatsApp Message Preview
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (dispatchStatus?.wa_direct_url) {
                        window.open(dispatchStatus.wa_direct_url, '_blank');
                      } else {
                        handleSendWhatsApp(null);
                      }
                    }}
                    className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Open Preview in WhatsApp
                  </button>
                </div>
                
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

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                    <span>Formatting & Dispatching to WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Real WhatsApp Alert to Phone 🚀</span>
                  </>
                )}
              </button>
            </form>

            {/* Dispatch Result Feedback */}
            {dispatchStatus && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between text-emerald-300">
                  <span className="font-bold flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    {dispatchStatus.is_real_dispatch ? 'Real Bot Push Delivered!' : 'WhatsApp Alert Dispatched!'}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                    {dispatchStatus.status}
                  </span>
                </div>

                <p className="text-slate-300 text-xs">
                  {dispatchStatus.delivery_note}
                </p>

                {/* Big Direct 1-Click WhatsApp Open Button */}
                {dispatchStatus.wa_direct_url && (
                  <div className="pt-1 flex flex-col sm:flex-row gap-2">
                    <a
                      href={dispatchStatus.wa_direct_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-center"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Open in WhatsApp Web / App</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                    </button>
                  </div>
                )}

                <div className="pt-1">
                  <button
                    onClick={() => setShowPayload(!showPayload)}
                    className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <Code className="w-3 h-3" />
                    {showPayload ? 'Hide Meta Cloud API Payload' : 'Inspect Meta Cloud API Webhook Payload'}
                    {showPayload ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  {showPayload && (
                    <pre className="mt-2 bg-slate-950 p-2.5 rounded-lg text-[10px] text-slate-300 font-mono overflow-x-auto border border-slate-800">
                      {JSON.stringify(dispatchStatus.meta_cloud_api_payload_preview, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* Transparency Note */}
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <b>Real Dispatch Supported:</b> Clicking dispatch opens WhatsApp with the formatted alert ready to send. Optional automated background push supported via CallMeBot API.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
