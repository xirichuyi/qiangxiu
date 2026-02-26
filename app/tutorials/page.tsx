import Link from "next/link"
import type { Metadata } from "next"
import { Clock, BookOpen } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { tutorials } from "@/lib/data"

export const metadata: Metadata = {
  title: "技艺教程 - 羌绣传承",
  description: "跟随视频教程学习羌绣基础针法、配色技巧和经典图案绣制方法，亲手体验这门千年技艺。",
}

function LevelBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    "入门": "bg-chart-5 text-primary-foreground",
    "中级": "bg-accent text-accent-foreground",
    "进阶": "bg-chart-4 text-foreground",
    "高级": "bg-primary text-primary-foreground",
    "文化": "bg-foreground text-background",
  }
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[level] || "bg-muted text-muted-foreground"}`}>
      {level}
    </span>
  )
}

function VideoCard({ tutorial }: { tutorial: (typeof tutorials)[0] }) {
  return (
    <Link
      href={`/tutorials/${tutorial.id}`}
      className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg"
    >
      {/* Bilibili Embed */}
      <div className="relative aspect-video w-full overflow-hidden bg-foreground/5">
        <iframe
          src={`//player.bilibili.com/player.html?bvid=${tutorial.bvid}&page=1&high_quality=1&danmaku=0`}
          className="absolute inset-0 h-full w-full pointer-events-none"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups"
          title={tutorial.title}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          <LevelBadge level={tutorial.level} />
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {tutorial.duration}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-card-foreground leading-snug group-hover:text-primary transition-colors">
          {tutorial.title}
        </h3>

        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {tutorial.description}
        </p>

        <div className="flex items-center gap-2 border-t border-border pt-3">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-card-foreground">
            {"授课: "}{tutorial.teacher}
          </span>
        </div>
      </div>
    </Link>
  )
}

function TutorialsContent() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl font-serif">
          {"技艺教程"}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
          {"跟随非遗传承人的视频教程，从基础针法到经典图案，循序渐进地学习羌绣技艺。"}
        </p>
      </div>

      {/* Level Guide */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
        <span className="text-sm text-muted-foreground">{"难度等级:"}</span>
        <LevelBadge level="入门" />
        <LevelBadge level="中级" />
        <LevelBadge level="进阶" />
        <LevelBadge level="高级" />
        <LevelBadge level="文化" />
      </div>

      {/* Video Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {tutorials.map((tutorial) => (
          <VideoCard key={tutorial.id} tutorial={tutorial} />
        ))}
      </div>

      {/* Tip Section */}
      <div className="mt-16 rounded-xl border border-border bg-card p-8 text-center">
        <h2 className="text-xl font-semibold text-card-foreground font-serif">
          {"想要更多教程?"}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground leading-relaxed">
          {"我们持续更新羌绣教学视频，涵盖从入门到精通的完整学习路径。关注我们的 Bilibili 频道获取最新内容。"}
        </p>
        <a
          href="https://www.bilibili.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
        >
          {"前往 Bilibili 频道"}
        </a>
      </div>
    </div>
  )
}

export default function TutorialsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <TutorialsContent />
      </main>
      <SiteFooter />
    </div>
  )
}
