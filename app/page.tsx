'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div
      className="flex flex-col min-h-screen px-5 pt-16 pb-10"
      style={{ background: 'var(--bg)' }}
    >
      <div className="flex-1 flex flex-col justify-center gap-6">
        <div className="mb-2">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
            Wertetraining
          </p>
          <h1 className="text-3xl font-black leading-tight" style={{ color: 'var(--text)' }}>
            Was willst du heute tun?
          </h1>
        </div>

        {/* Module 1 */}
        <button
          onClick={() => router.push('/survey')}
          className="w-full text-left rounded-2xl p-5 transition-all active:scale-95"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-start gap-4">
            <span className="text-3xl">🧭</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}
                >
                  Modul 1
                </span>
              </div>
              <h2 className="text-lg font-black mb-1" style={{ color: 'var(--text)' }}>
                Wertefitness Checkin (Selbsteinschätzung)
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Entdecke, welche Werte am stärksten in dir stecken.
              </p>
            </div>
            <span className="text-xl" style={{ color: 'var(--text-muted)' }}>→</span>
          </div>
        </button>

        {/* Module 2 */}
        <button
          onClick={() => router.push('/training')}
          className="w-full text-left rounded-2xl p-5 transition-all active:scale-95"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-start gap-4">
            <span className="text-3xl">💪</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}
                >
                  Modul 2
                </span>
              </div>
              <h2 className="text-lg font-black mb-1" style={{ color: 'var(--text)' }}>
                Trainingsplan
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Trainiere einen Wert 7 Tage lang mit täglichen Micro-Challenges.
              </p>
            </div>
            <span className="text-xl" style={{ color: 'var(--text-muted)' }}>→</span>
          </div>
        </button>
      </div>
    </div>
  )
}
