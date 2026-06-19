# Skylaria — Context Transfer Snapshot

> Cập nhật: 2026-06-19 (Sau khi tích hợp Lisse Squircle & Lorem Ipsum)
> Tên dự án chính thức: **Skylaria** (ResFes là tên thư mục gốc / cuộc thi).

---

## 📂 Trạng thái Thư mục & Git

* **Project Root**: `c:\Users\Admin\OneDrive\Desktop\ResFes\` (Đã phẳng hóa cấu trúc, loại bỏ thư mục `/website` lồng nhau).
* **Git Status**: Đã khởi tạo Git local, cấu hình loại trừ `/temp/`, `/headroom_memory.db`, và `/.codegraph/` trong `.gitignore`. Đã commit toàn bộ mã nguồn hiện tại lên nhánh `main`.
* **Remote**: `https://github.com/quinc-fptu/resfes.git` (Sẵn sàng push).

---

## 🛠️ Trạng thái Implement Code & UI

1. **globals.css & Ambient Effect**:
   * Hệ màu Dark Mode (`#060e08` làm nền).
   * Tích hợp canvas hiệu ứng hạt stardust bay trôi chậm (`AmbientCanvas.tsx`).
2. **Navbar & Lisse Smooth Corners**:
   * Tải và tích hợp thành công thư viện `@lisse/react`.
   * Refactor từ component `<SmoothCorners>` sang hook `useSmoothCorners` để tránh các thẻ wrapper div làm vỡ layout flex của Tailwind.
   * Cải tiến phần tai thỏ (wings): Di chuyển các khối SVG lồi ra ngoài lớp bị `clip-path`, tăng kích thước các khối che viền lên `3px` và overlap `1px` để triệt tiêu hoàn toàn lỗi hiển thị răng cưa/mẻ góc sub-pixel.
3. **Lorem Ipsum Content**:
   * Đã thay thế toàn bộ nội dung text hiển thị (headings, descriptions, copyright, CTAs) trong các file `HeroSection.tsx`, `CtaSection.tsx`, và `Footer.tsx` thành dạng **Lorem Ipsum** theo yêu cầu của người dùng.
4. **Data Skeletons**:
   * Các file data tĩnh (`plastics.json`, `videos.json`, `team.json`) tạm thời để mảng rỗng `[]` để chờ cập nhật dữ liệu thực tế từ nhóm nội dung.

---

## 🚀 Các bước tiếp theo

1. **Git Push**: Đẩy mã nguồn hiện tại lên repository từ xa (`git push origin main`) sau khi được người dùng xác nhận.
2. **Cập nhật Content thực tế**: Nhận dữ liệu chính thức (taglines, plastics detail, video YouTube IDs, thành viên nhóm) để điền vào các file JSON trong `src/data/`.
3. **Phát triển Trang con**: Hoàn thiện các giao diện chi tiết cho `/recycle`, `/blog`, và `/about` khi có dữ liệu chính thức tương ứng.
