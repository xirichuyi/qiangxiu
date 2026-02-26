import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  ArrowLeft,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  MapPin,
  Check,
  Minus,
  Plus,
} from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { products, getProductById } from "@/lib/data"

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(id)
  if (!product) return { title: "商品未找到 - 羌绣传承" }
  return {
    title: `${product.title} - 羌绣商城 - 羌绣传承`,
    description: product.description,
  }
}

function TagBadge({ tag }: { tag: string }) {
  const colors: Record<string, string> = {
    "热销": "bg-primary text-primary-foreground",
    "新品": "bg-accent text-accent-foreground",
    "收藏": "bg-foreground text-background",
    "礼品": "bg-chart-5 text-primary-foreground",
    "家居": "bg-chart-4 text-foreground",
  }
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[tag] || "bg-muted text-muted-foreground"}`}
    >
      {tag}
    </span>
  )
}

export default async function ShopDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) notFound()

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const otherProducts = products.filter((p) => p.id !== product.id).slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/shop" className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              {"返回商城"}
            </Link>
            <span>{"/"}</span>
            <span className="text-foreground">{product.title}</span>
          </nav>

          {/* Main Content */}
          <div className="flex flex-col gap-10 lg:flex-row">
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <div className="sticky top-24 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <div className="relative aspect-square">
                  <Image
                    src={product.src}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute left-4 top-4">
                    <TagBadge tag={product.tag} />
                  </div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-3xl font-bold text-foreground font-serif sm:text-4xl">
                {product.title}
              </h1>

              <p className="mt-3 leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-chart-4 text-chart-4"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">{product.rating}</span>
                <span className="text-sm text-muted-foreground">
                  {"("}{product.reviews}{" 条评价)"}
                </span>
              </div>

              {/* Price */}
              <div className="mt-6 flex items-end gap-3 rounded-lg border border-border bg-card p-5">
                <span className="text-3xl font-bold text-primary">
                  {"¥"}{product.price}
                </span>
                <span className="mb-1 text-lg text-muted-foreground line-through">
                  {"¥"}{product.originalPrice}
                </span>
                <span className="mb-1 rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                  {"省 "}{discount}{"%"}
                </span>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center rounded-lg border border-border bg-card">
                  <button className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground" aria-label="Decrease quantity">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex h-10 w-12 items-center justify-center border-x border-border text-sm font-medium text-foreground">
                    {"1"}
                  </span>
                  <button className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground" aria-label="Increase quantity">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]">
                  <ShoppingBag className="h-4 w-4" />
                  {"加入购物车"}
                </button>
              </div>

              {/* Service promises */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4 shrink-0 text-primary" />
                  {"全国包邮"}
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
                  {"非遗认证"}
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-muted-foreground">
                  <RotateCcw className="h-4 w-4 shrink-0 text-primary" />
                  {"七天无理由"}
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  {product.detail.origin}
                </div>
              </div>

              {/* Product Specs */}
              <div className="mt-8 rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold text-card-foreground">{"商品详情"}</h2>
                <dl className="flex flex-col gap-3">
                  {[
                    { label: "材料", value: product.detail.material },
                    { label: "尺寸", value: product.detail.dimensions },
                    { label: "重量", value: product.detail.weight },
                    { label: "工艺", value: product.detail.craft },
                    { label: "匠人", value: product.detail.artisan },
                    { label: "产地", value: product.detail.origin },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                      <dt className="w-16 shrink-0 text-sm text-muted-foreground">{item.label}</dt>
                      <dd className="text-sm font-medium text-card-foreground">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Features */}
              <div className="mt-6 rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold text-card-foreground">{"产品特点"}</h2>
                <ul className="flex flex-col gap-2.5">
                  {product.detail.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-chart-5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Care */}
              <div className="mt-6 rounded-xl border border-border bg-muted/50 p-6">
                <h2 className="mb-3 text-lg font-semibold text-foreground">{"保养说明"}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {product.detail.careInstructions}
                </p>
              </div>
            </div>
          </div>

          {/* More Products */}
          {otherProducts.length > 0 && (
            <section className="mt-16 border-t border-border pt-12">
              <h2 className="mb-6 text-2xl font-bold text-foreground font-serif">{"你可能还喜欢"}</h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {otherProducts.map((op) => (
                  <Link
                    key={op.id}
                    href={`/shop/${op.id}`}
                    className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={op.src}
                        alt={op.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-3 top-3">
                        <TagBadge tag={op.tag} />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-card-foreground">{op.title}</h3>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-lg font-bold text-primary">{"¥"}{op.price}</span>
                        <span className="text-sm text-muted-foreground line-through">{"¥"}{op.originalPrice}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
