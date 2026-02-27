"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { products } from "@/lib/data"
import { FadeIn } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

function ProductCard({ product, index }: { product: (typeof products)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/shop/${product.id}`} className="group block">
        <div className="image-card-hover relative aspect-3/4 overflow-hidden rounded-2xl">
          <Image
            src={product.src}
            alt={product.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              {product.tag}
            </span>
          </div>
          {/* Hover action buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
              <ShoppingBag className="h-4 w-4 text-white" />
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
              <ArrowRight className="h-4 w-4 text-white" />
            </span>
          </div>
        </div>
        <div className="py-5">
          <h3 className="text-lg font-medium text-foreground">{product.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{product.description}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-medium text-foreground transition-colors group-hover:text-primary">
              {"¥"}{product.price}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {"¥"}{product.originalPrice}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function ShopContent() {
  return (
    <PageTransition>
      <div className="px-6 pt-32 pb-20 md:px-12 lg:px-20">
        <FadeIn className="mb-16">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{"Shop"}</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {"羌绣商城"}
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            {"每一件产品均由非遗传承人手工制作，从选料到成品，倾注匠心。让千年技艺走进您的日常生活。"}
          </p>
        </FadeIn>

        {/* Service info */}
        <FadeIn delay={0.1} className="mb-12">
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            {["手工制作", "非遗认证", "全国包邮", "七天无理由"].map((label) => (
              <span key={label} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                {label}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </PageTransition>
  )
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main><ShopContent /></main>
      <SiteFooter />
    </div>
  )
}
