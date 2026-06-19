# Skylaria — Implementation Plan (No-Content Phase)

> **Mục tiêu:** Redesign toàn site sang dark mode museum vibe theo `layout_design_spec.md`  
> **Điều kiện:** Không cần content thực — mockdata hiện tại đủ để implement  
> **Không bao gồm:** Logo thực, tagline thực, ảnh thực, YouTube IDs, team data thực, plastics text thực
> **Áp dụng bộ Tiêu chuẩn Thiết kế (Design Skills):** `design-taste-frontend` (Variance 8, Motion 6, Density 4), `premium-liquid-glassmorphism` & `canvas-ambient-spark-effects`.

---

## 🎨 Nguyên tắc Thiết kế & Kỹ thuật Core

1. **Deterministic Typography & Contrast (Impeccable & Design Taste):**
   - Font stack chính: `Outfit` (Headlines) & `Satoshi` hoặc `Geist` (Body/Mono). Serif hoàn toàn bị cấm.
   - Font size & Spacing headlines: `text-4xl md:text-6xl tracking-tighter leading-none`.
   - **Giới hạn Display Letter-Spacing:** Không thiết lập quá khít làm dính chữ. Floor là `tracking-tighter` (không quá `-0.04em`).
   - Sử dụng `text-wrap: balance` cho headings (h1–h3) để chia dòng cân đối và `text-wrap: pretty` cho body prose để hạn chế từ mồ côi (orphans).
   - Cap line length cho body text ở mức `65–75ch` để đảm bảo trải nghiệm đọc tốt nhất.
   - **Đảm bảo Tỷ lệ Tương phản (Contrast):** Text body tối thiểu đạt tỷ lệ tương phản `4.5:1` so với nền, large text đạt `3:1`. Tránh tuyệt đối việc dùng chữ màu xám quá nhạt trên nền tối.

2. **Color Calibration (HSL & No-AI-Purple Ban):**
   - Base background: `#060e08` (off-black đậm sắc xanh lục bảo nhẹ). Không dùng `#000000`.
   - Accent: Emerald/Desaturated Green & Amber (Saturation < 80%).
   - Tuyệt đối cấm ánh sáng tím/xanh neon kiểu AI (Lila/Purple glow ban).

3. **Viewport Stability & Layout (Variance = 8):**
   - **Tuyệt đối không dùng `h-screen`** cho các block lớn. Sử dụng `min-h-[100dvh]` để tránh layout bị nhảy/giật trên mobile browsers (iOS Safari).
   - Layout Asymmetric (Bento Grid, Masonry 2 cột) và offset overlap. Grid thay vì Flex math phức tạp.
   - Mobile: tự động fallback về single-column (`w-full px-4`).

4. **Liquid Glassmorphism & Anti-Ghost Card (Impeccable Specs):**
   - Backdrop filter: `backdrop-blur-[20px] saturate-[140%]`. Sử dụng glass có chọn lọc (Navbar, active panels, modals), tránh lạm dụng làm default decorative.
   - Viền khúc xạ ánh sáng (Border Refraction): viền 1px siêu mịn (`border-white/[0.06]`) kèm shadow chìm (`shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]`).
   - **Cấm lỗi thiết kế "Ghost-Card":** Không kết hợp đồng thời viền `border: 1px solid` với đổ bóng quá mờ rộng (`box-shadow` blur >= 16px) trên cùng một element. Chọn một trong hai.
   - **Cấm lạm dụng bo góc (Over-Rounding):** Bán kính bo góc card tối đa `12px` - `16px`. Tránh bo góc quá đà kiểu `32px+` trừ nút dạng viên nhộng (full-pill buttons/tags).

5. **Motion Engine & Accessibility (Intensity = 6):**
   - Sử dụng Spring physics (`type: "spring", stiffness: 100, damping: 20`) thay cho linear easing.
   - Với transition CSS thông thường, sử dụng exponential curve (`cubic-bezier(0.16, 1, 0.3, 1)` / ease-out-expo), không dùng bounce/elastic.
   - **Hỗ trợ Giảm chuyển động (Accessibility):** Mọi chuyển động phải cấu hình `@media (prefers-reduced-motion: reduce)` tương ứng (fall back về crossfade hoặc ẩn transition lập tức).
   - Tách biệt (Isolate) hoàn toàn các CPU-heavy perpetual animations vào leaf components client-side riêng để tránh re-render layout chính.

