import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { LiveGallery } from "@/components/live-gallery"
import { QuotesWall } from "@/components/quotes-wall"
import { SiteFooter } from "@/components/site-footer"
import { ShootingStars } from "@/components/shooting-stars"
import { CursorTrail } from "@/components/cursor-trail"
import { MusicToggle } from "@/components/music-toggle"
import { StarField } from "@/components/star-field"
import { TopNav } from "@/components/top-nav"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <TopNav />
      {/* Global effects layer */}
      <StarField />
      <ShootingStars />
      <CursorTrail />
      <MusicToggle />

      {/* Content sections */}
      <HeroSection />
      <HowItWorks />
      <LiveGallery />
      <QuotesWall />
      <SiteFooter />
    </main>
  )
}
