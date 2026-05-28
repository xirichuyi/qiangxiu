"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, Save } from "lucide-react"
import { artisans } from "@/lib/data"

const categories = ["花卉纹样", "传统纹样", "经典图案", "服饰绣品", "婚嫁绣品", "装饰纹样"]

export default function AdminGalleryNewPage() {
  const [form, setForm] = useState({
    title: "",
    artist: "",
    category: "",
    year: "",
    description: "",
    dimensions: "",
    material: "",
    technique: "",
    origin: "",
    story: "",
  })
  const [saved, setSaved] = useState(false)

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/admin/gallery"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        返回作品管理
      </Link>

      <h1 className="text-2xl font-semibold text-foreground">添加作品</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic info */}
          <div className="rounded-xl border border-border bg-background p-6">
            <h2 className="text-sm font-medium text-foreground mb-4">基本信息</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">作品名称</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="输入作品名称"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">创作者</label>
                  <select
                    value={form.artist}
                    onChange={(e) => handleChange("artist", e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                  >
                    <option value="">选择匠人</option>
                    {artisans.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">分类</label>
                  <select
                    value={form.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                  >
                    <option value="">选择分类</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">年份</label>
                <input
                  type="text"
                  value={form.year}
                  onChange={(e) => handleChange("year", e.target.value)}
                  placeholder="例如：2024"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">简要描述</label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="输入作品简要描述"
                  rows={3}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring resize-none"
                />
              </div>
            </div>
          </div>

          {/* Detail info */}
          <div className="rounded-xl border border-border bg-background p-6">
            <h2 className="text-sm font-medium text-foreground mb-4">详细信息</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">尺寸</label>
                  <input
                    type="text"
                    value={form.dimensions}
                    onChange={(e) => handleChange("dimensions", e.target.value)}
                    placeholder="例如：60cm x 80cm"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">材料</label>
                  <input
                    type="text"
                    value={form.material}
                    onChange={(e) => handleChange("material", e.target.value)}
                    placeholder="例如：丝线、棉布底料"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">技法</label>
                  <input
                    type="text"
                    value={form.technique}
                    onChange={(e) => handleChange("technique", e.target.value)}
                    placeholder="例如：挑花绣、平针绣"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">产地</label>
                  <input
                    type="text"
                    value={form.origin}
                    onChange={(e) => handleChange("origin", e.target.value)}
                    placeholder="例如：四川省阿坝州茂县"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">创作故事</label>
                <textarea
                  value={form.story}
                  onChange={(e) => handleChange("story", e.target.value)}
                  placeholder="讲述作品背后的故事..."
                  rows={5}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Image upload placeholder */}
          <div className="rounded-xl border border-border bg-background p-6">
            <h2 className="text-sm font-medium text-foreground mb-4">作品图片</h2>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-12">
              <Upload className="h-8 w-8 text-muted-foreground/40" />
              <p className="mt-3 text-sm text-muted-foreground">点击或拖拽上传</p>
              <p className="mt-1 text-xs text-muted-foreground">支持 JPG、PNG，最大 10MB</p>
            </div>
          </div>

          {/* Actions */}
          <div className="rounded-xl border border-border bg-background p-6">
            <h2 className="text-sm font-medium text-foreground mb-4">操作</h2>
            <div className="space-y-3">
              <button
                onClick={handleSave}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-sm hover:opacity-90 transition-opacity"
              >
                <Save className="h-4 w-4" />
                {saved ? "已保存" : "保存"}
              </button>
              <Link
                href="/admin/gallery"
                className="w-full inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
              >
                取消
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
