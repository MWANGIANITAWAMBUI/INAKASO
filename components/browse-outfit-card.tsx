'use client'

import { useState } from 'react'
import { Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Item {
  id: string
  name: string
  price: number
}

interface BrowseOutfitCardProps {
  id: string
  items: Item[]
  seller: string
  city: string
  category: string
  featured?: boolean
  isNew?: boolean
  onAddToCart?: (outfitId: string) => void
  onItemHighlight?: (itemId: string | null) => void
  highlightedItemId?: string | null
}

// Photos matched exactly to each outfit id
// out1: Office - wrap dress, boots
// out2: Casual - linen shirt, canvas pants
// out3: Formal - silk blouse, blazer, dress pants
// out4: Boho - bohemian dress, sandals
// out5: Streetwear - hoodie, cargo pants, sneakers
// out6: Night out - bodysuit, sequin skirt, heeled boots
// out7: Casual - denim jacket, white tee, jeans
// out8: Formal - maxi dress, shawl, clutch
// out9: Casual - crop top, shorts, flip flops
const outfitPhotoMap: Record<string, string> = {
  out1: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80', // office dress boots
  out2: 'https://images.unsplash.com/photo-1617952236317-0bd127407984?w=800&q=80', // linen casual
  out3: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80', // formal blazer
  out4: 'https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=800&q=80', // boho dress
  out5: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80', // streetwear hoodie
  out6: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&q=80', // night out
  out7: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&q=80', // denim jeans
  out8: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80', // maxi elegant
  out9: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80', // summer casual
}

// Fallback gradients per category if image fails
const categoryGradients: Record<string, string> = {
  Office:      'linear-gradient(135deg, #7F77DD 0%, #A89FFF 100%)',
  Casual:      'linear-gradient(135deg, #D85A30 0%, #F5B87D 100%)',
  Formal:      'linear-gradient(135deg, #2C2C2A 0%, #5F5E5A 100%)',
  Boho:        'linear-gradient(135deg, #C4A57B 0%, #E8CAA0 100%)',
  Streetwear:  'linear-gradient(135deg, #20B2AA 0%, #7AC8B8 100%)',
  'Night out': 'linear-gradient(135deg, #1a1a2e 0%, #7F77DD 100%)',
}

export default function BrowseOutfitCard({
  id,
  items,
  seller,
  city,
  category,
  featured = false,
  isNew = false,
  onAddToCart,
  onItemHighlight,
  highlightedItemId
}: BrowseOutfitCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imgError, setImgError] = useState(false)
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0)

  const photoUrl = outfitPhotoMap[id]
  const fallbackGradient = categoryGradients[category] ?? 'linear-gradient(135deg, #D85A30 0%, #F5B87D 100%)'

  return (
    <div className={`rounded-2xl overflow-hidden bg-background card-hover-glow ${featured ? 'lg:col-span-2' : ''}`}>
      {/* Image Container */}
      <div
        className={`relative ${featured ? 'h-80 sm:h-96 md:h-[32rem]' : 'h-72'} group`}
        style={imgError || !photoUrl ? { background: fallbackGradient } : {}}
      >
        {/* Photo */}
        {!imgError && photoUrl && (
          <Image
            src={photoUrl}
            alt={`${category} outfit by ${seller}`}
            fill
            className="object-cover object-top"
            onError={() => setImgError(true)}
            sizes={featured ? '100vw' : '(max-width: 768px) 100vw, 33vw'}
          />
        )}

        {/* Gradient overlay — darkens bottom so price tags pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

        {/* New Today Badge */}
        {isNew && (
          <div className="absolute top-4 left-14 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold z-10">
            New today
          </div>
        )}

        {/* Price Tag Stickers — right side, staggered */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => onItemHighlight?.(highlightedItemId === item.id ? null : item.id)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all transform text-left ${
                highlightedItemId === item.id
                  ? 'bg-white text-foreground ring-2 scale-110 shadow-xl'
                  : 'bg-white/90 text-foreground hover:bg-white hover:scale-105 shadow-md'
              }`}
              style={{
                marginRight: `${idx * 6}px`,
                // ring handled via className
              }}
            >
              <span className="block text-[10px] text-muted-foreground leading-tight">{item.name}</span>
              <span className="font-bold text-xs">KSh {item.price.toLocaleString()}</span>
            </button>
          ))}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all z-20"
        >
          <Heart
            className={`w-5 h-5 ${isWishlisted ? 'fill-primary text-primary' : 'text-foreground'}`}
          />
        </button>

        {/* AI Badge — bottom left */}
        <div className="absolute bottom-4 left-4 bg-white/90 text-foreground px-3 py-1 rounded-full text-xs font-semibold z-10 shadow-sm">
          AI styled ✦
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4 bg-background">
        <div className="mb-3">
          <Link
            href={`/sellers/${seller.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-sm font-semibold text-foreground hover:text-primary transition"
          >
            {seller}
          </Link>
          <p className="text-xs text-muted-foreground">{city} · {category}</p>
        </div>

        <div className="flex items-center justify-between mb-4 pb-4 border-t border-border pt-3">
          <div>
            <p className="text-lg font-bold" style={{ color: '#D85A30' }}>
              KSh {totalPrice.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">{items.length} items</p>
          </div>
        </div>

        <button
          onClick={() => onAddToCart?.(id)}
          className="w-full py-3 bg-foreground text-background font-semibold rounded-lg hover:bg-muted-foreground transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">Add outfit to cart</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </div>
  )
}
