"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowDown, Calendar, MapPin } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"
import { artisans, newsArticles, events } from "@/lib/data"

/* ═══════════════════════════ Hero Section ═══════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative bg-background">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          <motion.div className="relative w-full h-full" style={{ scale }}>
            <Image
              src="/qiang-hero.jpg"
              alt="羌绣传承"
              fill
              className="object-cover"
              priority
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
            <motion.div className="absolute inset-0 flex items-end overflow-hidden" style={{ opacity: heroOpacity }}>
              <h1 className="w-full text-[18vw] font-medium leading-[0.85] tracking-tighter text-white pb-4 pl-4 md:pl-8">
                {"羌绣传承".split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                    style={{ animationDelay: `${0.3 + i * 0.12}s` }}
                  >
                    {char}
                  </span>
                ))}
              </h1>
            </motion.div>
            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              style={{ opacity: heroOpacity }}
            >
              <span className="text-xs uppercase tracking-widest text-white/60">{"Scroll"}</span>
              <ArrowDown className="h-4 w-4 text-white/60 animate-[scrollBounce_2s_ease-in-out_infinite]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="h-[100vh]" />
      <div className="px-6 pt-32 pb-28 md:pt-48 md:px-12 md:pb-36 lg:px-20 lg:pt-56 lg:pb-44">
        <FadeIn>
          <p className="mx-auto max-w-2xl text-center text-2xl leading-relaxed text-muted-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
            {"千年针线，指尖传承。"}
            <br />
            {"来自云朵上的民族艺术。"}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

/* ═══════════════════════════ Featured Products ═══════════════════════════ */
function FeaturedProducts() {
  return (
    <section className="bg-background">
      <div className="relative px-6 py-20 md:px-12 lg:px-20">
        <FadeIn className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{"探索羌绣"}</p>
          <h2 className="mt-6 text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {"作品与商城"}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FadeIn direction="left">
            <Link href="/gallery" className="group block">
              <div className="image-card-hover relative aspect-4/3 overflow-hidden rounded-2xl">
                <Image
                  src="/qiang-work-1.jpg"
                  alt="作品展览"
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                <div className="absolute bottom-6 left-6">
                  <span className="backdrop-blur-md px-4 py-2 text-sm font-medium rounded-full bg-white/20 text-white transition-all group-hover:bg-white/30">
                    {"作品展览"}
                  </span>
                </div>
                <div className="absolute bottom-6 right-6 translate-x-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                  <ArrowRight className="h-5 w-5 text-white" />
                </div>
              </div>
            </Link>
          </FadeIn>
          <FadeIn direction="right">
            <Link href="/shop" className="group block">
              <div className="image-card-hover relative aspect-4/3 overflow-hidden rounded-2xl">
                <Image
                  src="/qiang-product-1.jpg"
                  alt="羌绣商城"
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                <div className="absolute bottom-6 left-6">
                  <span className="backdrop-blur-md px-4 py-2 text-sm font-medium rounded-full bg-white/20 text-white transition-all group-hover:bg-white/30">
                    {"羌绣商城"}
                  </span>
                </div>
                <div className="absolute bottom-6 right-6 translate-x-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                  <ArrowRight className="h-5 w-5 text-white" />
                </div>
              </div>
            </Link>
          </FadeIn>
        </div>

        <FadeIn className="mt-20 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{"国家级非物质文化遗产"}</p>
          <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-muted-foreground text-2xl md:text-3xl text-center">
            {"羌绣以其独特的挑花技法闻名，图案取材于自然万物。牡丹象征富贵、羊角纹代表吉祥、云纹寓意平安。"}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

/* ═══════════════════════════ Culture Section ═══════════════════════════ */
function CultureSection() {
  const items = [
    { src: "/qiang-work-2.jpg", label: "传统技艺", title: "十字挑花绣" },
    { src: "/qiang-work-3.jpg", label: "经典图案", title: "凤穿牡丹" },
    { src: "/qiang-artisan.jpg", label: "匠人精神", title: "非遗传承人" },
  ]

  return (
    <section className="bg-background">
      <FadeIn className="px-6 py-20 text-center md:px-12 md:py-28 lg:px-20 lg:py-32 lg:pb-20">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {"千年技艺，"}
          <br />
          {"指尖上的传承。"}
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">{"文化溯源"}</p>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 gap-4 px-6 pb-20 md:grid-cols-3 md:px-12 lg:px-20">
        {items.map((item) => (
          <StaggerItem key={item.title} className="group cursor-pointer">
            <div className="image-card-hover relative aspect-4/3 overflow-hidden rounded-2xl">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
            </div>
            <div className="py-6">
              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">{item.label}</p>
              <h3 className="text-foreground text-xl font-medium">{item.title}</h3>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}

/* ═══════════════════════════ Gallery Strip ═══════════════════════════ */
function GalleryStrip() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"])

  const images = [
    { src: "/qiang-work-1.jpg", alt: "牡丹富贵图" },
    { src: "/qiang-work-2.jpg", alt: "羊角云纹绣片" },
    { src: "/qiang-work-3.jpg", alt: "凤穿牡丹" },
    { src: "/qiang-work-4.jpg", alt: "菱形腰带绣" },
    { src: "/qiang-work-5.jpg", alt: "鸳鸯戏莲" },
    { src: "/qiang-work-6.jpg", alt: "团花绣样" },
  ]

  return (
    <section ref={containerRef} className="relative bg-background overflow-hidden py-20">
      <FadeIn className="px-6 mb-12 md:px-12 lg:px-20">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{"Selected Works"}</p>
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          {"精选作品"}
        </h2>
      </FadeIn>

      <motion.div className="flex gap-6 px-6" style={{ x }}>
        {images.map((img) => (
          <div
            key={img.alt}
            className="group relative h-[60vh] w-[75vw] shrink-0 overflow-hidden rounded-2xl md:w-[50vw] lg:w-[35vw]"
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
            <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="backdrop-blur-md px-4 py-2 text-sm font-medium rounded-full bg-white/20 text-white">
                {img.alt}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      <FadeIn className="px-6 mt-12 md:px-12 lg:px-20">
        <Link
          href="/gallery"
          className="line-reveal inline-flex items-center gap-2 pb-1 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
        >
          {"查看全部作品"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </FadeIn>
    </section>
  )
}

/* ═══════════════════════════ Stats ═══════════════════════════ */
function StatsSection() {
  const stats = [
    { label: "历史", value: "3000年+" },
    { label: "传承人", value: "200位+" },
    { label: "针法", value: "50种+" },
    { label: "非遗认证", value: "2008年" },
  ]

  return (
    <section className="bg-background">
      <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.08}>
            <div className="border-b border-r border-border p-10 text-center last:border-r-0 md:border-b-0 transition-colors hover:bg-muted/50">
              <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              <p className="font-medium text-foreground text-3xl md:text-4xl">{stat.value}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════ Editorial ═══════════════════════════ */
function EditorialSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1])

  return (
    <section ref={ref} className="bg-background">
      <FadeIn className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <p className="mx-auto max-w-5xl text-2xl font-medium leading-snug md:text-3xl lg:text-[2.5rem] lg:leading-snug text-foreground">
          {"羌族是中国最古老的民族之一，主要聚居在四川省阿坝藏族羌族自治州。羌绣作为羌族文化的重要组成部分，以其精美的图案和丰富的色彩，承载着千年的文化记忆与民族智慧。"}
        </p>
      </FadeIn>

      <div className="relative aspect-video w-full overflow-hidden">
        <motion.div className="relative w-full h-full" style={{ scale: imgScale }}>
          <Image src="/qiang-artisan.jpg" alt="羌绣传承人" fill className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
      </div>
    </section>
  )
}

/* ═══════════════════════════ Artisans Section ═══════════════════════════ */
function ArtisansSection() {
  const featured = artisans.slice(0, 4)

  return (
    <section className="bg-background">
      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <FadeIn className="mb-16 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{"Artisans"}</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl">{"传承匠人"}</h2>
          </div>
          <Link
            href="/artisans"
            className="line-reveal hidden items-center gap-2 pb-1 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground sm:inline-flex"
          >
            {"全部匠人"} <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {featured.map((artisan) => (
            <StaggerItem key={artisan.id}>
              <Link href={`/artisans/${artisan.id}`} className="group block">
                <div className="image-card-hover relative aspect-3/4 overflow-hidden rounded-2xl">
                  <Image src={artisan.src} alt={artisan.name} fill className="object-cover transition-all duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-base font-medium text-white">{artisan.name}</h3>
                    <p className="text-xs text-white/70">{artisan.title}</p>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

/* ═══════════════════════════ News Section ═══════════════════════════ */
function NewsSection() {
  const latest = newsArticles.slice(0, 3)

  return (
    <section className="bg-background">
      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <FadeIn className="mb-16 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{"News"}</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl">{"最新动态"}</h2>
          </div>
          <Link
            href="/news"
            className="line-reveal hidden items-center gap-2 pb-1 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground sm:inline-flex"
          >
            {"全部资讯"} <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((article) => (
            <StaggerItem key={article.id}>
              <Link href={`/news/${article.id}`} className="group block">
                <div className="image-card-hover relative aspect-4/3 overflow-hidden rounded-2xl">
                  <Image src={article.src} alt={article.title} fill className="object-cover transition-all duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">{article.category}</span>
                  </div>
                </div>
                <div className="py-5">
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                  <h3 className="mt-1 text-base font-medium text-foreground leading-snug">{article.title}</h3>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

/* ═══════════════════════════ Events Section ═══════════════════════════ */
function EventsSection() {
  const upcoming = events.filter((e) => e.status === "报名中").slice(0, 2)
  if (upcoming.length === 0) return null

  return (
    <section className="bg-background">
      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <FadeIn className="mb-16 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{"Events"}</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl">{"近期活动"}</h2>
          </div>
          <Link
            href="/events"
            className="line-reveal hidden items-center gap-2 pb-1 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground sm:inline-flex"
          >
            {"全部活动"} <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2">
          {upcoming.map((event) => (
            <StaggerItem key={event.id}>
              <Link href={`/events/${event.id}`} className="group block rounded-2xl border border-border overflow-hidden transition-colors hover:bg-muted/30">
                <div className="image-card-hover relative aspect-video overflow-hidden">
                  <Image src={event.src} alt={event.title} fill className="object-cover transition-all duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">{event.status}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-foreground">{event.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {event.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {event.location}</span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

/* ═══════════════════════════ Tutorials CTA ═══════════════════════════ */
function TutorialsCTA() {
  return (
    <FadeIn className="bg-background px-6 py-24 text-center md:px-12 md:py-32 lg:px-20">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{"学习羌绣"}</p>
      <h2 className="mt-6 text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
        {"跟随非遗传承人，"}
        <br />
        {"亲手体验千年技艺。"}
      </h2>
      <Link
        href="/tutorials"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:gap-3"
      >
        {"浏览教程"}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </FadeIn>
  )
}

/* ═══════════════════════════ Page ═══════════════════════════ */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CultureSection />
        <GalleryStrip />
        <StatsSection />
        <EditorialSection />
        <ArtisansSection />
        <NewsSection />
        <EventsSection />
        <TutorialsCTA />
      </main>
      <SiteFooter />
    </div>
  )
}
