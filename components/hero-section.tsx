"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="萌宠星球 - 可爱的猫咪和小狗坐在云端回望"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Warm overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(26,18,7,0.3)] via-[rgba(26,18,7,0.15)] to-[rgba(26,18,7,0.85)]" />
      </div>

      {/* Floating clouds parallax layer */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div
          className="absolute top-[15%] left-[5%] w-40 h-20 rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse, rgba(255,255,255,0.3), transparent)",
            animation: "float-slow 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-[25%] right-[10%] w-56 h-28 rounded-full opacity-15"
          style={{
            background: "radial-gradient(ellipse, rgba(255,255,255,0.25), transparent)",
            animation: "float-slow 12s ease-in-out infinite 2s",
          }}
        />
        <div
          className="absolute bottom-[30%] left-[15%] w-48 h-24 rounded-full opacity-10"
          style={{
            background: "radial-gradient(ellipse, rgba(251,191,36,0.2), transparent)",
            animation: "float 10s ease-in-out infinite 4s",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-sunset-warm leading-tight tracking-tight text-balance font-serif">
            {"在萌宠星球，再次遇见TA。"}
          </h1>
        </div>

        <div
          className={`mt-6 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-lg md:text-xl text-sunset-warm/80 leading-relaxed max-w-2xl text-pretty">
            {"上传一张照片，让思念跨越次元，看它在平行世界里闪闪发光。"}
          </p>
        </div>

        <div
          className={`mt-10 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Link
            href="/lab"
            className="glow-button inline-flex items-center justify-center px-10 py-4 rounded-full bg-sunset-gold text-primary-foreground font-semibold text-lg tracking-wide"
            aria-label="开启重逢之旅，进入转化实验室"
          >
            {"[ 开启重逢之旅 ]"}
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-sunset-warm/50 tracking-widest">{"SCROLL"}</span>
            <div className="w-px h-10 bg-gradient-to-b from-sunset-warm/50 to-transparent relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-full h-3 bg-sunset-gold"
                style={{ animation: "float 2s ease-in-out infinite" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
