"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { FadeIn } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert("登录功能为演示模式，请直接访问用户中心页面。")
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
                  {"登录"}
                </h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm text-muted-foreground"
                    >
                      {"邮箱地址"}
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm text-muted-foreground"
                    >
                      {"密码"}
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="请输入密码"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-muted-foreground">
                      <input type="checkbox" className="rounded" />
                      {"记住我"}
                    </label>
                    <button type="button" className="text-muted-foreground hover:text-foreground transition-colors">
                      {"忘记密码？"}
                    </button>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                  >
                    {"登录"}
                  </motion.button>
                </form>

                {/* Register link */}
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  {"还没有账号？"}
                  <Link
                    href="/auth/register"
                    className="ml-1 font-medium text-foreground hover:underline"
                  >
                    {"立即注册"}
                  </Link>
                </p>

                {/* Divider */}
                <div className="my-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs text-muted-foreground">{"或"}</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                {/* Social login */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => alert("微信登录功能开发中")}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05a6.093 6.093 0 01-.253-1.82c0-3.547 3.397-6.42 7.583-6.42.259 0 .509.013.76.034C16.768 4.924 13.046 2.188 8.691 2.188zm-2.65 4.401c.625 0 1.133.508 1.133 1.134 0 .626-.508 1.133-1.134 1.133-.625 0-1.133-.507-1.133-1.133 0-.626.508-1.134 1.133-1.134zm5.319 0c.626 0 1.134.508 1.134 1.134 0 .626-.508 1.133-1.134 1.133-.625 0-1.133-.507-1.133-1.133 0-.626.508-1.134 1.133-1.134zM15.832 9.4c-3.614 0-6.544 2.471-6.544 5.52 0 3.05 2.93 5.52 6.544 5.52.705 0 1.382-.096 2.017-.275a.716.716 0 01.587.082l1.382.808a.253.253 0 00.127.041.229.229 0 00.225-.229c0-.055-.023-.11-.037-.163l-.282-1.076a.483.483 0 01.174-.543C21.617 18.263 22.376 16.68 22.376 14.92c0-3.049-2.93-5.52-6.544-5.52zm-2.183 3.37c.487 0 .882.396.882.883a.883.883 0 01-.882.882.883.883 0 01-.883-.882c0-.487.396-.883.883-.883zm4.366 0c.487 0 .883.396.883.883a.883.883 0 01-.883.882.883.883 0 01-.882-.882c0-.487.395-.883.882-.883z" />
                    </svg>
                    {"微信登录"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => alert("支付宝登录功能开发中")}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.422 14.752c-1.762-.844-3.89-1.837-4.738-2.23a18.602 18.602 0 001.703-4.163h-3.87V6.964h4.856V5.96h-4.856V3.312h-2.27s-.012.048-.012.168c0 .12 0 1.812 0 2.48H7.384v1.004h4.856v1.395H8.47v.97h7.886a15.08 15.08 0 01-1.19 2.862c-2.026-.786-4.392-1.236-5.674-.864-1.608.468-2.784 1.584-3.084 2.868-.3 1.284.24 2.808 1.62 3.624 1.38.816 3.792.756 5.412-.48.936-.708 1.692-1.764 2.376-3.144.024-.048.048-.096.072-.144 1.56.768 5.37 2.532 5.37 2.532L24 15.988a64.788 64.788 0 00-2.578-1.236zM9.47 18.236c-2.052 1.02-3.864.588-4.356-.096-.492-.684-.192-2.16 1.284-2.832 1.08-.492 2.508-.264 3.972.264a8.478 8.478 0 01-.9 2.664z" />
                    </svg>
                    {"支付宝登录"}
                  </motion.button>
                </div>
              </div>
            </FadeIn>
          </div>
        </PageTransition>
      </main>
      <SiteFooter />
    </div>
  )
}
