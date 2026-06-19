# ResFes — Project Website Breakdown

## Tổng quan

**ResFes Project Website** là hub nội dung trung tâm của dự án — nơi người dùng tìm hiểu về rác thải nhựa, xem video hướng dẫn tái chế, đọc bài viết môi trường, và biết thêm về nhóm thực hiện.

---

## Sitemap

```
/                    ← Trang chủ (Hero + Giới thiệu dự án)
/recycle             ← Sản phẩm tái chế (video theo từng loại nhựa)
/blog                ← Bài viết về môi trường, nhựa
/about               ← Thành viên + liên hệ
```

---

## Chi tiết từng trang

### `/` — Trang chủ

| Section | Nội dung |
|---|---|
| **Hero** | Tagline dự án + ảnh/animation nền + CTA \"Khám phá\" |
| **Vấn đề** | Con số rác thải nhựa (số liệu thực tế, infographic nhỏ) |
| **Các loại nhựa** | Grid 7 loại nhựa có thể scroll — click → popup thông tin nhanh |
| **Tại sao quan trọng** | Đoạn văn ngắn + visual impact |
| **CTA cuối trang** | Dẫn đến /recycle và /blog |

---

### `/recycle` — Sản phẩm tái chế

| Thành phần | Mô tả |
|---|---|
| **Filter bar** | Lọc theo loại nhựa: All / PET / HDPE / PP / PS / PVC / LDPE / Other |
| **Video grid** | Mỗi card: thumbnail YouTube + tên sản phẩm tái chế + tag loại nhựa |
| **Card hover** | Hiển thị nút Play + mô tả ngắn |
| **Modal video** | Click card → mở modal YouTube embed (không rời trang) |

---

### `/blog` — Bài viết

| Thành phần | Mô tả |
|---|---|
| **Hero nhỏ** | Tiêu đề section + mô tả ngắn |
| **Tag filter** | Tái chế / Tái sử dụng / Môi trường / Nhựa |
| **Bài viết grid** | Mỗi card: thumbnail + tiêu đề + ngày đăng + tag + đoạn trích |
| **Trang bài viết** | Layout đọc bài chuẩn: heading, nội dung, ảnh minh họa |

---

### `/about` — Về chúng tôi

| Section | Nội dung |
|---|---|
| **Giới thiệu dự án** | Câu chuyện, mục tiêu, ý nghĩa |
| **Thành viên** | Grid: ảnh + tên + vai trò trong nhóm |
| **Liên hệ / Mạng xã hội** | Icons link ra Facebook, Instagram, email (nếu có) |

---

## Tech Stack ✅ Đã chốt

| Layer | Công nghệ | Lý do chọn |
|---|---|---|
| **Framework** | Next.js (App Router) | SSG sẵn, routing chuẩn, deploy Cloudflare Pages tốt |
| **Styling** | Tailwind CSS v4 | Utility-first, nhanh khi build UI |
| **Animation** | Framer Motion | Dễ dùng với React, page transition + hover effect |
| **Video** | YouTube embed (iframe trong modal) | Miễn phí, CDN YouTube, không host video trong repo |
| **Blog content** | MDX files trong repo | Viết Markdown, quản lý qua Git, frontmatter cho tag/date |
| **Data (nhựa)** | JSON files tĩnh trong repo | 7 loại nhựa không thay đổi thường xuyên |
| **Auth** | Không cần | Website read-only, nội dung quản lý qua Git |
| **Deploy** | Cloudflare Pages | Free tier tốt, CDN toàn cầu |

### Design Decisions ✅

| Quyết định | Lựa chọn |
|---|---|
| **Ngôn ngữ nội dung** | Tiếng Việt |
| **Color mode** | Light mode mặc định |
| **Primary color** | Xanh lá (Green) — phù hợp theme môi trường |
| **Responsive** | Fully responsive — cả mobile lẫn desktop/màn hình triển lãm |

---

## Dữ liệu cần chuẩn bị

### 7 loại nhựa (JSON data)

| Ký hiệu | Tên | Phân hủy | Reuse | Recycle |
|---|---|---|---|---|
| #1 PET | Polyethylene Terephthalate | 450 năm | Hạn chế (1–2 lần) | Có |
| #2 HDPE | High-Density Polyethylene | 500 năm | Có | Có |
| #3 PVC | Polyvinyl Chloride | 500+ năm | Không | Rất khó |
| #4 LDPE | Low-Density Polyethylene | 500 năm | Có | Hạn chế |
| #5 PP | Polypropylene | 20–30 năm | Có | Có |
| #6 PS | Polystyrene | 500 năm | Không | Khó |
| #7 Other | Mixed/Other | Varies | Không | Không |

### Nội dung video `/recycle`
- Cần tối thiểu **3–5 video** mỗi loại nhựa phổ biến (PET, HDPE, PP)
- Upload lên YouTube → lấy embed ID vào data file

### Nội dung blog `/blog`
- Cần tối thiểu **4–6 bài viết** ban đầu để grid không trống
- Có thể viết bằng Markdown, lưu trong `/content/blog/`

---

## Skills AgentKit cho dự án

| Skill | Áp dụng vào |
|---|---|
| `design-taste-frontend` | UI guidelines, color, spacing toàn site |
| `premium-liquid-glassmorphism` | Card effects, hero section, modal |
| `canvas-ambient-spark-effects` | Particle background trang chủ |
| `ui-page` + `ui-component` | Scaffold nhanh các trang và component |
| `impeccable` | Audit & polish visual trước khi deploy |

---

## Giai đoạn phát triển

```
Phase 1 — Foundation
  → Scaffold Next.js project + Tailwind CSS v4
  → Design system: màu, font, tokens, layout
  → Component cơ bản: Navbar, Footer, Card

Phase 2 — Các trang chính
  → Trang chủ (/)
  → Trang /recycle + filter + modal video
  → Trang /about

Phase 3 — Blog
  → Setup MDX hoặc Notion API
  → Trang /blog (grid + filter)
  → Trang bài viết đơn

Phase 4 — Polish & Deploy
  → Animation, hover effects, micro-interactions
  → Mobile responsive toàn site
  → SEO: meta tags, OG image, sitemap
  → Deploy lên Vercel
```