6. **UX Feedback States & Anti-Bans:**
   - Cung cấp đủ 4 trạng thái cho các component tương tác hoặc fetch data:
     - **Loading:** Skeleton loader khớp kích thước layout thực tế.
     - **Empty:** Đẹp mắt, mô tả rõ hành động tiếp theo.
     - **Error:** Thông báo rõ ràng kèm nút thử lại trực tiếp (recovery button).
     - **Success:** Phản hồi nhẹ nhàng (toast/micro-animation).
   - Tactile feedback cho button: `:active` sử dụng `scale-[0.98]` hoặc `-translate-y-[1px]`.
   - **Cấm Side-stripe borders:** Không sử dụng viền trái/phải (`border-left`/`border-right`) dày để làm accent màu trên cards/alerts.
   - **Cấm Diagonal stripes:** Không sử dụng sọc chéo (`repeating-linear-gradient`) làm background trang trí.
   - **Cấm Section Eyebrow rập khuôn:** Tránh việc mọi section đều có text kicker viết hoa cách chữ quá nhỏ phía trên H2 (như "ABOUT", "PROCESS") theo kiểu rập khuôn AI.

7. **UI Accessibility (ui-a11y Standards):**
   - **Touch Target:** Kích thước click/touch tối thiểu của mọi element tương tác (button, filter chips, links) là `44x44px` trên thiết bị di động.
   - **Visible Focus State:** Luôn có indicator focus rõ nét (`focus-visible:ring-2` hoặc tương đương) khi điều khiển bằng bàn phím.
   - **Semantic Elements:** Ưu tiên HTML Semantic (sử dụng `<button>` thực thay vì `div onClick`).
   - **ARIA & Labels:** Gán đầy đủ `aria-label` cho các icon-only button (như nút play, nút tắt) và thuộc tính `alt` mô tả cho các hình ảnh.

8. **Component Architecture (ui-component Standards):**
   - **Structure:** Sử dụng function declaration `export function ComponentName() {}` thay vì `const ComponentName`.
   - **Props Passthrough:** Luôn hỗ trợ `className` passthrough và kế thừa đúng native props (`React.ComponentPropsWithoutRef`).
   - **Design Token Driven:** Tuyệt đối không hardcode mã hex màu hoặc kích thước không chuẩn, sử dụng 100% biến CSS / Tailwind semantic tokens đã định nghĩa.

---

## Phase 1 — Foundation
> Phải làm đầu tiên. Mọi phase sau phụ thuộc vào phase này.

### 1.1 Dark Mode Token Pivot (`globals.css`)
- [x] Định nghĩa các HSL eye-care variables và glass classes:
  - `--color-bg: #060e08;` (Off-black nền tối xanh)
  - `--color-ink: oklch(0.92 0.010 130);`
  - `--color-muted: oklch(0.55 0.015 130);`
  - `--color-surface: rgba(255, 255, 255, 0.04);`
  - `--color-border: rgba(120, 200, 100, 0.12);`
  - `--color-bg-alt: #0a160a;`
  - `--color-bg-deep: #0d1a0e;`
  - `--color-glow-green: rgba(74, 158, 82, 0.15);`
  - `--color-glow-amber: rgba(200, 160, 60, 0.15);`
  - `--color-amber: oklch(0.72 0.120 75);`
- [x] Thêm các utility class cho Liquid Glass: `.glass-panel` và `.glass-border-refraction`.
- [x] Fix `body` background + text color.
- [x] `npm run build` pass ✅.

### 1.2 Motion & Animation Utilities (`src/lib/motion.ts`)
- [x] Tạo file tiện ích quản lý spring physics chuẩn:
  ```ts
  export const springTransition = { type: 'spring', stiffness: 100, damping: 20 };
  
  export const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: springTransition }
  };
  export const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } }
  };
  ```

### 1.3 Canvas Ambient Spark System Setup (`src/components/AmbientCanvas.tsx`)
- [x] Tích hợp canvas hiệu ứng hạt nhẹ nhàng, chậm rãi (drifting green stardust).
- [x] Sử dụng `pointer-events: none` trên canvas để không chặn click chuột của người dùng.
- [x] Đảm bảo cleanup canvas đầy đủ trong `useEffect` khi unmount để tránh rò rỉ bộ nhớ.

---

## Phase 2 — Shell Components

### 2.1 Navbar (`src/components/Navbar.tsx`)
- [x] Layout: **Logo trái · Links giữa · CTA button phải** (Tránh căn giữa).
- [x] Glass: `glass-panel` (`backdrop-filter: blur(20px) saturate(140%)` + `-webkit-backdrop-filter` và border-white/[0.06]).
- [x] Dynamic scroll: Border-bottom chỉ xuất hiện khi `scrollY > 50px`.
- [x] Active Link State: Indicator mỏng có hiệu ứng slide-in.
- [x] CTA: Outlined green pill `"Khám phá →"` kèm tactile hover (`whileHover={{ scale: 1.02 }}` & `whileTap={{ scale: 0.98 }}`).
- [x] Fix lỗi ARIA `aria-controls` của mobile menu.

