'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  MapPin,
  Star,
  ShoppingCart,
  Heart,
  Package,
  Users,
  BadgeCheck,
  Share2,
} from 'lucide-react'

// ─── Mock seller data keyed by username ──────────────────────────────────────
const mockSellers: Record<string, SellerProfile> = {
  'vintage-vibes': {
    username: 'vintage-vibes',
    displayName: 'Vintage Vibes',
    initials: 'VV',
    color: '#D85A30',
    city: 'Nairobi',
    bio: 'Curating the best pre-loved gems since 2021. Every piece tells a story — let AI help you style it into something new.',
    rating: 4.8,
    reviewCount: 134,
    salesCount: 312,
    itemsListed: 47,
    followersCount: 820,
    memberSince: 'March 2021',
    verified: true,
    items: [
      { id: 'i1', name: 'Zara Wrap Dress', price: 2400, category: 'Women', condition: 'Like New', photo: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80' },
      { id: 'i2', name: 'Leather Belt', price: 800, category: 'Accessories', condition: 'Good', photo: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&q=80' },
      { id: 'i3', name: 'Ankle Boots', price: 3200, category: 'Shoes', condition: 'Like New', photo: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80' },
      { id: 'i4', name: 'Black Bodysuit', price: 1600, category: 'Women', condition: 'Good', photo: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400&q=80' },
      { id: 'i5', name: 'Sequin Skirt', price: 3100, category: 'Women', condition: 'Excellent', photo: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&q=80' },
      { id: 'i6', name: 'Heeled Boots', price: 3800, category: 'Shoes', condition: 'Good', photo: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?w=400&q=80' },
    ],
    reviews: [
      { reviewer: 'Amina K.', rating: 5, comment: 'Dress arrived exactly as described. Smells fresh, no damage. Will buy again!', date: '2 days ago' },
      { reviewer: 'Wanjiru M.', rating: 5, comment: 'Fast shipping, cute packaging. The AI outfit suggestion was spot on 🔥', date: '1 week ago' },
      { reviewer: 'Fatuma A.', rating: 4, comment: 'Good quality, slight delay in communication but overall great experience.', date: '2 weeks ago' },
    ],
  },
  'eco-threads': {
    username: 'eco-threads',
    displayName: 'Eco Threads',
    initials: 'ET',
    color: '#7F77DD',
    city: 'Kampala',
    bio: 'Sustainable fashion from East Africa. Every piece I sell means one less item in a landfill.',
    rating: 4.6,
    reviewCount: 89,
    salesCount: 201,
    itemsListed: 31,
    followersCount: 510,
    memberSince: 'August 2022',
    verified: true,
    items: [
      { id: 'j1', name: 'Linen Shirt', price: 1800, category: 'Men', condition: 'Like New', photo: 'https://images.unsplash.com/photo-1617952236317-0bd127407984?w=400&q=80' },
      { id: 'j2', name: 'Canvas Pants', price: 2000, category: 'Men', condition: 'Good', photo: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80' },
      { id: 'j3', name: 'Denim Jacket', price: 2300, category: 'Unisex', condition: 'Good', photo: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=400&q=80' },
    ],
    reviews: [
      { reviewer: 'Daniel O.', rating: 5, comment: 'Top notch seller. Linen shirt is exactly as listed.', date: '3 days ago' },
      { reviewer: 'Nakato B.', rating: 4, comment: 'Loved the packaging — eco-friendly wrapping too!', date: '1 week ago' },
    ],
  },
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface SellerItem {
  id: string
  name: string
  price: number
  category: string
  condition: string
  photo: string
}

interface Review {
  reviewer: string
  rating: number
  comment: string
  date: string
}

interface SellerProfile {
  username: string
  displayName: string
  initials: string
  color: string
  city: string
  bio: string
  rating: number
  reviewCount: number
  salesCount: number
  itemsListed: number
  followersCount: number
  memberSince: string
  verified: boolean
  items: SellerItem[]
  reviews: Review[]
}

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
        />
      ))}
    </div>
  )
}

// ─── Item Card ────────────────────────────────────────────────────────────────
function SellerItemCard({ item }: { item: SellerItem }) {
  const [wishlisted, setWishlisted] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <div className="rounded-2xl overflow-hidden bg-card border border-border card-hover-glow group">
      <div className="relative h-52 bg-muted">
        {!imgError && (
          <Image
            src={item.photo}
            alt={item.name}
            fill
            className="object-cover object-top"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Condition badge */}
        <div className="absolute top-3 left-3 bg-white/90 text-foreground px-2 py-1 rounded-lg text-xs font-semibold">
          {item.condition}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-md"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-primary text-primary' : 'text-foreground'}`} />
        </button>
      </div>

      <div className="p-3">
        <p className="font-semibold text-sm text-foreground truncate">{item.name}</p>
        <p className="text-xs text-muted-foreground mb-2">{item.category}</p>
        <div className="flex items-center justify-between">
          <p className="font-bold text-base" style={{ color: '#D85A30' }}>
            KSh {item.price.toLocaleString()}
          </p>
          <button className="p-1.5 rounded-lg bg-foreground text-background hover:bg-muted-foreground transition">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SellerStorefrontPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = use(params)
  const [activeTab, setActiveTab] = useState<'items' | 'reviews'>('items')
  const [isFollowing, setIsFollowing] = useState(false)

  // Look up mock seller; fall back to a generated placeholder
  const seller: SellerProfile = mockSellers[username] ?? {
    username,
    displayName: username.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    initials: username.slice(0, 2).toUpperCase(),
    color: '#D85A30',
    city: 'Nairobi',
    bio: 'Secondhand fashion seller on Inakaso.',
    rating: 0,
    reviewCount: 0,
    salesCount: 0,
    itemsListed: 0,
    followersCount: 0,
    memberSince: '2024',
    verified: false,
    items: [],
    reviews: [],
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Top nav bar */}
      <nav className="sticky top-0 z-40 bg-background border-b border-border px-4 md:px-8 py-4 flex items-center justify-between">
        <Link
          href="/browse"
          className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to browse
        </Link>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span className="text-xl font-bold" style={{ color: '#D85A30' }}>i</span>
          <span className="text-xl font-bold" style={{ color: '#7F77DD' }}>nakaso</span>
        </Link>

        <button
          onClick={() => navigator.share?.({ title: seller.displayName, url: window.location.href })}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </nav>

      {/* Profile header */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-8 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shrink-0 shadow-lg"
            style={{ backgroundColor: seller.color }}
          >
            {seller.initials}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-foreground">{seller.displayName}</h1>
              {seller.verified && (
                <BadgeCheck className="w-5 h-5 shrink-0" style={{ color: '#D85A30' }} />
              )}
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{seller.city}</span>
              <span>·</span>
              <span>Member since {seller.memberSince}</span>
            </div>

            {seller.rating > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <StarRating rating={seller.rating} />
                <span className="text-sm font-semibold text-foreground">{seller.rating}</span>
                <span className="text-sm text-muted-foreground">({seller.reviewCount} reviews)</span>
              </div>
            )}
          </div>

          {/* Follow button */}
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`shrink-0 px-6 py-2.5 rounded-xl font-semibold text-sm transition border-2 ${
              isFollowing
                ? 'border-foreground/20 text-foreground bg-transparent hover:bg-muted'
                : 'text-white border-transparent hover:opacity-90'
            }`}
            style={isFollowing ? {} : { backgroundColor: '#D85A30' }}
          >
            {isFollowing ? 'Following ✓' : '+ Follow'}
          </button>
        </div>

        {/* Bio */}
        {seller.bio && (
          <p className="mt-4 text-sm text-foreground/80 leading-relaxed max-w-xl">
            {seller.bio}
          </p>
        )}

        {/* Stats row */}
        <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-3">
          {[
            { icon: Package, label: 'Items listed', value: seller.itemsListed },
            { icon: ShoppingCart, label: 'Total sales', value: seller.salesCount },
            { icon: Users, label: 'Followers', value: seller.followersCount },
            { icon: Star, label: 'Rating', value: seller.rating > 0 ? seller.rating.toFixed(1) : '—' },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="bg-card border border-border rounded-xl p-3 flex flex-col items-center gap-1 text-center"
            >
              <Icon className="w-4 h-4 text-muted-foreground" />
              <p className="text-lg font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="flex border-b border-border mb-6">
          {(['items', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold capitalize transition border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'items'
                ? `Items (${seller.items.length})`
                : `Reviews (${seller.reviews.length})`}
            </button>
          ))}
        </div>

        {/* Items grid */}
        {activeTab === 'items' && (
          <>
            {seller.items.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Package className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="font-medium">No items listed yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-12">
                {seller.items.map((item) => (
                  <SellerItemCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-4 pb-12">
            {seller.reviews.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Star className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="font-medium">No reviews yet</p>
              </div>
            ) : (
              seller.reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-2xl p-5"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-semibold text-sm text-foreground">{review.reviewer}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
