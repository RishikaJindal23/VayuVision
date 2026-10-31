import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { analyzeLinkedInProfile } from '../../utils/linkedinEngine';
import { 
  Linkedin, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  ArrowRight, 
  Flame, 
  TrendingUp, 
  FileText, 
  Target, 
  Cpu,
  RotateCcw
} from 'lucide-react';

export default function LinkedInAnalyzerView({ addToast }) {
  const { t, currentLang } = useLanguage();

  // Controlled Form Inputs (Lectures 55-66)
  const [targetRole, setTargetRole] = useState('Full Stack Software Engineer');
  const [headline, setHeadline] = useState('Aspiring Software Engineer | React, Node.js & TypeScript Enthusiast | Computer Science Graduate');
  const [about, setAbout] = useState(
    `Hello! I am a passionate developer who loves coding in React and JavaScript. I have built several academic and personal projects including a task manager and e-commerce UI. Seeking an entry-level software engineer role where I can contribute and learn.`
  );
  const [skills, setSkills] = useState('React, JavaScript, Node.js, TypeScript, PostgreSQL, Tailwind CSS, Git, REST APIs');

  // Analysis result state
  const [analysisResult, setAnalysisResult] = useState(() => {
    return analyzeLinkedInProfile({
      headline: 'Aspiring Software Engineer | React, Node.js & TypeScript Enthusiast | Computer Science Graduate',
      about: `Hello! I am a passionate developer who loves coding in React and JavaScript. I have built several academic and personal projects including a task manager and e-commerce UI. Seeking an entry-level software engineer role where I can contribute and learn.`,
      skills: 'React, JavaScript, Node.js, TypeScript, PostgreSQL, Tailwind CSS, Git, REST APIs',
      targetRole: 'Full Stack Software Engineer',
      language: currentLang
    });
  });

  const [isAuditing, setIsAuditing] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isAboutCopied, setIsAboutCopied] = useState(false);

  // Trigger analysis
  const handleAnalyze = (e) => {
    e.preventDefault();
    setIsAuditing(true);

    setTimeout(() => {
      const res = analyzeLinkedInProfile({
        headline,
        about,
        skills,
        targetRole,
        language: currentLang
      });
      setAnalysisResult(res);
      setIsAuditing(false);

      if (addToast) {
        addToast('LinkedIn Profile audited successfully! Review your score & AI suggestions below.', 'success');
      }
    }, 400);
  };

  // 1-Click Copy Helper
  const handleCopy = (text, type, index = null) => {
    if (!text) return;
    navigator.clipboard.writeText(text);

    if (type === 'headline') {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
      if (addToast) addToast('Headline copied to clipboard!', 'success');
    } else if (type === 'about') {
      setIsAboutCopied(true);
      setTimeout(() => setIsAboutCopied(false), 2000);
      if (addToast) addToast('About section copied to clipboard!', 'success');
    }
  };

  // Reset inputs
  const handleReset = () => {
    setTargetRole('Full Stack Software Engineer');
    setHeadline('');
    setAbout('');
    setSkills('');
    if (addToast) addToast('Form reset.', 'info');
  };

  const { overallScore, headlineScore, aboutScore, keywordScore, headlineFeedback, aboutFeedback, generatedHeadlines, generatedAbout } = analysisResult;

  // Score Badge Color
  const scoreColor = overallScore >= 75 ? 'text-emerald-400' : overallScore >= 50 ? 'text-cyan-400' : 'text-amber-400';
  const scoreRing = overallScore >= 75 ? 'border-emerald-500/50 bg-emerald-500/10' : overallScore >= 50 ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-amber-500/50 bg-amber-500/10';

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A66C2]/15 border border-[#0A66C2]/35 text-[#388ee6] text-xs font-mono font-medium mb-3">
            <Linkedin className="w-3.5 h-3.5" />
            <span>{t.linkedin.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.linkedin.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-3xl">
            {t.linkedin.subtitle}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-all self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Form</span>
        </button>
      </div>

      {/* Main Grid: Form Left, Score & Overview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input Form (Lectures 55-66: Controlled Components) */}
        <div className="lg:col-span-7 bg-[#090f1d] p-6 rounded-2xl border border-white/10 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#388ee6]" />
              <span>{t.linkedin.formHeading}</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">No login required</span>
          </div>

          <form onSubmit={handleAnalyze} className="space-y-4">
            
            {/* Target Role */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.linkedin.targetRole}
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder={t.linkedin.targetRolePlaceholder}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#0A66C2]"
                required
              />
            </div>

            {/* Headline */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">
                  {t.linkedin.headline}
                </label>
                <span className="text-[11px] font-mono text-slate-500">
                  {headline.length}/220 characters
                </span>
              </div>
              <textarea
                rows={2}
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder={t.linkedin.headlinePlaceholder}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#0A66C2]"
                required
              />
            </div>

            {/* About Section */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">
                  {t.linkedin.about}
                </label>
                <span className="text-[11px] font-mono text-slate-500">
                  {about.split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <textarea
                rows={5}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder={t.linkedin.aboutPlaceholder}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#0A66C2] leading-relaxed"
                required
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.linkedin.skills}
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder={t.linkedin.skillsPlaceholder}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#0A66C2]"
              />
            </div>

            {/* Analyze Button */}
            <button
              type="submit"
              disabled={isAuditing}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0A66C2] to-cyan-500 hover:from-[#095196] hover:to-cyan-400 text-white font-extrabold text-sm shadow-lg shadow-[#0A66C2]/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isAuditing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t.linkedin.analyzing}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>{t.linkedin.analyzeBtn}</span>
                </>
              )}
            </button>

          </form>
        </div>

        {/* Right Column: Score & Checklist */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Scorecard Card */}
          <div className="p-6 rounded-2xl bg-[#0a1224] border border-cyan-500/30 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" />
                <span>{t.linkedin.scoreCardTitle}</span>
              </h3>
              <span className="text-xs font-mono text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-500/15">
                Target: {targetRole}
              </span>
            </div>

            {/* Score Ring & Number */}
            <div className="flex items-center gap-5 p-4 rounded-xl bg-black/40 border border-white/5">
              <div className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center flex-shrink-0 ${scoreRing}`}>
                <span className={`text-3xl font-black font-mono ${scoreColor}`}>
                  {overallScore}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-white block">
                  {overallScore >= 80 ? '🔥 All-Star Recruiter Ready' : overallScore >= 50 ? '⚡ Strong Potential' : '🌱 Needs Optimization'}
                </span>
                <p className="text-xs text-slate-400 leading-snug">
                  Based on LinkedIn search ranking algorithms, ATS readability, and recruiter scanning habits.
                </p>
              </div>
            </div>

            {/* Metric Progress Bars */}
            <div className="space-y-3 pt-2">
              
              {/* Headline Score */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">{t.linkedin.scoreHeadline}</span>
                  <span className="font-mono text-cyan-300 font-bold">{headlineScore}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: `${headlineScore}%` }} />
                </div>
              </div>

              {/* About Score */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">{t.linkedin.scoreAbout}</span>
                  <span className="font-mono text-violet-300 font-bold">{aboutScore}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500" style={{ width: `${aboutScore}%` }} />
                </div>
              </div>

              {/* Recruiter SEO */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">{t.linkedin.scoreKeywords}</span>
                  <span className="font-mono text-emerald-300 font-bold">{keywordScore}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${keywordScore}%` }} />
                </div>
              </div>

            </div>

            {/* Suggestions Checklist */}
            <div className="pt-3 border-t border-white/5 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                {t.linkedin.suggestionsTitle}
              </span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {headlineFeedback.map((fb, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>{fb}</span>
                  </div>
                ))}
                {aboutFeedback.map((fb, i) => (
                  <div key={`about-${i}`} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-violet-400 mt-0.5">•</span>
                    <span>{fb}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* AI Generated Content Section */}
      <div className="space-y-6 pt-4">
        
        {/* 1. AI Generated Headlines */}
        <div className="p-6 rounded-2xl bg-[#090f1d] border border-cyan-500/30 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>{t.linkedin.aiHeadlinesTitle}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.linkedin.aiHeadlinesSubtitle}
              </p>
            </div>
            <span className="text-xs text-cyan-400 font-mono font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 self-start sm:self-auto">
              3 Variations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {generatedHeadlines.map((item, idx) => {
              const isCopied = copiedIndex === idx;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-black/40 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-1.5">
                      {item.type}
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      "{item.headline}"
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(item.headline, 'headline', idx)}
                    className={`w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isCopied
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : 'bg-white/5 hover:bg-cyan-500 hover:text-slate-950 text-slate-300'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{t.common.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.linkedin.copyHeadline}</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. AI Enhanced About Section */}
        <div className="p-6 rounded-2xl bg-[#090f1d] border border-violet-500/30 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-400" />
                <span>{t.linkedin.aiAboutTitle}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.linkedin.aiAboutSubtitle} ({currentLang.toUpperCase()} Edition)
              </p>
            </div>

            <button
              onClick={() => handleCopy(generatedAbout, 'about')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all self-start sm:self-auto ${
                isAboutCopied
                  ? 'bg-emerald-500 text-slate-950 font-black'
                  : 'bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-500/20'
              }`}
            >
              {isAboutCopied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.common.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.linkedin.copyAbout}</span>
                </>
              )}
            </button>
          </div>

          <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-sans text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed">
            {generatedAbout}
          </div>
        </div>

      </div>

    </div>
  );
}
