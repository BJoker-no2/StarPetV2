import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "入驻中心 | 萌宠星球",
  description: "为 TA 取名、赋予超能力，制作宠物名片。",
}

export default function CheckinPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-2xl glass rounded-3xl p-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-sunset-warm font-serif">
          {"入驻中心（占位页）"}
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {"下一步会在这里制作“宠物名片”：名字、超能力、简介与展示样式。你把需求给我，我就继续把这一页做完整。"}
        </p>
      </div>
    </main>
  )
}

