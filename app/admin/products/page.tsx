"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { products } from "@/lib/data"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2, Search } from "lucide-react"

export default function AdminProductsPage() {
  const [search, setSearch] = useState("")

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="搜索商品..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          添加商品
        </Link>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">图片</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">商品名称</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">价格</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">标签</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg border">
                      <Image
                        src={product.src}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {product.title}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-foreground">¥{product.price}</span>
                    {product.originalPrice && (
                      <span className="ml-2 text-xs text-muted-foreground line-through">
                        ¥{product.originalPrice}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary">{product.tag}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted transition-colors"
                        title="编辑"
                      >
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                      </Link>
                      <button
                        onClick={() => alert("删除功能待实现")}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-destructive/10 transition-colors"
                        title="删除"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                    没有找到匹配的商品
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
