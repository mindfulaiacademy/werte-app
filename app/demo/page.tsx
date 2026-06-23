'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const DEMO_KEY = 'wt_demo'

export default function DemoPage() {
  const router = useRouter()

  useEffect(() => {
    try { localStorage.setItem(DEMO_KEY, 'true') } catch { /* ignore */ }
    router.replace('/')
  }, [router])

  return null
}
