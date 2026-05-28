"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Package } from "lucide-react"
import { FadeIn } from "@/components/motion"
import { mockOrders } from "@/lib/data"
import { cn } from "@/lib/utils"

const tabs = ["全部", "待付款", "制作中", "已发货", "已完成"]

const statusColors: Record<string, string> = {
  "待付款": "bg-amber-100 text-amber-700",
  "制作中": "bg-blue-100 text-blue-700",
  "已发货": "bg-purple-100 text-purple-700",
  "已完成": "bg-green-100 text-green-700",
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("全部")

  const filteredOrders = activeTab === "全部"
    ? mockOrders
    : mockOrders.filter((o) => o.status === activeTab)

  return (
    <div>
      <FadeIn>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{"Orders"}</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          {"我的订单"}
        </h1>
      </FadeIn>

      {/* Tabs */}
      <FadeIn delay={0.1} className="mt-8">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                activeTab === tab
                  ? "text-background"
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {activeTab === tab && (
                <motion.span
                  layoutId="orders-tab"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Orders list */}
      <div className="mt-8 space-y-4">
        {filteredOrders.length === 0 ? (
          <FadeIn delay={0.15}>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border py-20">
              <Package className="h-12 w-12 text-muted-foreground/30" />
              <p className="mt-4 text-muted-foreground">{"暂无相关订单"}</p>
            </div>
          </FadeIn>
        ) : (
          filteredOrders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                href={`/user/orders/${order.id}`}
                className="group block rounded-2xl border border-border p-6 transition-colors hover:border-foreground/20"
              >
                {/* Order header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground">
                      {order.orderNumber}
                    </span>
                    <span className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-medium",
                      statusColors[order.status] || "bg-muted text-muted-foreground"
                    )}>
                      {order.status}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">{order.date}</span>
                </div>

                {/* Order items */}
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {order.items.map((item) => (
                      <div
                        key={item.productId}
                        className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 border-background"
                      >
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">
                      {order.items.map((item) => item.title).join("、")}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {"共"}{order.items.reduce((sum, item) => sum + item.quantity, 0)}{"件商品"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-lg font-medium text-foreground">
                      {"¥"}{order.total}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
