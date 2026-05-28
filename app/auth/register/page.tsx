"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { FadeIn } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreed, setAgreed] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!agreed) {
      alert("请先阅读并同意用户协议和隐私政策。")
      return
    }
    if (password !== confirmPassword) {
      alert("两次输入的密码不一致，请重新输入。")
      return
    }
    alert("注册功能为演示模式，请直接访问用户中心页面。")
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <PageTransition>
          <div className="flex min-h-screen items-center justify-center px-6 pt-32 pb-20 md:px-12 lg:px-20">
            <FadeIn className="w-full max-w-md">
              <div className="rounded-2xl border border-border bg-background p-8 md:p-10">
                {/* Logo */}
                <div className="mb-8 text-center">
                  <Link href="/" className="inline-block">
                    <span className="text-3xl font-medium tracking-tight text-foreground">
                      {"羌绣"}
                    </span>
                  </Link>
                </div>

                {/* Title */}
                <h1 className="mb-8 text-center text-2xl font-medium text-foreground">
                  {"注册"}
                </h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm text-muted-foreground"
                    >
                      {"姓名"}
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="请输入真实姓名"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm text-muted-foreground"
                    >
                      {"手机号"}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="请输入手机号"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="reg-email"
                      className="mb-2 block text-sm text-muted-foreground"
                    >
                      {"邮箱地址"}
                    </label>
                    <input
                      id="reg-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="reg-password"
                      className="mb-2 block text-sm text-muted-foreground"
                    >
                      {"密码"}
                    </label>
                    <input
                      id="reg-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="请设置密码（至少6位）"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="mb-2 block text-sm text-muted-foreground"
                    >
                      {"确认密码"}
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="请再次输入密码"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground"
                    />
                  </div>

                  {/* Agreement */}
                  <label className="flex items-start gap-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1 rounded"
                    />
                    <span>
                      {"我已阅读并同意"}
                      <button type="button" className="text-foreground hover:underline">
                        {"《用户协议》"}
                      </button>
                      {"和"}
                      <button type="button" className="text-foreground hover:underline">
                        {"《隐私政策》"}
                      </button>
                    </span>
                  </label>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                  >
                    {"注册"}
                  </motion.button>
                </form>

                {/* Login link */}
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  {"已有账号？"}
                  <Link
                    href="/auth/login"
                    className="ml-1 font-medium text-foreground hover:underline"
                  >
                    {"立即登录"}
                  </Link>
                </p>
              </div>
            </FadeIn>
          </div>
        </PageTransition>
      </main>
      <SiteFooter />
    </div>
  )
}
