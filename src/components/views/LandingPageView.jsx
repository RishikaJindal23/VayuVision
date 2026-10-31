import React, { useState } from 'react';
import { 
  FileSearch, 
  FileText, 
  Mail, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Cpu,
  Sparkles,
  Briefcase,
  ClipboardList,
  Compass,
  Linkedin
} from 'lucide-react';
import ScoreGauge from '../common/ScoreGauge';
import GlassCard from '../common/GlassCard';
import { SAMPLE_RESUMES, SAMPLE_JOB_DESCRIPTIONS, calculateAtsMatch } from '../../utils/atsEngine';

/**
 * LandingPageView Component
 * Clean landing page showcasing the 5 New Features + Core Resumate Tools
 */
export default function LandingPageView({ onNavigate, addToast }) {
  // useState hook for mini scan demo on landing page
  const [quickResume, setQuickResume] = useState(SAMPLE_RESUMES.softwareEngineer);
  const [quickJd, setQuickJd] = useState(SAMPLE_JOB_DESCRIPTIONS.seniorReactNode);
  const [demoResult, setDemoResult] = useState(() => calculateAtsMatch(SAMPLE_RESUMES.softwareEngineer, SAMPLE_JOB_DESCRIPTIONS.seniorReactNode));

  const handleRunMiniScan = () => {
    const result = calculateAtsMatch(quickResume, quickJd);
    setDemoResult(result);
    if (addToast) {
      addToast('ATS Scan simulated successfully!', 'success');
    }
  };

  const featureCards = [
    {
      id: 'jobs',
      title: 'Job Search & Skill Match',
      icon: Briefcase,
      accent: 'cyan',
      tag: 'NEW FEATURE 🚀',
      desc: 'Search tech jobs and instantly compare your resume skills with required skills to see match % and missing gaps.',
      stat: 'Instant ATS Skill Comparison'
    },
    {
      id: 'tracker',
      title: 'Job Application Tracker',
      icon: ClipboardList,
      accent: 'amber',
      tag: 'NEW FEATURE 🚀',
      desc: 'Manage all your applied jobs, interview milestones, offers, and conversion statistics with full localStorage persistence.',
      stat: 'Pipeline Stats & Status Filter'
    },
    {
      id: 'roadmap',
      title: 'Personalized Career Roadmap',
      icon: Compass,
      accent: 'violet',
      tag: 'NEW FEATURE 🚀',
      desc: 'Choose your target role (ML, Full Stack, Java, Data) and mark skills completed with real-time progress bar.',
      stat: 'Milestones & Project Ideas'
    },
    {
      id: 'linkedin-analyzer',
      title: 'LinkedIn Profile Analyzer',
      icon: Linkedin,
      accent: 'blue',
      tag: 'NEW FEATURE 🚀',
      desc: 'Audit your headline and About section for recruiter SEO, and generate 3 AI high-converting headlines with 1-click copy.',
      stat: 'Recruiter SEO & Headline AI'
    },
    {
      id: 'builder',
      title: 'Live Resume Builder',
      icon: FileText,
      accent: 'cyan',
      tag: 'Dual-Pane Builder',
      desc: 'Build & edit your resume in real time. Choose from 4 sleek themes and export high-resolution ATS vector PDFs.',
      stat: '4 ATS-Ready Themes'
    },
    {
      id: 'scanner',
      title: 'ATS Resume Intelligence',
      icon: FileSearch,
      accent: 'emerald',
      tag: 'Keyword Matching',
      desc: 'Scan your resume against any target job description. Detect missing hard and soft skill keywords with instant score breakdown.',
      stat: '98% Recruiter Match Heuristics'
    }
  ];

  return (
    <div className="relative space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-8 text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>RESUMATE • NEXT-GEN AI CAREER COPILOT</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
          Master The ATS. <br />
          <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
            Land Your Dream Tech Role.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          RESUMATE empowers tech candidates with Job Skill Matching, an Application Tracker, Career Roadmaps, LinkedIn Profile Auditing, and ATS Resume Optimization.
        </p>

        {/* Quick Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('jobs')}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all transform active:scale-95 cursor-pointer"
          >
            <Briefcase className="w-4 h-4" /> Explore Jobs & Match
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('tracker')}
            className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white font-semibold text-sm border border-white/10 flex items-center gap-2 transition-all cursor-pointer"
          >
            <ClipboardList className="w-4 h-4 text-amber-400" /> Open App Tracker
          </button>
        </div>

        {/* Quick Highlights Strip */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" /> 100% Client-Side Privacy
          </span>
          <span className="flex items-center gap-1.5 text-cyan-400">
            <Sparkles className="w-4 h-4" /> Multilingual: EN • हिन्दी • ਪੰਜਾਬੀ
          </span>
          <span className="flex items-center gap-1.5 text-violet-400">
            <Compass className="w-4 h-4" /> 4 Career Roadmaps
          </span>
        </div>
      </section>

      {/* 2. ALL CORE & NEW FEATURE CARDS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Comprehensive Career Intelligence Suite
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Everything you need to prepare, apply, and track your tech job search.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 hidden sm:inline">
            React Router SPA • 6 Modules
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <GlassCard
                key={card.id}
                accent={card.accent}
                hover
                className="flex flex-col justify-between p-6 cursor-pointer group"
                onClick={() => onNavigate(card.id)}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-slate-300">
                      {card.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400">{card.stat}</span>
                  <span className="flex items-center gap-1 text-slate-400 group-hover:text-white transition-colors">
                    <span>Launch</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE ATS MINI SCANNER DEMO */}
      <section className="bg-gradient-to-r from-[#0c1322] via-[#09152b] to-[#0c1322] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>LIVE ATS ALGORITHM DEMO</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Instant ATS Match Tester
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Experience the client-side TF-IDF keyword extraction and formatting audit in real-time.
            </p>
          </div>

          <button
            onClick={handleRunMiniScan}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md self-start sm:self-auto cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" /> Run Match Simulation
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400 uppercase font-semibold">
                Sample Resume Text
              </label>
              <textarea
                rows={7}
                value={quickResume}
                onChange={(e) => setQuickResume(e.target.value)}
                className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 font-mono focus:outline-none focus:border-cyan-500 leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400 uppercase font-semibold">
                Target Job Description
              </label>
              <textarea
                rows={7}
                value={quickJd}
                onChange={(e) => setQuickJd(e.target.value)}
                className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 font-mono focus:outline-none focus:border-cyan-500 leading-relaxed"
              />
            </div>

          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-white/5 space-y-4">
            <ScoreGauge 
              score={demoResult.overallScore} 
              size={130} 
              label="ATS Match" 
              sublabel={demoResult.overallScore >= 80 ? 'Excellent' : 'Needs Optimization'} 
            />

            <div className="w-full space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Hard Skills Match:</span>
                <span className="text-cyan-400 font-bold">{demoResult.hardSkillMatch}%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Soft Skills Match:</span>
                <span className="text-violet-400 font-bold">{demoResult.softSkillMatch}%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Searchability Audit:</span>
                <span className="text-emerald-400 font-bold">{demoResult.searchabilityScore}/100</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('scanner')}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Full In-Depth Scanner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
