"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Package, Truck, CheckCircle, CreditCard, Hammer } from "lucide-react"
import { FadeIn } from "@/components/motion"
import { getOrderById } from "@/lib/data"
import { cn } from "@/lib/utils"

const allSteps = [
  { key: "待付款", label: "待付款", icon: CreditCard },
  { key: "制作中", label: "制作中", icon: Hammer },
  { key: "已发货", label: "已发货", icon: Truck },
  { key: "已完成", label: "已完成", icon: CheckCircle },
]

function getStepIndex(status: string) {
  const idx = allSteps.findIndex((s) => s.key === status)
  return idx >= 0 ? idx : 0
}

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const order = getOrderById(id)

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Package className="h-12 w-12 text-muted-foreground/30" />
        <p className="mt-4 text-muted-foreground">{"订单不存在"}</p>
        <Link
          href="/user/orders"
          className="mt-4 text-sm text-foreground hover:underline"
        >
          {"返回订单列表"}
        </Link>
      </div>
    )
  }

  const currentStep = getStepIndex(order.status)

  return (
    <div>
      {/* Back button */}
      <FadeIn>
        <Link
          href="/user/orders"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {"返回订单列表"}
        </Link>
      </FadeIn>

      <FadeIn delay={0.05} className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{"Order Detail"}</p>
            <h1 className="mt-2 text-2xl font-medium tracking-tight text-foreground md:text-3xl">
              {order.orderNumber}
            </h1>
          </div>
          <span className="text-sm text-muted-foreground">{order.date}</span>
        </div>
      </FadeIn>

      {/* Progress bar */}
      <FadeIn delay={0.1} className="mt-10">
        <div className="rounded-2xl border border-border p-6 md:p-8">
          <h2 className="mb-8 text-sm font-medium text-foreground">{"订单进度"}</h2>
          <div className="flex items-center justify-between">
            {allSteps.map((step, i) => {
              const isCompleted = i <= currentStep
              const isCurrent = i === currentStep
              return (
                <div key={step.key} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                        isCompleted
                          ? "bg-foreground text-background"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <step.icon className="h-4 w-4" />
                    </motion.div>
                    <span
                      className={cn(
                        "text-xs whitespace-nowrap",
                        isCurrent ? "font-medium text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < allSteps.length - 1 && (
                    <div className="mx-2 h-px flex-1 mt-[-1.25rem]">
                      <div
                        className={cn(
                          "h-full w-full transition-colors",
                          i < currentStep ? "bg-foreground" : "bg-border"
                        )}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </FadeIn>

      {/* Order items */}
      <FadeIn delay={0.15} className="mt-6">
        <div className="rounded-2xl border border-border p-6 md:p-8">
          <h2 className="mb-6 text-sm font-medium text-foreground">{"商品信息"}</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.productId} className="flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {"数量："}{item.quantity}
                  </p>
                </div>
                <span className="shrink-0 text-foreground font-medium">
                  {"¥"}{item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Order info grid */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Address */}
        <FadeIn delay={0.2}>
          <div className="rounded-2xl border border-border p-6">
            <h2 className="mb-4 text-sm font-medium text-foreground">{"收货地址"}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{order.address}</p>
          </div>
        </FadeIn>

        {/* Tracking & total */}
        <FadeIn delay={0.25}>
          <div className="rounded-2xl border border-border p-6">
            <h2 className="mb-4 text-sm font-medium text-foreground">{"物流信息"}</h2>
            {order.tracking ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{"快递公司"}</span>
                  <span className="text-foreground">{"顺丰速运"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{"运单号"}</span>
                  <span className="font-mono text-foreground">{order.tracking}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{"暂无物流信息"}</p>
            )}
          </div>
        </FadeIn>
      </div>

      {/* Total breakdown */}
      <FadeIn delay={0.3} className="mt-6">
        <div className="rounded-2xl border border-border p-6 md:p-8">
          <h2 className="mb-4 text-sm font-medium text-foreground">{"费用明细"}</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{"商品小计"}</span>
              <span className="text-foreground">{"¥"}{order.total}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{"运费"}</span>
              <span className="text-foreground">{"免运费"}</span>
            </div>
            <div className="border-t border-border pt-3 flex items-center justify-between">
              <span className="font-medium text-foreground">{"合计"}</span>
              <span className="text-xl font-medium text-foreground">{"¥"}{order.total}</span>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
