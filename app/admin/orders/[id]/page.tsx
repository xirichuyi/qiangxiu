"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Package, Save } from "lucide-react"
import { getOrderById } from "@/lib/data"
import { cn } from "@/lib/utils"

const statusOptions = ["待付款", "制作中", "已发货", "已完成", "已取消"]

export default function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const order = getOrderById(id)

  const [status, setStatus] = useState(order?.status ?? "")
  const [tracking, setTracking] = useState(order?.tracking ?? "")
  const [saved, setSaved] = useState(false)

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Package className="h-12 w-12 text-muted-foreground/30" />
        <p className="mt-4 text-muted-foreground">订单不存在</p>
        <Link
          href="/admin/orders"
          className="mt-4 text-sm text-foreground hover:underline"
        >
          返回订单列表
        </Link>
      </div>
    )
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        返回订单列表
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            订单详情
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {order.orderNumber}
          </p>
        </div>
        <span className="text-sm text-muted-foreground">下单日期：{order.date}</span>
      </div>

      {/* Order info + Status */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Order info */}
        <div className="rounded-xl border border-border bg-background p-6">
          <h2 className="text-sm font-medium text-foreground mb-4">订单信息</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">订单编号</span>
              <span className="font-mono text-foreground">{order.orderNumber}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">下单日期</span>
              <span className="text-foreground">{order.date}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">订单金额</span>
              <span className="text-foreground font-medium">¥{order.total}</span>
            </div>
          </div>
        </div>

        {/* Status update */}
        <div className="rounded-xl border border-border bg-background p-6">
          <h2 className="text-sm font-medium text-foreground mb-4">状态管理</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">订单状态</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring"
              >
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">快递单号</label>
              <input
                type="text"
                value={tracking}
                onChange={(e) => setTracking(e.target.value)}
                placeholder="输入快递单号"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring font-mono"
              />
            </div>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-sm hover:opacity-90 transition-opacity"
            >
              <Save className="h-4 w-4" />
              {saved ? "已保存" : "更新状态"}
            </button>
          </div>
        </div>
      </div>

      {/* Items list */}
      <div className="rounded-xl border border-border bg-background p-6">
        <h2 className="text-sm font-medium text-foreground mb-4">商品列表</h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  数量：{item.quantity}
                </p>
              </div>
              <span className="shrink-0 text-sm font-medium text-foreground">
                ¥{item.price}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm font-medium text-foreground">合计</span>
          <span className="text-lg font-semibold text-foreground">¥{order.total}</span>
        </div>
      </div>

      {/* Customer address */}
      <div className="rounded-xl border border-border bg-background p-6">
        <h2 className="text-sm font-medium text-foreground mb-4">收货地址</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{order.address}</p>
      </div>
    </div>
  )
}
