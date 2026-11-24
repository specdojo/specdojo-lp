# specdojo-lp

SpecDojo のランディングページです。Astro の静的出力と Tailwind CSS で作り、Cloudflare 上の静的サイトとして公開します。

採用している技術の一覧は、技術スタック定義 [`docs/ja/product/030-architecture/020-infrastructure/tsd-index.md`](docs/ja/product/030-architecture/020-infrastructure/tsd-index.md) にまとめています。

このリポジトリは、SpecDojo で開発する実例（showcase）として公開しています。変更は SpecDojo の登録簿と exec で運用しています。commit の `Refs: prj-0002:PJR-XXXX` から、公開中の `specdojo/specdojo` の `project/prj-0002/develop` ブランチにある登録簿の項目へ辿れます。外からの Pull Request は受け付けていません。

## 1. 必要な環境

- Node.js 22.13.0 以上（ビルドだけなら 22.12.0 以上で動きます。ESLint が 22.13.0 以上を求めるため、整形・lint・型検査も行う開発には 22.13.0 以上を使います）
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

変更したら、整形・lint・型検査を通します。

| コマンド               | 内容                                                                          |
| ---------------------- | ----------------------------------------------------------------------------- |
| `npm run format`       | Prettier で整形する（`prettier-plugin-astro`・`prettier-plugin-tailwindcss`） |
| `npm run format:check` | 整形されているかだけを検査する                                                |
| `npm run lint:ts`      | ESLint（`typescript-eslint`・`eslint-plugin-astro`）で検査する                |
| `npm run typecheck`    | `astro check` で型を検査する                                                  |

VS Code で開くと、推奨の拡張機能（Astro・Tailwind CSS IntelliSense・Prettier・ESLint）のインストールを勧められます。一覧は `.vscode/extensions.json` にあります。

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

| パス                                          | 内容                                                   |
| --------------------------------------------- | ------------------------------------------------------ |
| `astro.config.mjs`                            | Astro の設定。静的出力と Tailwind CSS の Vite 連携     |
| `eslint.config.js`                            | ESLint の設定                                          |
| `.prettierrc.json`                            | Prettier の設定（Astro と Tailwind CSS の plugin）     |
| `src/assets/mascot/dojo-otter.webp`           | Hero に表示する暫定のマスコット画像                    |
| `src/styles/global.css`                       | Tailwind CSS の読み込みと Material 3 のテーマ定義      |
| `src/layouts/BaseLayout.astro`                | 全ページ共通の HTML の骨組み                           |
| `src/pages/index.astro`                       | ヘッダー、7 つの節、フッターを並べるトップページ       |
| `src/components/SiteHeader.astro`             | サイトのヘッダー                                       |
| `src/components/SiteFooter.astro`             | サイトのフッター                                       |
| `src/components/Tabs.astro`                   | 始め方のタブと、切り替え用のインラインスクリプト       |
| `src/components/sections/Hero.astro`          | Hero と、始め方への導線                                |
| `src/components/sections/Problems.astro`      | 利用者が抱える課題                                     |
| `src/components/sections/RegisterTypes.astro` | register の考え方と 8 種類の項目                       |
| `src/components/sections/ToolFit.astro`       | 困りごとに応じたツールの使い分け                       |
| `src/components/sections/GetStarted.astro`    | 会話またはコマンドで始める 5 つの手順                  |
| `src/components/sections/NextSteps.astro`     | ドキュメントサイトで読む次の内容                       |
| `src/components/sections/Roadmap.astro`       | register・schedule・routine + Job の PDCA マトリクス   |
| `src/lib/links.ts`                            | 複数のコンポーネントで使うドキュメントサイトの共通 URL |

## 5. テーマ

Material 3 の指針を `src/styles/global.css` の `@theme` に定義しています。

