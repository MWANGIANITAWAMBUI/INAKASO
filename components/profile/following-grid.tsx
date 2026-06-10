'use client'

import { Users } from 'lucide-react'

export interface SellerProfile {
  id: string
  name: string
  avatar: string
  location: string
  followerCount: number
  isFollowing: boolean
}

interface FollowingGridProps {
  sellers: SellerProfile[]
  onFollowToggle?: (sellerId: string, isFollowing: boolean) => void
}

export default function FollowingGrid({ sellers, onFollowToggle }: FollowingGridProps) {
  if (sellers.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-muted-foreground">Not following anyone yet. Discover sellers!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sellers.map((seller) => (
        <div key={seller.id} className="border border-border rounded-xl p-6 text-center hover:shadow-md transition">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold text-white mx-auto mb-4"
            style={{ backgroundColor: '#D85A30' }}
          >
            {seller.avatar}
          </div>

          <h3 className="font-semibold text-foreground text-lg mb-1">{seller.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">📍 {seller.location}</p>

          <p className="text-sm text-muted-foreground mb-4">
            <span className="font-medium text-foreground">{seller.followerCount}</span> followers
          </p>

          <button
            onClick={() => onFollowToggle?.(seller.id, !seller.isFollowing)}
            className={`w-full py-2 rounded-lg font-semibold transition ${
              seller.isFollowing
                ? 'border-2 border-foreground text-foreground'
                : 'text-white'
            }`}
            style={{
              backgroundColor: seller.isFollowing ? 'transparent' : '#D85A30',
              borderColor: seller.isFollowing ? '#2C2C2A' : '#D85A30',
            }}
          >
            {seller.isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
      ))}
    </div>
  )
}
