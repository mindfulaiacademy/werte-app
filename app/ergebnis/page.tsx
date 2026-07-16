'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import {
  getAnswers,
  computeScores,
  resetSurvey,
  getRound,
  ROUND_SIZE,
  TOTAL_QUESTIONS,
  type ScoreResult,
} from '@/lib/survey'
import { getOrCreateSessionId } from '@/lib/sync'
import { fetchPeerAggregate, type PeerAggregate } from '@/lib/peerSurvey'
import { useLanguage } from '@/lib/i18n'

const DEMO_KEY = 'wt_demo'

const WerteRadarChart = dynamic(() => import('@/components/WerteRadarChart'), { ssr: false })

const DIMENSION_COLORS: Record<string, string> = {
  IDENTITY: '#FFD21F',
  COMMUNITY: '#ef4444',
  SOCIALITY: '#14b8a6',
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
          {result.answeredCount > 0 ? `${result.score.toFixed(1)} / 5` : '—'}
        </span>
      </div>
    </div>
  )
}

export default function ErgebnisPage() {
  const router = useRouter()
  const { lang, t } = useLanguage()
  const [scores, setScores] = useState<ScoreResult[]>([])
  const [round, setRound] = useState<1 | 2 | 3>(1)
  const [peerAggregate, setPeerAggregate] = useState<PeerAggregate>({ scores: [], peerCount: 0 })
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle')

  useEffect(() => {
    const answers = getAnswers()
    if (Object.keys(answers).length === 0) {
      router.replace('/survey')
      return
    }
    setScores(computeScores(answers, lang))
    setRound(getRound(answers))

    const sessionId = getOrCreateSessionId()
    fetchPeerAggregate(sessionId, lang).then(setPeerAggregate)
  }, [router, lang])

  async function handleGetPeerFeedback() {
    const sessionId = getOrCreateSessionId()
    const link = `${window.location.origin}/peer/${sessionId}`

    if (navigator.share) {
      try {
        await navigator.share({ title: t.ergebnis.shareTitle[lang], text: t.ergebnis.shareText[lang], url: link })
        return
      } catch {
        // user cancelled or share failed — fall back to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(link)
      setShareStatus('copied')
      setTimeout(() => setShareStatus('idle'), 2000)
    } catch {
      // ignore
    }
  }

  function handleReset() {
    resetSurvey()
    getOrCreateSessionId(true) // force new session ID for history
    router.push('/survey')
  }

  function handleNextRound() {
    router.push('/survey')
  }

  if (scores.length === 0) return null

  const ROUND_CONFIG = {
    1: { label: t.ergebnis.round1Label[lang], sublabel: t.ergebnis.round1Sub[lang], nextLabel: t.ergebnis.round1Next[lang], nextRound: true },
    2: { label: t.ergebnis.round2Label[lang], sublabel: t.ergebnis.round2Sub[lang], nextLabel: t.ergebnis.round2Next[lang], nextRound: true },
    3: { label: t.ergebnis.round3Label[lang], sublabel: t.ergebnis.round3Sub[lang], nextLabel: null as string | null, nextRound: false },
  }
  const DIMENSION_LABELS: Record<string, string> = {
    IDENTITY: t.ergebnis.identityLabel[lang],
    COMMUNITY: t.ergebnis.communityLabel[lang],
    SOCIALITY: t.ergebnis.socialityLabel[lang],
  }
  const config = ROUND_CONFIG[round]
  const dimensions = ['IDENTITY', 'COMMUNITY', 'SOCIALITY'] as const
  const byDimension = (dim: string) => scores.filter((s) => s.dimension === dim)
  const answeredTotal = scores.reduce((sum, s) => sum + s.answeredCount, 0)

  return (
    <div className="flex flex-col min-h-screen pb-10" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="px-5 pt-10 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}>
            {t.ergebnis.round[lang]} {round} / 3
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {answeredTotal} / {TOTAL_QUESTIONS} {t.ergebnis.questionsShort[lang]}
          </span>
        </div>
        <h1 className="text-2xl font-black" style={{ color: 'var(--text)' }}>
          {config.label}
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          {config.sublabel}
        </p>
      </div>

      {/* Radar Chart */}
      <div
        className="mx-5 rounded-2xl pt-4 pb-2 overflow-hidden"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-center mb-2"
          style={{ color: 'var(--text-muted)' }}>
          {t.ergebnis.heatmapTitle[lang]}
        </p>

        <WerteRadarChart
          scores={scores}
          compareScores={peerAggregate.peerCount > 0 ? peerAggregate.scores : undefined}
          compareLabel={`${t.ergebnis.peerCompareLabelAvg[lang]} ${peerAggregate.peerCount})`}
        />

        {/* Legend */}
        <div className="flex justify-center gap-4 pb-4 flex-wrap">
          {dimensions.map((dim) => (
            <div key={dim} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: DIMENSION_COLORS[dim] }} />
              <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                {dim === 'IDENTITY' ? t.ergebnis.identity[lang] : dim === 'COMMUNITY' ? t.ergebnis.community[lang] : t.ergebnis.sociality[lang]}
              </span>
            </div>
          ))}
          {peerAggregate.peerCount > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: '#6366f1' }} />
              <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                {t.ergebnis.peerCompareLabelAvg[lang]} {peerAggregate.peerCount})
              </span>
            </div>
          )}
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
        {config.nextRound && (
          <button
            onClick={handleNextRound}
            className="w-full py-4 font-black text-lg rounded-xl transition-all active:scale-95"
            style={{
              background: 'var(--accent)',
              color: 'var(--accent-text)',
              borderRadius: 'var(--btn-radius)',
            }}
          >
            {config.nextLabel}
          </button>
        )}

        <button
          onClick={() => {
            try { localStorage.setItem(DEMO_KEY, 'true') } catch { /* ignore */ }
            router.push('/training')
          }}
          className="w-full py-3 font-semibold text-base rounded-xl transition-all active:scale-95"
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--btn-radius)',
          }}
        >
          {t.ergebnis.finishTraining[lang]}
        </button>

        <button
          onClick={handleGetPeerFeedback}
          className="w-full py-3 font-semibold text-base rounded-xl transition-all active:scale-95"
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--btn-radius)',
          }}
        >
          {shareStatus === 'copied' ? t.ergebnis.linkCopied[lang] : t.ergebnis.getPeerFeedback[lang]}
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
          {t.ergebnis.restart[lang]}
        </button>
      </div>
    </div>
  )
}
