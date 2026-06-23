'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ResetDemoPage() {
  const router = useRouter()

  useEffect(() => {
    try { localStorage.removeItem('wt_demo') } catch { /* ignore */ }
    router.replace('/')
  }, [router])

  return null
}
