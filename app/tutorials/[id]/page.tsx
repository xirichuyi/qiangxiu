import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  ArrowLeft,
  Clock,
  BookOpen,
  ListOrdered,
  Package,
  Lightbulb,
  Users,
  Play,
} from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { tutorials, getTutorialById } from "@/lib/data"

export function generateStaticParams() {
  return tutorials.map((t) => ({ id: t.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const tutorial = getTutorialById(id)
  if (!tutorial) return { title: "教程未找到 - 羌绣传承" }
  return {
    title: `${tutorial.title} - 技艺教程 - 羌绣传承`,
    description: tutorial.description,
  }
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
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[level] || "bg-muted text-muted-foreground"}`}
    >
      {level}
    </span>
  )
}

export default async function TutorialDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const tutorial = getTutorialById(id)
  if (!tutorial) notFound()

  const otherTutorials = tutorials.filter((t) => t.id !== tutorial.id).slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/tutorials" className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              {"返回技艺教程"}
            </Link>
            <span>{"/"}</span>
            <span className="text-foreground line-clamp-1">{tutorial.title}</span>
          </nav>

          {/* Video Player - full width */}
          <div className="overflow-hidden rounded-xl border border-border bg-foreground/5 shadow-sm">
            <div className="relative aspect-video w-full">
              <iframe
                src={`//player.bilibili.com/player.html?bvid=${tutorial.bvid}&page=1&high_quality=1&danmaku=0`}
                className="absolute inset-0 h-full w-full"
                allowFullScreen
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups"
                title={tutorial.title}
              />
            </div>
          </div>

          {/* Title & Meta */}
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <LevelBadge level={tutorial.level} />
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {tutorial.duration}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                {"授课: "}{tutorial.teacher}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-foreground font-serif sm:text-3xl">
              {tutorial.title}
            </h1>
            <p className="max-w-3xl leading-relaxed text-muted-foreground">
              {tutorial.description}
            </p>
          </div>

          {/* Detail Cards */}
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {/* Outline */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2 text-foreground">
                <ListOrdered className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">{"课程大纲"}</h2>
              </div>
              <ol className="flex flex-col gap-3">
                {tutorial.detail.outline.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              {/* Suitable for */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-3 flex items-center gap-2 text-foreground">
                  <Users className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">{"适合人群"}</h2>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {tutorial.detail.suitable}
                </p>
              </div>

              {/* Materials */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-3 flex items-center gap-2 text-foreground">
                  <Package className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">{"所需材料"}</h2>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {tutorial.detail.materials}
                </p>
              </div>

              {/* Tips */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
                <div className="mb-3 flex items-center gap-2 text-foreground">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">{"学习小贴士"}</h2>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {tutorial.detail.tips}
                </p>
              </div>
            </div>
          </div>

          {/* More Tutorials */}
          {otherTutorials.length > 0 && (
            <section className="mt-16 border-t border-border pt-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground font-serif">{"更多教程"}</h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {otherTutorials.map((ot) => (
                  <Link
                    key={ot.id}
                    href={`/tutorials/${ot.id}`}
                    className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg"
                  >
                    <div className="relative flex aspect-video items-center justify-center bg-foreground/5">
                      <Play className="h-10 w-10 text-primary/50 transition-colors group-hover:text-primary" />
                    </div>
                    <div className="p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <LevelBadge level={ot.level} />
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {ot.duration}
                        </span>
                      </div>
                      <h3 className="font-semibold text-card-foreground line-clamp-2">{ot.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{ot.teacher}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
