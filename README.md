# big-light

**ビッグライトモード** — osakenpiro プロダクト共通のアクセシビリティ規格。
文字そのものがUI。リンクに手触りがある。老人と子供が先に使えて、大人が追いつくUI。

## CDN 参照

### 安定版 (v1)
```html
<link rel="stylesheet" href="https://osakenpiro.github.io/big-light/v1/big-light-v0.css">
<script src="https://osakenpiro.github.io/big-light/v1/big-light-v0.js"></script>
```

本文末尾に2行追加するだけで、右上にトグルボタンが出現する。

## 仕様

- `[data-biglight="1"]` が root に付いたときだけ発火 (既存デザインに影響ゼロ)
- 右上固定トグル (☀️/🔆)、クリック or Alt+B で切替
- localStorage `osakenpiro.biglight.v1` で状態永続化
- URLパラメータ `?bl=1` でクロスオリジン遷移時に引継ぎ
- JS API: `window.BigLight.{on,off,toggle,isOn}`

詳細: [v1/spec.md](./v1/spec.md)

## 設計思想

- **Boolean → Float の UI実装**: ダーク/ライトに「密度軸」を追加
- **文字そのものがUI**: カード・パネル等の装飾コンテナを排除、テキスト自体をタップ対象に
- **腐葉土設計**: 既存デザインを壊さず、上に重ねる規格化レイヤー

## ライセンス

MIT License / © 2026 osakenpiro
