"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, Calendar } from "lucide-react"
import { events } from "@/lib/data"
import { cn } from "@/lib/utils"

function statusColor(status: string) {
  switch (status) {
    case "报名中":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
    case "进行中":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
    case "已结束":
      return "bg-gray-100 text-gray-500 dark:bg-gray-800/50 dark:text-gray-400"
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
  }
}

function categoryLabel(category: string) {
  switch (category) {
    case "工坊":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
    case "节庆":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
    case "讲座":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
    case "展览":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
  }
}

export default function AdminEventsPage() {
  const [items, setItems] = useState(events)

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">活动管理</h1>
        <button className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-sm hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" />
          添加活动
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
                  日期
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  地点
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  分类
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-6 py-4 max-w-xs">
                    <span className="text-sm font-medium text-foreground line-clamp-1">
                      {event.title}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {event.date}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {event.location}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
                        categoryLabel(event.category)
                      )}
                    >
                      {event.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
                        statusColor(event.status)
                      )}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        编辑
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
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
          <Calendar className="h-12 w-12 text-muted-foreground/30" />
          <p className="mt-4 text-sm text-muted-foreground">暂无活动</p>
        </div>
      )}
    </div>
  )
}
