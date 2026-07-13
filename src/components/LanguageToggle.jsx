import { useLanguage } from '../hooks/useLanguage';
import './LanguageToggle.css';

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  const isEnglish = language === 'en';

  return (
    <button className="language-toggle" onClick={toggleLanguage} aria-label="Toggle language">
      <div className={`lang-track ${isEnglish ? 'en' : 'es'}`}>
        <div className="lang-thumb">
          <span className="lang-flag">{isEnglish ? '🇬🇧' : '🇪🇸'}</span>
        </div>
      </div>
    </button>
  );
};