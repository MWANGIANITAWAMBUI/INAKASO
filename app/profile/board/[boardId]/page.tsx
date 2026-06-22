'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import ProtectedRoute from '@/components/auth/protected-route'
import { ArrowLeft, Share2, Trash2, Edit, Heart } from 'lucide-react'
import { getOutfitById, outfitPhotoMap } from '@/lib/outfits-data'

interface StoredBoard {
  id: string
  name: string
  outfitIds: string[]
  gradients?: string[]
}

const BOARDS_KEY = 'inakaso_boards'

function loadBoards(): StoredBoard[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(BOARDS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveBoards(boards: StoredBoard[]) {
  try {
    localStorage.setItem(BOARDS_KEY, JSON.stringify(boards))
  } catch {
    // ignore quota errors
  }
}

const fallbackGradients = [
  'linear-gradient(135deg, #D85A30 0%, #E8956B 100%)',
  'linear-gradient(135deg, #7F77DD 0%, #A89FFF 100%)',
  'linear-gradient(135deg, #20B2AA 0%, #7AC8B8 100%)',
  'linear-gradient(135deg, #C4A57B 0%, #E8CAA0 100%)',
]

export default function BoardDetailPage({
  params,
}: {
  params: Promise<{ boardId: string }>
}) {
  const { boardId } = use(params)
  const router = useRouter()
  const [board, setBoard] = useState<StoredBoard | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const boards = loadBoards()
    const match = boards.find((b) => b.id === boardId)
    if (match) {
      setBoard(match)
    } else {
      setNotFound(true)
    }
  }, [boardId])

  const handleRemoveOutfit = (outfitId: string) => {
    if (!board) return
    const updatedBoard = { ...board, outfitIds: board.outfitIds.filter((id) => id !== outfitId) }
    setBoard(updatedBoard)
    const boards = loadBoards()
    saveBoards(boards.map((b) => (b.id === board.id ? updatedBoard : b)))
  }

  const handleDeleteBoard = () => {
    if (!board) return
    const boards = loadBoards()
    saveBoards(boards.filter((b) => b.id !== board.id))
    router.push('/profile')
  }

  if (notFound) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground mb-2">Board not found</p>
            <Link href="/profile" className="text-sm font-medium" style={{ color: '#D85A30' }}>
              ← Back to profile
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (!board) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-4 border-muted border-t-primary animate-spin" />
        </div>
      </ProtectedRoute>
    )
  }

  const outfits = board.outfitIds
    .map((id) => getOutfitById(id))
    .filter((o): o is NonNullable<typeof o> => Boolean(o))

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
                  <p className="text-sm text-muted-foreground">
                    {outfits.length} outfit{outfits.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/browse?board=${board.id}&boardName=${encodeURIComponent(board.name)}`}
                  className="px-4 py-2 rounded-lg font-semibold text-white text-sm transition hover:opacity-90"
                  style={{ backgroundColor: '#D85A30' }}
                >
                  + Add more
                </Link>
                <button className="p-2 text-muted-foreground hover:text-foreground transition rounded-lg hover:bg-muted">
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={handleDeleteBoard}
                  className="p-2 text-red-500 hover:text-red-700 transition rounded-lg hover:bg-red-50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
          {outfits.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-border rounded-2xl">
              <Heart className="w-10 h-10 mx-auto mb-4 text-muted-foreground opacity-40" />
              <p className="font-semibold text-foreground mb-2">No outfits saved here yet</p>
              <Link
                href={`/browse?board=${board.id}&boardName=${encodeURIComponent(board.name)}`}
                className="inline-flex items-center gap-2 mt-2 px-6 py-3 rounded-xl font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: '#D85A30' }}
              >
                Browse outfits to add
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {outfits.map((outfit, idx) => {
                const photoUrl = outfitPhotoMap[outfit.id]
                const total = outfit.items.reduce((sum, i) => sum + i.price, 0)
                return (
                  <div key={outfit.id} className="rounded-xl overflow-hidden bg-muted card-hover-glow">
                    <div className="relative aspect-square">
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={outfit.category}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full" style={{ background: fallbackGradients[idx % fallbackGradients.length] }} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-3 left-3 bg-white rounded-full px-3 py-1 shadow text-xs font-bold" style={{ color: '#D85A30' }}>
                        KSh {total.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground">{outfit.category}</h3>
                      <p className="text-xs text-muted-foreground mb-3">by {outfit.seller} · {outfit.city}</p>
                      <div className="flex gap-2">
                        <Link
                          href="/browse"
                          className="flex-1 py-2 rounded-lg font-semibold transition text-center text-sm"
                          style={{ backgroundColor: '#D85A30', color: 'white' }}
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleRemoveOutfit(outfit.id)}
                          className="px-3 py-2 rounded-lg border border-border text-foreground font-semibold transition hover:bg-muted"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