| 種類       | ユーティリティの例                                               | 内容                                              |
| ---------- | ---------------------------------------------------------------- | ------------------------------------------------- |
| 色の役割   | `bg-primary`、`text-on-primary`、`bg-surface-container`          | primary・secondary・tertiary・error・surface など |
| 文字の段階 | `text-display-large`、`text-headline-medium`、`text-body-large`  | display・headline・title・body・label の各 3 段階 |
| 角丸       | `rounded-extra-small` から `rounded-extra-large`、`rounded-full` | Material 3 の shape scale                         |
| 影の段階   | `shadow-elevation-1` から `shadow-elevation-5`                   | Material 3 の elevation level                     |

色はベースライン配色（ライト）の仮の値です。ブランドの基調色が決まったら、Material Color Utilities で生成した値に差し替えます。

## 6. ライセンス

このリポジトリは MIT ライセンスです。全文は `LICENSE` にあります。

- `src/assets/mascot/dojo-otter.webp` は MIT の対象外とし、転用・改変を許可しません。
- このマスコット画像は暫定のもので、正式な画像に替える予定です。

## 7. ブランチと取り込みの運用

`develop` と `main` の 2 本で運用します。

- `main` は、公開している状態とします。Cloudflare への配置は `main` から行い、`main` への push が本番への配置になります。
- `develop` は、次に公開する変更を集める統合先です。Workers Builds のプレビューとして配置されるため、`main` へ取り込む前に表示を確かめられます。
- 変更は、`develop` から切ったトピックのブランチ `feature/<project-id>/<topic>`（例: `feature/prj-0002/lp-develop-flow`）で行い、`develop` へ取り込みます。`<project-id>` は、変更のもとになった SpecDojo の project ID です。人の手直しも `develop` や `main` へ直接 commit しません。
- `develop` から `main` への取り込み（リリース）は、人が行います。Pull Request で取り込みます。独立した承認者がいない間は、`git merge --no-ff` によるローカルの merge でもかまいません。

### 7.1. SpecDojo の exec との関係

SpecDojo の exec は、`specdojo.config.json` の `repos[].integration_branch` に指定したブランチへ変更を統合します。本リポジトリでは `develop` を指定し、人が確かめてから `main` へ取り込みます。exec は人が確かめる前に統合するため、`main` を統合先にしません。

exec が作る commit と merge commit には、`Refs: <project-id>:<item-id>` が付きます。`main` へ取り込んだ後も `git log --grep "Refs: prj-0002:PJR-XXXX"` で項目から変更を辿れるよう、この行を残します。

- merge commit と rebase merge では、`Refs:` はそのまま残ります。
- squash merge では、squash の commit メッセージに `Refs:` の行を残します。GitHub の設定で、squash の既定のメッセージを「Pull request title and commit details」にします。

## 8. 変更履歴の更新

LP の変更要点は [変更履歴](CHANGELOG.md) に日本語で記録します。当面は LP 独自の公開日で管理し、SpecDojo 本体の変更履歴とは分けます。SpecDojo 本体や `package.json` の版とは同期させません。過去の全履歴は復元せず、確認できる直近の変更から記録します。

1. `develop` へ変更を統合する際に、変更要点を `Unreleased` へ追記します。commit を羅列せず、利用者や開発者にとっての変更を「追加」「変更」「修正」「開発環境・運用」などの必要な分類にまとめ、空の分類は作りません。
2. 記載対象は `git log main..develop` と `git diff main..develop` の両方で確認します。すでに `main` に含まれる変更を未公開として追記しません。`develop` への push によるプレビューへの反映は、本番公開として記録しません。
3. 人が `develop` から `main` へ取り込み、本番公開する際に、実際の公開完了と公開日を確認し、公開した項目を `YYYY-MM-DD` の節へ移します。commit 日やプレビューの反映日から公開日を推測しません。新しい公開日の節を上に置き、その上に次の `Unreleased` を残します。今回公開しない項目があれば `Unreleased` に残します。
