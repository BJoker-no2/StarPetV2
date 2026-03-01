"use client"

import { useEffect, useState, useRef } from "react"

interface ShootingStar {
  id: number
  x: number
  y: number
  duration: number
  delay: number
  side: "left" | "right"
  length: number
}

export function ShootingStars() {
  const [stars, setStars] = useState<ShootingStar[]>([])
  const nextId = useRef(0)

  useEffect(() => {
    const createStar = () => {
      const side = Math.random() > 0.5 ? "left" : "right"
      const star: ShootingStar = {
        id: nextId.current++,
        x: side === "left" ? Math.random() * 15 : 85 + Math.random() * 15,
        y: Math.random() * 60,
        duration: 1.5 + Math.random() * 1.5,
        delay: 0,
        side,
        length: 60 + Math.random() * 80,
      }

      setStars((prev) => [...prev.slice(-6), star])
    }

    // Create shooting stars at random intervals
    const scheduleNext = () => {
      const timeout = 2000 + Math.random() * 5000
      return setTimeout(() => {
        createStar()
        timerId = scheduleNext()
      }, timeout)
    }

    let timerId = scheduleNext()
    return () => clearTimeout(timerId)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animation: `shooting-star ${star.duration}s ease-out forwards`,
            animationDelay: `${star.delay}s`,
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: `${star.length}px`,
              height: "1.5px",
              background: `linear-gradient(90deg, rgba(251,191,36,0.8), rgba(251,191,36,0.3), transparent)`,
              transform: star.side === "right" ? "scaleX(-1)" : undefined,
            }}
          />
        </div>
      ))}
    </div>
  )
}
