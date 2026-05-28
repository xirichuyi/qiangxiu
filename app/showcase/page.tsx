"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { stitches, type Stitch } from "@/lib/data"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { cn } from "@/lib/utils"

const ShowcaseCanvas = dynamic(() => import("@/components/showcase-3d"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full grid place-items-center text-sm text-[#666] bg-gradient-to-br from-[#1A1A1A] to-[#3a2520]">
      正在加载三维体验馆…
    </div>
  ),
})

const categories = ["全部", "挑绣", "刺绣", "扎绣", "辅助"] as const
type Category = (typeof categories)[number]

export default function ShowcasePage() {
  const [stitchId, setStitchId] = useState<string>(stitches[0].id)
  const [category, setCategory] = useState<Category>("全部")
  const stitch: Stitch = stitches.find((s) => s.id === stitchId) || stitches[0]
  const filtered = category === "全部" ? stitches : stitches.filter((s) => s.category === category)

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8]">
      <SiteHeader />
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* 标题 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 max-w-3xl"
          >
            <p className="text-xs tracking-[0.3em] text-[#A02C2C] mb-3">SHOWCASE · 三维体验馆</p>
            <h1 className="text-3xl md:text-4xl font-semibold text-[#1A1A1A] tracking-tight">
              十六针法 · 指尖上的光泽
            </h1>
            <p className="mt-3 text-[#666] leading-relaxed">
              拖动旋转、滚轮缩放，切换不同针法观察绣线在光照下的真实差异。每一种针法在粗糙度、金属感与织物光泽上都有独立的物理参数，模拟羌绣手工的厚薄与质感。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-6">
            {/* 3D 区 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#1A1A1A]/10"
              style={{
                aspectRatio: "4 / 3",
                cursor: "url(/needle-cursor.svg) 3 3, grab",
                background:
                  "radial-gradient(ellipse at center, #2a1a1a 0%, #1a0f0f 60%, #0a0606 100%)",
              }}
            >
              <ShowcaseCanvas stitch={stitch} />

              {/* 当前针法浮层 */}
              <div className="absolute left-4 bottom-4 max-w-[60%] rounded-2xl backdrop-blur-md bg-black/40 text-white px-4 py-3 pointer-events-none">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full ring-2 ring-white/30"
                    style={{ background: stitch.color }}
                  />
                  <span className="font-semibold">{stitch.name}</span>
                  <span className="text-xs text-white/60">· {stitch.category}</span>
                </div>
                <p className="mt-1 text-xs text-white/80 leading-relaxed">{stitch.description}</p>
                <div className="mt-2 flex gap-3 text-[10px] text-white/60">
                  <span>R {stitch.roughness.toFixed(2)}</span>
                  <span>M {stitch.metalness.toFixed(2)}</span>
                  <span>S {stitch.sheen.toFixed(2)}</span>
                </div>
              </div>

              <div className="absolute right-4 top-4 text-[10px] text-white/70 bg-black/30 backdrop-blur rounded-full px-3 py-1.5 pointer-events-none">
                拖动旋转 · 滚轮缩放
              </div>
            </motion.div>

            {/* 针法列表 */}
            <motion.aside
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl bg-white shadow-xl border border-[#1A1A1A]/5 p-5 flex flex-col"
              style={{ maxHeight: "70vh" }}
            >
              <h2 className="font-semibold text-[#1A1A1A] mb-3">选择针法</h2>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={cn(
                      "text-xs px-3 py-1 rounded-full border transition",
                      category === c
                        ? "bg-[#A02C2C] border-[#A02C2C] text-white"
                        : "border-[#E8E8E8] text-[#666] hover:border-[#A02C2C]/50 hover:text-[#A02C2C]"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto -mx-1 pr-1 space-y-2">
                {filtered.map((s) => {
                  const active = s.id === stitchId
                  return (
                    <button
                      key={s.id}
                      onClick={() => setStitchId(s.id)}
                      className={cn(
                        "w-full text-left px-3 py-2.5 rounded-xl border transition",
                        active
                          ? "border-[#A02C2C] bg-[#A02C2C]/5"
                          : "border-[#E8E8E8] hover:border-[#A02C2C]/40 hover:bg-[#F5F1E8]/60"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="inline-block w-3 h-3 rounded-full ring-2"
                          style={{
                            background: s.color,
                            boxShadow: active ? `0 0 0 3px ${s.color}33` : undefined,
                          }}
                        />
                        <span className="font-medium text-sm text-[#1A1A1A]">{s.name}</span>
                        <span className="text-[10px] text-[#666] ml-auto px-1.5 py-0.5 rounded bg-[#E8E8E8]">
                          {s.category}
                        </span>
                      </div>
                      {active && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-1.5 text-xs text-[#666] leading-relaxed"
                        >
                          {s.description}
                        </motion.p>
                      )}
                    </button>
                  )
                })}
              </div>
            </motion.aside>
          </div>

          {/* 说明 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              {
                t: "物理材质",
                d: "MeshPhysicalMaterial 调控粗糙度、金属感、织物光泽 (sheen)，逐针法独立参数。",
              },
              {
                t: "光照真实",
                d: "三盏光源模拟主光、暖侧光与文化主色补光，让针迹在曲面上有自然高光过渡。",
              },
              {
                t: "交互探索",
                d: "拖动相机绕作品自由旋转，滚轮缩放细看针迹，鼠标在画面上化为针线。",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-2xl bg-white border border-[#1A1A1A]/5 p-5 shadow-sm"
              >
                <div className="font-semibold text-[#A02C2C] mb-1.5">{c.t}</div>
                <div className="text-sm text-[#666] leading-relaxed">{c.d}</div>
              </div>
            ))}
          </motion.section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
