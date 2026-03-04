import { NextResponse } from "next/server"

import { createSupabaseServerClient } from "@/lib/supabase/server"

const ALLOWED_PROVIDERS = new Set(["google"] as const)

export async function GET(request: Request) {
  const url = new URL(request.url)
  const provider = url.searchParams.get("provider") ?? "google"
  const next = url.searchParams.get("next") ?? "/"

  if (!ALLOWED_PROVIDERS.has(provider as any)) {
    return NextResponse.json({ error: "Unsupported provider" }, { status: 400 })
  }

  const supabase = await createSupabaseServerClient()
  const origin = url.origin
  const redirectTo = new URL("/auth/callback", origin)
  redirectTo.searchParams.set("next", next)

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectTo.toString(),
      scopes: "openid email profile",
      // Force Google to show a consent/account prompt again after logout.
      // (Google may still keep the user signed in at Google; this is the closest to "re-verify" UX.)
      queryParams: {
        prompt: "consent select_account",
      },
    },
  })

  if (error || !data.url) {
    return NextResponse.json({ error: error?.message ?? "No OAuth URL" }, { status: 500 })
  }

  return NextResponse.redirect(data.url)
}
