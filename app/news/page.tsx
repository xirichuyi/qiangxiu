"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { newsArticles } from "@/lib/data"
import { FadeIn } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

const categories = ["全部", "新闻", "文化", "活动", "教育"]

function NewsContent() {
  const [activeCategory, setActiveCategory] = useState("全部")

  const filteredNews = activeCategory === "全部"
    ? newsArticles
    : newsArticles.filter((n) => n.category === activeCategory)

  return (
    <PageTransition>
      <div className="px-6 pt-32 pb-20 md:px-12 lg:px-20">
        <FadeIn className="mb-16">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">News</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
            新闻动态
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            了解羌绣领域的最新资讯、展览活动、人物故事和文化传承动态。
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
                  layoutId="news-filter"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </FadeIn>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredNews.map((article, i) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <Link href={`/news/${article.id}`} className="group block">
                  <div className="image-card-hover relative aspect-4/3 overflow-hidden rounded-2xl">
                    <Image
                      src={article.src}
                      alt={article.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                        {article.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                        <ArrowRight className="h-4 w-4 text-white" />
                      </span>
                    </div>
                  </div>
                  <div className="py-5">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{article.date}</span>
                      <span>·</span>
                      <span>{article.author}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-foreground leading-snug">{article.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{article.summary}</p>
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

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main><NewsContent /></main>
      <SiteFooter />
    </div>
  )
}
