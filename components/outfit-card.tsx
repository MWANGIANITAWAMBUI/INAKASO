'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Heart, ShoppingCart } from 'lucide-react'

interface OutfitCardProps {
  id: string
  items: Array<{
    name: string
    price: number
    photo?: string
  }>
  gradient: string
  seller?: string
  city?: string
}

export default function OutfitCard({ id, items, gradient, seller, city }: OutfitCardProps) {
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0)
  const [wishlisted, setWishlisted] = useState(false)

  const hasPhotos = items.some(item => item.photo)

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-border">
      {/* Image / Gradient area */}
      <div className="relative w-full aspect-square overflow-hidden">
        {hasPhotos ? (
          // Real photos — grid layout
          <div className={`absolute inset-0 grid gap-0.5 ${items.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
            {items.map((item, idx) => (
              <div key={idx} className="relative overflow-hidden">
                {item.photo ? (
                  <Image
                    src={item.photo}
                    alt={item.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full" style={{ background: gradient }} />
                )}
                {/* Per-item price sticker */}
                <div
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur rounded-full px-2 py-0.5 shadow text-xs font-bold whitespace-nowrap"
                  style={{ color: idx % 2 === 0 ? '#D85A30' : '#7F77DD' }}
                >
                  KSh {item.price.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Fallback gradient
          <div className="absolute inset-0" style={{ background: gradient }}>
            <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur rounded-lg px-3 py-2 shadow-md w-fit self-end text-sm font-bold"
                  style={{ color: idx % 2 === 0 ? '#D85A30' : '#7F77DD' }}
                >
                  KSh {item.price.toLocaleString()}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 z-10 p-1.5 bg-white rounded-full shadow-md hover:scale-110 transition"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-primary text-primary' : 'text-foreground'}`} />
        </button>
      </div>

      {/* Card Footer */}
      <div className="p-4 space-y-3">
        {/* Item names */}
        <div className="space-y-1">
          {items.map((item, idx) => (
            <p key={idx} className="text-sm text-foreground/75 truncate">
              {item.name}
            </p>
          ))}
        </div>

        {seller && (
          <p className="text-xs text-muted-foreground">
            by{' '}
            <Link
              href={`/sellers/${seller.toLowerCase().replace(/\s+/g, '-')}`}
              className="font-semibold hover:text-primary transition"
              style={{ color: '#7F77DD' }}
            >
              {seller}
            </Link>
            {city && ` · ${city}`}
          </p>
        )}

        {/* Total & CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <p className="text-xs text-foreground/60">Total outfit</p>
            <p className="text-xl font-bold text-foreground">
              KSh {totalPrice.toLocaleString()}
            </p>
          </div>
          <Link
            href="/browse"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-semibold text-white transition hover:opacity-90 text-sm whitespace-nowrap"
            style={{ backgroundColor: '#D85A30' }}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Shop look
          </Link>
        </div>
      </div>
    </div>
  )
}
