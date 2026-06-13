import { QUESTIONS, VALUES, type Question } from '@/data/questions'

const ANSWERS_KEY = 'wt_answers'
const ORDER_KEY = 'wt_order'
const INDEX_KEY = 'wt_index'

export type Answers = Record<string, boolean>

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
      // fall through to generate new
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

export function saveAnswer(questionId: string, answer: boolean): void {
  if (typeof window === 'undefined') return
  const answers = getAnswers()
  answers[questionId] = answer
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

export interface ScoreResult {
  valueKey: string
  valueName: string
  dimension: string
  score: number
  max: number
}

export function computeScores(answers: Answers): ScoreResult[] {
  const counts: Record<string, number> = {}
  for (const q of QUESTIONS) {
    if (!(q.valueKey in counts)) counts[q.valueKey] = 0
    if (answers[q.id] === true) counts[q.valueKey]++
  }
  return VALUES.map((v) => ({
    valueKey: v.key,
    valueName: v.name,
    dimension: v.dimension,
    score: counts[v.key] ?? 0,
    max: 5,
  }))
}
