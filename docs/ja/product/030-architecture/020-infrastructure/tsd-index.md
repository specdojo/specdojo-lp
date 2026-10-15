---
specdojo:
  id: tsd-index
  type: architecture
  status: draft
  rulebook: specdojo:tsd-index-rulebook
---

# specdojo-lp 技術スタック定義

SpecDojo のランディングページ（`specdojo-lp`）が採用する技術の一覧。各技術の担当責務を明示し、設計・実装・運用の前提として扱う。

## 1. 技術スタック一覧

| 区分               | 採用技術                                                                         | 担当責務                                                          | 補足                                                                                                                              |
| ------------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 言語               | TypeScript 6.x                                                                   | Astro のコンポーネントとスクリプトの実装言語                      | `astro/tsconfigs/strict` を基にする                                                                                               |
| ランタイム         | Node.js 22.x                                                                     | 開発用サーバー・ビルド・整形・lint・型検査の実行環境              | 開発は 22.13.0 以上、ビルドは 22.12.0 以上（`package.json` の `engines`）。Workers Builds のビルドは既定の Node.js 24.18.0 で動く |
| パッケージ管理     | npm                                                                              | 依存パッケージの導入と `package-lock.json` による版の固定         | -                                                                                                                                 |
| Web フレームワーク | Astro 7.x                                                                        | ページとコンポーネントの構成、静的な HTML の出力                  | `astro.config.mjs` で静的出力（`output: "static"`）に固定する                                                                     |
| スタイル           | Tailwind CSS 4.x（`@tailwindcss/vite` 4.x）                                      | ユーティリティクラスによるスタイル付け                            | Vite の plugin として Astro に組み込む                                                                                            |
| デザインのテーマ   | Material 3                                                                       | 色の役割・文字の段階・角丸・影の段階の定義                        | `src/styles/global.css` の `@theme` に Tailwind CSS のテーマとして定義する                                                        |
| コードフォーマット | Prettier 3.x（`prettier-plugin-astro` 1.x・`prettier-plugin-tailwindcss` 0.8.x） | Astro・TypeScript・CSS・Markdown などの書式の統一とクラス順の整列 | `npm run format` / `npm run format:check`                                                                                         |
| lint               | ESLint 10.x（`typescript-eslint` 8.x・`eslint-plugin-astro` 1.x）                | TypeScript と Astro のコードの静的検査                            | `npm run lint:ts`                                                                                                                 |
| 型検査             | `astro check`（`@astrojs/check` 0.9.x）                                          | Astro のコンポーネントを含む型の検査                              | `npm run typecheck`                                                                                                               |
| ホスティング       | Cloudflare Workers（静的アセット）                                               | ビルドした静的サイトの配信                                        | 独自ドメインは `specdojo.org`。配置の設定の詳細は [tsd-cloudflare-workers](tsd-cloudflare-workers.md)                             |
| 配置               | `wrangler` 4.x                                                                   | Cloudflare Workers への配置と、手元での表示の確認                 | 設定は `wrangler.jsonc`。詳細は [tsd-cloudflare-workers](tsd-cloudflare-workers.md)                                               |
| ソースコード管理   | GitHub                                                                           | リポジトリ管理と、`develop` と `main` によるブランチ運用          | `main` を公開している状態とし、変更は `feature/<topic>` から `develop` へ取り込む。`develop` から `main` へは人が取り込む         |
| アセット管理       | specdojo-assets                                                                  | マスコットなどの画像の原本の管理と、使うものだけの書き出し        | `exports.yaml` に載せたものだけを書き出し、本リポジトリで commit する                                                             |

## 2. 補足

- 採用技術のメジャーバージョンは `package.json` に合わせる。依存の版を上げたときは本書も更新する。
- 詳細の `tsd-<term>` は、作成した時点で `補足` 列にリンクを足す。
