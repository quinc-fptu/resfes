/**
 * Author: Nguyễn Cao Quí (QuiNC)
 * Role: Lead Developer
 * Year: 2025-2026
 * Copyright © 2026 QuiNC. All rights reserved.
 */

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PlayCircle, Article, Users } from '@phosphor-icons/react'
import { fadeUp, staggerContainer } from '@/lib/motion'

export default function CtaSection() {
  const cards = [
    {
      href: '/recycle',
      icon: <PlayCircle size={32} weight="thin" className="text-emerald-400" />,
      title: 'Xem video hướng dẫn',
      desc: 'Kho lưu trữ video ngắn trực quan, hướng dẫn cụ thể từng bước tái chế tại nhà.',
      cta: 'Xem video →'
    },
    {
      href: '/blog',
      icon: <Article size={32} weight="thin" className="text-emerald-400" />,
      title: 'Đọc bài viết chia sẻ',
      desc: 'Tổng hợp kiến thức sâu rộng về rác thải nhựa, môi trường và lối sống xanh bền vững.',
      cta: 'Đọc bài →'
    },
    {
      href: '/about',
      icon: <Users size={32} weight="thin" className="text-emerald-400" />,
      title: 'Về dự án Skylaria',
      desc: 'Tìm hiểu về sứ mệnh, câu chuyện và đội ngũ phát triển đứng sau dự án ý nghĩa này.',
      cta: 'Xem chi tiết →'
    }
  ]

  return (
    <section
      aria-label="Khám phá các chuyên mục khác"
      className="py-20 md:py-24 bg-[#0a160a]"
    >
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map((c, idx) => (
            <motion.article
              key={idx}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="p-8 rounded-xl flex flex-col justify-between items-start gap-6 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 group"
            >
              <div className="flex flex-col gap-4">
                <div className="w-14 h-14 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center">
                  {c.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-white group-hover:text-emerald-400 transition-colors">
                  {c.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {c.desc}
                </p>
              </div>

              <Link
                href={c.href}
                className="inline-flex items-center text-sm font-bold text-emerald-400 hover:text-emerald-300 group-hover:translate-x-0.5 transition-all duration-300"
                style={{ minHeight: '44px' }}
              >
                {c.cta}
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
