import { supabase } from './supabase'

const USER_ID_KEY = 'wt_user_id'

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

export async function syncToSupabase(): Promise<void> {
  if (typeof window === 'undefined') return
  try {
    const id = getUserId()
    const answers = JSON.parse(localStorage.getItem(ANSWERS_KEY) || '{}')
    const question_order = JSON.parse(localStorage.getItem(ORDER_KEY) || '[]')
    const current_index = parseInt(localStorage.getItem(INDEX_KEY) || '0', 10)
    const training = JSON.parse(localStorage.getItem(TRAINING_KEY) || 'null')

    await supabase.from('user_sessions').upsert({
      id,
      answers,
      question_order,
      current_index,
      training,
      updated_at: new Date().toISOString(),
    })
  } catch {
    // sync is best-effort — never block the user
  }
}

export async function loadFromSupabase(): Promise<boolean> {
  if (typeof window === 'undefined') return false
  try {
    const id = getUserId()
    const { data, error } = await supabase
      .from('user_sessions')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) return false

    if (data.answers && Object.keys(data.answers).length > 0)
      localStorage.setItem(ANSWERS_KEY, JSON.stringify(data.answers))
    if (data.question_order && data.question_order.length > 0)
      localStorage.setItem(ORDER_KEY, JSON.stringify(data.question_order))
    if (data.current_index !== null)
      localStorage.setItem(INDEX_KEY, String(data.current_index))
    if (data.training)
      localStorage.setItem(TRAINING_KEY, JSON.stringify(data.training))

    return true
  } catch {
    return false
  }
}
