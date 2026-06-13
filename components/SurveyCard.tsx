'use client'

import type { Question } from '@/data/questions'

interface Props {
  question: Question
  current: number
  total: number
  onAnswer: (answer: boolean) => void
}

export default function SurveyCard({ question, current, total, onAnswer }: Props) {
  const progress = (current / total) * 100

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Progress bar */}
      <div className="w-full h-1.5" style={{ background: 'var(--border)' }}>
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${progress}%`, background: 'var(--accent)' }}
        />
      </div>

      {/* Counter */}
      <div className="px-5 pt-4 pb-1">
        <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
          {current} / {total}
        </span>
      </div>

      {/* Card */}
      <div className="flex-1 flex flex-col justify-center px-5 pb-8">
        <div
          className="rounded-2xl p-6 flex flex-col gap-6"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          {/* Emoji */}
          <div className="text-6xl text-center leading-none">{question.emoji}</div>

          {/* Prompt */}
          <p className="text-xs font-semibold uppercase tracking-widest text-center" style={{ color: 'var(--text-muted)' }}>
            Was ist dir wichtig?
          </p>

          {/* Question text */}
          <p className="text-lg font-semibold leading-snug text-center" style={{ color: 'var(--text)' }}>
            {question.text}
          </p>

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => onAnswer(false)}
              className="flex-1 py-4 rounded-xl font-bold text-lg transition-all active:scale-95"
              style={{
                background: 'var(--bg-card-inner)',
                color: 'var(--text-muted)',
                border: '2px solid var(--border)',
                borderRadius: 'var(--btn-radius)',
              }}
            >
              ✗ Nein
            </button>
            <button
              onClick={() => onAnswer(true)}
              className="flex-1 py-4 rounded-xl font-bold text-lg transition-all active:scale-95"
              style={{
                background: 'var(--accent)',
                color: 'var(--accent-text)',
                border: '2px solid var(--accent-2)',
                borderRadius: 'var(--btn-radius)',
              }}
            >
              ✓ Ja
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
