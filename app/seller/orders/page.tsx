const mockOrders = [
  {
    id: '#ORD-001',
    itemName: 'Vintage Ankara Shirt',
    date: 'Dec 12, 2024',
    status: 'delivered',
    amount: 2400,
    buyer: 'Sarah K.',
  },
  {
    id: '#ORD-002',
    itemName: 'Linen Pants',
    date: 'Dec 10, 2024',
    status: 'shipped',
    amount: 2000,
    buyer: 'Jane M.',
  },
  {
    id: '#ORD-003',
    itemName: 'Leather Belt',
    date: 'Dec 8, 2024',
    status: 'delivered',
    amount: 800,
    buyer: 'Amy L.',
  },
  {
    id: '#ORD-004',
    itemName: 'Ankle Boots',
    date: 'Dec 5, 2024',
    status: 'delivered',
    amount: 3200,
    buyer: 'Zara T.',
  },
  {
    id: '#ORD-005',
    itemName: 'Silk Blouse',
    date: 'Dec 2, 2024',
    status: 'pending',
    amount: 3500,
    buyer: 'Emma R.',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'shipped':
      return 'bg-blue-100 text-blue-800'
    case 'delivered':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function OrdersPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-2">{mockOrders.length} orders</p>
      </div>

      {/* Orders Table */}
      <div className="bg-muted rounded-xl overflow-hidden border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-6 font-semibold text-foreground">Order ID</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Item</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Buyer</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Date</th>
              <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
              <th className="text-right py-4 px-6 font-semibold text-foreground">Amount</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-b border-border hover:bg-background/50 transition-colors">
                <td className="py-4 px-6 text-foreground font-medium">{order.id}</td>
                <td className="py-4 px-6 text-foreground">{order.itemName}</td>
                <td className="py-4 px-6 text-foreground">{order.buyer}</td>
                <td className="py-4 px-6 text-muted-foreground">{order.date}</td>
                <td className="py-4 px-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6 text-right text-foreground font-semibold">KSh {order.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
