"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, Package, Heart, MapPin, Check } from "lucide-react"
import { FadeIn } from "@/components/motion"
import { mockUser, mockOrders } from "@/lib/data"

export default function ProfilePage() {
  const [name, setName] = useState(mockUser.name)
  const [phone, setPhone] = useState(mockUser.phone)
  const [email, setEmail] = useState(mockUser.email)
  const [showToast, setShowToast] = useState(false)

  const memberDate = new Date(mockUser.memberSince)
  const memberSinceText = `${memberDate.getFullYear()}年${memberDate.getMonth() + 1}月${memberDate.getDate()}日`
  const totalOrders = mockOrders.length
  const completedOrders = mockOrders.filter((o) => o.status === "已完成").length
  const totalSpent = mockOrders
    .filter((o) => o.status === "已完成")
    .reduce((sum, o) => sum + o.total, 0)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  return (
    <div>
      <FadeIn>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{"Profile"}</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          {"个人信息"}
        </h1>
      </FadeIn>

      {/* Avatar section */}
      <FadeIn delay={0.1} className="mt-10">
        <div className="flex items-center gap-6">
          <div className="group relative h-20 w-20 cursor-pointer overflow-hidden rounded-full bg-muted">
            <Image
              src={mockUser.avatar}
              alt={mockUser.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
              <Camera className="h-5 w-5 text-white opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </div>
          <div>
            <p className="text-lg font-medium text-foreground">{mockUser.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {"点击头像可更换照片"}
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Stats cards */}
      <FadeIn delay={0.15} className="mt-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Package className="h-4 w-4" />
              <span className="text-xs">{"全部订单"}</span>
            </div>
            <p className="mt-2 text-2xl font-medium text-foreground">{totalOrders}</p>
          </div>
          <div className="rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Check className="h-4 w-4" />
              <span className="text-xs">{"已完成"}</span>
            </div>
            <p className="mt-2 text-2xl font-medium text-foreground">{completedOrders}</p>
          </div>
          <div className="rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Heart className="h-4 w-4" />
              <span className="text-xs">{"收藏"}</span>
            </div>
            <p className="mt-2 text-2xl font-medium text-foreground">{mockUser.favoriteIds.length}</p>
          </div>
          <div className="rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-xs">{"累计消费"}</span>
            </div>
            <p className="mt-2 text-2xl font-medium text-foreground">{"¥"}{totalSpent}</p>
          </div>
        </div>
      </FadeIn>

      {/* Profile form */}
      <FadeIn delay={0.2} className="mt-10">
        <div className="rounded-2xl border border-border p-6 md:p-8">
          <h2 className="mb-6 text-lg font-medium text-foreground">{"基本信息"}</h2>
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="profile-name" className="mb-2 block text-sm text-muted-foreground">
                  {"姓名"}
                </label>
                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                />
              </div>
              <div>
                <label htmlFor="profile-phone" className="mb-2 block text-sm text-muted-foreground">
                  {"手机号"}
                </label>
                <input
                  id="profile-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                />
              </div>
            </div>
            <div>
              <label htmlFor="profile-email" className="mb-2 block text-sm text-muted-foreground">
                {"邮箱地址"}
              </label>
              <input
                id="profile-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-muted-foreground">
                {"注册时间"}
              </label>
              <p className="px-4 py-3 text-sm text-muted-foreground">{memberSinceText}</p>
            </div>

            <div className="flex justify-end pt-2">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                {"保存修改"}
              </motion.button>
            </div>
          </form>
        </div>
      </FadeIn>

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm text-background shadow-lg"
          >
            <Check className="h-4 w-4" />
            {"个人信息已保存"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
