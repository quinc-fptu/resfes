/**
 * Author: Nguyễn Cao Quí (QuiNC)
 * Role: Lead Developer
 * Year: 2025-2026
 * Copyright © 2026 QuiNC. All rights reserved.
 */

'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

export default function BlogPage() {
  const skeletons = Array.from({ length: 4 })

  return (
    <section className="min-h-[100dvh] pt-32 pb-24 bg-[#060e08] text-white">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-12"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-tight">
              Consectetur Adipiscing
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/60 leading-relaxed">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </motion.div>

          {/* Grid Skeleton */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {skeletons.map((_, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-4 animate-pulse"
              >
                <div className="h-6 w-1/3 rounded bg-white/10" />
                <div className="h-8 w-3/4 rounded bg-emerald-400/10" />
                <div className="h-4 w-full rounded bg-white/5" />
                <div className="h-4 w-5/6 rounded bg-white/5" />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
