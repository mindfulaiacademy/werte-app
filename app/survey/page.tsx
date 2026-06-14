'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import SurveyCard from '@/components/SurveyCard'
import {
  getOrderedQuestions,
  getAnswers,
  getCurrentIndex,
  saveAnswer,
  saveCurrentIndex,
  ROUND_SIZE,
  TOTAL_QUESTIONS,
} from '@/lib/survey'
import type { Question } from '@/data/questions'

type Screen = 'start' | 'survey'

export default function SurveyPage() {
  const router = useRouter()
  const [screen, setScreen] = useState<Screen>('start')
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const qs = getOrderedQuestions()
    const idx = getCurrentIndex()
    const answers = getAnswers()
    const answeredCount = Object.keys(answers).length
    setQuestions(qs)

    // All 60 done
    if (answeredCount >= TOTAL_QUESTIONS) {
      router.replace('/ergebnis')
      return
    }

    // Mid-round: resume where we left off, skip start screen
    if (idx > 0) {
      setCurrentIndex(idx)
      setScreen('survey')
      return
    }

    // Start of a new round (20 or 40 done): go straight to ergebnis
    // (user comes back here via "Runde X starten" button on ergebnis)
    if (answeredCount === ROUND_SIZE || answeredCount === ROUND_SIZE * 2) {
      setCurrentIndex(idx)
      setScreen('survey')
    }
  }, [router])

  function handleAnswer(value: number) {
    const q = questions[currentIndex]
    saveAnswer(q.id, value)

    const nextIndex = currentIndex + 1
    saveCurrentIndex(nextIndex)

    const answeredSoFar = Object.keys(getAnswers()).length

    // End of a round — go to result screen
    if (answeredSoFar === ROUND_SIZE || answeredSoFar === ROUND_SIZE * 2 || answeredSoFar >= TOTAL_QUESTIONS) {
      router.push('/ergebnis')
      return
    }

    setCurrentIndex(nextIndex)
  }

  if (screen === 'start') {
    return (
      <div
        className="flex flex-col min-h-screen px-5 pt-16 pb-10"
        style={{ background: 'var(--bg)' }}
      >
        <div className="flex-1 flex flex-col justify-center gap-8">
          <div className="text-center">
            <div className="text-6xl mb-6 emoji-bounce">🧭</div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
              Finde es in 4 Minuten heraus
            </p>
            <h1 className="text-3xl font-black leading-tight mb-4" style={{ color: 'var(--text)' }}>
              Welcher Wert steckt<br />am stärksten in dir?
            </h1>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Kein Richtig oder Falsch — nur du und deine ehrliche Antwort.
            </p>
          </div>

          <div
            className="rounded-2xl p-5 flex flex-col gap-3"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">⚡</span>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--text)' }}>Spontan antworten.</strong> Dein erster Gedanke ist der ehrlichste.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl">⏸️</span>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--text)' }}>Jederzeit pausieren.</strong> Du kannst weitermachen, wo du aufgehört hast.
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
          Los geht's →
        </button>
      </div>
    )
  }

  if (questions.length === 0) return null

  const currentQuestion = questions[currentIndex]
  const answeredCount = Object.keys(getAnswers()).length
  const roundStart = Math.floor(answeredCount / ROUND_SIZE) * ROUND_SIZE
  const positionInRound = currentIndex - roundStart + 1

  return (
    <SurveyCard
      question={currentQuestion}
      current={positionInRound}
      total={ROUND_SIZE}
      onAnswer={handleAnswer}
    />
  )
}
