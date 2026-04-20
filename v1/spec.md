# ビッグライトモード V0 規格書
**2026-04-20 / osakenpiro / Re:DeSign Wave 7 (新規追加)**

> 文字そのものがUI。リンクに手触りがある。
> 老人と子供が、先に使えて、大人が追いつくUI。

---

## 0. 命名

**「ビッグライト」** 単独採用。
三重がけ:
- **音韻**: ドラえもんのひみつ道具 (親しみ・認知)
- **意味**: 文字を大きく、画面を明るく
- **構造**: アクセシビリティ規格の普段着化

---

## 1. 設計思想

### 既存デザインを壊さない
- 通常状態(Float運用 / 腐葉土デザイン)に影響ゼロ
- `[data-biglight="1"]` が root に付いたときだけ発火
- トグル1クリックで完全切替

### 文字そのものがUI
- 従来の一般的アクセシビリティ =「ボタンを大きく」
- ビッグライト =「**コンテナを排除し、テキスト自体をタップ対象に**」
- リンク = 太字+下線+濃色+min-height 56px
- カード/パネル/グラデ等の装飾コンテナは背景・ボーダー無効化

### Boolean → Float のUI実装
- ダーク/ライトの軸に、**密度軸(ノーマル/ビッグライト)** を追加
- 両軸独立。組合せ4象限を将来拡張可能

---

## 2. 技術仕様

### ファイル構成
```
big-light-v0.css  (約4KB)
big-light-v0.js   (約2KB)
```

### 投入手順 (各プロダクトで共通)
```html
<!-- <head>内 -->
<link rel="stylesheet" href="big-light-v0.css">

<!-- <body>末尾 -->
<script src="big-light-v0.js"></script>
```

単一HTMLパターンの場合は `<style>` / `<script>` にインライン化可。

### 動作仕様
| 項目 | 仕様 |
|---|---|
| トグル位置 | 右上固定 (top:16px, right:16px) |
| トグルサイズ | 56x56px (通常) / 64x64px (BL時) |
| 切替キー | クリック / Alt+B |
| 永続化 | `localStorage['osakenpiro.biglight.v1']` |
| クロスオリジン対応 | `?bl=1` URLパラメータで初期状態引継ぎ |
| 外部API | `window.BigLight.{on,off,toggle,isOn}` |
| a11y | aria-pressed / aria-label / focus-visible |

### ビッグライトON時の挙動
| 要素 | 変更内容 |
|---|---|
| 本文 | 24px / line-height 1.9 / Zen Kaku Gothic New |
| 背景 / 前景 | `#FFFFFF` / `#1A1A1A` 固定 |
| h1/h2/h3 | 42/36/30px, 太字 |
| リンク | 太字+下線2px+濃青`#0A45D6`+min-height 56px |
| ボタン | 56px高、2px枠線、白背景青文字 |
| 装飾コンテナ | 背景/ボーダー/影/blur 全排除 |
| 縦書きスパイン | `display:none` |
| アニメ | 全停止 |
| 画像 | 維持 |

---

## 3. プロダクト投入計画 (Wave 7)

