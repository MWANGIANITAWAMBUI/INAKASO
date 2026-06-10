'use client'

import { useState } from 'react'
import { Heart, ShoppingCart } from 'lucide-react'

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
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0)

  // Cycling gradients: coral-to-amber, purple-to-lavender, teal-to-mint, sand-to-brown
  const gradients = [
    'linear-gradient(135deg, #D85A30 0%, #E8956B 50%, #F5B87D 100%)',      // coral-to-amber
    'linear-gradient(135deg, #7F77DD 0%, #A89FFF 50%, #C9B8FF 100%)',      // purple-to-lavender
    'linear-gradient(135deg, #20B2AA 0%, #4DB8A8 50%, #7AC8B8 100%)',      // teal-to-mint
    'linear-gradient(135deg, #C4A57B 0%, #D4B896 50%, #E8CAA0 100%)',      // warm sand-to-brown
  ]
  const gradientIndex = (parseInt(id.replace('out', ''), 10) - 1) % gradients.length
  const gradient = gradients[gradientIndex]

  return (
    <div className={`rounded-2xl overflow-hidden bg-background card-hover-glow ${featured ? 'lg:col-span-2' : ''}`}>
      {/* Image Container with Price Tags */}
      <div 
        className={`relative ${featured ? 'h-80 sm:h-96 md:h-[28rem]' : 'h-64'} flex items-center justify-center group`}
        style={{ background: gradient }}
      >
        {/* New Today Badge */}
        {isNew && (
          <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold z-10">
            New today
          </div>
        )}

        {/* Price Tag Stickers - Staggered on Right Side */}
        <div className={`absolute inset-0 flex ${featured ? 'flex-col justify-start items-end' : 'flex-col justify-start items-end'} p-4 ${featured ? 'gap-3' : 'gap-2'}`}>
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => onItemHighlight?.(highlightedItemId === item.id ? null : item.id)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all transform ${
                highlightedItemId === item.id
                  ? 'bg-white text-foreground ring-2 ring-primary scale-110 shadow-lg'
                  : 'bg-white text-foreground opacity-80 hover:opacity-100 hover:scale-105'
              }`}
              style={{ 
                marginTop: featured ? `${idx * 8}px` : '0px',
                marginRight: featured ? `${idx * 4}px` : '0px'
              }}
            >
              <span className="block text-xs">{item.name}</span>
              <span className="font-bold">KSh {item.price.toLocaleString()}</span>
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

        {/* AI Badge */}
        <div className="absolute bottom-4 left-4 bg-white text-foreground px-2 py-1 rounded-full text-xs font-semibold">
          AI styled ✦
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4 bg-background">
        <div className="mb-3">
          <p className="text-sm font-medium text-muted-foreground">{seller}</p>
          <p className="text-xs text-muted-foreground">{city}</p>
          <p className="text-xs text-muted-foreground mt-1 capitalize">{category}</p>
        </div>

        <div className="mb-4 pb-4 border-t border-border pt-3">
          <p className="text-lg font-bold text-primary">
            KSh {totalPrice.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">{items.length} items</p>
        </div>

        {/* Add to Cart Button - Mobile Inline, Desktop Full Width */}
        <button
          onClick={() => onAddToCart?.(id)}
          className="w-full md:w-full py-3 md:py-3 bg-foreground text-background font-semibold rounded-lg hover:bg-muted-foreground transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">Add outfit to cart</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </div>
  )
}
