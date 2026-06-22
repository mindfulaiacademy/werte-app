import { supabase } from './supabase'

const USER_ID_KEY = 'wt_user_id'
const SESSION_ID_KEY = 'wt_session_id'

const ANSWERS_KEY = 'wt_answers_v2'
const ORDER_KEY = 'wt_order_v2'
const INDEX_KEY = 'wt_index_v2'
const TRAINING_KEY = 'wt_training_v1'

export function getUserId(): string {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem(USER_ID_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(USER_ID_KEY, id)
  }
  return id
}

// Each new survey attempt gets a fresh session_id
// Called once at the start of a new round (when index === 0 and no answers yet)
export function getOrCreateSessionId(forceNew = false): string {
  if (typeof window === 'undefined') return ''
  if (forceNew) {
    const id = crypto.randomUUID()
    localStorage.setItem(SESSION_ID_KEY, id)
    return id
  }
  let id = localStorage.getItem(SESSION_ID_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(SESSION_ID_KEY, id)
  }
  return id
}

export function clearSessionId(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(SESSION_ID_KEY)
}

export async function syncToSupabase(roundCompleted = 0): Promise<void> {
  if (typeof window === 'undefined') return
  try {
    const user_id = getUserId()
    const session_id = getOrCreateSessionId()
    const answers = JSON.parse(localStorage.getItem(ANSWERS_KEY) || '{}')
    const question_order = JSON.parse(localStorage.getItem(ORDER_KEY) || '[]')
    const current_index = parseInt(localStorage.getItem(INDEX_KEY) || '0', 10)
    const training = JSON.parse(localStorage.getItem(TRAINING_KEY) || 'null')

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
