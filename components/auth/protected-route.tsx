'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredUserType?: 'buyer' | 'seller'
}

export default function ProtectedRoute({ children, requiredUserType }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [graceElapsed, setGraceElapsed] = useState(false)

  // Small grace window after mount before we trust "no user" enough to redirect.
  // This avoids false redirects during Next.js Fast Refresh remounts in dev,
  // where AuthContext briefly resets to null before re-hydrating from localStorage.
  useEffect(() => {
    const timer = setTimeout(() => setGraceElapsed(true), 150)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!graceElapsed) return
    if (!isLoading && !user) {
      router.push('/login')
    } else if (!isLoading && requiredUserType && user?.userType !== requiredUserType) {
      router.push('/profile')
    }
  }, [user, isLoading, router, requiredUserType, graceElapsed])

  if (isLoading || !graceElapsed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-muted border-t-primary animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-muted border-t-primary animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
