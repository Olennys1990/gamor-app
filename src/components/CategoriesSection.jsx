import { memo } from 'react';
import { categories } from '../data/categories';

export const CategoriesSection = memo(() => {
  return (
    <>
      <div className="categories-title-wrapper">
        <h2 className="categories-title">Trending Categories</h2>
      </div>
      <section className="categories-section">
        <div className="categories-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="category-item">
              <span className="category-number">/{String(cat.id).padStart(2, '0')}</span>
              <span className="category-name">{cat.name}</span>
              {cat.subtitle && <span className="category-subtitle">{cat.subtitle}</span>}
            </div>
          ))}
        </div>
      </section>
    </>
  );
});