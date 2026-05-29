"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, Play } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { tutorials, getTutorialById } from "@/lib/data"
import { FadeIn } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

export default function TutorialDetailPage() {
  const params = useParams()
  const id = params.id as string
  const tutorial = getTutorialById(id)

  if (!tutorial) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <p className="text-muted-foreground">{"教程未找到"}</p>
        <Link href="/tutorials" className="mt-4 text-sm text-foreground underline underline-offset-4">{"返回技艺教程"}</Link>
      </div>
    )
  }

  const otherTutorials = tutorials.filter((t) => t.id !== tutorial.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <PageTransition>
          <div className="px-6 pt-32 pb-20 md:px-12 lg:px-20">
            {/* Back link */}
            <FadeIn>
              <Link
                href="/tutorials"
                className="line-reveal inline-flex items-center gap-2 pb-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                {"返回技艺教程"}
              </Link>
            </FadeIn>

            {/* Video Player with poster fallback */}
            <FadeIn className="mt-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden rounded-2xl bg-muted"
              >
                <div className="relative aspect-video w-full">
                  {/* Bottom layer: cover poster (visible while iframe loads) */}
                  <Image
                    src={tutorial.cover}
                    alt={tutorial.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                  {/* Top layer: Bilibili player */}
                  <iframe
                    src={`https://player.bilibili.com/player.html?bvid=${tutorial.bvid}&page=1&high_quality=1&danmaku=0&autoplay=0`}
                    className="absolute inset-0 h-full w-full"
                    allow="fullscreen"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    title={tutorial.title}
                  />
                </div>
                {/* Source attribution under the player */}
                <div className="flex items-center justify-between bg-foreground/5 px-4 py-2 text-xs text-muted-foreground">
                  <span>{"视频来源: Bilibili · "}{tutorial.teacher}</span>
                  <a
                    href={`https://www.bilibili.com/video/${tutorial.bvid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-2 hover:underline hover:text-foreground"
                  >
                    {"在 B 站打开"}
                  </a>
                </div>
              </motion.div>
            </FadeIn>

            {/* Title & Meta */}
            <div className="mx-auto mt-12 max-w-3xl">
              <FadeIn>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
                    {tutorial.level}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {tutorial.duration}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {"授课: "}{tutorial.teacher}
                  </span>
                </div>
                <h1 className="mt-6 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                  {tutorial.title}
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {tutorial.description}
                </p>
              </FadeIn>

              {/* Course Outline */}
              <FadeIn delay={0.1} className="mt-12">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{"Outline"}</p>
                <h2 className="mt-4 text-xl font-medium text-foreground">{"课程大纲"}</h2>
                <ol className="mt-6 flex flex-col gap-4">
                  {tutorial.detail.outline.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.06 }}
                      className="flex items-start gap-4 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground">
                        {index + 1}
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ol>
              </FadeIn>

              {/* Info grid */}
              <FadeIn delay={0.2} className="mt-12">
                <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
                  <div className="bg-background p-6 transition-colors hover:bg-muted/50">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{"适合人群"}</p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground">
                      {tutorial.detail.suitable}
                    </p>
                  </div>
                  <div className="bg-background p-6 transition-colors hover:bg-muted/50">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{"所需材料"}</p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground">
                      {tutorial.detail.materials}
                    </p>
                  </div>
                  <div className="bg-background p-6 transition-colors hover:bg-muted/50">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{"学习小贴士"}</p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground">
                      {tutorial.detail.tips}
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* More Tutorials */}
            {otherTutorials.length > 0 && (
              <div className="mt-24">
                <FadeIn>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{"More Tutorials"}</p>
                  <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground">
                    {"更多教程"}
                  </h2>
                </FadeIn>

                <div className="mt-10 grid gap-6 sm:grid-cols-3">
                  {otherTutorials.map((ot, i) => (
                    <FadeIn key={ot.id} delay={i * 0.1}>
                      <Link href={`/tutorials/${ot.id}`} className="group block">
                        <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
                          <Image
                            src={ot.cover}
                            alt={ot.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 33vw"
                          />
                          <iframe
                            src={`https://player.bilibili.com/player.html?bvid=${ot.bvid}&page=1&high_quality=1&danmaku=0&autoplay=0`}
                            className="absolute inset-0 h-full w-full pointer-events-none"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            allow="fullscreen"
                            title={ot.title}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-500 group-hover:bg-black/20 pointer-events-none">
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/25 backdrop-blur-md ring-1 ring-white/30 scale-90 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                              <Play className="h-4 w-4 text-white ml-0.5" />
                            </span>
                          </div>
                        </div>
                        <div className="py-5">
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
                              {ot.level}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {ot.duration}
                            </span>
                          </div>
                          <h3 className="mt-3 text-lg font-medium text-foreground line-clamp-2">{ot.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{ot.teacher}</p>
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
