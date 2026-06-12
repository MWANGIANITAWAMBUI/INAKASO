'use client'

import { useState } from 'react'
import { Wallet, ArrowDownToLine, Phone, Building2, ChevronRight } from 'lucide-react'

const payoutHistory = [
  { id: 1, date: 'Dec 1, 2024', amount: 15200, status: 'completed', method: 'M-Pesa' },
  { id: 2, date: 'Nov 1, 2024', amount: 12800, status: 'completed', method: 'M-Pesa' },
  { id: 3, date: 'Oct 1, 2024', amount: 17600, status: 'completed', method: 'Bank Transfer' },
]

export default function PayoutsPage() {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [showMethodModal, setShowMethodModal] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [method, setMethod] = useState<'mpesa' | 'bank'>('mpesa')
  const [mpesaNumber, setMpesaNumber] = useState('')
  const [bankDetails, setBankDetails] = useState({ bank: '', account: '', name: '' })
  const [withdrawStep, setWithdrawStep] = useState<'amount' | 'confirm' | 'success'>('amount')

  const balance = 8900

  const handleWithdraw = () => {
    if (!withdrawAmount || Number(withdrawAmount) < 500) return
    setWithdrawStep('confirm')
  }

  const confirmWithdraw = () => {
    setWithdrawStep('success')
    setTimeout(() => {
      setShowWithdrawModal(false)
      setWithdrawStep('amount')
      setWithdrawAmount('')
    }, 2500)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Payouts</h1>
        <p className="text-muted-foreground mt-2">Track earnings and withdraw your balance</p>
      </div>

      {/* Balance card */}
      <div
        className="rounded-2xl p-8 text-white mb-6"
        style={{ background: 'linear-gradient(135deg, #D85A30 0%, #E8956B 100%)' }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium opacity-80 mb-1">Available balance</p>
            <p className="text-4xl font-bold">KSh {balance.toLocaleString()}</p>
            <p className="text-sm opacity-75 mt-2">Ready to withdraw · Min. KSh 500</p>
          </div>
          <Wallet className="w-10 h-10 opacity-60" />
        </div>
        <button
          onClick={() => setShowWithdrawModal(true)}
          className="mt-6 flex items-center gap-2 px-6 py-3 bg-white font-bold rounded-xl transition hover:bg-white/90"
          style={{ color: '#D85A30' }}
        >
          <ArrowDownToLine className="w-5 h-5" />
          Withdraw funds
        </button>
      </div>

      {/* Payout method */}
      <div className="bg-muted rounded-xl p-5 border border-border mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Payout method</p>
            <p className="font-semibold text-foreground">M-Pesa · +254 7XX XXX XXX</p>
          </div>
          <button
            onClick={() => setShowMethodModal(true)}
            className="flex items-center gap-1 text-sm font-medium hover:text-foreground transition"
            style={{ color: '#7F77DD' }}
          >
            Change <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* History */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Payout history</h3>
        <div className="space-y-3">
          {payoutHistory.map((p) => (
            <div key={p.id} className="bg-background rounded-lg p-4 border border-border flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{p.date}</p>
                <p className="text-sm text-muted-foreground">{p.method}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">KSh {p.amount.toLocaleString()}</p>
                <p className="text-xs text-green-600 font-medium mt-0.5">Completed</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl p-6 w-full max-w-md shadow-2xl">
            {withdrawStep === 'amount' && (
              <>
                <h2 className="text-xl font-bold mb-1">Withdraw funds</h2>
                <p className="text-sm text-muted-foreground mb-6">Available: KSh {balance.toLocaleString()}</p>

                <label className="block text-sm font-medium mb-2">Amount (KSh)</label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Min. KSh 500"
                  max={balance}
                  className="w-full px-4 py-3 border border-border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-primary text-lg font-semibold"
                />
                <div className="flex gap-2 mb-6">
                  {[1000, 2500, 5000].map(amt => (
                    <button
                      key={amt}
                      onClick={() => setWithdrawAmount(String(amt))}
                      className="px-3 py-1.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition"
                    >
                      KSh {amt.toLocaleString()}
                    </button>
                  ))}
                </div>

                <label className="block text-sm font-medium mb-3">Send to</label>
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={() => setMethod('mpesa')}
                    className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition ${method === 'mpesa' ? 'border-primary text-primary' : 'border-border text-muted-foreground'}`}
                    style={method === 'mpesa' ? { borderColor: '#D85A30', color: '#D85A30' } : {}}
                  >
                    <Phone className="w-4 h-4" /> M-Pesa
                  </button>
                  <button
                    onClick={() => setMethod('bank')}
                    className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition ${method === 'bank' ? 'border-primary text-primary' : 'border-border text-muted-foreground'}`}
                    style={method === 'bank' ? { borderColor: '#D85A30', color: '#D85A30' } : {}}
                  >
                    <Building2 className="w-4 h-4" /> Bank
                  </button>
                </div>

                {method === 'mpesa' && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">M-Pesa number</label>
                    <input
                      type="tel"
                      value={mpesaNumber}
                      onChange={(e) => setMpesaNumber(e.target.value)}
                      placeholder="+254 7XX XXX XXX"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                )}

                {method === 'bank' && (
                  <div className="space-y-3 mb-6">
                    <input type="text" placeholder="Bank name" value={bankDetails.bank} onChange={e => setBankDetails({...bankDetails, bank: e.target.value})} className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    <input type="text" placeholder="Account number" value={bankDetails.account} onChange={e => setBankDetails({...bankDetails, account: e.target.value})} className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    <input type="text" placeholder="Account name" value={bankDetails.name} onChange={e => setBankDetails({...bankDetails, name: e.target.value})} className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setShowWithdrawModal(false)} className="flex-1 py-3 rounded-xl border border-border font-semibold hover:bg-muted transition">Cancel</button>
                  <button onClick={handleWithdraw} className="flex-1 py-3 rounded-xl font-bold text-white transition hover:opacity-90" style={{ backgroundColor: '#D85A30' }}>Continue</button>
                </div>
              </>
            )}

            {withdrawStep === 'confirm' && (
              <>
                <h2 className="text-xl font-bold mb-6">Confirm withdrawal</h2>
                <div className="space-y-3 mb-6 p-4 bg-muted rounded-xl">
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Amount</span><span className="font-bold text-lg">KSh {Number(withdrawAmount).toLocaleString()}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Method</span><span className="font-medium">{method === 'mpesa' ? `M-Pesa · ${mpesaNumber}` : `Bank · ${bankDetails.bank}`}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Processing time</span><span className="font-medium">1–3 business days</span></div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setWithdrawStep('amount')} className="flex-1 py-3 rounded-xl border border-border font-semibold hover:bg-muted transition">Back</button>
                  <button onClick={confirmWithdraw} className="flex-1 py-3 rounded-xl font-bold text-white transition hover:opacity-90" style={{ backgroundColor: '#D85A30' }}>Confirm withdraw</button>
                </div>
              </>
            )}

            {withdrawStep === 'success' && (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <ArrowDownToLine className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold mb-2">Withdrawal requested!</h2>
                <p className="text-sm text-muted-foreground">KSh {Number(withdrawAmount).toLocaleString()} is on its way. You&apos;ll receive it within 1–3 business days.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
