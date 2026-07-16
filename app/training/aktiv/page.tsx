'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { TRAINING_TOPICS, POINTS_PER_DAY, getLevelForScore } from '@/data/training'
import {
  getTrainingState,
  saveTrainingState,
  checkinToday,
  getDayIndex,
  hasCheckedInToday,
  isTrainingComplete,
  getTotalPoints,
  getMaxPoints,
  type TrainingState,
} from '@/lib/training'
import { syncToSupabase, isDemoMode } from '@/lib/sync'
import { useLanguage } from '@/lib/i18n'

export default function TrainingAktivPage() {
  const router = useRouter()
  const { lang, t, tr } = useLanguage()
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
  const durationDays = state.durationDays
  const dayIndex = demoMode
    ? Math.max(0, state.checkins.findIndex((c) => c === null) === -1 ? durationDays - 1 : state.checkins.findIndex((c) => c === null))
    : getDayIndex(state.startDate, durationDays)
  const alreadyDone = demoMode ? state.checkins[dayIndex] !== null : hasCheckedInToday(state)
  const todayResult = state.checkins[dayIndex]
  const totalPoints = getTotalPoints(state)
  const maxPoints = getMaxPoints(durationDays)

  function handleCheckin(done: boolean) {
    if (!state || alreadyDone) return

    if (demoMode) {
      const updated = { ...state, checkins: Array(durationDays).fill(done) }
      saveTrainingState(updated)
      setState(updated)
      setJustCheckedIn(done)
      syncToSupabase()
      setTimeout(() => router.push('/training/abschluss'), 1200)
      return
    }

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
          {t.trainingActive.home[lang]}
        </button>
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}
          >
            {t.trainingActive.module2[lang]}
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {t.trainingActive.day[lang]} {dayIndex + 1} / {durationDays}
          </span>
          {demoMode && (
            <span className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: '#f97316', color: '#fff' }}>
              {t.trainingActive.demo[lang]}
            </span>
          )}
        </div>
        <h1 className="text-2xl font-black" style={{ color: 'var(--text)' }}>
          {topic.emoji} {tr(topic.title)}
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          {level.emoji} {tr(level.label)} · {t.trainingActive.target[lang]}: {state.targetScore}/10
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
              {t.trainingActive.progress[lang]}
            </p>
            <p className="text-xs font-bold" style={{ color: 'var(--text)' }}>
              {totalPoints} / {maxPoints} {t.trainingActive.points[lang]}
            </p>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: durationDays }).map((_, i) => {
              const checkin = state.checkins[i]
              const isToday = i === dayIndex
              const isFuture = i > dayIndex
              return (
                <div
                  key={i}
                  className="aspect-square rounded-md transition-all"
                  style={{
                    background: checkin === true
                      ? '#16a34a'
                      : checkin === false
                      ? '#374151'
                      : 'var(--border)',
                    border: isToday && !alreadyDone ? '2px solid #16a34a' : '2px solid transparent',
                    opacity: isFuture ? 0.4 : 1,
                  }}
                />
              )
            })}
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
            {t.trainingActive.todaysChallenge[lang]}
          </p>
          <p className="text-base leading-relaxed font-medium" style={{ color: 'var(--text)' }}>
            {tr(level.challenge)}
          </p>

          {/* Neuro-Fakt */}
          <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            <button
              onClick={() => setNeuroOpen((o) => !o)}
              className="flex items-center gap-2 text-sm font-semibold transition-all"
              style={{ color: 'var(--text-muted)' }}
            >
              <span>🧠</span>
              <span>{t.trainingActive.whyHelps[lang]}</span>
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
                {tr(level.neuroFakt)}
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
              {t.trainingActive.didYouDoIt[lang]}
            </p>
            <button
              onClick={() => handleCheckin(true)}
              className="w-full py-4 font-black text-xl rounded-xl transition-all active:scale-95"
              style={{ background: '#16a34a', color: '#ffffff', borderRadius: 'var(--btn-radius)' }}
            >
              {t.trainingActive.yesGotIt[lang]}
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
              {t.trainingActive.notToday[lang]}
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
                  +{POINTS_PER_DAY} {t.trainingActive.pointsEarned[lang]}
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                  {t.trainingActive.tomorrowContinues[lang]}
                </p>
              </>
            ) : (
              <>
                <p className="text-3xl mb-2">💪</p>
                <p className="font-black text-lg" style={{ color: 'var(--text)' }}>
                  {t.trainingActive.tryAgain[lang]}
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                  {t.trainingActive.noProblem[lang]}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
