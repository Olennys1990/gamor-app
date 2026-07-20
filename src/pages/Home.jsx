import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Home.css';
import { partyData, matchesData, streamsData, defaultFeatured} from '../data/games';
import { availableGames, gameImages } from '../data/gamesConfig';
import { categories } from '../data/categories';
import { getParticipants } from '../utils/getParticipants';
import { getDataByFilter, getInputPlaceholder } from '../utils/filterHelpers';
import { addToPanel } from '../utils/addToPanel';
import avatarLog from '../assets/avatars/AvatarLog.jpg'; 

export const Home = () => {
  const userAvatar = avatarLog;
  const { isLoggedIn, user: loggedUser, logout } = useAuth();
  const [filterType, setFilterType] = useState('party');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(defaultFeatured);

  const getGameImage = (game) => {
    return gameImages[game] || gameImages['Fortnite'];
  };

  const filteredData = getDataByFilter(filterType, partyData, matchesData, streamsData).filter((item) =>
    item.game.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItem = useMemo(() => {
    if (filteredData.length === 0) {
      return defaultFeatured;
    }
    const exists = filteredData.some(item => item.id === selectedItem.id);
    return exists ? selectedItem : filteredData[0];
  }, [filteredData, selectedItem]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };
  const handleClearFilter = () => {
    setSearchTerm('');    
    setFilterType('party'); 
    setSelectedItem(defaultFeatured);
};

  const handleAddToPanel = (item) => {
    if (!isLoggedIn) return;
    const updatedItem = addToPanel(item, loggedUser, userAvatar);
    setSelectedItem(updatedItem);
  };

  return (
    <div className="home-page">
      <section className="mainboard-section">
        {/* LEFT: Hero / Branding Area */}
        <div className="mainboard-area left">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="line-start">start</span>
              <span className="line-streaming">
                <span className="highlight">streaming</span>
                <span className="oval-decor streaming-oval"></span>
              </span>
              <span className="line-games">
                games
                <span className="oval-decor games-oval"></span>
              </span>
              <span className="line-differently">
                differently
                <span className="oval-decor differently-oval"></span>
              </span>
            </h1>
            <p className="hero-subtitle">
              gamor now has <span className="highlight-sub">stream party </span> platform
            </p>
            <div className="hero-actions">
              {isLoggedIn ? (
                <>
                  <span className="hero-user">Welcome, {loggedUser}</span>
                  <button className="hero-logout" onClick={logout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-signin">Sign in</Link>
                  <Link to="/register" className="btn-create">Create account</Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* CENTER: Featured Content Panel */}
        <div className="mainboard-area center">
          <div className="panel-center">
            <div className="panel-card">
              <div className="panel-header">
                <h2 className="panel-title">{currentItem.game || currentItem.name}</h2>
                <p className="panel-subtitle">{currentItem.id === 0 ? 'Featured' : currentItem.name}</p>
                <div className="panel-timer">{currentItem.timer || '00 : 00'}</div>
              </div>

              <div className="panel-image-wrapper">
                <img
                  key={currentItem.id}
                  src={getGameImage(currentItem.game)}
                  alt={currentItem.game}
                  className="panel-background-image"
                  style={{ opacity: 0, transition: 'opacity 0.4s ease' }}
                  onLoad={(e) => {
                    e.target.style.opacity = '1';
                  }}
                />
                <div className="panel-overlay">
                  <div className="panel-participants">
                    {(() => {
                      const participants = getParticipants(currentItem);
                      if (participants.type === 'members' || participants.type === 'membersWithCounter') {
                        const memberList = participants.data;
                        return (
                          <>
                            {participants.counter && (
                              <span className="panel-counter">
                                {participants.counter}
                                {isLoggedIn && loggedUser && <span className="panel-plus"> + </span>}
                              </span>
                            )}
                            {memberList.map((member, idx) => {
                              const isCurrentUser = isLoggedIn && member.name === loggedUser;
                              return (
                                <div
                                  key={idx}
                                  className={`panel-avatar ${isCurrentUser ? 'current-user' : ''}`}
                                  data-tooltip={isCurrentUser ? loggedUser : member.name}
                                >
                                 <img 
                                    src={member.avatar} 
                                    alt={member.name} 
                                    className="avatar-image" 
                                  />
                                  {isCurrentUser && <span className="current-user-badge">You</span>}
                                </div>
                              );
                            })}
                          </>
                        );
                      } else if (participants.type === 'players' || participants.type === 'viewers') {
                        return <span className="panel-counter">{participants.data}</span>;
                      }
                      return null;
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Search & Filter Panel */}
        <div className="mainboard-area right">
          <div className="search-panel">
            <div className="search-header">
              <div className="filter-section">
                <h3 className="filter-title">01. Choose Platform</h3>
                <div className="filter-tabs">
                  {['party', 'matches', 'streams'].map((type) => (
                    <button
                      key={type}
                      className={`filter-tab ${filterType === type ? 'active' : ''}`}
                      onClick={() => setFilterType(type)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="search-section">
                <h3 className="search-title">02. Searching Game</h3>
                <div className="search-input-group">
                  <input
                    type="text"
                    placeholder={getInputPlaceholder()}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  {searchTerm && (
                   <button 
                      className="btn-clear-filter" 
                      onClick={handleClearFilter}
                      title="Clear search"
                      aria-label="Clear search filter"
                    >
                    <svg 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="game-tags">
                  {availableGames.map((game) => (
                    <span
                      key={game}
                      className={`game-tag ${searchTerm.toLowerCase() === game.toLowerCase() ? 'active' : ''}`}
                      onClick={() => setSearchTerm(game)}
                    >
                      {game}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="search-results-wrapper">
              {filteredData.length > 0 ? (
                <div className="result-card">
                  <div className="result-header">
                    <span className="result-header-title">
                      {searchTerm || 'All games'}
                    </span>
                  </div>
                  {filteredData.map((item, index) => {
                    const isActive = currentItem && currentItem.id === item.id;
                    return (
                      <div
                        key={item.id}
                        className={`result-row ${isActive ? 'active' : ''}`}
                        onClick={() => handleSelectItem(item)}
                      >
                        <div className="result-row-content">
                          <div className="result-info">
                            <div className="result-info-top">
                              <span className="result-number">{index + 1}.</span>
                              <span className="result-name">{item.name}</span>
                            </div>
                            <span className="result-game">• {item.game}</span>
                          </div>
                          <div className="result-avatars">
                            {item.members?.slice(0, 3).map((member, idx) => (
                              <div key={idx} className="avatar-circle" title={member.name}>
                                <img src={member.avatar} alt={member.name} className="avatar-image" />
                              </div>
                            ))}
                            {item.members?.length > 3 && (
                              <div className="avatar-circle avatar-more" title={`+${item.members.length - 3} more`}>
                                <span className="avatar-more-text">+{item.members.length - 3}</span>
                              </div>
                            )}
                          </div>
                          <button
                            className={`add-button ${!isLoggedIn ? 'disabled' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              isLoggedIn && handleAddToPanel(item);
                            }}
                            disabled={!isLoggedIn}
                            title={!isLoggedIn ? 'Please login to join' : ''}
                          >
                            {isLoggedIn ? '+' : '🔒'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="no-results">
                  {searchTerm ? `No results found for "${searchTerm}"` : 'No hay resultados disponibles'}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Categories Section */}
      <div className="categories-title-wrapper">
        <h2 className="categories-title">Trending Categories</h2>
      </div>

      <section className="categories-section">
        <div className="categories-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="category-item">
              <span className="category-number">
                /{String(cat.id).padStart(2, '0')}
              </span>
              <span className="category-name">{cat.name}</span>
              {cat.subtitle && (
                <span className="category-subtitle">{cat.subtitle}</span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};