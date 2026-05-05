'use client'
import { motion } from 'framer-motion'

const problems = [
  {
    title: 'Agents exfiltrate data silently',
    description:
      'Your LangGraph pipeline reads customer PII, writes it to an external API, and you have no log, no alert, no trace.',
  },
  {
    title: 'Prompt injection goes undetected',
    description:
      'A poisoned web page hijacks your browsing agent mid-task. It executes shell commands with the same permissions as your production server.',
  },
  {
    title: 'No audit trail for compliance',
    description:
      'When your AI agent takes a destructive action, you have no signed record of what it did, when, or why. Legal and security teams are flying blind.',
  },
]

export function Section2() {
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
          The Problem
        </motion.span>

        <motion.h2
          className="text-3xl lg:text-4xl font-bold text-white mb-10 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Zero visibility into what your agents actually do.
        </motion.h2>

        <div className="flex flex-col gap-4">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              className="p-5 rounded-xl bg-white/3 border border-white/8 border-l-[3px] border-l-red-500"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <h3 className="text-white font-semibold mb-1.5">{p.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
