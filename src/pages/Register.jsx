import { useLanguage } from '../hooks/useLanguage';
import './Register.css';

export const Register = () => {
  const { t } = useLanguage();

  return (
    <div className="register-page">
      <h2>{t('registerTitle')}</h2>
      <p>{t('registerDescription')}</p>
    </div>
  );
};