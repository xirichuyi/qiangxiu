"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { works } from "@/lib/data"
import { FadeIn } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

const categories = ["全部", "花卉纹样", "传统纹样", "经典图案", "服饰绣品", "婚嫁绣品", "装饰纹样"]

function GalleryContent() {
  const [activeCategory, setActiveCategory] = useState("全部")

  const filteredWorks = activeCategory === "全部"
    ? works
    : works.filter((w) => w.category === activeCategory)

  return (
    <PageTransition>
      <div className="px-6 pt-32 pb-20 md:px-12 lg:px-20">
        <FadeIn className="mb-16">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{"Gallery"}</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {"作品展览"}
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            {"每一件羌绣作品都是匠人心血的结晶，承载着羌族人民对美好生活的向往与对自然万物的敬畏。"}
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12 flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "text-background"
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="gallery-filter"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </FadeIn>

        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work, i) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <Link href={`/gallery/${work.id}`} className="group block">
                  <div className="image-card-hover relative aspect-4/3 overflow-hidden rounded-2xl">
                    <Image
                      src={work.src}
                      alt={work.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                    {/* Hover overlay with arrow */}
                    <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                        <ArrowRight className="h-4 w-4 text-white" />
                      </span>
                    </div>
                  </div>
                  <div className="py-5">
                    <p className="mb-1 text-xs uppercase tracking-widest text-muted-foreground">{work.category}</p>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-medium text-foreground">{work.title}</h3>
                      <span className="text-sm text-muted-foreground">{work.year}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{work.artist}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </PageTransition>
  )
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main><GalleryContent /></main>
      <SiteFooter />
    </div>
  )
}
