import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Cpu, 
  Briefcase, 
  ClipboardList, 
  Compass, 
  Linkedin, 
  FileEdit, 
  ScanSearch, 
  Mail, 
  HelpCircle, 
  User, 
  Menu, 
  X, 
  Languages,
  Sparkles
} from 'lucide-react';

export default function Navbar({ user, onOpenAuthModal }) {
  const { currentLang, changeLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: t.nav.home, icon: Cpu },
    { to: '/jobs', label: t.nav.jobs, icon: Briefcase, highlight: true },
    { to: '/tracker', label: t.nav.tracker, icon: ClipboardList, highlight: true },
    { to: '/roadmap', label: t.nav.roadmap, icon: Compass, highlight: true },
    { to: '/linkedin-analyzer', label: t.nav.linkedin, icon: Linkedin, highlight: true },
    { to: '/builder', label: t.nav.builder, icon: FileEdit },
    { to: '/scanner', label: t.nav.scanner, icon: ScanSearch },
    { to: '/cover-letter', label: t.nav.coverLetter, icon: Mail },
    { to: '/help-desk', label: t.nav.helpDesk, icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#060a12]/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div 
            onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 p-0.5 shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-[#060a12] rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                  {t.nav.brand}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold border border-cyan-500/40">
                  v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden md:block">
                {t.nav.brandSubtitle}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden 2xl:flex items-center gap-1 bg-black/40 p-1.5 rounded-2xl border border-white/10">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 font-black'
                        : item.highlight
                        ? 'text-cyan-300 hover:text-white hover:bg-white/5'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Medium Screen Navigation (Core Links) */}
          <nav className="hidden xl:flex 2xl:hidden items-center gap-1 bg-black/40 p-1.5 rounded-2xl border border-white/10">
            {navLinks.slice(0, 5).map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 font-black'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Language Switcher & Profile Actions */}
          <div className="flex items-center gap-2.5">
            
            {/* Prominent Language Selector (Feature 4) */}
            <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-cyan-500/30">
              <Languages className="w-3.5 h-3.5 text-cyan-400 ml-1 hidden sm:block" />
              
              <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                  currentLang === 'en'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>

              <button
                onClick={() => changeLanguage('hi')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                  currentLang === 'hi'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="हिन्दी (Hindi)"
              >
                हिन्दी
              </button>

              <button
                onClick={() => changeLanguage('pa')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                  currentLang === 'pa'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="ਪੰਜਾਬੀ (Punjabi)"
              >
                ਪੰਜਾਬੀ
              </button>
            </div>

            {/* User Profile / Guest Mode Pill */}
            {user && (
              <button
                onClick={onOpenAuthModal}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all"
              >
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span className="max-w-[100px] truncate">{user.name || t.nav.guest}</span>
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl bg-white/5 text-slate-300 hover:text-white border border-white/10"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-white/10 space-y-1 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                        isActive
                          ? 'bg-cyan-500 text-slate-950 font-black'
                          : 'bg-white/5 text-slate-300 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Mobile Auth Button */}
            {user && (
              <button
                onClick={() => { setIsMobileMenuOpen(false); onOpenAuthModal(); }}
                className="w-full py-2.5 rounded-xl bg-white/10 text-xs font-bold text-slate-200 flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-cyan-400" />
                <span>{user.name} ({user.tier || t.nav.guest})</span>
              </button>
            )}
          </div>
        )}

      </div>
    </header>
  );
}
