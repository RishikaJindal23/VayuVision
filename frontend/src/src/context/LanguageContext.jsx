import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from '../utils/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    try {
      const saved = localStorage.getItem('resumate_selected_lang');
      return (saved && TRANSLATIONS[saved]) ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const changeLanguage = (langCode) => {
    if (TRANSLATIONS[langCode]) {
      setCurrentLang(langCode);
      try {
        localStorage.setItem('resumate_selected_lang', langCode);
      } catch (err) {
        console.warn('Failed to save language in localStorage', err);
      }
    }
  };

  useEffect(() => {
    // Reflect language in HTML root for accessibility
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // Current translation object
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <LanguageContext.Provider value={{ currentLang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
