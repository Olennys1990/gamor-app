export const getDataByFilter = (filterType, partyData, matchesData, streamsData) => {
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

export const getInputPlaceholder = (filterType) => {
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