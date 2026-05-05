'use client'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'Kernel-level syscall interception',
    desc: 'Every file read, network call, and process spawn is captured via eBPF before it leaves the kernel.',
  },
  {
    title: 'AI triage layer',
    desc: 'Claude Haiku correlates OS-layer events with agent intent in real time to distinguish normal from malicious.',
  },
  {
    title: 'Policy enforcement',
    desc: 'Define allow/deny rules per agent. Block exfiltration, limit network scope, sandbox filesystem access.',
  },
  {
    title: 'Tamper-evident session reports',
    desc: 'Every agent session produces a signed PDF mapped to OWASP ASI categories. Audit-ready out of the box.',
  },
  {
    title: 'Zero framework lock-in',
    desc: 'Works with LangGraph, CrewAI, LangChain, AutoGPT, or any Python process. No SDK changes required.',
  },
]

export function Section3() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 lg:px-24 py-24">
      <div className="max-w-2xl w-full">
        <motion.span
          className="inline-block text-[#EF9F27] font-mono text-xs tracking-[0.2em] uppercase mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Solution
        </motion.span>

        <motion.h2
          className="text-3xl lg:text-4xl font-bold text-white mb-10 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          AgentPatrol wraps any agent at the kernel level.
        </motion.h2>

        <div className="flex flex-col gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="flex gap-4 items-start"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.09 }}
            >
              <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#EF9F27]/20 flex items-center justify-center">
                <svg className="w-3 h-3 text-[#EF9F27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <div>
                <span className="text-white font-medium">{f.title}</span>
                <span className="text-white/50 text-sm"> — {f.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
