/**
 * Utility functions for SwitchedHit
 */

/**
 * Format a number as currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount)
}

/**
 * Calculate player overall rating based on stats
 */
export function calculateOverall(stats: {
  batting: number
  bowling: number
  fielding: number
  role: string
}): number {
  const { batting, bowling, fielding, role } = stats

  let overall = 0
  switch (role) {
    case 'BATSMAN':
      overall = batting * 0.7 + bowling * 0.1 + fielding * 0.2
      break
    case 'BOWLER':
      overall = batting * 0.1 + bowling * 0.7 + fielding * 0.2
      break
    case 'ALL_ROUNDER':
      overall = batting * 0.4 + bowling * 0.4 + fielding * 0.2
      break
    case 'WICKET_KEEPER':
      overall = batting * 0.5 + bowling * 0.1 + fielding * 0.4
      break
    default:
      overall = (batting + bowling + fielding) / 3
  }

  return Math.round(overall)
}

/**
 * Format match score display
 */
export function formatScore(runs: number, wickets: number, overs: number): string {
  return `${runs}/${wickets} (${overs.toFixed(1)} overs)`
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

/**
 * Calculate required run rate
 */
export function calculateRequiredRunRate(
  target: number,
  scored: number,
  oversLeft: number
): number {
  const runsNeeded = target - scored
  if (oversLeft <= 0) return 0
  return Number((runsNeeded / oversLeft).toFixed(2))
}
