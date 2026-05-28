"use client"

import { useState } from "react"
import Link from "next/link"
import { mockOrders } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Eye } from "lucide-react"

const statusTabs = ["全部", "待付款", "制作中", "已发货", "已完成"]

const statusVariantMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  "已完成": "default",
  "已发货": "secondary",
  "制作中": "outline",
  "待付款": "destructive",
}

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState("全部")

  const filtered =
    activeTab === "全部"
      ? mockOrders
      : mockOrders.filter((o) => o.status === activeTab)

  return (
    <div className="space-y-6">
      {/* Status Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {statusTabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
              {tab !== "全部" && (
                <span className="ml-1.5 text-xs text-muted-foreground">
                  ({mockOrders.filter((o) => o.status === tab).length})
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* We use a single content area for all tabs since we filter manually */}
        {statusTabs.map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div className="rounded-xl border bg-background overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">订单号</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">日期</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">状态</th>
                      <th className="px-4 py-3 text-right font-medium text-muted-foreground">金额</th>
                      <th className="px-4 py-3 text-right font-medium text-muted-foreground">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-3 font-mono text-xs">{order.orderNumber}</td>
                        <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                        <td className="px-4 py-3">
                          <Badge variant={statusVariantMap[order.status] || "secondary"}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right font-medium">
                          ¥{order.total.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end">
                            <Link
                              href={`/admin/orders/${order.id}`}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted transition-colors"
                              title="查看详情"
                            >
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                          暂无订单
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
