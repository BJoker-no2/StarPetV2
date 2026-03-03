import type { Metadata } from "next"

import { LoginScene } from "@/components/login-scene"

export const metadata: Metadata = {
  title: "登录 | 萌宠星球",
  description: "星际港口：开启重逢。",
}

export default function LoginPage() {
  return <LoginScene />
}

