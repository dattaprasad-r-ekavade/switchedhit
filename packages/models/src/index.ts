// Player Types
export interface Player {
  id: string
  name: string
  role: PlayerRole
  battingStats: BattingStats
  bowlingStats: BowlingStats
  fieldingStats: FieldingStats
  overall: number
  age: number
  nationality: string
}

export enum PlayerRole {
  BATSMAN = 'BATSMAN',
  BOWLER = 'BOWLER',
  ALL_ROUNDER = 'ALL_ROUNDER',
  WICKET_KEEPER = 'WICKET_KEEPER',
}

export interface BattingStats {
  average: number
  strikeRate: number
  runs: number
  matches: number
  innings: number
}

export interface BowlingStats {
  average: number
  economy: number
  wickets: number
  matches: number
  overs: number
}

export interface FieldingStats {
  catches: number
  runOuts: number
  stumpings: number
}

// Team Types
export interface Team {
  id: string
  name: string
  ownerId: string
  players: Player[]
  coins: number
  level: number
  trophies: number
}

// Match Types
export interface Match {
  id: string
  homeTeamId: string
  awayTeamId: string
  homeScore: Score
  awayScore: Score
  status: MatchStatus
  overs: number
  venue: string
  date: string
}

export enum MatchStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface Score {
  runs: number
  wickets: number
  overs: number
}

// User Types
export interface User {
  id: string
  email: string
  username: string
  teamId?: string
  createdAt: string
}
