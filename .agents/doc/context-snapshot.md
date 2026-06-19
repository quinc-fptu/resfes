# Skylaria — Context Transfer Snapshot

> Cập nhật: 2026-06-19 (session layout design). Dùng để handoff sang conversation mới.
> **Lưu ý:** _ResFes_ là tên cuộc thi — tên dự án chính thức là **Skylaria**.

---

## Project Root

```
c:\Users\Admin\OneDrive\Desktop\ResFes\     ← Next.js app (source code chính ở root)
```

**Git:** Chưa init git (flag `--disable-git` khi scaffold).

---

## Tech Stack (đã chốt)

| Layer | Lựa chọn |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 + Custom CSS Variables (OKLCH) |
| Animation | Framer Motion |
| Icons | @phosphor-icons/react |
| Blog | MDX files tĩnh trong `src/content/blog/` |
| Data | JSON files tĩnh trong `src/data/` |
| Auth | Không cần |
| Deploy | Cloudflare Pages (chưa deploy) |
| Font | Outfit (display) + DM Sans (body) — Google Fonts via next/font |

---

## Design System

- **Tên dự án:** Skylaria (ResFes = tên cuộc thi tham gia)
- **Vibe đã chốt:** Interactive Museum — **Dark mode**, immersive, glowing
- **Color mode:** Dark mode toàn site (pivot từ light mode cũ)
- **Background rhythm:** `#060e08` chủ đạo, xen kẽ `#0a160a` / `#0d1a0e` cho section nhịp
- **Primary:** `oklch(0.48 0.142 130)` — moss green (giữ nguyên token, đổi context sang dark)
- **Accent:** `oklch(0.65 0.120 75)` — warm amber (dùng cho stats glow)
- **Seed màu:** `oklch(0.550 0.142 130)` — moss-bed forest green
- **Font:** Outfit (display) + DM Sans (body)
- **Animation:** Framer Motion `whileInView` — fade + slide up 20px
- **Design tokens:** `src/app/globals.css` (OKLCH, spacing, z-index, motion)
- **PRODUCT.md:** `ResFes/PRODUCT.md` — đã cập nhật tên Skylaria
- **Layout spec:** `ResFes/layout_design_spec.md` — **Đọc file này trước khi implement bất kỳ trang nào**

---

## Cấu trúc source `website/src/`

```
app/
├── _components/           ← Home page sections (Client Components)
│   ├── HeroSection.tsx
│   ├── StatsSection.tsx
│   ├── PlasticsSection.tsx
│   ├── WhySection.tsx
│   └── CtaSection.tsx
├── recycle/
│   ├── _components/RecycleClient.tsx
│   └── page.tsx
├── blog/
│   ├── [slug]/page.tsx
│   └── page.tsx
├── about/page.tsx
├── not-found.tsx
├── globals.css             ← Full design token system
└── layout.tsx              ← Root layout + fonts + SEO
components/
├── Navbar.tsx              ← Sticky + scroll-aware glass + mobile drawer
└── Footer.tsx
content/
└── blog/
    └── chai-nhua-pet-tai-che-dung-cach.mdx  ← Sample post (mockdata)
data/
├── plastics.json           ← 7 loại nhựa (MOCKDATA)
├── videos.json             ← Video cards (MOCKDATA — youtubeId: null)
└── team.json               ← Thành viên (MOCKDATA — avatarUrl: null)
lib/
└── data-loader.ts          ← Server-only SSG data functions
types/
└── index.ts                ← PlasticType, VideoCard, BlogPost, TeamMember
```

---

## ⚠️ Tất cả nội dung hiện tại là MOCKDATA

Nội dung thực sẽ được gửi sau khi team chuẩn bị xong:

| File | Trạng thái | Cần update |
|---|---|---|
| `src/data/plastics.json` | **MOCKDATA** — tên, mô tả, hướng dẫn dispose của 7 loại nhựa đều là tạm | Verify + viết lại content thực từ team |
| `src/data/videos.json` | **MOCKDATA** — `youtubeId: null` | Điền YouTube ID thực khi có video |
| `src/data/team.json` | **MOCKDATA** — tên/bio/avatar tạm | Điền tên + bio thực + avatarUrl |
| `src/content/blog/*.mdx` | 1 sample post mockdata | Thêm bài viết thực |
| `src/components/Navbar.tsx` | Logo là placeholder square | Thay bằng SVG logo thực |
| `src/app/_components/HeroSection.tsx` | Hình hero là placeholder circle | Thay bằng ảnh thực |
| `src/app/_components/StatsSection.tsx` | Số liệu tham khảo | Verify lại nguồn thống kê |

---

## Đã hoàn thành

