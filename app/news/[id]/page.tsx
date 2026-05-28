"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { newsArticles, getNewsById } from "@/lib/data"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

function NewsDetail() {
  const { id } = useParams()
  const article = getNewsById(id as string)

  if (!article) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">未找到该文章</p>
      </div>
    )
  }

  const relatedArticles = newsArticles
    .filter((a) => article.detail.relatedIds.includes(a.id))
    .slice(0, 3)

  return (
    <PageTransition>
      <div className="px-6 pt-32 pb-20 md:px-12 lg:px-20">
        <FadeIn>
          <Link
            href="/news"
            className="line-reveal inline-flex items-center gap-2 pb-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            返回新闻动态
          </Link>
        </FadeIn>

        {/* Hero Image */}
        <FadeIn delay={0.1} className="mt-8">
          <div className="relative aspect-video overflow-hidden rounded-2xl md:aspect-[21/9]">
            <Image src={article.src} alt={article.title} fill className="object-cover" />
          </div>
        </FadeIn>

        {/* Article Content */}
        <div className="mx-auto mt-12 max-w-3xl">
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
                {article.category}
              </span>
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.author}</span>
            </div>
            <h1 className="mt-6 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              {article.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{article.summary}</p>
          </FadeIn>

          <FadeIn delay={0.3} className="mt-8">
            <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
              {article.detail.content.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </FadeIn>

          {/* Tags */}
          <FadeIn delay={0.4} className="mt-8 flex flex-wrap gap-2">
            {article.detail.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                #{tag}
              </span>
            ))}
          </FadeIn>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-20">
            <FadeIn>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Related</p>
              <h2 className="mt-4 text-2xl font-medium text-foreground">相关资讯</h2>
            </FadeIn>
            <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((a) => (
                <StaggerItem key={a.id}>
                  <Link href={`/news/${a.id}`} className="group block">
                    <div className="image-card-hover relative aspect-4/3 overflow-hidden rounded-2xl">
                      <Image src={a.src} alt={a.title} fill className="object-cover transition-all duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                      <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                          <ArrowRight className="h-4 w-4 text-white" />
                        </span>
                      </div>
                    </div>
                    <div className="py-4">
                      <span className="text-xs text-muted-foreground">{a.date}</span>
                      <h3 className="mt-1 text-base font-medium text-foreground">{a.title}</h3>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}
      </div>
    </PageTransition>
  )
}

export default function NewsDetailPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main><NewsDetail /></main>
      <SiteFooter />
    </div>
  )
}
