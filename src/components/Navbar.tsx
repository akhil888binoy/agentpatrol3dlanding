'use client'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-12 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/[0.06]">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#EF9F27] shadow-[0_0_8px_#EF9F27]" />
        <span className="font-['Orbitron'] text-white font-semibold tracking-tight text-lg">
          AgentPatrol
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-white/60 hover:text-white transition-colors text-sm">
          Features
        </a>
        <a href="#pricing" className="text-white/60 hover:text-white transition-colors text-sm">
          Pricing
        </a>
        <a href="#docs" className="text-white/60 hover:text-white transition-colors text-sm">
          Docs
        </a>
      </div>
    </nav>
  )
}
