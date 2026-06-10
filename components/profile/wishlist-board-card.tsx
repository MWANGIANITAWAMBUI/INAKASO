'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface WishlistBoard {
  id: string
  name: string
  outfitIds: string[]
  gradients?: string[]
}

interface WishlistBoardCardProps {
  board: WishlistBoard
}

export default function WishlistBoardCard({ board }: WishlistBoardCardProps) {
  const gradients = board.gradients || [
    'linear-gradient(135deg, #D85A30 0%, #E8956B 100%)',
    'linear-gradient(135deg, #7F77DD 0%, #A89FFF 100%)',
    'linear-gradient(135deg, #20B2AA 0%, #7AC8B8 100%)',
    'linear-gradient(135deg, #C4A57B 0%, #E8CAA0 100%)',
  ]

  return (
    <Link href={`/profile/board/${board.id}`}>
      <div className="group cursor-pointer">
        <div className="rounded-xl overflow-hidden mb-3 bg-muted">
          {/* 2x2 Grid of outfit thumbnails */}
          <div className="grid grid-cols-2 gap-0 aspect-square">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="aspect-square"
                style={{ background: gradients[idx % gradients.length] }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground text-lg">{board.name}</h3>
            <p className="text-sm text-muted-foreground">{board.outfitIds.length} outfits</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition" />
        </div>
      </div>
    </Link>
  )
}
