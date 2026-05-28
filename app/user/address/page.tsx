"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Plus, Trash2, Pencil, Check, X } from "lucide-react"
import { FadeIn } from "@/components/motion"
import { mockAddresses } from "@/lib/data"
import { cn } from "@/lib/utils"

interface Address {
  id: string
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  isDefault: boolean
}

const emptyAddress: Omit<Address, "id"> = {
  name: "",
  phone: "",
  province: "",
  city: "",
  district: "",
  detail: "",
  isDefault: false,
}

export default function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Address, "id">>(emptyAddress)

  function handleAdd() {
    setEditingId(null)
    setFormData(emptyAddress)
    setShowForm(true)
  }

  function handleEdit(address: Address) {
    setEditingId(address.id)
    setFormData({
      name: address.name,
      phone: address.phone,
      province: address.province,
      city: address.city,
      district: address.district,
      detail: address.detail,
      isDefault: address.isDefault,
    })
    setShowForm(true)
  }

  function handleDelete(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id))
  }

  function handleSetDefault(id: string) {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    )
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingId ? { ...a, ...formData } : a
        )
      )
    } else {
      const newId = String(Date.now())
      setAddresses((prev) => [
        ...prev,
        { id: newId, ...formData },
      ])
    }
    setShowForm(false)
    setEditingId(null)
    setFormData(emptyAddress)
  }

  function handleCancel() {
    setShowForm(false)
    setEditingId(null)
    setFormData(emptyAddress)
  }

  return (
    <div>
      <FadeIn>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{"Addresses"}</p>
            <h1 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
              {"收货地址"}
            </h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAdd}
            className="mt-6 flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            <Plus className="h-4 w-4" />
            {"添加新地址"}
          </motion.button>
        </div>
      </FadeIn>

      {/* Address form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 overflow-hidden"
          >
            <div className="rounded-2xl border border-border p-6 md:p-8">
              <h2 className="mb-6 text-lg font-medium text-foreground">
                {editingId ? "编辑地址" : "添加新地址"}
              </h2>
              <form onSubmit={handleSave} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="addr-name" className="mb-2 block text-sm text-muted-foreground">
                      {"收件人姓名"}
                    </label>
                    <input
                      id="addr-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="请输入收件人姓名"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground"
                    />
                  </div>
                  <div>
                    <label htmlFor="addr-phone" className="mb-2 block text-sm text-muted-foreground">
                      {"手机号"}
                    </label>
                    <input
                      id="addr-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="请输入手机号"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground"
                    />
                  </div>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                  <div>
                    <label htmlFor="addr-province" className="mb-2 block text-sm text-muted-foreground">
                      {"省份"}
                    </label>
                    <input
                      id="addr-province"
                      type="text"
                      required
                      value={formData.province}
                      onChange={(e) => setFormData((prev) => ({ ...prev, province: e.target.value }))}
                      placeholder="省份"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground"
                    />
                  </div>
                  <div>
                    <label htmlFor="addr-city" className="mb-2 block text-sm text-muted-foreground">
                      {"城市"}
                    </label>
                    <input
                      id="addr-city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                      placeholder="城市"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground"
                    />
                  </div>
                  <div>
                    <label htmlFor="addr-district" className="mb-2 block text-sm text-muted-foreground">
                      {"区县"}
                    </label>
                    <input
                      id="addr-district"
                      type="text"
                      required
                      value={formData.district}
                      onChange={(e) => setFormData((prev) => ({ ...prev, district: e.target.value }))}
                      placeholder="区县"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="addr-detail" className="mb-2 block text-sm text-muted-foreground">
                    {"详细地址"}
                  </label>
                  <input
                    id="addr-detail"
                    type="text"
                    required
                    value={formData.detail}
                    onChange={(e) => setFormData((prev) => ({ ...prev, detail: e.target.value }))}
                    placeholder="街道、门牌号、楼栋、单元、房间号"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-foreground"
                  />
                </div>

                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isDefault: e.target.checked }))}
                    className="rounded"
                  />
                  {"设为默认地址"}
                </label>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {"取消"}
                  </button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                  >
                    {"保存地址"}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Address list */}
      <div className="mt-8 space-y-4">
        {addresses.length === 0 ? (
          <FadeIn delay={0.1}>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border py-20">
              <MapPin className="h-12 w-12 text-muted-foreground/30" />
              <p className="mt-4 text-muted-foreground">{"暂无收货地址"}</p>
            </div>
          </FadeIn>
        ) : (
          addresses.map((address, i) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={cn(
                "rounded-2xl border p-6 transition-colors",
                address.isDefault ? "border-foreground/30" : "border-border"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-foreground">{address.name}</span>
                    <span className="text-sm text-muted-foreground">{address.phone}</span>
                    {address.isDefault && (
                      <span className="rounded-full bg-foreground px-2.5 py-0.5 text-xs font-medium text-background">
                        {"默认"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {address.province}{address.city}{address.district}{address.detail}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      title="设为默认"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(address)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    title="编辑"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-red-500"
                    title="删除"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
