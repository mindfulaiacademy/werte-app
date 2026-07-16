import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { LanguageProvider } from '@/lib/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import './globals.css'

export const metadata: Metadata = {
  title: 'Values Training',
  description: 'Discover your values',
  robots: 'noindex, nofollow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="jobfire">
      <body className="antialiased">
        <LanguageProvider>
          <LanguageSwitcher />
          <div className="mx-auto max-w-md min-h-screen">
            {children}
          </div>
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
