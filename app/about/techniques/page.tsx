"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

const techniques = [
  {
    name: "挑花绣（架花）",
    level: "核心技法",
    src: "/qiang-work-1.jpg",
    description:
      "羌绣最核心也最具代表性的技法，通过布料经纬交叉点进行绣制。最大特点是\"不打样、不划线\"，完全凭记忆和手感完成。分为三种：十字挑（对角交叉最精细）、串挑（白粉引导的链式绣法）、编挑（多色丝线密排编织）。",
    features: ["不打样不划线", "凭记忆绣制", "分十字挑/串挑/编挑三种", "几何纹样的精确表达"],
  },
  {
    name: "纳花绣（扎花）",
    level: "进阶技法",
    src: "/qiang-work-3.jpg",
    description:
      "将两层或多层面料叠加，用针线穿刺固定形成图案的技法。绣面呈现清秀明丽的效果，层次丰富，立体感强。是羌绣三大类基础技法之一（刺绣、挑绣、扎绣）中扎绣类的代表。",
    features: ["多层叠加立体效果", "清秀明丽", "层次丰富", "三大类基础之一"],
  },
  {
    name: "勾花绣（链子扣）",
    level: "进阶技法",
    src: "/qiang-work-5.jpg",
    description:
      "用丝线做成连续的链环状针脚，一环扣一环地绣制图案。勾花绣的风格\"刚健淳朴、粗犷豪放\"，与挑花绣的精细形成鲜明对比，常用于装饰性较强的大面积图案。",
    features: ["链环状连续针脚", "刚健淳朴", "粗犷豪放", "适合大面积装饰"],
  },
  {
    name: "打籽绣",
    level: "辅助技法",
    src: "/qiang-work-2.jpg",
    description:
      "将丝线绕成小结（\"籽\"）后固定在绣面上的技法。绣面呈现出密集的小颗粒效果，富有立体感和肌理感。常用于表现花蕊、动物皮毛等需要质感变化的部分，是羌绣一百多种针法中的重要辅助技法。",
    features: ["绣面呈颗粒状", "立体肌理感", "表现花蕊和细节", "百余种针法之一"],
  },
  {
    name: "撇花绣（平绣）",
    level: "基础技法",
    src: "/qiang-work-4.jpg",
    description:
      "用丝线在布面上做平滑均匀的表面绣法，又称平针绣、齐针绣。绣面光洁平整，色彩表现丰富，适合大面积的色彩填充和渐变处理。常见的辅助针法有长短针、掺针、柳针等。",
    features: ["绣面平滑均匀", "适合大面积填充", "色彩渐变自然", "配合长短针/掺针使用"],
  },
  {
    name: "织字绣（提花）",
    level: "特殊技法",
    src: "/qiang-work-6.jpg",
    description:
      "通过编织方式创造文字或图案的技法，\"蕴意奇妙、古朴精美\"。这是羌绣中最为特殊的技法之一，兼具编织和刺绣的双重特点，能在布面上呈现出类似织锦的效果，体现了羌族先民非凡的智慧。",
    features: ["编织与刺绣结合", "蕴意奇妙", "古朴精美", "类织锦效果"],
  },
]

function TechniquesContent() {
  return (
    <PageTransition>
      <div className="px-6 pt-32 pb-20 md:px-12 lg:px-20">
        <FadeIn>
          <Link
            href="/about"
            className="line-reveal inline-flex items-center gap-2 pb-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            返回关于羌绣
          </Link>
        </FadeIn>

        <FadeIn className="mt-8 mb-16">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Techniques</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
            刺绣技法
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            羌绣共有一百多种针法，分为刺绣、挑绣、扎绣三大类。以下是六种最具代表性的核心技法。
          </p>
        </FadeIn>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {techniques.map((tech) => (
            <StaggerItem key={tech.name}>
              <div className="group rounded-2xl border border-border overflow-hidden transition-colors hover:bg-muted/30">
                <div className="image-card-hover relative aspect-4/3 overflow-hidden">
                  <Image
                    src={tech.src}
                    alt={tech.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                      {tech.level}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-foreground">{tech.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{tech.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tech.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </PageTransition>
  )
}

export default function TechniquesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main><TechniquesContent /></main>
      <SiteFooter />
    </div>
  )
}
