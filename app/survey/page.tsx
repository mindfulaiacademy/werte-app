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
} from '@/lib/survey'
import type { Question } from '@/data/questions'

type Screen = 'start' | 'survey' | 'done'

export default function SurveyPage() {
  const router = useRouter()
  const [screen, setScreen] = useState<Screen>('start')
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const qs = getOrderedQuestions()
    const idx = getCurrentIndex()
    const answers = getAnswers()
    setQuestions(qs)

    // If already finished, go straight to result
    if (Object.keys(answers).length >= qs.length) {
      router.replace('/ergebnis')
      return
    }

    // If mid-survey, skip start screen
    if (idx > 0) {
      setCurrentIndex(idx)
      setScreen('survey')
    }
  }, [router])

  function handleStart() {
    setScreen('survey')
  }

  function handleAnswer(answer: boolean) {
    const q = questions[currentIndex]
    saveAnswer(q.id, answer)

    const nextIndex = currentIndex + 1
    saveCurrentIndex(nextIndex)

    if (nextIndex >= questions.length) {
      router.push('/ergebnis')
    } else {
      setCurrentIndex(nextIndex)
    }
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
            <h1 className="text-3xl font-black leading-tight mb-4" style={{ color: 'var(--text)' }}>
              Was ist dir<br />wichtig?
            </h1>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              60 kurze Fragen. Kein Richtig oder Falsch — nur du und deine ehrliche Antwort.
              Das dauert ungefähr 15 Minuten.
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
              <span className="text-xl">🔒</span>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--text)' }}>Nur für dich.</strong> Deine Antworten bleiben auf deinem Gerät.
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
          onClick={handleStart}
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

  return (
    <SurveyCard
      question={currentQuestion}
      current={currentIndex + 1}
      total={questions.length}
      onAnswer={handleAnswer}
    />
  )
}
