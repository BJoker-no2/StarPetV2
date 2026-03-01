"use client"

import { useEffect, useState, useRef, useCallback } from "react"

interface TrailParticle {
  id: number
  x: number
  y: number
}

export function CursorTrail() {
  const [particles, setParticles] = useState<TrailParticle[]>([])
  const nextId = useRef(0)
  const lastPos = useRef({ x: 0, y: 0 })
  const throttle = useRef(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (throttle.current) return
    throttle.current = true

    const dx = e.clientX - lastPos.current.x
    const dy = e.clientY - lastPos.current.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist > 20) {
      lastPos.current = { x: e.clientX, y: e.clientY }
      const particle: TrailParticle = {
        id: nextId.current++,
        x: e.clientX,
        y: e.clientY,
      }
      setParticles((prev) => [...prev.slice(-8), particle])
    }

    requestAnimationFrame(() => {
      throttle.current = false
    })
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  // Clean up old particles
  useEffect(() => {
    if (particles.length === 0) return
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1))
    }, 500)
    return () => clearTimeout(timer)
  }, [particles])

  return (
    <div className="fixed inset-0 pointer-events-none z-[60]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: p.x - 3,
            top: p.y - 3,
            animation: "trail-fade 0.6s ease-out forwards",
          }}
        >
          <svg width="6" height="6" viewBox="0 0 6 6">
            <circle cx="3" cy="3" r="3" fill="rgba(251,191,36,0.6)" />
          </svg>
        </div>
      ))}
    </div>
  )
}
