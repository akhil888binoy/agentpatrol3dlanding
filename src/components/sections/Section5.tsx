'use client'
import { motion } from 'framer-motion'

export function Section5() {
  return (
    <section className="min-h-screen flex items-center px-8 lg:px-16">
      <div className="max-w-xl w-full">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Your agents are running right now.
        </motion.h2>

        <motion.p
          className="text-xl text-gray-500 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Do you know what they are doing?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button className="px-10 py-4 bg-[#4a3fad] hover:bg-[#5a4fbd] text-white text-lg font-semibold rounded-xl transition-all shadow-[0_0_40px_rgba(74,63,173,0.4)] hover:shadow-[0_0_60px_rgba(74,63,173,0.6)] hover:-translate-y-0.5">
            Request Early Access
          </button>
          <p className="text-gray-400 text-sm mt-4">3 design partner slots remaining</p>
        </motion.div>
      </div>
    </section>
  )
}
