'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, ShoppingCart, Bell, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface BrowseNavbarProps {
  cartItemCount?: number
  notificationCount?: number
  onSearchChange?: (query: string) => void
  onCartClick?: () => void
}

export default function BrowseNavbar({
  cartItemCount = 0,
  notificationCount = 0,
  onSearchChange,
  onCartClick
}: BrowseNavbarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { user } = useAuth()

  const handleProfileClick = () => {
    if (user) {
      router.push('/profile')
    } else {
      router.push('/login')
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearchChange?.(query)
  }

  const handleBellClick = () => {
    if (notificationCount === 0) {
      setToastVisible(true)
      setTimeout(() => setToastVisible(false), 2500)
    } else {
      setShowNotifications(!showNotifications)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search outfits, sellers..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={handleBellClick}
                className="relative p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 bg-primary text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Toast — no notifications */}
              {toastVisible && (
                <div className="absolute right-0 top-12 bg-foreground text-background text-xs font-medium px-4 py-2 rounded-lg shadow-lg whitespace-nowrap animate-fade-in-out z-50">
                  No new notifications
                </div>
              )}

              {/* Dropdown — has notifications */}
              {showNotifications && notificationCount > 0 && (
                <div className="absolute right-0 top-12 w-72 bg-background border border-border rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="font-semibold text-sm">Notifications</p>
                  </div>
                  <div className="px-4 py-3 text-sm text-muted-foreground">
                    You have {notificationCount} new notification{notificationCount > 1 ? 's' : ''}
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Profile */}
            <button
              onClick={handleProfileClick}
              className="p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              <User className="w-5 h-5" />
            </button>

          </div>
        </div>
      </div>
    </nav>
  )
}
