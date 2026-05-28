"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { adminStats } from "@/lib/data"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const revenueData = adminStats.monthlyRevenue.map((item) => ({
  month: item.month.replace("2025-", "").replace("2026-", ""),
  revenue: item.revenue,
  orders: item.orders,
}))

const topProductsData = adminStats.topProducts.map((item) => ({
  name: item.name,
  sales: item.sales,
}))

const categoryData = adminStats.categoryDistribution.map((item) => ({
  name: item.category,
  value: item.count,
}))

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-4)",
  "var(--chart-5)",
]

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Revenue Trend */}
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>收入趋势</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
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
                  formatter={(value: number, name: string) => [
                    name === "revenue" ? `¥${value.toLocaleString()}` : value,
                    name === "revenue" ? "收入" : "订单数",
                  ]}
                />
                <Legend
                  formatter={(value) =>
                    value === "revenue" ? "收入" : "订单数"
                  }
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  dot={{ fill: "var(--chart-1)", r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="var(--chart-5)"
                  strokeWidth={2}
                  dot={{ fill: "var(--chart-5)", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>商品销量排行</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topProductsData}
                  layout="vertical"
                  margin={{ left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis
                    type="number"
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [value, "销量"]}
                  />
                  <Bar
                    dataKey="sales"
                    fill="var(--chart-2)"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>品类分布</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {categoryData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [value, "数量"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users */}
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>最近注册用户</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-muted-foreground">用户名</th>
                  <th className="pb-3 font-medium text-muted-foreground">注册日期</th>
                  <th className="pb-3 font-medium text-muted-foreground text-right">订单数</th>
                </tr>
              </thead>
              <tbody>
                {adminStats.recentUsers.map((user, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-3 font-medium">{user.name}</td>
                    <td className="py-3 text-muted-foreground">{user.date}</td>
                    <td className="py-3 text-right">{user.orders}</td>
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
