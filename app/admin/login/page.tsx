"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, User as UserIcon, ArrowRight, AlertCircle } from "lucide-react"
import { checkCredentials, isLoggedIn, login } from "@/lib/admin-auth"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isLoggedIn()) router.replace("/admin")
  }, [router])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")

    if (!username || !password) {
      setError("请输入用户名和密码")
      return
    }

    setSubmitting(true)
    if (checkCredentials(username, password)) {
      login()
      router.replace("/admin")
    } else {
      setError("用户名或密码错误")
      setSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#1A1A1A]">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 30%, #A02C2C 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, #2B4159 0%, transparent 50%)",
          }}
        />
        <div className="absolute inset-0 bg-[url('/circular-mask-pattern.jpg')] opacity-5 mix-blend-overlay" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A02C2C] text-2xl font-bold text-white shadow-lg shadow-[#A02C2C]/40">
              羌
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Qiang Embroidery Cloud
            </p>
            <h1 className="mt-2 text-2xl font-medium tracking-tight text-white">
              羌绣云上 · 管理后台
            </h1>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/60"
                >
                  用户名
                </label>
                <div className="relative">
                  <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={submitting}
                    className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-[#A02C2C] focus:outline-none focus:ring-2 focus:ring-[#A02C2C]/30 disabled:opacity-60"
                    placeholder="admin"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/60"
                >
                  密码
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={submitting}
                    className="w-full rounded-xl border border-white/10 bg-black/30 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-[#A02C2C] focus:outline-none focus:ring-2 focus:ring-[#A02C2C]/30 disabled:opacity-60"
                    placeholder="••••••"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {error}
                </motion.div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#A02C2C] py-3 text-sm font-medium text-white transition-all hover:bg-[#B83A3A] hover:gap-3 disabled:opacity-60"
              >
                {submitting ? "登录中…" : "登录管理后台"}
                {!submitting && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
              </button>
            </form>

            {/* Hint */}
            <div className="mt-6 rounded-lg border border-white/5 bg-black/30 px-3 py-2 text-[11px] text-white/40">
              <span className="text-white/60">演示账号：</span>
              用户名 <span className="font-mono text-white/80">admin</span> · 密码{" "}
              <span className="font-mono text-white/80">admin</span>
            </div>
          </div>

          {/* Bottom links */}
          <div className="mt-8 text-center text-xs text-white/40">
            <a href="/" className="hover:text-white/70 transition-colors">
              返回前台
            </a>
            <span className="mx-3">·</span>
            <span>© 2026 羌绣云上</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
