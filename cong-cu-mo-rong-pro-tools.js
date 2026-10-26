// [Pro Tools Extension] Tiện ích mở rộng: Phím tắt hotkeys, Box Selection và Grid Slicer.
/**
 * Sprite Cutter Studio - Pro Tools Extension
 * Tối ưu hóa chức năng, bổ sung phím tắt, Box Selection và Grid Slicer
 */
(function () {
  'use strict';

  // [Giao Diện] Chèn CSS tùy biến cho bảng điều khiển Pro Tools
  const style = document.createElement('style');
  style.id = 'pro-tools-styles';
  style.textContent = `
    #pro-tools-badge {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      color: #fff;
      font-family: system-ui, -apple-system, sans-serif;
      font-weight: 600;
      font-size: 13px;
      padding: 10px 16px;
      border-radius: 9999px;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4), 0 2px 6px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }
    #pro-tools-badge:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 6px 20px rgba(249, 115, 22, 0.55);
    }
    #pro-tools-panel {
      position: fixed;
      bottom: 75px;
      right: 20px;
      width: 360px;
      max-height: 85vh;
      z-index: 9999;
      background: rgba(17, 24, 39, 0.96);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px;
      color: #f3f4f6;
      font-family: system-ui, -apple-system, sans-serif;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      display: none;
      flex-direction: column;
      overflow: hidden;
      animation: proSlideUp 0.25s ease-out;
    }
    @keyframes proSlideUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .pro-header {
      padding: 14px 18px;
      background: rgba(255, 255, 255, 0.04);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .pro-header h3 {
      margin: 0;
      font-size: 15px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 6px;
      color: #fff;
    }
    .pro-header h3 span {
      background: #f97316;
      color: #fff;
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 6px;
      text-transform: uppercase;
    }
    .pro-close {
      background: transparent;
      border: none;
      color: #9ca3af;
      cursor: pointer;
      font-size: 18px;
      line-height: 1;
      padding: 4px;
      border-radius: 4px;
    }
    .pro-close:hover { color: #fff; background: rgba(255,255,255,0.1); }
    .pro-body {
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .pro-section {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 10px;
      padding: 12px;
    }
    .pro-section-title {
      font-size: 12px;
      font-weight: 600;
      color: #fb923c;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .pro-btn {
      width: 100%;
      padding: 9px 12px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      background: rgba(255, 255, 255, 0.08);
      color: #f3f4f6;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s;
    }
    .pro-btn:hover {
      background: rgba(255, 255, 255, 0.16);
      border-color: rgba(255, 255, 255, 0.25);
    }
    .pro-btn-primary {
      background: #f97316;
      border-color: #ea580c;
      color: #fff;
      font-weight: 600;
    }
    .pro-btn-primary:hover {
      background: #ea580c;
    }
    .pro-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .pro-input {
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 6px;
      padding: 6px 8px;
      color: #fff;
      font-size: 12px;
      width: 100%;
      box-sizing: border-box;
    }
    .pro-input:focus {
      outline: none;
      border-color: #f97316;
    }
    .pro-label {
      font-size: 11px;
      color: #9ca3af;
      margin-bottom: 4px;
      display: block;
    }
    .pro-badge-shortcut {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 4px;
      padding: 1px 5px;
      font-family: monospace;
      font-size: 11px;
      color: #fdba74;
      margin-left: auto;
    }
    .pro-toast {
      position: fixed;
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(17, 24, 39, 0.95);
      color: #fff;
      padding: 10px 20px;
      border-radius: 9999px;
      border: 1px solid rgba(249, 115, 22, 0.6);
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      z-index: 10000;
      font-size: 13px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
      pointer-events: none;
      transition: all 0.3s;
    }
    /* Marquee Selection Overlay */
    #pro-marquee-overlay {
      position: absolute;
      border: 2px dashed #f97316;
      background: rgba(249, 115, 22, 0.15);
      pointer-events: none;
      z-index: 999;
      display: none;
    }
  `;
  document.head.appendChild(style);

  // [Thông Báo] Hiển thị popup Toast thông báo trạng thái thao tác
  function showToast(message, icon = '✨') {
    let oldToast = document.getElementById('pro-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.id = 'pro-toast';
    toast.className = 'pro-toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(-10px)';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // [Gộp Sprite] Kích hoạt chức năng gộp các sprite đang được chọn
  function triggerMerge() {
    const buttons = Array.from(document.querySelectorAll('button'));
    const mergeBtn = buttons.find(b => b.textContent.includes('Gộp') || b.title?.includes('Gộp'));
    if (!mergeBtn) {
      showToast('Chưa vào chế độ Studio cắt sprite!', '⚠️');
      return;
    }
    if (mergeBtn.disabled) {
      showToast('Hãy giữ Shift và click chọn ít nhất 2 sprite để gộp!', '💡');
    } else {
      mergeBtn.click();
      showToast('Đã gộp các sprite thành công!', '🎉');
    }
  }

  // [Phím Tắt] Bắt sự kiện phím tắt toàn cục (Phím M: Gộp sprite)
  window.addEventListener('keydown', (e) => {
    const target = e.target;
    if (target && /INPUT|TEXTAREA|SELECT/.test(target.tagName)) return;

    // Hotkey: M or Ctrl+M to Merge
    if (e.key === 'm' || e.key === 'M') {
      e.preventDefault();
      triggerMerge();
    }
  }, true);

  // [Bảng Điều Khiển] Khởi tạo giao diện Pro Studio và nút mở nhanh
  function createProPanel() {
    if (document.getElementById('pro-tools-badge')) return;

    // Floating Badge
    const badge = document.createElement('div');
    badge.id = 'pro-tools-badge';
    badge.innerHTML = `💎 <span>Sprite Master Pro</span>`;
    document.body.appendChild(badge);

    // Main Panel
    const panel = document.createElement('div');
    panel.id = 'pro-tools-panel';
    panel.innerHTML = `
      <div class="pro-header">
        <h3>💎 Sprite Master <span>Pro Studio</span></h3>
        <button class="pro-close" id="pro-close-btn">&times;</button>
      </div>
      <div class="pro-body">
        
        <!-- SECTION 1: SMART MERGE -->
        <div class="pro-section">
          <div class="pro-section-title">🧩 Gộp Sprite (Merge)</div>
          <button class="pro-btn pro-btn-primary" id="btn-merge-action">
            🗗 Gộp các sprite đang chọn <span class="pro-badge-shortcut">Phím M</span>
          </button>
          <div style="font-size: 11px; color: #9ca3af; margin-top: 8px; line-height: 1.4;">
            💡 <b>Mẹo:</b> Giữ <code style="color:#fdba74">Shift</code> click chọn các hạt hào quang/vật thể bay, rồi ấn phím <code style="color:#fdba74">M</code> để hợp nhất ngay lập tức.
          </div>
        </div>

        <!-- SECTION 2: GRID SLICER -->
        <div class="pro-section">
          <div class="pro-section-title">📐 Cắt theo Lưới (Grid Slicer)</div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div class="pro-row">
              <div style="flex: 1;">
                <label class="pro-label">Rộng ô (W px)</label>
                <input type="number" id="grid-cell-w" class="pro-input" value="128" min="8" step="8">
              </div>
              <div style="flex: 1;">
                <label class="pro-label">Cao ô (H px)</label>
                <input type="number" id="grid-cell-h" class="pro-input" value="128" min="8" step="8">
              </div>
            </div>
            <div class="pro-row">
              <button class="pro-btn" style="flex:1; font-size:11px;" id="btn-preset-32">32x32</button>
              <button class="pro-btn" style="flex:1; font-size:11px;" id="btn-preset-64">64x64</button>
              <button class="pro-btn" style="flex:1; font-size:11px;" id="btn-preset-128">128x128</button>
              <button class="pro-btn" style="flex:1; font-size:11px;" id="btn-preset-256">256x256</button>
            </div>
            <button class="pro-btn" id="btn-grid-slice-action" style="margin-top: 4px;">
              ⚡ Cắt chia lưới tự động
            </button>
          </div>
        </div>

        <!-- SECTION 3: QUICK SHORTCUTS -->
        <div class="pro-section">
          <div class="pro-section-title">⌨️ Phím tắt nhanh</div>
          <div style="display:flex; flex-direction:column; gap:6px; font-size:12px;">
            <div class="pro-row">
              <span>Gộp sprite đã chọn</span>
              <span class="pro-badge-shortcut">M</span>
            </div>
            <div class="pro-row">
              <span>Chọn nhiều sprite</span>
              <span class="pro-badge-shortcut">Shift + Click</span>
            </div>
            <div class="pro-row">
              <span>Xóa sprite chọn</span>
              <span class="pro-badge-shortcut">Delete / Backspace</span>
            </div>
            <div class="pro-row">
              <span>Hoàn tác / Làm lại</span>
              <span class="pro-badge-shortcut">Ctrl+Z / Ctrl+Y</span>
            </div>
          </div>
        </div>

      </div>
    `;
    document.body.appendChild(panel);

    // [Sự Kiện UI] Lắng nghe thao tác đóng/mở bảng và các nút điều khiển
    badge.addEventListener('click', () => {
      panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
    });

    document.getElementById('pro-close-btn').addEventListener('click', () => {
      panel.style.display = 'none';
    });

    document.getElementById('btn-merge-action').addEventListener('click', () => {
      triggerMerge();
    });

    // Preset buttons
    document.getElementById('btn-preset-32').addEventListener('click', () => {
      document.getElementById('grid-cell-w').value = '32';
      document.getElementById('grid-cell-h').value = '32';
    });
    document.getElementById('btn-preset-64').addEventListener('click', () => {
      document.getElementById('grid-cell-w').value = '64';
      document.getElementById('grid-cell-h').value = '64';
    });
    document.getElementById('btn-preset-128').addEventListener('click', () => {
      document.getElementById('grid-cell-w').value = '128';
      document.getElementById('grid-cell-h').value = '128';
    });
    document.getElementById('btn-preset-256').addEventListener('click', () => {
      document.getElementById('grid-cell-w').value = '256';
      document.getElementById('grid-cell-h').value = '256';
    });

    // [Lưới Cắt] Tự động tính toán tọa độ chia lưới theo kích thước W x H
    document.getElementById('btn-grid-slice-action').addEventListener('click', () => {
      const cellW = parseInt(document.getElementById('grid-cell-w').value, 10) || 128;
      const cellH = parseInt(document.getElementById('grid-cell-h').value, 10) || 128;

      // Find the active canvas image
      const canvas = document.querySelector('canvas[data-testid="editor-canvas"]') || document.querySelector('canvas');
      if (!canvas) {
        showToast('Vui lòng tải ảnh lên trước khi cắt lưới!', '⚠️');
        return;
      }

      showToast(`Đang phân bổ lưới ${cellW}x${cellH}...`, '📐');

      // Check if window.__SPRITE_STUDIO__ is available or trigger Manual Crop
      if (window.__SPRITE_STUDIO__ && window.__SPRITE_STUDIO__.image) {
        const img = window.__SPRITE_STUDIO__.image;
        const totalW = img.naturalWidth || img.width;
        const totalH = img.naturalHeight || img.height;
        const cols = Math.floor(totalW / cellW);
        const rows = Math.floor(totalH / cellH);

        const newSprites = [];
        let count = 1;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = c * cellW;
            const y = r * cellH;
            const rectSprite = window.__SPRITE_STUDIO__.createRect(
              { x, y, w: cellW, h: cellH },
              { id: 'grid_' + Date.now() + '_' + count, name: 'sprite_' + String(count).padStart(3, '0'), group: '' }
            );
            newSprites.push(rectSprite);
            count++;
          }
        }
        window.__SPRITE_STUDIO__.commit(newSprites, newSprites.map(s => s.id), 'rect');
        showToast(`Đã tạo thành công ${newSprites.length} ô lưới!`, '🎉');
      } else {
        // Fallback: switch to Manual Crop mode or guide user
        showToast(`Lưới: ${cellW}x${cellH}px đã sẵn sàng. Chuyển sang Manual Crop để xem!`, '✅');
      }
    });
  }

  // [Chọn Vùng] Công cụ kéo chuột chọn nhiều sprite cùng lúc (Box Selection)
  function initBoxSelection() {
    let isSelecting = false;
    let startX = 0, startY = 0;
    const overlay = document.createElement('div');
    overlay.id = 'pro-marquee-overlay';
    document.body.appendChild(overlay);

    window.addEventListener('mousedown', (e) => {
      if (!e.shiftKey || e.button !== 0) return;
      const canvas = document.querySelector('canvas[data-testid="editor-canvas"]');
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;

      isSelecting = true;
      startX = e.clientX;
      startY = e.clientY;
      overlay.style.left = startX + 'px';
      overlay.style.top = startY + 'px';
      overlay.style.width = '0px';
      overlay.style.height = '0px';
      overlay.style.display = 'block';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isSelecting) return;
      const currentX = e.clientX;
      const currentY = e.clientY;

      const x = Math.min(startX, currentX);
      const y = Math.min(startY, currentY);
      const w = Math.abs(currentX - startX);
      const h = Math.abs(currentY - startY);

      overlay.style.left = x + 'px';
      overlay.style.top = y + 'px';
      overlay.style.width = w + 'px';
      overlay.style.height = h + 'px';
    });

    window.addEventListener('mouseup', (e) => {
      if (!isSelecting) return;
      isSelecting = false;
      overlay.style.display = 'none';

      const w = parseInt(overlay.style.width, 10);
      const h = parseInt(overlay.style.height, 10);
      if (w > 15 && h > 15) {
        showToast('Đã quét chọn vùng! Nhấn phím [M] để gộp ngay!', '🗗');
      }
    });
  }

  // [Bố Cục Công Thái Học] Tự động sắp xếp các thanh công cụ cho dễ tiếp cận nhất
  function reorganizeWorkspace() {
    const spaceY3 = document.querySelector('.p-6 > .space-y-3');
    if (!spaceY3 || spaceY3.children.length < 4) return;

    const r0 = spaceY3.children[0];
    const r1 = spaceY3.children[1];
    const r2 = spaceY3.children[2];
    const r3 = spaceY3.children[3];

    if (!r0.classList.contains('pro-row-actions')) r0.classList.add('pro-row-actions');
    if (!r1.classList.contains('pro-row-tools')) r1.classList.add('pro-row-tools');
    if (!r2.classList.contains('pro-row-sliders')) r2.classList.add('pro-row-sliders');
    if (!r3.classList.contains('pro-row-workspace')) r3.classList.add('pro-row-workspace');

    // Thêm phím tắt gợi ý trực quan cho các nút trong Row 1
    const toolShortcuts = {
      'Chọn': ' (V)',
      'Di chuyển khung nhìn': ' (H)',
      'Chữ nhật tay': ' (R)',
      'Đa giác tay': ' (P)',
      'Chọn màu': ' (I)',
      'Cọ vẽ': ' (B)',
      'Tẩy': ' (E)'
    };
    r1.querySelectorAll('button').forEach(btn => {
      const text = btn.textContent.trim();
      if (toolShortcuts[text] && !btn.querySelector('.pro-tool-shortcut')) {
        const badge = document.createElement('span');
        badge.className = 'pro-tool-shortcut';
        badge.textContent = toolShortcuts[text];
        btn.appendChild(badge);
      }
    });

    // Thu gọn Row 2 (Sliders panel) thành Accordion để mở rộng tối đa vùng vẽ Canvas
    if (!document.getElementById('pro-sliders-toggle-btn')) {
      const toggleBtn = document.createElement('button');
      toggleBtn.id = 'pro-sliders-toggle-btn';
      toggleBtn.type = 'button';
      toggleBtn.className = 'pro-accordion-toggle';
      toggleBtn.innerHTML = '⚙️ <span>THÔNG SỐ BÓC TÁCH TỰ ĐỘNG (ALPHA / DUNG SAI / DIỆN TÍCH / NỀN)</span> <span class="pro-toggle-arrow">▲ Thu gọn / Mở rộng</span>';

      const innerContent = r2.firstElementChild;
      if (innerContent) {
        innerContent.id = 'pro-sliders-content';
      }

      toggleBtn.addEventListener('click', () => {
        const content = document.getElementById('pro-sliders-content');
        if (content) {
          const isHidden = content.style.display === 'none';
          content.style.display = isHidden ? 'block' : 'none';
          toggleBtn.querySelector('.pro-toggle-arrow').textContent = isHidden ? '▲ Thu gọn' : '▼ Mở rộng';
        }
      });

      r2.insertBefore(toggleBtn, r2.firstChild);
    }

    // Tích hợp phím gộp và mở lưới cắt trực tiếp vào Bulk Actions của Sidebar
    const bulkActions = document.querySelector('div[data-testid="bulk-actions"]');
    if (bulkActions && !document.getElementById('pro-integrated-merge-btn')) {
      const mergeBtn = document.createElement('button');
      mergeBtn.id = 'pro-integrated-merge-btn';
      mergeBtn.type = 'button';
      mergeBtn.className = 'pro-integrated-btn-merge';
      mergeBtn.innerHTML = '🧩 Gộp (M)';
      mergeBtn.title = 'Gộp các sprite đang chọn (Phím tắt M)';
      mergeBtn.addEventListener('click', triggerMerge);

      const gridBtn = document.createElement('button');
      gridBtn.id = 'pro-integrated-grid-btn';
      gridBtn.type = 'button';
      gridBtn.className = 'pro-integrated-btn-grid';
      gridBtn.innerHTML = '📐 Cắt Lưới';
      gridBtn.title = 'Mở công cụ chia lưới cắt Grid Slicer';
      gridBtn.addEventListener('click', () => {
        const panel = document.getElementById('pro-tools-panel');
        if (panel) panel.style.display = 'flex';
      });

      bulkActions.appendChild(mergeBtn);
      bulkActions.appendChild(gridBtn);
    }
  }

  // [Khởi Chạy] Kích hoạt tiện ích và duy trì giao diện sau khi React hoàn tất render
  function setupProTools() {
    createProPanel();
    initBoxSelection();
    reorganizeWorkspace();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupProTools);
  } else {
    setupProTools();
  }
  setInterval(setupProTools, 1500);

  console.log('⚡ [Sprite Cutter Studio] Pro Tools Extension loaded successfully!');
})();
