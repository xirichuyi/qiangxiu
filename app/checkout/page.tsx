"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, CreditCard, Smartphone } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { products, mockAddresses } from "@/lib/data"
import { FadeIn } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

const orderItems = [
  { productId: "1", quantity: 1 },
  { productId: "5", quantity: 2 },
  { productId: "6", quantity: 1 },
]

const paymentMethods = [
  { id: "wechat", label: "微信支付", icon: Smartphone },
  { id: "alipay", label: "支付宝", icon: Smartphone },
  { id: "card", label: "银行卡支付", icon: CreditCard },
]

function CheckoutContent() {
  const [selectedAddress, setSelectedAddress] = useState(mockAddresses[0].id)
  const [selectedPayment, setSelectedPayment] = useState("wechat")
  const [submitted, setSubmitted] = useState(false)

  const items = orderItems.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId)!,
  })).filter((i) => i.product)

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  if (submitted) {
    return (
      <PageTransition>
        <div className="flex min-h-[60vh] items-center justify-center px-6 pt-32 pb-20">
          <FadeIn className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-foreground">
              <Check className="h-8 w-8 text-background" />
            </div>
            <h2 className="mt-6 text-2xl font-medium text-foreground">订单提交成功</h2>
            <p className="mt-2 text-muted-foreground">订单号：QX20260227006</p>
            <p className="mt-1 text-sm text-muted-foreground">我们将尽快为您安排发货</p>
            <div className="mt-8 flex gap-4 justify-center">
              <Link href="/user/orders" className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-all hover:bg-foreground/90">
                查看订单
              </Link>
              <Link href="/shop" className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                继续购物
              </Link>
            </div>
          </FadeIn>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="px-6 pt-32 pb-20 md:px-12 lg:px-20">
        <FadeIn>
          <Link href="/cart" className="line-reveal inline-flex items-center gap-2 pb-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            返回购物车
          </Link>
        </FadeIn>

        <FadeIn className="mt-8 mb-12">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Checkout</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground md:text-5xl">
            结算
          </h1>
        </FadeIn>

        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="flex-1 space-y-10">
            {/* Address */}
            <FadeIn delay={0.1}>
              <h2 className="text-lg font-medium text-foreground">收货地址</h2>
              <div className="mt-4 space-y-3">
                {mockAddresses.map((addr) => (
                  <button
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr.id)}
                    className={`w-full rounded-xl border p-4 text-left transition-all ${
                      selectedAddress === addr.id
                        ? "border-foreground bg-muted/30"
                        : "border-border hover:border-foreground/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{addr.name}</span>
                        <span className="text-sm text-muted-foreground">{addr.phone}</span>
                        {addr.isDefault && (
                          <span className="rounded bg-foreground px-1.5 py-0.5 text-[10px] font-medium text-background">默认</span>
                        )}
                      </div>
                      {selectedAddress === addr.id && (
                        <Check className="h-4 w-4 text-foreground" />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {addr.province}{addr.city}{addr.district} {addr.detail}
                    </p>
                  </button>
                ))}
              </div>
            </FadeIn>

            {/* Payment */}
            <FadeIn delay={0.2}>
              <h2 className="text-lg font-medium text-foreground">支付方式</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`flex items-center gap-3 rounded-xl border p-4 transition-all ${
                      selectedPayment === method.id
                        ? "border-foreground bg-muted/30"
                        : "border-border hover:border-foreground/30"
                    }`}
                  >
                    <method.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{method.label}</span>
                  </button>
                ))}
              </div>
            </FadeIn>

            {/* Notes */}
            <FadeIn delay={0.3}>
              <h2 className="text-lg font-medium text-foreground">订单备注</h2>
              <textarea
                rows={3}
                placeholder="如有特殊要求请在此备注..."
                className="mt-4 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
              />
            </FadeIn>
          </div>

          {/* Order Summary */}
          <FadeIn delay={0.2} className="lg:w-96">
            <div className="sticky top-32 rounded-2xl border border-border p-6">
              <h3 className="text-lg font-medium text-foreground">订单详情</h3>
              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                      <Image src={item.product.src} alt={item.product.title} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.product.title}</p>
                        <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium text-foreground">¥{item.product.price * item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">商品小计</span>
                  <span className="text-foreground">¥{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">运费</span>
                  <span className="text-foreground">免运费</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground">应付总额</span>
                    <span className="text-xl font-medium text-foreground">¥{subtotal}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSubmitted(true)}
                className="mt-6 w-full rounded-full bg-foreground py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90"
              >
                提交订单
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  )
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main><CheckoutContent /></main>
      <SiteFooter />
    </div>
  )
}
