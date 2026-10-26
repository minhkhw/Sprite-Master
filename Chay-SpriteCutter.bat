@echo off
:: // [Khởi Động Server] Chạy HTTP server nội bộ tại cổng 8123 và mở trình duyệt
cd /d D:\TEST
start "" http://127.0.0.1:8123
python -m http.server 8123 --bind 127.0.0.1
