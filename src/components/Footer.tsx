'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FacebookLogo, InstagramLogo, Envelope, MapPin } from '@phosphor-icons/react'

interface EnvironmentalData {
  locationName: string;
  aqi: number;
  temp: number;
  humidity: number;
}

export default function Footer() {
  const [data, setData] = useState<EnvironmentalData>({
    locationName: 'Đang xác định...',
    aqi: 72,
    temp: 31,
    humidity: 70
  })

  // IP-based Geolocation using freeipapi.com
  useEffect(() => {
    fetch('/api/location')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((ipData) => {
        if (ipData && ipData.cityName) {
          let cityVi = ipData.cityName;
          const cityLower = ipData.cityName.toLowerCase();
          
          if (cityLower.includes('ho chi minh') || cityLower.includes('saigon')) {
            cityVi = 'TP. Hồ Chí Minh';
          } else if (cityLower.includes('hanoi')) {
            cityVi = 'Hà Nội';
          } else if (cityLower.includes('da nang')) {
            cityVi = 'Đà Nẵng';
          } else if (cityLower.includes('hai phong')) {
            cityVi = 'Hải Phòng';
          } else if (cityLower.includes('can tho')) {
            cityVi = 'Cần Thơ';
          }
          
          setData((prev) => ({
            ...prev,
            locationName: cityVi
          }));
        } else {
          setData((prev) => ({ ...prev, locationName: 'TP. Hồ Chí Minh' }));
        }
      })
      .catch(() => {
        setData((prev) => ({ ...prev, locationName: 'TP. Hồ Chí Minh' }));
      });
  }, [])

  // Active Live Simulation for the current location
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const aqiChange = Math.floor(Math.random() * 5) - 2
        const tempChange = Math.floor(Math.random() * 3) - 1
        const humChange = Math.floor(Math.random() * 5) - 2

        return {
          ...prev,
          aqi: Math.max(10, Math.min(200, prev.aqi + aqiChange)),
          temp: Math.max(18, Math.min(40, prev.temp + tempChange)),
          humidity: Math.max(50, Math.min(95, prev.humidity + humChange)),
        }
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { text: 'Tốt', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' }
    if (aqi <= 100) return { text: 'T.Bình', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' }
    return { text: 'K.Tốt', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' }
  }

  const status = getAQIStatus(data.aqi)

  return (
    <footer
      role="contentinfo"
      className="bg-[#050c07] border-t border-white/5 py-12 text-sm text-white/50 relative overflow-hidden"
    >
      {/* Soft background ambient glow */}
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[150px] bg-emerald-500/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
        
        {/* Main horizontal flex layout */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-6 pb-10 border-b border-white/5">
          
          {/* Left: Brand Identity & Social Icons */}
          <div className="flex flex-col gap-3.5 max-w-sm w-full">
            <div className="flex items-center gap-2.5">
              <span className="font-display font-extrabold text-xl text-white tracking-tight flex items-center gap-1.5 select-none">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Skylaria
              </span>
              <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded select-none uppercase tracking-wider">
                Phi lợi nhuận
              </span>
            </div>
            <p className="leading-relaxed text-xs text-white/60">
              Skylaria là dự án cộng đồng hướng tới mục tiêu nâng cao ý thức phân loại rác thải tại nguồn và thúc đẩy các giải pháp tái chế rác thải nhựa thực tiễn, kiến tạo môi trường sống xanh bền vững tại Việt Nam.
            </p>

            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/40 hover:text-emerald-400 transition-colors duration-200"
              >
                <FacebookLogo size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/40 hover:text-emerald-400 transition-colors duration-200"
              >
                <InstagramLogo size={18} />
              </a>
              <a
                href="mailto:contact@skylaria.org"
                aria-label="Email"
                className="text-white/40 hover:text-emerald-400 transition-colors duration-200"
              >
                <Envelope size={18} />
              </a>
            </div>
          </div>

          {/* Center: Premium horizontal navigation bar */}
          <nav aria-label="Footer Navigation" className="flex items-center">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 list-none p-0 m-0 text-xs">
              <li>
                <Link href="/" className="hover:text-emerald-400 text-white/70 transition-colors py-1 block">
                  Trang chủ
                </Link>
              </li>
              <li className="h-1 w-1 rounded-full bg-white/10 hidden sm:block select-none" />
              <li>
                <Link href="/recycle" className="hover:text-emerald-400 text-white/70 transition-colors py-1 block">
                  Tái chế
                </Link>
              </li>
              <li className="h-1 w-1 rounded-full bg-white/10 hidden sm:block select-none" />
              <li>
                <Link href="/blog" className="hover:text-emerald-400 text-white/70 transition-colors py-1 block">
                  Kiến thức
                </Link>
              </li>
              <li className="h-1 w-1 rounded-full bg-white/10 hidden sm:block select-none" />
              <li>
                <Link href="/about" className="hover:text-emerald-400 text-white/70 transition-colors py-1 block">
                  Về chúng tôi
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right: Modern glass card location indicator */}
          <div className="flex items-center gap-3 bg-white/[0.01] border border-white/5 p-2.5 px-3.5 rounded-xl hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-white/40 flex items-center gap-1 font-medium select-none">
                <MapPin size={11} className="text-emerald-400" />
                {data.locationName}
              </span>
              <span className="text-[10px] text-white/60 select-none">
                {data.temp}°C | {data.humidity}% độ ẩm
              </span>
            </div>
            <div className="h-7 w-px bg-white/10" />
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-white/35 font-bold uppercase tracking-wider scale-90 origin-right">AQI</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-base font-extrabold text-white leading-none tabular-nums select-none">{data.aqi}</span>
                <span className={`text-[8px] font-semibold px-1 py-0.2 rounded border scale-90 ${status.color} select-none`}>
                  {status.text}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-white/35">
          <div>&copy; {new Date().getFullYear()} Skylaria. Bảo lưu mọi quyền.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Điều khoản</a>
            <a href="#" className="hover:text-white transition-colors">Bảo mật</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
