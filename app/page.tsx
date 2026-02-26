import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Palette, ShoppingBag, Play } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/qiang-hero.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center lg:px-8 lg:py-40">
        <span className="mb-6 inline-block rounded-full border border-primary-foreground/30 px-4 py-1.5 text-xs font-medium tracking-wide text-primary-foreground/90">
          {"国家级非物质文化遗产"}
        </span>

        <h1 className="max-w-3xl text-balance text-3xl font-bold leading-tight text-primary-foreground sm:text-4xl md:text-5xl lg:text-6xl font-serif">
          {"千年针线"}
          <br />
          <span className="text-primary">{"指尖传承"}</span>
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
          {"羌绣，源自古老的羌族聚居地，以其精美的图案和丰富的色彩著称。每一针每一线，都承载着千年的文化记忆与民族智慧。"}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/gallery"
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-transform hover:scale-105"
          >
            {"探索作品"}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/tutorials"
            className="flex items-center gap-2 rounded-lg border border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            <Play className="h-4 w-4" />
            {"观看教程"}
          </Link>
        </div>
      </div>
    </section>
  )
}

function SectionCards() {
  const sections = [
    {
      title: "作品展览",
      description: "浏览精美的羌绣传统作品，感受牡丹、凤凰、羊角纹等经典图案的艺术魅力。",
      href: "/gallery",
      image: "/qiang-work-1.jpg",
      icon: <Palette className="h-5 w-5" />,
    },
    {
      title: "羌绣商城",
      description: "选购由非遗传承人手工制作的羌绣产品，将千年技艺融入现代生活。",
      href: "/shop",
      image: "/qiang-product-1.jpg",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      title: "技艺教程",
      description: "跟随视频教程，学习羌绣的基础针法与配色技巧，亲手体验这门古老技艺。",
      href: "/tutorials",
      image: "/qiang-artisan.jpg",
      icon: <Play className="h-5 w-5" />,
    },
  ]

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl font-serif">
          {"探索羌绣世界"}
        </h2>
        <p className="mt-3 text-muted-foreground">
          {"从欣赏、收藏到学习，全方位感受羌绣之美"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <div className="relative h-52 overflow-hidden">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="mb-3 flex items-center gap-2 text-primary">
                {section.icon}
                <h3 className="text-lg font-semibold text-card-foreground">{section.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {section.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-accent">
                {"了解更多"}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function CultureSection() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 py-20 lg:flex-row lg:px-8">
        <div className="flex-1">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {"文化溯源"}
          </span>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl font-serif">
            {"来自云朵上的民族"}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {"羌族是中国最古老的民族之一，主要聚居在四川省阿坝藏族羌族自治州。羌绣作为羌族文化的重要组成部分，已有数千年的历史。"}
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {"羌绣以其独特的挑花技法闻名，图案取材于自然万物 —— 牡丹象征富贵、羊角纹代表吉祥、云纹寓意平安。2008年，羌族刺绣被列入国家级非物质文化遗产名录。"}
          </p>
          <Link
            href="/gallery"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            {"欣赏经典作品"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative w-full max-w-md overflow-hidden rounded-xl lg:w-[420px]">
          <Image
            src="/qiang-artisan.jpg"
            alt="Qiang embroidery artisan at work"
            width={420}
            height={520}
            className="h-auto w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  )
}

function FeaturedWorks() {
  const works = [
    { id: "2", src: "/qiang-work-2.jpg", title: "羊角云纹绣片", tag: "传统纹样" },
    { id: "3", src: "/qiang-work-3.jpg", title: "凤穿牡丹", tag: "经典图案" },
    { id: "5", src: "/qiang-work-5.jpg", title: "鸳鸯戏莲", tag: "婚嫁绣品" },
    { id: "6", src: "/qiang-work-6.jpg", title: "团花绣样", tag: "装饰纹样" },
  ]

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 lg:px-8">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl font-serif">
            {"精选作品"}
          </h2>
          <p className="mt-2 text-muted-foreground">{"匠心独运，针线成画"}</p>
        </div>
        <Link
          href="/gallery"
          className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-accent sm:flex"
        >
          {"查看全部"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {works.map((work) => (
          <Link
            key={work.title}
            href={`/gallery/${work.id}`}
            className="group relative overflow-hidden rounded-lg"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={work.src}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform group-hover:translate-y-0">
                <span className="mb-1 inline-block rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  {work.tag}
                </span>
                <p className="text-sm font-medium text-primary-foreground">{work.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary"
        >
          {"查看全部作品"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main>
        <HeroSection />
        <SectionCards />
        <CultureSection />
        <FeaturedWorks />
      </main>
      <SiteFooter />
    </div>
  )
}
