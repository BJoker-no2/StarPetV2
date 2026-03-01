import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "登录 | 萌宠星球",
  description: "登录以保存你的星际旅程（预留页面）。",
}

export default function LoginPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-2xl glass rounded-3xl p-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-sunset-warm font-serif">{"登录（预留）"}</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {"这里将接入登录/注册流程。当前为预留页面。"}
        </p>
      </div>
    </main>
  )
}

