# 📁 DANH MỤC VÀ TÁC DỤNG CÁC TỆP TRONG DỰ ÁN SPRITE CUTTER STUDIO

Toàn bộ các tệp mã nguồn và tệp bundle trong dự án đã được đổi tên rõ nghĩa bằng tiếng Việt kèm các chú thích trọng tâm (`//`) ở đầu mỗi tệp.

---

## 🚀 1. Tệp Khởi Động & Cấu Hình Gốc (Root)

| Tên Tệp | Vai Trò & Tác Dụng Trọng Tâm |
| :--- | :--- |
| **`logo-crystal-gem.png`** | Logo thương hiệu chính: Viên ngọc game (Crystal Gem) đa sắc phát sáng hào quang sang trọng. |
| **`logo-crystal-gem.svg`** | Phiên bản vector SVG độ nét cao của logo Crystal Gem. |
| **`Chay-SpriteCutter.bat`** | File batch kích hoạt nhanh server HTTP cục bộ tại cổng `8123` và tự động mở trình duyệt web. |
| **`index.html`** | Trang giao diện chính của ứng dụng, chứa cấu trúc HTML tĩnh, thẻ meta SEO và nạp các tệp script điều khiển. |
| **`404.html`** | Tệp điều hướng dự phòng (fallback) giúp trang web hoạt động trơn tru trên GitHub Pages khi F5/refresh. |
| **`.nojekyll`** | Tệp cấu hình GitHub Pages để ngăn Jekyll bỏ qua thư mục `_next/`. |
| **`.gitignore`** | Tệp cấu hình Git để không đẩy các file rác/hệ điều hành lên repository. |
| **`cong-cu-mo-rong-pro-tools.js`** | Tiện ích mở rộng Pro Tools: Cung cấp phím tắt (`M` để gộp), công cụ quét chọn vùng (Box Selection) và chia lưới tự động (Grid Slicer). |
| **`favicon.ico`** | Biểu tượng icon hiển thị trên tab trình duyệt web. |
| **`og.png`** | Hình ảnh xem trước (OpenGraph) khi chia sẻ đường link trang web. |
| **`robots.txt`** | Tệp hướng dẫn cho các công cụ tìm kiếm (Search Engines) lập chỉ mục. |
| **`sitemap.xml`** | Sơ đồ website phục vụ tối ưu hóa tìm kiếm (SEO). |

---

## 🎨 2. Giao Diện & Kiểu Dáng (CSS)

| Tên Tệp | Vị Trí | Tác Dụng Trọng Tâm |
| :--- | :--- | :--- |
| **`retro-gamedev.css`** | Thư mục gốc | **Hệ thống giao diện Retro Pixel Art & Game Dev:** Nền Cyber Dark, lưới grid neon, font chữ arcade, hiệu ứng nút bấm nổi 3D và các khung viền phát sáng. |
| **`giao-dien-chinh.css`** | `_next/static/css/` | Toàn bộ định kiểu CSS (Tailwind CSS), bảng màu sáng/tối và bố cục responsive. |

---

## ⚙️ 3. Các Mô-đun & Thư Viện Cốt Lõi (`_next/static/chunks/`)

| Tên Tệp Mới | Tên Cũ Trước Khi Đổi | Tác Dụng Trọng Tâm |
| :--- | :--- | :--- |
| **`webpack-runtime.js`** | `webpack-735a485ebb543158.js` | Bộ nạp (loader) quản lý việc nạp động các tệp JavaScript và Web Worker. |
| **`main-app-entry.js`** | `main-app-70f3fd67bd0c0bda.js` | Điểm khởi tạo và bootstrap ứng dụng Next.js trên trình duyệt. |
| **`thu-vien-react-core.js`** | `4bd1b696-3abbb802821b0a68.js` | Thư viện nền tảng React & ReactDOM quản lý cây component và Virtual DOM. |
| **`nextjs-app-router.js`** | `684-78795177b2b70218.js` | Bộ định tuyến (Router) xử lý điều hướng trang và quá trình hydration client. |
| **`thu-vien-auth-supabase.js`**| `44530001-eb99c46e027ca92b.js` | Thư viện client xử lý phiên làm việc người dùng và đồng bộ hóa tài khoản. |
| **`giao-dien-theme-toast.js`** | `486-0dc208e3a42e42a2.js` | Quản lý chuyển đổi giao diện Sáng / Tối (Dark Mode) và popup thông báo (Toast). |
| **`bieu-tuong-lucide-icons.js`** | `241-f53b689d3111ac70.js` | Chứa toàn bộ các biểu tượng đồ họa SVG (Lucide Icons) trên giao diện. |
| **`thanh-phan-ui-radix.js`** | `866-be52b020ea79fbdd.js` | Thư viện các thành phần giao diện tương tác: Dialog, Dropdown, Menu, Slider, Tooltip. |
| **`kiem-tra-du-lieu-zod.js`** | `896-dc197d219ff62028.js` | Bộ kiểm tra tính hợp lệ của dữ liệu (Zod Schema) cho các tùy chọn cắt và upload ảnh. |
| **`worker-thuat-toan-cat-sprite.js`** | `336.0b04152452b15916.js` | **Web Worker chạy nền:** Thuật toán phát hiện màu nền trong suốt và tự động bóc tách từng sprite riêng lẻ. |
| **`polyfills-tuong-thich.js`** | `polyfills-42372ed130431b0a.js` | Mã hỗ trợ tương thích các hàm JavaScript trên các trình duyệt cũ. |

---

## 🖥️ 4. Mã Nguồn Ứng Dụng & Các Trang (`_next/static/chunks/app/`)

| Tên Tệp Mới | Tên Cũ Trước Khi Đổi | Tác Dụng Trọng Tâm |
| :--- | :--- | :--- |
| **`trinh-chinh-sua-sprite.js`** | `page-b2beb1051f2875f6.js` | **Trang chính (Editor Studio):** Canvas vẽ, cắt đa giác/hộp, điều khiển phóng to thu nhỏ, lịch sử hoàn tác (Undo/Redo) và nút xuất file ZIP/PNG. |
| **`layout-khung-trang.js`** | `layout-c7962a54d248c1e9.js` | Khung sườn chung cho toàn bộ trang: Header, Footer bản quyền, ThemeProvider và cấu hình SEO. |
| **`about/trang-gioi-thieu.js`** | `page-26bf1eb732a38e2e.js` | Trang thông tin giới thiệu về ứng dụng. |
| **`contact/trang-lien-he.js`** | `page-5d7c5a0ea237dbc1.js` | Trang thông tin liên hệ và gửi phản hồi. |
| **`faq/trang-cau-hoi-thuong-gap.js`** | `page-7b6b622bd3e34b5a.js` | Trang giải đáp các câu hỏi thường gặp khi sử dụng công cụ. |
| **`how-to-use/trang-huong-dan-su-dung.js`** | `page-49a558b4f5ee69e4.js` | Trang hướng dẫn các bước tải ảnh và thao tác cắt sprite. |
| **`privacy-policy/trang-chinh-sach-bao-mat.js`** | `page-98bf21c901501a6e.js` | Trang quy định chính sách bảo mật dữ liệu. |
| **`terms-of-service/trang-dieu-khoan-dich-vu.js`** | `page-3cc53692575198b4.js` | Trang điều khoản và thỏa thuận dịch vụ. |
