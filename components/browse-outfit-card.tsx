'use client'

import { useState } from 'react'
import { Heart, ShoppingCart, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { outfitPhotoMap } from '@/lib/outfits-data'

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
  onAddToCart?: (outfitId: string, itemIds: string[]) => void
  onItemHighlight?: (itemId: string | null) => void
  highlightedItemId?: string | null
  savingToBoard?: boolean
  isSavedToBoard?: boolean
  onSaveToBoard?: (outfitId: string, itemIds: string[]) => void
}

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
  highlightedItemId,
  savingToBoard = false,
  isSavedToBoard = false,
  onSaveToBoard
}: BrowseOutfitCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imgError, setImgError] = useState(false)
  // All items selected by default — buyer can deselect to build a custom cart
  const [selectedIds, setSelectedIds] = useState<string[]>(items.map(i => i.id))

  const selectedItems = items.filter(i => selectedIds.includes(i.id))
  const selectedTotal = selectedItems.reduce((sum, item) => sum + item.price, 0)
  const allSelected = selectedIds.length === items.length

  const photoUrl = outfitPhotoMap[id]
  const fallbackGradient = categoryGradients[category] ?? 'linear-gradient(135deg, #D85A30 0%, #F5B87D 100%)'

  const toggleItem = (itemId: string) => {
    setSelectedIds(prev =>
      prev.includes(itemId) ? prev.filter(x => x !== itemId) : [...prev, itemId]
    )
  }

  return (
    <div
      className={`rounded-2xl overflow-hidden bg-background card-hover-glow ${featured ? 'lg:col-span-2' : ''} ${
        savingToBoard && isSavedToBoard ? 'ring-2 ring-offset-2' : ''
      }`}
      style={savingToBoard && isSavedToBoard ? { '--tw-ring-color': '#7F77DD' } as React.CSSProperties : {}}
    >
      {/* Image Container */}
      <div
        className={`relative ${featured ? 'h-80 sm:h-96 md:h-[32rem]' : 'h-72'} group`}
        style={imgError || !photoUrl ? { background: fallbackGradient } : {}}
      >
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

        {isNew && (
          <div className="absolute top-4 left-14 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold z-10">
            New today
          </div>
        )}

        {/* Per-item checkboxes — buyer picks individual pieces */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          {items.map((item, idx) => {
            const isSelected = selectedIds.includes(item.id)
            return (
              <button
                key={item.id}
                onClick={() => {
                  toggleItem(item.id)
                  onItemHighlight?.(highlightedItemId === item.id ? null : item.id)
                }}
                className={`flex items-center gap-1.5 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all transform text-left ${
                  isSelected
                    ? 'bg-white text-foreground shadow-md'
                    : 'bg-white/50 text-foreground/50 hover:bg-white/80 shadow'
                } ${highlightedItemId === item.id ? 'ring-2 ring-secondary scale-105' : ''}`}
                style={{ marginRight: `${idx * 4}px` }}
              >
                <span
                  className={`flex items-center justify-center w-4 h-4 rounded-full border-2 shrink-0 transition ${
                    isSelected ? 'border-primary bg-primary' : 'border-foreground/30 bg-transparent'
                  }`}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                </span>
                <span>
                  <span className="block text-[10px] text-muted-foreground leading-tight">{item.name}</span>
                  <span className="font-bold text-xs">KSh {item.price.toLocaleString()}</span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Wishlist / Save-to-board Button */}
        <button
          onClick={() => {
            if (savingToBoard) {
              onSaveToBoard?.(id, selectedIds)
            } else {
              setIsWishlisted(!isWishlisted)
            }
          }}
          className={`absolute top-4 left-4 p-2 rounded-full shadow-md hover:shadow-lg transition-all z-20 ${
            savingToBoard && isSavedToBoard ? '' : 'bg-white'
          }`}
          style={savingToBoard && isSavedToBoard ? { backgroundColor: '#7F77DD' } : {}}
        >
          <Heart
            className={`w-5 h-5 ${
              savingToBoard
                ? isSavedToBoard ? 'fill-white text-white' : 'text-foreground'
                : isWishlisted ? 'fill-primary text-primary' : 'text-foreground'
            }`}
          />
        </button>
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
              KSh {selectedTotal.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">
              {selectedIds.length} of {items.length} item{items.length > 1 ? 's' : ''} selected
            </p>
          </div>
          {!allSelected && selectedIds.length > 0 && (
            <button
              onClick={() => setSelectedIds(items.map(i => i.id))}
              className="text-xs font-medium underline text-muted-foreground hover:text-foreground"
            >
              Select all
            </button>
          )}
        </div>

        <button
          onClick={() => onAddToCart?.(id, selectedIds)}
          disabled={selectedIds.length === 0}
          className="w-full py-3 bg-foreground text-background font-semibold rounded-lg hover:bg-muted-foreground transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>
            {allSelected
              ? 'Add full outfit to cart'
              : selectedIds.length === 0
                ? 'Select at least one item'
                : `Add ${selectedIds.length} item${selectedIds.length > 1 ? 's' : ''} to cart`}
          </span>
        </button>
      </div>
    </div>
  )
}
