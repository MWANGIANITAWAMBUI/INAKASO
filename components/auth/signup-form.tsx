'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

export default function SignupForm() {
  const [tab, setTab] = useState<'buyer' | 'seller'>('buyer')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password) {
      setError('Please fill in all required fields')
      return
    }

    if (tab === 'seller' && !location) {
      setError('Please enter your location')
      return
    }

    setIsLoading(true)

    try {
      await signup({
        name,
        email,
        password,
        userType: tab,
        location: tab === 'seller' ? location : undefined,
        bio: tab === 'seller' ? bio : undefined,
      })
      router.push('/profile')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      {/* Tabs */}
      <div className="flex gap-8 border-b border-border">
        <button
          type="button"
          onClick={() => setTab('buyer')}
          className={`pb-3 font-semibold transition-colors ${
            tab === 'buyer'
              ? 'text-primary border-b-2'
              : 'text-muted-foreground border-b-2 border-transparent'
          }`}
          style={tab === 'buyer' ? { color: '#D85A30', borderColor: '#D85A30' } : {}}
        >
          I want to shop
        </button>
        <button
          type="button"
          onClick={() => setTab('seller')}
          className={`pb-3 font-semibold transition-colors ${
            tab === 'seller'
              ? 'text-secondary border-b-2'
              : 'text-muted-foreground border-b-2 border-transparent'
          }`}
          style={tab === 'seller' ? { color: '#7F77DD', borderColor: '#7F77DD' } : {}}
        >
          I want to sell
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Common Fields */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {tab === 'buyer' ? 'Full name' : 'Shop name'}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={tab === 'buyer' ? 'Your name' : 'Shop name'}
          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 pr-12 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Seller-Specific Fields */}
      {tab === 'seller' && (
        <>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              City / Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Nairobi, Mombasa, Kampala"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Short bio ({bio.length}/150)
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 150))}
              placeholder="Tell buyers about your shop..."
              maxLength={150}
              rows={3}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
            />
          </div>

          <div className="p-3 bg-muted rounded-lg border border-border">
            <p className="text-sm text-foreground">
              <span className="font-semibold">Payment method:</span> You&apos;ll set this up after
              account creation
            </p>
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-lg font-semibold text-white transition transform hover:scale-105 disabled:opacity-50"
        style={{
          backgroundColor: tab === 'buyer' ? '#D85A30' : '#7F77DD',
        }}
      >
        {isLoading ? 'Creating account...' : tab === 'buyer' ? 'Create account' : 'Start selling'}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold" style={{ color: '#D85A30' }}>
          Sign in
        </Link>
      </p>
    </form>
  )
}
