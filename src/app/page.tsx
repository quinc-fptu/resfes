/**
 * Author: Nguyễn Cao Quí (QuiNC)
 * Role: Lead Developer
 * Year: 2025-2026
 * Copyright © 2026 QuiNC. All rights reserved.
 */

import type { Metadata } from 'next'
import HeroSection from './_components/HeroSection'
import CtaSection from './_components/CtaSection'

export const metadata: Metadata = {
  title: 'Skylaria — Hiểu nhựa, Hành động đúng, Thay đổi thật',
  description: 'Dự án Skylaria giúp nâng cao nhận thức và phân loại rác thải nhựa tại Việt Nam.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CtaSection />
    </>
  )
}
