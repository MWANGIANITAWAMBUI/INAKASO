'use client'

import { User } from '@/contexts/AuthContext'

interface ProfileHeaderProps {
  user: User
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="bg-white border-b border-border pb-8">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          {/* Avatar */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-white"
            style={{ backgroundColor: '#D85A30' }}
          >
            {user.avatar || user.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">{user.name}</h1>
            {user.location && (
              <p className="text-muted-foreground text-lg mb-4">📍 {user.location}</p>
            )}
            {user.bio && <p className="text-foreground text-sm">{user.bio}</p>}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          <div className="text-center md:text-left">
            <p className="text-2xl md:text-3xl font-bold" style={{ color: '#D85A30' }}>
              {user.stats.wishlistCount}
            </p>
            <p className="text-sm text-muted-foreground">Items Wishlisted</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-2xl md:text-3xl font-bold" style={{ color: '#7F77DD' }}>
              {user.stats.purchasesCount}
            </p>
            <p className="text-sm text-muted-foreground">Outfits Purchased</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-2xl md:text-3xl font-bold" style={{ color: '#20B2AA' }}>
              {user.stats.followingCount}
            </p>
            <p className="text-sm text-muted-foreground">Following</p>
          </div>
        </div>
      </div>
    </div>
  )
}
