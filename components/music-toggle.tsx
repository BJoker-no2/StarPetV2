"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element with a gentle music box / piano melody
    // Using a placeholder - users can replace with their own audio file
    const audio = new Audio()
    audio.loop = true
    audio.volume = 0.3
    audio.preload = "none"
    audioRef.current = audio
    setIsLoaded(true)

    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      // If no src is set, we use a soft tone generated via Web Audio API
      if (!audioRef.current.src || audioRef.current.src === window.location.href) {
        playGeneratedMusic()
        return
      }
      audioRef.current.play().catch(() => {
        // If real audio fails, fall back to generated
        playGeneratedMusic()
      })
      setIsPlaying(true)
    }
  }

  const audioCtxRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  const playGeneratedMusic = () => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close()
      audioCtxRef.current = null
      setIsPlaying(false)
      return
    }

    const ctx = new AudioContext()
    audioCtxRef.current = ctx
    const gainNode = ctx.createGain()
    gainNode.gain.value = 0.08
    gainNode.connect(ctx.destination)
    gainNodeRef.current = gainNode

    // Simple music box melody - Kaze no Oka (Wind Hill) inspired pentatonic notes
    const notes = [
      523.25, 587.33, 659.25, 783.99, 880.00,
      783.99, 659.25, 587.33, 523.25, 659.25,
      783.99, 880.00, 1046.50, 880.00, 783.99,
      659.25, 523.25, 587.33, 659.25, 523.25,
    ]

    let noteIndex = 0
    const playNote = () => {
      if (!audioCtxRef.current) return
      const osc = ctx.createOscillator()
      const noteGain = ctx.createGain()

      osc.type = "sine"
      osc.frequency.value = notes[noteIndex % notes.length]

      noteGain.gain.setValueAtTime(0, ctx.currentTime)
      noteGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05)
      noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2)

      osc.connect(noteGain)
      noteGain.connect(gainNode)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 1.5)

      noteIndex++
    }

    playNote()
    const interval = setInterval(() => {
      if (!audioCtxRef.current) {
        clearInterval(interval)
        return
      }
      playNote()
    }, 800)

    setIsPlaying(true)

    // Store interval ref for cleanup
    const origClose = ctx.close.bind(ctx)
    ctx.close = async () => {
      clearInterval(interval)
      return origClose()
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close()
      }
    }
  }, [])

  if (!isLoaded) return null

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 glass-warm rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
      aria-label={isPlaying ? "关闭背景音乐" : "开启背景音乐"}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-sunset-gold" />
      ) : (
        <VolumeX className="w-5 h-5 text-sunset-gold/60" />
      )}
    </button>
  )
}