### ★★★ 即時投入 (構造単純 / 対象親和性高)
| # | プロダクト | URL | 理由 |
|---|---|---|---|
| **37** | 僕の惑星 | osakenpiro.github.io | 最初の接触点。全動線の入口 |
| **38** | 人類の素材図鑑 | .../materials-of-civilization/ | 教育コンテンツ、子供向け正統 |
| **39** | じこしょうかい絵本 vol.1-17 | .../jikoshoukai-*/ | 完全に子供向け(17巻一括) |
| **40** | 集約LP v2 (Re:DeSign W1) | .../v2/ | 初見訴求、シニア含む幅広い来訪者 |
| **41** | Queue Dashboard (#36) | .../re-design/queue-dashboard.html | 自己言及: 管理ツール自身に適用 |

### ★★ 要仕様調整後に投入
| # | プロダクト | 調整点 |
|---|---|---|
| **42** | わっかずかん | ringのSVGラベルサイズ拡大、凡例のタップ領域確保 |
| **43** | たなずかん | Tierセル文字24px、CSV操作ボタン56px |
| **44** | バネットマップ | ノードラベル拡大、力学パラメータUIの簡略化 |

### ★ 構造的に要検討 (後回し → 別途検討)
| # | プロダクト | 論点 |
|---|---|---|
| **45** | 百ますグリッド 18×18 | 324セル構造がビッグライトと根本的に衝突。別ルート(単語検索画面)を用意するか、ビッグライト時は検索画面のみに切替か |
| **46** | VR Akinator | 選択肢ボタン拡大は容易だが、TOP3折り畳みUIの再設計要 |
| **47** | SATORI対話画面 | 4賢者立ち絵+吹き出しUIの構造自体がビジュアル前提 |
| **48** | 論文 one-pager 9本 | Claude Design生成物は固定ビジュアル、テキスト差替できない |
| **49** | わたしのお財布 | 数値テーブル中心、別方針検討 |

---

## 4. 着手順序

### Phase 1: PoC (1プロダクトで実証) - **今週**
1. `big-light-v0.css` + `big-light-v0.js` を **僕の惑星** に投入
2. 動作確認 (デスクトップ/モバイル)
3. 調整事項を V0.1 にフィードバック

### Phase 2: ★★★ 一括展開 - **来週**
- 素材図鑑 / じこしょうかい17巻 / LP v2 / Queue Dashboard
- 共通ファイルを `osakenpiro.github.io/big-light/v1/` に配置 → CDN的に各プロダクトから参照
- 各プロダクトへの注入は単純 `<link>` + `<script>` 2行

### Phase 3: ★★ 調整投入 - **再来週**
- わっかずかん / たなずかん / バネットマップ
- プロダクト固有の仕様調整後に投入

### Phase 4: ★ 構造検討 - **後回し**
- 百ます / Akinator / SATORI は別セッションで設計

---

## 5. Queue Dashboard への反映

```javascript
// WAVES配列に追記
{
  id: "W7", title: "ビッグライト対応",
  items: [
    { id: "37", name: "僕の惑星", url: "osakenpiro.github.io", priority: 3, status: "prep", note: "PoC対象。V0を最初に投入" },
    { id: "38", name: "人類の素材図鑑", url: "...", priority: 3, status: "idle" },
    { id: "39", name: "じこしょうかい 全17巻", url: "...", priority: 3, status: "idle" },
    { id: "40", name: "集約LP v2", url: "...", priority: 3, status: "idle", note: "W1 done 後に連鎖" },
    { id: "41", name: "Queue Dashboard 自身", url: "...", priority: 2, status: "idle" },
    { id: "42", name: "わっかずかん", url: "...", priority: 2, status: "idle", note: "ラベル拡大の調整要" },
    { id: "43", name: "たなずかん", url: "...", priority: 2, status: "idle" },
    { id: "44", name: "バネットマップ", url: "...", priority: 2, status: "idle" },
    { id: "45", name: "百ますグリッド", url: "...", priority: 0, status: "idle", note: "構造的に要検討、後回し" },
    { id: "46", name: "VR Akinator", url: "...", priority: 0, status: "idle", note: "構造的に要検討、後回し" },
    { id: "47", name: "SATORI対話画面", url: "...", priority: 0, status: "idle", note: "構造的に要検討、後回し" }
  ]
}
```

Queue Dashboard全体進捗: Done 9/47 (≒ 19%) に再計算。

---

## 6. note記事化ネタ (osakenpiro-marketing)

タイトル案:
- **「AIのUIは、老人と子供を置き去りにしている」**
- **「ビッグライトモード ─ 文字そのものをUIにする設計」**
- **「アクセシビリティは、スイッチじゃなくスライダー」**

切り口:
- 既存UIの「装飾コンテナ中心設計」批判
- 「リンクに手触りがある」設計思想
- Boolean→Float を ビッグライトで実装した事例
- 全プロダクト横断ワンクリック切替のトップリポジトリ公開

---

## 7. 次セッション引き継ぎ

- [ ] 僕の惑星 (osakenpiro.github.io) に V0投入 → PoC確認
- [ ] `osakenpiro/big-light` リポ新設 (CDN配布元)
- [ ] Queue Dashboard に W7 追加 (11件)
- [ ] 構造的要検討 (#45-47) の別セッション立ち上げ判断
- [ ] note記事ドラフト起案

---

*本規格は生きた文書。V0.1 / V1.0 で改訂される。*
