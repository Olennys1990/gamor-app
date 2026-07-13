import { useState, useEffect } from 'react';
import { LanguageContext } from './LanguageContext';
import esTranslations from '../translations/es.json';
import enTranslations from '../translations/en.json';

const translations = {
  es: esTranslations,
  en: enTranslations,
};

const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem('language');
  return savedLanguage || 'es';
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'es' ? 'en' : 'es'));
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};