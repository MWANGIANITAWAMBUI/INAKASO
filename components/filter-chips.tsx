'use client'

interface FilterChipsProps {
  activeFilter: string
  onFilterChange: (category: string) => void
}

const categories = [
  'All looks',
  'Casual',
  'Office',
  'Night out',
  'Boho',
  'Streetwear',
  'Formal'
]

export default function FilterChips({ activeFilter, onFilterChange }: FilterChipsProps) {
  return (
    <div className="bg-background border-b border-border px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onFilterChange(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium ${
                activeFilter === category
                  ? 'bg-secondary text-secondary-foreground'
                  : 'border-2 border-foreground text-foreground hover:border-secondary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
