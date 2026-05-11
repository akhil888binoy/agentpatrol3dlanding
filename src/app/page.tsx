import { EvilCursor } from '@/components/EvilCursor'
import { AgentDetectionRing } from '@/components/AgentDetectionRing'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Problem } from '@/components/Problem'
import { Solution } from '@/components/Solution'
import { HowItWorks } from '@/components/HowItWorks'
import { Features } from '@/components/Features'
import { TechnicalDiff } from '@/components/TechnicalDiff'
import { Demo } from '@/components/Demo'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <EvilCursor />
      <AgentDetectionRing />
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Features />
        <TechnicalDiff />
        <Demo />
        <CTA />
        <Footer />
      </main>
    </>
  )
}
