/**
 * Author: Nguyễn Cao Quí (QuiNC)
 * Role: Lead Developer
 * Year: 2025-2026
 * Copyright © 2026 QuiNC. All rights reserved.
 */

'use client'

import Link from 'next/link'
import { FacebookLogo, InstagramLogo, Envelope } from '@phosphor-icons/react'

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-[#060e08] border-t border-white/5 py-12 md:py-16 text-sm text-white/50"
    >
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 items-start">
          
          <div className="flex flex-col gap-4">
            <span className="font-display font-extrabold text-xl text-white tracking-tight select-none">
              Skylaria
            </span>
            <p className="max-w-[32ch] leading-relaxed text-xs">
              Nâng cao nhận thức cộng đồng và chia sẻ kiến thức hữu ích về tái chế rác thải nhựa tại Việt Nam.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Điều hướng
            </h4>
            <ul role="list" className="flex flex-col gap-2.5 list-none">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors text-xs">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/recycle" className="hover:text-emerald-400 transition-colors text-xs">
                  Hướng dẫn tái chế
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-400 transition-colors text-xs">
                  Bài viết & Kiến thức
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors text-xs">
                  Về dự án
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Kết nối với Skylaria
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fanpage Facebook của Skylaria"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 hover:bg-white/5 text-white/55 hover:text-emerald-400 transition-all duration-300"
              >
                <FacebookLogo size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram của Skylaria"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 hover:bg-white/5 text-white/55 hover:text-emerald-400 transition-all duration-300"
              >
                <InstagramLogo size={20} />
              </a>
              <a
                href="mailto:contact@skylaria.org"
                aria-label="Gửi email cho Skylaria"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 hover:bg-white/5 text-white/55 hover:text-emerald-400 transition-all duration-300"
              >
                <Envelope size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div>
            &copy; {new Date().getFullYear()} Skylaria. Đã đăng ký bản quyền.
          </div>
          <div>
            Thiết kế & phát triển bởi <span className="text-white">QuiNC</span>.
          </div>
        </div>
      </div>
    </footer>
  )
}
