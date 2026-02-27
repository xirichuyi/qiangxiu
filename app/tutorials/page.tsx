"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, ArrowRight, Play } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { tutorials } from "@/lib/data"
import { FadeIn } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

function LevelBadge({ level }: { level: string }) {
  return (
    <span className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
      {level}
    </span>
  )
}

function VideoCard({ tutorial, index }: { tutorial: (typeof tutorials)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={`/tutorials/${tutorial.id}`}
        className="group block"
      >
        {/* Video embed with play overlay */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted">
          <iframe
            src={`//player.bilibili.com/player.html?bvid=${tutorial.bvid}&page=1&high_quality=1&danmaku=0`}
            className="absolute inset-0 h-full w-full pointer-events-none"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
            title={tutorial.title}
          />
          {/* Hover play overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-500 group-hover:bg-black/20 pointer-events-none">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md scale-90 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
              <Play className="h-5 w-5 text-white ml-0.5" />
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="py-5">
          <div className="flex items-center gap-3">
            <LevelBadge level={tutorial.level} />
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {tutorial.duration}
            </span>
          </div>

          <h3 className="mt-3 text-lg font-medium text-foreground leading-snug group-hover:text-muted-foreground transition-colors">
            {tutorial.title}
          </h3>

          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {tutorial.description}
          </p>

          <p className="mt-3 text-sm text-muted-foreground">
            {"授课: "}{tutorial.teacher}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

function TutorialsContent() {
  return (
    <PageTransition>
      <div className="px-6 pt-32 pb-20 md:px-12 lg:px-20">
        <FadeIn className="mb-16">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{"Tutorials"}</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {"技艺教程"}
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            {"跟随非遗传承人的视频教程，从基础针法到经典图案，循序渐进地学习羌绣技艺。"}
          </p>
        </FadeIn>

        {/* Level Guide */}
        <FadeIn delay={0.1} className="mb-12 flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted-foreground">{"难度等级:"}</span>
          {["入门", "中级", "进阶", "高级", "文化"].map((level, i) => (
            <motion.span
              key={level}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.06 }}
            >
              <LevelBadge level={level} />
            </motion.span>
          ))}
        </FadeIn>

        {/* Video Grid */}
        <div className="grid gap-8 sm:grid-cols-2">
          {tutorials.map((tutorial, i) => (
            <VideoCard key={tutorial.id} tutorial={tutorial} index={i} />
          ))}
        </div>

        {/* CTA Section */}
        <FadeIn delay={0.2} className="mt-24 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{"更多内容"}</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground">
            {"想要更多教程?"}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            {"我们持续更新羌绣教学视频，涵盖从入门到精通的完整学习路径。"}
          </p>
          <a
            href="https://www.bilibili.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:gap-3"
          >
            {"前往 Bilibili 频道"}
            <ArrowRight className="h-4 w-4" />
          </a>
        </FadeIn>
      </div>
    </PageTransition>
  )
}

export default function TutorialsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main><TutorialsContent /></main>
      <SiteFooter />
    </div>
  )
}
