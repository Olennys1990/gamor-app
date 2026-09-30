import { useAuth } from '../hooks/useAuth';
import { useGameBoard } from '../hooks/useGameBoard';
import { HeroSection } from '../components/HeroSection';
import { FeaturedPanel } from '../components/FeaturedPanel';
import { SearchPanel } from '../components/SearchPanel';
import { CategoriesSection } from '../components/CategoriesSection';
import { gameImages } from '../data/gamesConfig';
import avatarLog from '../assets/avatars/AvatarLog.jpg';
import './Home.css';

export const Home = () => {
  const { isLoggedIn, user: loggedUser, logout } = useAuth();
  const userAvatar = avatarLog;

  const {
    filterType,
    searchTerm,
    filteredData,
    currentItem,
    isLoading,
    isError,
    handleSelectItem,
    handleSetFilterType,
    handleSetSearchTerm,
    handleClearFilter,
    handleAddToPanel,
  } = useGameBoard(isLoggedIn, loggedUser, userAvatar);

  const currentGameImage = gameImages[currentItem.game] || gameImages['Fortnite'];

  if (isLoading) {
    return (
      <div className="home-loading">
        <div className="spinner"></div>
        <p>Cargando juegos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="home-error">
        <p>❌ Ups, algo salió mal al cargar los datos.</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="home-page">
      <section className="mainboard-section">
        {/* Left: Hero */}
        <HeroSection 
          isLoggedIn={isLoggedIn} 
          user={loggedUser} 
          onLogout={logout} 
        />

        {/* Center: Featured */}
        <FeaturedPanel 
          currentItem={currentItem} 
          isLoggedIn={isLoggedIn} 
          loggedUser={loggedUser} 
          gameImageUrl={currentGameImage}
        />

        {/* Right: Search */}
        <SearchPanel
          filterType={filterType}
          onFilterChange={handleSetFilterType}
          searchTerm={searchTerm}
          onSearchChange={handleSetSearchTerm}
          onClearFilter={handleClearFilter}
          filteredData={filteredData}
          currentItem={currentItem}
          onSelectItem={handleSelectItem}
          onAddToPanel={handleAddToPanel}
          isLoggedIn={isLoggedIn}
        />
      </section>

      <CategoriesSection />
    </div>
  );
};