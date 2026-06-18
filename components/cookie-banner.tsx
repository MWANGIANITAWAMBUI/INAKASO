'use client'

import { useState, useEffect } from 'react'
import { Shield, X } from 'lucide-react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('inakaso_cookie_consent')
    if (!consent) {
      // Small delay so the page renders first
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('inakaso_cookie_consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('inakaso_cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none">
      <div
        className="max-w-2xl mx-auto pointer-events-auto rounded-2xl border border-border shadow-2xl p-5 md:p-6"
        style={{ backgroundColor: '#FAEEDA' }}
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: '#D85A30' }}
          >
            <Shield className="w-5 h-5 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-bold text-foreground text-sm md:text-base">
                We care about your privacy
              </h3>
              <button
                onClick={decline}
                className="shrink-0 text-muted-foreground hover:text-foreground transition"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Inakaso uses cookies to personalise your experience, remember your cart, and help our AI
              style recommendations work better for you.{' '}
              <Link
                href="/privacy"
                className="underline font-medium"
                style={{ color: '#D85A30' }}
              >
                Privacy policy
              </Link>
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={accept}
                className="px-5 py-2.5 rounded-xl font-semibold text-white text-sm transition hover:opacity-90"
                style={{ backgroundColor: '#D85A30' }}
              >
                Accept all cookies
              </button>
              <button
                onClick={decline}
                className="px-5 py-2.5 rounded-xl font-semibold text-sm border-2 border-foreground/20 text-foreground transition hover:bg-foreground/5"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
