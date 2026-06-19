/**
 * Author: Nguyễn Cao Quí (QuiNC)
 * Role: Lead Developer
 * Year: 2025-2026
 * Copyright © 2026 QuiNC. All rights reserved.
 */

import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AmbientCanvas } from '@/components/AmbientCanvas'

export const metadata: Metadata = {
  title: 'Skylaria — Dự án bảo vệ môi trường',
  description: 'Nâng cao nhận thức cộng đồng về phân loại và tái chế rác thải nhựa tại Việt Nam.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="bg-[#060e08] text-white antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
        <AmbientCanvas />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
