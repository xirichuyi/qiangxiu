"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { faqItems } from "@/lib/data"
import { FadeIn } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

const categories = ["全部", "购物", "物流", "工艺", "文化", "定制"]

function FAQContent() {
  const [activeCategory, setActiveCategory] = useState("全部")
  const [openId, setOpenId] = useState<string | null>(null)

  const filteredFAQ = activeCategory === "全部"
    ? faqItems
    : faqItems.filter((item) => item.category === activeCategory)

  return (
    <PageTransition>
      <div className="px-6 pt-32 pb-20 md:px-12 lg:px-20">
        <FadeIn className="mb-16">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">FAQ</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
            常见问题
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            在这里找到您最关心的问题的答案。如果没有找到，欢迎联系我们。
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12 flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat)
                setOpenId(null)
              }}
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "text-background"
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="faq-filter"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </FadeIn>

        <div className="mx-auto max-w-3xl">
          <AnimatePresence mode="popLayout">
            {filteredFAQ.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="border-b border-border"
              >
                <button
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-foreground"
                >
                  <span className="pr-8 text-base font-medium text-foreground">{item.question}</span>
                  <motion.span
                    animate={{ rotate: openId === item.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 text-sm text-muted-foreground leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  )
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main><FAQContent /></main>
      <SiteFooter />
    </div>
  )
}
