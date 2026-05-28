"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, MapPin, Calendar, Users, Phone, Ticket } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { getEventById } from "@/lib/data"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

const statusColors: Record<string, string> = {
  "报名中": "bg-green-600",
  "进行中": "bg-blue-600",
  "已结束": "bg-muted-foreground",
}

function EventDetail() {
  const { id } = useParams()
  const event = getEventById(id as string)

  if (!event) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">未找到该活动</p>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="px-6 pt-32 pb-20 md:px-12 lg:px-20">
        <FadeIn>
          <Link
            href="/events"
            className="line-reveal inline-flex items-center gap-2 pb-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            返回文化活动
          </Link>
        </FadeIn>

        {/* Hero */}
        <FadeIn delay={0.1} className="mt-8">
          <div className="relative aspect-video overflow-hidden rounded-2xl md:aspect-[21/9]">
            <Image src={event.src} alt={event.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium text-white ${statusColors[event.status] || "bg-muted-foreground"}`}>
                {event.status}
              </span>
              <h1 className="mt-3 text-2xl font-medium text-white md:text-4xl">{event.title}</h1>
            </div>
          </div>
        </FadeIn>

        <div className="mx-auto mt-12 max-w-3xl">
          {/* Info Cards */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
              {[
                { icon: Calendar, label: "时间", value: event.endDate && event.endDate !== event.date ? `${event.date} 至 ${event.endDate}` : event.date },
                { icon: MapPin, label: "地点", value: event.location },
                { icon: Users, label: "容量", value: event.detail.capacity > 0 ? `${event.detail.capacity}人` : "不限" },
                { icon: Ticket, label: "费用", value: event.detail.price },
              ].map((info) => (
                <div key={info.label} className="bg-background p-5">
                  <info.icon className="h-4 w-4 text-muted-foreground" />
                  <p className="mt-2 text-xs text-muted-foreground">{info.label}</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{info.value}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.3} className="mt-12">
            <h2 className="text-xl font-medium text-foreground">活动详情</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{event.detail.fullDescription}</p>
          </FadeIn>

          {/* Schedule */}
          <FadeIn delay={0.4} className="mt-12">
            <h2 className="text-xl font-medium text-foreground">活动日程</h2>
            <StaggerContainer className="mt-6 space-y-0">
              {event.detail.schedule.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="flex gap-4 border-b border-border py-4 last:border-0">
                    <span className="w-40 shrink-0 text-sm font-medium text-foreground">{item.time}</span>
                    <span className="text-sm text-muted-foreground">{item.activity}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeIn>

          {/* Registration & Contact */}
          <FadeIn delay={0.5} className="mt-12 rounded-2xl border border-border p-8">
            <h3 className="text-lg font-medium text-foreground">报名信息</h3>
            <p className="mt-2 text-sm text-muted-foreground">{event.detail.registration}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>联系电话：{event.detail.contact}</span>
            </div>
            {event.status === "报名中" && (
              <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90">
                立即报名
              </button>
            )}
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  )
}

export default function EventDetailPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main><EventDetail /></main>
      <SiteFooter />
    </div>
  )
}
