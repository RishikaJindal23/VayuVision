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
  Zap,
  Share2,
  Users,
  School,
  HeartPulse,
  Building2,
  Check,
  Crown,
  ShieldCheck,
  FileText,
  Radio
} from 'lucide-react';
import { sendWhatsAppDemo, sendAdminBroadcast } from '../services/api';

export default function AlertsView({ 
  alertsData, 
  loading, 
  threshold, 
  setThreshold, 
  locations, 
  selectedLocId 
}) {
  const [phone, setPhone] = useState('9876543210');
  const [waLocation, setWaLocation] = useState(selectedLocId || 'anand_vihar');
  const [alertType, setAlertType] = useState('spike_warning');
  const [botApiKey, setBotApiKey] = useState('');
  const [autoOpenWa, setAutoOpenWa] = useState(true);
  const [dispatchStatus, setDispatchStatus] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [showPayload, setShowPayload] = useState(false);
  const [showBotHelp, setShowBotHelp] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeUseCase, setActiveUseCase] = useState(0);

  // Admin AI Bot Mode State
  const [activeMode, setActiveMode] = useState('citizen'); // 'citizen' or 'admin'
  const [adminName, setAdminName] = useState('Dr. R. K. Sharma (DPCC Nodal Officer)');
  const [adminRole, setAdminRole] = useState('dpcc_official');
  const [adminCustomNote, setAdminCustomNote] = useState('');
  const [adminDispatchStatus, setAdminDispatchStatus] = useState(null);
  const [isAdminSending, setIsAdminSending] = useState(false);

  const activeAlerts = alertsData?.alerts || [];

  // Extract clean digits
  const rawDigits = (phone || '').replace(/\D/g, '');
  const cleanPhone = rawDigits.startsWith('91') && rawDigits.length === 12 
    ? rawDigits.slice(2) 
    : (rawDigits.length === 10 ? rawDigits : rawDigits);
  const isValidNumber = cleanPhone.length === 10;

  const selectedLocObj = locations.find(l => l.id === waLocation) || locations[0];

  const getPlainMessageText = () => {
    const locName = selectedLocObj?.name || 'Anand Vihar';
    const peak = Math.min(500, (selectedLocObj?.baseline_aqi || 345) + 145);

    if (alertType === 'spike_warning') {
      return `🚨 *VAYUVISION AI: SEVERE POLLUTION SPIKE ALERT*\n\n📍 *Location:* ${locName}\n⚠️ *Predicted Peak AQI:* ${peak} (Severe+ Hazard)\n⏰ *Critical Window:* Tonight, 8:00 PM – Tomorrow 3:30 AM\n\n🌬️ *Cause:* Pyrotechnic smoke trapped beneath nocturnal boundary layer inversion.\n\n🛡️ *Action Plan:*\n• Stay indoors with doors & windows tightly sealed.\n• Run HEPA air purifiers in sleep quarters.\n• Wear certified N95 respirators if transit is unavoidable.\n\n_VayuVision AI - Predict. Prepare. Protect._`;
    } else if (alertType === 'clearing_window') {
      return `🌤️ *VAYUVISION AI: LOWER EXPOSURE WINDOW IDENTIFIED*\n\n📍 *Location:* ${locName}\n📊 *Estimated AQI:* 260 (Poor vs Nighttime Severe 470)\n⏰ *Optimal Slot:* Today, 1:00 PM – 3:30 PM\n\n💡 *Action:* Best 2.5h window for essential errands. Particulate exposure is reduced by ~35% due to midday thermal mixing.\n\n_VayuVision AI - Predict. Prepare. Protect._`;
    } else {
      return `📋 *VAYUVISION AI: 24-HOUR AIR QUALITY BRIEFING*\n\n📍 *Location:* ${locName}\n📈 *24h Projected Range:* 250 - 485 AQI\n🎯 *Worst Expected Hour:* 1:00 AM (485 AQI - Severe+)\n🌟 *Best Expected Hour:* 2:00 PM (250 AQI - Poor)\n\n_Check full interactive heatmap at VayuVision Dashboard._`;
    }
  };

  const handleSendWhatsApp = async (e) => {
    if (e) e.preventDefault();
    setIsSending(true);
    setDispatchStatus(null);
    setCopied(false);

    try {
      const res = await sendWhatsAppDemo({
        phone_number: cleanPhone,
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

  const handleShareToGroup = () => {
    const rawMsg = dispatchStatus?.rendered_message || getPlainMessageText();
    const groupUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(rawMsg)}`;
    window.open(groupUrl, '_blank');
  };

  const handleCopyMessage = () => {
    const textToCopy = dispatchStatus?.rendered_message || getPlainMessageText();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAdminBroadcast = async (e) => {
    if (e) e.preventDefault();
    setIsAdminSending(true);
    setAdminDispatchStatus(null);
    try {
      const res = await sendAdminBroadcast({
        admin_name: adminName,
        admin_role: adminRole,
        target_zone: waLocation,
        urgency_tier: adminRole === 'dpcc_official' ? 'grap_iv' : 'advisory',
        language: 'hinglish',
        custom_note: adminCustomNote,
        test_phone_number: cleanPhone
      });
      setAdminDispatchStatus(res);
      if (autoOpenWa && res?.wa_direct_url) {
        window.open(res.wa_direct_url, '_blank');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdminSending(false);
    }
  };

  const getAdminPreviewText = () => {
    const locName = selectedLocObj?.name || 'Anand Vihar';
    const peak = Math.min(500, (selectedLocObj?.baseline_aqi || 345) + 145);

    if (adminRole === 'school_principal') {
      return (
        <>
          <p className="font-bold text-cyan-400">🏫 CAMPUSAIR INSTITUTIONAL STUDENT HEALTH NOTICE</p>
          <p className="mt-1.5">📍 <b>Campus Zone:</b> {locName}</p>
          <p>📊 <b>Forecast AQI:</b> {peak} (Severe Hazard)</p>
          <p>⏰ <b>Effective:</b> Tomorrow 06:30 AM – 02:00 PM</p>
          <p className="mt-2 font-semibold">⚠️ Mandatory Campus Protocols:</p>
          <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
            <li>Outdoor morning assemblies & sports CANCELLED.</li>
            <li>All classes shifted to indoor air-purified blocks.</li>
            <li>Mandatory N95 masks while boarding school buses.</li>
          </ul>
          {adminCustomNote && <p className="mt-1.5 text-amber-300">📌 <b>Principal Note:</b> {adminCustomNote}</p>}
          <p className="mt-2 text-[10px] text-slate-400 italic">Authorized by: {adminName} | CampusAir AI</p>
        </>
      );
    } else if (adminRole === 'rwa_secretary') {
      return (
        <>
          <p className="font-bold text-amber-400">🏢 RESIDENTS WELFARE ASSOCIATION EMERGENCY ADVISORY</p>
          <p className="mt-1.5">📍 <b>Society Area:</b> {locName}</p>
          <p>⚠️ <b>Expected Midnight Surge:</b> {peak} AQI (Inversion Trap)</p>
          <p className="mt-2 font-semibold">🛡️ Community Directives:</p>
          <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
            <li>Central clubhouse & lobby ventilation sealed from 8 PM.</li>
            <li>Park morning walks/yoga strictly suspended.</li>
            <li>Security deployed to prevent open leaf/waste burning.</li>
          </ul>
          {adminCustomNote && <p className="mt-1.5 text-amber-300">📌 <b>RWA Note:</b> {adminCustomNote}</p>}
          <p className="mt-2 text-[10px] text-slate-400 italic">Issued by: {adminName} | VayuVision Community</p>
        </>
      );
    } else if (adminRole === 'ddma_disaster') {
      return (
        <>
          <p className="font-bold text-rose-400">🚨 DDMA PUBLIC HEALTH EMERGENCY BULLETIN (CODE RED)</p>
          <p className="mt-1.5">📍 <b>Target Cluster:</b> {locName}</p>
          <p>⚠️ <b>Current/Predicted AQI:</b> {peak} (Emergency Level)</p>
          <p className="mt-2 font-semibold">🚑 Directives for Citizens:</p>
          <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
            <li>High-risk patients & children strictly restricted indoors.</li>
            <li>Oxygen concentrator helpline active: 1077.</li>
            <li>Non-essential transit prohibited during nocturnal inversion.</li>
          </ul>
          {adminCustomNote && <p className="mt-1.5 text-amber-300">📌 <b>DDMA Directive:</b> {adminCustomNote}</p>}
          <p className="mt-2 text-[10px] text-slate-400 italic">Authorized by: {adminName} | DDMA Delhi</p>
        </>
      );
    } else {
      return (
        <>
          <p className="font-bold text-emerald-400">🏛️ MUNICIPAL AIR QUALITY DIRECTIVE (GRAP STAGE IV)</p>
          <p className="mt-1.5">📍 <b>Jurisdiction:</b> {locName}</p>
          <p>📊 <b>Critical Inversion Spike:</b> {peak} AQI</p>
          <p>⏰ <b>Duration:</b> Effective Immediately across NCR Clusters</p>
          <p className="mt-2 font-semibold">🚜 Enforced Administrative Actions:</p>
          <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
            <li>Entry of non-essential BS-IV diesel trucks prohibited.</li>
            <li>14 Anti-smog mist water guns deployed on arterial flyovers.</li>
            <li>Private construction & demolition halted.</li>
          </ul>
          {adminCustomNote && <p className="mt-1.5 text-amber-300">📌 <b>Special Note:</b> {adminCustomNote}</p>}
          <p className="mt-2 text-[10px] text-slate-400 italic">Authorized Officer: {adminName} | DPCC Control Room</p>
        </>
      );
    }
  };

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

        {/* Right Column: Optimized WhatsApp Early-Warning Simulator & Real Bot */}
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
            {/* Mode Switcher Toggle: Citizen vs Admin AI Bot */}
            <div className="flex items-center p-1 bg-slate-950 border border-slate-800 rounded-xl gap-1">
              <button
                type="button"
                onClick={() => setActiveMode('citizen')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeMode === 'citizen'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Citizen Alert Mode</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('admin')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeMode === 'admin'
                    ? 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                    : 'text-slate-400 hover:text-amber-300'
                }`}
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Admin AI Bot Console</span>
              </button>
            </div>

            {/* CITIZEN MODE FORM */}
            {activeMode === 'citizen' && (
              <>
                <p className="text-xs text-slate-300 leading-relaxed">
                  VayuVision delivers early warnings where citizens already are. Enter your phone number to test real WhatsApp dispatch:
                </p>

                <form onSubmit={handleSendWhatsApp} className="space-y-3.5 text-xs">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                        Citizen Mobile Number <span className="text-emerald-400">*</span>
                      </label>
                      {isValidNumber ? (
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-400" />
                          10-Digit Valid
                        </span>
                      ) : (
                        <span className="text-[10px] text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded-full font-medium">
                          {cleanPhone.length}/10 digits
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2.5 text-slate-300 font-semibold text-xs select-none">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter 10-digit mobile number"
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-mono focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-colors"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between mt-1.5 text-[10px]">
                      <span className="text-slate-500">Apne phone par real alert paane ke liye apna number dalein.</span>
                      <button
                        type="button"
                        onClick={() => setPhone('9876543210')}
                        className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer font-medium"
                      >
                        Demo Number Fill Karein
                      </button>
                    </div>
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

                  {/* Dual Action Buttons: Send to Number + Share to WhatsApp Group */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-3 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {isSending ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send to Number 🚀</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleShareToGroup}
                      className="w-full py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-300 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Share to Group / RWA 👥</span>
                    </button>
                  </div>
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
              </>
            )}

            {/* ADMIN AI BOT CONSOLE */}
            {activeMode === 'admin' && (
              <>
                <div className="p-3 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Official Authority AI Bot Dispatch Console</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Synthesize legally formatted environmental directives and broadcast to verified citizen & institutional WhatsApp subscriber channels.
                  </p>
                </div>

                <form onSubmit={handleAdminBroadcast} className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Authority Role</label>
                      <select
                        value={adminRole}
                        onChange={(e) => setAdminRole(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium focus:border-amber-500 outline-none truncate"
                      >
                        <option value="dpcc_official">🏛️ DPCC Municipal Officer</option>
                        <option value="school_principal">🏫 CampusAir Principal</option>
                        <option value="rwa_secretary">🏢 RWA Society President</option>
                        <option value="ddma_disaster">🚨 DDMA Emergency Cell</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Target Cluster Zone</label>
                      <select
                        value={waLocation}
                        onChange={(e) => setWaLocation(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium focus:border-amber-500 outline-none truncate"
                      >
                        {locations.map((l) => (
                          <option key={l.id} value={l.id}>{l.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Authorized Officer / Admin Name</label>
                    <input
                      type="text"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      placeholder="e.g. Dr. R. K. Sharma (DPCC Nodal Officer)"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white font-medium focus:border-amber-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">
                      AI Bot Custom Instruction / Special Note (Optional)
                    </label>
                    <input
                      type="text"
                      value={adminCustomNote}
                      onChange={(e) => setAdminCustomNote(e.target.value)}
                      placeholder="e.g. Advise school buses to run with sealed windows and N95 masks"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white text-[11px] focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">
                      Test Dispatch Mobile Number (Your Phone)
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit number to receive live broadcast"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white font-mono focus:border-amber-500 outline-none"
                    />
                  </div>

                  {/* AI Synthesized Message Preview */}
                  <div className="pt-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Bot className="w-3.5 h-3.5 text-amber-400" />
                        AI Bot Generated Official Order Preview
                      </span>
                    </div>

                    <div className="bg-[#0b141a] border border-[#222e35] rounded-xl p-3.5 relative overflow-hidden shadow-inner">
                      <div className="bg-[#005c4b] text-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-xs shadow-md space-y-1.5 max-w-[95%]">
                        {getAdminPreviewText()}
                        <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-200 mt-1">
                          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Admin Broadcast Button */}
                  <button
                    type="submit"
                    disabled={isAdminSending}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isAdminSending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                        <span>Synthesizing & Broadcasting Official Directive...</span>
                      </>
                    ) : (
                      <>
                        <Radio className="w-4 h-4 text-slate-950 animate-pulse" />
                        <span>Broadcast via Official AI Bot (24,850 Citizens) ⚡</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Admin Dispatch Result Feedback */}
                {adminDispatchStatus && (
                  <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between text-amber-300">
                      <span className="font-bold flex items-center gap-1.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Official Directive Broadcast Queued!
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                        {adminDispatchStatus.broadcast_id}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950/70 p-2.5 rounded-lg border border-slate-800">
                      <div>
                        <span className="text-slate-500 block">Subscribers Reached:</span>
                        <span className="font-bold text-slate-200">{adminDispatchStatus.subscribers_count?.toLocaleString()} Citizens</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Audit Hash:</span>
                        <span className="font-mono text-[10px] text-cyan-400 truncate block">{adminDispatchStatus.audit_hash}</span>
                      </div>
                    </div>

                    {/* Big Action Button: Open in WhatsApp */}
                    {adminDispatchStatus.wa_direct_url && (
                      <div className="pt-1 flex flex-col sm:flex-row gap-2">
                        <a
                          href={adminDispatchStatus.wa_direct_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-center"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Open Official Directive in WhatsApp Web / App</span>
                          <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                        </a>

                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(adminDispatchStatus.ai_generated_message);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2500);
                          }}
                          className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5 text-amber-400" />
                          <span>{copied ? 'Copied!' : 'Copy Order'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Transparency Note */}
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <b>Dual Mode Supported:</b> Citizens receive personal & group alerts; Authorized Admins use the AI Bot to synthesize and broadcast official municipal directives.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* WHY WHATSAPP? COMPREHENSIVE USE CASES & IMPACT PANEL */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 via-[#0a1122] to-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Why WhatsApp? — Real-World Use Cases & Behavioral Impact
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Zero App Fatigue: Delivering life-saving environmental forecasts where 1.4B citizens already communicate every day.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs text-emerald-300 font-semibold shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>92%+ Penetration Rate in NCR</span>
          </div>
        </div>

        {/* 4 Core Real-World Use Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Use Case 1 */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 space-y-2.5 hover:border-emerald-500/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <HeartPulse className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-100">1. Asthma & High-Risk Citizens</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              <b>Life-Saving Early Warning:</b> Sends alerts 4 hours before Diwali midnight inversion traps smoke, prompting asthma patients to seal bedrooms and activate HEPA purifiers before acute attacks strike.
            </p>
            <div className="text-[10px] text-rose-300/90 font-medium bg-rose-950/30 px-2 py-1 rounded">
              🎯 Prevents nocturnal ER visits
            </div>
          </div>

          {/* Use Case 2 */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 space-y-2.5 hover:border-emerald-500/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <School className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-100">2. School Bus & CampusAir Channels</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              <b>Automated 6:00 AM Parental Alert:</b> Direct broadcast to parents before kids step out for morning buses, advising on indoor assemblies or N95 masks before cold smog exposure occurs.
            </p>
            <div className="text-[10px] text-cyan-300/90 font-medium bg-cyan-950/30 px-2 py-1 rounded">
              🎯 100% parental open rate in 5 mins
            </div>
          </div>

          {/* Use Case 3 */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 space-y-2.5 hover:border-emerald-500/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Building2 className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-100">3. Gated Societies & RWA Groups</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              <b>Community-Wide Coordination:</b> Society admins forward the 1-click WhatsApp alert to 500+ residents to halt outdoor morning yoga, seal clubhouse vents, and stop dry-sweeping dust emissions.
            </p>
            <div className="text-[10px] text-amber-300/90 font-medium bg-amber-950/30 px-2 py-1 rounded">
              🎯 1-Click RWA Group Broadcast
            </div>
          </div>

          {/* Use Case 4 */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 space-y-2.5 hover:border-emerald-500/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Users className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-slate-100">4. Outdoor Gig & Delivery Fleets</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              <b>Occupational Hazard Advisory:</b> Pushes proactive warnings to food and grocery delivery riders (Zomato/Blinkit) to equip certified N95 respirators during hazardous night-shift chokepoints.
            </p>
            <div className="text-[10px] text-emerald-300/90 font-medium bg-emerald-950/30 px-2 py-1 rounded">
              🎯 Protects vulnerable frontline workers
            </div>
          </div>
        </div>

        {/* Why Push Beats Pull Explanation Strip */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <b>The Behavioral Edge: Push vs. Passive Pull:</b> Nobody installs an app they use only 3 days a year during Diwali. VayuVision's WhatsApp engine pushes forecasts directly to citizens, solving the adoption problem permanently.
            </span>
          </div>
          <button
            type="button"
            onClick={handleShareToGroup}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold border border-emerald-500/40 text-xs shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Try Group Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
