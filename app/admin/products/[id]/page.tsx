"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { getProductById } from "@/lib/data"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload } from "lucide-react"
import Image from "next/image"

const tagOptions = ["热销", "新品", "收藏", "礼品", "家居"]

export default function AdminProductEditPage() {
  const params = useParams()
  const id = params.id as string
  const product = getProductById(id)

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

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title,
        description: product.description,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || "",
        tag: product.tag || "热销",
        material: product.detail.material,
        dimensions: product.detail.dimensions,
        weight: product.detail.weight,
        craft: product.detail.craft,
        artisan: product.detail.artisan,
        origin: product.detail.origin,
        features: product.detail.features.join("\n"),
        careInstructions: product.detail.careInstructions,
      })
    }
  }, [product])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert("更新功能待实现")
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground">商品不存在</p>
        <Link
          href="/admin/products"
          className="mt-4 text-sm text-primary hover:underline"
        >
          返回商品列表
        </Link>
      </div>
    )
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
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Current Image */}
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>商品图片</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-xl border">
                <Image
                  src={product.src}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border py-8">
                  <div className="text-center">
                    <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      点击或拖拽上传新图片
                    </p>
                  </div>
                </div>
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
            更新
          </button>
          <button
            type="button"
            onClick={() => alert("删除功能待实现")}
            className="inline-flex h-10 items-center rounded-lg border border-destructive px-6 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            删除
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
