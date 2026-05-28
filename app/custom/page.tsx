"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Palette, Gift, Building2, Send, Check } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

const services = [
  {
    icon: Palette,
    title: "私人定制",
    description: "根据您的个人喜好和需求，在现有产品上定制专属图案、配色和尺寸。每一件都由传承人亲手绣制。",
    price: "¥800起",
    duration: "15-20个工作日",
  },
  {
    icon: Gift,
    title: "礼品定制",
    description: "为特殊场合打造独一无二的羌绣礼品。婚庆喜事、生日贺礼、节日馈赠，让传统工艺传递心意。",
    price: "¥500起",
    duration: "10-15个工作日",
  },
  {
    icon: Building2,
    title: "企业定制",
    description: "为企业提供批量定制服务，包括品牌联名、文创周边、员工福利、商务礼品等。支持品牌元素融入。",
    price: "面议",
    duration: "20-30个工作日",
  },
]

const process = [
  { step: "01", title: "沟通设计", description: "与客户深入沟通需求，确定图案、配色、尺寸等细节。" },
  { step: "02", title: "确认方案", description: "设计师出具效果图和详细报价，双方确认后进入制作。" },
  { step: "03", title: "手工制作", description: "由传承人按照确认方案精心绣制，制作过程可跟踪。" },
  { step: "04", title: "质检发货", description: "成品经过严格质检后，精心包装顺丰寄出。" },
]

function CustomContent() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <PageTransition>
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image src="/qiang-work-3.jpg" alt="定制服务" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-white/70">Custom Service</p>
            <h1 className="mt-4 text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl">
              定制服务
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-white/80 leading-relaxed">
              让传统羌绣为您量身定制，打造独一无二的手工艺品。
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20">
        {/* Service Tiers */}
        <FadeIn className="mb-4 text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Services</p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl">定制方案</h2>
        </FadeIn>
        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <div className="rounded-2xl border border-border p-8 transition-colors hover:bg-muted/30">
                <service.icon className="h-8 w-8 text-foreground" />
                <h3 className="mt-4 text-xl font-medium text-foreground">{service.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">起步价格</span>
                    <span className="font-medium text-foreground">{service.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">制作周期</span>
                    <span className="font-medium text-foreground">{service.duration}</span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Process */}
        <div className="mt-20 md:mt-28">
          <FadeIn className="text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Process</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl">定制流程</h2>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.1}>
                <div className="text-center">
                  <span className="text-4xl font-medium text-muted-foreground/30">{item.step}</span>
                  <h3 className="mt-2 text-lg font-medium text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
                {i < process.length - 1 && (
                  <div className="hidden lg:flex items-center justify-end">
                    <ArrowRight className="h-4 w-4 text-muted-foreground/30" />
                  </div>
                )}
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Custom Form */}
        <div className="mt-20 md:mt-28">
          <FadeIn className="text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Inquiry</p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl">提交定制需求</h2>
          </FadeIn>

          <FadeIn delay={0.2} className="mx-auto mt-12 max-w-2xl">
            {submitted ? (
              <div className="rounded-2xl border border-border p-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-foreground">
                  <Check className="h-6 w-6 text-background" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-foreground">需求已提交</h3>
                <p className="mt-2 text-sm text-muted-foreground">我们的设计团队将在2个工作日内与您联系。</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
                className="space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">姓名</label>
                    <input type="text" required placeholder="您的姓名" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">电话</label>
                    <input type="tel" required placeholder="联系电话" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">定制类型</label>
                  <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground">
                    <option>私人定制</option>
                    <option>礼品定制</option>
                    <option>企业定制</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">需求描述</label>
                  <textarea required rows={5} placeholder="请描述您的定制需求，包括图案偏好、尺寸要求、预算范围、交付时间等..." className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground" />
                </div>
                <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:gap-3">
                  提交需求 <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  )
}

export default function CustomPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main><CustomContent /></main>
      <SiteFooter />
    </div>
  )
}
