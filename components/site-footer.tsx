"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface StarPosition {
  id: number
  x: number
  y: number
}

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [starCount, setStarCount] = useState(3876)
  const [stars, setStars] = useState<StarPosition[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const nextId = useRef(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  const handleLightStar = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setStarCount((prev) => prev + 1)

    // Add a new star at random position
    const newStar: StarPosition = {
      id: nextId.current++,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }
    setStars((prev) => [...prev.slice(-20), newStar])

    setTimeout(() => setIsAnimating(false), 300)
  }, [isAnimating])

  return (
    <footer
      ref={footerRef}
      className="relative py-20 px-6 overflow-hidden"
    >
      {/* Background stars from user clicks */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute w-1.5 h-1.5 rounded-full bg-sunset-gold"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animation: "twinkle 3s ease-in-out infinite",
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div
        className={`max-w-2xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Light a star interaction */}
        <div className="mb-12">
          <button
            onClick={handleLightStar}
            className={`group glass-warm rounded-full px-8 py-4 transition-all duration-300 ${
              isAnimating ? "scale-110" : "scale-100 hover:scale-105"
            }`}
            aria-label="点亮一颗星"
          >
            <span className="flex items-center gap-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className={`transition-all duration-300 ${
                  isAnimating ? "scale-125" : "group-hover:scale-110"
                }`}
              >
                <path
                  d="M10 1l2.5 5.5L18 7.5l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1z"
                  fill="currentColor"
                  className="text-sunset-gold"
                />
              </svg>
              <span className="text-sunset-warm font-medium">{"点亮一颗星"}</span>
            </span>
          </button>

          <p className="mt-4 text-sm text-muted-foreground">
            {"目前已有 "}
            <span className="text-sunset-gold font-semibold tabular-nums">
              {starCount.toLocaleString()}
            </span>
            {" 位主人点亮了思念"}
          </p>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-sunset-gold/30 to-transparent mx-auto mb-8" />

        {/* Footer info */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-sunset-warm/80 font-serif text-lg">{"萌宠星球"}</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {"在平行宇宙，每一份思念都会化作永恒的星光。"}
          </p>
          <p className="text-xs text-muted-foreground/60">
            {"Copyright "}{new Date().getFullYear()}{" MengChong Planet. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  )
}
