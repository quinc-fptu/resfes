'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Recycle } from '@phosphor-icons/react'
import { fadeUp, staggerContainer } from '@/lib/motion'

export default function HeroSection() {
  return (
    <section
      aria-label="Giới thiệu dự án Skylaria"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden py-24 md:py-32 bg-[#060e08]"
    >
      {/* Immersive Glowing Background Blobs */}
      <div
        aria-hidden="true"
        className="absolute top-[-10%] right-[-10%] w-[clamp(450px,60vw,900px)] aspect-square rounded-full bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.04)_0%,transparent_60%)] pointer-events-none blur-[40px] animate-pulse [animation-duration:8s]"
      />

      {/* Decorative Grid Mesh */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
          
          {/* Left: Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-8 text-left"
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-display tracking-tight leading-[1.08] text-white"
            >
              Lorem ipsum{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                  dolor sit
                </span>
                <span className="absolute bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500/50 to-teal-500/0 rounded-full" />
              </span>
              {' '}—{' '}
              <br className="hidden md:inline" />
              consectetur elit.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-white/70 leading-relaxed max-w-[55ch]"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-4 mt-2"
            >
              <Link
                href="/recycle"
                id="hero-cta-primary"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm md:text-base rounded-full shadow-lg shadow-emerald-950/40 border border-emerald-400/20 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-95 touch-manipulation group min-h-[44px]"
              >
                Lorem Ipsum Dolor
                <ArrowRight size={18} weight="bold" className="group-hover:translate-x-1 transition-transform duration-250" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Eco-Rings & Nested Orbits */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            className="flex justify-center items-center relative"
          >
            <div className="relative w-[300px] md:w-[400px] aspect-square flex items-center justify-center">
              
              {/* Outer Orbit (Dashed, slow clockwise spin) */}
              <div className="absolute inset-0 rounded-full border border-dashed border-emerald-500/15 animate-[spin_40s_linear_infinite] pointer-events-none" />
              
              {/* Middle Orbit (Dashed, faster counter-clockwise spin) */}
              <div className="absolute inset-[10%] rounded-full border border-dashed border-emerald-400/20 animate-[spin_25s_linear_infinite_reverse] pointer-events-none" />

              {/* Glowing Particle Accents on Orbits */}
              <div className="absolute top-[8%] left-[50%] -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-400 blur-[1px] animate-pulse" />
              <div className="absolute bottom-[20%] right-[10%] w-1.5 h-1.5 rounded-full bg-teal-400 blur-[1px] animate-pulse [animation-delay:1.5s]" />
              <div className="absolute top-[30%] left-[5%] w-1.5 h-1.5 rounded-full bg-emerald-300 blur-[1px] animate-pulse [animation-delay:3s]" />

              {/* Central Glassmorphic Core */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="relative w-[50%] h-[50%] rounded-full bg-white/[0.02] border border-white/10 shadow-[0_0_30px_rgba(16,185,129,0.05)] flex flex-col items-center justify-center gap-3 backdrop-blur-md z-10"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none" />
                <Recycle
                  size={44}
                  weight="light"
                  className="text-emerald-400 animate-[spin_30s_linear_infinite]"
                />
                <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-emerald-300 font-bold">
                  SKYLARIA
                </span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
