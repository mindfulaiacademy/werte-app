'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TRAINING_TOPICS, TRAINING_DURATION, getLevelForScore } from '@/data/training'
import {
  getTrainingState,
  resetTraining,
  getTotalPoints,
  getMaxPoints,
  type TrainingState,
} from '@/lib/training'

export default function TrainingAbschlussPage() {
  const router = useRouter()
  const [state, setState] = useState<TrainingState | null>(null)

  useEffect(() => {
    const s = getTrainingState()
    if (!s) {
      router.replace('/training')
      return
    }
    setState(s)
  }, [router])

  if (!state) return null

  const topic = TRAINING_TOPICS.find((t) => t.id === state.topicId)
  if (!topic) return null

  const totalPoints = getTotalPoints(state)
  const maxPoints = getMaxPoints()
  const doneCount = state.checkins.filter((c) => c === true).length
  const targetLevel = topic.levels[getLevelForScore(state.targetScore)]
  const pct = Math.round((totalPoints / maxPoints) * 100)

  function handleRestart() {
    resetTraining()
    router.push('/training')
  }

  return (
    <div className="flex flex-col min-h-screen px-5 pt-12 pb-10" style={{ background: 'var(--bg)' }}>
      {/* Badge */}
      <div className="flex justify-center mb-6">
        <div
          className="rounded-full w-24 h-24 flex items-center justify-center text-5xl"
          style={{ background: 'var(--bg-card)', border: '2px solid var(--border)' }}
        >
          {pct >= 70 ? '🏆' : pct >= 40 ? '💪' : '🌱'}
        </div>
      </div>

      {/* Headline */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-black mb-2" style={{ color: 'var(--text)' }}>
          Woche abgeschlossen!
        </h1>
        <p className="text-base" style={{ color: 'var(--text-muted)' }}>
          {topic.emoji} {topic.title} · {TRAINING_DURATION} Tage
        </p>
      </div>

      {/* Score */}
      <div
        className="rounded-2xl p-5 text-center mb-4"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
          Deine Punkte
        </p>
        <p className="text-5xl font-black mb-1" style={{ color: '#16a34a' }}>
          {totalPoints}
        </p>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          von {maxPoints} möglichen · {doneCount} von {TRAINING_DURATION} Tagen erfüllt
        </p>
      </div>

      {/* Heatmap */}
      <div
        className="rounded-2xl p-4 mb-4"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
          Deine Woche
        </p>
        <div className="flex gap-2">
          {state.checkins.map((checkin, i) => (
            <div
              key={i}
              className="flex-1 aspect-square rounded-lg"
              style={{
                background: checkin === true ? '#16a34a' : checkin === false ? '#374151' : 'var(--border)',
              }}
            />
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          {Array.from({ length: TRAINING_DURATION }).map((_, i) => (
            <div key={i} className="flex-1 text-center">
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Goal reached? */}
      <div
        className="rounded-2xl p-4 mb-8"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
          Dein Ziel war
        </p>
        <p className="font-black text-base" style={{ color: 'var(--text)' }}>
          {targetLevel.emoji} {targetLevel.label} ({state.targetScore}/10)
        </p>
      </div>

      {/* CTAs */}
      <div className="mt-auto flex flex-col gap-3">
        <button
          onClick={handleRestart}
          className="w-full py-4 font-black text-lg rounded-xl transition-all active:scale-95"
          style={{ background: 'var(--accent)', color: 'var(--accent-text)', borderRadius: 'var(--btn-radius)' }}
        >
          Neue Runde starten →
        </button>
        <button
          onClick={() => router.push('/')}
          className="w-full py-3 font-semibold text-base rounded-xl transition-all active:scale-95"
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text-muted)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--btn-radius)',
          }}
        >
          Zurück zur Startseite
        </button>
      </div>
    </div>
  )
}
