/**
 * Author: Nguyễn Cao Quí (QuiNC)
 * Role: Lead Developer
 * Year: 2025-2026
 * Copyright © 2026 QuiNC. All rights reserved.
 */

'use client'

import { motion } from 'framer-motion'
import { Play } from '@phosphor-icons/react'
import { fadeUp, staggerContainer } from '@/lib/motion'

export default function RecyclePage() {
  const skeletons = Array.from({ length: 6 })

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
              Lorem Ipsum Dolor
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/60 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </motion.div>

          {/* Grid Skeleton */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skeletons.map((_, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden aspect-video bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col justify-end p-6"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                    <Play size={20} weight="fill" className="text-emerald-400 ml-0.5" />
                  </div>
                </div>
                <div className="relative z-10 flex flex-col gap-2">
                  <div className="h-4 w-1/4 rounded bg-emerald-400/20" />
                  <div className="h-5 w-3/4 rounded bg-white/10" />
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
