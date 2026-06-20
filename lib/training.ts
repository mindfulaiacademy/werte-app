import { TRAINING_DURATION, POINTS_PER_DAY } from '@/data/training'

const TRAINING_KEY = 'wt_training_v1'

export interface TrainingState {
  topicId: string
  selfScore: number
  targetScore: number
  startDate: string // YYYY-MM-DD
  checkins: (boolean | null)[] // length = TRAINING_DURATION
}

export function getTrainingState(): TrainingState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(TRAINING_KEY)
    return raw ? (JSON.parse(raw) as TrainingState) : null
  } catch {
    return null
  }
}

export function saveTrainingState(state: TrainingState): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(TRAINING_KEY, JSON.stringify(state))
}

export function startTraining(topicId: string, selfScore: number, targetScore: number): TrainingState {
  const state: TrainingState = {
    topicId,
    selfScore,
    targetScore,
    startDate: new Date().toISOString().split('T')[0],
    checkins: Array(TRAINING_DURATION).fill(null),
  }
  saveTrainingState(state)
  return state
}

export function resetTraining(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(TRAINING_KEY)
}

export function getDayIndex(startDate: string): number {
  const start = new Date(startDate)
  const now = new Date()
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return Math.min(Math.max(diff, 0), TRAINING_DURATION - 1)
}

export function hasCheckedInToday(state: TrainingState): boolean {
  const day = getDayIndex(state.startDate)
  return state.checkins[day] !== null
}

export function checkinToday(state: TrainingState, done: boolean): TrainingState {
  const day = getDayIndex(state.startDate)
  const updated = { ...state, checkins: [...state.checkins] }
  updated.checkins[day] = done
  saveTrainingState(updated)
  return updated
}

export function isTrainingComplete(state: TrainingState): boolean {
  const day = getDayIndex(state.startDate)
  return day === TRAINING_DURATION - 1 && state.checkins[day] !== null
}

export function getTotalPoints(state: TrainingState): number {
  return state.checkins.filter((c) => c === true).length * POINTS_PER_DAY
}

export function getMaxPoints(): number {
  return TRAINING_DURATION * POINTS_PER_DAY
}