### 2.2 Footer (`src/components/Footer.tsx`)
- [x] Loại bỏ inline styles cũ.
- [x] 3-column layout: Brand info + Navigation links + Social placeholders (không dùng flexbox math, dùng CSS Grid).

---

## Phase 3 — Homepage (`/`)

### 3.1 HeroSection (Asymmetric Layout & Orb)
**File:** `src/app/_components/HeroSection.tsx`
- [x] Layout Asymmetric (Variance = 8): **60% Text bên trái, 40% Orb phát sáng bên phải**.
- [x] Chiều cao: sử dụng `min-h-[100dvh]` thay vì `h-screen`.
- [x] Text: Eyebrow badge nhỏ gọn, H1 gradient tinh tế (Outfit font), 2 CTAs (Primary & Secondary).
- [x] Orb: Vòng xoay quỹ đạo 3D giả lập nhẹ nhàng (drifting/orbiting circles) tách biệt làm Client Component để tránh làm chậm animation load-in của text.

### 3.2 StatsSection (Bento Grid)
**File:** `src/app/_components/StatsSection.tsx`
- [x] Grid 4 cột có đường phân chia cực mỏng (`border-r border-white/5` thay vì các card thô).
- [x] Chỉ số: font Monospace, amber glow nhẹ nhàng (`text-shadow`), tự động count-up khi vào viewport (`useInView`).

### 3.3 PlasticsSection (Liquid Glass Tabs)
**File:** `src/app/_components/PlasticsSection.tsx`
- [x] Căn lề trái toàn bộ layout, loại bỏ layout expand cồng kềnh.
- [x] 8 tab đại diện cho 7 loại nhựa + Tất cả. Thiết kế tab sử dụng Liquid Glass active state.
- [x] Content Panel: Đổi tab mượt mà bằng `AnimatePresence` + Spring-based translation.
- [x] Cung cấp Empty/Loading states phòng hờ nếu data rỗng.

### 3.4 WhySection (Offset Overlay)
**File:** `src/app/_components/WhySection.tsx`
- [x] Layout asymmetric offset: block text xếp so le đè nhẹ lên block hình học bên phải.
- [x] Staggered animation cascade cho các bullets thông tin.

### 3.5 CtaSection (Interactive Cards)
**File:** `src/app/_components/CtaSection.tsx`
- [x] 3 cards liên kết đến `/recycle`, `/blog`, `/about` với hover glow (Spotlight effect) và tactile shift (`whileHover={{ y: -4 }}`).

---

## Phase 4 — Inner Pages

### 4.1 `/recycle` (Video Hub & Interactive Filters)
**Files:** `recycle/page.tsx` + `RecycleClient.tsx`
- [x] Hero: H1 + Subtitle + Chips lọc thể loại tích hợp ngay trong vùng Hero.
- [x] Grid: Bento Grid so le nhẹ (3-col desktop, fallback 1-col mobile).
- [x] Card: Viền phản xạ kính nhẹ, tag badge nổi bật. Hover có animation play icon xuất hiện từ từ.
- [x] Xử lý ARIA warnings trong filter buttons.

### 4.2 `/blog` (Masonry Grid)
**File:** `blog/page.tsx`
- [x] Grid Masonry 2 cột với độ cao card thay đổi tự nhiên (`column-count: 2`).
- [x] Tích hợp Empty State theo chuẩn `ux-feedback` (UI minh họa đẹp mắt, có nút back/suggest bài viết khác).

### 4.3 `/about` (Editorial & Team Grid)
**File:** `about/page.tsx`
- [x] Hero fullscreen (`min-h-[100dvh]`) hiển thị quote tuyên ngôn cực lớn, căn lề trái, font chữ Outfit tracking-tight.
- [x] Team: Grid 4 cột, Avatar có initials placeholder thiết kế tối giản, kèm hover tooltip nhỏ.

### 4.4 `404` Page
- [x] Thiết kế tối giản mang hơi hướng nghệ thuật: số "404" khổng lồ đổ bóng mờ ảo, thông điệp ngắn gọn và CTA nút quay lại trang chủ nổi bật.

---

## Thứ tự dependencies

```
1.1 globals.css (Tokens, Glass, HSL) → 1.2 motion.ts (Spring config) → 1.3 AmbientCanvas
                                ↓
                        2.1 Navbar → 2.2 Footer
                                ↓
            3.1 Hero → 3.2 Stats → 3.3 Plastics → 3.4 Why → 3.5 CTA
                                ↓
                 4.1 /recycle → 4.2 /blog → 4.3 /about → 4.4 404
```

---

## Definition of Done

- [x] `http://localhost:3000` dark mode toàn site
- [x] Tất cả `whileInView` animations hoạt động
- [x] Responsive OK: 390px / 768px / 1280px
- [x] Inline styles → CSS variables (warnings cleared)
- [x] `aria-controls` Navbar fixed
