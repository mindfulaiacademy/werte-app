'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import SurveyCard from '@/components/SurveyCard'
import {
  getOrderedQuestions,
  getAnswers,
  getCurrentIndex,
  saveAnswer,
  saveCurrentIndex,
  syncPeerToSupabase,
  ROUND_SIZE,
  TOTAL_QUESTIONS,
} from '@/lib/peerSurvey'
import type { Question } from '@/data/questions'
import { useLanguage } from '@/lib/i18n'

type Screen = 'start' | 'survey'

export default function PeerSurveyPage() {
  const router = useRouter()
  const { lang, t } = useLanguage()
  const params = useParams<{ ownerId: string }>()
  const ownerId = params.ownerId
  const [screen, setScreen] = useState<Screen>('start')
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!ownerId) return
    const qs = getOrderedQuestions(ownerId)
    const idx = getCurrentIndex(ownerId)
    const answers = getAnswers(ownerId)
    const answeredCount = Object.keys(answers).length
    setQuestions(qs)

    if (answeredCount >= TOTAL_QUESTIONS) {
      router.replace(`/peer/${ownerId}/ergebnis`)
      return
    }

    if (idx > 0) {
      setCurrentIndex(idx)
      setScreen('survey')
      return
    }

    if (answeredCount === ROUND_SIZE || answeredCount === ROUND_SIZE * 2) {
      setCurrentIndex(idx)
      setScreen('survey')
    }
  }, [router, ownerId])

  function handleAnswer(value: number) {
    const q = questions[currentIndex]
    saveAnswer(ownerId, q.id, value)

    const nextIndex = currentIndex + 1
    saveCurrentIndex(ownerId, nextIndex)

    const answeredSoFar = Object.keys(getAnswers(ownerId)).length
    const roundCompleted =
      answeredSoFar === ROUND_SIZE ? 1 : answeredSoFar === ROUND_SIZE * 2 ? 2 : answeredSoFar >= TOTAL_QUESTIONS ? 3 : 0
    syncPeerToSupabase(ownerId, roundCompleted)

    if (answeredSoFar === ROUND_SIZE || answeredSoFar === ROUND_SIZE * 2 || answeredSoFar >= TOTAL_QUESTIONS) {
      router.push(`/peer/${ownerId}/ergebnis`)
      return
    }

    setCurrentIndex(nextIndex)
  }

  if (screen === 'start') {
    return (
      <div className="flex flex-col min-h-screen px-5 pt-16 pb-10" style={{ background: 'var(--bg)' }}>
        <div className="flex-1 flex flex-col justify-center gap-8">
          <div className="text-center">
            <div className="text-6xl mb-6 emoji-bounce">🤝</div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
              {t.peer.eyebrow[lang]}
            </p>
            <h1 className="text-3xl font-black leading-tight mb-4" style={{ color: 'var(--text)' }}>
              {t.peer.heading[lang]}
            </h1>
            <p className="text-xl font-bold mb-4" style={{ color: 'var(--text-muted)' }}>
              {t.peer.sub[lang]}
            </p>
          </div>

          <div
            className="rounded-2xl p-5 flex flex-col gap-3"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">⚡</span>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--text)' }}>{t.peer.hintStrong[lang]}</strong> {t.peer.hintText[lang]}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setScreen('survey')}
          className="w-full py-4 font-black text-lg rounded-xl transition-all active:scale-95"
          style={{
            background: 'var(--accent)',
            color: 'var(--accent-text)',
            borderRadius: 'var(--btn-radius)',
          }}
        >
          {t.peer.startButton[lang]}
        </button>
      </div>
    )
  }

  if (questions.length === 0) return null

  const currentQuestion = questions[currentIndex]
  const answeredCount = Object.keys(getAnswers(ownerId)).length
  const roundStart = Math.floor(answeredCount / ROUND_SIZE) * ROUND_SIZE
  const positionInRound = currentIndex - roundStart + 1

  return (
    <SurveyCard
      question={currentQuestion}
      current={positionInRound}
      total={ROUND_SIZE}
      onAnswer={handleAnswer}
      promptText={t.peer.promptText[lang]}
    />
  )
}
