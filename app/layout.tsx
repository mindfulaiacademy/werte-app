import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wertetraining',
  description: 'Entdecke deine Werte',
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
    <html lang="de" data-theme="jobfire">
      <body className="antialiased">
        <div className="mx-auto max-w-md min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
