interface StatCardsProps {
  stats: {
    label: string
    value: string | number
    color: 'coral' | 'purple'
  }[]
}

export default function StatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      {stats.map((stat, idx) => {
        const bgColor = stat.color === 'coral' 
          ? 'linear-gradient(135deg, #D85A30 0%, #E8956B 100%)'
          : 'linear-gradient(135deg, #7F77DD 0%, #A89FFF 100%)'

        return (
          <div
            key={idx}
            className="rounded-2xl p-6 text-white"
            style={{ background: bgColor }}
          >
            <p className="text-sm font-medium opacity-90 mb-2">{stat.label}</p>
            <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
          </div>
        )
      })}
    </div>
  )
}
