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
      <div ref={wrapperRef} className="relative w-full max-w-xl pointer-events-auto">
        {/* Concave Left Corner Wing SVG (overlapping 1px to prevent sub-pixel gaps) */}
        <div className="absolute top-0 right-[calc(100%-1px)] w-6 h-6 pointer-events-none hidden md:block z-30">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M 0 0 L 24 0 L 24 24 A 24 24 0 0 0 0 0 Z" fill="#0d1c11" />
          </svg>
        </div>

        {/* Concave Right Corner Wing SVG (overlapping 1px to prevent sub-pixel gaps) */}
        <div className="absolute top-0 left-[calc(100%-1px)] w-6 h-6 pointer-events-none hidden md:block z-30">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M 24 0 L 0 0 L 0 24 A 24 24 0 0 1 24 0 Z" fill="#0d1c11" />
          </svg>
        </div>

        <nav
          ref={navRef}
          className="w-full relative bg-[#0d1c11] text-white px-6 py-2 rounded-t-none rounded-bl-[24px] rounded-br-[24px]"
          aria-label="Điều hướng chính"
        >
        <div className="flex items-center justify-center h-9 relative">
          {/* Logo */}
          <Link
            href="/"
            id="nav-logo"
            className="absolute left-6 flex items-center gap-2 text-sm font-bold tracking-tight text-emerald-400 font-display transition-transform duration-200 active:scale-95 no-underline hover:no-underline"
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


          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen ? 'true' : 'false'}
            aria-controls={menuOpen ? 'mobile-menu' : undefined}
            aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
            className="absolute right-6 flex md:hidden items-center justify-center w-8 h-8 rounded-full text-white hover:bg-white/5 transition-colors duration-200 active:scale-95 min-w-[32px] min-h-[32px]"
          >
            {menuOpen ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>

        {/* Mobile Navigation Content */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden mt-3 pt-3 border-t border-white/5"
          >
            <ul role="list" className="flex flex-col gap-1 list-none pb-2">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`block px-4 py-2 text-xs font-bold rounded-lg transition-all no-underline hover:no-underline min-h-[36px] ${
                        isActive
                          ? 'text-emerald-400 bg-emerald-500/8 border-l-2 border-emerald-400'
                          : 'text-white/80 hover:text-white hover:bg-white/5'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                )
              })}

            </ul>
          </div>
        )}
      </nav>
      </div>
    </header>
  )
}
