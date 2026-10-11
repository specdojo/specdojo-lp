# specdojo-lp

SpecDojo のランディングページです。Astro の静的出力と Tailwind CSS で作り、Cloudflare 上の静的サイトとして公開します。

## 1. 必要な環境

- Node.js 22.12.0 以上
- npm

## 2. 開発の手順

依存パッケージを導入します。

```sh
npm install
```

開発用サーバーを起動します。既定では `http://localhost:4321` で表示できます。

```sh
npm run dev
```

## 3. ビルドの手順

静的な HTML を `dist/` に出力します。

```sh
npm run build
```

出力したサイトを手元で確認します。

```sh
npm run preview
```

## 4. 構成

| パス                           | 内容                                               |
| ------------------------------ | -------------------------------------------------- |
| `astro.config.mjs`             | Astro の設定。静的出力と Tailwind CSS の Vite 連携 |
| `src/styles/global.css`        | Tailwind CSS の読み込みと Material 3 のテーマ定義  |
| `src/layouts/BaseLayout.astro` | 全ページ共通の HTML の骨組み                       |
| `src/pages/index.astro`        | 仮のトップページ                                   |

## 5. テーマ

Material 3 の指針を `src/styles/global.css` の `@theme` に定義しています。

| 種類       | ユーティリティの例                                               | 内容                                              |
| ---------- | ---------------------------------------------------------------- | ------------------------------------------------- |
| 色の役割   | `bg-primary`、`text-on-primary`、`bg-surface-container`          | primary・secondary・tertiary・error・surface など |
| 文字の段階 | `text-display-large`、`text-headline-medium`、`text-body-large`  | display・headline・title・body・label の各 3 段階 |
| 角丸       | `rounded-extra-small` から `rounded-extra-large`、`rounded-full` | Material 3 の shape scale                         |
| 影の段階   | `shadow-elevation-1` から `shadow-elevation-5`                   | Material 3 の elevation level                     |

色はベースライン配色（ライト）の仮の値です。ブランドの基調色が決まったら、Material Color Utilities で生成した値に差し替えます。
