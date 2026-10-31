import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CAREER_ROADMAPS, getRoadmapStats } from '../../utils/roadmapData';
import { 
  Compass, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  RotateCcw, 
  Lightbulb, 
  FolderGit2, 
  DollarSign, 
  Trophy, 
  TrendingUp, 
  ArrowRight,
  Flame,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CareerRoadmapView({ addToast }) {
  const { t } = useLanguage();

  // Active Selected Role ID
  const [selectedRoleId, setSelectedRoleId] = useState('ml_engineer');

  // Completed Skills Storage in localStorage
  const [completedSkillsMap, setCompletedSkillsMap] = useState(() => {
    try {
      const saved = localStorage.getItem('resumate_roadmap_progress');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // Pre-mark a couple for nice initial demo feel
    return {
      ml_engineer: ['Python Basics', 'OOPs in Python', 'File Handling & JSON', 'NumPy Arrays'],
      fullstack: ['Semantic HTML5', 'Box Model & Responsive Design', 'Flexbox & CSS Grid', 'Let/Const & Scope', 'JSX & Props', 'useState & State Management'],
      java_backend: ['OOPs (Polymorphism, Inheritance, Encapsulation)', 'Java Collections Framework'],
      data_analyst: ['SELECT, WHERE, GROUP BY', 'JOINs (INNER, LEFT, FULL)']
    };
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('resumate_roadmap_progress', JSON.stringify(completedSkillsMap));
    } catch (e) {
      console.error(e);
    }
  }, [completedSkillsMap]);

  // Current active roadmap
  const currentRoadmap = useMemo(() => {
    return CAREER_ROADMAPS.find(r => r.id === selectedRoleId) || CAREER_ROADMAPS[0];
  }, [selectedRoleId]);

  // Currently completed skills for active role
  const activeCompletedSkills = useMemo(() => {
    return completedSkillsMap[selectedRoleId] || [];
  }, [completedSkillsMap, selectedRoleId]);

  // Total skills in current roadmap
  const totalSkillsCount = useMemo(() => {
    return getRoadmapStats(currentRoadmap);
  }, [currentRoadmap]);

  // Progress percentage
  const progressPercentage = useMemo(() => {
    if (totalSkillsCount === 0) return 0;
    return Math.round((activeCompletedSkills.length / totalSkillsCount) * 100);
  }, [activeCompletedSkills, totalSkillsCount]);

  // Toggle skill completion
  const handleToggleSkill = (skill) => {
    setCompletedSkillsMap(prev => {
      const currentList = prev[selectedRoleId] || [];
      const isAlreadyDone = currentList.includes(skill);
      let updatedList;

      if (isAlreadyDone) {
        updatedList = currentList.filter(s => s !== skill);
      } else {
        updatedList = [...currentList, skill];
        // Trigger celebratory confetti if reaching 100% or milestones!
        if (updatedList.length === totalSkillsCount) {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          if (addToast) addToast(`🏆 Congratulations! You have completed 100% of the ${currentRoadmap.title} roadmap!`, 'success');
        } else if (addToast) {
          addToast(`Skill "${skill}" marked as mastered! 🎯`, 'success');
        }
      }

      return {
        ...prev,
        [selectedRoleId]: updatedList
      };
    });
  };

  // Reset progress for this role
  const handleResetProgress = () => {
    if (window.confirm(`Reset your progress for ${currentRoadmap.title}?`)) {
      setCompletedSkillsMap(prev => ({
        ...prev,
        [selectedRoleId]: []
      }));
      if (addToast) addToast(`Progress reset for ${currentRoadmap.title}.`, 'info');
    }
  };

  // Determine Achievement Badge
  const achievementBadge = useMemo(() => {
    if (progressPercentage >= 80) {
      return { text: t.roadmap.badgeAdvanced, color: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/20' };
    }
    if (progressPercentage >= 35) {
      return { text: t.roadmap.badgeIntermediate, color: 'text-cyan-300 border-cyan-500/40 bg-cyan-500/20' };
    }
    return { text: t.roadmap.badgeBeginner, color: 'text-amber-300 border-amber-500/40 bg-amber-500/20' };
  }, [progressPercentage, t]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-mono font-medium mb-3">
            <Compass className="w-3.5 h-3.5 text-violet-400" />
            <span>{t.roadmap.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.roadmap.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-3xl">
            {t.roadmap.subtitle}
          </p>
        </div>

        {/* Reset button */}
        <button
          onClick={handleResetProgress}
          className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-all self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.roadmap.resetProgress}</span>
        </button>
      </div>

      {/* Role Selection Tabs / Cards Grid */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
          {t.roadmap.selectRole}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CAREER_ROADMAPS.map((role) => {
            const isSelected = selectedRoleId === role.id;
            const completedCount = (completedSkillsMap[role.id] || []).length;
            const total = getRoadmapStats(role);
            const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

            return (
              <button
                key={role.id}
                onClick={() => setSelectedRoleId(role.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#12102b] to-[#0a1628] border-violet-500 shadow-xl shadow-violet-500/20 scale-[1.02]'
                    : 'bg-[#080d1a] border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl p-2 rounded-xl bg-white/5 border border-white/10">
                      {role.icon}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-white/5 text-slate-300">
                      {percent}% Done
                    </span>
                  </div>
                  <h3 className={`text-sm font-bold transition-colors ${isSelected ? 'text-violet-300' : 'text-white group-hover:text-cyan-300'}`}>
                    {role.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {role.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-emerald-400 font-semibold">{role.salary}</span>
                  <span>{completedCount}/{total} Skills</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress & Milestone Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0d1029] via-[#09152b] to-[#0d1029] border border-violet-500/30 shadow-2xl space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentRoadmap.icon}</span>
              <h2 className="text-xl font-extrabold text-white">
                {currentRoadmap.title} Learning Tracker
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentRoadmap.category} • Target Salary: <strong className="text-emerald-300">{currentRoadmap.salary}</strong>
            </p>
          </div>

          {/* Achievement Badge */}
          <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold font-mono self-start sm:self-auto flex items-center gap-1.5 shadow-sm ${achievementBadge.color}`}>
            <Trophy className="w-4 h-4" />
            <span>{achievementBadge.text}</span>
          </div>
        </div>

        {/* Progress Bar & Stats */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 font-bold flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>{t.roadmap.overallProgress}</span>
            </span>
            <span className="text-violet-300 font-black text-sm">
              {progressPercentage}% Completed ({activeCompletedSkills.length}/{totalSkillsCount} Skills)
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-black/40 border border-white/10 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 transition-all duration-700 shadow-md"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

      </div>

      {/* Phased Steps & Interactive Checklists */}
      <div className="space-y-6">
        {currentRoadmap.phases.map((phase, pIndex) => (
          <div key={phase.id} className="space-y-4">
            
            {/* Phase Banner */}
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/40 text-violet-300 text-xs font-black font-mono flex items-center justify-center">
                0{pIndex + 1}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                {phase.title}
              </h2>
            </div>

            {/* Steps in this phase */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {phase.steps.map((step) => {
                // Check if all skills in step are completed
                const stepSkillsCount = step.skills.length;
                const completedInStep = step.skills.filter(s => activeCompletedSkills.includes(s)).length;
                const isStepFullyDone = completedInStep === stepSkillsCount;

                return (
                  <div
                    key={step.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      isStepFullyDone
                        ? 'bg-[#09151f]/80 border-emerald-500/40 shadow-lg'
                        : 'bg-[#080d19]/90 border-white/10 hover:border-violet-500/30'
                    }`}
                  >
                    <div>
                      
                      {/* Step Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h4 className="text-sm font-bold text-white leading-snug">
                          {step.title}
                        </h4>
                        <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                          isStepFullyDone ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-slate-400'
                        }`}>
                          {completedInStep}/{stepSkillsCount}
                        </span>
                      </div>

                      {/* Interactive Skill Checkboxes (Lectures 25-36) */}
                      <div className="space-y-2 mb-4">
                        {step.skills.map((skill, sIdx) => {
                          const isDone = activeCompletedSkills.includes(skill);
                          return (
                            <div
                              key={sIdx}
                              onClick={() => handleToggleSkill(skill)}
                              className={`p-2 rounded-xl border flex items-center gap-2.5 cursor-pointer select-none transition-all ${
                                isDone
                                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                                  : 'bg-black/30 border-white/5 hover:border-white/20 text-slate-300'
                              }`}
                            >
                              <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                                isDone
                                  ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-black'
                                  : 'border-slate-500 bg-black/40'
                              }`}>
                                {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span className={`text-xs font-medium ${isDone ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                                {skill}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                    </div>

                    {/* Pro Tips & Project Ideas */}
                    <div className="pt-3 border-t border-white/5 space-y-2 text-xs">
                      {step.learningTips && (
                        <div className="flex items-start gap-2 text-amber-300/90 bg-amber-500/5 p-2 rounded-xl border border-amber-500/15">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-relaxed">{step.learningTips}</span>
                        </div>
                      )}

                      {step.projectIdea && (
                        <div className="flex items-start gap-2 text-cyan-300/90 bg-cyan-500/5 p-2 rounded-xl border border-cyan-500/15">
                          <FolderGit2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-relaxed">
                            <strong className="text-cyan-200">Build:</strong> {step.projectIdea}
                          </span>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
