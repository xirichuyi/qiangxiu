"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { works, products, tutorials, newsArticles } from "@/lib/data"
import { FadeIn } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

const tabs = ["全部", "作品", "商品", "教程", "资讯"]

function SearchContent() {
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState("全部")

  const results = useMemo(() => {
    if (!query.trim()) return { works: [], products: [], tutorials: [], news: [] }
    const q = query.toLowerCase()
    return {
      works: works.filter((w) => w.title.toLowerCase().includes(q) || w.artist.toLowerCase().includes(q) || w.category.toLowerCase().includes(q)),
      products: products.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
      tutorials: tutorials.filter((t) => t.title.toLowerCase().includes(q) || t.teacher.toLowerCase().includes(q)),
      news: newsArticles.filter((n) => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q)),
    }
  }, [query])

  const totalCount = results.works.length + results.products.length + results.tutorials.length + results.news.length

  const showWorks = activeTab === "全部" || activeTab === "作品"
  const showProducts = activeTab === "全部" || activeTab === "商品"
  const showTutorials = activeTab === "全部" || activeTab === "教程"
  const showNews = activeTab === "全部" || activeTab === "资讯"

  return (
    <PageTransition>
      <div className="px-6 pt-32 pb-20 md:px-12 lg:px-20">
        <FadeIn className="mb-12">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Search</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
            搜索
          </h1>
        </FadeIn>

        {/* Search Input */}
        <FadeIn delay={0.1} className="mb-8">
          <div className="relative mx-auto max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索作品、商品、教程、资讯..."
              className="w-full rounded-2xl border border-border bg-background py-4 pl-12 pr-4 text-base text-foreground outline-none transition-colors focus:border-foreground"
              autoFocus
            />
          </div>
        </FadeIn>

        {query.trim() && (
          <>
            {/* Tabs */}
            <FadeIn delay={0.15} className="mb-8 flex flex-wrap items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    activeTab === tab
                      ? "text-background"
                      : "bg-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {activeTab === tab && (
                    <motion.span
                      layoutId="search-filter"
                      className="absolute inset-0 rounded-full bg-foreground"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">共 {totalCount} 个结果</span>
            </FadeIn>

            {/* Results */}
            {totalCount === 0 ? (
              <div className="py-20 text-center">
                <p className="text-lg text-muted-foreground">未找到与 "{query}" 相关的内容</p>
                <p className="mt-2 text-sm text-muted-foreground">请尝试其他关键词</p>
              </div>
            ) : (
              <div className="space-y-12">
                {/* Works */}
                {showWorks && results.works.length > 0 && (
                  <div>
                    <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">作品 ({results.works.length})</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {results.works.map((work) => (
                        <Link key={work.id} href={`/gallery/${work.id}`} className="group block">
                          <div className="image-card-hover relative aspect-4/3 overflow-hidden rounded-2xl">
                            <Image src={work.src} alt={work.title} fill className="object-cover transition-all duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                          </div>
                          <div className="py-4">
                            <p className="text-xs text-muted-foreground">{work.category}</p>
                            <h3 className="mt-1 text-base font-medium text-foreground">{work.title}</h3>
                            <p className="text-sm text-muted-foreground">{work.artist} · {work.year}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products */}
                {showProducts && results.products.length > 0 && (
                  <div>
                    <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">商品 ({results.products.length})</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {results.products.map((product) => (
                        <Link key={product.id} href={`/shop/${product.id}`} className="group block">
                          <div className="image-card-hover relative aspect-4/3 overflow-hidden rounded-2xl">
                            <Image src={product.src} alt={product.title} fill className="object-cover transition-all duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                          </div>
                          <div className="py-4">
                            <h3 className="text-base font-medium text-foreground">{product.title}</h3>
                            <p className="mt-1 text-sm font-medium text-primary">¥{product.price}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tutorials */}
                {showTutorials && results.tutorials.length > 0 && (
                  <div>
                    <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">教程 ({results.tutorials.length})</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {results.tutorials.map((tutorial) => (
                        <Link key={tutorial.id} href={`/tutorials/${tutorial.id}`} className="group flex gap-4 rounded-xl border border-border p-4 transition-colors hover:bg-muted/50">
                          <div className="flex-1">
                            <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] font-medium text-background">{tutorial.level}</span>
                            <h3 className="mt-2 text-base font-medium text-foreground">{tutorial.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{tutorial.teacher} · {tutorial.duration}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* News */}
                {showNews && results.news.length > 0 && (
                  <div>
                    <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">资讯 ({results.news.length})</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {results.news.map((article) => (
                        <Link key={article.id} href={`/news/${article.id}`} className="group block">
                          <div className="image-card-hover relative aspect-4/3 overflow-hidden rounded-2xl">
                            <Image src={article.src} alt={article.title} fill className="object-cover transition-all duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                          </div>
                          <div className="py-4">
                            <span className="text-xs text-muted-foreground">{article.date}</span>
                            <h3 className="mt-1 text-base font-medium text-foreground">{article.title}</h3>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {!query.trim() && (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">输入关键词开始搜索</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["云纹", "杨华珍", "手提包", "挑花绣", "羌绣博物馆"].map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => setQuery(keyword)}
                  className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main><SearchContent /></main>
      <SiteFooter />
    </div>
  )
}
