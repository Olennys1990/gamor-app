import { useLanguage } from '../hooks/useLanguage';
import './Home.css';

export const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="home-page">
      {/* MainBoard */}
      <section className="mainboard-section">
        <div className="mainboard-area left">
          <p>Área 1</p>
        </div>
        <div className="mainboard-area center">
          <p>Área 2</p>
        </div>
        <div className="mainboard-area right">
          <p>Área 3</p>
        </div>
      </section>

      {/* Título "Trending Categories" */}
      <div className="categories-title-wrapper">
        <h2 className="categories-title">{t('categoriesTitle')}</h2>
      </div>

      {/* Grid de Categorías */}
      <section className="categories-section">
        <div className="categories-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="category-item">
              <p>Categoría {index + 1}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};