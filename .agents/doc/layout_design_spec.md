# Skylaria — Layout Design Spec (Đã chốt)

> _Grill-me session: 2026-06-19_  
> **Trạng thái:** ⏳ Chờ content thực — implement sau khi nhóm cung cấp đầy đủ nội dung.  
> **Lưu ý:** _ResFes_ là tên cuộc thi mà dự án tham gia — tên dự án chính thức là **Skylaria**.

---

## 🎨 Global Decisions

| Quyết định | Lựa chọn |
|---|---|
| **Vibe** | Interactive Museum — dark mode, immersive, glowing |
| **Color mode** | Dark mode toàn site |
| **Background rhythm** | `#060e08` chủ đạo, xen kẽ `#0a160a` / `#0d1a0e` cho section nhịp |
| **Animation** | Fade + slide up 20px khi scroll vào viewport (Framer Motion `whileInView`) |
| **Page transition** | Không có page transition — chỉ scroll animation + hover effects |

---

## 🧭 Navbar

```
[ Logo Skylaria ]   [ Trang chủ · Tái chế · Blog · Về chúng tôi ]     
   (trái)                        (giữa)                                  
```

- **Sticky** — bám đầu khi scroll
- **Glass effect** — `backdrop-filter: blur(12px)` + `background: rgba(6,14,8,0.85)`
- **Scroll-aware** — border-bottom xuất hiện sau khi scroll >50px
- **Mobile** — hamburger → dropdown links ngay bên dưới navbar (không drawer, không sheet)

---

## 🏠 `/` — Trang chủ

### Hero Section
```
[ Navbar ]
┌─────────────────────────────────────────────────────────┐  80-90vh
│  .eyebrow badge                   │                     │
│                                   │   🌀 ORB animation  │
│  H1 — Hiểu nhựa.                 │   + orbit rings     │
│       Hành động đúng.            │   (floating)        │
│       Thay đổi thật.             │                     │
│                                   │                     │
│  [Khám phá →]  [Xem video]       │                     │
└─────────────────────────────────────────────────────────┘
```
- Text lệch trái, orb animation floating bên phải
- Particle canvas nền (subtle, 80 particles)
- Scroll indicator ở dưới

### CTA Section
```
┌────────────┬────────────┬────────────┐
│  🎬 Tái chế│  📝 Blog   │  👥 Về nhóm│
│  Xem video │  Đọc bài   │  Meet team │
│  [Xem →]   │  [Đọc →]   │  [Xem →]  │
└────────────┴────────────┴────────────┘
```
- 3 cards nhỏ: icon + tiêu đề + một nút
- Background: `#0a160a`

---

## ♻️ `/recycle` — Hướng dẫn tái chế

```
[ Navbar ]
┌─────────────────────────────────────────────────────────┐  Hero section
│  H1: Hướng dẫn tái chế                                 │
│  p: Chọn loại nhựa để tìm video...                      │
│                                                         │
│  [ Tất cả ] [ #1 PET ] [ #2 HDPE ] [ #3 PVC ] ...      │  ← Filter chips
└─────────────────────────────────────────────────────────┘
┌──────────┬──────────┬──────────┐
│ vid card │ vid card │ vid card │  ← 3-col grid
├──────────┼──────────┼──────────┤
│ vid card │ vid card │ vid card │
└──────────┴──────────┴──────────┘
```
- Filter chips nằm trong hero section header
- Grid 3 cột desktop, 2 cột tablet, 1 cột mobile
- Card hover: border glow + thumbnail play button appear
- Click card → YouTube modal overlay

---

## 📝 `/blog` — Bài viết

```
[ Navbar ]
┌─────────────────────────────────────────────────────────┐  Hero
│  H1: Bài viết                                           │
│  Filter: [ Tất cả ] [ Tái chế ] [ Môi trường ] ...     │
└─────────────────────────────────────────────────────────┘
┌────────────────────┬──────────────────────┐
│  Card cao (tall)   │  Card ngắn (short)   │  ← 2-col masonry CSS columns
│                    ├──────────────────────┤     compact, không quá nhiều gap
│  [NỔI BẬT badge]  │  Card mid height     │
│                    │                      │
├────────────────────┤                      │
│  Card mid          ├──────────────────────┤
│                    │  Card tall           │
└────────────────────┴──────────────────────┘
```
- **Masonry 2 cột** (`column-count: 2`), card cao thấp tự nhiên
- Card nổi bật có `NỔI BẬT` badge nhỏ
- Spacing compact — không quá nhiều gap

