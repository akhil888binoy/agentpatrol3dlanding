'use client'
import { motion } from 'framer-motion'

export function Section4() {
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
          One Command
        </motion.span>

        <motion.div
          className="rounded-xl bg-[#0d0b1a] border border-white/8 p-6 mb-8 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex gap-1.5 mb-4">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <pre className="font-mono text-[#EF9F27] text-lg whitespace-pre">
            <span className="text-white/40">$ </span>
            agentpatrol run python agent.py
          </pre>
        </motion.div>

        <motion.h2
          className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          90 seconds. Zero code changes. Full enforcement.
        </motion.h2>

        <motion.div
          className="grid grid-cols-3 gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {['Install', 'Wrap', 'Monitor'].map((step, i) => (
            <div key={step} className="text-center p-4 rounded-lg bg-white/3 border border-white/8">
              <div className="text-2xl font-bold text-[#EF9F27] mb-1">{i + 1}</div>
              <div className="text-white/60 text-sm font-medium">{step}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
