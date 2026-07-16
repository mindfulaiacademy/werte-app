import { QUESTIONS, type Question } from '@/data/questions'
import { computeScores, type Answers, type ScoreResult } from './survey'
import { supabase } from './supabase'
import type { Lang } from '@/lib/i18n'

export const ROUND_SIZE = 20
export const TOTAL_QUESTIONS = 60

function lsGet(key: string): string | null {
  try { return localStorage.getItem(key) } catch { return null }
}
function lsSet(key: string, value: string): void {
  try { localStorage.setItem(key, value) } catch { /* incognito or storage full */ }
}

function generateId(): string {
  try {
    return crypto.randomUUID()
  } catch {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
  }
}

function keys(ownerId: string) {
  return {
    peerId: `wt_peer_id_${ownerId}`,
    answers: `wt_peer_answers_${ownerId}`,
    order: `wt_peer_order_${ownerId}`,
    index: `wt_peer_index_${ownerId}`,
  }
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function getPeerId(ownerId: string): string {
  if (typeof window === 'undefined') return ''
  let id = lsGet(keys(ownerId).peerId)
  if (!id) {
    id = generateId()
    lsSet(keys(ownerId).peerId, id)
  }
  return id
}

export function getShuffledOrder(ownerId: string): string[] {
  if (typeof window === 'undefined') return QUESTIONS.map((q) => q.id)
  const stored = lsGet(keys(ownerId).order)
  if (stored) {
    try {
      return JSON.parse(stored) as string[]
    } catch {
      // fall through
    }
  }
  const shuffled = shuffleArray(QUESTIONS.map((q) => q.id))
  lsSet(keys(ownerId).order, JSON.stringify(shuffled))
  return shuffled
}

export function getOrderedQuestions(ownerId: string): Question[] {
  const order = getShuffledOrder(ownerId)
  const map = new Map(QUESTIONS.map((q) => [q.id, q]))
  return order.map((id) => map.get(id)!).filter(Boolean)
}

export function saveAnswer(ownerId: string, questionId: string, value: number): void {
  if (typeof window === 'undefined') return
  const answers = getAnswers(ownerId)
  answers[questionId] = value
  lsSet(keys(ownerId).answers, JSON.stringify(answers))
}

export function getAnswers(ownerId: string): Answers {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(lsGet(keys(ownerId).answers) || '{}') as Answers
  } catch {
    return {}
  }
}

export function saveCurrentIndex(ownerId: string, index: number): void {
  if (typeof window === 'undefined') return
  lsSet(keys(ownerId).index, String(index))
}

export function getCurrentIndex(ownerId: string): number {
  if (typeof window === 'undefined') return 0
  return parseInt(lsGet(keys(ownerId).index) || '0', 10)
}

export function getRound(answers: Answers): 1 | 2 | 3 {
  const count = Object.keys(answers).length
  if (count >= TOTAL_QUESTIONS) return 3
  if (count >= ROUND_SIZE * 2) return 2
  return 1
}

export async function syncPeerToSupabase(ownerId: string, roundCompleted = 0): Promise<void> {
  if (typeof window === 'undefined') return
  try {
    const peer_id = getPeerId(ownerId)
    const answers = getAnswers(ownerId)
    const question_order = getShuffledOrder(ownerId)
    const current_index = getCurrentIndex(ownerId)

    await supabase.from('peer_assessments').upsert(
      {
        peer_id,
        owner_session_id: ownerId,
        answers,
        question_order,
        current_index,
        round_completed: roundCompleted,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'peer_id,owner_session_id' }
    )
  } catch {
    // sync is best-effort — never block the peer
  }
}

export interface PeerAggregate {
  scores: ScoreResult[]
  peerCount: number
}

// Averages each peer's per-value score, then averages across peers.
export async function fetchPeerAggregate(ownerId: string, lang: Lang = 'en'): Promise<PeerAggregate> {
  try {
    const { data, error } = await supabase
      .from('peer_assessments')
      .select('answers')
      .eq('owner_session_id', ownerId)

    if (error || !data) return { scores: [], peerCount: 0 }

    const perPeerScores = data
      .map((row) => computeScores((row.answers as Answers) || {}, lang))
      .filter((scores) => scores.some((s) => s.answeredCount > 0))

    if (perPeerScores.length === 0) return { scores: [], peerCount: 0 }

    const base = perPeerScores[0]
    const scores: ScoreResult[] = base.map((s) => {
      const contributions = perPeerScores
        .map((peerScores) => peerScores.find((p) => p.valueKey === s.valueKey))
        .filter((p): p is ScoreResult => !!p && p.answeredCount > 0)

      const avg =
        contributions.length > 0
          ? contributions.reduce((sum, p) => sum + p.score, 0) / contributions.length
          : 0

      return {
        ...s,
        score: Math.round(avg * 10) / 10,
        answeredCount: contributions.length,
      }
    })

    return { scores, peerCount: perPeerScores.length }
  } catch {
    return { scores: [], peerCount: 0 }
  }
}
