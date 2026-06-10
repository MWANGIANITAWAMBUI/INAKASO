interface Order {
  id: string
  itemName: string
  date: string
  status: 'pending' | 'shipped' | 'delivered'
  amount: number
}

interface RecentOrdersTableProps {
  orders: Order[]
}

export default function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
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

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold text-foreground">Order ID</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Item</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
            <th className="text-right py-3 px-4 font-semibold text-foreground">Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition-colors">
              <td className="py-3 px-4 text-foreground font-medium">{order.id}</td>
              <td className="py-3 px-4 text-foreground">{order.itemName}</td>
              <td className="py-3 px-4 text-muted-foreground">{order.date}</td>
              <td className="py-3 px-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </td>
              <td className="py-3 px-4 text-right text-foreground font-semibold">KSh {order.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
