import { memo } from 'react';
import { getParticipants } from '../utils/getParticipants';

export const FeaturedPanel = memo(({ currentItem, isLoggedIn, loggedUser, gameImageUrl }) => {
  const renderParticipants = () => {
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
                <img src={member.avatar} alt={member.name} className="avatar-image" />
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
  };

  return (
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
              src={gameImageUrl}
              alt={currentItem.game}
              className="panel-background-image"
              style={{ opacity: 0, transition: 'opacity 0.4s ease' }}
              onLoad={(e) => {
                e.target.style.opacity = '1';
              }}
            />
            <div className="panel-overlay">
              <div className="panel-participants">
                {renderParticipants()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});