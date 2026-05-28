"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, ArrowRight, MapPin, Award, Scissors } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { artisans, works, products, getArtisanById } from "@/lib/data"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

function ArtisanDetail() {
  const { id } = useParams()
  const artisan = getArtisanById(id as string)

  if (!artisan) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">未找到该匠人信息</p>
      </div>
    )
  }

  const relatedWorks = works.filter((w) => artisan.detail.workIds.includes(w.id))
  const relatedProducts = products.filter((p) => artisan.detail.productIds.includes(p.id))

  return (
    <PageTransition>
      <div className="px-6 pt-32 pb-20 md:px-12 lg:px-20">
        <FadeIn>
          <Link
            href="/artisans"
            className="line-reveal inline-flex items-center gap-2 pb-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            返回传承匠人
          </Link>
        </FadeIn>

        {/* Hero */}
        <div className="mt-8 flex flex-col gap-12 md:flex-row">
          <FadeIn direction="left" className="w-full md:w-1/3">
            <div className="image-card-hover relative aspect-3/4 overflow-hidden rounded-2xl">
              <Image src={artisan.src} alt={artisan.name} fill className="object-cover" />
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2} className="flex-1">
            <span className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
              {artisan.title}
            </span>
            <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground md:text-5xl">
              {artisan.name}
            </h1>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {artisan.region}
              </span>
              <span className="flex items-center gap-1.5">
                <Scissors className="h-4 w-4" /> {artisan.specialty}
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="h-4 w-4" /> {artisan.experience}
              </span>
            </div>
            <p className="mt-6 text-muted-foreground leading-relaxed">{artisan.detail.story}</p>

            {/* Achievements */}
            <div className="mt-8">
              <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">主要成就</h3>
              <ul className="mt-4 space-y-3">
                {artisan.detail.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        {/* Related Works */}
        {relatedWorks.length > 0 && (
          <div className="mt-20">
            <FadeIn>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Representative Works</p>
              <h2 className="mt-4 text-2xl font-medium text-foreground">代表作品</h2>
            </FadeIn>
            <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedWorks.map((work) => (
                <StaggerItem key={work.id}>
                  <Link href={`/gallery/${work.id}`} className="group block">
                    <div className="image-card-hover relative aspect-4/3 overflow-hidden rounded-2xl">
                      <Image src={work.src} alt={work.title} fill className="object-cover transition-all duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                      <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                          <ArrowRight className="h-4 w-4 text-white" />
                        </span>
                      </div>
                    </div>
                    <div className="py-4">
                      <h3 className="text-base font-medium text-foreground">{work.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{work.category} · {work.year}</p>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <FadeIn>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Products</p>
              <h2 className="mt-4 text-2xl font-medium text-foreground">相关产品</h2>
            </FadeIn>
            <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((product) => (
                <StaggerItem key={product.id}>
                  <Link href={`/shop/${product.id}`} className="group block">
                    <div className="image-card-hover relative aspect-4/3 overflow-hidden rounded-2xl">
                      <Image src={product.src} alt={product.title} fill className="object-cover transition-all duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                    </div>
                    <div className="py-4">
                      <h3 className="text-base font-medium text-foreground">{product.title}</h3>
                      <p className="mt-1 text-sm text-primary font-medium">¥{product.price}</p>
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

export default function ArtisanDetailPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main><ArtisanDetail /></main>
      <SiteFooter />
    </div>
  )
}
