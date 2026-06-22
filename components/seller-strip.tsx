'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Seller {
  id: string
  name: string
  initials: string
  color: string
}

interface SellerStripProps {
  sellers: Seller[]
  selectedSellerId?: string | null
  onSellerChange?: (sellerId: string | null) => void
}

export default function SellerStrip({ 
  sellers, 
  selectedSellerId,
  onSellerChange 
}: SellerStripProps) {
  return (
    <div className="bg-background border-b border-border px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm font-medium text-foreground mb-3">Shop by seller</p>
        <div className="flex gap-3 overflow-x-auto pb-2">
          <button
            onClick={() => onSellerChange?.(null)}
            className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center font-medium text-sm transition-all ${
              selectedSellerId == null
                ? 'border-secondary bg-secondary text-secondary-foreground'
                : 'border-muted text-muted-foreground hover:border-secondary'
            }`}
          >
            All
          </button>
          {sellers.map((seller) => (
            <div key={seller.id} className="flex flex-col items-center gap-1">
              <button
                onClick={() => onSellerChange?.(seller.id)}
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm text-white transition-all border-2 ${
                  selectedSellerId === seller.id
                    ? 'ring-2 ring-offset-2 ring-secondary border-secondary'
                    : 'border-transparent hover:ring-2 hover:ring-offset-2 hover:ring-secondary'
                }`}
                style={{ backgroundColor: seller.color }}
                title={seller.name}
              >
                {seller.initials}
              </button>
              <Link
                href={`/sellers/${seller.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-[10px] text-muted-foreground hover:text-primary transition whitespace-nowrap"
              >
                {seller.name.split(' ')[0]}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
