'use client'

import Link from 'next/link'
import { ChevronRight, Plus } from 'lucide-react'

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

  const isEmpty = board.outfitIds.length === 0

  if (isEmpty) {
    return (
      <div className="group">
        <Link
          href={`/browse?board=${board.id}&boardName=${encodeURIComponent(board.name)}`}
          className="block rounded-xl overflow-hidden mb-3 bg-muted aspect-square border-2 border-dashed border-border hover:border-secondary transition flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-secondary"
        >
          <Plus className="w-8 h-8" />
          <span className="text-sm font-semibold">Add outfits</span>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground text-lg">{board.name}</h3>
            <p className="text-sm text-muted-foreground">0 outfits</p>
          </div>
        </div>
      </div>
    )
  }

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
