import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import MarqueeTicker from '@/components/marquee-ticker'
import HowItWorks from '@/components/how-it-works'
import OutfitFeed from '@/components/outfit-feed'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <MarqueeTicker />
      <HowItWorks />
      <OutfitFeed />
      <Footer />
    </div>
  )
}
