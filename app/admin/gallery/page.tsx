"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus, Pencil, Trash2, ImageIcon } from "lucide-react"
import { works } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function AdminGalleryPage() {
  const [items, setItems] = useState(works)

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((w) => w.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">作品管理</h1>
        <Link
          href="/admin/gallery/new"
          className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-sm hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" />
          添加作品
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((work) => (
          <div
            key={work.id}
            className="group relative rounded-xl border border-border bg-background overflow-hidden"
          >
            {/* Image */}
            <div className="relative aspect-square">
              <Image
                src={work.src}
                alt={work.title}
                fill
                className="object-cover"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button className="rounded-lg bg-white text-foreground px-3 py-1.5 text-xs font-medium hover:bg-white/90 transition-colors">
                  <span className="inline-flex items-center gap-1">
                    <Pencil className="h-3 w-3" />
                    编辑
                  </span>
                </button>
                <button
                  onClick={() => handleDelete(work.id)}
                  className="rounded-lg bg-red-500 text-white px-3 py-1.5 text-xs font-medium hover:bg-red-600 transition-colors"
                >
                  <span className="inline-flex items-center gap-1">
                    <Trash2 className="h-3 w-3" />
                    删除
                  </span>
                </button>
              </div>
            </div>
            {/* Info */}
            <div className="p-3">
              <h3 className="text-sm font-medium text-foreground truncate">{work.title}</h3>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{work.artist}</span>
                <span className="text-xs text-muted-foreground">{work.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
          <p className="mt-4 text-sm text-muted-foreground">暂无作品</p>
        </div>
      )}
    </div>
  )
}
