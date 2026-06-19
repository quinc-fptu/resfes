/**
 * Author: Nguyễn Cao Quí (QuiNC)
 * Role: Lead Developer
 * Year: 2025-2026
 * Copyright © 2026 QuiNC. All rights reserved.
 */

'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

export default function AboutPage() {
  const members = Array.from({ length: 4 })

  return (
    <section className="min-h-[100dvh] pt-32 pb-24 bg-[#060e08] text-white">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-16"
        >
          {/* Hero Quote */}
          <motion.div variants={fadeUp} className="max-w-4xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-tight">
              &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.&rdquo;
            </h1>
          </motion.div>

          {/* Team Section */}
          <div className="flex flex-col gap-8">
            <motion.h2 variants={fadeUp} className="text-xl font-bold uppercase tracking-widest text-emerald-400 font-mono">
              Lorem Ipsum
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {members.map((_, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center gap-4 text-center group hover:border-white/10 transition-colors duration-300"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl font-bold font-mono">
                    L{idx + 1}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-bold text-white text-sm">Lorem Ipsum</div>
                    <div className="text-xs text-white/50">Dolor Sit</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
