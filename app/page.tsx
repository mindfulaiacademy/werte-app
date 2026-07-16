'use client'

import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/i18n'

export default function Home() {
  const router = useRouter()
  const { lang, t } = useLanguage()

  return (
    <div
      className="flex flex-col min-h-screen px-5 pt-16 pb-10"
      style={{ background: 'var(--bg)' }}
    >
      <div className="flex-1 flex flex-col justify-center gap-6">
        <div className="mb-2">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
            {t.home.eyebrow[lang]}
          </p>
          <h1 className="text-3xl font-black leading-tight" style={{ color: 'var(--text)' }}>
            {t.home.heading[lang]}
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
                  {t.home.module1Badge[lang]}
                </span>
              </div>
              <h2 className="text-lg font-black mb-1" style={{ color: 'var(--text)' }}>
                {t.home.module1Title[lang]}
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {t.home.module1Desc[lang]}
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
                  {t.home.module2Badge[lang]}
                </span>
              </div>
              <h2 className="text-lg font-black mb-1" style={{ color: 'var(--text)' }}>
                {t.home.module2Title[lang]}
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {t.home.module2Desc[lang]}
              </p>
            </div>
            <span className="text-xl" style={{ color: 'var(--text-muted)' }}>→</span>
          </div>
        </button>
      </div>
    </div>
  )
}
