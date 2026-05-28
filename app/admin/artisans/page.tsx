"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Users } from "lucide-react"
import { artisans } from "@/lib/data"

export default function AdminArtisansPage() {
  const [items, setItems] = useState(artisans)

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">匠人管理</h1>
        <button className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-sm hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" />
          添加匠人
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  头像
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  姓名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  称号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  地区
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  专长
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((artisan) => (
                <tr
                  key={artisan.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-6 py-4">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={artisan.src}
                        alt={artisan.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-foreground">
                      {artisan.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {artisan.title}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {artisan.region}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {artisan.specialty}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        编辑
                      </button>
                      <button
                        onClick={() => handleDelete(artisan.id)}
                        className="text-xs text-red-500 hover:text-red-600 transition-colors"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <Users className="h-12 w-12 text-muted-foreground/30" />
          <p className="mt-4 text-sm text-muted-foreground">暂无匠人</p>
        </div>
      )}
    </div>
  )
}
