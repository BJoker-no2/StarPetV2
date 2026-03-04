import { NextResponse } from "next/server"

import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    return NextResponse.json({ user: null, error: error.message }, { status: 200 })
  }

  return NextResponse.json({ user: data.user })
}
