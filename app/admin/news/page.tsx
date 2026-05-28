"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, Newspaper } from "lucide-react"
import { newsArticles } from "@/lib/data"
import { cn } from "@/lib/utils"

function categoryColor(category: string) {
  switch (category) {
    case "新闻":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
    case "活动":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
    case "文化":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
    case "教育":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
  }
}

export default function AdminNewsPage() {
  const [items, setItems] = useState(newsArticles)

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">新闻管理</h1>
        <button className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-sm hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" />
          发布新闻
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  标题
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  分类
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  作者
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  日期
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((article) => (
                <tr
                  key={article.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-6 py-4 max-w-xs">
                    <span className="text-sm font-medium text-foreground line-clamp-1">
                      {article.title}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
                        categoryColor(article.category)
                      )}
                    >
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {article.author}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {article.date}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        编辑
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
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
          <Newspaper className="h-12 w-12 text-muted-foreground/30" />
          <p className="mt-4 text-sm text-muted-foreground">暂无新闻</p>
        </div>
      )}
    </div>
  )
}
