/**
 * Author: Nguyễn Cao Quí (QuiNC)
 * Role: Lead Developer
 * Year: 2025-2026
 * Copyright © 2026 QuiNC. All rights reserved.
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X, Leaf } from '@phosphor-icons/react'
import { useSmoothCorners } from '@lisse/react'

const NAV_LINKS = [
  { href: '/', label: 'Trang chủ' },
  { href: '/recycle', label: 'Tái chế' },
  { href: '/blog', label: 'Bài viết' },
  { href: '/about', label: 'Về chúng tôi' }
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useSmoothCorners(
    navRef,
    {
      topLeft: 0,
      topRight: 0,
      bottomLeft: { radius: menuOpen ? 16 : 24, smoothing: 0.6 },
      bottomRight: { radius: menuOpen ? 16 : 24, smoothing: 0.6 }
    },
    {
      wrapperRef,
      effects: {
        innerBorder: {
          width: 1,
          color: '#ffffff',
          opacity: menuOpen ? 0.15 : 0.10
        },
        shadow: {
          offsetX: 0,
          offsetY: 12,
          blur: 32,
          spread: 0,
          color: '#000000',
          opacity: 0.5
        }
      }
    }
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-start pointer-events-none m-0 p-0">
      <div ref={wrapperRef} className="relative w-full max-w-2xl pointer-events-auto">
        {/* 3px Vertical Border Erasers to hide the navbar border where it meets the wings */}
        <div className="absolute top-0 left-0 w-[3px] h-6 bg-[#060e08] z-30 pointer-events-none hidden md:block" />
        <div className="absolute top-0 right-0 w-[3px] h-6 bg-[#060e08] z-30 pointer-events-none hidden md:block" />

        {/* 3px Top Border Eraser to hide Lisse's top horizontal border */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#060e08] z-30 pointer-events-none hidden md:block" />

        {/* Concave Left Corner Wing SVG (overlapping 1px to prevent sub-pixel gaps) */}
        <div className="absolute top-0 right-[calc(100%-1px)] w-6 h-6 pointer-events-none hidden md:block z-30">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M 24 24 A 24 24 0 0 0 0 0 L 24 0 Z" fill="#060e08" />
            <path d="M 24 24 A 24 24 0 0 0 0 0" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* Concave Right Corner Wing SVG (overlapping 1px to prevent sub-pixel gaps) */}
        <div className="absolute top-0 left-[calc(100%-1px)] w-6 h-6 pointer-events-none hidden md:block z-30">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M 0 24 A 24 24 0 0 1 24 0 L 0 0 Z" fill="#060e08" />
            <path d="M 0 24 A 24 24 0 0 1 24 0" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        <motion.nav
          ref={navRef}
          layout
          className="w-full relative bg-[#060e08] text-white px-8 py-3 rounded-t-none transition-all duration-300"
          style={{
            top: 0
          }}
          aria-label="Điều hướng chính"
        >
        <div className="flex items-center justify-between h-10">
          {/* Logo */}
          <Link
            href="/"
            id="nav-logo"
            className="flex items-center gap-2 text-sm font-bold tracking-tight text-emerald-400 font-display transition-transform duration-200 active:scale-95 no-underline hover:no-underline"
            aria-label="Skylaria — Trang chủ"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
              <Leaf size={14} weight="fill" />
            </div>
            <span className="text-white font-extrabold text-sm tracking-tight">
              Skylaria
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul
            role="list"
            className="hidden md:flex items-center gap-6 list-none"
          >
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`relative text-xs font-semibold transition-colors duration-300 no-underline hover:no-underline ${
                      isActive ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Right Action Button (CTA - Apple/Supaste Style) */}
          <div className="hidden md:flex items-center">
            <Link
              href="/recycle"
              className="inline-flex items-center justify-center px-5 py-2 text-xs font-bold text-[#060e08] bg-white hover:bg-white/90 rounded-lg transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:scale-95 touch-manipulation no-underline hover:no-underline"
              style={{ minHeight: '34px' }}
            >
              Khám phá →
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
            className="flex md:hidden items-center justify-center w-9 h-9 rounded-full text-white hover:bg-white/5 transition-colors duration-200 active:scale-95"
            style={{ minWidth: '36px', minHeight: '36px' }}
          >
            {menuOpen ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>

        {/* Mobile Navigation Content */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden md:hidden mt-3 pt-3 border-t border-white/5"
            >
              <ul role="list" className="flex flex-col gap-1 list-none pb-2">
                {NAV_LINKS.map(({ href, label }) => {
                  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        className={`block px-4 py-2 text-xs font-bold rounded-lg transition-all no-underline hover:no-underline ${
                          isActive
                            ? 'text-emerald-400 bg-emerald-500/8 border-l-2 border-emerald-400'
                            : 'text-white/80 hover:text-white hover:bg-white/5'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                        style={{ minHeight: '36px' }}
                      >
                        {label}
                      </Link>
                    </li>
                  )
                })}
                <li className="mt-2 pt-2 border-t border-white/5">
                  <Link
                    href="/recycle"
                    className="flex items-center justify-center w-full px-4 py-2 text-xs font-extrabold text-[#060e08] bg-white rounded-lg text-center transition-colors no-underline hover:no-underline"
                    style={{ minHeight: '36px' }}
                  >
                    Khám phá ngay
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      </div>
    </header>
  )
}
