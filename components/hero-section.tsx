import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="px-6 md:px-12 py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text and CTAs */}
        <div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-balance mb-6">
            <span style={{ color: '#D85A30' }}>Wear it again.</span>
            <br />
            <span style={{ color: '#7F77DD' }}>Style it better.</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-10 text-balance">
            Curated outfit pairings from secondhand clothes. Shop complete looks, or mix and match individual pieces. Every item tells a story.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md">
            <Link
              href="/browse"
              className="px-8 py-4 rounded-xl font-semibold text-white transition transform hover:scale-105 shadow-lg text-center"
              style={{ backgroundColor: '#D85A30' }}
            >
              Shop looks
            </Link>
            <Link
              href="/signup?role=seller"
              className="px-8 py-4 rounded-xl font-semibold transition transform hover:scale-105 border-2 border-foreground text-foreground hover:bg-foreground/5 text-center"
            >
              Sell your clothes
            </Link>
          </div>
        </div>

        {/* Right Column - Floating Outfit Cards */}
        <div className="hidden md:flex relative h-[480px] items-center justify-center">

          {/* Card 1 — back left */}
          <div
            className="absolute w-44 h-64 rounded-2xl shadow-2xl border-4 border-white overflow-hidden animate-float"
            style={{
              transform: 'rotate(-8deg) translateX(-90px) translateY(30px)',
              zIndex: 1,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80"
              alt="Outfit"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-3 left-3 bg-white rounded-full px-3 py-1 shadow-lg">
              <p className="text-xs font-bold text-foreground">KSh 2,800</p>
            </div>
          </div>

          {/* Card 2 — front centre */}
          <div
            className="absolute w-48 h-72 rounded-2xl shadow-2xl border-4 border-white overflow-hidden animate-float-delay-1"
            style={{
              transform: 'rotate(2deg) translateY(-10px)',
              zIndex: 3,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80"
              alt="Outfit"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-3 left-3 bg-white rounded-full px-3 py-1 shadow-lg">
              <p className="text-xs font-bold" style={{ color: '#D85A30' }}>KSh 4,500</p>
            </div>
          </div>

          {/* Card 3 — back right */}
          <div
            className="absolute w-44 h-64 rounded-2xl shadow-2xl border-4 border-white overflow-hidden animate-float-delay-2"
            style={{
              transform: 'rotate(7deg) translateX(90px) translateY(20px)',
              zIndex: 2,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&q=80"
              alt="Outfit"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-3 left-3 bg-white rounded-full px-3 py-1 shadow-lg">
              <p className="text-xs font-bold" style={{ color: '#7F77DD' }}>KSh 3,800</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
