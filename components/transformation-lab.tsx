"use client"

import type { CSSProperties } from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { StarField } from "@/components/star-field"
import { ShootingStars } from "@/components/shooting-stars"
import { CursorTrail } from "@/components/cursor-trail"
import { MusicToggle } from "@/components/music-toggle"

type Phase = "idle" | "converting" | "done"

type StyleId = "ghibli" | "shinkai" | "chibi" | "cyber"

const styles: Array<{
  id: StyleId
  title: string
  desc: string
}> = [
  { id: "ghibli", title: "吉卜力风", desc: "温暖、手绘感、大自然的呼吸。" },
  { id: "shinkai", title: "新海诚风", desc: "唯美、明亮的色彩、梦幻的光影。" },
  { id: "chibi", title: "Q版萌系", desc: "大头小身体、极致的可爱的。" },
  { id: "cyber", title: "赛博英雄", desc: "穿上机甲，英姿飒爽。" },
]

const warmPhrases = [
  "正在穿越时空云层…",
  "正在采集TA最爱的阳光色…",
  "正在为TA编织羽翼…",
  "正在把思念压缩成一颗星…",
  "正在校准平行宇宙的回声…",
]

function SilhouetteMark({
  className,
  styleId,
  opacity,
}: {
  className?: string
  styleId: StyleId
  opacity: number
}) {
  return (
    <div
      className={cn("lab-silhouette", `lab-silhouette--${styleId}`, className)}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft halo */}
        <circle cx="100" cy="108" r="70" fill="url(#halo)" opacity="0.6" />
        {/* Pet-ish silhouette (cat/dog hybrid) */}
        <path
          d="M64 86c-6-18 2-36 18-44l7 20c3 8 11 13 19 13s16-5 19-13l7-20c16 8 24 26 18 44-3 9-2 18 1 26 6 17 1 38-14 50-9 7-20 10-31 10s-22-3-31-10c-15-12-20-33-14-50 3-8 4-17 1-26Z"
          fill="rgba(12,10,9,0.45)"
          stroke="rgba(251,191,36,0.45)"
          strokeWidth="2.2"
        />
        <path
          d="M78 120c8 10 16 15 22 15s14-5 22-15"
          stroke="rgba(251,191,36,0.35)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <radialGradient id="halo" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 108) rotate(90) scale(74)">
            <stop stopColor="rgba(251,191,36,0.20)" />
            <stop offset="0.6" stopColor="rgba(251,146,60,0.08)" />
            <stop offset="1" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}

