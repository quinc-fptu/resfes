# Tài liệu Đặc tả Kỹ thuật & Hướng dẫn Lập trình Hệ thống WebAR

Tài liệu này đóng vai trò là bản thiết kế kỹ thuật (technical blueprint) để lập trình tính năng **WebAR** trong Next.js cho dự án **Skylaria (ResFes)**. 

Hệ thống sẽ tích hợp **MindAR.js** (để tracking hình ảnh/sticker điểm neo) kết hợp với **A-Frame** (để dựng hình và hiển thị thông tin 3D/2D bo góc trực quan ngay trên camera).

---

## 1. Kiến trúc Công nghệ (Tech Stack & Libraries)

*   **MindAR (Image Tracking)**: Dùng để nhận diện hình ảnh sticker điểm neo đã được biên dịch trước thành file `.mind`.
*   **A-Frame (WebXR framework)**: Thư viện khai báo thẻ HTML giúp dễ dàng định hình các khung chữ nhật ảo bo góc, icon 2D, mô hình 3D trong không gian ba chiều.
*   **Next.js API & React State**: Điều phối luồng dữ liệu (mã nhựa 1, 2, 5) để hiển thị nội dung động tương ứng trên AR.

---

## 2. Phân rã Kỹ thuật cho 5 Cấu phần AR trên Màn hình

Để vẽ các khung chữ nhật bo góc và nội dung bay lơ lửng xung quanh chai nước trong không gian 3D, chúng sẽ sử dụng cấu trúc phần tử ảo `<a-entity>` hoặc phẳng `<a-plane>` được tính toán tọa độ tương đối so với sticker điểm neo.

### Cấu trúc dữ liệu mẫu (JSON State) để cấp cho AR
```typescript
interface ARContent {
  plasticCode: string; // "PETE 1", "HDPE 2", "PP 5"
  decompositionTime: string; // "450 năm", "100 năm",...
  reuseStatus: boolean; // true (✓) hoặc false (✗)
  reuseReason: string[]; // ["Không thôi nhiễm độc tố", "Dễ lau chùi"]
  recycleItems: { id: string; name: string; imgUrl: string }[];
  disposeInstructions: string[]; // ["Rửa sạch chai", "Bóp dẹp vỏ"]
}
```

### Chi tiết cách code các khung giao diện AR:

#### ① Khung loại nhựa (Plastic Info Card)
*   **Cách vẽ**: Dùng một `<a-plane>` làm nền thẻ (chọn màu kính mờ nửa trong suốt).
*   **Nội dung**:
    *   Thêm một `<a-image>` hiển thị icon tam giác mã nhựa (PET, HDPE, PP).
    *   Thêm `<a-text>` hoặc thực hiện render chữ tiếng Việt bằng các thẻ văn bản 3D để hiển thị: `Tên loại nhựa` và `Thời gian phân hủy`.
*   **Tọa độ**: Đặt ở phía trên cùng của điểm neo (ví dụ: `position="0 1.2 0"`).

#### ② Khung Tái sử dụng (Reuse Card)
*   **Cách vẽ**: Một `<a-plane>` góc bên trái của chai nước.
*   **Nội dung**:
    *   Icon reuse xoay chiều.
    *   Huy hiệu Status: vẽ một `<a-circle>` màu xanh lá chứa dấu tick `✓` (nếu `reuseStatus: true`) or màu đỏ chứa dấu `✗` đè nhẹ lên góc icon reuse.
    *   Văn bản text hiển thị các lý do (bullet points) giải thích khả năng tái chế.

#### ③ Khung Tái chế (Recycle Card)
*   **Cách vẽ**: Khung chữ nhật nằm ở phía dưới hoặc bên phải.
*   **Hiển thị danh sách sản phẩm**:
    *   Bên dưới khung chính, sinh ra các `<a-plane>` phụ hình vuông bo tròn (sử dụng thuộc tính `material="src: #id-anh; border-radius: 0.1"` hoặc map texture).
    *   Mỗi ô vuông chứa ảnh sản phẩm thủ công (DIY) gợi ý từ loại nhựa đó.
    *   *Tính năng tương tác*: Gán sự kiện click `raycaster` vào từng ô để phóng to hoặc hiển thị thông tin sản phẩm.

#### ④ Khung Vứt bỏ (Dispose Card)
*   **Cách vẽ**: Một `<a-plane>` nằm ở góc dưới cùng bên trái.
*   **Nội dung**:
    *   Icon vứt rác chuẩn và text "Dispose/Vứt rác".
    *   Sử dụng các thẻ chữ 3D hiển thị gạch đầu dòng hướng dẫn làm sạch và bỏ đúng thùng.

#### ⑤ Nút Tìm hiểu thêm (Learn More Button)
*   **Cách vẽ**: Một nút phẳng dạng 3D nổi hẳn lên phía trước mặt người dùng (`position="0 -0.8 0.2"`).
*   **Sự kiện click**:
    ```javascript
    document.querySelector('#learn-more-btn').addEventListener('click', () => {
        window.location.href = `/recycle/${plasticCode}`;
    });
    ```

