/* =========================================================
   ビッグライトモード v0 — osakenpiro 全プロダクト共通規格
   ---------------------------------------------------------
   使い方: <script src="big-light-v0.js"></script> をbodyの末尾に
   依存: big-light-v0.css (同ディレクトリに配置)

   機能:
   - 右上固定トグルボタン自動注入 (☀️/🔆)
   - クリック or Alt+B でモード切替
   - localStorage で状態永続化 (同一オリジン内)
   - ?bl=1 URLパラメータで初期状態上書き (クロスオリジン遷移用)
   - prefers-reduced-motion 尊重
   ========================================================= */
(function () {
  'use strict';

  const STORAGE_KEY = 'osakenpiro.biglight.v1';
  const root = document.documentElement;

  function apply(state) {
    root.setAttribute('data-biglight', state ? '1' : '0');
    const btn = document.getElementById('big-light-toggle');
    if (btn) {
      btn.textContent = state ? '🔆' : '☀️';
      btn.setAttribute('aria-pressed', state ? 'true' : 'false');
    }
    try {
      localStorage.setItem(STORAGE_KEY, state ? '1' : '0');
    } catch (e) {
      /* プライベートモード等で失敗しても続行 */
    }
  }

  function getInitial() {
    // 優先順位: URLパラメータ > localStorage > false
    try {
      const params = new URLSearchParams(location.search);
      if (params.get('bl') === '1') return true;
      if (params.get('bl') === '0') return false;
    } catch (e) {}
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) return saved === '1';
    } catch (e) {}
    return false;
  }

  function toggle() {
    const current = root.getAttribute('data-biglight') === '1';
    apply(!current);
  }

  function mount() {
    // 二重注入防止
    if (document.getElementById('big-light-toggle')) return;

    const btn = document.createElement('button');
    btn.id = 'big-light-toggle';
    btn.className = 'big-light-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'ビッグライトモード切替');
    btn.setAttribute('title', 'ビッグライトモード (Alt+B)');
    btn.setAttribute('aria-pressed', 'false');
    btn.textContent = '☀️';
    btn.addEventListener('click', toggle);
    document.body.appendChild(btn);

    // キーボードショートカット
    document.addEventListener('keydown', function (e) {
      if (e.altKey && (e.key === 'b' || e.key === 'B')) {
        e.preventDefault();
        toggle();
      }
    });

    apply(getInitial());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  // 外部から操作用 API
  window.BigLight = {
    on: function () { apply(true); },
    off: function () { apply(false); },
    toggle: toggle,
    isOn: function () { return root.getAttribute('data-biglight') === '1'; }
  };
})();
