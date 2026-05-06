import { EvilCursor } from '@/components/EvilCursor'
import { AgentDetectionRing } from '@/components/AgentDetectionRing'
import { Navbar } from '@/components/Navbar'
import { StatusStrip } from '@/components/StatusStrip'
import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { Console } from '@/components/Console'
import { Pricing } from '@/components/Pricing'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      {/* Fixed background overlays */}
      <div className="bg-fx" />
      <div className="bg-scan" />
      <div className="bg-vignette" />

      {/* Evil robot cursor */}
      <EvilCursor />
      <AgentDetectionRing />

      {/* Fixed header chrome */}
      <Navbar />
      <StatusStrip />

      {/* Page content */}
      <main>
        <Hero />
        <Features />
        <Console />
        <Pricing />
        <CTA />
        <Footer />
      </main>
    </>
  )
}
