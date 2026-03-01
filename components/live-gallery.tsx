"use client"

import { useEffect, useRef, useState } from "react"

const galleryItems = [
  { name: "小黑", power: "魔法师", owner: "一位温柔的主人", color: "from-amber-500/20 to-orange-500/20" },
  { name: "咪咪", power: "天使之翼", owner: "思念永恒的家人", color: "from-rose-500/20 to-pink-500/20" },
  { name: "豆豆", power: "星际领航员", owner: "最好的伙伴", color: "from-yellow-500/20 to-amber-500/20" },
  { name: "旺财", power: "时光守护者", owner: "永远爱你的人", color: "from-orange-500/20 to-red-500/20" },
  { name: "布丁", power: "治愈之光", owner: "想你的每一天", color: "from-amber-400/20 to-yellow-500/20" },
  { name: "团子", power: "梦境编织师", owner: "我们还会再见", color: "from-rose-400/20 to-amber-500/20" },
  { name: "花花", power: "彩虹桥使者", owner: "最温暖的记忆", color: "from-pink-400/20 to-rose-500/20" },
  { name: "球球", power: "星尘收集者", owner: "永远的好朋友", color: "from-yellow-400/20 to-orange-400/20" },
]

function PetCard({ item }: { item: typeof galleryItems[0] }) {
  return (
    <div className="glass-warm rounded-2xl p-6 min-w-[260px] max-w-[260px] flex flex-col gap-3 shrink-0">
      {/* Avatar placeholder */}
      <div className={`w-full aspect-square rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center overflow-hidden`}>
        <div className="text-5xl opacity-60">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="40" cy="52" rx="18" ry="14" fill="rgba(251,191,36,0.4)" />
            <circle cx="28" cy="34" r="7" fill="rgba(251,191,36,0.35)" />
            <circle cx="52" cy="34" r="7" fill="rgba(251,191,36,0.35)" />
            <circle cx="33" cy="24" r="5.5" fill="rgba(251,191,36,0.3)" />
            <circle cx="47" cy="24" r="5.5" fill="rgba(251,191,36,0.3)" />
            <text x="40" y="58" textAnchor="middle" fill="rgba(251,191,36,0.6)" fontSize="14" fontFamily="serif">
              {item.name}
            </text>
          </svg>
        </div>
      </div>

      {/* Info */}
      <div>
        <h4 className="text-lg font-bold text-sunset-warm font-serif">{item.name}</h4>
        <p className="text-sm text-sunset-gold/80 mt-1">
          {"超能力："}{item.power}
        </p>
        <p className="text-xs text-muted-foreground mt-2 italic">
          {"—— "}{item.owner}
        </p>
      </div>
    </div>
  )
}

export function LiveGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className={`text-center mb-16 px-6 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}>
        <h2 className="text-3xl md:text-5xl font-bold text-sunset-warm font-serif text-balance">
          {"实时漫游窗"}
        </h2>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
          {"看看其他主人的毛孩子，在二次元的世界里获得了什么超能力。"}
        </p>
      </div>

      {/* Marquee container */}
      <div className={`relative transition-all duration-1000 delay-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}>
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling row */}
        <div
          className="flex gap-6 px-6"
          style={{
            animation: "marquee 40s linear infinite",
            width: "fit-content",
          }}
        >
          {[...galleryItems, ...galleryItems].map((item, i) => (
            <PetCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
