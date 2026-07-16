'use client'

import { useLanguage } from '@/lib/i18n'

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()

  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
      className="fixed top-3 right-3 z-50 text-xs font-bold px-2.5 py-1 rounded-full transition-all active:scale-95"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
      aria-label="Switch language"
    >
      {lang === 'en' ? '🇩🇪 DE' : '🇬🇧 EN'}
    </button>
  )
}
