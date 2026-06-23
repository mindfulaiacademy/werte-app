'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { TRAINING_TOPICS, TRAINING_DURATION, POINTS_PER_DAY, getLevelForScore } from '@/data/training'
import {
  getTrainingState,
  checkinToday,
  getDayIndex,
  hasCheckedInToday,
  isTrainingComplete,
  getTotalPoints,
  getMaxPoints,
  type TrainingState,
} from '@/lib/training'
import { syncToSupabase, isDemoMode } from '@/lib/sync'

export default function TrainingAktivPage() {
  const router = useRouter()
  const [state, setState] = useState<TrainingState | null>(null)
  const [justCheckedIn, setJustCheckedIn] = useState<boolean | null>(null)
  const [neuroOpen, setNeuroOpen] = useState(false)
  const neuroRef = useRef<HTMLDivElement>(null)

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

  const levelIndex = getLevelForScore(state.selfScore)
  const level = topic.levels[levelIndex]
  const demoMode = isDemoMode()
  const dayIndex = demoMode
    ? Math.max(0, state.checkins.findIndex((c) => c === null) === -1 ? TRAINING_DURATION - 1 : state.checkins.findIndex((c) => c === null))
    : getDayIndex(state.startDate)
  const alreadyDone = demoMode ? state.checkins[dayIndex] !== null : hasCheckedInToday(state)
  const todayResult = state.checkins[dayIndex]
  const totalPoints = getTotalPoints(state)
  const maxPoints = getMaxPoints()

  function handleCheckin(done: boolean) {
    if (!state || alreadyDone) return
    const updated = checkinToday(state, done)
    setState(updated)
    setJustCheckedIn(done)
    syncToSupabase()

    if (isTrainingComplete(updated)) {
      setTimeout(() => router.push('/training/abschluss'), 1200)
    }
  }

  return (
    <div className="flex flex-col min-h-screen pb-10" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="px-5 pt-10 pb-4">
        <button onClick={() => router.push('/')} className="text-sm font-semibold mb-6 block" style={{ color: 'var(--text-muted)' }}>
          ← Home
        </button>
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}
          >
            Modul 2
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Tag {dayIndex + 1} / {TRAINING_DURATION}
          </span>
          {demoMode && (
            <span className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: '#f97316', color: '#fff' }}>
              Demo
            </span>
          )}
        </div>
        <h1 className="text-2xl font-black" style={{ color: 'var(--text)' }}>
          {topic.emoji} {topic.title}
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          {level.emoji} {level.label} · Ziel: {state.targetScore}/10
        </p>
      </div>

      {/* Progress heatmap */}
      <div className="px-5 mb-6">
        <div
          className="rounded-2xl p-4"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              Dein Fortschritt
            </p>
            <p className="text-xs font-bold" style={{ color: 'var(--text)' }}>
              {totalPoints} / {maxPoints} Punkte
            </p>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: TRAINING_DURATION }).map((_, i) => {
              const checkin = state.checkins[i]
              const isToday = i === dayIndex
              const isFuture = i > dayIndex
              return (
                <div
                  key={i}
                  className="flex-1 aspect-square rounded-lg transition-all"
                  style={{
                    background: checkin === true
                      ? '#16a34a'
                      : checkin === false
                      ? '#374151'
                      : isFuture
                      ? 'var(--border)'
                      : 'var(--border)',
                    border: isToday && !alreadyDone ? '2px solid #16a34a' : '2px solid transparent',
                    opacity: isFuture ? 0.4 : 1,
                  }}
                />
              )
            })}
          </div>
          <div className="flex gap-2 mt-2">
            {Array.from({ length: TRAINING_DURATION }).map((_, i) => (
              <div key={i} className="flex-1 text-center">
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's challenge */}
      <div className="px-5 flex-1">
        <div
          className="rounded-2xl p-5"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
            Deine heutige Challenge
          </p>
          <p className="text-base leading-relaxed font-medium" style={{ color: 'var(--text)' }}>
            {level.challenge}
          </p>

          {/* Neuro-Fakt */}
          <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            <button
              onClick={() => setNeuroOpen((o) => !o)}
              className="flex items-center gap-2 text-sm font-semibold transition-all"
              style={{ color: 'var(--text-muted)' }}
            >
              <span>🧠</span>
              <span>Warum hilft das?</span>
              <span className="ml-auto text-xs" style={{ transform: neuroOpen ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block', transition: 'transform 0.2s' }}>
                ▾
              </span>
            </button>
            <div
              ref={neuroRef}
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: neuroOpen ? '400px' : '0px', opacity: neuroOpen ? 1 : 0 }}
            >
              <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--text-muted)' }}>
                {level.neuroFakt}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Check-in */}
      <div className="px-5 mt-6 flex flex-col gap-3">
        {!alreadyDone ? (
          <>
            <p className="text-sm text-center font-semibold" style={{ color: 'var(--text-muted)' }}>
              Hast du die Challenge heute erfüllt?
            </p>
            <button
              onClick={() => handleCheckin(true)}
              className="w-full py-4 font-black text-xl rounded-xl transition-all active:scale-95"
              style={{ background: '#16a34a', color: '#ffffff', borderRadius: 'var(--btn-radius)' }}
            >
              ✓ Ja, hab ich!
            </button>
            <button
              onClick={() => handleCheckin(false)}
              className="w-full py-3 font-semibold text-base rounded-xl transition-all active:scale-95"
              style={{
                background: 'var(--bg-card)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--btn-radius)',
              }}
            >
              Heute nicht
            </button>
          </>
        ) : (
          <div
            className="rounded-2xl p-5 text-center"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            {todayResult === true || justCheckedIn === true ? (
              <>
                <p className="text-3xl mb-2">🎉</p>
                <p className="font-black text-lg" style={{ color: '#16a34a' }}>
                  +{POINTS_PER_DAY} Punkte!
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                  Morgen geht's weiter.
                </p>
              </>
            ) : (
              <>
                <p className="text-3xl mb-2">💪</p>
                <p className="font-black text-lg" style={{ color: 'var(--text)' }}>
                  Morgen wieder!
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                  Kein Problem — morgen ist ein neuer Tag.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
