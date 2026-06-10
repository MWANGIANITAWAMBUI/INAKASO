'use client'

import { useState } from 'react'
import ProtectedRoute from '@/components/auth/protected-route'
import ProfileHeader from '@/components/profile/profile-header'
import WishlistBoardCard, { WishlistBoard } from '@/components/profile/wishlist-board-card'
import CreateBoardModal from '@/components/profile/create-board-modal'
import PurchaseHistoryList, { Purchase } from '@/components/profile/purchase-history-list'
import FollowingGrid, { SellerProfile } from '@/components/profile/following-grid'
import { useAuth } from '@/contexts/AuthContext'
import { Plus, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const mockBoards: WishlistBoard[] = [
  {
    id: 'board-1',
    name: 'Work fits',
    outfitIds: ['out-1', 'out-2', 'out-3', 'out-4'],
    gradients: [
      'linear-gradient(135deg, #D85A30 0%, #E8956B 100%)',
      'linear-gradient(135deg, #7F77DD 0%, #A89FFF 100%)',
      'linear-gradient(135deg, #C4A57B 0%, #E8CAA0 100%)',
      'linear-gradient(135deg, #D85A30 0%, #E8956B 100%)',
    ],
  },
  {
    id: 'board-2',
    name: 'Weekend looks',
    outfitIds: ['out-5', 'out-6'],
    gradients: [
      'linear-gradient(135deg, #20B2AA 0%, #7AC8B8 100%)',
      'linear-gradient(135deg, #D85A30 0%, #E8956B 100%)',
      'linear-gradient(135deg, #7F77DD 0%, #A89FFF 100%)',
      'linear-gradient(135deg, #20B2AA 0%, #7AC8B8 100%)',
    ],
  },
  {
    id: 'board-3',
    name: 'Date night',
    outfitIds: ['out-7', 'out-8', 'out-9'],
    gradients: [
      'linear-gradient(135deg, #7F77DD 0%, #A89FFF 100%)',
      'linear-gradient(135deg, #C4A57B 0%, #E8CAA0 100%)',
      'linear-gradient(135deg, #D85A30 0%, #E8956B 100%)',
      'linear-gradient(135deg, #7F77DD 0%, #A89FFF 100%)',
    ],
  },
]

const mockPurchases: Purchase[] = [
  {
    id: 'order-1',
    outfitName: 'Classic Ankara Set',
    seller: 'Vintage Vibes',
    price: 6400,
    date: new Date('2024-02-10'),
    status: 'delivered',
    items: 3,
  },
  {
    id: 'order-2',
    outfitName: 'Boho Summer',
    seller: 'Eco Threads',
    price: 5200,
    date: new Date('2024-02-05'),
    status: 'delivered',
    items: 2,
  },
  {
    id: 'order-3',
    outfitName: 'Office Essentials',
    seller: 'Modern Mix',
    price: 7800,
    date: new Date('2024-01-28'),
    status: 'delivered',
    items: 3,
  },
  {
    id: 'order-4',
    outfitName: 'Night Out',
    seller: 'City Style',
    price: 9200,
    date: new Date('2024-01-15'),
    status: 'delivered',
    items: 3,
  },
]

const mockSellers: SellerProfile[] = [
  {
    id: 'seller-1',
    name: 'Vintage Vibes',
    avatar: 'VV',
    location: 'Nairobi',
    followerCount: 1243,
    isFollowing: true,
  },
  {
    id: 'seller-2',
    name: 'Eco Threads',
    avatar: 'ET',
    location: 'Kampala',
    followerCount: 856,
    isFollowing: true,
  },
  {
    id: 'seller-3',
    name: 'Modern Mix',
    avatar: 'MM',
    location: 'Lagos',
    followerCount: 2104,
    isFollowing: false,
  },
]

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'boards' | 'history' | 'following'>('boards')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [boards, setBoards] = useState(mockBoards)
  const [sellers, setSellers] = useState(mockSellers)

  const handleCreateBoard = (name: string, description?: string) => {
    const newBoard: WishlistBoard = {
      id: `board-${Date.now()}`,
      name,
      outfitIds: [],
      gradients: [
        'linear-gradient(135deg, #D85A30 0%, #E8956B 100%)',
        'linear-gradient(135deg, #7F77DD 0%, #A89FFF 100%)',
        'linear-gradient(135deg, #20B2AA 0%, #7AC8B8 100%)',
        'linear-gradient(135deg, #C4A57B 0%, #E8CAA0 100%)',
      ],
    }
    setBoards([newBoard, ...boards])
    setIsModalOpen(false)
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const handleFollowToggle = (sellerId: string, isFollowing: boolean) => {
    setSellers(
      sellers.map((seller) =>
        seller.id === sellerId ? { ...seller, isFollowing } : seller
      )
    )
  }

  if (!user) return null

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <ProfileHeader user={user} />

        {/* Tabs */}
        <div className="bg-white border-b border-border sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between">
              <div className="flex gap-8 overflow-x-auto">
                {(
                  [
                    { id: 'boards', label: 'Wishlist Boards' },
                    { id: 'history', label: 'Purchase History' },
                    { id: 'following', label: 'Following' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 font-semibold border-b-2 transition whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-primary'
                        : 'text-muted-foreground border-transparent'
                    }`}
                    style={
                      activeTab === tab.id
                        ? { color: '#D85A30', borderColor: '#D85A30' }
                        : {}
                    }
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleLogout}
                className="p-2 text-muted-foreground hover:text-foreground transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
          {activeTab === 'boards' && (
            <div>
              {/* Create Board Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="mb-8 flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition transform hover:scale-105"
                style={{ backgroundColor: '#D85A30' }}
              >
                <Plus className="w-5 h-5" />
                Create new board
              </button>

              {/* Boards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {boards.map((board) => (
                  <WishlistBoardCard key={board.id} board={board} />
                ))}
              </div>

              <CreateBoardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateBoard} />
            </div>
          )}

          {activeTab === 'history' && <PurchaseHistoryList purchases={mockPurchases} />}

          {activeTab === 'following' && (
            <FollowingGrid sellers={sellers} onFollowToggle={handleFollowToggle} />
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
