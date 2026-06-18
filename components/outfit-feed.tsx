import Link from 'next/link'
import OutfitCard from './outfit-card'

const outfits = [
  {
    id: '1',
    seller: 'Vintage Vibes',
    city: 'Nairobi',
    items: [
      {
        name: 'Vintage Ankara Print Shirt',
        price: 3200,
        photo: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80',
      },
      {
        name: 'Wide-Leg Trousers',
        price: 2800,
        photo: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80',
      },
    ],
    gradient: 'linear-gradient(135deg, #D85A30 0%, #E8956B 50%, #F5B87D 100%)',
  },
  {
    id: '2',
    seller: 'Eco Threads',
    city: 'Mombasa',
    items: [
      {
        name: 'Indigo Wrap Dress',
        price: 4500,
        photo: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80',
      },
      {
        name: 'Neutral Linen Blazer',
        price: 3500,
        photo: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&q=80',
      },
    ],
    gradient: 'linear-gradient(135deg, #7F77DD 0%, #9B8FFF 50%, #B8A8FF 100%)',
  },
  {
    id: '3',
    seller: 'Thrift Queen',
    city: 'Kisumu',
    items: [
      {
        name: 'Floral Midi Dress',
        price: 3800,
        photo: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&q=80',
      },
      {
        name: 'Woven Shoulder Bag',
        price: 1800,
        photo: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
      },
      {
        name: 'Block Heel Sandals',
        price: 2400,
        photo: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80',
      },
    ],
    gradient: 'linear-gradient(135deg, #20B2AA 0%, #4DB8A8 50%, #7AC8B8 100%)',
  },
]

export default function OutfitFeed() {
  return (
    <section className="px-6 md:px-12 py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#D85A30' }}>
              Curated looks ✦
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Shop Complete Looks
            </h2>
            <p className="text-lg text-foreground/70 mt-3">
              Real secondhand pieces styled into complete outfits
            </p>
          </div>
          <Link
            href="/browse"
            className="shrink-0 px-6 py-3 rounded-xl font-semibold border-2 border-foreground text-foreground hover:bg-foreground/5 transition text-sm whitespace-nowrap"
          >
            View all looks →
          </Link>
        </div>

        {/* Outfit grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {outfits.map((outfit) => (
            <OutfitCard key={outfit.id} {...outfit} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition hover:opacity-90 shadow-lg text-base"
            style={{ backgroundColor: '#D85A30' }}
          >
            Browse all outfits
          </Link>
          <p className="text-sm text-foreground/60 mt-3">No account needed to browse</p>
        </div>
      </div>
    </section>
  )
}
