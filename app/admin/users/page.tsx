"use client"

import { useState } from "react"
import { Users, Search } from "lucide-react"
import { adminStats } from "@/lib/data"

const allUsers = [
  ...adminStats.recentUsers.map((u, i) => ({
    id: String(i + 1),
    name: u.name,
    avatar: `/placeholder-user.jpg`,
    email: `${["zhang", "wang", "liu", "chen", "zhao"][i]}@example.com`,
    registerDate: u.date,
    orders: u.orders,
  })),
  {
    id: "6",
    name: "孙丽丽",
    avatar: "/placeholder-user.jpg",
    email: "sunlili@example.com",
    registerDate: "2026-02-20",
    orders: 4,
  },
  {
    id: "7",
    name: "周明辉",
    avatar: "/placeholder-user.jpg",
    email: "zhoumh@example.com",
    registerDate: "2026-02-18",
    orders: 0,
  },
  {
    id: "8",
    name: "吴晓燕",
    avatar: "/placeholder-user.jpg",
    email: "wuxy@example.com",
    registerDate: "2026-02-15",
    orders: 7,
  },
]

export default function AdminUsersPage() {
  const [search, setSearch] = useState("")

  const filtered = allUsers.filter(
    (u) =>
      u.name.includes(search) || u.email.includes(search)
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">用户管理</h1>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索用户..."
          className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring"
        />
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
                  邮箱
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  注册日期
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  订单数
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-6 py-4">
                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                      {user.name.charAt(0)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-foreground">
                      {user.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {user.email}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {user.registerDate}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">
                      {user.orders}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        查看
                      </button>
                      <button className="text-xs text-red-500 hover:text-red-600 transition-colors">
                        禁用
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <Users className="h-12 w-12 text-muted-foreground/30" />
          <p className="mt-4 text-sm text-muted-foreground">未找到用户</p>
        </div>
      )}
    </div>
  )
}
