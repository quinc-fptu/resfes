/**
 * Author: Nguyễn Cao Quí (QuiNC)
 * Role: Lead Developer
 * Year: 2025-2026
 * Copyright © 2026 QuiNC. All rights reserved.
 */

'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  speed: number;
  isBurst?: boolean;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

interface TrailPoint {
  x: number;
  y: number;
  size: number;
  alpha: number;
  color: string;
}

export function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let stars: Star[] = []
    let ripples: Ripple[] = []
    let trailPoints: TrailPoint[] = []

    const starCount = 35
    const themeColor = 'rgba(74, 158, 82, 0.4)'
    const rippleColor = 'rgba(120, 220, 140, 0.3)'

    const resize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      stars = []
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 1.5 + 1,
          alpha: Math.random() * 0.4 + 0.1,
          speed: Math.random() * 0.01 + 0.005,
        })
      }
    }

    const spawnRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.random() * 120 + 80,
        alpha: 0.35,
        speed: Math.random() * 0.8 + 0.4,
      })
    }

    const spawnStardustBurst = (x: number, y: number, count = 8) => {
      for (let i = 0; i < count; i++) {
        stars.push({
          x: x + (Math.random() - 0.5) * 30,
          y: y + (Math.random() - 0.5) * 30,
          vx: (Math.random() - 0.5) * 2.0,
          vy: (Math.random() - 0.5) * 2.0 - 0.5,
          size: Math.random() * 3 + 2,
          alpha: 1.0,
          speed: -(Math.random() * 0.03 + 0.015),
          isBurst: true,
        })
      }
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('button') || 
        target.closest('input') || 
        target.closest('a') || 
        target.closest('[role="button"]')
      ) {
        spawnStardustBurst(e.clientX, e.clientY, 6)
        return
      }
      spawnRipple(e.clientX, e.clientY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      trailPoints.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 5 + 2,
        alpha: 0.8,
        color: themeColor,
      })
    }

    window.addEventListener('resize', resize)
    window.addEventListener('click', handleClick)
    window.addEventListener('mousemove', handleMouseMove)
    
    resize()

    const animate = () => {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars = stars.filter((s) => {
        if (s.isBurst) {
          s.alpha += s.speed
          return s.alpha > 0
        }
        return true
      })

      stars.forEach((s) => {
        s.x += s.vx
        s.y += s.vy

        if (!s.isBurst) {
          s.alpha += s.speed
          if (s.alpha > 0.6 || s.alpha < 0.05) s.speed *= -1

          if (s.x < 0) s.x = canvas.width
          if (s.x > canvas.width) s.x = 0
          if (s.y < 0) s.y = canvas.height
          if (s.y > canvas.height) s.y = 0
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(120, 220, 140, ${s.alpha})`
        ctx.shadowBlur = s.isBurst ? 12 : 8
        ctx.shadowColor = themeColor
        ctx.fill()
      })

      for (let i = 0; i < ripples.length; i++) {
        const r = ripples[i]
        r.radius += r.speed
        r.alpha -= 0.0025

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1)
          i--
          continue
        }

        ctx.beginPath()
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2)
        ctx.strokeStyle = rippleColor.replace(')', `, ${r.alpha})`).replace('rgb', 'rgba')
        ctx.lineWidth = 1.5
        ctx.shadowBlur = 15
        ctx.shadowColor = rippleColor
        ctx.stroke()
      }

      for (let i = 0; i < trailPoints.length; i++) {
        const p = trailPoints[i]
        p.alpha -= 0.03
        p.size -= 0.05

        if (p.alpha <= 0 || p.size <= 0) {
          trailPoints.splice(i, 1)
          i--
          continue
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color.replace(')', `, ${p.alpha})`).replace('rgb', 'rgba')
        ctx.shadowBlur = 10
        ctx.shadowColor = p.color
        ctx.fill()
      }

      ctx.shadowBlur = 0
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none block h-full w-full mix-blend-screen"
    />
  )
}
