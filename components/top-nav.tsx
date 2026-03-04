"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import type { User } from "@supabase/supabase-js"
import { LogOut } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { href: "/", label: "首页" },
  { href: "/lab", label: "转化实验室" },
  { href: "/pet-card", label: "宠物名片" },
  { href: "/square", label: "漫游广场" },
  { href: "/memorial", label: "个人纪念馆" },
] as const

function getUserAvatarUrl(user: User): string | null {
  const md = (user.user_metadata ?? {}) as Record<string, unknown>
  const url =
    (typeof md.avatar_url === "string" && md.avatar_url) ||
    (typeof md.picture === "string" && md.picture) ||
    null
  return url
}

function getUserDisplayName(user: User): string {
  const md = (user.user_metadata ?? {}) as Record<string, unknown>
  const name =
    (typeof md.full_name === "string" && md.full_name) ||
    (typeof md.name === "string" && md.name) ||
    ""

  if (name.trim()) return name.trim()
  if (user.email) return user.email.split("@")[0] ?? "User"
  return "User"
}

function UserMenu({ user }: { user: User }) {
  const displayName = useMemo(() => getUserDisplayName(user), [user])
  const email = user.email ?? ""
  const avatarUrl = useMemo(() => getUserAvatarUrl(user), [user])

  async function logout() {
    await fetch("/auth/logout", { method: "POST" })
    // Ensure UI resets even if other pages/components cache.
    window.location.href = "/"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-sunset-gold/40"
          aria-label="用户菜单"
        >
          <Avatar className="size-9 border border-white/10">
            {avatarUrl ? <AvatarImage src={avatarUrl} alt={displayName} /> : null}
            <AvatarFallback className="bg-white/5 text-sunset-warm/90 text-sm">
              {displayName.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="text-sm text-sunset-warm/90">{displayName}</span>
            {email ? (
              <span className="text-xs text-muted-foreground">{email}</span>
            ) : null}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onSelect={(e) => {
            e.preventDefault()
            void logout()
          }}
        >
          <LogOut className="size-4" />
          {"登出"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function TopNav() {
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch("/auth/me", { cache: "no-store" })
        const json = (await res.json()) as { user: User | null }
        if (!cancelled) setUser(json.user ?? null)
      } catch {
        // Ignore; keep as logged-out.
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    // Fixed overlay: avoid creating a solid "bar" behind the pill.
    <header className="fixed top-4 left-0 right-0 z-[90] px-4 sm:px-6 pointer-events-none">
      <div className="mx-auto max-w-6xl glass-clean rounded-full border border-white/10 backdrop-blur-xl pointer-events-auto">
        <div className="h-12 sm:h-14 px-3 sm:px-4 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="shrink-0 px-3 py-2 rounded-full text-sm font-semibold text-sunset-warm/90 hover:text-sunset-warm transition-colors"
            aria-label="返回首页"
          >
            {"萌宠星球"}
          </Link>

          <nav className="hidden md:flex items-center justify-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm transition-all",
                    active
                      ? "bg-[rgba(251,191,36,0.12)] text-sunset-warm border border-sunset-gold/25 shadow-[0_0_30px_rgba(251,191,36,0.10)]"
                      : "text-muted-foreground hover:text-sunset-warm hover:bg-white/5",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <UserMenu user={user} />
            ) : (
              <Link
                href="/login"
                className="glow-button inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-sunset-gold text-primary-foreground font-semibold text-sm"
              >
                {"登录"}
              </Link>
            )}
          </div>
        </div>

        {/* Mobile nav (simple horizontal scroll) */}
        <div className="md:hidden px-3 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap px-4 py-2 rounded-full text-sm transition-all border",
                    active
                      ? "bg-[rgba(251,191,36,0.12)] text-sunset-warm border-sunset-gold/25"
                      : "bg-white/0 text-muted-foreground border-white/10 hover:text-sunset-warm hover:bg-white/5",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  )
}
