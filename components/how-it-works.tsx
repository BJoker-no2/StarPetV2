"use client"

import { useEffect, useRef, useState } from "react"
import { Upload, Sparkles, Star } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "递交信物",
    description: "上传一张心爱的照片",
    detail: "选择一张最珍贵的照片，它将成为连接两个世界的钥匙。",
  },
  {
    icon: Sparkles,
    title: "时空转换",
    description: "AI 正在为你绘制二次元形象",
    detail: "我们的 AI 将赋予它全新的二次元生命，让它在新世界里绽放光芒。",
  },
  {
    icon: Star,
    title: "星系入驻",
    description: "留下它的名字与超能力",
    detail: "为它取一个闪亮的名字，赋予它独一无二的超能力吧。",
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleItems((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.3 }
    )

    const items = sectionRef.current?.querySelectorAll("[data-index]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6"
    >
      {/* Section heading */}
      <div className="text-center mb-20 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-sunset-warm font-serif text-balance">
          {"如何开始？"}
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {"只需三步，即可让思念化为可见的温暖。"}
        </p>
      </div>

      {/* Steps */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isVisible = visibleItems.has(index)
          return (
            <div
              key={index}
              data-index={index}
              className={`relative flex flex-col items-center text-center transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-sunset-gold/40 to-sunset-gold/10" />
              )}

              {/* Icon container */}
              <div className="glass-warm rounded-2xl w-24 h-24 flex items-center justify-center mb-6">
                <Icon className="w-10 h-10 text-sunset-gold" strokeWidth={1.5} />
              </div>

              {/* Step number */}
              <span className="text-xs text-sunset-gold/60 tracking-widest uppercase mb-2">
                {"Step "}{index + 1}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold text-sunset-warm mb-2 font-serif">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-sunset-warm/70 mb-3 font-medium">
                {step.description}
              </p>

              {/* Detail */}
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {step.detail}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
