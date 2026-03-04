import { cookies } from "next/headers"

import { createServerClient } from "@supabase/ssr"

function requiredEnv(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env: ${name}`)
  return v
}

export async function createSupabaseServerClient() {
  // Next.js 16+ dynamic APIs are async.
  const cookieStore = await cookies()

  return createServerClient(
    requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options)
            }
          } catch {
            // Server Components can't set cookies; Route Handlers can.
          }
        },
      },
    },
  )
}
