/**
 * Author: Nguyễn Cao Quí (QuiNC)
 * Role: Lead Developer
 * Year: 2025-2026
 * Copyright © 2026 QuiNC. All rights reserved.
 */

import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Server-to-server request bypasses browser CORS policies completely
    const response = await fetch('https://freeipapi.com/api/json', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Cache response for 1 hour to avoid spamming the external service
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      return NextResponse.json({ cityName: 'TP. Hồ Chí Minh' })
    }

    const data = await response.json()
    return NextResponse.json({ cityName: data.cityName || 'TP. Hồ Chí Minh' })
  } catch (error) {
    console.error('Server-side location fetch error:', error)
    return NextResponse.json({ cityName: 'TP. Hồ Chí Minh' })
  }
}