---

## 3. Khung Mã nguồn Skeleton (Next.js + MindAR + A-Frame)

Dưới đây là đoạn code khung (Skeleton Code) giúp bạn bắt đầu tích hợp:

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

export default function ARScannerPage() {
  const [arLoaded, setArLoaded] = useState(false);
  const sceneRef = useRef<any>(null);
  const [targetPlastic, setTargetPlastic] = useState('PETE 1');

  useEffect(() => {
    return () => {
      if (sceneRef.current && sceneRef.current.systems && sceneRef.current.systems.mindarImageSystem) {
        sceneRef.current.systems.mindarImageSystem.stop();
      }
    };
  }, [arLoaded]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Script 
        src="https://aframe.io/releases/1.2.0/aframe.min.js" 
        onLoad={() => {
          const mindarScript = document.createElement('script');
          mindarScript.src = "https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image-aframe.prod.js";
          mindarScript.onload = () => setArLoaded(true);
          document.head.appendChild(mindarScript);
        }}
      />

      {arLoaded ? (
        <a-scene 
          ref={sceneRef}
          mindar-image="imageTargetSrc: /assets/targets.mind; autoStart: true; showLoading: true;" 
          color-space="sRGB" 
          renderer="colorManagement: true, physicallyCorrectLights" 
          vr-mode-ui="enabled: false" 
          device-orientation-permission-ui="enabled: false"
          style={{ width: '100%', height: '100%' }}
        >
          <a-assets>
            <img id="icon-pet" src="/assets/icons/pet1.png" />
            <img id="icon-reuse" src="/assets/icons/reuse.png" />
            <img id="icon-recycle" src="/assets/icons/recycle.png" />
            <img id="icon-dispose" src="/assets/icons/dispose.png" />
            <img id="diy-product-1" src="/assets/diy/pot.jpg" />
          </a-assets>

          <a-camera position="0 0 0" look-controls="enabled: false" raycaster="objects: .clickable" cursor="fuse: false; rayOrigin: mouse"></a-camera>

          {/* ĐIỂM NEO SỐ 0: Chai PETE 1 */}
          <a-entity mindar-image-target="targetIndex: 0">
            <a-plane position="0 0.8 0" width="1.2" height="0.4" color="#1e293b" opacity="0.85">
              <a-image src="#icon-pet" position="-0.4 0 0.01" width="0.25" height="0.25"></a-image>
              <a-text value="PETE 1\nPhan huy: 450 nam" color="#ffffff" align="left" width="2" position="-0.2 0 0.01"></a-text>
            </a-plane>

            <a-plane position="-0.8 0.2 0" width="0.7" height="0.5" color="#1e293b" opacity="0.85">
              <a-image src="#icon-reuse" position="-0.25 0.15 0.01" width="0.15" height="0.15"></a-image>
              <a-text value="X" color="#ef4444" position="-0.25 0.15 0.02" width="2" align="center"></a-text>
              <a-text value="Tai Su Dung\n- Khong nen tai dung nhieu lan\n- De bi nhiem hoa chat" color="#cbd5e1" width="1.2" position="-0.3 -0.1 0.01"></a-text>
            </a-plane>

            <a-plane position="0.8 0.2 0" width="0.7" height="0.5" color="#1e293b" opacity="0.85">
              <a-image src="#icon-recycle" position="-0.25 0.15 0.01" width="0.15" height="0.15"></a-image>
              <a-text value="✓" color="#10b981" position="-0.25 0.15 0.02" width="2" align="center"></a-text>
              <a-text value="Tai Che: Co\nSan pham goi y:" color="#cbd5e1" width="1.2" position="-0.3 -0.1 0.01"></a-text>
              <a-plane position="0 -0.4 0.01" width="0.2" height="0.2" src="#diy-product-1" class="clickable"></a-plane>
            </a-plane>

            <a-plane position="-0.8 -0.5 0" width="0.7" height="0.5" color="#1e293b" opacity="0.85">
              <a-image src="#icon-dispose" position="-0.25 0.15 0.01" width="0.15" height="0.15"></a-image>
              <a-text value="Vut Rac\n- Suc sach nuoc\n- Bop dep chai" color="#cbd5e1" width="1.2" position="-0.3 -0.1 0.01"></a-text>
            </a-plane>

            <a-plane id="learn-more-btn" class="clickable" position="0 -0.8 0.1" width="0.8" height="0.2" color="#10b981">
              <a-text value="TIM HIEU THEM" color="#0f172a" align="center" width="2" position="0 0 0.01"></a-text>
            </a-plane>
          </a-entity>
        </a-scene>
      ) : (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff' }}>
          Đang khởi tạo camera AR...
        </div>
      )}
    </div>
  );
}
```

---

## 4. Hướng dẫn Tối ưu & Tích hợp vào Next.js

1.  **Lưu trữ Assets**: Đặt các icon vào trong thư mục `/public/assets/icons/`.
2.  **Định dạng văn bản**: Font chữ mặc định của A-Frame (`a-text`) không hỗ trợ tiếng Việt có dấu trực tiếp. Nhóm nên sử dụng chữ không dấu hoặc tải file font tiếng Việt định dạng `.fnt` và `.png` vào asset.
3.  **Biên dịch Sticker (.mind)**: Sử dụng công cụ **MindAR Image Target Compiler** trực tuyến để tải lên 3 hình ảnh sticker đại diện và xuất ra file `targets.mind` lưu trong thư mục `/public/assets/`.

---

## 5. Chi tiết Đặc tả Công nghệ (Tech Spec Detail)

*   **A-Frame v1.2.0 (CDN)**: `https://aframe.io/releases/1.2.0/aframe.min.js`
*   **MindAR v1.1.4 (CDN)**: `https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image-aframe.prod.js`
*   **Xung đột SSR (Next.js)**: Bắt buộc import component AR thông qua `dynamic` với `ssr: false` để tránh crash khi build trên Cloudflare.

