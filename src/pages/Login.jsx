import { useLanguage } from '../hooks/useLanguage';
import './Login.css';

export const Login = () => {
  const { t } = useLanguage();

  return (
    <div className="login-page">
      <h2>{t('loginTitle')}</h2>
      <p>{t('loginDescription')}</p>
    </div>
  );
};