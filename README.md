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
| `src/components/sections/RegisterTypes.astro` | register の考え方と 7 種類の項目                       |
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

## 6. ブランチと取り込みの運用

GitHub flow で運用します。

- `main` は、公開している状態とします。Cloudflare への配置は `main` から行います。
- 変更は、まとまりごとのトピックのブランチ `feature/<topic>` で行います。例: `feature/lp-v1`。ブランチ名には SpecDojo の project ID を入れません。
- 人の手直しも `main` へ直接 commit せず、トピックのブランチで行います。
- `main` へは Pull Request で取り込みます。独立した承認者がいない間は、`git merge --no-ff` によるローカルの merge でもかまいません。

### 6.1. SpecDojo の exec との関係

SpecDojo の exec は、`specdojo.config.json` の `repos[].integration_branch` に指定したブランチへ変更を統合します。作業中のトピックのブランチを指定し、`main` へは上の手順で取り込みます。

exec が作る commit と merge commit には、`Refs: <project-id>:<item-id>` が付きます。`main` へ取り込んだ後も `git log --grep "Refs: prj-0002:PJR-XXXX"` で項目から変更を辿れるよう、この行を残します。

- merge commit と rebase merge では、`Refs:` はそのまま残ります。
- squash merge では、squash の commit メッセージに `Refs:` の行を残します。GitHub の設定で、squash の既定のメッセージを「Pull request title and commit details」にします。
