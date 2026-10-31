import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { fetchJobsApi, compareResumeWithJob } from '../../utils/jobMatchingEngine';
import { 
  Briefcase, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  BookmarkPlus, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building2, 
  RotateCcw,
  Plus,
  X,
  Compass
} from 'lucide-react';

export default function JobSearchMatchView({ resumeData, onSaveApplication, addToast }) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');

  // API State
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Resume Skills State (initialized from active resumeData or default tech skills)
  const [userSkills, setUserSkills] = useState(() => {
    if (resumeData && resumeData.skills && Array.isArray(resumeData.skills) && resumeData.skills.length > 0) {
      return resumeData.skills;
    }
    return ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Git', 'Node.js', 'SQL'];
  });
  const [newSkillInput, setNewSkillInput] = useState('');
  const [selectedJobForModal, setSelectedJobForModal] = useState(null);

  // Debounce search query (Lectures 67-72)
  const debounceTimerRef = useRef(null);
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedQuery(val);
    }, 300);
  };

  // Fetch jobs when filters or debounced query change (REST API simulation)
  useEffect(() => {
    setIsLoading(true);
    fetchJobsApi({
      query: debouncedQuery,
      type: selectedType,
      experience: selectedExperience
    }).then(res => {
      setJobs(res.jobs);
      setIsLoading(false);
    });

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [debouncedQuery, selectedType, selectedExperience]);

  // Skill management handlers
  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmed = newSkillInput.trim();
    if (trimmed && !userSkills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      setUserSkills(prev => [...prev, trimmed]);
      setNewSkillInput('');
      if (addToast) addToast(`Added "${trimmed}" to your comparison skills.`, 'success');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setUserSkills(prev => prev.filter(s => s !== skillToRemove));
  };

  // Quick action: Save job directly to Application Tracker
  const handleSaveToTracker = (job) => {
    const newApp = {
      id: `app-${Date.now()}`,
      company: job.company,
      role: job.title,
      location: job.location,
      salary: job.salary,
      date: new Date().toISOString().split('T')[0],
      status: 'Applied',
      notes: `Applied through Resumate Job Matcher. Required: ${job.requiredSkills.slice(0, 4).join(', ')}`,
      link: ''
    };

    if (onSaveApplication) {
      onSaveApplication(newApp);
    } else {
      // Fallback direct localStorage sync
      try {
        const existing = JSON.parse(localStorage.getItem('resumate_applications') || '[]');
        const updated = [newApp, ...existing];
        localStorage.setItem('resumate_applications', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }

    if (addToast) {
      addToast(`"${job.title} at ${job.company}" saved to Application Tracker!`, 'success');
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-3">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.jobs.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.jobs.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-3xl">
            {t.jobs.subtitle}
          </p>
        </div>

        {/* Action button to Career Roadmap */}
        <button
          onClick={() => navigate('/roadmap')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-violet-300 font-bold text-xs sm:text-sm transition-all shadow-md self-start md:self-auto"
        >
          <Compass className="w-4 h-4 text-violet-400" />
          <span>{t.jobs.viewRoadmap}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* User Resume Skills Quick-Audit Bar */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0d1627] to-[#0b1322] border border-cyan-500/30 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white tracking-wide">
              Your Resume Skills for Matching ({userSkills.length})
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Click '×' to remove or add more skills below to re-calculate match %
          </span>
        </div>

        {/* Skill badges */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {userSkills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold"
            >
              <span>{skill}</span>
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="hover:text-red-400 text-cyan-400/70 transition-colors"
                title="Remove skill"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        {/* Add Skill Input */}
        <form onSubmit={handleAddSkill} className="flex items-center gap-2 max-w-md">
          <input
            type="text"
            value={newSkillInput}
            onChange={(e) => setNewSkillInput(e.target.value)}
            placeholder="Add another skill (e.g. Java, Docker, Next.js)..."
            className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </form>
      </div>

      {/* Search & Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-[#080e1a]/80 p-4 rounded-2xl border border-white/10">
        
        {/* Search Input with Debounce */}
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={t.jobs.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Workplace Type Filter */}
        <div className="md:col-span-3">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-slate-300 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
          >
            <option value="all">{t.jobs.allTypes}</option>
            <option value="remote">{t.jobs.remote}</option>
            <option value="hybrid">{t.jobs.hybrid}</option>
            <option value="onsite">{t.jobs.onsite}</option>
          </select>
        </div>

        {/* Experience Level Filter */}
        <div className="md:col-span-3">
          <select
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-slate-300 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
          >
            <option value="all">{t.jobs.allLevels}</option>
            <option value="entry">{t.jobs.entry}</option>
            <option value="mid">{t.jobs.mid}</option>
            <option value="senior">{t.jobs.senior}</option>
          </select>
        </div>

      </div>

      {/* Results Count & Status */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
        <span>
          Showing {jobs.length} jobs {debouncedQuery ? `for "${debouncedQuery}"` : ''}
        </span>
        <span>
          Auto-matching against {userSkills.length} resume skills
        </span>
      </div>

      {/* Jobs Grid */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          <p className="text-sm font-mono">{t.common.loading}</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="py-16 px-4 text-center rounded-2xl bg-black/20 border border-white/10 space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-base font-bold text-white">No Jobs Found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">{t.jobs.noJobsFound}</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setDebouncedQuery('');
              setSelectedType('all');
              setSelectedExperience('all');
            }}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {jobs.map((job) => {
            const comparison = compareResumeWithJob(userSkills, job.requiredSkills);
            const { matchPercentage, matchedSkills, missingSkills, scoreTier } = comparison;

            // Score tier color styles
            const badgeBg = scoreTier === 'high' 
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : scoreTier === 'medium'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-rose-500/20 text-rose-300 border-rose-500/40';

            const progressColor = scoreTier === 'high' 
              ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
              : scoreTier === 'medium' 
              ? 'bg-gradient-to-r from-amber-500 to-orange-400' 
              : 'bg-gradient-to-r from-rose-500 to-red-400';

            return (
              <div
                key={job.id}
                className="p-6 rounded-2xl bg-[#090f1d]/90 border border-white/10 hover:border-cyan-500/40 transition-all shadow-lg flex flex-col justify-between group"
              >
                <div>
                  
                  {/* Top Role & Company Line */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform">
                        {job.logo}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="font-semibold text-slate-300">{job.company}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            {job.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Match Score Badge */}
                    <div className={`px-3 py-1.5 rounded-xl border text-xs font-black font-mono flex items-center gap-1.5 shadow-sm ${badgeBg}`}>
                      <span>{matchPercentage}%</span>
                      <span className="text-[10px] font-medium uppercase tracking-wider">Match</span>
                    </div>
                  </div>

                  {/* Salary, Workplace Type, and Posted Meta */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono mb-4">
                    <span className="px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300 font-semibold flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-emerald-400" />
                      {job.salary}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300">
                      {job.type}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300">
                      {job.experience} Level
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 ml-auto">
                      <Clock className="w-3 h-3" />
                      {job.posted}
                    </span>
                  </div>

                  {/* Description snippet */}
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Match Progress Bar */}
                  <div className="space-y-1.5 mb-4 p-3 rounded-xl bg-black/30 border border-white/5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>ATS Skill Alignment</span>
                      </span>
                      <span className="font-mono text-cyan-300 font-bold">
                        {matchedSkills.length} / {job.requiredSkills.length} Skills Matched
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                        style={{ width: `${matchPercentage}%` }}
                      />
                    </div>

                    {/* Skill Breakdown Badges */}
                    <div className="pt-2 space-y-2">
                      {/* Matched Skills */}
                      {matchedSkills.length > 0 && (
                        <div>
                          <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{t.jobs.matchedSkills} ({matchedSkills.length})</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {matchedSkills.map((s, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-medium"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Missing Skills */}
                      {missingSkills.length > 0 && (
                        <div>
                          <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{t.jobs.missingSkills} ({missingSkills.length})</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {missingSkills.map((s, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-medium"
                              >
                                + {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => handleSaveToTracker(job)}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <BookmarkPlus className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t.jobs.addToTracker}</span>
                  </button>

                  <button
                    onClick={() => setSelectedJobForModal(job)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 text-xs font-black flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
                  >
                    <span>{t.common.viewDetails}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Job Match Modal */}
      {selectedJobForModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b1322] border border-cyan-500/40 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
                  {selectedJobForModal.logo}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedJobForModal.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {selectedJobForModal.company} • {selectedJobForModal.location}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedJobForModal(null)}
                className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Match Summary */}
            {(() => {
              const comp = compareResumeWithJob(userSkills, selectedJobForModal.requiredSkills);
              return (
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">ATS Match Percentage</span>
                    <span className="text-lg font-black text-cyan-400 font-mono">{comp.matchPercentage}%</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {comp.matchPercentage >= 70 ? t.jobs.matchHigh : comp.matchPercentage >= 40 ? t.jobs.matchMedium : t.jobs.matchLow}
                  </p>
                  
                  {comp.missingSkills.length > 0 && (
                    <div className="pt-2 border-t border-white/5">
                      <span className="text-xs font-bold text-amber-300 block mb-1">
                        Recommended Next Steps:
                      </span>
                      <p className="text-xs text-slate-400">
                        To become a top candidate for this role, add projects or experience demonstrating: <strong className="text-white">{comp.missingSkills.join(', ')}</strong>.
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Responsibilities */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Key Responsibilities
              </h4>
              <ul className="space-y-1.5">
                {selectedJobForModal.responsibilities.map((r, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={() => handleSaveToTracker(selectedJobForModal)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
              >
                <BookmarkPlus className="w-4 h-4" />
                <span>{t.jobs.addToTracker}</span>
              </button>
              <button
                onClick={() => setSelectedJobForModal(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs"
              >
                {t.common.back}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
