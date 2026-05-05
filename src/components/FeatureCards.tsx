'use client'
import { useEffect, useRef } from 'react'

const cards = [
  {
    icon: '⚙️',
    title: 'Kernel-level enforcement',
    desc: 'seccomp-bpf and Tetragon eBPF intercept every syscall. Blocking latency measured in microseconds — not milliseconds.',
  },
  {
    icon: '🔌',
    title: 'Zero code change',
    desc: 'Wraps LangGraph, CrewAI, and LangChain with a single CLI command. No SDK imports, no decorators, no refactoring.',
  },
  {
    icon: '🤖',
    title: 'AI detection engine',
    desc: 'Claude Haiku triages suspicious events in real time. OS-layer telemetry correlated with agent reasoning layer for zero false positives.',
  },
  {
    icon: '📄',
    title: 'Signed session report',
    desc: 'Every session produces a tamper-evident PDF mapped to OWASP ASI categories. One-click export for SOC2 and legal review.',
  },
]

export function FeatureCards() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).style.opacity = '1'
            ;(entry.target as HTMLElement).style.transform = 'translateY(0)'
          }
        })
      },
      { threshold: 0.1 }
    )
    refs.current.forEach((el) => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" className="py-24 px-6 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#EF9F27] font-mono text-xs tracking-[0.2em] uppercase">
            How it works
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3">
            Enterprise-grade protection. Zero complexity.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <div
              key={card.title}
              ref={(el) => { refs.current[i] = el }}
              className="p-7 rounded-2xl transition-all duration-700"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderLeft: '3px solid #4a3fad',
                backdropFilter: 'blur(12px)',
                opacity: 0,
                transform: 'translateY(24px)',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div className="text-3xl mb-4">{card.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{card.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
