"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, MapPin, Calendar } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { events } from "@/lib/data"
import { FadeIn } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

const statusFilters = ["全部", "报名中", "进行中", "已结束"]

const statusColors: Record<string, string> = {
  "报名中": "bg-green-600",
  "进行中": "bg-blue-600",
  "已结束": "bg-muted-foreground",
}

function EventsContent() {
  const [activeStatus, setActiveStatus] = useState("全部")

  const filteredEvents = activeStatus === "全部"
    ? events
    : events.filter((e) => e.status === activeStatus)

  return (
    <PageTransition>
      <div className="px-6 pt-32 pb-20 md:px-12 lg:px-20">
        <FadeIn className="mb-16">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Events</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
            文化活动
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            参与羌绣文化活动，亲身感受千年技艺的魅力。从体验工坊到文化讲座，总有一种方式与羌绣相遇。
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mb-12 flex flex-wrap items-center gap-2">
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeStatus === status
                  ? "text-background"
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeStatus === status && (
                <motion.span
                  layoutId="event-filter"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{status}</span>
            </button>
          ))}
        </FadeIn>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, i) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <Link href={`/events/${event.id}`} className="group block">
                  <div className="image-card-hover relative aspect-4/3 overflow-hidden rounded-2xl">
                    <Image
                      src={event.src}
                      alt={event.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                    {/* Status badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium text-white ${statusColors[event.status] || "bg-muted-foreground"}`}>
                        {event.status}
                      </span>
                    </div>
                    {/* Category */}
                    <div className="absolute top-4 right-4">
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                        {event.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                        <ArrowRight className="h-4 w-4 text-white" />
                      </span>
                    </div>
                  </div>
                  <div className="py-5">
                    <h3 className="text-lg font-medium text-foreground">{event.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{event.description}</p>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" /> {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {event.location}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </PageTransition>
  )
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main><EventsContent /></main>
      <SiteFooter />
    </div>
  )
}
