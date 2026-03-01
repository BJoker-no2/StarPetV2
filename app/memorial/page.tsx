import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "个人纪念馆 | 萌宠星球",
  description: "你的专属纪念空间（预留页面）。",
}

export default function MemorialPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-2xl glass rounded-3xl p-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-sunset-warm font-serif">{"个人纪念馆（预留）"}</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {"这里将用于陈列回忆、寄语与照片。当前为预留页面。"}
        </p>
      </div>
    </main>
  )
}

