const mockOutfits = [
  {
    id: 1,
    items: ['Vintage Ankara Shirt', 'Wide-Leg Trousers', 'Leather Belt'],
    views: 456,
    wishlist: 23,
    sales: 12,
  },
  {
    id: 2,
    items: ['Silk Blouse', 'Canvas Pants', 'Ankle Boots'],
    views: 234,
    wishlist: 15,
    sales: 8,
  },
  {
    id: 3,
    items: ['Linen Shirt', 'Cargo Shorts', 'Sneakers'],
    views: 123,
    wishlist: 7,
    sales: 3,
  },
  {
    id: 4,
    items: ['Belt', 'Trousers', 'Boots'],
    views: 89,
    wishlist: 4,
    sales: 2,
  },
]

export default function MyOutfitsPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">My outfits</h1>
        <p className="text-muted-foreground mt-2">{mockOutfits.length} outfits live</p>
      </div>

      {/* Outfits List */}
      <div className="space-y-3">
        {mockOutfits.map((outfit) => (
          <div key={outfit.id} className="bg-muted rounded-xl p-4 border border-border hover:border-primary transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">AI styled ✦</span>
                  <h3 className="font-semibold text-foreground">Outfit #{outfit.id}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {outfit.items.join(' • ')}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <p className="font-bold text-foreground">{outfit.views}</p>
                  <p className="text-xs text-muted-foreground">views</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-foreground">{outfit.wishlist}</p>
                  <p className="text-xs text-muted-foreground">wishlist</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-foreground">{outfit.sales}</p>
                  <p className="text-xs text-muted-foreground">sales</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-border">
              <button className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-background transition-colors">
                View
              </button>
              <button className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-background transition-colors">
                Edit
              </button>
              <button className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                Deactivate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
