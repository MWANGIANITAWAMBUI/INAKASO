'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/auth/protected-route'
import ProfileHeader from '@/components/profile/profile-header'
import WishlistBoardCard, { WishlistBoard } from '@/components/profile/wishlist-board-card'
import CreateBoardModal from '@/components/profile/create-board-modal'
import PurchaseHistoryList, { Purchase } from '@/components/profile/purchase-history-list'
import FollowingGrid, { SellerProfile } from '@/components/profile/following-grid'
import { useAuth } from '@/contexts/AuthContext'
import { Plus, LogOut, ShoppingBag, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'

const mockBoards: WishlistBoard[] = [
  { id: 'board-1', name: 'Work fits', outfitIds: ['out-1', 'out-2', 'out-3', 'out-4'], gradients: ['linear-gradient(135deg, #D85A30 0%, #E8956B 100%)', 'linear-gradient(135deg, #7F77DD 0%, #A89FFF 100%)', 'linear-gradient(135deg, #C4A57B 0%, #E8CAA0 100%)', 'linear-gradient(135deg, #D85A30 0%, #E8956B 100%)'] },
  { id: 'board-2', name: 'Weekend looks', outfitIds: ['out-5', 'out-6'], gradients: ['linear-gradient(135deg, #20B2AA 0%, #7AC8B8 100%)', 'linear-gradient(135deg, #D85A30 0%, #E8956B 100%)', 'linear-gradient(135deg, #7F77DD 0%, #A89FFF 100%)', 'linear-gradient(135deg, #20B2AA 0%, #7AC8B8 100%)'] },
  { id: 'board-3', name: 'Date night', outfitIds: ['out-7', 'out-8', 'out-9'], gradients: ['linear-gradient(135deg, #7F77DD 0%, #A89FFF 100%)', 'linear-gradient(135deg, #C4A57B 0%, #E8CAA0 100%)', 'linear-gradient(135deg, #D85A30 0%, #E8956B 100%)', 'linear-gradient(135deg, #7F77DD 0%, #A89FFF 100%)'] },
]

const mockPurchases: Purchase[] = [
  { id: 'order-1', outfitName: 'Classic Ankara Set', seller: 'Vintage Vibes', price: 6400, date: new Date('2024-02-10'), status: 'delivered', items: 3 },
  { id: 'order-2', outfitName: 'Boho Summer', seller: 'Eco Threads', price: 5200, date: new Date('2024-02-05'), status: 'delivered', items: 2 },
  { id: 'order-3', outfitName: 'Office Essentials', seller: 'Modern Mix', price: 7800, date: new Date('2024-01-28'), status: 'delivered', items: 3 },
]

const mockSellers: SellerProfile[] = [
  { id: 'seller-1', name: 'Vintage Vibes', avatar: 'VV', location: 'Nairobi', followerCount: 1243, isFollowing: true },
  { id: 'seller-2', name: 'Eco Threads', avatar: 'ET', location: 'Kampala', followerCount: 856, isFollowing: true },
  { id: 'seller-3', name: 'Modern Mix', avatar: 'MM', location: 'Lagos', followerCount: 2104, isFollowing: false },
]

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'boards' | 'history' | 'following'>('boards')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [boards, setBoards] = useState(mockBoards)
  const [sellers, setSellers] = useState(mockSellers)

  const handleCreateBoard = (name: string) => {
    const newBoard: WishlistBoard = {
      id: `board-${Date.now()}`,
      name,
      outfitIds: [],
      gradients: ['linear-gradient(135deg, #D85A30 0%, #E8956B 100%)', 'linear-gradient(135deg, #7F77DD 0%, #A89FFF 100%)', 'linear-gradient(135deg, #20B2AA 0%, #7AC8B8 100%)', 'linear-gradient(135deg, #C4A57B 0%, #E8CAA0 100%)'],
    }
    setBoards([newBoard, ...boards])
    setIsModalOpen(false)
  }

  const handleLogout = () => { logout(); router.push('/') }
  const handleFollowToggle = (sellerId: string, isFollowing: boolean) => {
    setSellers(sellers.map((s) => s.id === sellerId ? { ...s, isFollowing } : s))
  }

  if (!user) return null

  const isSeller = user.userType === 'seller'

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-border bg-background">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-xl font-bold" style={{ color: '#D85A30' }}>i</span>
            <span className="text-xl font-bold" style={{ color: '#7F77DD' }}>nakaso</span>
          </Link>
          <div className="flex items-center gap-3">
            {isSeller ? (
              <Link
                href="/seller"
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: '#7F77DD' }}
              >
                <LayoutDashboard className="w-4 h-4" />
                Seller dashboard
              </Link>
            ) : (
              <Link
                href="/browse"
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: '#D85A30' }}
              >
                <ShoppingBag className="w-4 h-4" />
                Browse looks
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition font-medium"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </div>
        </div>

        <ProfileHeader user={user} />

        {/* Seller profile — no wishlist tabs, just a redirect prompt */}
        {isSeller ? (
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
            <div className="text-center py-20 border-2 border-dashed border-border rounded-2xl">
              <LayoutDashboard className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-bold text-foreground mb-2">You&apos;re a seller</h2>
              <p className="text-muted-foreground mb-6">Manage your listings, upload items, and track earnings from your seller dashboard.</p>
              <Link
                href="/seller"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition hover:opacity-90"
                style={{ backgroundColor: '#7F77DD' }}
              >
                <LayoutDashboard className="w-5 h-5" />
                Go to seller dashboard
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Buyer tabs */}
            <div className="bg-white border-b border-border sticky top-0 z-40">
              <div className="max-w-6xl mx-auto px-6 md:px-12">
                <div className="flex gap-8 overflow-x-auto">
                  {([
                    { id: 'boards', label: 'Wishlist Boards' },
                    { id: 'history', label: 'Purchase History' },
                    { id: 'following', label: 'Following' },
                  ] as const).map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-2 font-semibold border-b-2 transition whitespace-nowrap ${activeTab === tab.id ? '' : 'text-muted-foreground border-transparent'}`}
                      style={activeTab === tab.id ? { color: '#D85A30', borderColor: '#D85A30' } : {}}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
              {activeTab === 'boards' && (
                <div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mb-8 flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition transform hover:scale-105"
                    style={{ backgroundColor: '#D85A30' }}
                  >
                    <Plus className="w-5 h-5" />
                    Create new board
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {boards.map((board) => <WishlistBoardCard key={board.id} board={board} />)}
                  </div>
                  <CreateBoardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateBoard} />
                </div>
              )}
              {activeTab === 'history' && <PurchaseHistoryList purchases={mockPurchases} />}
              {activeTab === 'following' && <FollowingGrid sellers={sellers} onFollowToggle={handleFollowToggle} />}
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  )
}
