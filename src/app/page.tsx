import { Navbar } from "@/components/Navbar";
import { Section2 } from "@/components/sections/Section2";
import { Section3 } from "@/components/sections/Section3";
import { Section4 } from "@/components/sections/Section4";
import { FeatureCards } from "@/components/FeatureCards";
import { Pricing } from "@/components/Pricing";
import { CTA } from "@/components/CTA";
import { SceneWrapper as SceneNoSSR } from "@/components/SceneWrapper";

export default function Home() {
  return (
    <main className="bg-[#0a0a0f]">
      <Navbar />

      {/* HERO — full viewport, robot centered as background */}
      <div className="relative w-full h-screen">

        {/* Canvas fills entire hero */}
        <div
          className="absolute inset-0 z-0"
          style={{ background: 'transparent' }}
        >
          <SceneNoSSR />
        </div>

        {/* Radial dark overlay — bright at center, dark at edges for text readability */}
        {/* <div
          className="absolute inset-0 z-5 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,15,0.75) 100%)",
          }}
        /> */}

        {/* Text overlaid on canvas */}
        {/* <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <div className="pointer-events-auto">
            <p className="text-amber-400 font-mono text-sm tracking-widest mb-4 uppercase">
              Runtime Security for AI Agents
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Your AI agents are<br />running unsupervised.
            </h1>
            <p className="text-white/60 text-xl mb-8 max-w-lg mx-auto">
              Some are already compromised.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="bg-[#4a3fad] hover:bg-[#5a4fbd] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-[0_0_30px_rgba(74,63,173,0.5)]">
                Request a Demo
              </button>
              <button className="border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all">
                See How It Works
              </button>
            </div>
          </div>
        </div> */}

        {/* Bottom gradient — fades robot lower body into page background */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-[#0a0a0f] to-transparent z-10" />
      </div>

      {/* SECTIONS BELOW — full width stacked on dark background */}
      <div className="relative z-20 bg-[#0a0a0f]">
        <Section2 />
        <Section3 />
        <Section4 />
        <FeatureCards />
        <Pricing />
        <CTA />
      </div>
    </main>
  );
}
