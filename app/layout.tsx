import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: '萌宠星球 - 在平行宇宙，再次遇见TA',
  description: '上传一张照片，让思念跨越次元。萌宠星球用 AI 技术为你的毛孩子绘制二次元形象，让它在平行世界里闪闪发光。',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1207',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      {/* Avoid build-time network dependency on Google Fonts; use CSS font stacks instead. */}
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
