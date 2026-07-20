export const getParticipants = (item) => {
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