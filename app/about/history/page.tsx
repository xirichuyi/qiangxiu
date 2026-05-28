"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { FadeIn } from "@/components/motion"
import { PageTransition } from "@/components/page-transition"

const timeline = [
  {
    year: "新石器时期",
    title: "远古起源",
    description:
      "考古发现，在四川阿坝州汶川、茂县出土的新石器时期陶器上已有\"绳纹\"装饰图案，龙溪乡出土的商周青铜器上有\"饕餮纹\"图案，这些纹样与现代羌绣纹样高度吻合。羌族先民用骨针和植物纤维进行的装饰活动，是羌绣的远古雏形。",
  },
  {
    year: "三国时期",
    title: "传说起源",
    description:
      "民间传说将羌绣的引入归于三国时期，相传诸葛亮曾赠送绣花围裙给羌族女将领。虽为传说，但说明挑花刺绣艺术最初由汉区传入，后在羌族地区经数百年发展形成了独特的民族风格。",
  },
  {
    year: "明清时期",
    title: "繁荣鼎盛",
    description:
      "羌绣在明清时期十分兴盛。羌族女性自幼习绣，掌握针线制作出独具特色的云云鞋、尖尖鞋、朝鞋和花围腰等传统物品。\"一学剪、二学裁、三学挑花绣布鞋\"的谚语反映了当时女性从小系统学习绣艺的传统。刺绣技艺成为衡量一个妇女聪明才智的重要标志。",
  },
  {
    year: "1982年",
    title: "\"羌绣\"得名",
    description:
      "茂县绣娘李兴秀将作品带到北京参加展览，震惊地发现世人只知蜀绣、湘绣、苏绣、苗绣，却从未听闻\"羌绣\"。此前这种技艺仅被称为\"扎花\"。李兴秀由此毅然辞去小学教师工作，成为第一位系统推广\"羌绣\"这一名称的人，终身致力于羌绣的传播与保护。",
  },
  {
    year: "2008年6月7日",
    title: "列入国家非遗",
    description:
      "羌族刺绣经国务院批准，列入第二批国家级非物质文化遗产名录（编号VII-76），属传统美术类新增项目，申报保护单位为汶川县文化馆。这是羌绣获得国家层面正式认可的里程碑时刻。",
  },
  {
    year: "2008年5月12日",
    title: "汶川大地震",
    description:
      "8.0级大地震重创羌族聚居核心区。北川97%以上的羌族居所倒塌，茂县羌族博物馆7519件陶器中70%受损，国家一级文物\"瓦寺土司官碑\"被震成7块，汶川仅有的10位\"释比\"（口传文化传承者）中2位遇难——文化传承链面临断裂。灾后，杨华珍带领十余位绣娘走出大山创业，各级政府展开大规模抢救性保护。",
  },
  {
    year: "2009年",
    title: "羌年列入UNESCO急需保护名录",
    description:
      "羌年被列入联合国教科文组织《急需保护的非物质文化遗产名录》，这是国际社会对羌族文化濒危状况的直接回应。包括羌绣在内的羌族文化保护进入国际视野。",
  },
  {
    year: "2015年",
    title: "登上巴黎时装周",
    description:
      "90后传承人张居悦与上海大学PACC合作，设计的羌绣晚礼服《大山之托》《彩云之上》在巴黎高级定制时装周惊艳亮相，成为传统羌绣走向国际时尚舞台的标志性事件。同期，杨华珍的作品开始与爱马仕、植村秀等国际品牌签署艺术授权协议。",
  },
  {
    year: "2024年12月",
    title: "羌年转入UNESCO代表作名录",
    description:
      "联合国教科文组织宣布，羌年从《急需保护名录》成功转入《人类非物质文化遗产代表作名录》，标志着中国在羌族文化保护方面取得了国际认可的显著成效。这一成果也极大提振了羌绣保护传承的信心。",
  },
  {
    year: "2025年11月",
    title: "汶川羌绣博物馆开馆",
    description:
      "汶川映秀镇羌绣博物馆举行开馆仪式，国家级传承人杨华珍无偿捐赠1000余件珍贵藏品。博物馆建成三栋主题建筑，展出300余件精品，填补了系统性展示羌绣艺术的空白。目前，羌绣产业年产值超4亿元，阿坝州培训近4万名绣娘，北川文创产品出口30多个国家和地区。",
  },
]

function HistoryContent() {
  return (
    <PageTransition>
      <div className="px-6 pt-32 pb-20 md:px-12 lg:px-20">
        <FadeIn>
          <Link
            href="/about"
            className="line-reveal inline-flex items-center gap-2 pb-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            返回关于羌绣
          </Link>
        </FadeIn>

        <FadeIn className="mt-8 mb-16">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">History</p>
          <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
            历史溯源
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            从新石器时期的绳纹陶器到登上巴黎高定时装周，从\"扎花\"到\"羌绣\"，三千年的光阴在每一针中流淌。
          </p>
        </FadeIn>

        {/* Timeline */}
        <div className="mx-auto max-w-3xl">
          {timeline.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08} className="relative pb-12 pl-8 last:pb-0">
              {/* Timeline line */}
              {i < timeline.length - 1 && (
                <div className="absolute left-[7px] top-3 bottom-0 w-px bg-border" />
              )}
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-foreground bg-background" />
              {/* Content */}
              <div className="ml-4">
                <span className="text-sm font-medium text-primary">{item.year}</span>
                <h3 className="mt-1 text-xl font-medium text-foreground">{item.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main><HistoryContent /></main>
      <SiteFooter />
    </div>
  )
}
