"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { artisans } from "@/lib/data"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

function ArtisansContent() {
  return (
    <PageTransition>
      <div className="px-6 pt-32 pb-20 md:px-12 lg:px-20">
        <FadeIn className="mb-16">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Artisans</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
            传承匠人
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            她们用一生守护一门技艺，用一针一线传递千年文脉。走近羌绣背后的匠心与故事。
          </p>
        </FadeIn>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artisans.map((artisan) => (
            <StaggerItem key={artisan.id}>
              <Link href={`/artisans/${artisan.id}`} className="group block">
                <div className="image-card-hover relative aspect-4/3 overflow-hidden rounded-2xl">
                  <Image
                    src={artisan.src}
                    alt={artisan.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                  <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                      <ArrowRight className="h-4 w-4 text-white" />
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                      {artisan.title}
                    </span>
                  </div>
                </div>
                <div className="py-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-medium text-foreground">{artisan.name}</h3>
                    <span className="text-sm text-muted-foreground">{artisan.experience}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{artisan.specialty}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{artisan.region}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </PageTransition>
  )
}

export default function ArtisansPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main><ArtisansContent /></main>
      <SiteFooter />
    </div>
  )
}
