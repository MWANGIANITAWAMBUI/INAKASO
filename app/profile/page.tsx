'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/auth/protected-route'
import CreateBoardModal from '@/components/profile/create-board-modal'
import PurchaseHistoryList, { Purchase } from '@/components/profile/purchase-history-list'
import { useAuth } from '@/contexts/AuthContext'
import {
  Plus, LogOut, ShoppingBag, LayoutDashboard, ShoppingCart,
  Heart, Clock, Sparkles, Bell, Star, BadgeCheck,
  ChevronRight, Trash2, Package, Truck, CheckCircle,
  Users, X, MapPin
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const OUTFIT_PHOTOS = [
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&q=80',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&q=80',
  'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=300&q=80',
  'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=300&q=80',
  'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=300&q=80',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80',
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&q=80',
  'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=300&q=80',
]

const mockBoards = [
  { id: 'board-1', name: 'Work fits', outfitIds: ['1','2','3','4'], photos: [OUTFIT_PHOTOS[0], OUTFIT_PHOTOS[1], OUTFIT_PHOTOS[2], OUTFIT_PHOTOS[3]] },
  { id: 'board-2', name: 'Weekend looks', outfitIds: ['5','6'], photos: [OUTFIT_PHOTOS[4], OUTFIT_PHOTOS[5], OUTFIT_PHOTOS[6], OUTFIT_PHOTOS[7]] },
  { id: 'board-3', name: 'Date night', outfitIds: ['7','8','9'], photos: [OUTFIT_PHOTOS[2], OUTFIT_PHOTOS[0], OUTFIT_PHOTOS[5], OUTFIT_PHOTOS[1]] },
]

const mockPurchases: Purchase[] = [
  { id: 'order-1', outfitName: 'Classic Ankara Set', seller: 'Vintage Vibes', price: 6400, date: new Date('2024-02-10'), status: 'delivered', items: 3 },
  { id: 'order-2', outfitName: 'Boho Summer', seller: 'Eco Threads', price: 5200, date: new Date('2024-02-05'), status: 'shipped', items: 2 },
  { id: 'order-3', outfitName: 'Office Essentials', seller: 'Modern Mix', price: 7800, date: new Date('2024-01-28'), status: 'delivered', items: 3 },
]

const mockCartItems = [
  { id: 'c1', name: 'Zara Wrap Dress', seller: 'Vintage Vibes', price: 2400, photo: OUTFIT_PHOTOS[0] },
  { id: 'c2', name: 'Ankle Boots', seller: 'Eco Threads', price: 3200, photo: OUTFIT_PHOTOS[6] },
]

const mockRecentlyViewed = [
  { id: 'r1', name: 'Floral Midi Dress', price: 3800, photo: OUTFIT_PHOTOS[2], seller: 'Thrift Queen' },
  { id: 'r2', name: 'Linen Blazer', price: 4200, photo: OUTFIT_PHOTOS[7], seller: 'Eco Threads' },
  { id: 'r3', name: 'Sequin Skirt', price: 3100, photo: OUTFIT_PHOTOS[4], seller: 'Vintage Vibes' },
  { id: 'r4', name: 'Woven Bag', price: 1800, photo: OUTFIT_PHOTOS[5], seller: 'Modern Mix' },
]

const mockNotifications = [
  { id: 'n1', type: 'price_drop', message: 'Floral Midi Dress dropped to KSh 3,200', time: '2h ago', read: false },
  { id: 'n2', type: 'new_item', message: 'Vintage Vibes added 3 new items', time: '5h ago', read: false },
  { id: 'n3', type: 'sale', message: 'Your order "Classic Ankara Set" was delivered', time: '1d ago', read: true },
  { id: 'n4', type: 'new_item', message: 'Eco Threads added new items you might like', time: '2d ago', read: true },
]

const mockFollowing = [
  { id: 's1', name: 'Vintage Vibes', initials: 'VV', color: '#D85A30', city: 'Nairobi', followers: 1243, newItems: 3 },
  { id: 's2', name: 'Eco Threads', initials: 'ET', color: '#7F77DD', city: 'Mombasa', followers: 856, newItems: 1 },
  { id: 's3', name: 'Modern Mix', initials: 'MM', color: '#20B2AA', city: 'Kisumu', followers: 2104, newItems: 0 },
]

const mockReviews = [
  { id: 'rv1', seller: 'Vintage Vibes', order: 'Classic Ankara Set', rating: 5, comment: 'Dress arrived exactly as described. Smells fresh, no damage.', date: '10 Feb 2024' },
  { id: 'rv2', seller: 'Eco Threads', order: 'Boho Summer', rating: 4, comment: 'Good quality, slight delay but overall great seller.', date: '5 Feb 2024' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} className={`w-3.5 h-3.5 ${s <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
      ))}
    </div>
  )
}

function WishlistBoardCard({ board, onDelete }: { board: typeof mockBoards[0], onDelete: (id: string) => void }) {
  return (
    <div className="group cursor-pointer">
      <div className="rounded-2xl overflow-hidden mb-3 bg-muted relative">
        <div className="grid grid-cols-2 gap-0.5 aspect-square">
          {[0,1,2,3].map(idx => (
            <div key={idx} className="relative overflow-hidden">
              <Image
                src={board.photos[idx] || OUTFIT_PHOTOS[idx]}
                alt=""
                fill
                className="object-cover object-top"
                sizes="150px"
              />
            </div>
          ))}
        </div>
        <button
          onClick={(e) => { e.preventDefault(); onDelete(board.id) }}
          className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition shadow"
        >
          <X className="w-3.5 h-3.5 text-foreground" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">{board.name}</h3>
          <p className="text-sm text-muted-foreground">{board.outfitIds.length} outfits</p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition" />
      </div>
    </div>
  )
}

function CartSection({ items, onRemove }: { items: typeof mockCartItems, onRemove: (id: string) => void }) {
  const total = items.reduce((s, i) => s + i.price, 0)
  return (
    <div>
      {items.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <ShoppingCart className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">Your cart is empty</p>
          <Link href="/browse" className="text-sm mt-1 inline-block" style={{ color: '#D85A30' }}>Browse looks →</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-4 bg-card border border-border rounded-2xl p-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <Image src={item.photo} alt={item.name} fill className="object-cover object-top" sizes="64px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{item.name}</p>
                <p className="text-sm text-muted-foreground">by {item.seller}</p>
                <p className="font-bold mt-0.5" style={{ color: '#D85A30' }}>KSh {item.price.toLocaleString()}</p>
              </div>
              <button onClick={() => onRemove(item.id)} className="p-2 hover:bg-muted rounded-lg transition text-muted-foreground hover:text-foreground">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <div className="bg-card border border-border rounded-2xl p-5 mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Subtotal</span><span>KSh {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mb-3">
              <span>Delivery</span><span>KSh 500</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-border pt-3">
              <span>Total</span><span style={{ color: '#D85A30' }}>KSh {(total + 500).toLocaleString()}</span>
            </div>
            <button className="mt-4 w-full py-3 rounded-xl font-bold text-white transition hover:opacity-90" style={{ backgroundColor: '#D85A30' }}>
              Proceed to checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function RecentlyViewed() {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {mockRecentlyViewed.map(item => (
          <Link href="/browse" key={item.id} className="group">
            <div className="relative h-48 rounded-2xl overflow-hidden mb-2">
              <Image src={item.photo} alt={item.name} fill className="object-cover object-top group-hover:scale-105 transition" sizes="200px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-2 left-2 bg-white rounded-full px-2 py-0.5 text-xs font-bold" style={{ color: '#D85A30' }}>
                KSh {item.price.toLocaleString()}
              </div>
            </div>
            <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.seller}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

function StyleStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-card border border-border rounded-2xl p-5">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Top category saved</p>
        <p className="text-xl font-bold text-foreground">Casual</p>
        <p className="text-sm text-muted-foreground mt-1">12 items saved</p>
      </div>
      <div className="bg-card border border-border rounded-2xl p-5">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Favourite seller</p>
        <p className="text-xl font-bold text-foreground">Vintage Vibes</p>
        <p className="text-sm text-muted-foreground mt-1">3 purchases</p>
      </div>
      <div className="bg-card border border-border rounded-2xl p-5">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total saved</p>
        <p className="text-xl font-bold" style={{ color: '#D85A30' }}>KSh 4,200</p>
        <p className="text-sm text-muted-foreground mt-1">vs buying new</p>
      </div>
    </div>
  )
}

function NotificationsTab() {
  const [notifs, setNotifs] = useState(mockNotifications)
  const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, read: true })))
  const unread = notifs.filter(n => !n.read).length

  const icon = (type: string) => {
    if (type === 'price_drop') return <span className="text-base">🏷️</span>
    if (type === 'new_item') return <span className="text-base">✨</span>
    return <span className="text-base">📦</span>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        {unread > 0 && (
          <button onClick={markAllRead} className="text-sm font-medium" style={{ color: '#D85A30' }}>
            Mark all as read
          </button>
        )}
      </div>
      <div className="space-y-3">
        {notifs.map(n => (
          <div
            key={n.id}
            className={`flex items-start gap-3 p-4 rounded-2xl border transition ${n.read ? 'bg-card border-border' : 'border-primary/30'}`}
            style={n.read ? {} : { backgroundColor: '#FEF3EE' }}
          >
            <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-muted">
              {icon(n.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${n.read ? 'text-foreground/80' : 'font-semibold text-foreground'}`}>{n.message}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
            </div>
            {!n.read && <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: '#D85A30' }} />}
          </div>
        ))}
      </div>
    </div>
  )
}

