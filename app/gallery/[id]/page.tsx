import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, Calendar, MapPin, Ruler, Scissors, Layers } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { works, getWorkById } from "@/lib/data"

export function generateStaticParams() {
  return works.map((w) => ({ id: w.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const work = getWorkById(id)
  if (!work) return { title: "作品未找到 - 羌绣传承" }
  return {
    title: `${work.title} - 作品展览 - 羌绣传承`,
    description: work.description,
  }
}

export default async function GalleryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const work = getWorkById(id)
  if (!work) notFound()

  const relatedWorks = work.detail.relatedIds
    .map((rid) => works.find((w) => w.id === rid))
    .filter(Boolean)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/gallery" className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              {"返回作品展览"}
            </Link>
            <span>{"/"}</span>
            <span className="text-foreground">{work.title}</span>
          </nav>

          {/* Main Content */}
          <div className="flex flex-col gap-10 lg:flex-row">
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <div className="sticky top-24 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <div className="relative aspect-square">
                  <Image
                    src={work.src}
                    alt={work.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {work.category}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {work.year}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-bold text-foreground font-serif sm:text-4xl">
                {work.title}
              </h1>

              {/* Artist */}
              <div className="mt-5 flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {work.artist.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">{work.artist}</p>
                  <p className="text-xs text-muted-foreground">{"非遗传承人"}</p>
                </div>
              </div>

              {/* Story */}
              <div className="mt-6">
                <h2 className="mb-3 text-lg font-semibold text-foreground">{"作品故事"}</h2>
                <p className="leading-relaxed text-muted-foreground">
                  {work.detail.story}
                </p>
              </div>

              {/* Specs */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <Ruler className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{"尺寸"}</p>
                    <p className="mt-0.5 text-sm font-medium text-card-foreground">{work.detail.dimensions}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <Layers className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{"材料"}</p>
                    <p className="mt-0.5 text-sm font-medium text-card-foreground">{work.detail.material}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <Scissors className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{"绣法"}</p>
                    <p className="mt-0.5 text-sm font-medium text-card-foreground">{work.detail.technique}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{"产地"}</p>
                    <p className="mt-0.5 text-sm font-medium text-card-foreground">{work.detail.origin}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Works */}
          {relatedWorks.length > 0 && (
            <section className="mt-16 border-t border-border pt-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground font-serif">{"相关作品"}</h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {relatedWorks.map((rw) =>
                  rw ? (
                    <Link
                      key={rw.id}
                      href={`/gallery/${rw.id}`}
                      className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={rw.src}
                          alt={rw.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute left-3 top-3">
                          <span className="rounded-full bg-foreground/70 px-3 py-1 text-xs font-medium text-background backdrop-blur-sm">
                            {rw.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-card-foreground">{rw.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{rw.artist}</p>
                      </div>
                    </Link>
                  ) : null
                )}
              </div>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
