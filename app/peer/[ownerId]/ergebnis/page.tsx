'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getAnswers, getRound, TOTAL_QUESTIONS } from '@/lib/peerSurvey'

const ROUND_CONFIG = {
  1: { label: 'Runde 1 geschafft', nextLabel: 'Runde 2 starten', nextRound: true },
  2: { label: 'Runde 2 geschafft', nextLabel: 'Runde 3 starten', nextRound: true },
  3: { label: 'Danke!', nextLabel: null, nextRound: false },
}

export default function PeerErgebnisPage() {
  const router = useRouter()
  const params = useParams<{ ownerId: string }>()
  const ownerId = params.ownerId
  const [round, setRound] = useState<1 | 2 | 3>(1)
  const [answeredTotal, setAnsweredTotal] = useState(0)

  useEffect(() => {
    if (!ownerId) return
    const answers = getAnswers(ownerId)
    if (Object.keys(answers).length === 0) {
      router.replace(`/peer/${ownerId}`)
      return
    }
    setAnsweredTotal(Object.keys(answers).length)
    setRound(getRound(answers))
  }, [router, ownerId])

  if (answeredTotal === 0) return null

  const config = ROUND_CONFIG[round]

  return (
    <div className="flex flex-col min-h-screen px-5 pt-16 pb-10" style={{ background: 'var(--bg)' }}>
      <div className="flex-1 flex flex-col justify-center gap-6 text-center">
        <div className="text-6xl mb-2">{config.nextRound ? '✅' : '🙏'}</div>
        <h1 className="text-2xl font-black" style={{ color: 'var(--text)' }}>
          {config.label}
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {answeredTotal} / {TOTAL_QUESTIONS} Fragen beantwortet.
        </p>
        {!config.nextRound && (
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Deine Einschätzung wurde übermittelt und fließt anonym in das Ergebnis ein.
          </p>
        )}
      </div>

      {config.nextRound && (
        <button
          onClick={() => router.push(`/peer/${ownerId}`)}
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
    </div>
  )
}
