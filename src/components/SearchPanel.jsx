import { memo } from 'react';
import { availableGames } from '../data/gamesConfig';
import { getInputPlaceholder } from '../utils/filterHelpers';

export const SearchPanel = memo(({
  filterType,
  onFilterChange,
  searchTerm,
  onSearchChange,
  onClearFilter,
  filteredData,
  currentItem,
  onSelectItem,
  onAddToPanel,
  isLoggedIn
}) => {
  return (
    <div className="mainboard-area right">
      <div className="search-panel">
        <div className="search-header">
          {/* Filter */}
          <div className="filter-section">
            <h3 className="filter-title">01. Choose Platform</h3>
            <div className="filter-tabs">
              {['party', 'matches', 'streams'].map((type) => (
                <button
                  key={type}
                  className={`filter-tab ${filterType === type ? 'active' : ''}`}
                  onClick={() => onFilterChange(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="search-section">
            <h3 className="search-title">02. Searching Game</h3>
            <div className="search-input-group">
              <input
                type="text"
                placeholder={getInputPlaceholder()}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button className="btn-clear-filter" onClick={onClearFilter} title="Clear search">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                  onClick={() => onSearchChange(game)}
                >
                  {game}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="search-results-wrapper">
          {filteredData.length > 0 ? (
            <div className="result-card">
              <div className="result-header">
                <span className="result-header-title">{searchTerm || 'All games'}</span>
              </div>
              {filteredData.map((item, index) => {
                const isActive = currentItem && currentItem.id === item.id;
                return (
                  <div
                    key={item.id}
                    className={`result-row ${isActive ? 'active' : ''}`}
                    onClick={() => onSelectItem(item)}
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
                          isLoggedIn && onAddToPanel(item);
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
  );
});