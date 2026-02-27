"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { works, getWorkById } from "@/lib/data"
import { FadeIn } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

export default function GalleryDetailPage() {
  const params = useParams()
  const id = params.id as string
  const work = getWorkById(id)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  if (!work) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <p className="text-muted-foreground">{"作品未找到"}</p>
        <Link href="/gallery" className="mt-4 text-sm text-foreground underline underline-offset-4">{"返回作品展览"}</Link>
      </div>
    )
  }

  const relatedWorks = work.detail.relatedIds
    .map((rid) => works.find((w) => w.id === rid))
    .filter(Boolean)

  const specs = [
    { label: "尺寸", value: work.detail.dimensions },
    { label: "材料", value: work.detail.material },
    { label: "绣法", value: work.detail.technique },
    { label: "产地", value: work.detail.origin },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <PageTransition>
          <div className="px-6 pt-32 pb-20 md:px-12 lg:px-20">
            {/* Back link */}
            <FadeIn>
              <Link
                href="/gallery"
                className="line-reveal inline-flex items-center gap-2 pb-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                {"返回作品展览"}
              </Link>
            </FadeIn>

            {/* Hero image - full width with parallax zoom */}
            <FadeIn className="mt-8">
              <div ref={heroRef} className="relative aspect-video w-full overflow-hidden rounded-2xl">
                <motion.div className="relative w-full h-full" style={{ scale: imgScale }}>
                  <Image
                    src={work.src}
                    alt={work.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </div>
            </FadeIn>

            {/* Title & meta */}
            <div className="mx-auto mt-16 max-w-3xl">
              <FadeIn>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{work.category}</p>
                <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground md:text-5xl">
                  {work.title}
                </h1>
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{work.artist}</span>
                  <span>{"·"}</span>
                  <span>{work.year}</span>
                </div>
              </FadeIn>

              {/* Story */}
              <FadeIn delay={0.1} className="mt-12">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {work.detail.story}
                </p>
              </FadeIn>

              {/* Specs grid */}
              <FadeIn delay={0.2} className="mt-16">
                <div className="grid grid-cols-2 gap-px border border-border rounded-2xl overflow-hidden bg-border md:grid-cols-4">
                  {specs.map((item) => (
                    <div key={item.label} className="bg-background p-6 text-center transition-colors hover:bg-muted/50">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">{item.label}</p>
                      <p className="mt-2 text-sm font-medium text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Related works */}
            {relatedWorks.length > 0 && (
              <div className="mt-24">
                <FadeIn>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{"More Works"}</p>
                  <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground">
                    {"相关作品"}
                  </h2>
                </FadeIn>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {relatedWorks.map((rw, i) =>
                    rw ? (
                      <FadeIn key={rw.id} delay={i * 0.1}>
                        <Link href={`/gallery/${rw.id}`} className="group block">
                          <div className="image-card-hover relative aspect-4/3 overflow-hidden rounded-2xl">
                            <Image
                              src={rw.src}
                              alt={rw.title}
                              fill
                              className="object-cover transition-all duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                            <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                                <ArrowRight className="h-3.5 w-3.5 text-white" />
                              </span>
                            </div>
                          </div>
                          <div className="py-5">
                            <p className="mb-1 text-xs uppercase tracking-widest text-muted-foreground">{rw.category}</p>
                            <h3 className="text-lg font-medium text-foreground">{rw.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{rw.artist}</p>
                          </div>
                        </Link>
                      </FadeIn>
                    ) : null
                  )}
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
