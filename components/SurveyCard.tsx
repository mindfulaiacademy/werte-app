'use client'

import { useState } from 'react'
import type { Question } from '@/data/questions'

interface Props {
  question: Question
  current: number
  total: number
  onAnswer: (value: number) => void
}

const EMOJIS = ['😐', '🙂', '😊', '😄', '😍']
const LABEL_LEFT = 'gar nicht wichtig'
const LABEL_RIGHT = 'mega wichtig'

export default function SurveyCard({ question, current, total, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const progress = ((current - 1) / total) * 100

  function handleSelect(value: number) {
    setSelected(value)
    // slight delay so user sees the selection before card advances
    setTimeout(() => {
      setSelected(null)
      onAnswer(value)
    }, 180)
  }

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
          {/* Emoji anchor */}
          <div className="text-6xl text-center leading-none">{question.emoji}</div>

          {/* Prompt */}
          <p className="text-xs font-semibold uppercase tracking-widest text-center" style={{ color: 'var(--text-muted)' }}>
            Was ist dir wichtig?
          </p>

          {/* Question text */}
          <p className="text-lg font-semibold leading-snug text-center" style={{ color: 'var(--text)' }}>
            {question.text}
          </p>

          {/* Scale */}
          <div className="flex flex-col gap-2 mt-1">
            <div className="flex justify-between gap-2">
              {EMOJIS.map((emoji, i) => {
                const value = i + 1
                const isSelected = selected === value
                return (
                  <button
                    key={value}
                    onClick={() => handleSelect(value)}
                    className={`flex-1 flex flex-col items-center py-3 rounded-xl transition-colors active:scale-95${isSelected ? ' tap-pop' : ''}`}
                    style={{
                      background: isSelected ? 'var(--accent)' : 'var(--bg-card-inner)',
                      border: `2px solid ${isSelected ? 'var(--accent-2)' : 'var(--border)'}`,
                      borderRadius: 'var(--btn-radius)',
                    }}
                  >
                    <span className="text-2xl leading-none">{emoji}</span>
                    <span
                      className="text-xs font-bold mt-1"
                      style={{ color: isSelected ? 'var(--accent-text)' : 'var(--text-muted)' }}
                    >
                      {value}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Scale labels */}
            <div className="flex justify-between px-1">
              <span className="text-xs" style={{ color: 'var(--text-faint)' }}>{LABEL_LEFT}</span>
              <span className="text-xs" style={{ color: 'var(--text-faint)' }}>{LABEL_RIGHT}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
