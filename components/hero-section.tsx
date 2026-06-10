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
            AI-powered outfit pairings from secondhand clothes. Shop complete looks, or mix and match individual pieces. Every item tells a story.
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
        <div className="hidden md:block relative h-96">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Card 1 */}
            <div
              className="absolute w-48 h-64 rounded-2xl shadow-2xl border-4 border-white overflow-hidden animate-float"
              style={{
                background: 'linear-gradient(135deg, #D85A30 0%, #E8956B 50%, #F5B87D 100%)',
                transform: 'rotate(8deg) translateX(-40px) translateY(20px)',
                zIndex: 1
              }}
            >
              <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg">
                <p className="text-xs font-bold text-foreground">KSh 2,800</p>
              </div>
              <div className="absolute bottom-4 left-4 bg-white rounded-full px-3 py-1 shadow-lg">
                <p className="text-xs font-bold text-foreground">KSh 4,200</p>
              </div>
              <div className="absolute bottom-16 right-6 bg-white rounded-lg px-2 py-1 shadow-md flex items-center gap-1">
                <span className="text-xs font-bold text-primary">AI ✦</span>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="absolute w-48 h-64 rounded-2xl shadow-2xl border-4 border-white overflow-hidden animate-float-delay-1"
              style={{
                background: 'linear-gradient(135deg, #7F77DD 0%, #9B8FFF 50%, #B8A8FF 100%)',
                transform: 'rotate(-6deg) translateX(10px)',
                zIndex: 2
              }}
            >
              <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg">
                <p className="text-xs font-bold text-foreground">KSh 3,500</p>
              </div>
              <div className="absolute bottom-4 left-4 bg-white rounded-full px-3 py-1 shadow-lg">
                <p className="text-xs font-bold text-foreground">KSh 5,500</p>
              </div>
              <div className="absolute bottom-16 right-6 bg-white rounded-lg px-2 py-1 shadow-md flex items-center gap-1">
                <span className="text-xs font-bold text-secondary">AI ✦</span>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="absolute w-48 h-64 rounded-2xl shadow-2xl border-4 border-white overflow-hidden animate-float-delay-2"
              style={{
                background: 'linear-gradient(135deg, #20B2AA 0%, #4DB8A8 50%, #7AC8B8 100%)',
                transform: 'rotate(4deg) translateX(50px) translateY(-30px)',
                zIndex: 3
              }}
            >
              <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg">
                <p className="text-xs font-bold text-foreground">KSh 3,200</p>
              </div>
              <div className="absolute bottom-4 left-4 bg-white rounded-full px-3 py-1 shadow-lg">
                <p className="text-xs font-bold text-foreground">KSh 4,800</p>
              </div>
              <div className="absolute bottom-16 right-6 bg-white rounded-lg px-2 py-1 shadow-md flex items-center gap-1">
                <span className="text-xs font-bold" style={{ color: '#20B2AA' }}>AI ✦</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
