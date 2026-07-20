
import { members } from './members';


export const partyData = [
  { id: 1, name: 'Dr Team', members: [members.dr, members.mia], game: 'COD Warzone' },
  { id: 2, name: 'Mia Plays', members: [members.mia, members.juan], game: 'COD Warzone' },
  { id: 3, name: 'Nickmercs Team', members: [members.nick, members.sofia], game: 'COD Warzone' },
  { id: 4, name: 'Keoxer Squad', members: [members.keoxer, members.ana, members.luis], game: 'COD Warzone' },
  { id: 5, name: 'Los Constructores', members: [members.alex, members.mia, members.carlos, members.sky, members.warrior], game: 'Fortnite' },
  { id: 6, name: 'Team Rush', members: [members.rush, members.blaze, members.sky], game: 'Fortnite' },
  { id: 7, name: 'Los Guerreros', members: [members.warrior, members.shadow, members.storm], game: 'Fortnite' },  
  { id: 8, name: 'Block Builders', members: [members.steve, members.alex, members.herobrine, members.enderman, members.phoenix, members.breach], game: 'Fortnite' },
  { id: 9, name: 'Team Mid', members: [members.mid, members.jungle, members.top], game: 'League of Legends' },
  { id: 10, name: 'Los Top Laners', members: [members.top, members.support, members.adc, members.mid], game: 'League of Legends' },
  { id: 11, name: 'Valorant Squad', members: [members.ace, members.phoenix], game: 'Valorant' },  
  { id: 12, name: 'Impostors', members: [members.red, members.blue], game: 'Valorant' },    
  { id: 13, name: 'Team Radiant', members: [members.raze, members.breach, members.sage, members.phoenix], game: 'Valorant' },
];

export const matchesData = [
  { id: 103, name: 'Fortnite Battle Royale', players: 45, game: 'Fortnite' },
  { id: 104, name: 'Fortnite Arena', players: 30, game: 'Fortnite' },
  { id: 105, name: 'League of Legends Ranked', players: 10, game: 'League of Legends' },
  { id: 106, name: 'Valorant Competitive', players: 10, game: 'Valorant' },
  { id: 107, name: 'GTA V Online', players: 20, game: 'GTA V' },
  { id: 108, name: 'Fortnite Survival', players: 15, game: 'Fortnite' },
  { id: 109, name: 'Among Us Game', players: 8, game: 'Valorant' },
  { id: 110, name: 'COD Warzone Match 1', players: 12, game: 'COD Warzone' },
  { id: 111, name: 'COD Warzone Match 2', players: 8, game: 'COD Warzone' },
  { id: 112, name: 'COD Warzone Match 3', players: 15, game: 'COD Warzone' },
];

export const streamsData = [
  { id: 200, name: 'COD Warzone Live', streamer: 'Dr Team', viewers: 120, game: 'COD Warzone' },
  { id: 201, name: 'COD Warzone Night', streamer: 'Mia Plays', viewers: 85, game: 'COD Warzone' },
  { id: 202, name: 'COD Warzone Pro', streamer: 'Nickmercs', viewers: 200, game: 'COD Warzone' },
  { id: 203, name: 'Fortnite Live', streamer: 'Los Constructores', viewers: 45, game: 'Fortnite' },
  { id: 204, name: 'Fortnite Tournament', streamer: 'Team Rush', viewers: 30, game: 'Fortnite' },
  { id: 205, name: 'League of Legends Live', streamer: 'Team Mid', viewers: 10, game: 'League of Legends' },
  { id: 206, name: 'Valorant Live', streamer: 'Valorant Squad', viewers: 10, game: 'Valorant' },
  { id: 207, name: 'GTA V Roleplay', streamer: 'Los Santos Crew', viewers: 20, game: 'GTA V' },
  { id: 208, name: 'Fortnite Hardcore', streamer: 'Block Builders', viewers: 15, game: 'Fortnite' },
  { id: 209, name: 'Among Us Live', streamer: 'Impostors', viewers: 8, game: 'Valorant' },
];

export const defaultFeatured = {
  id: 0,
  name: 'Fortnite New Season',
  game: 'Fortnite',
  timer: '12 : 45',
  image: 'fortnite-season.jpg',
  action: 'Join Live Stream',
  participants: [],
  type: 'game',
};