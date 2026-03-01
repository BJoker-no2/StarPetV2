"use client"

import { useEffect, useRef, useState } from "react"

const quotes = [
  "所有的离别，都是为了在更高维度再次相遇。",
  "它没有离开，它只是换了一种形态去守护你。",
  "每一颗星星，都是一个被思念照亮的灵魂。",
  "爱不会消失，它只是化作了另一种光。",
  "在平行宇宙的某处，它正在等你。",
]

export function QuotesWall() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setIsFading(true)
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length)
        setIsFading(false)
      }, 600)
    }, 5000)
    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 flex items-center justify-center min-h-[60vh]"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-sunset-gold/40"
          style={{ animation: "twinkle 3s ease-in-out infinite" }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-sunset-gold/30"
          style={{ animation: "twinkle 4s ease-in-out infinite 1s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-sunset-gold/25"
          style={{ animation: "twinkle 5s ease-in-out infinite 2s" }}
        />
        <div
          className="absolute top-1/2 left-[10%] w-1 h-1 rounded-full bg-sunset-warm/30"
          style={{ animation: "twinkle 3.5s ease-in-out infinite 0.5s" }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-sunset-warm/20"
          style={{ animation: "twinkle 4.5s ease-in-out infinite 1.5s" }}
        />
      </div>

      <div
        className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Decorative top line */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-sunset-gold/50" />
          <span className="text-sunset-gold/60 text-sm tracking-widest">{"寄语墙"}</span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-sunset-gold/50" />
        </div>

        {/* Quote */}
        <div className="relative min-h-[120px] flex items-center justify-center">
          <p
            className={`text-2xl md:text-4xl lg:text-5xl font-serif text-sunset-warm leading-relaxed text-balance transition-all duration-600 ${
              isFading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
            style={{ transitionDuration: "600ms" }}
          >
            {'"'}{quotes[currentQuote]}{'"'}
          </p>
        </div>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsFading(true)
                setTimeout(() => {
                  setCurrentQuote(i)
                  setIsFading(false)
                }, 300)
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentQuote
                  ? "bg-sunset-gold w-6"
                  : "bg-sunset-gold/30 hover:bg-sunset-gold/50"
              }`}
              aria-label={`切换到第 ${i + 1} 条寄语`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
