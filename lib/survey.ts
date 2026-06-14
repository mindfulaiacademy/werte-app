import { QUESTIONS, VALUES, type Question } from '@/data/questions'

const ANSWERS_KEY = 'wt_answers_v2'
const ORDER_KEY = 'wt_order_v2'
const INDEX_KEY = 'wt_index_v2'

export const ROUND_SIZE = 20
export const TOTAL_QUESTIONS = 60

export type Answers = Record<string, number> // questionId -> 1..5

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function getShuffledOrder(): string[] {
  if (typeof window === 'undefined') return QUESTIONS.map((q) => q.id)
  const stored = localStorage.getItem(ORDER_KEY)
  if (stored) {
    try {
      return JSON.parse(stored) as string[]
    } catch {
      // fall through
    }
  }
  const shuffled = shuffleArray(QUESTIONS.map((q) => q.id))
  localStorage.setItem(ORDER_KEY, JSON.stringify(shuffled))
  return shuffled
}

export function getOrderedQuestions(): Question[] {
  const order = getShuffledOrder()
  const map = new Map(QUESTIONS.map((q) => [q.id, q]))
  return order.map((id) => map.get(id)!).filter(Boolean)
}

export function saveAnswer(questionId: string, value: number): void {
  if (typeof window === 'undefined') return
  const answers = getAnswers()
  answers[questionId] = value
  localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers))
}

export function getAnswers(): Answers {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(ANSWERS_KEY) || '{}') as Answers
  } catch {
    return {}
  }
}

export function saveCurrentIndex(index: number): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(INDEX_KEY, String(index))
}

export function getCurrentIndex(): number {
  if (typeof window === 'undefined') return 0
  return parseInt(localStorage.getItem(INDEX_KEY) || '0', 10)
}

export function resetSurvey(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(ANSWERS_KEY)
  localStorage.removeItem(ORDER_KEY)
  localStorage.removeItem(INDEX_KEY)
}

// Returns 1, 2, or 3 based on how many answers have been saved
export function getRound(answers: Answers): 1 | 2 | 3 {
  const count = Object.keys(answers).length
  if (count >= ROUND_SIZE * 2) return 3
  if (count >= ROUND_SIZE) return 2
  return 1
}

// Returns true if this round is the final one
export function isFinalRound(round: 1 | 2 | 3): boolean {
  return round === 3
}

export interface ScoreResult {
  valueKey: string
  valueName: string
  dimension: string
  score: number   // average 1.0–5.0 (0 if unanswered)
  max: number
  answeredCount: number // out of 5
}

export function computeScores(answers: Answers): ScoreResult[] {
  return VALUES.map((v) => {
    const qs = QUESTIONS.filter((q) => q.valueKey === v.key)
    const answered = qs.map((q) => answers[q.id]).filter((n) => typeof n === 'number')
    const avg =
      answered.length > 0
        ? answered.reduce((sum, n) => sum + n, 0) / answered.length
        : 0
    return {
      valueKey: v.key,
      valueName: v.name,
      dimension: v.dimension,
      score: Math.round(avg * 10) / 10,
      max: 5,
      answeredCount: answered.length,
    }
  })
}
