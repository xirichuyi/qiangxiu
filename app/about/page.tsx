"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { FadeIn, StaggerContainer, StaggerItem, AnimatedCounter } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

const stats = [
  { value: 3000, suffix: "年+", label: "传承历史" },
  { value: 100, suffix: "+", label: "种传统针法" },
  { value: 4, suffix: "亿元", label: "年产业产值" },
  { value: 2008, suffix: "", label: "年列入国家非遗" },
]

const sections = [
  {
    title: "云朵上的民族",
    description:
      "羌族自称\"尔玛\"，是中国最古老的民族之一，有着三千多年的文字记载历史，自殷商时期便已活跃。羌族被誉为\"云朵上的民族\"，主要聚居在四川省阿坝藏族羌族自治州的茂县（全国羌族人口最集中的县，占全国30%）、汶川县、理县，以及绵阳市北川羌族自治县。羌族有自己的语言但没有文字，历史与文化全靠口耳相传和刺绣纹样来记录，因此羌绣被誉为\"穿在身上的史诗\"。",
    src: "/qiang-work-1.jpg",
  },
  {
    title: "震后重生",
    description:
      "2008年6月7日，羌族刺绣被国务院批准列入第二批国家级非物质文化遗产名录（编号VII-76）。同年5月12日汶川8.0级大地震重创羌族聚居区——北川97%以上羌族居所倒塌，茂县羌族博物馆7519件陶器70%受损，汶川仅有的10位\"释比\"（口传文化的传承者）中2位遇难。灾后，杨华珍、陈云珍等传承人带领绣娘走出大山创业，各级政府设立传习所、认定传承人，开展大规模抢救性保护工作。",
    src: "/qiang-work-5.jpg",
  },
  {
    title: "走向世界",
    description:
      "如今，羌绣已从传统手工艺成长为年产值超4亿元的文化产业。杨华珍的作品被爱马仕、植村秀、星巴克等20余个国际品牌授权使用；陈云珍开发了300多款现代文创产品，年销售超800万元；90后传承人张居悦的作品登上巴黎高定时装周。北川文创产品出口30多个国家和地区，年产值超5.5亿元。2024年12月，羌年从联合国教科文组织急需保护名录成功转入人类非遗代表作名录，标志着羌族文化保护的重大成果。",
    src: "/qiang-product-1.jpg",
  },
]

function AboutContent() {
  return (
    <PageTransition>
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src="/qiang-hero.jpg"
          alt="羌绣文化"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-white/70">About Qiangxiu</p>
            <h1 className="mt-4 text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl">
              关于羌绣
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-white/80 leading-relaxed">
              千年针线，指尖传承。探索羌族刺绣艺术的前世今生。
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20">
        {/* Intro */}
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            针尖上的艺术瑰宝
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            羌绣，又称羌族刺绣，是羌族人民世代相传的传统手工艺，拥有一百多种针法，分为刺绣、挑绣、扎绣三大类。
            它最独特的特点是\"不打样、不划线\"，绣娘完全凭记忆和手感完成绣制。传统以黑底白纹为经典配色，清秀明丽；
            彩色绣品则追求\"五色虹霓\"的效果，绚丽夺目。每一种纹样都承载着千年的民族记忆——云纹寓意吉祥平安，
            羊角花象征美满爱情，万字纹代表太阳崇拜与永恒。
          </p>
        </FadeIn>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 border-t border-border md:grid-cols-4">
          {stats.map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="border-b border-r border-border p-8 text-center transition-colors hover:bg-muted/50 md:border-b-0 last:border-r-0 md:[&:nth-child(4)]:border-r-0">
                <div className="text-3xl font-medium text-foreground md:text-4xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Alternating sections */}
        {sections.map((section, i) => (
          <div
            key={i}
            className={`mt-20 flex flex-col items-center gap-12 md:mt-28 md:flex-row ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <FadeIn direction={i % 2 === 0 ? "left" : "right"} className="flex-1">
              <div className="image-card-hover relative aspect-4/3 overflow-hidden rounded-2xl">
                <Image src={section.src} alt={section.title} fill className="object-cover" />
              </div>
            </FadeIn>
            <FadeIn direction={i % 2 === 0 ? "right" : "left"} delay={0.2} className="flex-1">
              <h3 className="text-2xl font-medium text-foreground md:text-3xl">{section.title}</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">{section.description}</p>
            </FadeIn>
          </div>
        ))}

        {/* CTA links */}
        <StaggerContainer className="mt-20 grid gap-4 sm:grid-cols-2 md:mt-28">
          <StaggerItem>
            <Link href="/about/history" className="group block rounded-2xl border border-border p-8 transition-colors hover:bg-muted/50">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">History</p>
              <h3 className="mt-3 text-xl font-medium text-foreground">历史溯源</h3>
              <p className="mt-2 text-sm text-muted-foreground">从远古羌人到当代传承，探索三千年刺绣历程。</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                了解更多 <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </StaggerItem>
          <StaggerItem>
            <Link href="/about/techniques" className="group block rounded-2xl border border-border p-8 transition-colors hover:bg-muted/50">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Techniques</p>
              <h3 className="mt-3 text-xl font-medium text-foreground">刺绣技法</h3>
              <p className="mt-2 text-sm text-muted-foreground">挑花绣、盘金绣、打籽绣...了解羌绣多样的针法技巧。</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                了解更多 <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </PageTransition>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main><AboutContent /></main>
      <SiteFooter />
    </div>
  )
}
