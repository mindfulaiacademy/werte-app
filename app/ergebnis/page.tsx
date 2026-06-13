'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { getAnswers, computeScores, resetSurvey, type ScoreResult } from '@/lib/survey'

const WerteRadarChart = dynamic(() => import('@/components/WerteRadarChart'), { ssr: false })

const DIMENSION_LABELS: Record<string, string> = {
  IDENTITY: '🌱 Identität',
  COMMUNITY: '🤝 Gemeinschaft',
  SOCIALITY: '🌍 Gesellschaft',
}

const DIMENSION_COLORS: Record<string, string> = {
  IDENTITY: '#FFD21F',
  COMMUNITY: '#ef4444',
  SOCIALITY: '#3b82f6',
}

function ScoreTile({ result }: { result: ScoreResult }) {
  const pct = (result.score / result.max) * 100
  const color = DIMENSION_COLORS[result.dimension]

  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-2"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <span className="text-sm font-bold leading-tight" style={{ color: 'var(--text)' }}>
        {result.valueName}
      </span>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${pct}%`, background: color }}
          />
        </div>
        <span className="text-xs font-bold tabular-nums" style={{ color: 'var(--text-muted)' }}>
          {result.score.toFixed(1)} / 5
        </span>
      </div>
    </div>
  )
}

export default function ErgebnisPage() {
  const router = useRouter()
  const [scores, setScores] = useState<ScoreResult[]>([])

  useEffect(() => {
    const answers = getAnswers()
    if (Object.keys(answers).length === 0) {
      router.replace('/survey')
      return
    }
    setScores(computeScores(answers))
  }, [router])

  function handleReset() {
    resetSurvey()
    router.push('/survey')
  }

  if (scores.length === 0) return null

  const dimensions = ['IDENTITY', 'COMMUNITY', 'SOCIALITY'] as const
  const byDimension = (dim: string) => scores.filter((s) => s.dimension === dim)

  return (
    <div className="flex flex-col min-h-screen pb-10" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="px-5 pt-10 pb-4">
        <h1 className="text-2xl font-black" style={{ color: 'var(--text)' }}>
          Dein Werteprofil
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          Hier siehst du, was dir wirklich wichtig ist.
        </p>
      </div>

      {/* Radar Chart */}
      <div
        className="mx-5 rounded-2xl pt-4 pb-2"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-center mb-2" style={{ color: 'var(--text-muted)' }}>
          Ergebnis Heatmap
        </p>
        <WerteRadarChart scores={scores} />

        {/* Legend */}
        <div className="flex justify-center gap-4 pb-4 flex-wrap">
          {dimensions.map((dim) => (
            <div key={dim} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: DIMENSION_COLORS[dim] }} />
              <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                {dim === 'IDENTITY' ? 'Identität' : dim === 'COMMUNITY' ? 'Gemeinschaft' : 'Gesellschaft'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Score tiles by dimension */}
      <div className="flex flex-col gap-6 px-5 mt-6">
        {dimensions.map((dim) => (
          <div key={dim}>
            <h2 className="text-sm font-bold mb-3" style={{ color: DIMENSION_COLORS[dim] }}>
              {DIMENSION_LABELS[dim]}
            </h2>
            <div className="flex flex-col gap-2">
              {byDimension(dim).map((result) => (
                <ScoreTile key={result.valueKey} result={result} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 px-5 mt-8">
        <button
          disabled
          className="w-full py-4 font-black text-lg rounded-xl opacity-40 cursor-not-allowed"
          style={{
            background: 'var(--text)',
            color: 'var(--bg)',
            borderRadius: 'var(--btn-radius)',
          }}
        >
          Weiter zu Block 2 →
        </button>
        <button
          onClick={handleReset}
          className="w-full py-3 font-semibold text-base rounded-xl transition-all active:scale-95"
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text-muted)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--btn-radius)',
          }}
        >
          Von vorne beginnen
        </button>
      </div>
    </div>
  )
}
