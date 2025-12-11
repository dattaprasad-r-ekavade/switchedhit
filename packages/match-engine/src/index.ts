import type { Player, Team, Match, Score } from '@switchedhit/models'
import { MatchStatus } from '@switchedhit/models'

/**
 * Match Engine - Core simulation logic for cricket matches
 */

export interface BallResult {
  runs: number
  isWicket: boolean
  batsmanId: string
  bowlerId: string
  commentary: string
}

export interface MatchState {
  currentInnings: 1 | 2
  battingTeam: Team
  bowlingTeam: Team
  score: Score
  ballsRemaining: number
  currentBatsman: Player
  currentBowler: Player
}

/**
 * Simulate a single ball delivery
 */
export function simulateBall(state: MatchState): BallResult {
  const { currentBatsman, currentBowler } = state
  
  // Simple probability-based simulation
  const batsmanSkill = currentBatsman.battingStats.average / 50
  const bowlerSkill = currentBowler.bowlingStats.average / 25
  
  const baseWicketChance = 0.05
  const wicketChance = baseWicketChance * (bowlerSkill / batsmanSkill)
  
  const isWicket = Math.random() < wicketChance
  
  if (isWicket) {
    return {
      runs: 0,
      isWicket: true,
      batsmanId: currentBatsman.id,
      bowlerId: currentBowler.id,
      commentary: `OUT! ${currentBatsman.name} is dismissed by ${currentBowler.name}`,
    }
  }
  
  // Simulate runs scored (0-6, weighted towards lower scores)
  const rand = Math.random()
  let runs = 0
  
  if (rand < 0.4) runs = 0 // Dot ball
  else if (rand < 0.65) runs = 1
  else if (rand < 0.80) runs = 2
  else if (rand < 0.88) runs = 3
  else if (rand < 0.95) runs = 4
  else runs = 6
  
  return {
    runs,
    isWicket: false,
    batsmanId: currentBatsman.id,
    bowlerId: currentBowler.id,
    commentary: runs === 0 
      ? 'Dot ball'
      : runs === 4 
        ? `FOUR! ${currentBatsman.name} hits a boundary`
        : runs === 6
          ? `SIX! ${currentBatsman.name} smashes it out of the park!`
          : `${runs} run(s)`,
  }
}

/**
 * Simulate an entire over (6 balls)
 */
export function simulateOver(state: MatchState): BallResult[] {
  const results: BallResult[] = []
  const maxBalls = Math.min(6, state.ballsRemaining)
  
  for (let i = 0; i < maxBalls; i++) {
    const result = simulateBall(state)
    results.push(result)
    
    // Update state
    state.score.runs += result.runs
    if (result.isWicket) {
      state.score.wickets++
      if (state.score.wickets >= 10) break
    }
    state.ballsRemaining--
    if (state.ballsRemaining <= 0) break
  }
  
  return results
}

/**
 * Initialize a new match
 */
export function initializeMatch(
  homeTeam: Team,
  awayTeam: Team,
  overs: number = 20
): Match {
  return {
    id: Math.random().toString(36).substring(2),
    homeTeamId: homeTeam.id,
    awayTeamId: awayTeam.id,
    homeScore: { runs: 0, wickets: 0, overs: 0 },
    awayScore: { runs: 0, wickets: 0, overs: 0 },
    status: MatchStatus.SCHEDULED,
    overs,
    venue: 'Virtual Stadium',
    date: new Date().toISOString(),
  }
}
