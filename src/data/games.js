// Parties
export const partyData = [
  { id: 1, name: 'Dr Team', members: ['Dr', 'Mia'], game: 'COD Warzone' },
  { id: 2, name: 'Mia Plays', members: ['Mia', 'Juan'], game: 'COD Warzone' },
  { id: 3, name: 'Keoxer', members: ['Keoxer', 'Ana'], game: 'COD Warzone' },
  { id: 4, name: 'Nickmercs', members: ['Nick', 'Sofia'], game: 'COD Warzone' },
  { id: 5, name: 'Los Tiburones', members: ['Tibu', 'Rayo'], game: 'Fortnite' },
  { id: 6, name: 'Team Fuego', members: ['Fuego', 'Llama'], game: 'Fortnite' },
  { id: 7, name: 'COD Warriors', members: ['War', 'Peace'], game: 'COD Warzone' },
  { id: 8, name: 'Los Asesinos', members: ['Sniper', 'Rambo'], game: 'COD Warzone' },
  { id: 9, name: 'Team Noob', members: ['Noob1', 'Noob2'], game: 'COD Warzone' },
  { id: 10, name: 'Los Constructores', members: ['Alex', 'Mia'], game: 'Fortnite' },
  { id: 11, name: 'Team Rush', members: ['Rush', 'Blaze'], game: 'Fortnite' },
  { id: 12, name: 'Los Guerreros', members: ['Warrior', 'Shadow'], game: 'Fortnite' },
  { id: 13, name: 'Team Mid', members: ['Mid', 'Jungle'], game: 'League of Legends' },
  { id: 14, name: 'Los Top Laners', members: ['Top', 'Support'], game: 'League of Legends' },
  { id: 15, name: 'Valorant Squad', members: ['Ace', 'Phoenix'], game: 'Valorant' },
  { id: 16, name: 'Team Radiant', members: ['Raze', 'Breach'], game: 'Valorant' },
  { id: 17, name: 'Los Santos Crew', members: ['Franklin', 'Michael'], game: 'GTA V' },
  { id: 18, name: 'Block Builders', members: ['Steve', 'Alex'], game: 'Minecraft' },
  { id: 19, name: 'Impostors', members: ['Red', 'Blue'], game: 'Among Us' },
  { id: 20, name: 'Los Rocket', members: ['Rocket', 'Groot'], game: 'Rocket League' },
];

// Matches
export const matchesData = [
  { id: 1, name: 'COD Warzone Match 1', players: 12, game: 'COD Warzone' },
  { id: 2, name: 'COD Warzone Match 2', players: 8, game: 'COD Warzone' },
  { id: 3, name: 'COD Warzone Match 3', players: 15, game: 'COD Warzone' },
  { id: 4, name: 'Fortnite Battle Royale', players: 45, game: 'Fortnite' },
  { id: 5, name: 'Fortnite Arena', players: 30, game: 'Fortnite' },
  { id: 6, name: 'League of Legends Ranked', players: 10, game: 'League of Legends' },
  { id: 7, name: 'Valorant Competitive', players: 10, game: 'Valorant' },
  { id: 8, name: 'GTA V Online', players: 20, game: 'GTA V' },
  { id: 9, name: 'Minecraft Survival', players: 15, game: 'Minecraft' },
  { id: 10, name: 'Among Us Game', players: 8, game: 'Among Us' },
];

// Streams
export const streamsData = [
  { id: 1, name: 'COD Warzone Live', streamer: 'Dr Team', viewers: 120, game: 'COD Warzone' },
  { id: 2, name: 'COD Warzone Night', streamer: 'Mia Plays', viewers: 85, game: 'COD Warzone' },
  { id: 3, name: 'COD Warzone Pro', streamer: 'Nickmercs', viewers: 200, game: 'COD Warzone' },
  { id: 4, name: 'Fortnite Live', streamer: 'Los Constructores', viewers: 45, game: 'Fortnite' },
  { id: 5, name: 'Fortnite Tournament', streamer: 'Team Rush', viewers: 30, game: 'Fortnite' },
  { id: 6, name: 'League of Legends Live', streamer: 'Team Mid', viewers: 10, game: 'League of Legends' },
  { id: 7, name: 'Valorant Live', streamer: 'Valorant Squad', viewers: 10, game: 'Valorant' },
  { id: 8, name: 'GTA V Roleplay', streamer: 'Los Santos Crew', viewers: 20, game: 'GTA V' },
  { id: 9, name: 'Minecraft Hardcore', streamer: 'Block Builders', viewers: 15, game: 'Minecraft' },
  { id: 10, name: 'Among Us Live', streamer: 'Impostors', viewers: 8, game: 'Among Us' },
];

export const defaultFeatured = {
  id: 0,
  name: 'Fortnite New Season',
  game: 'Fortnite',
  timer: '11 : 45',
  image: 'fortnite-season.jpg',
  action: 'Join Live Stream',
  participants: [],
  type: 'game',
};