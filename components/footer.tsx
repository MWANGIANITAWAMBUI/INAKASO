export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-12 bg-foreground text-background border-t border-border">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Logo & Tagline */}
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold" style={{ color: '#FF6B4A' }}>i</span>
            <span className="text-2xl font-bold" style={{ color: '#9B8FFF' }}>nakaso</span>
          </div>
          <p className="text-background/75 text-sm max-w-md">
            Wear it again. Style it better. Give your closet a second life with AI-powered style.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-6">
          <a href="#" className="text-background/75 hover:text-background transition text-sm font-medium">
            Instagram
          </a>
          <a href="#" className="text-background/75 hover:text-background transition text-sm font-medium">
            Twitter
          </a>
          <a href="#" className="text-background/75 hover:text-background transition text-sm font-medium">
            TikTok
          </a>
          <a href="#" className="text-background/75 hover:text-background transition text-sm font-medium">
            Contact
          </a>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-background/20">
          <p className="text-background/60 text-sm">
            © 2024 Inakaso. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
