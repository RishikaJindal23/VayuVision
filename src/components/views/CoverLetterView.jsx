import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Copy, 
  Check, 
  Download
} from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { generateCoverLetter, TONE_STYLES } from '../../utils/coverLetterEngine';

/**
 * CoverLetterView Component
 * AI-tailored cover letter generator with live preview.
 * Standard functional component using basic useState and useEffect hooks.
 */
export default function CoverLetterView({ resumeData = {}, addToast }) {
  // useState hooks for input fields
  const [candidateName, setCandidateName] = useState(resumeData?.personal?.fullName || 'Alex Rivera');
  const [candidateEmail, setCandidateEmail] = useState(resumeData?.personal?.email || 'alex.rivera@email.com');
  const [candidatePhone, setCandidatePhone] = useState(resumeData?.personal?.phone || '(555) 342-9812');
  const [targetRole, setTargetRole] = useState(resumeData?.personal?.roleTitle || 'Senior Full Stack Engineer');
  const [companyName, setCompanyName] = useState('Apex Innovations');
  const [hiringManager, setHiringManager] = useState('Hiring Team');
  const [yearsOfExperience, setYearsOfExperience] = useState('4+');
  const [keyAchievement, setKeyAchievement] = useState('engineered a distributed real-time notification engine that reduced API latency from 180ms to 24ms for 1.2M active users');
  const [selectedTone, setSelectedTone] = useState('professional');
  
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [copied, setCopied] = useState(false);

  // Sync inputs if resumeData changes
  useEffect(() => {
    if (resumeData?.personal) {
      if (resumeData.personal.fullName) setCandidateName(resumeData.personal.fullName);
      if (resumeData.personal.email) setCandidateEmail(resumeData.personal.email);
      if (resumeData.personal.phone) setCandidatePhone(resumeData.personal.phone);
      if (resumeData.personal.roleTitle) setTargetRole(resumeData.personal.roleTitle);
    }
  }, [resumeData]);

  // useEffect hook to re-generate cover letter when inputs change
  useEffect(() => {
    const res = generateCoverLetter({
      candidateName,
      candidateEmail,
      candidatePhone,
      targetRole,
      companyName,
      hiringManager,
      keySkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
      yearsOfExperience,
      keyAchievement,
      tone: selectedTone
    });
    setGeneratedLetter(res.fullLetter);
  }, [candidateName, candidateEmail, candidatePhone, targetRole, companyName, hiringManager, yearsOfExperience, keyAchievement, selectedTone]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    if (addToast) addToast('Cover letter copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([generatedLetter], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Cover_Letter_${companyName.replace(/\s+/g, '_')}.txt`;
    link.click();
    if (addToast) addToast('Downloaded as text file!', 'success');
  };

  return (
    <div className="space-y-8 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10 no-print">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-mono font-medium mb-2">
            <Mail className="w-3.5 h-3.5" />
            <span>TAILORED COVER LETTER ARCHITECT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI-Tailored Cover Letter Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Blend your core achievements into compelling narrative letters customized for each target company.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 text-white font-bold text-xs shadow-glow-pink flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy Letter'}
          </button>

          <button
            onClick={handleDownloadTxt}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-white/10 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> .TXT Export
          </button>
        </div>
      </div>

      {/* Main Form & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Form: Tuning Parameters (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4 no-print">
          
          {/* Tone Selector */}
          <GlassCard glowColor="pink" className="space-y-3">
            <label className="text-xs font-mono font-bold text-pink-300 uppercase tracking-wider block">
              1. Select Cover Letter Tone Style
            </label>

            <div className="grid grid-cols-2 gap-2">
              {Object.values(TONE_STYLES).map(toneObj => (
                <button
                  key={toneObj.id}
                  onClick={() => setSelectedTone(toneObj.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedTone === toneObj.id
                      ? 'bg-pink-500/20 text-white border-pink-500/50 shadow-glow-pink'
                      : 'bg-slate-900/60 text-slate-400 border-white/5 hover:bg-slate-800'
                  }`}
                >
                  <p className="text-xs font-bold">{toneObj.label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{toneObj.badge}</p>
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Role & Company Input */}
          <GlassCard glowColor="none" className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              2. Opportunity Details
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Target Company</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg glass-input text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Target Job Title</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg glass-input text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Hiring Manager / Team</label>
                <input
                  type="text"
                  value={hiringManager}
                  onChange={(e) => setHiringManager(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg glass-input text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Years of Experience</label>
                <input
                  type="text"
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg glass-input text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">Highlight Achievement</label>
              <textarea
                rows={3}
                value={keyAchievement}
                onChange={(e) => setKeyAchievement(e.target.value)}
                placeholder="Detail your most impressive project, scale, or metrics..."
                className="w-full p-2.5 rounded-lg glass-input text-xs font-sans text-slate-200 resize-y"
              />
            </div>
          </GlassCard>
        </div>

        {/* Right Pane: Generated Letter Live Editor (lg:col-span-7) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 bg-white text-slate-900 rounded-2xl shadow-2xl min-h-[580px] font-sans text-xs leading-relaxed space-y-4 border-t-8 border-pink-500">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 no-print">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                Letter Preview ({TONE_STYLES[selectedTone].label})
              </span>
              <button
                onClick={handleCopy}
                className="text-pink-600 hover:text-pink-700 text-xs font-bold flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy Text
              </button>
            </div>

            <textarea
              rows={18}
              value={generatedLetter}
              onChange={(e) => setGeneratedLetter(e.target.value)}
              className="w-full p-2 bg-transparent text-slate-900 font-sans text-xs sm:text-sm leading-relaxed resize-y focus:outline-none"
              style={{ minHeight: '440px' }}
            />
          </div>
        </div>

      </div>

    </div>
  );
}