- [x] `PRODUCT.md` — cập nhật tên Skylaria, brand context cho ý tưởng
- [x] `project_breakdown.md` — breakdown website-only (bỏ AR/scan)
- [x] Tech stack chốt qua `/grill-me`
- [x] Scaffold Next.js 16 + Tailwind v4 + Framer Motion
- [x] Hệ thống thiết kế Dark Mode Museum Vibe toàn site (pivot từ light mode cũ).
- [x] globals.css — Tích hợp biến HSL, class liquid glass và phông chữ Outfit/Satoshi.
- [x] AmbientCanvas.tsx — Tải các hạt stardust màu lục bảo bay trôi chậm ở nền body.
- [x] Redesign Navbar + Footer — Bố cục 3 phần bất đối xứng, chỉnh touch target >= 44px, sửa ARIA, dọn dẹp inline styles.
- [x] Redesign HeroSection — Layout 60% text / 40% Interactive Orb tự xoay 3D.
- [x] Redesign StatsSection — Amber-glow text shadow, nền xanh lá đậm `#0d1a0e`, phân tách bằng divider mỏng.
- [x] Redesign PlasticsSection — 8 tab chọn lọc kết hợp liquid glass active state và transition mượt mà.
- [x] Redesign `/recycle` — Filter pill trong Hero, Bento Grid so le, play button hover effect và glass video modal.
- [x] Redesign `/blog` — Masonry 2 cột và dọn dẹp import module `fs` (tách biệt Server Page & Client BlogClient).
- [x] Redesign `/about` — Editorial quote H1 lớn, Team 4-col grid với avatar initials fallback.
- [x] Redesign 404 page (`not-found.tsx`) — Hiệu ứng amber glow 404 nghệ thuật.
- [x] TypeScript types + data-loader (SSG-safe).
- [x] Build pass: `npm run build` ✅ (8 routes prerendered).
- [x] Dev server: `http://localhost:3000`.
- [x] **Layout design spec** chốt qua `/grill-me` — lưu tại `.agents/doc/layout_design_spec.md`.

---

## Open Tasks / Next Steps

### Priority 1 — Cần content thực từ team
- [ ] Nhận YouTube ID từ team → điền vào `videos.json`
- [ ] Nhận bio, ảnh team → update `team.json` + avatar images thực tế
- [ ] Nhận bài viết blog → tạo MDX files thực tế trong `content/blog/`
- [ ] Nhận tagline chính thức của Skylaria (thay mock)
- [ ] Nhận mission quote cho `/about` hero
- [ ] Xác minh 4 số liệu stats có nguồn thống kê chính thức
- [ ] Thay thế Logo SVG thực tế, Favicon, OG image
- [ ] Điền link Facebook / Instagram / Email chính thức

### Priority 2 — UI Polish (sau khi có content)
- [ ] Thay placeholder hình hero bằng ảnh thực hoặc SVG illustration chính thức
- [ ] Thay logo text bằng SVG logo thực của Skylaria
- [ ] Thêm Open Graph image cho SEO
- [ ] Test kỹ responsive trên mobile/tablet thực tế
- [ ] `sitemap.xml` + `robots.txt`
- [ ] Chốt layout `/blog/[slug]` sau khi có bài viết thực tế

### Priority 3 — Deploy
- [ ] Deploy lên Cloudflare Pages (connect Git repo, build cmd `npm run build`, output `.next`)

---

## Commands để tiếp tục

```bash
# Dev server
cd c:\Users\Admin\OneDrive\Desktop\ResFes\website
npm run dev       # http://localhost:3000

# Build check
npm run build
```

---

## Lưu ý cho AI nhận conversation tiếp theo

1. **Tên dự án là Skylaria** — ResFes chỉ là tên cuộc thi (folder tên ResFes chỉ là folder gốc, không phải tên sản phẩm).
2. **Đọc `layout_design_spec.md` và `implementation_plan.md` trong `.agents/doc/`** trước khi tiến hành chỉnh sửa hoặc phát triển thêm.
3. **Đọc PRODUCT.md** trước khi làm bất kỳ UI task nào.
4. **Mọi content hiện tại là mockdata** — không sửa structure, chỉ sửa content khi user gửi data thực.
5. **QuiNC coding style** — author header bắt buộc trên mọi file mới, single quotes, 2-space indent.
6. **Tailwind v4** — dùng `@tailwindcss/postcss`, KHÔNG dùng plugin cũ.
7. **Phosphor Icons** — import từ `@phosphor-icons/react` ở client side.
8. **Data flow** — mọi data nạp tĩnh qua `src/lib/data-loader.ts`, KHÔNG fetch client-side.
9. **Next.js Server/Client component separation:** Để tránh rò rỉ các thư viện node.js độc quyền trên server như `fs` vào bundle trình duyệt, hãy tiếp tục dùng mô hình nạp dữ liệu ở Server Component (`page.tsx`) rồi truyền dữ liệu qua props cho Client Component wrapper (`*Client.tsx`) như đã làm ở trang `/blog` và `/recycle`.

