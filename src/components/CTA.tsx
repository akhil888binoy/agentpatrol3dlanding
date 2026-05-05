'use client'

export function CTA() {
  return (
    <section className="py-32 px-6 lg:px-16 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(74,63,173,0.25) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <span className="inline-block text-[#EF9F27] font-mono text-xs tracking-[0.2em] uppercase mb-6">
          Get Started
        </span>

        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Stop flying blind.
          <br />
          <span className="text-white/50">Start patrolling.</span>
        </h2>

        <p className="text-white/50 text-lg mb-10">
          AgentPatrol gives your AI agents a kernel-level conscience. Deploy in 90 seconds, protect in perpetuity.
        </p>

        <button className="px-10 py-4 bg-[#4a3fad] hover:bg-[#5a4fbd] text-white text-lg font-semibold rounded-xl transition-all shadow-[0_0_50px_rgba(74,63,173,0.6)] hover:shadow-[0_0_70px_rgba(74,63,173,0.9)] hover:-translate-y-0.5 mb-4">
          Request Early Access
        </button>

        <p className="text-white/25 text-sm">3 design partner slots remaining</p>
      </div>
    </section>
  )
}
