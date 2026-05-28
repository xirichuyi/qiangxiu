"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ShoppingBag, ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/motion"
import { mockUser, products } from "@/lib/data"

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(mockUser.favoriteIds)

  const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id))

  function removeFavorite(productId: string) {
    setFavoriteIds((prev) => prev.filter((id) => id !== productId))
  }

  return (
    <div>
      <FadeIn>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{"Favorites"}</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          {"我的收藏"}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {"共"}{favoriteProducts.length}{"件收藏商品"}
        </p>
      </FadeIn>

      {favoriteProducts.length === 0 ? (
        <FadeIn delay={0.1} className="mt-12">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border py-20">
            <Heart className="h-12 w-12 text-muted-foreground/30" />
            <p className="mt-4 text-muted-foreground">{"暂无收藏商品"}</p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              {"去逛逛"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      ) : (
        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {favoriteProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <div className="group relative">
                  <Link href={`/shop/${product.id}`} className="block">
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
                  {/* Remove button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFavorite(product.id)}
                    className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-sm backdrop-blur-md transition-colors hover:bg-white"
                    aria-label="取消收藏"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
