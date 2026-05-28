"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { products } from "@/lib/data"
import { FadeIn } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

function CartContent() {
  const [cartItems, setCartItems] = useState([
    { productId: "1", quantity: 1 },
    { productId: "5", quantity: 2 },
    { productId: "6", quantity: 1 },
  ])

  const cartProducts = cartItems.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId)!,
  })).filter((item) => item.product)

  const subtotal = cartProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.productId === productId) {
          const newQty = Math.max(1, item.quantity + delta)
          return { ...item, quantity: newQty }
        }
        return item
      })
    )
  }

  const removeItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId))
  }

  return (
    <PageTransition>
      <div className="px-6 pt-32 pb-20 md:px-12 lg:px-20">
        <FadeIn className="mb-12">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Cart</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
            购物车
          </h1>
        </FadeIn>

        {cartProducts.length === 0 ? (
          <FadeIn className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
            <p className="mt-6 text-lg text-muted-foreground">购物车是空的</p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:gap-3"
            >
              去逛逛 <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        ) : (
          <div className="flex flex-col gap-12 lg:flex-row">
            {/* Cart Items */}
            <FadeIn className="flex-1">
              <div className="space-y-0">
                <AnimatePresence>
                  {cartProducts.map((item) => (
                    <motion.div
                      key={item.productId}
                      layout
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-6 border-b border-border py-6"
                    >
                      <Link href={`/shop/${item.productId}`} className="shrink-0">
                        <div className="relative h-24 w-24 overflow-hidden rounded-xl md:h-32 md:w-32">
                          <Image src={item.product.src} alt={item.product.title} fill className="object-cover" />
                        </div>
                      </Link>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <Link href={`/shop/${item.productId}`}>
                            <h3 className="font-medium text-foreground hover:underline">{item.product.title}</h3>
                          </Link>
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{item.product.description}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.productId, -1)}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <AnimatePresence mode="wait">
                              <motion.span
                                key={item.quantity}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="w-8 text-center text-sm font-medium"
                              >
                                {item.quantity}
                              </motion.span>
                            </AnimatePresence>
                            <button
                              onClick={() => updateQuantity(item.productId, 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => removeItem(item.productId)}
                              className="ml-2 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-500"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-base font-medium text-foreground">
                            ¥{item.product.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </FadeIn>

            {/* Order Summary */}
            <FadeIn delay={0.2} className="lg:w-80">
              <div className="sticky top-32 rounded-2xl border border-border p-6">
                <h3 className="text-lg font-medium text-foreground">订单摘要</h3>
                <div className="mt-6 space-y-3">
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
                      <span className="font-medium text-foreground">合计</span>
                      <span className="text-lg font-medium text-foreground">¥{subtotal}</span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90"
                >
                  去结算 <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/shop"
                  className="mt-3 flex w-full items-center justify-center py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  继续购物
                </Link>
              </div>
            </FadeIn>
          </div>
        )}
      </div>
    </PageTransition>
  )
}

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main><CartContent /></main>
      <SiteFooter />
    </div>
  )
}
