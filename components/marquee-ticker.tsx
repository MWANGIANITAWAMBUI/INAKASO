'use client'

export default function MarqueeTicker() {
  const marqueeText = 'AI Styled · Secondhand · Sustainable · Nairobi · Kampala · Dar es Salaam · Accra ·'
  
  return (
    <div className="w-full bg-background border-y border-border py-3 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* First copy */}
        <span className="text-sm md:text-base font-medium" style={{ color: '#D85A30' }}>
          {marqueeText}
        </span>
        {/* Second copy for seamless loop */}
        <span className="text-sm md:text-base font-medium" style={{ color: '#D85A30' }}>
          {marqueeText}
        </span>
      </div>
    </div>
  )
}