---

## 6. Đặc tả Kỹ thuật Tích hợp API Gemini 1.5 Flash (Chế độ quét nhãn thường)

### A. Next.js API Route (`/src/app/api/classify/route.ts`)
```typescript
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || '');

export async function POST(request: Request) {
  try {
    const { imageBase64 } = await request.json();
    if (!imageBase64) return NextResponse.json({ error: 'Thiếu ảnh' }, { status: 400 });

    const imagePart = {
      inlineData: {
        data: imageBase64.split(',')[1],
        mimeType: 'image/jpeg',
      },
    };

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Phân tích nhãn chai và xác định mã nhựa tái chế 1-7 (PETE, HDPE, PVC, LDPE, PP, PS, OTHER). Trả về JSON: {"detected": true/false, "plastic_code": 1-7, "name": "PETE", "confidence": 0.9, "reason": "Lý do..."}`;

    const result = await model.generateContent([prompt, imagePart]);
    const responseText = result.response.text().trim();
    return NextResponse.json(JSON.parse(responseText));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

### B. Hàm Frontend chụp và gửi ảnh
```typescript
const scanPlasticLabel = async (canvasElement: HTMLCanvasElement) => {
  const imageBase64 = canvasElement.toDataURL('image/jpeg', 0.8);
  const response = await fetch('/api/classify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageBase64 }),
  });
  return await response.json();
};
```

---

## 7. Cách thức Tích hợp & Chuyển đổi 2 Chế độ Quét (Dual-Mode Switch)

```tsx
// Đoạn code React toggle switch nằm ở phần 7 như đã trình bày ở trên
```

---

## 8. Đánh giá So sánh 2 Phương án Nhận diện & Trình diễn

Dưới đây là bảng phân tích chi tiết Ưu & Nhược điểm (Pros & Cons) của hai phương án quét nhãn để lập trình viên lựa chọn cấu hình:

### PHƯƠNG ÁN A: Quét Ký hiệu Nhựa 1-7 Gốc (Sử dụng Cloud AI)
*Người dùng hướng camera và chụp ảnh ký hiệu tam giác tái chế gốc in/dập nổi trực tiếp trên vỏ chai nước.*

*   **Ưu điểm (Pros):**
    *   **Thực tế 100%**: Áp dụng rộng rãi cho mọi chai nhựa ngoài đời thực. Người dùng tự mang chai từ nhà đến triển lãm là quét được ngay.
    *   **Giữ nguyên thẩm mỹ**: Không yêu cầu dán thêm bất kỳ nhãn phụ hay sticker nào gây mất mỹ quan chai gốc.
*   **Nhược điểm (Cons):**
    *   **Độ ổn định trung bình**: Ký hiệu nhựa gốc thường trong suốt, nhỏ và bị biến dạng gồ ghề. Cực kỳ nhạy cảm với ánh sáng phản quang tại phòng thi.
    *   **Độ trễ phản hồi**: Tốn khoảng 1-2 giây để gửi ảnh lên server phân tích qua API.

---

### PHƯƠNG ÁN B: Quét Sticker Điểm Neo dán sát cạnh Ký hiệu Gốc (Sử dụng Client AR)
*Dán một nhãn sticker thương hiệu có độ tương phản cao ngay bên cạnh ký hiệu nhựa gốc trên các chai mẫu đặt tại bàn demo.*

*   **Ưu điểm (Pros):**
    *   **Độ tin cậy tuyệt đối (100%)**: Camera nhận diện sticker tức thì, mô hình AR bám cực chắc lên vỏ chai không bị trôi hay giật lag.
    *   **Tốc độ tức thời (Real-time)**: Xử lý trực tiếp ngay tại trình duyệt client, không mất thời gian chờ gửi ảnh lên server.
*   **Nhược điểm (Cons):**
    *   **Tốn công chuẩn bị vật lý**: Bắt buộc phải chuẩn bị in ấn và dán nhãn thủ công lên các chai nước mẫu trước buổi triển lãm.
    *   **Hạn chế không gian**: Chỉ quét được các chai mẫu có dán sticker tại quầy triển lãm, không quét được chai nước ngẫu nhiên ngoài đời.
