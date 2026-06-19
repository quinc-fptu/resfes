# Skylaria — Implementation Plan

> Cập nhật: 2026-06-19 (Sau khi tích hợp Lisse Squircle & Lorem Ipsum)

---

## 🎨 Nguyên tắc Thiết kế & Kỹ thuật Core

1. **Deterministic Typography & Contrast**:
   * Font stack: `Outfit` (Headlines) & `DM Sans` / `Satoshi` (Body).
   * Spacing headlines: `text-4xl md:text-6xl tracking-tight leading-none`.
2. **Color Calibration**:
   * Base background: `#060e08` (off-black đậm sắc xanh lục bảo nhẹ).
   * Accent: Emerald/Forest Green & Amber (Saturation < 80%).
3. **Viewport Stability & Layout**:
   * Sử dụng `min-h-[100dvh]` thay vì `h-screen`.
   * Layout Asymmetric (Bento Grid, Masonry 2 cột) và offset overlap.
4. **Lisse Squircle Corners**:
   * Sử dụng hook `useSmoothCorners` để lấy hình dáng squircle mềm mịn kiểu Figma cho góc dưới của Navbar.
   * Che viền thừa bằng các eraser khối màu `#060e08` z-30 để tránh mẻ góc sub-pixel.

---

## 📅 Tiến độ Thực hiện

### Phase 1 — Foundation & Core Layout (Hoàn thành)
- [x] globals.css — Tích hợp biến HSL, class liquid glass và phông chữ Outfit.
- [x] AmbientCanvas.tsx — Tải các hạt stardust lục bảo bay trôi nhẹ nhàng.
- [x] Redesign Navbar & Footer — Bố cục 3 phần bất đối xứng, chỉnh touch target di động >= 44px, sửa ARIA.
- [x] Tích hợp Lisse Squircle corners trên Navbar, overlap 1px để triệt tiêu lỗi răng cưa.
- [x] Chuyển đổi toàn bộ text tĩnh trên trang chính sang dạng **Lorem Ipsum** theo yêu cầu của người dùng.

### Phase 2 — Inner Pages & Content Integration (Chờ dữ liệu thực tế)
- [ ] Cập nhật tệp tin dữ liệu thực tế (`plastics.json`, `videos.json`, `team.json`).
- [ ] Hoàn thiện giao diện chi tiết các trang con `/recycle`, `/blog`, `/about` khi có dữ liệu chính thức.

### Phase 3 — Deployment (Chờ kết nối Git)
- [ ] Đẩy code lên GitHub (`git push origin main`).
- [ ] Cấu hình Deploy dự án Next.js lên Cloudflare Pages.
