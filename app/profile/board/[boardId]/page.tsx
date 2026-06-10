'use client'

import { useState } from 'react'
import ProtectedRoute from '@/components/auth/protected-route'
import { ArrowLeft, Share2, Trash2, Edit } from 'lucide-react'
import Link from 'next/link'

interface Outfit {
  id: string
  name: string
  gradient: string
}

interface Board {
  id: string
  name: string
  outfits: Outfit[]
}

const mockBoardData: Board = {
  id: 'board-1',
  name: 'Work fits',
  outfits: [
    {
      id: 'out-1',
      name: 'Casual Friday',
      gradient: 'linear-gradient(135deg, #D85A30 0%, #E8956B 100%)',
    },
    {
      id: 'out-2',
      name: 'Meeting Ready',
      gradient: 'linear-gradient(135deg, #7F77DD 0%, #A89FFF 100%)',
    },
    {
      id: 'out-3',
      name: 'Client Call',
      gradient: 'linear-gradient(135deg, #20B2AA 0%, #7AC8B8 100%)',
    },
    {
      id: 'out-4',
      name: 'Presentation Day',
      gradient: 'linear-gradient(135deg, #C4A57B 0%, #E8CAA0 100%)',
    },
    {
      id: 'out-5',
      name: 'Team Lunch',
      gradient: 'linear-gradient(135deg, #D85A30 0%, #E8956B 100%)',
    },
    {
      id: 'out-6',
      name: 'End of Week',
      gradient: 'linear-gradient(135deg, #7F77DD 0%, #A89FFF 100%)',
    },
  ],
}

export default function BoardDetailPage() {
  const [board, setBoard] = useState(mockBoardData)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-white border-b border-border sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/profile" className="text-muted-foreground hover:text-foreground transition">
                  <ArrowLeft className="w-6 h-6" />
                </Link>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">{board.name}</h1>
                  <p className="text-sm text-muted-foreground">{board.outfits.length} outfits</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 text-muted-foreground hover:text-foreground transition rounded-lg hover:bg-muted">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-muted-foreground hover:text-foreground transition rounded-lg hover:bg-muted">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-2 text-red-500 hover:text-red-700 transition rounded-lg hover:bg-red-50">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {board.outfits.map((outfit) => (
              <div key={outfit.id} className="rounded-xl overflow-hidden bg-muted card-hover-glow">
                <div
                  className="aspect-square"
                  style={{ background: outfit.gradient }}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">{outfit.name}</h3>
                  <div className="flex gap-2 mt-3">
                    <button
                      className="flex-1 py-2 rounded-lg font-semibold transition"
                      style={{ backgroundColor: '#D85A30', color: 'white' }}
                    >
                      View
                    </button>
                    <button
                      className="px-3 py-2 rounded-lg border border-border text-foreground font-semibold transition hover:bg-muted"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
