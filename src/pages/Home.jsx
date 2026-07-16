import { useState } from 'react';
import './Home.css';
import { partyData, matchesData, streamsData, defaultFeatured } from '../data/games';
import { categories } from '../data/categories'; 

// Game images for the featured panel
import codWarzone from '../assets/COD-Warzone.jpg';
import fortnite from '../assets/Fortnite.jpg';
import gtaV from '../assets/GTA-V.jpg';
import leagueOfLegends from '../assets/League-of-Legends.jpg';
import valorant from '../assets/Valorant.jpg';

export const Home = () => {
  const [filterType, setFilterType] = useState('party');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(defaultFeatured);

  // Maps game names to their respective images
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

  // Returns the data array based on the selected filter
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

  // Dynamic placeholder for the search input
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

  // Dynamic placeholder for the empty result card
  const getCardPlaceholder = () => {
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

  // Filter data based on search term (case-insensitive)
  const filteredData = getDataByFilter().filter((item) =>
    item.game.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add selected item to the central panel (replaces previous selection)
  const handleAddToPanel = (item) => {
    setSelectedItem(item);
  };

  // Extract participants info based on item type
  const getParticipants = (item) => {
    if (item.members) {
      return { type: 'members', data: item.members };
    } else if (item.players) {
      return { type: 'players', data: `${item.players} players` };
    } else if (item.viewers) {
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
              <button className="btn-create">Create account</button>
              <span className="btn-signin">Sign in</span>
            </div>
          </div>
        </div>

        {/* CENTER: Featured Content Panel */}
        <div className="mainboard-area center">
          <div className="panel-center">
            {selectedItem ? (
              <div className="panel-card">
                <div className="panel-header">
                  <h2 className="panel-title">{selectedItem.game || selectedItem.name}</h2>
                  <p className="panel-subtitle">
                    {selectedItem.id === 0 ? 'Join Live Stream' : selectedItem.name}
                  </p>
                  <div className="panel-timer">{selectedItem.timer || '00 : 00'}</div>
                </div>
                <div className="panel-image-wrapper">
                  <img
                    key={selectedItem.id}
                    src={getGameImage(selectedItem.game)}
                    alt={selectedItem.game}
                    className="panel-background-image"
                    style={{ opacity: 0, transition: 'opacity 0.4s ease' }}
                    onLoad={(e) => {
                      e.target.style.opacity = '1';
                    }}
                  />
                  <div className="panel-overlay">
                    <div className="panel-participants">
                      {(() => {
                        const participants = getParticipants(selectedItem);
                        if (participants.type === 'members') {
                          return participants.data.map((member, idx) => (
                            <div key={idx} className="panel-avatar">{member.charAt(0)}</div>
                          ));
                        } else if (participants.type === 'players' || participants.type === 'viewers') {
                          return <span className="panel-counter">{participants.data}</span>;
                        }
                        return null;
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="panel-placeholder">
                <p>Select a game from the search panel</p>
              </div>
            )}
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
              </div>
            </div>

            {/* Search Results */}
            <div className="search-results-wrapper">
              {searchTerm.length > 0 ? (
                filteredData.length > 0 ? (
                  <div className="result-card">
                    <div className="result-header">
                      <span className="result-header-title">{searchTerm}</span>
                      <button
                        className="sort-button"
                        onClick={() => console.log('Sort results')}
                        aria-label="Sort results"
                      >
                        <span className="sort-icon">↕</span>
                      </button>
                    </div>
                    {filteredData.map((item) => (
                      <div key={item.id} className="result-row">
                        <div className="result-info">
                          <span className="result-name">{item.name}</span>
                        </div>
                        <div className="result-avatars">
                          {item.members?.map((_, idx) => (
                            <div key={idx} className="avatar-circle">👤</div>
                          ))}
                        </div>
                        <button
                          className="add-button"
                          onClick={() => handleAddToPanel(item)}
                          aria-label={`Add ${item.name} to panel`}
                        >
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-results">No results found for "{searchTerm}"</p>
                )
              ) : (
                <div className="search-placeholder">
                  <p>{getCardPlaceholder()}</p>
                </div>
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
              <span className="category-number">/{String(cat.id).padStart(2, '0')}</span>
              <span className="category-name">{cat.name}</span>
              {cat.subtitle && <span className="category-subtitle">{cat.subtitle}</span>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};