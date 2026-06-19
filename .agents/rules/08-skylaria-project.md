# Rule: Skylaria Project — Identity & Design Decisions

> Đây là rule bắt buộc cho mọi AI làm việc trên dự án này.  
> Đọc file này TRƯỚC KHI làm bất kỳ task nào liên quan đến UI, content, hay codebase.

---

## 1. Project Identity

- **Tên dự án:** `Skylaria`
- **Tên cuộc thi tham gia:** `ResFes` _(folder gốc tên `ResFes/` chỉ là tên thư mục, không phải tên sản phẩm)_
- **Mục đích:** Website trình bày về rác thải nhựa tại Việt Nam — kiến thức 7 loại nhựa, video tái chế, blog, team
- **Người dùng:** Sinh viên, giáo viên, người tham quan triển lãm môi trường tại Việt Nam
- **Brand personality:** Tươi sáng. Có trách nhiệm. Trẻ trung. — Tone: thân thiện nhưng có chiều sâu

---

## 2. Design Decisions (Đã chốt — KHÔNG tranh luận lại)

### Vibe & Color Mode
- **Vibe:** Interactive Museum — dark, immersive, glowing
- **Color mode:** **Dark mode toàn site** _(globals.css hiện vẫn là light mode — cần pivot khi implement)_
- **Background rhythm:**
  - `#060e08` — màu nền chính (mặc định)
  - `#0a160a` — section xen kẽ nhẹ
  - `#0d1a0e` — section dark green đậm hơn (dùng cho Stats)

### Typography & Tokens
- **Font display:** `Outfit` (700, 800, 900)
- **Font body:** `DM Sans` (400, 500, 600)
- **Primary color:** `oklch(0.48 0.142 130)` — moss green
- **Accent color:** `oklch(0.65 0.120 75)` — warm amber _(dùng cho stats glow)_
- **KHÔNG dùng:** Inter font, saturated neon green (`#00ff00`, `#4CAF50`)

### Animation
- **Scroll reveal:** Framer Motion `whileInView` — `opacity: 0→1` + `y: 20→0`, `duration: 0.5`
- **Page transition:** Không có — chỉ scroll animation + hover effects
- **Hover cards:** `translateY(-3px)` + `border-color` glow
- **Reduced motion:** Bắt buộc respect `prefers-reduced-motion`

---

## 3. Layout Spec (Tóm tắt — xem chi tiết tại `layout_design_spec.md`)

| Route | Layout đã chốt |
|---|---|
| **Navbar** | Logo trái · Links giữa · CTA phải · Mobile: hamburger dropdown |
| **`/` Hero** | Left text + floating orb animation bên phải (80-90vh) |
| **`/` Stats** | 4 số amber glow, bg `#0d1a0e`, counter animation |
| **`/` Plastics** | Tab panel 7 tabs trên, content panel bên dưới |
| **`/` Why** | 2-col: text trái + illustration phải |
| **`/` CTA** | 3 cards nhỏ → /recycle, /blog, /about |
| **`/recycle`** | Filter chips trong hero section + 3-col video grid |
| **`/blog`** | Masonry 2 cột, compact, card cao thấp tự nhiên |
| **`/blog/[slug]`** | ⏳ Chờ content thực — chưa chốt |
| **`/about`** | Fullscreen hero + mission quote + team 4-col grid + contact section |

---

## 4. Content Status

> **TẤT CẢ content hiện tại là MOCKDATA.**  
> Không sửa structure. Chỉ sửa content khi user gửi data thực.

| Cần nhận từ team | File sẽ update |
|---|---|
| Tagline chính thức Skylaria | `HeroSection.tsx` |
| Mission quote cho /about | `about/page.tsx` |
| 4 stats có nguồn (tấn/năm, loại nhựa, tỷ lệ tái chế, thời gian phân hủy) | `plastics.json`, `StatsSection.tsx` |
| **Nội dung 7 loại nhựa** (tên, mô tả, dispose guide) | `plastics.json` — **toàn bộ đang là mockdata** |
| YouTube video IDs | `videos.json` |
| Tên / role / bio / avatarUrl — 4 thành viên | `team.json` |
| Bài viết blog MDX | `src/content/blog/*.mdx` |
| Logo SVG, Favicon, OG image | `public/` |
| Facebook / Instagram / Email links | `Footer.tsx`, `about/page.tsx` |

---

## 5. Key Files

| File | Mục đích |
|---|---|
| `PRODUCT.md` | Brand register, personality, anti-references |
| `.agents/doc/layout_design_spec.md` | **Full layout spec với ASCII diagram từng trang** |
| `.agents/doc/context-snapshot.md` | Tech stack, file structure, open tasks hiện tại |
| `.agents/doc/implementation_plan.md` | Kế hoạch triển khai & tiến trình chi tiết |
| `website/src/app/globals.css` | Design token system (OKLCH) |
| `website/src/lib/data-loader.ts` | SSG-safe data functions — data phải đi qua đây |

---

## 6. Hard Rules

1. **BẮT BUỘC ĐỌC TÀI LIỆU TRONG `.agents/doc/`:** Ở đầu mỗi cuộc hội thoại mới, AI bắt buộc phải dùng công cụ `view_file` đọc tài liệu `.agents/doc/context-snapshot.md` và `.agents/doc/implementation_plan.md` để nắm bắt đúng tiến độ thực tế, không đoán mò hay hỏi lại user những gì đã chốt.
2. **Tên sản phẩm là Skylaria** — không dùng "ResFes" để gọi tên dự án trong UI.
3. **Dark mode** — thiết kế dựa trên bảng màu `#060e08` chủ đạo và lớp phủ kính oklch desaturated, không dùng light mode.
4. **Data flow** — mọi static data fetch qua `src/lib/data-loader.ts`, không fetch client-side.
5. **Next.js Server/Client Component Separation** — Tách biệt nạp dữ liệu (Server) và animation/phản hồi (Client Component) để tránh rò rỉ thư viện backend `fs` ra trình duyệt.
6. **`'use client'`** — chỉ khi thực sự cần interactivity, không dùng bừa.
7. **Ảnh** — dùng `next/image` và thiết lập kích cỡ đầy đủ, không dùng raw `<img>`.
8. **Content = mockdata** — không tự bịa content mới, giữ nguyên cấu trúc dữ liệu thô.
