import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "宠物名片 | 萌宠星球",
  description: "宠物名片展示与编辑（预留页面）。",
}

export default function PetCardPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-2xl glass rounded-3xl p-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-sunset-warm font-serif">{"宠物名片（预留）"}</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {"这里将展示/编辑你的宠物名片。当前为预留页面。"}
        </p>
      </div>
    </main>
  )
}

