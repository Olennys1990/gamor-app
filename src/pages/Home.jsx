import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Home.css';
import { partyData, matchesData, streamsData, defaultFeatured, availableGames} from '../data/games';
import { categories } from '../data/categories';

// Game images for the featured panel
import codWarzone from '../assets/COD-Warzone.jpg';
import fortnite from '../assets/Fortnite.jpg';
import gtaV from '../assets/GTA-V.jpg';
import leagueOfLegends from '../assets/League-of-Legends.jpg';
import valorant from '../assets/Valorant.jpg';

export const Home = () => {
  const { isLoggedIn, user: loggedUser, logout } = useAuth();

  const [filterType, setFilterType] = useState('party');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(defaultFeatured);

  const getGameImage = (game) => {
    const images = {
      'COD Warzone': codWarzone,
      'Fortnite': fortnite,
      'GTA V': gtaV,
      'League of Legends': leagueOfLegends,
      'Valorant': valorant,
    };
    return images[game] || fortnite;
  };

  const getDataByFilter = () => {
    switch (filterType) {
      case 'party':
        return partyData;
      case 'matches':
        return matchesData;
      case 'streams':
        return streamsData;
      default:
        return partyData;
    }
  };

  const getInputPlaceholder = () => {
    switch (filterType) {
      case 'party':
        return 'Search for a game to find parties...';
      case 'matches':
        return 'Search for a game to find matches...';
      case 'streams':
        return 'Search for a game to find streams...';
      default:
        return 'Search for a game...';
    }
  };

  const filteredData = getDataByFilter().filter((item) =>
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

  const handleAddToPanel = (item) => {
    if (!isLoggedIn) return;

    let updatedItem = { ...item };

    if (item.members) {
      const alreadyMember = item.members.some(
        (member) => member.name === loggedUser
      );
      if (!alreadyMember) {
        updatedItem.members = [
          ...item.members,
          { name: loggedUser, color: '#22c55e' },
        ];
      }
    }

    if (!item.members && (item.players || item.viewers)) {
      if (!updatedItem.participants) {
        updatedItem.participants = [];
      }
      const alreadyParticipant = updatedItem.participants.some(
        (p) => p.name === loggedUser
      );
      if (!alreadyParticipant) {
        updatedItem.participants.push({ name: loggedUser, color: '#22c55e' });
      }
    }

    setSelectedItem(updatedItem);
  };

  const getParticipants = (item) => {
    if (item.members && item.members.length > 0) {
      return { type: 'members', data: item.members };
    }

    if (item.participants && item.participants.length > 0) {
      return {
        type: 'membersWithCounter',
        data: item.participants,
        counter: item.players ? `${item.players} players` : `${item.viewers} watching`,
      };
    }

    if (item.players) {
      return { type: 'players', data: `${item.players} players` };
    }
    if (item.viewers) {
      return { type: 'viewers', data: `${item.viewers} watching` };
    }

    return { type: 'none', data: null };
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
                                  style={{ backgroundColor: member.color }}
                                >
                                  <span className="avatar-icon">👤</span>
                                  <span className="avatar-initial">
                                    {member.name.charAt(0).toUpperCase()}
                                  </span>
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
                </div>
                {/* --- ETIQUETAS DE JUEGOS (NUEVO) --- */}
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
                      {searchTerm || 'Todos los juegos'}
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
                            <span className="result-number">{index + 1}.</span>
                            <span className="result-name">{item.name}</span>
                            <span className="result-game">• {item.game}</span>
                          </div>
                          <div className="result-avatars">
                            {item.members?.map((member, idx) => (
                              <div
                                key={idx}
                                className="avatar-circle"
                                style={{ backgroundColor: member.color }}
                                title={member.name}
                              >
                                <span className="avatar-icon">👤</span>
                                <span className="avatar-initial">
                                  {member.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            ))}
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