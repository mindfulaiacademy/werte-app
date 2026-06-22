import { supabase } from './supabase'

function lsGet(key: string): string | null {
  try { return localStorage.getItem(key) } catch { return null }
}
function lsSet(key: string, value: string): void {
  try { localStorage.setItem(key, value) } catch { /* incognito or storage full */ }
}
function lsRemove(key: string): void {
  try { localStorage.removeItem(key) } catch { /* ignore */ }
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

const USER_ID_KEY = 'wt_user_id'
const SESSION_ID_KEY = 'wt_session_id'

const ANSWERS_KEY = 'wt_answers_v2'
const ORDER_KEY = 'wt_order_v2'
const INDEX_KEY = 'wt_index_v2'
const TRAINING_KEY = 'wt_training_v1'

export function getUserId(): string {
  if (typeof window === 'undefined') return ''
  let id = lsGet(USER_ID_KEY)
  if (!id) {
    id = generateId()
    lsSet(USER_ID_KEY, id)
  }
  return id
}

export function getOrCreateSessionId(forceNew = false): string {
  if (typeof window === 'undefined') return ''
  if (forceNew) {
    const id = generateId()
    lsSet(SESSION_ID_KEY, id)
    return id
  }
  let id = lsGet(SESSION_ID_KEY)
  if (!id) {
    id = generateId()
    lsSet(SESSION_ID_KEY, id)
  }
  return id
}

export function clearSessionId(): void {
  if (typeof window === 'undefined') return
  lsRemove(SESSION_ID_KEY)
}

export async function syncToSupabase(roundCompleted = 0): Promise<void> {
  if (typeof window === 'undefined') return
  try {
    const user_id = getUserId()
    const session_id = getOrCreateSessionId()
    const answers = JSON.parse(lsGet(ANSWERS_KEY) || '{}')
    const question_order = JSON.parse(lsGet(ORDER_KEY) || '[]')
    const current_index = parseInt(lsGet(INDEX_KEY) || '0', 10)
    const training = JSON.parse(lsGet(TRAINING_KEY) || 'null')

    await supabase.from('user_sessions').upsert({
      session_id,
      user_id,
      answers,
      question_order,
      current_index,
      round_completed: roundCompleted,
      training,
      updated_at: new Date().toISOString(),
    })
  } catch {
    // sync is best-effort — never block the user
  }
}
