'use client'

import { useState, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import BrowseNavbar from '@/components/browse-navbar'
import FilterChips from '@/components/filter-chips'
import SellerStrip from '@/components/seller-strip'
import BrowseOutfitCard from '@/components/browse-outfit-card'
import CartDrawer from '@/components/cart-drawer'

// Mock Data
interface Item {
  id: string
  name: string
  price: number
}

interface Outfit {
  id: string
  items: Item[]
  seller: string
  city: string
  category: string
  featured?: boolean
  isNew?: boolean
}

interface Seller {
  id: string
  name: string
  initials: string
  color: string
}

interface CartItem {
  outfitId: string
  outfitName: string
  price: number
  quantity: number
}

const mockSellers: Seller[] = [
  { id: 's1', name: 'Vintage Vibes', initials: 'VV', color: '#D85A30' },
  { id: 's2', name: 'Eco Threads', initials: 'ET', color: '#7F77DD' },
  { id: 's3', name: 'Modern Mix', initials: 'MM', color: '#F59E0B' },
  { id: 's4', name: 'Boho Soul', initials: 'BS', color: '#EC4899' },
  { id: 's5', name: 'City Style', initials: 'CS', color: '#06B6D4' },
]

const mockOutfits: Outfit[] = [
  {
    id: 'out1',
    featured: true,
    isNew: true,
    items: [
      { id: 'i1', name: 'Zara wrap dress', price: 2400 },
      { id: 'i2', name: 'Leather belt', price: 800 },
      { id: 'i3', name: 'Ankle boots', price: 3200 },
    ],
    seller: 'Vintage Vibes',
    city: 'Nairobi',
    category: 'Office',
  },
  {
    id: 'out2',
    isNew: true,
    items: [
      { id: 'i4', name: 'Linen shirt', price: 1800 },
      { id: 'i5', name: 'Canvas pants', price: 2000 },
    ],
    seller: 'Eco Threads',
    city: 'Kampala',
    category: 'Casual',
  },
  {
    id: 'out3',
    items: [
      { id: 'i6', name: 'Silk blouse', price: 3500 },
      { id: 'i7', name: 'Tailored blazer', price: 4200 },
      { id: 'i8', name: 'Dress pants', price: 2800 },
    ],
    seller: 'Modern Mix',
    city: 'Lagos',
    category: 'Formal',
  },
  {
    id: 'out4',
    isNew: true,
    items: [
      { id: 'i9', name: 'Printed bohemian dress', price: 2600 },
      { id: 'i10', name: 'Woven sandals', price: 1200 },
      { id: 'i11', name: 'Shell necklace', price: 600 },
    ],
    seller: 'Boho Soul',
    city: 'Dar es Salaam',
    category: 'Boho',
  },
  {
    id: 'out5',
    items: [
      { id: 'i12', name: 'Oversized hoodie', price: 2200 },
      { id: 'i13', name: 'Cargo pants', price: 2400 },
      { id: 'i14', name: 'Sneakers', price: 2800 },
    ],
    seller: 'City Style',
    city: 'Accra',
    category: 'Streetwear',
  },
  {
    id: 'out6',
    items: [
      { id: 'i15', name: 'Black bodysuit', price: 1600 },
      { id: 'i16', name: 'Sequin skirt', price: 3100 },
      { id: 'i17', name: 'Heeled boots', price: 3800 },
    ],
    seller: 'Vintage Vibes',
    city: 'Nairobi',
    category: 'Night out',
  },
  {
    id: 'out7',
    items: [
      { id: 'i18', name: 'Denim jacket', price: 2300 },
      { id: 'i19', name: 'White tee', price: 800 },
      { id: 'i20', name: 'Blue jeans', price: 2100 },
    ],
    seller: 'Eco Threads',
    city: 'Kampala',
    category: 'Casual',
  },
  {
    id: 'out8',
    items: [
      { id: 'i21', name: 'Maxi dress', price: 3800 },
      { id: 'i22', name: 'Linen shawl', price: 1500 },
      { id: 'i23', name: 'Embroidered clutch', price: 2200 },
    ],
    seller: 'Modern Mix',
    city: 'Lagos',
    category: 'Formal',
  },
  {
    id: 'out9',
    items: [
      { id: 'i24', name: 'Tie-dye crop top', price: 1300 },
      { id: 'i25', name: 'Linen shorts', price: 1600 },
      { id: 'i26', name: 'Flip flops', price: 600 },
    ],
    seller: 'Boho Soul',
    city: 'Dar es Salaam',
    category: 'Casual',
  },
]

export default function BrowsePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const boardId = searchParams.get('board')
  const boardName = searchParams.get('boardName')
  const isSavingToBoard = Boolean(boardId)

  const [selectedFilter, setSelectedFilter] = useState('All looks')
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [savedToBoard, setSavedToBoard] = useState<Set<string>>(new Set())
  const [savedToast, setSavedToast] = useState<string | null>(null)

  // Filter outfits
  const filteredOutfits = useMemo(() => {
    return mockOutfits.filter((outfit) => {
      const matchesCategory =
        selectedFilter === 'All looks' || outfit.category === selectedFilter
      const matchesSeller =
        !selectedSeller || outfit.seller === mockSellers.find(s => s.id === selectedSeller)?.name
      const matchesSearch =
        searchQuery === '' ||
        outfit.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
        outfit.items.some(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )

      return matchesCategory && matchesSeller && matchesSearch
    })
  }, [selectedFilter, selectedSeller, searchQuery])

  const handleAddToCart = (outfitId: string) => {
    const outfit = mockOutfits.find(o => o.id === outfitId)
    if (!outfit) return

    const totalPrice = outfit.items.reduce((sum, item) => sum + item.price, 0)
    const outfitName = `${outfit.seller} - ${outfit.category}`

    setCartItems((prev) => {
      const existing = prev.find(item => item.outfitId === outfitId)
      if (existing) {
        return prev.map(item =>
          item.outfitId === outfitId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [
        ...prev,
        {
          outfitId,
          outfitName,
          price: totalPrice,
          quantity: 1,
        },
      ]
    })
  }

  const handleUpdateQuantity = (outfitId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(outfitId)
      return
    }
    setCartItems((prev) =>
      prev.map(item =>
        item.outfitId === outfitId ? { ...item, quantity } : item
      )
    )
  }

  const handleRemoveItem = (outfitId: string) => {
    setCartItems((prev) => prev.filter(item => item.outfitId !== outfitId))
  }

  const handleSaveToBoard = (outfitId: string, itemIds: string[]) => {
    setSavedToBoard((prev) => new Set(prev).add(outfitId))
    const count = itemIds.length
    setSavedToast(
      `Saved ${count} item${count > 1 ? 's' : ''} to "${boardName ?? 'board'}"`
    )
    setTimeout(() => setSavedToast(null), 2500)

    // Persist into the actual board's outfitIds in localStorage
    if (boardId) {
      try {
        const raw = localStorage.getItem('inakaso_boards')
        const boards: Array<{ id: string; outfitIds: string[] }> = raw ? JSON.parse(raw) : []
        const updated = boards.map((b) =>
          b.id === boardId && !b.outfitIds.includes(outfitId)
            ? { ...b, outfitIds: [...b.outfitIds, outfitId] }
            : b
        )
        localStorage.setItem('inakaso_boards', JSON.stringify(updated))
      } catch {
        // ignore storage errors
      }
    }
  }

  const handleExitBoardMode = () => {
    router.push('/browse')
  }

  return (
    <div className="min-h-screen bg-background">
      <BrowseNavbar
        cartItemCount={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
        onSearchChange={setSearchQuery}
      />

      {/* Board saving mode banner */}
      {isSavingToBoard && (
        <div
          className="sticky top-[72px] z-30 flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3"
          style={{ backgroundColor: '#7F77DD' }}
        >
          <p className="text-sm font-semibold text-white">
            Adding to <span className="underline">{boardName ?? 'your board'}</span> — tap the heart on items you like
          </p>
          <button
            onClick={handleExitBoardMode}
            className="shrink-0 flex items-center gap-1 text-xs font-semibold text-white/90 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-4 h-4" />
            Done
          </button>
        </div>
      )}

      {/* Saved-to-board toast */}
      {savedToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background text-sm font-medium px-5 py-3 rounded-xl shadow-xl">
          {savedToast}
        </div>
      )}

      <FilterChips activeFilter={selectedFilter} onFilterChange={setSelectedFilter} />

      <SellerStrip
        sellers={mockSellers}
        selectedSellerId={selectedSeller}
        onSellerChange={setSelectedSeller}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredOutfits.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-2">No outfits found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {filteredOutfits.map((outfit, idx) => (
              <div key={outfit.id} className={idx === 0 ? 'md:col-span-2 lg:col-span-3' : ''}>
                <BrowseOutfitCard
                  id={outfit.id}
                  items={outfit.items}
                  seller={outfit.seller}
                  city={outfit.city}
                  category={outfit.category}
                  featured={idx === 0}
                  isNew={outfit.isNew}
                  onAddToCart={handleAddToCart}
                  onItemHighlight={setHighlightedItemId}
                  highlightedItemId={highlightedItemId}
                  savingToBoard={isSavingToBoard}
                  isSavedToBoard={savedToBoard.has(outfit.id)}
                  onSaveToBoard={handleSaveToBoard}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  )
}
