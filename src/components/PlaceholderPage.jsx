import './PlaceholderPage.css';

export const PlaceholderPage = ({ title, message }) => {
  return (
    <div className="placeholder-page">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};