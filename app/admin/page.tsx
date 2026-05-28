"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { adminStats, mockOrders } from "@/lib/data"
import { Package, DollarSign, Users, ShoppingBag } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Badge } from "@/components/ui/badge"

const statCards = [
  {
    title: "总订单",
    value: adminStats.totalOrders.toLocaleString(),
    icon: Package,
  },
  {
    title: "总收入",
    value: `¥${adminStats.totalRevenue.toLocaleString()}`,
    icon: DollarSign,
  },
  {
    title: "总用户",
    value: adminStats.totalUsers.toLocaleString(),
    icon: Users,
  },
  {
    title: "总商品",
    value: adminStats.totalProducts.toString(),
    icon: ShoppingBag,
  },
]

const statusVariantMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  "已完成": "default",
  "已发货": "secondary",
  "制作中": "outline",
  "待付款": "destructive",
}

const chartData = adminStats.monthlyRevenue.map((item) => ({
  month: item.month.replace("2025-", "").replace("2026-", ""),
  revenue: item.revenue,
}))

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="bg-background">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Monthly Revenue Chart */}
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>月度收入趋势</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="month"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`¥${value.toLocaleString()}`, "收入"]}
                />
                <Bar
                  dataKey="revenue"
                  fill="var(--chart-1)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>最近订单</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-muted-foreground">订单号</th>
                  <th className="pb-3 font-medium text-muted-foreground">日期</th>
                  <th className="pb-3 font-medium text-muted-foreground">状态</th>
                  <th className="pb-3 font-medium text-muted-foreground text-right">金额</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b last:border-0">
                    <td className="py-3 font-mono text-xs">{order.orderNumber}</td>
                    <td className="py-3 text-muted-foreground">{order.date}</td>
                    <td className="py-3">
                      <Badge variant={statusVariantMap[order.status] || "secondary"}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-right font-medium">
                      ¥{order.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
