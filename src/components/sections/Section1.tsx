'use client'
import { motion } from 'framer-motion'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay },
})

export function Section1() {
  return (
    <section className="min-h-screen flex items-center px-8 lg:px-16 pt-16">
      <div className="max-w-xl w-full">
        <motion.span
          className="inline-block text-[#EF9F27] font-mono text-xs tracking-[0.2em] uppercase mb-5"
          {...fadeUp(0)}
        >
          Runtime Security for AI Agents
        </motion.span>

        <motion.h1
          className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.1] mb-6"
          {...fadeUp(0.1)}
        >
          Your AI agents are running unsupervised.
        </motion.h1>

        <motion.p
          className="text-xl text-gray-500 leading-relaxed mb-10"
          {...fadeUp(0.2)}
        >
          Some are already compromised.
        </motion.p>

        <motion.div className="flex flex-wrap gap-4" {...fadeUp(0.3)}>
          <button className="px-7 py-3.5 bg-[#4a3fad] hover:bg-[#5a4fbd] text-white font-medium rounded-lg transition-all shadow-[0_0_30px_rgba(74,63,173,0.4)] hover:shadow-[0_0_40px_rgba(74,63,173,0.6)]">
            Request a Demo
          </button>
          <button className="px-7 py-3.5 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-medium rounded-lg transition-colors">
            See How It Works
          </button>
        </motion.div>
      </div>
    </section>
  )
}
