import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-cream border-b border-border">
      <Link href="/" className="flex items-center gap-1">
        <span className="text-2xl font-bold" style={{ color: '#D85A30' }}>i</span>
        <span className="text-2xl font-bold" style={{ color: '#7F77DD' }}>nakaso</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <a href="#how-it-works" className="text-foreground hover:text-primary font-medium transition">
          How it works
        </a>
        <Link href="/signup?role=seller" className="text-foreground hover:text-primary font-medium transition">
          Sell
        </Link>
        <Link href="/browse" className="text-foreground hover:text-primary font-medium transition">
          Browse
        </Link>
      </div>

      <Link
        href="/signup"
        className="px-6 py-2.5 rounded-lg font-semibold text-white transition transform hover:scale-105"
        style={{ backgroundColor: '#D85A30' }}
      >
        Get started
      </Link>
    </nav>
  )
}