function FollowingTab() {
  const [sellers, setSellers] = useState(mockFollowing)
  const toggle = (id: string) => setSellers(sellers.map(s => s.id === id ? { ...s, following: !s } : s))

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {sellers.map(seller => (
        <div key={seller.id} className="bg-card border border-border rounded-2xl p-5 text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg mx-auto mb-3"
            style={{ backgroundColor: seller.color }}
          >
            {seller.initials}
          </div>
          <Link href={`/sellers/${seller.name.toLowerCase().replace(/\s+/g, '-')}`}>
            <p className="font-bold text-foreground hover:text-primary transition">{seller.name}</p>
          </Link>
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mt-1 mb-3">
            <MapPin className="w-3 h-3" />{seller.city}
          </div>
          {seller.newItems > 0 && (
            <p className="text-xs font-semibold mb-3 py-1 px-2 rounded-full inline-block" style={{ backgroundColor: '#FEF3EE', color: '#D85A30' }}>
              {seller.newItems} new item{seller.newItems > 1 ? 's' : ''}
            </p>
          )}
          <p className="text-xs text-muted-foreground mb-3">{seller.followers.toLocaleString()} followers</p>
          <button
            className="w-full py-2 rounded-xl text-sm font-semibold border-2 transition"
            style={{ borderColor: '#D85A30', color: '#D85A30' }}
          >
            Following ✓
          </button>
        </div>
      ))}
    </div>
  )
}