### `/blog/[slug]` — Detail page
> ⏳ **Chờ content thực** — Layout sẽ chốt khi có bài viết thật.  
> Tạm thời giữ layout reading-mode hiện tại.

---

## 👥 `/about` — Về chúng tôi

```
[ Navbar ]
┌─────────────────────────────────────────────────────────┐  Hero full-height tối
│                                                         │
│    "Skylaria là câu chuyện của những bạn trẻ           │
│     muốn thay đổi cách nhìn về rác thải nhựa."        │
│                                                         │
│    [↓ Cuộn xuống]                                      │
└─────────────────────────────────────────────────────────┘

┌───────────┬───────────┬───────────┬───────────┐  Team Grid — 4 cột desktop
│  [Avatar] │  [Avatar] │  [Avatar] │  [Avatar] │  (→ 2 cột mobile)
│  Tên TM   │  Tên TM   │  Tên TM   │  Tên TM   │
│  Role     │  Role     │  Role     │  Role     │
└───────────┴───────────┴───────────┴───────────┘

Contact section:
[ 📘 Facebook ]  [ 📸 Instagram ]  [ ✉️ Email ]   (icons + links)
```
- Social links cũng có trong Footer (cả hai)

---

## 🔩 Component Notes

| Component | Specs |
|---|---|
| **Orb animation** | Float keyframe 4s, orbit-rings rotate 20-30s |
| **Particle canvas** | 80 dots, rgba(120,200,100, 0.1-0.3), drift slow |
| **Video card** | 16:9 thumb, hover play btn glow, tag badge top-right |
| **Blog card** | `break-inside: avoid`, masonry 2 col, compact spacing |
| **Team avatar card** | Hình vuông, avatar tròn centered, tên + role bên dưới |
| **Stats counter** | Count-up animation `whileInView` |
| **Tab panel (Plastics)** | `AnimatePresence` fade khi chuyển tab |
| **Mobile nav** | Hamburger → dropdown bên dưới navbar, không drawer |

---

## 📐 Spacing & Grid

```
Max-width container:  1280px
Horizontal padding:   clamp(1.5rem, 5vw, 3rem)
Section padding-y:    4rem desktop / 2.5rem mobile
Card gap:             1rem–1.25rem
```

---

## 📋 Content cần chuẩn bị trước khi implement

> Đây là những gì nhóm cần cung cấp để AI implement đúng spec:

| Trang | Content cần có |
|---|---|
| `/` Hero | Tagline chính thức của **Skylaria** (thay mock "Hiểu nhựa. Hành động đúng.") |
| `/` Stats | 4 con số thực tế có nguồn (tấn/năm, tỷ lệ tái chế, v.v.) |
| `/` Why | 3 bullet points lý do tại sao quan trọng + ảnh/illustration |
| `/recycle` | YouTube video IDs thực khi có video |
| `/blog` | Ít nhất 4-6 bài MDX để grid không trống |
| `/about` | Hero quote mission statement · Tên/role/bio/ảnh 4 thành viên |
| `/blog/[slug]` | Bài viết đủ để chốt layout detail |
| **Global** | Logo SVG · Favicon · OG image · Link Facebook/Instagram/Email |

---

## ✅ Tóm tắt quyết định đã chốt

- [x] Vibe: Interactive Museum, dark mode
- [x] `/` Hero: Left text + floating orb animation
- [x] `/` Stats: 4 số amber glow, dark green bg
- [x] `/` Plastics: Tab panel (7 tabs)
- [x] `/` Why: 2-col text + illustration
- [x] `/` CTA: 3 cards nhỏ (recycle, blog, about)
- [x] `/recycle`: Filter trong hero + 3-col grid
- [x] `/blog`: Masonry 2 cột, compact
- [x] `/blog/[slug]`: Chờ content thực
- [x] `/about`: Hero fullscreen + team 4-col grid + contact section
- [x] Navbar: Logo trái · Links giữa · CTA phải · Mobile dropdown
- [x] Animation: Framer Motion `whileInView` fade+slide 20px
- [x] Dark bg rhythm: `#060e08` chính, `#0a160a`/`#0d1a0e` xen kẽ
