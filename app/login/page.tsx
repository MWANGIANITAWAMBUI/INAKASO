'use client'

import LoginForm from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="flex items-baseline justify-center gap-1 mb-8">
            <span className="text-5xl font-bold" style={{ color: '#D85A30' }}>
              i
            </span>
            <span className="text-4xl font-bold" style={{ color: '#7F77DD' }}>
              nakaso
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your Inakaso account</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
