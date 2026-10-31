import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  FileSearch, 
  Sparkles, 
  Copy, 
  Check, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Cpu,
  ArrowRight
} from 'lucide-react';
import ScoreGauge from '../common/ScoreGauge';
import GlassCard from '../common/GlassCard';
import { SAMPLE_RESUMES, SAMPLE_JOB_DESCRIPTIONS, calculateAtsMatch } from '../../utils/atsEngine';
import { useTitle } from '../../hooks/useTitle';

/**
 * AtsScannerView Component
 * Evaluates ATS match between resume text and job description.
 * Demonstrates: useParams (Dynamic Routes), useNavigate, useState, useEffect, useTitle custom hook.
 */
export default function AtsScannerView({ 
  onAddScanRecord, 
  addToast 
}) {
  useTitle('ATS Keyword Gap & Formatting Scanner');

  // React Router Dynamic Params & Navigation
  const { presetId } = useParams();
  const navigate = useNavigate();

  // useState hooks for inputs and UI tab
  const [resumeText, setResumeText] = useState(SAMPLE_RESUMES.softwareEngineer);
  const [jobDescription, setJobDescription] = useState(SAMPLE_JOB_DESCRIPTIONS.seniorReactNode);
  const [copiedKey, setCopiedKey] = useState(null);
  const [activeTab, setActiveTab] = useState('skills'); // 'skills' | 'format'

  // Calculated ATS results state
  const [results, setResults] = useState(() => calculateAtsMatch(SAMPLE_RESUMES.softwareEngineer, SAMPLE_JOB_DESCRIPTIONS.seniorReactNode));

  // Dynamic Route Parameter Handler via useEffect
  useEffect(() => {
    if (presetId === 'softwareEngineer') {
      loadSample('softwareEngineer');
    } else if (presetId === 'productManager') {
      loadSample('productManager');
    }
  }, [presetId]);

  const handleScan = () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      if (addToast) addToast('Please provide both resume text and a job description.', 'error');
      return;
    }

    const res = calculateAtsMatch(resumeText, jobDescription);
    setResults(res);

    // Save to user history
    if (onAddScanRecord) {
      onAddScanRecord({
        role: 'ATS Match Scan',
        company: 'Target Company',
        score: res.overallScore
      });
    }

    if (addToast) addToast(`Scan complete! Overall ATS Match: ${res.overallScore}%`, 'success');

    // Confetti on high score
    if (res.overallScore >= 85) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const loadSample = (type) => {
    if (type === 'softwareEngineer') {
      setResumeText(SAMPLE_RESUMES.softwareEngineer);
      setJobDescription(SAMPLE_JOB_DESCRIPTIONS.seniorReactNode);
      const res = calculateAtsMatch(SAMPLE_RESUMES.softwareEngineer, SAMPLE_JOB_DESCRIPTIONS.seniorReactNode);
      setResults(res);
    } else if (type === 'productManager') {
      setResumeText(SAMPLE_RESUMES.productManager);
      setJobDescription(SAMPLE_JOB_DESCRIPTIONS.productLead);
      const res = calculateAtsMatch(SAMPLE_RESUMES.productManager, SAMPLE_JOB_DESCRIPTIONS.productLead);
      setResults(res);
    }
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    if (addToast) addToast('Copied to clipboard!', 'success');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const copyAllMissing = () => {
    const missing = [...results.hardSkillGap.missing, ...results.softSkillGap.missing].join(', ');
    if (!missing) {
      if (addToast) addToast('No missing keywords to copy!', 'info');
      return;
    }
    copyToClipboard(missing, 'all-missing');
  };

  return (
    <div className="space-y-8 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-2">
            <FileSearch className="w-3.5 h-3.5" />
            <span>FULL ATS RESUME PARSER & AUDITOR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            ATS Keyword Gap & Formatting Analyzer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Evaluate exact keyword matching, candidate searchability, and ATS compliance against industry standards.
          </p>
        </div>

        {/* Dynamic Route Presets */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">Route Params Presets:</span>
          <button
            onClick={() => navigate('/scanner/softwareEngineer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              presetId === 'softwareEngineer'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-white/10'
            }`}
          >
            💻 Software Eng
          </button>
          <button
            onClick={() => navigate('/scanner/productManager')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              presetId === 'productManager'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-white/10'
            }`}
          >
            📊 Product Lead
          </button>
        </div>
      </div>

      {/* Dual Pane Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pane 1: Resume Text Input */}
        <GlassCard glowColor="cyan" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <label className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                1. Your Resume Text
              </label>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              {resumeText.trim().split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          <textarea
            rows={10}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your plain-text resume here..."
            className="w-full p-4 rounded-xl glass-input text-xs font-mono text-slate-200 leading-relaxed resize-y focus:ring-1 focus:ring-cyan-400"
          />

          <p className="text-[11px] text-slate-400">
            Tip: Paste full resume text including Summary, Work Experience, Education, and Skills.
          </p>
        </GlassCard>

        {/* Pane 2: Job Description Input */}
        <GlassCard glowColor="violet" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
              <label className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                2. Target Job Description
              </label>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              {jobDescription.trim().split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          <textarea
            rows={10}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job posting requirements & responsibilities here..."
            className="w-full p-4 rounded-xl glass-input text-xs font-mono text-slate-200 leading-relaxed resize-y focus:ring-1 focus:ring-violet-400"
          />

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setResumeText('');
                setJobDescription('');
              }}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear Both
            </button>

            <button
              onClick={handleScan}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-glow-cyan flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer"
            >
              <Cpu className="w-4 h-4" /> Run Comprehensive Scan
            </button>
          </div>
        </GlassCard>
      </div>

      {/* Results Dashboard */}
      {results && (
        <div className="space-y-6">
          
          {/* Top Score Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Overall Gauge */}
            <GlassCard glowColor="cyan" className="flex flex-col items-center justify-center p-6 text-center">
              <ScoreGauge
                score={results.overallScore}
                size={130}
                label="ATS Match"
                sublabel="Overall Score"
              />
            </GlassCard>

            {/* Hard Skills Score */}
            <GlassCard glowColor="emerald" className="flex flex-col justify-between p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">Hard Skills</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300">
                  {results.hardSkillScore}%
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-white">
                  {results.hardSkillGap.matched.length} <span className="text-xs font-normal text-slate-400">/ {results.hardSkillGap.matched.length + results.hardSkillGap.missing.length} Found</span>
                </p>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div 
                    className="bg-emerald-400 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${results.hardSkillScore}%` }}
                  />
                </div>
              </div>
              <p className="text-[11px] text-slate-400">Essential frameworks, languages & cloud stacks</p>
            </GlassCard>

            {/* Soft Skills Score */}
            <GlassCard glowColor="violet" className="flex flex-col justify-between p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-violet-400 font-semibold uppercase">Soft Skills</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-violet-500/20 text-violet-300">
                  {results.softSkillScore}%
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-white">
                  {results.softSkillGap.matched.length} <span className="text-xs font-normal text-slate-400">/ {results.softSkillGap.matched.length + results.softSkillGap.missing.length} Found</span>
                </p>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div 
                    className="bg-violet-400 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${results.softSkillScore}%` }}
                  />
                </div>
              </div>
              <p className="text-[11px] text-slate-400">Leadership, Agile & collaboration signals</p>
            </GlassCard>

            {/* Searchability / Format Score */}
            <GlassCard glowColor="pink" className="flex flex-col justify-between p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-pink-400 font-semibold uppercase">Format & Health</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-pink-500/20 text-pink-300">
                  {results.formatScore}%
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-white">
                  {results.formatAudit.passes.length} <span className="text-xs font-normal text-slate-400">Checks Passed</span>
                </p>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div 
                    className="bg-pink-400 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${results.formatScore}%` }}
                  />
                </div>
              </div>
              <p className="text-[11px] text-slate-400">Contact data, headers & metrics audit</p>
            </GlassCard>
          </div>

          {/* Results Navigation Tabs */}
          <div className="flex gap-2 p-1 bg-slate-900/60 rounded-xl border border-white/5 max-w-xs">
            <button
              onClick={() => setActiveTab('skills')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'skills'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Keyword Match Gap
            </button>
            <button
              onClick={() => setActiveTab('format')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'format'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Formatting Audit ({results.formatAudit.issues.length})
            </button>
          </div>

          {/* TAB 1: KEYWORD GAP BREAKDOWN */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              
              {/* Copy Missing Keywords Quick Bar */}
              <div className="p-4 rounded-xl glass-panel border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-white">Missing Keyword Recommendations</p>
                    <p className="text-[11px] text-slate-400">
                      Incorporate these missing keywords into your experience bullets to increase score.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyAllMissing}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-medium flex items-center gap-1.5 transition-all"
                  >
                    {copiedKey === 'all-missing' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy All Missing ({results.missingSkills.length})
                  </button>

                  <button
                    onClick={() => navigate('/builder')}
                    className="px-3.5 py-1.5 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/40 text-xs font-medium flex items-center gap-1.5 transition-all"
                  >
                    Edit Resume <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Hard Skills Section */}
              <GlassCard glowColor="cyan" className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                      Hard Technical Skills
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Languages, frameworks, databases, and cloud tools</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    {results.hardSkillGap.matched.length} Matched / {results.hardSkillGap.missing.length} Missing
                  </span>
                </div>

                {/* Found Hard Skills */}
                <div>
                  <p className="text-xs font-mono text-emerald-400 font-semibold mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Found In Your Resume:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {results.hardSkillGap.matched.length > 0 ? (
                      results.hardSkillGap.matched.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                        >
                          ✓ {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">No hard skill keywords detected in resume.</span>
                    )}
                  </div>
                </div>

                {/* Missing Hard Skills */}
                <div className="pt-2 border-t border-white/5">
                  <p className="text-xs font-mono text-red-400 font-semibold mb-2 flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5" /> Missing From Job Requirements:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {results.hardSkillGap.missing.length > 0 ? (
                      results.hardSkillGap.missing.map((skill, i) => (
                        <button
                          key={i}
                          onClick={() => copyToClipboard(skill, `hard-${i}`)}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-red-500/10 text-red-300 border border-red-500/30 hover:bg-red-500/20 flex items-center gap-1 transition-colors"
                        >
                          + {skill}
                          {copiedKey === `hard-${i}` && <Check className="w-3 h-3 text-emerald-400" />}
                        </button>
                      ))
                    ) : (
                      <span className="text-xs text-emerald-400 font-mono">🎉 All required hard skills are present!</span>
                    )}
                  </div>
                </div>
              </GlassCard>

              {/* Soft Skills Section */}
              <GlassCard glowColor="violet" className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
                      Soft Skills & Methodologies
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Collaboration, leadership, Agile, and communication</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-violet-300">
                    {results.softSkillGap.matched.length} Matched / {results.softSkillGap.missing.length} Missing
                  </span>
                </div>

                {/* Found Soft Skills */}
                <div>
                  <p className="text-xs font-mono text-emerald-400 font-semibold mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Found In Your Resume:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {results.softSkillGap.matched.length > 0 ? (
                      results.softSkillGap.matched.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                        >
                          ✓ {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">No soft skill keywords detected.</span>
                    )}
                  </div>
                </div>

                {/* Missing Soft Skills */}
                <div className="pt-2 border-t border-white/5">
                  <p className="text-xs font-mono text-red-400 font-semibold mb-2 flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5" /> Missing From Job Requirements:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {results.softSkillGap.missing.length > 0 ? (
                      results.softSkillGap.missing.map((skill, i) => (
                        <button
                          key={i}
                          onClick={() => copyToClipboard(skill, `soft-${i}`)}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-red-500/10 text-red-300 border border-red-500/30 hover:bg-red-500/20 flex items-center gap-1 transition-colors"
                        >
                          + {skill}
                          {copiedKey === `soft-${i}` && <Check className="w-3 h-3 text-emerald-400" />}
                        </button>
                      ))
                    ) : (
                      <span className="text-xs text-emerald-400 font-mono">🎉 All soft skills match!</span>
                    )}
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {/* TAB 2: FORMATTING AUDIT */}
          {activeTab === 'format' && (
            <div className="space-y-6">
              
              {/* Critical Issues / Recommendations */}
              <GlassCard glowColor="amber" className="space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Formatting Recommendations & Fixes ({results.formatAudit.issues.length})
                </h3>

                {results.formatAudit.issues.length > 0 ? (
                  <div className="space-y-2.5">
                    {results.formatAudit.issues.map((issue) => (
                      <div
                        key={issue.id}
                        className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3"
                      >
                        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-amber-200">{issue.label}</p>
                          <p className="text-[11px] text-slate-300 mt-0.5">{issue.fix}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Zero formatting errors found! Your resume passes standard structural tests.
                  </div>
                )}
              </GlassCard>

              {/* Passed Checks */}
              <GlassCard glowColor="emerald" className="space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Passed Searchability Checks ({results.formatAudit.passes.length})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {results.formatAudit.passes.map((pass) => (
                    <div
                      key={pass.id}
                      className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-white">{pass.label}</p>
                        <p className="text-[11px] text-slate-300 mt-0.5">{pass.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
