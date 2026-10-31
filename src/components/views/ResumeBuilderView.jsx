import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  FileText, 
  Download, 
  Sparkles, 
  Plus, 
  Trash2, 
  Printer,
  Briefcase,
  GraduationCap,
  Wrench,
  User
} from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { useTitle } from '../../hooks/useTitle';

/**
 * ResumeBuilderView Component
 * Dual-pane live resume editor with real-time preview and PDF export.
 * Demonstrates: useParams, useNavigate, useState, useEffect, useRef, useMemo, useCallback, useTitle.
 */
export default function ResumeBuilderView({
  resumeData = {},
  onUpdateResume,
  activeTemplate = 'modern',
  onSelectTemplate,
  liveAtsScore = 85,
  addToast
}) {
  useTitle('Live Split-Screen Resume Builder');

  // React Router Params & Navigation
  const { templateId } = useParams();
  const navigate = useNavigate();

  const resumePreviewRef = useRef(null);
  
  // useState hooks for UI interaction states
  const [isExporting, setIsExporting] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');

  // Handle template selection via dynamic URL params (/builder/:templateId)
  useEffect(() => {
    if (templateId && ['modern', 'minimal', 'executive', 'emerald'].includes(templateId)) {
      if (onSelectTemplate) onSelectTemplate(templateId);
    }
  }, [templateId, onSelectTemplate]);

  // useCallback hook for memoized personal info change handler
  const handlePersonalChange = useCallback((field, value) => {
    if (onUpdateResume) {
      onUpdateResume(prev => ({
        ...prev,
        personal: { ...(prev.personal || {}), [field]: value }
      }));
    }
  }, [onUpdateResume]);

  // Handle Experience changes
  const handleExperienceChange = useCallback((id, field, value) => {
    if (onUpdateResume) {
      onUpdateResume(prev => ({
        ...prev,
        experiences: (prev.experiences || []).map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
      }));
    }
  }, [onUpdateResume]);

  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      role: 'New Position',
      company: 'Company Name',
      location: 'City, State',
      startDate: '2023-01',
      endDate: 'Present',
      current: true,
      bullets: ['Accomplished key project milestone, improving system throughput by 25% through modern architecture.']
    };
    if (onUpdateResume) {
      onUpdateResume(prev => ({
        ...prev,
        experiences: [newExp, ...(prev.experiences || [])]
      }));
    }
    if (addToast) addToast('New experience entry added!', 'info');
  };

  const deleteExperience = useCallback((id) => {
    if (onUpdateResume) {
      onUpdateResume(prev => ({
        ...prev,
        experiences: (prev.experiences || []).filter(exp => exp.id !== id)
      }));
    }
    if (addToast) addToast('Experience deleted.', 'info');
  }, [onUpdateResume, addToast]);

  const addBullet = (expId) => {
    if (onUpdateResume) {
      onUpdateResume(prev => ({
        ...prev,
        experiences: (prev.experiences || []).map(exp => {
          if (exp.id === expId) {
            return { ...exp, bullets: [...(exp.bullets || []), 'Engineered new feature leading to quantifiable metric gains.'] };
          }
          return exp;
        })
      }));
    }
  };

  const updateBullet = (expId, bulletIdx, val) => {
    if (onUpdateResume) {
      onUpdateResume(prev => ({
        ...prev,
        experiences: (prev.experiences || []).map(exp => {
          if (exp.id === expId) {
            const newBullets = [...(exp.bullets || [])];
            newBullets[bulletIdx] = val;
            return { ...exp, bullets: newBullets };
          }
          return exp;
        })
      }));
    }
  };

  const deleteBullet = (expId, bulletIdx) => {
    if (onUpdateResume) {
      onUpdateResume(prev => ({
        ...prev,
        experiences: (prev.experiences || []).map(exp => {
          if (exp.id === expId) {
            const newBullets = (exp.bullets || []).filter((_, idx) => idx !== bulletIdx);
            return { ...exp, bullets: newBullets };
          }
          return exp;
        })
      }));
    }
  };

  // PDF Export
  const exportPDF = async () => {
    if (!resumePreviewRef.current) return;
    setIsExporting(true);
    if (addToast) addToast('Generating high-resolution ATS PDF...', 'info');

    try {
      const element = resumePreviewRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.personal?.fullName?.replace(/\s+/g, '_') || 'Resume'}_Resumate.pdf`);

      if (addToast) addToast('PDF downloaded successfully!', 'success');
    } catch (err) {
      console.error(err);
      if (addToast) addToast('Error exporting PDF. Please use browser print as fallback.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const printResume = () => {
    window.print();
  };

  // useMemo hook for total word count computation
  const totalWordCount = useMemo(() => {
    const p = resumeData.personal || {};
    const text = `${p.fullName || ''} ${p.roleTitle || ''} ${resumeData.summary || ''}`;
    return text.trim().split(/\s+/).filter(Boolean).length;
  }, [resumeData]);

  return (
    <div className="space-y-6 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Bar: Controls & Real-Time Score */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10 no-print">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>LIVE SPLIT-SCREEN RESUME BUILDER</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Dual-Pane Resume Architect & Vector PDF Exporter
          </h1>
        </div>

        {/* Live Score Bar & Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Dynamic Live Score */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 shadow-sm">
            <span className="text-xs font-mono text-slate-400">Live ATS:</span>
            <span className="text-sm font-mono font-extrabold text-cyan-300">
              {liveAtsScore}%
            </span>
          </div>

          {/* Dynamic Route Params Theme Selector */}
          <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-white/10">
            {['modern', 'minimal', 'executive', 'emerald'].map((thm) => (
              <button
                key={thm}
                onClick={() => navigate(`/builder/${thm}`)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                  activeTemplate === thm
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {thm}
              </button>
            ))}
          </div>

          {/* Actions */}
          <button
            onClick={exportPDF}
            disabled={isExporting}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-glow-cyan flex items-center gap-1.5 transition-all transform active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> {isExporting ? 'Exporting...' : 'PDF Export'}
          </button>

          <button
            onClick={printResume}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-white/10 flex items-center gap-1 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" /> Print
          </button>
        </div>
      </div>

      {/* Dual Pane Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PANE: Form Controls (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4 no-print">
          
          {/* Section Selector Chips */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-900/60 rounded-xl border border-white/5">
            {[
              { id: 'personal', label: 'Contact', icon: User },
              { id: 'summary', label: 'Summary', icon: Sparkles },
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'skills', label: 'Skills', icon: Wrench },
              { id: 'education', label: 'Education', icon: GraduationCap }
            ].map(sec => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeSection === sec.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {sec.label}
                </button>
              );
            })}
          </div>

          {/* Form Content */}
          <GlassCard glowColor="cyan" className="space-y-4 max-h-[750px] overflow-y-auto pr-2">
            
            {/* 1. Personal / Contact */}
            {activeSection === 'personal' && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase">Contact & Personal Details</h3>
                
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={resumeData.personal?.fullName || ''}
                    onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Target Professional Title</label>
                  <input
                    type="text"
                    value={resumeData.personal?.roleTitle || ''}
                    onChange={(e) => handlePersonalChange('roleTitle', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={resumeData.personal?.email || ''}
                      onChange={(e) => handlePersonalChange('email', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Phone</label>
                    <input
                      type="text"
                      value={resumeData.personal?.phone || ''}
                      onChange={(e) => handlePersonalChange('phone', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Location</label>
                    <input
                      type="text"
                      value={resumeData.personal?.location || ''}
                      onChange={(e) => handlePersonalChange('location', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">LinkedIn Profile</label>
                    <input
                      type="text"
                      value={resumeData.personal?.linkedin || ''}
                      onChange={(e) => handlePersonalChange('linkedin', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">GitHub / Portfolio URL</label>
                  <input
                    type="text"
                    value={resumeData.personal?.github || ''}
                    onChange={(e) => handlePersonalChange('github', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                  />
                </div>
              </div>
            )}

            {/* 2. Summary */}
            {activeSection === 'summary' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase">Executive Summary</h3>
                  <span className="text-[10px] font-mono text-slate-400">
                    {totalWordCount} words
                  </span>
                </div>
                
                <textarea
                  rows={6}
                  value={resumeData.summary || ''}
                  onChange={(e) => onUpdateResume && onUpdateResume(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="Summarize your years of experience, core technical competencies, and standout quantifiable achievements..."
                  className="w-full p-3 rounded-lg glass-input text-xs font-sans text-slate-200 leading-relaxed resize-y"
                />
              </div>
            )}

            {/* 3. Work Experience */}
            {activeSection === 'experience' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase">Work Experience</h3>
                  <button
                    onClick={addExperience}
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[11px] font-medium flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Role
                  </button>
                </div>

                {(resumeData.experiences || []).map((exp, idx) => (
                  <div key={exp.id} className="p-3.5 rounded-xl bg-slate-900/70 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">#{idx + 1}. {exp.role || 'Position'}</span>
                      <button
                        onClick={() => deleteExperience(exp.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Delete Role"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={exp.role}
                        onChange={(e) => handleExperienceChange(exp.id, 'role', e.target.value)}
                        className="px-2.5 py-1.5 rounded glass-input text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                        className="px-2.5 py-1.5 rounded glass-input text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Start Date (e.g. 2022-03)"
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)}
                        className="px-2.5 py-1.5 rounded glass-input text-xs"
                      />
                      <input
                        type="text"
                        placeholder="End Date (e.g. Present)"
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)}
                        className="px-2.5 py-1.5 rounded glass-input text-xs"
                      />
                    </div>

                    {/* Bullets */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-mono text-slate-400 font-semibold">Accomplishment Bullets</label>
                        <button
                          onClick={() => addBullet(exp.id)}
                          className="text-[10px] text-cyan-400 hover:underline flex items-center gap-0.5"
                        >
                          <Plus className="w-2.5 h-2.5" /> Add Bullet
                        </button>
                      </div>

                      {(exp.bullets || []).map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-1.5">
                          <textarea
                            rows={2}
                            value={bullet}
                            onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)}
                            className="flex-1 p-2 rounded glass-input text-xs font-sans text-slate-200 resize-y"
                          />
                          <button
                            onClick={() => deleteBullet(exp.id, bIdx)}
                            className="text-slate-500 hover:text-red-400 p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 4. Skills */}
            {activeSection === 'skills' && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase">Categorized Skills</h3>
                
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Programming Languages</label>
                  <input
                    type="text"
                    value={resumeData.skills?.languages || ''}
                    onChange={(e) => onUpdateResume && onUpdateResume(prev => ({ ...prev, skills: { ...(prev.skills || {}), languages: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Frameworks & Libraries</label>
                  <input
                    type="text"
                    value={resumeData.skills?.frameworks || ''}
                    onChange={(e) => onUpdateResume && onUpdateResume(prev => ({ ...prev, skills: { ...(prev.skills || {}), frameworks: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Cloud, DevOps & Databases</label>
                  <input
                    type="text"
                    value={resumeData.skills?.cloudDatabases || ''}
                    onChange={(e) => onUpdateResume && onUpdateResume(prev => ({ ...prev, skills: { ...(prev.skills || {}), cloudDatabases: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Methodologies & Practices</label>
                  <input
                    type="text"
                    value={resumeData.skills?.methodologies || ''}
                    onChange={(e) => onUpdateResume && onUpdateResume(prev => ({ ...prev, skills: { ...(prev.skills || {}), methodologies: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                  />
                </div>
              </div>
            )}

            {/* 5. Education */}
            {activeSection === 'education' && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase">Education</h3>
                {(resumeData.education || []).map((edu, idx) => (
                  <div key={edu.id} className="p-3 rounded-xl bg-slate-900/60 border border-white/10 space-y-2">
                    <input
                      type="text"
                      placeholder="Degree (e.g. B.S. in Computer Science)"
                      value={edu.degree}
                      onChange={(e) => {
                        const newEdus = [...(resumeData.education || [])];
                        newEdus[idx].degree = e.target.value;
                        if (onUpdateResume) onUpdateResume(prev => ({ ...prev, education: newEdus }));
                      }}
                      className="w-full px-2.5 py-1.5 rounded glass-input text-xs"
                    />
                    <input
                      type="text"
                      placeholder="University / Institution"
                      value={edu.school}
                      onChange={(e) => {
                        const newEdus = [...(resumeData.education || [])];
                        newEdus[idx].school = e.target.value;
                        if (onUpdateResume) onUpdateResume(prev => ({ ...prev, education: newEdus }));
                      }}
                      className="w-full px-2.5 py-1.5 rounded glass-input text-xs"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Graduation Year"
                        value={edu.year}
                        onChange={(e) => {
                          const newEdus = [...(resumeData.education || [])];
                          newEdus[idx].year = e.target.value;
                          if (onUpdateResume) onUpdateResume(prev => ({ ...prev, education: newEdus }));
                        }}
                        className="px-2.5 py-1.5 rounded glass-input text-xs"
                      />
                      <input
                        type="text"
                        placeholder="GPA (Optional)"
                        value={edu.gpa}
                        onChange={(e) => {
                          const newEdus = [...(resumeData.education || [])];
                          newEdus[idx].gpa = e.target.value;
                          if (onUpdateResume) onUpdateResume(prev => ({ ...prev, education: newEdus }));
                        }}
                        className="px-2.5 py-1.5 rounded glass-input text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

          </GlassCard>
        </div>

        {/* RIGHT PANE: Live Rendered Resume Preview (lg:col-span-7) */}
        <div className="lg:col-span-7">
          <div className="sticky top-20">
            <div className="flex items-center justify-between mb-2 px-1 text-xs text-slate-400 font-mono no-print">
              <span>Paper Preview (A4 Dimensions)</span>
              <span className="text-cyan-400">Theme: {activeTemplate.toUpperCase()}</span>
            </div>

            {/* Rendered Document Sheet Container */}
            <div
              ref={resumePreviewRef}
              className={`resume-paper bg-white text-slate-900 rounded-xl shadow-2xl p-8 sm:p-10 min-h-[750px] font-sans text-xs leading-relaxed transition-all ${
                activeTemplate === 'executive'
                  ? 'border-t-8 border-slate-900 font-serif'
                  : activeTemplate === 'emerald'
                  ? 'border-t-8 border-emerald-600'
                  : activeTemplate === 'minimal'
                  ? 'border-0 font-sans'
                  : 'border-t-8 border-cyan-600'
              }`}
              style={{ color: '#0f172a' }}
            >
              {/* Header */}
              <div className="border-b pb-4 mb-4 border-slate-300">
                <h1 className="text-2xl font-black text-slate-950 tracking-tight uppercase">
                  {resumeData.personal?.fullName || 'Your Full Name'}
                </h1>
                <p className="text-xs font-bold text-slate-700 mt-0.5 tracking-wide uppercase">
                  {resumeData.personal?.roleTitle || 'Professional Role Title'}
                </p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600 mt-2 font-medium">
                  {resumeData.personal?.email && <span>{resumeData.personal.email}</span>}
                  {resumeData.personal?.phone && <span>• {resumeData.personal.phone}</span>}
                  {resumeData.personal?.location && <span>• {resumeData.personal.location}</span>}
                  {resumeData.personal?.linkedin && <span>• {resumeData.personal.linkedin}</span>}
                  {resumeData.personal?.github && <span>• {resumeData.personal.github}</span>}
                </div>
              </div>

              {/* Summary */}
              {resumeData.summary && (
                <div className="mb-4">
                  <h2 className="text-[11px] font-extrabold tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                    Professional Summary
                  </h2>
                  <p className="text-[11px] text-slate-700 leading-normal">
                    {resumeData.summary}
                  </p>
                </div>
              )}

              {/* Work Experience */}
              {resumeData.experiences && resumeData.experiences.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-[11px] font-extrabold tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2">
                    Professional Experience
                  </h2>

                  <div className="space-y-3">
                    {resumeData.experiences.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold text-slate-950 text-[11px]">{exp.role}</span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {exp.startDate} – {exp.endDate}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline text-[10.5px] text-slate-600 font-semibold mb-1">
                          <span>{exp.company}</span>
                          <span className="text-[10px] text-slate-500">{exp.location}</span>
                        </div>

                        <ul className="list-disc pl-4 space-y-1 text-[10.5px] text-slate-700">
                          {(exp.bullets || []).map((bullet, idx) => (
                            <li key={idx} className="leading-tight">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {resumeData.skills && (
                <div className="mb-4">
                  <h2 className="text-[11px] font-extrabold tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                    Technical Skills & Proficiencies
                  </h2>
                  <div className="space-y-1 text-[10.5px] text-slate-700">
                    {resumeData.skills.languages && (
                      <p><strong className="text-slate-900">Languages:</strong> {resumeData.skills.languages}</p>
                    )}
                    {resumeData.skills.frameworks && (
                      <p><strong className="text-slate-900">Frameworks:</strong> {resumeData.skills.frameworks}</p>
                    )}
                    {resumeData.skills.cloudDatabases && (
                      <p><strong className="text-slate-900">Cloud & Tools:</strong> {resumeData.skills.cloudDatabases}</p>
                    )}
                    {resumeData.skills.methodologies && (
                      <p><strong className="text-slate-900">Methodologies:</strong> {resumeData.skills.methodologies}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Education */}
              {resumeData.education && resumeData.education.length > 0 && (
                <div>
                  <h2 className="text-[11px] font-extrabold tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                    Education
                  </h2>
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-baseline text-[10.5px]">
                      <div>
                        <span className="font-bold text-slate-950">{edu.degree}</span>
                        <span className="text-slate-600"> — {edu.school}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{edu.year}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
