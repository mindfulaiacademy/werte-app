import { DEFAULT_TRAINING_DURATION, POINTS_PER_DAY } from '@/data/training'

const TRAINING_KEY = 'wt_training_v1'

function lsGet(key: string): string | null {
  try { return localStorage.getItem(key) } catch { return null }
}
function lsSet(key: string, value: string): void {
  try { localStorage.setItem(key, value) } catch { /* incognito or storage full */ }
}
function lsRemove(key: string): void {
  try { localStorage.removeItem(key) } catch { /* ignore */ }
}

export interface TrainingState {
  topicId: string
  selfScore: number
  targetScore: number
  durationDays: number
  startDate: string // YYYY-MM-DD
  checkins: (boolean | null)[] // length = durationDays
}

export function getTrainingState(): TrainingState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = lsGet(TRAINING_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as TrainingState
    // Backward compat: sessions saved before duration selection existed.
    return { ...parsed, durationDays: parsed.durationDays ?? DEFAULT_TRAINING_DURATION }
  } catch {
    return null
  }
}

export function saveTrainingState(state: TrainingState): void {
  if (typeof window === 'undefined') return
  lsSet(TRAINING_KEY, JSON.stringify(state))
}

export function startTraining(
  topicId: string,
  selfScore: number,
  targetScore: number,
  durationDays: number = DEFAULT_TRAINING_DURATION
): TrainingState {
  const state: TrainingState = {
    topicId,
    selfScore,
    targetScore,
    durationDays,
    startDate: new Date().toISOString().split('T')[0],
    checkins: Array(durationDays).fill(null),
  }
  saveTrainingState(state)
  return state
}

export function resetTraining(): void {
  if (typeof window === 'undefined') return
  lsRemove(TRAINING_KEY)
}

export function getDayIndex(startDate: string, durationDays: number = DEFAULT_TRAINING_DURATION): number {
  const start = new Date(startDate)
  const now = new Date()
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return Math.min(Math.max(diff, 0), durationDays - 1)
}

export function hasCheckedInToday(state: TrainingState): boolean {
  const day = getDayIndex(state.startDate, state.durationDays)
  return state.checkins[day] !== null
}

export function checkinToday(state: TrainingState, done: boolean, dayOverride?: number): TrainingState {
  const day = dayOverride !== undefined ? dayOverride : getDayIndex(state.startDate, state.durationDays)
  const updated = { ...state, checkins: [...state.checkins] }
  updated.checkins[day] = done
  saveTrainingState(updated)
  return updated
}

export function isTrainingComplete(state: TrainingState, dayOverride?: number): boolean {
  const day = dayOverride !== undefined ? dayOverride : getDayIndex(state.startDate, state.durationDays)
  return day === state.durationDays - 1 && state.checkins[day] !== null
}

export function getTotalPoints(state: TrainingState): number {
  return state.checkins.filter((c) => c === true).length * POINTS_PER_DAY
}

export function getMaxPoints(durationDays: number): number {
  return durationDays * POINTS_PER_DAY
}
