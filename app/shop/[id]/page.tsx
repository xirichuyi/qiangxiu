"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  ArrowLeft,
  ShoppingBag,
  Check,
  Minus,
  Plus,
} from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { products, getProductById } from "@/lib/data"
import { FadeIn } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

export default function ShopDetailPage() {
  const params = useParams()
  const id = params.id as string
  const product = getProductById(id)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start start", "end start"],
  })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <p className="text-muted-foreground">{"商品未找到"}</p>
        <Link href="/shop" className="mt-4 text-sm text-foreground underline underline-offset-4">{"返回商城"}</Link>
      </div>
    )
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  const otherProducts = products.filter((p) => p.id !== product.id).slice(0, 3)

  function handleAddToCart() {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <PageTransition>
          <div className="px-6 pt-32 pb-20 md:px-12 lg:px-20">
            {/* Back link */}
            <FadeIn>
              <Link
                href="/shop"
                className="line-reveal inline-flex items-center gap-2 pb-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                {"返回商城"}
              </Link>
            </FadeIn>

            {/* Main content: two column */}
            <div className="mt-10 flex flex-col gap-16 lg:flex-row">
              {/* Image with parallax */}
              <FadeIn className="w-full lg:w-1/2">
                <div className="sticky top-28" ref={imgRef}>
                  <div className="relative aspect-square overflow-hidden rounded-2xl">
                    <motion.div className="relative w-full h-full" style={{ scale: imgScale }}>
                      <Image
                        src={product.src}
                        alt={product.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                        {product.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Details */}
              <FadeIn delay={0.1} className="w-full lg:w-1/2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {product.tag}
                </p>
                <h1 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                  {product.title}
                </h1>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {product.description}
                </p>

                {/* Price */}
                <div className="mt-8 flex items-baseline gap-3">
                  <span className="text-3xl font-medium text-foreground">
                    {"¥"}{product.price}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    {"¥"}{product.originalPrice}
                  </span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                    className="rounded-full bg-foreground px-3 py-0.5 text-xs font-medium text-background"
                  >
                    {"-"}{discount}{"%"}
                  </motion.span>
                </div>

                {/* Quantity & Cart */}
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center rounded-full border border-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex h-12 w-12 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={quantity}
                        initial={{ y: -8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 8, opacity: 0 }}
                        transition={{ duration: 0.12 }}
                        className="flex h-12 w-10 items-center justify-center text-sm font-medium text-foreground"
                      >
                        {quantity}
                      </motion.span>
                    </AnimatePresence>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex h-12 w-12 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-medium text-background transition-all hover:bg-foreground/90"
                  >
                    <AnimatePresence mode="wait">
                      {addedToCart ? (
                        <motion.span
                          key="added"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Check className="h-4 w-4" />
                          {"已添加"}
                        </motion.span>
                      ) : (
                        <motion.span
                          key="add"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center gap-2"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          {"加入购物车"}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>

                {/* Service promises */}
                <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {["全国包邮", "非遗认证", "七天无理由", product.detail.origin].map((label) => (
                    <span key={label} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                      {label}
                    </span>
                  ))}
                </div>

                {/* Specs */}
                <div className="mt-12">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{"Details"}</p>
                  <h2 className="mt-4 text-xl font-medium text-foreground">{"商品详情"}</h2>
                  <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
                    {[
                      { label: "材料", value: product.detail.material },
                      { label: "尺寸", value: product.detail.dimensions },
                      { label: "重量", value: product.detail.weight },
                      { label: "工艺", value: product.detail.craft },
                      { label: "匠人", value: product.detail.artisan },
                      { label: "产地", value: product.detail.origin },
                    ].map((item) => (
                      <div key={item.label} className="bg-background p-5 transition-colors hover:bg-muted/50">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="mt-1 text-sm font-medium text-foreground">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mt-12">
                  <h2 className="text-xl font-medium text-foreground">{"产品特点"}</h2>
                  <ul className="mt-6 flex flex-col gap-3">
                    {product.detail.features.map((feature, i) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.06 }}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Care */}
                <div className="mt-12 rounded-2xl bg-muted/50 p-6">
                  <h2 className="text-sm font-medium text-foreground">{"保养说明"}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {product.detail.careInstructions}
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* More Products */}
            {otherProducts.length > 0 && (
              <div className="mt-24">
                <FadeIn>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{"More"}</p>
                  <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground">
                    {"你可能还喜欢"}
                  </h2>
                </FadeIn>

                <div className="mt-10 grid gap-6 sm:grid-cols-3">
                  {otherProducts.map((op, i) => (
                    <FadeIn key={op.id} delay={i * 0.1}>
                      <Link href={`/shop/${op.id}`} className="group block">
                        <div className="image-card-hover relative aspect-3/4 overflow-hidden rounded-2xl">
                          <Image
                            src={op.src}
                            alt={op.title}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                          <div className="absolute left-4 top-4">
                            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                              {op.tag}
                            </span>
                          </div>
                        </div>
                        <div className="py-5">
                          <h3 className="text-lg font-medium text-foreground">{op.title}</h3>
                          <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-lg font-medium text-foreground">{"¥"}{op.price}</span>
                            <span className="text-sm text-muted-foreground line-through">{"¥"}{op.originalPrice}</span>
                          </div>
                        </div>
                      </Link>
                    </FadeIn>
                  ))}
                </div>
              </div>
            )}
          </div>
        </PageTransition>
      </main>
      <SiteFooter />
    </div>
  )
}
