"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload } from "lucide-react"

const tagOptions = ["热销", "新品", "收藏", "礼品", "家居"]

export default function AdminProductNewPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    tag: "热销",
    material: "",
    dimensions: "",
    weight: "",
    craft: "",
    artisan: "",
    origin: "",
    features: "",
    careInstructions: "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert("保存功能待实现")
  }

  return (
    <div className="space-y-6">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        返回商品列表
      </Link>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  商品名称 <span className="text-destructive">*</span>
                </label>
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="请输入商品名称"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  标签
                </label>
                <select
                  name="tag"
                  value={form.tag}
                  onChange={handleChange}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                >
                  {tagOptions.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                商品描述
              </label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="请输入商品描述"
                rows={3}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  销售价格 <span className="text-destructive">*</span>
                </label>
                <Input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="¥0.00"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  原价
                </label>
                <Input
                  name="originalPrice"
                  type="number"
                  value={form.originalPrice}
                  onChange={handleChange}
                  placeholder="¥0.00"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detail Info */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>详细信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">材质</label>
                <Input
                  name="material"
                  value={form.material}
                  onChange={handleChange}
                  placeholder="如：头层牛皮 + 手工刺绣棉布面"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">尺寸</label>
                <Input
                  name="dimensions"
                  value={form.dimensions}
                  onChange={handleChange}
                  placeholder="如：28cm x 22cm x 12cm"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">重量</label>
                <Input
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  placeholder="如：约480g"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">工艺</label>
                <Input
                  name="craft"
                  value={form.craft}
                  onChange={handleChange}
                  placeholder="如：手工挑花绣、手工缝制"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">匠人/工作室</label>
                <Input
                  name="artisan"
                  value={form.artisan}
                  onChange={handleChange}
                  placeholder="如：云珍羌绣合作社"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">产地</label>
                <Input
                  name="origin"
                  value={form.origin}
                  onChange={handleChange}
                  placeholder="如：四川省阿坝州茂县"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features & Care */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>产品特色与保养</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                产品特色（每行一条）
              </label>
              <Textarea
                name="features"
                value={form.features}
                onChange={handleChange}
                placeholder={"头层牛皮包身，手感细腻耐用\n正面手工刺绣牡丹花纹，每件独一无二\n内设拉链口袋及手机插袋"}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                保养说明
              </label>
              <Textarea
                name="careInstructions"
                value={form.careInstructions}
                onChange={handleChange}
                placeholder="请输入保养说明..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Image Upload Placeholder */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>商品图片</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border py-12">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  点击或拖拽上传商品图片
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  支持 JPG, PNG 格式，单张不超过 5MB
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="inline-flex h-10 items-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            保存
          </button>
          <Link
            href="/admin/products"
            className="inline-flex h-10 items-center rounded-lg border px-6 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            取消
          </Link>
        </div>
      </form>
    </div>
  )
}
