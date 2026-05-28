"use client"

import { useState } from "react"
import { Save, AlertTriangle } from "lucide-react"

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("羌绣传承")
  const [siteDesc, setSiteDesc] = useState("传承千年羌绣文化，连接传统与现代")
  const [contactEmail, setContactEmail] = useState("contact@heritage.cn")
  const [contactPhone, setContactPhone] = useState("028-8888-8888")

  const [notifyOrders, setNotifyOrders] = useState(true)
  const [notifyStock, setNotifyStock] = useState(true)
  const [notifyUsers, setNotifyUsers] = useState(false)
  const [notifyEvents, setNotifyEvents] = useState(true)

  const [maintenance, setMaintenance] = useState(false)

  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">系统设置</h1>

      <div className="max-w-2xl space-y-6">
        {/* Basic info */}
        <div className="rounded-xl border border-border bg-background p-6">
          <h2 className="text-sm font-medium text-foreground mb-4">基本信息</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">站点名称</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">站点描述</label>
              <input
                type="text"
                value={siteDesc}
                onChange={(e) => setSiteDesc(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">联系邮箱</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">联系电话</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification settings */}
        <div className="rounded-xl border border-border bg-background p-6">
          <h2 className="text-sm font-medium text-foreground mb-4">通知设置</h2>
          <div className="space-y-4">
            <ToggleRow
              label="订单通知"
              description="有新订单时发送通知"
              checked={notifyOrders}
              onChange={setNotifyOrders}
            />
            <ToggleRow
              label="库存预警"
              description="库存不足时发送预警"
              checked={notifyStock}
              onChange={setNotifyStock}
            />
            <ToggleRow
              label="新用户通知"
              description="有新用户注册时通知"
              checked={notifyUsers}
              onChange={setNotifyUsers}
            />
            <ToggleRow
              label="活动提醒"
              description="活动即将开始时提醒"
              checked={notifyEvents}
              onChange={setNotifyEvents}
            />
          </div>
        </div>

        {/* Maintenance mode */}
        <div className="rounded-xl border border-border bg-background p-6">
          <h2 className="text-sm font-medium text-foreground mb-4">维护模式</h2>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm text-foreground">启用维护模式</p>
              <p className="mt-1 text-xs text-muted-foreground">
                开启后，网站将显示维护页面，仅管理员可以访问后台
              </p>
              {maintenance && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-orange-50 dark:bg-orange-950/30 px-3 py-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500 shrink-0" />
                  <p className="text-xs text-orange-600 dark:text-orange-400">
                    维护模式已开启，所有用户将无法访问网站前台
                  </p>
                </div>
              )}
            </div>
            <ToggleSwitch checked={maintenance} onChange={setMaintenance} />
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-4 py-2 text-sm hover:opacity-90 transition-opacity"
        >
          <Save className="h-4 w-4" />
          {saved ? "已保存" : "保存设置"}
        </button>
      </div>
    </div>
  )
}

/* ---- Toggle Row ---- */
function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (val: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <div>
        <p className="text-sm text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} />
    </div>
  )
}

/* ---- Custom Toggle Switch ---- */
function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (val: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full
        transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        ${checked ? "bg-foreground" : "bg-border"}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-4 w-4 rounded-full bg-background shadow-sm
          transition-transform duration-200 ease-in-out
          ${checked ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </button>
  )
}
