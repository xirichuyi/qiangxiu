"use client"

import { useState } from "react"
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

const contactInfo = [
  { icon: MapPin, label: "地址", value: "四川省阿坝藏族羌族自治州茂县凤仪镇羌绣街18号" },
  { icon: Mail, label: "邮箱", value: "qiangxiu@heritage.cn" },
  { icon: Phone, label: "电话", value: "028-8888-8888" },
  { icon: Clock, label: "工作时间", value: "周一至周五 9:00 - 18:00" },
]

function ContactContent() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <PageTransition>
      <div className="px-6 pt-32 pb-20 md:px-12 lg:px-20">
        <FadeIn className="mb-16">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Contact</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
            联系我们
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            无论是产品咨询、合作洽谈还是文化交流，我们都期待与您沟通。
          </p>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <FadeIn direction="left">
            {submitted ? (
              <div className="flex h-full items-center justify-center rounded-2xl border border-border p-12 text-center">
                <div>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-foreground">
                    <Send className="h-6 w-6 text-background" />
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-foreground">消息已发送</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    感谢您的留言，我们将在1-2个工作日内回复您。
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
                className="space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">姓名</label>
                    <input
                      type="text"
                      required
                      placeholder="您的姓名"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">电话</label>
                    <input
                      type="tel"
                      placeholder="您的联系电话"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">邮箱</label>
                  <input
                    type="email"
                    required
                    placeholder="您的邮箱地址"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">主题</label>
                  <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground">
                    <option>产品咨询</option>
                    <option>定制服务</option>
                    <option>商务合作</option>
                    <option>文化交流</option>
                    <option>媒体采访</option>
                    <option>其他</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">留言</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="请输入您的留言内容..."
                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:gap-3"
                >
                  发送留言
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </FadeIn>

          {/* Contact Info */}
          <FadeIn direction="right" delay={0.2}>
            <div className="space-y-6">
              <StaggerContainer className="space-y-4">
                {contactInfo.map((info) => (
                  <StaggerItem key={info.label}>
                    <div className="flex items-start gap-4 rounded-2xl border border-border p-6 transition-colors hover:bg-muted/50">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground">
                        <info.icon className="h-4 w-4 text-background" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{info.label}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{info.value}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Map placeholder */}
              <div className="overflow-hidden rounded-2xl border border-border bg-muted/30">
                <div className="flex aspect-video items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">四川省阿坝藏族羌族自治州</p>
                    <p className="text-xs text-muted-foreground">茂县凤仪镇羌绣街18号</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  )
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main><ContactContent /></main>
      <SiteFooter />
    </div>
  )
}
