"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"

import { Github } from "lucide-react"

import { cn } from "@/lib/utils"
import { StarField } from "@/components/star-field"
import { ShootingStars } from "@/components/shooting-stars"
import { CursorTrail } from "@/components/cursor-trail"
import { MusicToggle } from "@/components/music-toggle"

type Mode = "login" | "register"

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.2 12.27c0-.82-.07-1.6-.2-2.36H12v4.46h6.3a5.4 5.4 0 0 1-2.34 3.54v2.93h3.8c2.23-2.06 3.44-5.08 3.44-8.57Z"
        fill="rgba(255,250,235,0.85)"
      />
      <path
        d="M12 24c3.23 0 5.94-1.07 7.92-2.9l-3.8-2.93c-1.05.7-2.4 1.12-4.12 1.12-3.12 0-5.76-2.11-6.7-4.94H1.37v3.03A12 12 0 0 0 12 24Z"
        fill="rgba(251,191,36,0.85)"
      />
      <path
        d="M5.3 13.45a7.2 7.2 0 0 1 0-4.9V5.52H1.37a12 12 0 0 0 0 10.95l3.93-3.02Z"
        fill="rgba(251,146,60,0.70)"
      />
      <path
        d="M12 4.76c1.76 0 3.33.6 4.57 1.79l3.43-3.43C17.94 1.07 15.23 0 12 0A12 12 0 0 0 1.37 5.52l3.93 3.03C6.24 5.71 8.88 4.76 12 4.76Z"
        fill="rgba(255,250,235,0.65)"
      />
    </svg>
  )
}

function EmotionalCanvas() {
  const stars = useMemo(() => {
    const pts = Array.from({ length: 18 }, () => ({
      x: 10 + Math.random() * 80,
      y: 12 + Math.random() * 70,
      r: 0.8 + Math.random() * 1.6,
      d: Math.random() * 2.8,
    }))
    const lines = Array.from({ length: 8 }, () => {
      const a = pts[Math.floor(Math.random() * pts.length)]
      const b = pts[Math.floor(Math.random() * pts.length)]
      return { ax: a.x, ay: a.y, bx: b.x, by: b.y, o: 0.08 + Math.random() * 0.12 }
    })
    return { pts, lines }
  }, [])

  return (
    <div className="relative rounded-3xl overflow-hidden min-h-[560px] lg:min-h-[640px] login-canvas">
      {/* Constellations */}
      <svg className="absolute inset-0 w-full h-full login-constellations" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
        {stars.lines.map((l, i) => (
          <line
            key={`l-${i}`}
            x1={l.ax}
            y1={l.ay}
            x2={l.bx}
            y2={l.by}
            stroke="rgba(255,250,235,0.35)"
            strokeWidth="0.12"
            opacity={l.o}
          />
        ))}
        {stars.pts.map((p, i) => (
          <circle
            key={`p-${i}`}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill="rgba(251,191,36,0.8)"
            className="login-star"
            style={{ animationDelay: `${p.d}s` }}
          />
        ))}
      </svg>

      <div className="relative z-[1] h-full px-10 py-12 flex flex-col justify-center">
        <p className="login-canvas__title">{"在星光下再次遇见 TA"}</p>

        <div className="mt-10 relative">
          <div className="canvas-ring" aria-hidden="true" />
          <div className="canvas-ring canvas-ring--inner" aria-hidden="true" />

          <div className="relative mx-auto w-[420px] max-w-full aspect-square">
            {/* Keep the portal "ritual" feeling without forcing a specific illustration asset. */}
            <div className="absolute inset-0 rounded-full login-portal-core" aria-hidden="true" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="portal__sigil opacity-80" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

function InteractionPanel() {
  const [mode, setMode] = useState<Mode>("login")

  return (
    <div className="glass-clean rounded-3xl p-7 sm:p-9 login-panel">
      <p className="text-xs tracking-[0.35em] uppercase text-sunset-gold/70">{"Interstellar Port"}</p>
      <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-sunset-warm font-serif">{"星际港口：开启重逢"}</h1>

      <div className="mt-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 w-fit">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={cn("px-5 py-2 rounded-full text-sm transition-all", mode === "login" ? "login-tab--active" : "text-muted-foreground hover:text-sunset-warm")}
          aria-pressed={mode === "login"}
        >
          {"登录"}
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={cn("px-5 py-2 rounded-full text-sm transition-all", mode === "register" ? "login-tab--active" : "text-muted-foreground hover:text-sunset-warm")}
          aria-pressed={mode === "register"}
        >
          {"注册"}
        </button>
      </div>

      <form className="mt-7 space-y-4">
        {mode === "register" && (
          <div>
            <label className="block text-xs text-muted-foreground mb-2">{"昵称"}</label>
            <input
              className="login-input"
              placeholder="给自己取一个星际代号"
              autoComplete="nickname"
            />
          </div>
        )}

        <div>
          <label className="block text-xs text-muted-foreground mb-2">{"邮箱"}</label>
          <input
            className="login-input"
            placeholder="you@example.com"
            type="email"
            autoComplete="email"
          />
          <p className="mt-2 text-xs text-muted-foreground/80">
            {"支持魔术链接登录：发送邮件，无密码直接步入网站。"}
          </p>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-2">{"密码（可选）"}</label>
          <input
            className="login-input"
            placeholder="如果你想用密码，也可以"
            type="password"
            autoComplete={mode === "register" ? "new-password" : "current-password"}
          />
        </div>

        <button type="button" className="login-cta">
          {"步入星辰"}
        </button>

        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-muted-foreground">{"或使用第三方登录"}</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button type="button" className="login-social" aria-label="使用 Google 登录">
            <GoogleMark className="w-5 h-5" />
            <span className="text-sm text-sunset-warm/90">{"Google"}</span>
          </button>
          <button type="button" className="login-social" aria-label="使用 GitHub 登录">
            <Github className="w-5 h-5 text-sunset-warm/90" />
            <span className="text-sm text-sunset-warm/90">{"GitHub"}</span>
          </button>
        </div>

        <div className="mt-7 flex items-center justify-between text-xs">
          <Link href="#" className="text-muted-foreground hover:text-sunset-warm transition-colors">
            {"忘记密码？"}
          </Link>
          <button
            type="button"
            className="text-muted-foreground hover:text-sunset-warm transition-colors"
            onClick={() => setMode("register")}
          >
            {"第一次来？"}
            <span className="ml-1 text-sunset-gold/90">{"立即建立羁绊"}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export function LoginScene() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background: match Transformation Lab (sunset clouds + subtle center halo) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="日落云端背景"
          fill
          className="object-cover opacity-55 blur-[1px]"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(26,18,7,0.35)] via-[rgba(26,18,7,0.55)] to-[rgba(26,18,7,0.92)]" />
        <div className="lab-halo" aria-hidden="true" />
      </div>

      {/* Atmospheric layers */}
      <StarField />
      <ShootingStars />
      <CursorTrail />
      <MusicToggle />

      <section className="relative z-[2] px-6 min-h-screen flex items-center py-10 sm:py-14">
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <EmotionalCanvas />
          </div>
          <div className="lg:col-span-5 flex items-center">
            <InteractionPanel />
          </div>
        </div>
      </section>
    </main>
  )
}
