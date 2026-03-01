import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "漫游广场 | 萌宠星球",
  description: "在广场里漫游，看看大家的星际旅伴（预留页面）。",
}

export default function SquarePage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-2xl glass rounded-3xl p-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-sunset-warm font-serif">{"漫游广场（预留）"}</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {"这里将展示大家的作品流与互动。当前为预留页面。"}
        </p>
      </div>
    </main>
  )
}

