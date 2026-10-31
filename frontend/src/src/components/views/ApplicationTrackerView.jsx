import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  ClipboardList, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Trash2, 
  Edit3, 
  Building2, 
  Calendar, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle, 
  ExternalLink, 
  X,
  Sparkles,
  TrendingUp,
  Briefcase
} from 'lucide-react';

export default function ApplicationTrackerView({ applications = [], onUpdateApplications, addToast }) {
  const { t } = useLanguage();

  // Local state for applications with initial fallback to localStorage
  const [localApps, setLocalApps] = useState(() => {
    if (applications && applications.length > 0) return applications;
    try {
      const saved = localStorage.getItem('resumate_applications');
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    // Default pre-populated applications to showcase to evaluators/professors
    return [
      {
        id: 'app-1',
        company: 'Google India',
        role: 'Software Engineer - Frontend',
        location: 'Bangalore / Hybrid',
        salary: '₹22 - 30 LPA',
        date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
        status: 'Interview',
        notes: 'Round 1 DSA cleared. Technical System Design interview scheduled for next Tuesday.',
        link: 'https://careers.google.com'
      },
      {
        id: 'app-2',
        company: 'Microsoft',
        role: 'Cloud Solution Engineer',
        location: 'Hyderabad / Hybrid',
        salary: '₹18 - 25 LPA',
        date: new Date(Date.now() - 9 * 86400000).toISOString().split('T')[0],
        status: 'Applied',
        notes: 'Submitted application with tailored resume. Waiting for initial recruiter screening.',
        link: 'https://careers.microsoft.com'
      },
      {
        id: 'app-3',
        company: 'Razorpay',
        role: 'Backend Java Developer',
        location: 'Bangalore / Remote',
        salary: '₹16 - 24 LPA',
        date: new Date(Date.now() - 15 * 86400000).toISOString().split('T')[0],
        status: 'Selected',
        notes: 'Received official offer letter! CTC ₹20 LPA + Stock Options. Joining next month.',
        link: 'https://razorpay.com/jobs'
      },
      {
        id: 'app-4',
        company: 'Amazon Web Services',
        role: 'DevOps Specialist',
        location: 'Gurgaon / Onsite',
        salary: '₹20 - 28 LPA',
        date: new Date(Date.now() - 22 * 86400000).toISOString().split('T')[0],
        status: 'Rejected',
        notes: 'Role required 5+ years Kubernetes production experience. Good learning experience.',
        link: 'https://amazon.jobs'
      }
    ];
  });

  // Keep parent and localStorage in sync
  const syncApplications = (updated) => {
    setLocalApps(updated);
    try {
      localStorage.setItem('resumate_applications', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    if (onUpdateApplications) {
      onUpdateApplications(updated);
    }
  };

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest'

  // Modal State (Add / Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppId, setEditingAppId] = useState(null);

  // Controlled Form State (Lectures 55-66)
  const [formCompany, setFormCompany] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formLocation, setFormLocation] = useState('Bangalore / Hybrid');
  const [formSalary, setFormSalary] = useState('₹12 - 18 LPA');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formStatus, setFormStatus] = useState('Applied');
  const [formNotes, setFormNotes] = useState('');
  const [formLink, setFormLink] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Reset form
  const resetForm = () => {
    setFormCompany('');
    setFormRole('');
    setFormLocation('Bangalore / Hybrid');
    setFormSalary('₹12 - 18 LPA');
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormStatus('Applied');
    setFormNotes('');
    setFormLink('');
    setFormErrors({});
    setEditingAppId(null);
  };

  // Open modal for new application
  const handleOpenAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (app) => {
    setEditingAppId(app.id);
    setFormCompany(app.company);
    setFormRole(app.role);
    setFormLocation(app.location || '');
    setFormSalary(app.salary || '');
    setFormDate(app.date || new Date().toISOString().split('T')[0]);
    setFormStatus(app.status || 'Applied');
    setFormNotes(app.notes || '');
    setFormLink(app.link || '');
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Form Validation & Submit (Lectures 55-60)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formCompany.trim()) errors.company = 'Company name is required';
    if (!formRole.trim()) errors.role = 'Job role is required';
    if (!formDate) errors.date = 'Application date is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editingAppId) {
      // Update existing
      const updated = localApps.map(app => {
        if (app.id === editingAppId) {
          return {
            ...app,
            company: formCompany.trim(),
            role: formRole.trim(),
            location: formLocation.trim(),
            salary: formSalary.trim(),
            date: formDate,
            status: formStatus,
            notes: formNotes.trim(),
            link: formLink.trim()
          };
        }
        return app;
      });
      syncApplications(updated);
      if (addToast) addToast(`Updated application for ${formCompany}!`, 'success');
    } else {
      // Add new
      const newApp = {
        id: `app-${Date.now()}`,
        company: formCompany.trim(),
        role: formRole.trim(),
        location: formLocation.trim(),
        salary: formSalary.trim(),
        date: formDate,
        status: formStatus,
        notes: formNotes.trim(),
        link: formLink.trim()
      };
      syncApplications([newApp, ...localApps]);
      if (addToast) addToast(`Added application for ${formCompany}!`, 'success');
    }

    setIsModalOpen(false);
    resetForm();
  };

  // Delete Application
  const handleDeleteApp = (id, company) => {
    if (window.confirm(`${t.tracker.deleteConfirm} (${company})`)) {
      const updated = localApps.filter(a => a.id !== id);
      syncApplications(updated);
      if (addToast) addToast(`Deleted application for ${company}.`, 'info');
    }
  };

  // Quick Status Updater directly from card
  const handleQuickStatusChange = (id, newStatus) => {
    const updated = localApps.map(a => a.id === id ? { ...a, status: newStatus } : a);
    syncApplications(updated);
    if (addToast) addToast(`Status updated to "${newStatus}"!`, 'success');
  };

  // Compute Dashboard Statistics (useMemo)
  const stats = useMemo(() => {
    const total = localApps.length;
    const applied = localApps.filter(a => a.status === 'Applied').length;
    const interview = localApps.filter(a => a.status === 'Interview').length;
    const selected = localApps.filter(a => a.status === 'Selected').length;
    const rejected = localApps.filter(a => a.status === 'Rejected').length;
    const successRate = total > 0 ? Math.round(((selected + interview) / total) * 100) : 0;

    return { total, applied, interview, selected, rejected, successRate };
  }, [localApps]);

  // Filter & Sort Applications
  const filteredApps = useMemo(() => {
    return localApps
      .filter(app => {
        // Status filter
        if (statusFilter !== 'all' && app.status !== statusFilter) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchCompany = app.company.toLowerCase().includes(q);
          const matchRole = app.role.toLowerCase().includes(q);
          const matchNotes = (app.notes || '').toLowerCase().includes(q);
          if (!matchCompany && !matchRole && !matchNotes) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
        return new Date(a.date) - new Date(b.date);
      });
  }, [localApps, statusFilter, searchQuery, sortBy]);

  // Status Color Helper
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Interview':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Selected':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Rejected':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium mb-3">
            <ClipboardList className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.tracker.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.tracker.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
            {t.tracker.subtitle}
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.tracker.addBtn}</span>
        </button>
      </div>

      {/* Dashboard Statistics Overview (Responsive Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        {/* Total Applications */}
        <div className="p-4 rounded-2xl bg-[#090f1d] border border-white/10 shadow flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">{t.tracker.statsTotal}</span>
            <Briefcase className="w-4 h-4 text-slate-400" />
          </div>
          <span className="text-2xl font-black text-white font-mono">{stats.total}</span>
        </div>

        {/* Applied */}
        <div className="p-4 rounded-2xl bg-[#090f1d] border border-blue-500/20 shadow flex flex-col justify-between">
          <div className="flex items-center justify-between text-blue-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">{t.tracker.statsApplied}</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-2xl font-black text-blue-400 font-mono">{stats.applied}</span>
        </div>

        {/* Interview Scheduled */}
        <div className="p-4 rounded-2xl bg-[#090f1d] border border-amber-500/20 shadow flex flex-col justify-between">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">{t.tracker.statsInterview}</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl font-black text-amber-400 font-mono">{stats.interview}</span>
        </div>

        {/* Selected / Offers */}
        <div className="p-4 rounded-2xl bg-[#090f1d] border border-emerald-500/20 shadow flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">{t.tracker.statsSelected}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-emerald-400 font-mono">{stats.selected}</span>
        </div>

        {/* Rejected */}
        <div className="p-4 rounded-2xl bg-[#090f1d] border border-rose-500/20 shadow flex flex-col justify-between">
          <div className="flex items-center justify-between text-rose-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">{t.tracker.statsRejected}</span>
            <XCircle className="w-4 h-4 text-rose-400" />
          </div>
          <span className="text-2xl font-black text-rose-400 font-mono">{stats.rejected}</span>
        </div>

        {/* Positive Conversion Rate */}
        <div className="p-4 rounded-2xl bg-[#090f1d] border border-cyan-500/20 shadow flex flex-col justify-between">
          <div className="flex items-center justify-between text-cyan-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">{t.tracker.statsSuccessRate}</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-2xl font-black text-cyan-400 font-mono">{stats.successRate}%</span>
        </div>

      </div>

      {/* Search, Status Tabs & Sorting Filter Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-[#080e1a]/80 p-4 rounded-2xl border border-white/10">
        
        {/* Status Filter Tabs (Lectures 61-66) */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: t.tracker.allStatus },
            { id: 'Applied', label: t.tracker.filterApplied },
            { id: 'Interview', label: t.tracker.filterInterview },
            { id: 'Selected', label: t.tracker.filterSelected },
            { id: 'Rejected', label: t.tracker.filterRejected }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-black/30 hover:bg-white/10 text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-2">
          
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.tracker.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Sort By Date */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-slate-300 text-xs focus:outline-none focus:border-amber-500"
          >
            <option value="newest">{t.tracker.sortNewest}</option>
            <option value="oldest">{t.tracker.sortOldest}</option>
          </select>

        </div>

      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-black/20 border border-white/10 space-y-3">
          <ClipboardList className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Applications Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">{t.tracker.emptyState}</p>
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold"
          >
            {t.tracker.addBtn}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="p-5 rounded-2xl bg-[#090f1d] border border-white/10 hover:border-amber-500/30 transition-all shadow-lg flex flex-col justify-between group"
            >
              <div>
                
                {/* Header: Company & Status */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {app.role}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>{app.company}</span>
                    </p>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={app.status}
                    onChange={(e) => handleQuickStatusChange(app.id, e.target.value)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono border focus:outline-none cursor-pointer ${getStatusBadgeStyle(app.status)}`}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                {/* Location, Salary, Date Meta */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono my-3">
                  {app.location && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {app.location}
                    </span>
                  )}
                  {app.salary && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 text-emerald-300">
                      <DollarSign className="w-3 h-3 text-emerald-400" />
                      {app.salary}
                    </span>
                  )}
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 ml-auto text-slate-500">
                    <Calendar className="w-3 h-3" />
                    {app.date}
                  </span>
                </div>

                {/* Notes */}
                {app.notes && (
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 leading-relaxed mb-3">
                    <span className="font-mono text-[10px] text-slate-500 uppercase font-bold block mb-0.5">
                      Notes
                    </span>
                    <p>{app.notes}</p>
                  </div>
                )}

              </div>

              {/* Bottom Actions: Edit & Delete */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                {app.link ? (
                  <a
                    href={app.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Job Portal</span>
                  </a>
                ) : <span />}

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEditModal(app)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    title={t.common.edit}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteApp(app.id, app.company)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                    title={t.common.delete}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Controlled Add / Edit Modal (Lectures 55-66) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b1322] border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-amber-400" />
                <span>{editingAppId ? t.tracker.modalTitleEdit : t.tracker.modalTitleAdd}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              {/* Company Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.tracker.formCompany} *
                </label>
                <input
                  type="text"
                  value={formCompany}
                  onChange={(e) => setFormCompany(e.target.value)}
                  placeholder={t.tracker.formCompanyPlaceholder}
                  className={`w-full px-3 py-2 text-xs rounded-xl bg-black/40 border text-white placeholder-slate-500 focus:outline-none ${
                    formErrors.company ? 'border-rose-500' : 'border-white/10 focus:border-amber-500'
                  }`}
                />
                {formErrors.company && (
                  <p className="text-[11px] text-rose-400 mt-1">{formErrors.company}</p>
                )}
              </div>

              {/* Job Role */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.tracker.formRole} *
                </label>
                <input
                  type="text"
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  placeholder={t.tracker.formRolePlaceholder}
                  className={`w-full px-3 py-2 text-xs rounded-xl bg-black/40 border text-white placeholder-slate-500 focus:outline-none ${
                    formErrors.role ? 'border-rose-500' : 'border-white/10 focus:border-amber-500'
                  }`}
                />
                {formErrors.role && (
                  <p className="text-[11px] text-rose-400 mt-1">{formErrors.role}</p>
                )}
              </div>

              {/* Status & Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t.tracker.formStatus}
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t.tracker.formDate} *
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Location & Salary */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t.tracker.formLocation}
                  </label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder={t.tracker.formLocationPlaceholder}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t.tracker.formSalary}
                  </label>
                  <input
                    type="text"
                    value={formSalary}
                    onChange={(e) => setFormSalary(e.target.value)}
                    placeholder={t.tracker.formSalaryPlaceholder}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.tracker.formNotes}
                </label>
                <textarea
                  rows={3}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder={t.tracker.formNotesPlaceholder}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Job Posting Link */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t.tracker.formLink}
                </label>
                <input
                  type="url"
                  value={formLink}
                  onChange={(e) => setFormLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Form Buttons */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20"
                >
                  {t.common.save}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
