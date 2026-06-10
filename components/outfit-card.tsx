'use client'

interface OutfitCardProps {
  id: string
  items: Array<{
    name: string
    price: number
  }>
  gradient: string
}

export default function OutfitCard({ items, gradient }: OutfitCardProps) {
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      {/* Gradient Placeholder */}
      <div 
        className="relative w-full aspect-square overflow-hidden"
        style={{ background: gradient }}
      >
        {/* AI Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
          <span className="text-sm font-semibold text-foreground">AI styled</span>
          <span className="text-lg">✦</span>
        </div>

        {/* Price Tags overlaid as stickers */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur rounded-lg px-3 py-2 shadow-md w-fit self-end text-sm font-semibold"
              style={{ color: idx % 2 === 0 ? '#D85A30' : '#7F77DD' }}
            >
              ${item.price}
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 space-y-4">
        {/* Item Names */}
        <div className="space-y-1.5">
          {items.map((item, idx) => (
            <p key={idx} className="text-sm text-foreground/75">
              {item.name}
            </p>
          ))}
        </div>

        {/* Total Price & Button */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <p className="text-xs text-foreground/60">Total outfit</p>
            <p className="text-2xl font-bold text-foreground">
              ${totalPrice}
            </p>
          </div>
          <button
            className="px-4 py-2.5 rounded-lg font-semibold text-white transition transform hover:scale-105 text-sm whitespace-nowrap"
            style={{ backgroundColor: '#D85A30' }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