function ReviewsTab() {
  return (
    <div className="space-y-4">
      {mockReviews.map(review => (
        <div key={review.id} className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <p className="font-bold text-foreground">{review.seller}</p>
              <p className="text-sm text-muted-foreground">Order: {review.order}</p>
              <p className="text-xs text-muted-foreground">{review.date}</p>
            </div>
            <StarRating rating={review.rating} />
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">{review.comment}</p>
        </div>
      ))}
      {mockReviews.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Star className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>No reviews given yet</p>
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'boards' | 'cart' | 'recent' | 'stats' | 'notifications' | 'following' | 'history' | 'reviews'>('boards')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [boards, setBoards] = useState(mockBoards)
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [notifCount] = useState(mockNotifications.filter(n => !n.read).length)

  const handleCreateBoard = (name: string) => {
    setBoards([{ id: `board-${Date.now()}`, name, outfitIds: [], photos: OUTFIT_PHOTOS.slice(0, 4) }, ...boards])
    setIsModalOpen(false)
  }

  const handleLogout = () => { logout(); router.push('/') }

  if (!user) return null
  const isSeller = user.userType === 'seller'

  const memberSince = 'March 2024'
  const milestones = [
    { label: 'First purchase', achieved: true },
    { label: '5 saves', achieved: true },
    { label: '3 sellers followed', achieved: false },
  ]

  const tabs = [
    { id: 'boards', label: 'Wishlists', icon: Heart },
    { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: cartItems.length },
    { id: 'history', label: 'Orders', icon: Package },
    { id: 'recent', label: 'Recently Viewed', icon: Clock },
    { id: 'stats', label: 'Style Stats', icon: Sparkles },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: notifCount },
    { id: 'following', label: 'Following', icon: Users },
    { id: 'reviews', label: 'My Reviews', icon: Star },
  ] as const

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">

        {/* Top bar */}
        <div className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-border bg-background sticky top-0 z-40">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-xl font-bold" style={{ color: '#D85A30' }}>i</span>
            <span className="text-xl font-bold" style={{ color: '#7F77DD' }}>nakaso</span>
          </Link>
          <div className="flex items-center gap-3">
            {isSeller ? (
              <Link href="/seller" className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition hover:opacity-90" style={{ backgroundColor: '#7F77DD' }}>
                <LayoutDashboard className="w-4 h-4" />Seller dashboard
              </Link>
            ) : (
              <Link href="/browse" className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition hover:opacity-90" style={{ backgroundColor: '#D85A30' }}>
                <ShoppingBag className="w-4 h-4" />Browse looks
              </Link>
            )}
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition font-medium">
              <LogOut className="w-4 h-4" />Log out
            </button>
          </div>
        </div>

        {/* Profile header */}
        <div className="bg-white border-b border-border">
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: '#D85A30' }}>
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow">
                  <BadgeCheck className="w-5 h-5" style={{ color: '#D85A30' }} />
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-1">{user.name}</h1>
                <p className="text-sm text-muted-foreground mb-3">Member since {memberSince}</p>

                {/* Milestones */}
                <div className="flex flex-wrap gap-2">
                  {milestones.map(m => (
                    <span
                      key={m.label}
                      className={`text-xs px-3 py-1 rounded-full font-medium ${m.achieved ? 'text-white' : 'text-muted-foreground bg-muted'}`}
                      style={m.achieved ? { backgroundColor: '#D85A30' } : {}}
                    >
                      {m.achieved ? '✓ ' : ''}{m.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Wishlisted', value: 14, color: '#D85A30' },
                { label: 'Purchased', value: 3, color: '#7F77DD' },
                { label: 'Following', value: 3, color: '#20B2AA' },
                { label: 'Reviews', value: 2, color: '#C4A57B' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {isSeller ? (
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
            <div className="text-center py-20 border-2 border-dashed border-border rounded-2xl">
              <LayoutDashboard className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-bold text-foreground mb-2">You&apos;re a seller</h2>
              <p className="text-muted-foreground mb-6">Manage your listings, upload items, and track earnings.</p>
              <Link href="/seller" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition hover:opacity-90" style={{ backgroundColor: '#7F77DD' }}>
                <LayoutDashboard className="w-5 h-5" />Go to seller dashboard
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="bg-white border-b border-border">
              <div className="max-w-6xl mx-auto px-6 md:px-12">
                <div className="flex gap-1 overflow-x-auto py-1 scrollbar-hide">
                  {tabs.map(tab => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex items-center gap-1.5 px-4 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition ${isActive ? 'text-white' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
                        style={isActive ? { backgroundColor: '#D85A30' } : {}}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                        {'badge' in tab && tab.badge > 0 && (
                          <span className={`ml-1 text-xs font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/30 text-white' : 'bg-primary text-white'}`} style={isActive ? {} : { backgroundColor: '#D85A30' }}>
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Tab content */}
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 pb-16">

              {activeTab === 'boards' && (
                <div>
                  <button onClick={() => setIsModalOpen(true)} className="mb-8 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition hover:opacity-90" style={{ backgroundColor: '#D85A30' }}>
                    <Plus className="w-5 h-5" />Create new board
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {boards.map(board => (
                      <WishlistBoardCard key={board.id} board={board} onDelete={id => setBoards(boards.filter(b => b.id !== id))} />
                    ))}
                  </div>
                  <CreateBoardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateBoard} />
                </div>
              )}

              {activeTab === 'cart' && (
                <CartSection items={cartItems} onRemove={id => setCartItems(cartItems.filter(i => i.id !== id))} />
              )}

              {activeTab === 'history' && <PurchaseHistoryList purchases={mockPurchases} />}

              {activeTab === 'recent' && <RecentlyViewed />}

              {activeTab === 'stats' && <StyleStats />}

              {activeTab === 'notifications' && <NotificationsTab />}

              {activeTab === 'following' && <FollowingTab />}

              {activeTab === 'reviews' && <ReviewsTab />}

            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  )
}