function AnimeAvatarPlaceholder({ styleId }: { styleId: StyleId }) {
  return (
    <div className={cn("lab-anime", `lab-anime--${styleId}`)} aria-hidden="true">
      <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="20" y1="20" x2="200" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(251,191,36,0.20)" />
            <stop offset="0.5" stopColor="rgba(251,146,60,0.12)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.06)" />
          </linearGradient>
          <linearGradient id="ring" x1="0" y1="0" x2="220" y2="220" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(251,191,36,0.85)" />
            <stop offset="0.6" stopColor="rgba(251,146,60,0.55)" />
            <stop offset="1" stopColor="rgba(251,191,36,0.65)" />
          </linearGradient>
        </defs>

        {/* Golden ring */}
        <circle cx="110" cy="110" r="96" stroke="url(#ring)" strokeWidth="2.4" opacity="0.85" />
        <circle cx="110" cy="110" r="86" stroke="rgba(251,191,36,0.18)" strokeWidth="1.6" />

        {/* Inner glass */}
        <circle cx="110" cy="110" r="82" fill="url(#bg)" stroke="rgba(255,255,255,0.10)" />

        {/* Cute chibi-ish face */}
        <path
          d="M68 96c-8-20 2-42 22-52l8 22c3 8 11 14 20 14s17-6 20-14l8-22c20 10 30 32 22 52-4 10-3 21 1 30 7 19 1 42-16 55-10 8-22 12-35 12s-25-4-35-12c-17-13-23-36-16-55 4-9 5-20 1-30Z"
          fill="rgba(12,10,9,0.22)"
          stroke="rgba(255,250,235,0.55)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Eyes */}
        <ellipse cx="92" cy="122" rx="10" ry="12" fill="rgba(255,250,235,0.72)" />
        <ellipse cx="128" cy="122" rx="10" ry="12" fill="rgba(255,250,235,0.72)" />
        <circle cx="92" cy="126" r="4.5" fill="rgba(26,18,7,0.85)" />
        <circle cx="128" cy="126" r="4.5" fill="rgba(26,18,7,0.85)" />
        <circle cx="90" cy="122" r="1.8" fill="rgba(255,255,255,0.95)" />
        <circle cx="126" cy="122" r="1.8" fill="rgba(255,255,255,0.95)" />
        {/* Nose + mouth */}
        <path d="M110 137l-4 3.2 4 3.2 4-3.2-4-3.2Z" fill="rgba(251,191,36,0.65)" />
        <path d="M100 147c4 5 7 7 10 7s6-2 10-7" stroke="rgba(255,250,235,0.55)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function ProgressRing({ progress }: { progress: number }) {
  const r = 46
  const c = 2 * Math.PI * r
  const offset = c * (1 - clamp(progress, 0, 100) / 100)
  return (
    <svg className="lab-progress-ring" viewBox="0 0 100 100" aria-hidden="true">
      <circle
        cx="50"
        cy="50"
        r={r}
        stroke="rgba(251,191,36,0.12)"
        strokeWidth="2.8"
        fill="none"
      />
      <circle
        cx="50"
        cy="50"
        r={r}
        stroke="rgba(251,191,36,0.82)"
        strokeWidth="2.8"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${c} ${c}`}
        strokeDashoffset={offset}
        style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
      />
    </svg>
  )
}

const conversionSteps = [
  "建立链接：定位平行宇宙坐标…",
  "点亮星尘：收集散落的回忆颗粒…",
  "描摹轮廓：把温度写进线条里…",
  "注入灵魂：让它学会在新世界发光…",
  "封存结果：准备开启下一段旅程…",
]

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export function TransformationLab() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [phase, setPhase] = useState<Phase>("idle")
  const [progress, setProgress] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [phrase, setPhrase] = useState(warmPhrases[0])
  const [styleId, setStyleId] = useState<StyleId>("ghibli")
  const [burstKey, setBurstKey] = useState(0)

  const currentStepText = useMemo(() => conversionSteps[stepIndex] ?? conversionSteps[0], [stepIndex])
  // Start gathering from the beginning of the ritual (user request).
  const shouldGather = phase === "converting"

  const particles = useMemo(() => {
    // Particles are positioned relative to the projection center so they can continuously
    // "gather" (animate to 0,0) without needing layout measurements.
    return Array.from({ length: 34 }, (_, i) => ({
      id: i,
      ox: (Math.random() * 2 - 1) * 170,
      oy: (Math.random() * 2 - 1) * 170,
      s: 0.7 + Math.random() * 1.2,
      d: Math.random() * 0.9,
      dur: 2.8 + Math.random() * 1.8,
    }))
  }, [])

  const btnParticles = useMemo(() => {
    // Recompute on each start() to re-trigger the animation with new trajectories.
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: (Math.random() * 2 - 1) * 90,
      y: (Math.random() * 2 - 1) * 90,
      d: Math.random() * 0.28,
      s: 0.8 + Math.random() * 1.2,
    }))
  }, [burstKey])

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  useEffect(() => {
    if (phase !== "converting") return

    // Gentle, ritual-like progress: mostly smooth, with tiny pauses.
    const t0 = Date.now()
    const totalMs = 11500
    const timer = window.setInterval(() => {
      const t = Date.now() - t0
      const p = clamp(Math.round((t / totalMs) * 100), 0, 100)
      setProgress(p)

      // Advance narrative steps across the progress range.
      const idx = clamp(Math.floor((p / 100) * conversionSteps.length), 0, conversionSteps.length - 1)
      setStepIndex(idx)

      if (p >= 100) {
        window.clearInterval(timer)
        setPhase("done")
      }
    }, 120)

    return () => window.clearInterval(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== "converting") return
    const timer = window.setInterval(() => {
      setPhrase(warmPhrases[Math.floor(Math.random() * warmPhrases.length)])
    }, 1500)
    return () => window.clearInterval(timer)
  }, [phase])

  const onPick = () => inputRef.current?.click()

  const onFiles = (files: FileList | null) => {
    setError(null)
    if (!files || files.length === 0) return
    const f = files[0]
    if (!f.type.startsWith("image/")) {
      setError("这份信物似乎不是图片。请上传 JPG/PNG/WebP 等图片文件。")
      return
    }
    setFile(f)
    setPhase("idle")
    setProgress(0)
    setStepIndex(0)
    setPhrase(warmPhrases[0])
  }

  const start = () => {
    setError(null)
    if (!file) {
      setError("请先将照片置于传送阵中央（上传一张图片）。")
      return
    }
    setBurstKey((k) => k + 1)
    setPhase("converting")
    setProgress(0)
    setStepIndex(0)
    setPhrase(warmPhrases[Math.floor(Math.random() * warmPhrases.length)])
  }

  const reset = () => {
    setError(null)
    setPhase("idle")
    setProgress(0)
    setStepIndex(0)
    setPhrase(warmPhrases[0])
  }

  const reSummon = () => {
    // Keep the same "relic" but allow choosing another style + re-run ritual.
    reset()
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Background: sunset clouds + subtle center halo */}
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

      {/* Global effects layer */}
      <StarField />
      <ShootingStars />
      <CursorTrail />
      <MusicToggle />

      <section className="relative z-[2] px-6 pt-10 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-sunset-gold/70">{"Transformation Lab"}</p>
              <h1 className="mt-3 text-3xl md:text-5xl font-bold text-sunset-warm font-serif text-balance">{"转化实验室"}</h1>
            </div>

            <Link
              href="/"
              className="glass-warm rounded-full px-5 py-3 text-sm text-sunset-warm/90 hover:text-sunset-warm transition-colors"
              aria-label="返回首页"
            >
              {"返回首页"}
            </Link>
          </div>

          {/* The Guidance */}
          <div className="mt-10">
            <p className="lab-guidance text-sunset-warm/80">
              {"递交一份信物，开启TA的二次元星际旅行。"}
            </p>
          </div>

          {/* The Core Transformer */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left: Input Field */}
            <div className="glass-clean rounded-3xl p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-base font-semibold text-sunset-warm font-serif">{"信物投放区"}</h2>
                <p className="text-xs text-sunset-gold/70 tracking-widest uppercase">{"Input"}</p>
              </div>

              <div
                className={cn("mt-6 lab-dropzone rounded-2xl overflow-hidden", isDragging && "lab-dropzone--drag")}
                onClick={onPick}
                onDragEnter={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsDragging(true)
                }}
                onDragOver={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsDragging(true)
                }}
                onDragLeave={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsDragging(false)
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsDragging(false)
                  onFiles(e.dataTransfer.files)
                }}
                role="button"
                tabIndex={0}
                aria-label="点击或拖入照片"
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onFiles(e.target.files)}
                />

                <div className="p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {"点击或拖入TA的照片（建议选择正脸或清晰的照片）。"}
                    </p>
                    <div className="lab-dropzone__ripple" aria-hidden="true" />
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
                    <div className="relative aspect-square rounded-xl overflow-hidden border border-sunset-gold/10 bg-[rgba(255,255,255,0.03)]">
                      {previewUrl ? (
                        <>
                          <img
                            src={previewUrl}
                            alt="原始照片预览"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          {phase === "converting" && <div className="lab-scan" aria-hidden="true" />}
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="portal__sigil opacity-70" aria-hidden="true" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-3">
                      <p className="text-sm text-sunset-warm/80">
                        {file ? "信物已就位" : "等待信物"}
                      </p>
                      {file && (
                        <p className="text-xs text-muted-foreground break-all">
                          {file.name}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-3 pt-1">
                        {file && (
                          <button
                            type="button"
                            className={cn(
                              "glass-warm rounded-full px-6 py-3 text-sm text-sunset-warm/90 hover:text-sunset-warm transition-colors",
                              phase === "converting" && "opacity-70 pointer-events-none",
                            )}
                            onClick={(e) => {
                              e.stopPropagation()
                              onPick()
                            }}
                          >
                            {"更换照片"}
                          </button>
                        )}

                        {phase !== "idle" && (
                          <button
                            type="button"
                            className={cn(
                              "rounded-full px-4 py-3 text-sm text-sunset-gold/80 hover:text-sunset-gold transition-colors",
                              phase === "converting" && "opacity-70 pointer-events-none",
                            )}
                            onClick={(e) => {
                              e.stopPropagation()
                              reset()
                            }}
                          >
                            {"重置仪式"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {(phase === "converting" || phase === "done") && (
                  <div className="border-t border-sunset-gold/10 px-6 md:px-7 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs text-muted-foreground">{currentStepText}</p>
                      <p className="text-xs text-sunset-gold/80 tabular-nums">{progress}%</p>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-[rgba(251,191,36,0.10)] overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full bg-gradient-to-r from-sunset-gold/80 via-sunset-orange/70 to-sunset-gold/80 transition-all duration-200",
                          phase === "converting" && "portal__bar",
                        )}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <p className="mt-4 text-sm text-[rgba(251,191,36,0.95)]">
                  {error}
                </p>
              )}
            </div>

            {/* Right: Output Preview */}
            <div className={cn("glass-clean rounded-3xl p-6 md:p-8 overflow-hidden relative", phase === "converting" && "portal--active")}>
              <div className="flex items-center justify-between gap-4 relative z-[1]">
                <h2 className="text-base font-semibold text-sunset-warm font-serif">{"星系投影区"}</h2>
                <p className="text-xs text-sunset-gold/70 tracking-widest uppercase">{"Output"}</p>
              </div>

              <div className="relative mt-6 min-h-[340px] rounded-2xl border border-sunset-gold/10 bg-[rgba(255,255,255,0.02)] overflow-hidden">
                {/* Nebula vortex (always present, becomes background) */}
                <div className="lab-nebula" aria-hidden="true" />
                <div className="lab-nebula__glow" aria-hidden="true" />

                <div className="relative z-[1] h-full p-6 flex items-center justify-center">
                  {!previewUrl ? (
                    <div className="text-center">
                      <div className="lab-ring lab-ring--idle mx-auto" aria-hidden="true" />
                      <p className="mt-5 text-sm text-muted-foreground">
                        {"星云正在缓慢旋转，等待信物抵达。"}
                      </p>
                    </div>
                  ) : (
                    <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px]">
                      <div className={cn("lab-ring", (phase === "converting" || phase === "done") && "lab-ring--active")} aria-hidden="true" />
                      {(phase === "converting" || phase === "done") && (
                        <ProgressRing progress={progress} />
                      )}
                      <div className="lab-projection">
                        {phase !== "done" ? (
                          <>
                            {/* While converting, show a clear silhouette instead of the raw photo. */}
                            <SilhouetteMark
                              styleId={styleId}
                              opacity={phase === "idle" ? 0.25 : clamp(progress / 75, 0.1, 0.95)}
                            />
                            {/* Keep the photo as a very faint "source" layer for realism. */}
                            <img
                              src={previewUrl}
                              alt="星系投影的源照片（淡化）"
                              className={cn(
                                "lab-projection__img",
                                `lab-style--${styleId}`,
                                "opacity-[0.10]",
                                phase === "converting" && "opacity-[0.06]",
                              )}
                            />
                          </>
                        ) : (
                          <div className="lab-reveal">
                            <AnimeAvatarPlaceholder styleId={styleId} />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Aggregation particles */}
                {previewUrl && (
                  <div
                    className={cn(
                      "lab-particles",
                      phase === "converting" && "lab-particles--gather",
                      phase === "done" && "lab-particles--done",
                    )}
                    aria-hidden="true"
                  >
                    {particles.map((p) => (
                      <span
                        key={p.id}
                        className="lab-particle"
                        style={
                          {
                            "--pox": `${p.ox}px`,
                            "--poy": `${p.oy}px`,
                            "--ps": String(p.s),
                            "--pdelay": `${p.d}s`,
                            "--pdur": `${p.dur}s`,
                          } as CSSProperties
                        }
                      />
                    ))}
                  </div>
                )}

                {/* A gentle local meteor streak (adds "跨越次元" cue) */}
                {phase === "converting" && <div className="lab-output-meteor" aria-hidden="true" />}

                <div className="absolute bottom-4 left-0 right-0 z-[1] px-6">
                  {previewUrl ? (
                    <div className="text-center">
                      {(phase === "converting" || phase === "done") && (
                        <div className="mx-auto max-w-[320px] mb-2">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-[11px] text-sunset-gold/70 tabular-nums">{progress}%</span>
                            <span className="text-[11px] text-muted-foreground">{"转化进度"}</span>
                          </div>
                          <div className="mt-2 h-1.5 rounded-full bg-[rgba(251,191,36,0.10)] overflow-hidden">
                            <div
                              className={cn(
                                "h-full rounded-full bg-gradient-to-r from-sunset-gold/80 via-sunset-orange/70 to-sunset-gold/80 transition-all duration-200",
                                phase === "converting" && "portal__bar",
                              )}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {phase === "idle" && "准备就绪：点亮中央按钮，启动转化。"}
                        {phase === "converting" && phrase}
                        {phase === "done" && "跨越完成：它已在新世界里闪闪发光。"}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground text-center">
                      {"上传后，这里会被金色圆环包裹，流星将为它护航。"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Style Selector */}
          <div className="mt-10 glass-clean rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-base font-semibold text-sunset-warm font-serif">{"风格选择器"}</h2>
              <p className="text-xs text-sunset-gold/70 tracking-widest uppercase">{"Style"}</p>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {styles.map((s) => {
                const active = s.id === styleId
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={cn("lab-style-card text-left rounded-2xl p-4 transition-all", active && "lab-style-card--active")}
                    onClick={() => setStyleId(s.id)}
                    aria-pressed={active}
                  >
                    <p className="text-sm font-semibold text-sunset-warm">{s.title}</p>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Center ritual button */}
      <button
        type="button"
        className={cn(
          "lab-ritual-btn",
          !file && "lab-ritual-btn--disabled",
          phase === "converting" && "lab-ritual-btn--active",
          phase === "done" && "lab-ritual-btn--done",
        )}
        onClick={start}
        disabled={!file || phase === "converting"}
        aria-label="开始转化"
      >
        <span className="lab-ritual-btn__core" aria-hidden="true" />
        <span className="lab-btn-particles" aria-hidden="true">
          {btnParticles.map((p) => (
            <span
              key={p.id}
              className={cn("lab-btn-particle", phase === "converting" && "lab-btn-particle--go")}
              style={
                {
                  "--bx": `${p.x}px`,
                  "--by": `${p.y}px`,
                  "--bs": p.s,
                  animationDelay: `${p.d}s`,
                } as CSSProperties
              }
            />
          ))}
        </span>
        <span className="lab-ritual-btn__text">
          {phase === "converting" ? "转化中" : phase === "done" ? "完成" : "转化"}
        </span>
      </button>

      {/* Bottom actions */}
      {phase === "done" && (
        <div className="lab-actions">
          <div className="lab-actions__inner">
            <button
              type="button"
              className="glass-warm rounded-full px-7 py-3 text-sm text-sunset-warm/95 hover:text-sunset-warm transition-colors"
              onClick={reSummon}
            >
              {"[ 重新召唤 ]"}
            </button>
            <Link
              href="/checkin"
              className="glow-button inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold bg-sunset-gold text-primary-foreground"
              aria-label="前往入驻"
            >
              {"[ 前往入驻 ]"}
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
