"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Bell, Mail, Smartphone, AlertTriangle, Check } from "lucide-react"
import { FadeIn } from "@/components/motion"

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        checked ? "bg-foreground" : "bg-border"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`inline-block h-4 w-4 rounded-full bg-background shadow-sm ${
          checked ? "ml-6" : "ml-1"
        }`}
      />
    </button>
  )
}

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showToast, setShowToast] = useState(false)

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    smsNotify: true,
  })

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert("两次输入的新密码不一致，请重新输入。")
      return
    }
    if (newPassword.length < 6) {
      alert("新密码长度不能少于6位。")
      return
    }
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  function handleSaveNotifications() {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  return (
    <div>
      <FadeIn>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{"Settings"}</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          {"账号设置"}
        </h1>
      </FadeIn>

      {/* Password change */}
      <FadeIn delay={0.1} className="mt-10">
        <div className="rounded-2xl border border-border p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-5 w-5 text-foreground" />
            <h2 className="text-lg font-medium text-foreground">{"修改密码"}</h2>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            <div>
              <label htmlFor="current-password" className="mb-2 block text-sm text-muted-foreground">
                {"当前密码"}
              </label>
              <input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="请输入当前密码"
                required
                className="w-full max-w-md rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="mb-2 block text-sm text-muted-foreground">
                {"新密码"}
              </label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="请输入新密码（至少6位）"
                required
                className="w-full max-w-md rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground"
              />
            </div>
            <div>
              <label htmlFor="confirm-new-password" className="mb-2 block text-sm text-muted-foreground">
                {"确认新密码"}
              </label>
              <input
                id="confirm-new-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="请再次输入新密码"
                required
                className="w-full max-w-md rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground"
              />
            </div>
            <div className="pt-2">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                {"更新密码"}
              </motion.button>
            </div>
          </form>
        </div>
      </FadeIn>

      {/* Notification preferences */}
      <FadeIn delay={0.15} className="mt-6">
        <div className="rounded-2xl border border-border p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-5 w-5 text-foreground" />
            <h2 className="text-lg font-medium text-foreground">{"通知偏好"}</h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{"订单状态更新"}</p>
                  <p className="text-xs text-muted-foreground">{"当订单状态发生变化时通过邮件通知"}</p>
                </div>
              </div>
              <Toggle
                checked={notifications.orderUpdates}
                onChange={(v) => setNotifications((prev) => ({ ...prev, orderUpdates: v }))}
              />
            </div>
            <div className="border-t border-border" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{"促销活动"}</p>
                  <p className="text-xs text-muted-foreground">{"接收新品上架和促销优惠通知"}</p>
                </div>
              </div>
              <Toggle
                checked={notifications.promotions}
                onChange={(v) => setNotifications((prev) => ({ ...prev, promotions: v }))}
              />
            </div>
            <div className="border-t border-border" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{"文化资讯"}</p>
                  <p className="text-xs text-muted-foreground">{"接收羌绣文化活动和展览资讯邮件"}</p>
                </div>
              </div>
              <Toggle
                checked={notifications.newsletter}
                onChange={(v) => setNotifications((prev) => ({ ...prev, newsletter: v }))}
              />
            </div>
            <div className="border-t border-border" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{"短信通知"}</p>
                  <p className="text-xs text-muted-foreground">{"接收重要通知的短信提醒"}</p>
                </div>
              </div>
              <Toggle
                checked={notifications.smsNotify}
                onChange={(v) => setNotifications((prev) => ({ ...prev, smsNotify: v }))}
              />
            </div>
          </div>
          <div className="mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSaveNotifications}
              className="rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              {"保存设置"}
            </motion.button>
          </div>
        </div>
      </FadeIn>

      {/* Danger zone */}
      <FadeIn delay={0.2} className="mt-6">
        <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h2 className="text-lg font-medium text-red-700">{"危险操作"}</h2>
          </div>
          <p className="text-sm text-red-600/80 mb-6 max-w-lg">
            {"注销账号后，您的所有数据将被永久删除，包括订单记录、收藏内容和个人信息。此操作不可恢复，请谨慎操作。"}
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => alert("注销账号功能为演示模式，实际操作需要额外的安全验证。")}
            className="rounded-full border border-red-300 px-6 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
          >
            {"注销账号"}
          </motion.button>
        </div>
      </FadeIn>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm text-background shadow-lg"
          >
            <Check className="h-4 w-4" />
            {"设置已保存"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
