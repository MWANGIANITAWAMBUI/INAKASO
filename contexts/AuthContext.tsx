'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  userType: 'buyer' | 'seller'
  avatar?: string
  location?: string
  sizePreferences?: string[]
  bio?: string
  createdAt: Date
  stats: {
    wishlistCount: number
    purchasesCount: number
    followingCount: number
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (data: any) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockUsers: Record<string, any> = {
  'buyer@inakaso.com': {
    id: 'user-1',
    name: 'Amara Okafor',
    email: 'buyer@inakaso.com',
    userType: 'buyer',
    avatar: 'AO',
    location: 'Nairobi, Kenya',
    sizePreferences: ['S', 'M'],
    createdAt: new Date('2024-01-15'),
    stats: {
      wishlistCount: 24,
      purchasesCount: 8,
      followingCount: 12,
    },
  },
  'seller@inakaso.com': {
    id: 'user-2',
    name: 'Vintage Vibes',
    email: 'seller@inakaso.com',
    userType: 'seller',
    avatar: 'VV',
    location: 'Lagos, Nigeria',
    bio: 'Curating beautiful secondhand finds',
    createdAt: new Date('2023-06-10'),
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Hydrate from localStorage
    const savedUser = localStorage.getItem('inakaso_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('[v0] Failed to parse saved user:', error)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const mockUser = mockUsers[email]
    if (mockUser && password === 'password') {
      const userData = { ...mockUser, createdAt: new Date(mockUser.createdAt) }
      setUser(userData)
      localStorage.setItem('inakaso_user', JSON.stringify(userData))
      setIsLoading(false)
    } else {
      setIsLoading(false)
      throw new Error('Invalid email or password')
    }
  }

  const signup = async (data: any) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      userType: data.userType,
      avatar: data.name.split(' ').map((n: string) => n[0]).join('').toUpperCase(),
      location: data.location,
      sizePreferences: data.sizePreferences,
      bio: data.bio,
      createdAt: new Date(),
      stats: {
        wishlistCount: 0,
        purchasesCount: 0,
        followingCount: 0,
      },
    }

    setUser(newUser)
    localStorage.setItem('inakaso_user', JSON.stringify(newUser))
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('inakaso_user')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
