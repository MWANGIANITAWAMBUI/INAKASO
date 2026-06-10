const payoutHistory = [
  {
    id: 1,
    date: 'Dec 1, 2024',
    amount: 15200,
    status: 'completed',
    method: 'M-Pesa',
  },
  {
    id: 2,
    date: 'Nov 1, 2024',
    amount: 12800,
    status: 'completed',
    method: 'M-Pesa',
  },
  {
    id: 3,
    date: 'Oct 1, 2024',
    amount: 17600,
    status: 'completed',
    method: 'Bank Transfer',
  },
]

export default function PayoutsPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Payouts</h1>
        <p className="text-muted-foreground mt-2">Track your earnings and payout history</p>
      </div>

      {/* Current Balance */}
      <div
        className="rounded-2xl p-8 text-white mb-8"
        style={{ background: 'linear-gradient(135deg, #D85A30 0%, #E8956B 100%)' }}
      >
        <p className="text-sm font-medium opacity-90 mb-2">Current balance</p>
        <p className="text-4xl font-bold">KSh 8,900</p>
        <p className="text-sm opacity-75 mt-2">Ready to withdraw</p>
      </div>

      {/* Payout Method */}
      <div className="bg-muted rounded-xl p-6 border border-border mb-8">
        <h3 className="font-semibold text-foreground mb-4">Payout method</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">M-Pesa</p>
            <p className="text-sm text-muted-foreground">+254 7XX XXX XXX</p>
          </div>
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-background transition-colors">
            Change
          </button>
        </div>
      </div>

      {/* Payout History */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Payout history</h3>
        <div className="space-y-3">
          {payoutHistory.map((payout) => (
            <div key={payout.id} className="bg-muted rounded-lg p-4 border border-border flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{payout.date}</p>
                <p className="text-sm text-muted-foreground">{payout.method}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">KSh {payout.amount.toLocaleString()}</p>
                <p className="text-xs text-green-600 font-medium mt-1">{payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
