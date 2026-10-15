---
specdojo:
  id: tsd-cloudflare-workers
  type: architecture
  status: draft
  part_of:
    - tsd-index
  rulebook: specdojo:tsd-rulebook
---

# Cloudflare Workers への配置

`specdojo-lp` をビルドした静的サイトを、Cloudflare Workers の静的アセットとして配置するための設定・手順・確認方法を定める。

## 1. 概要・採用理由

- 公開先は Cloudflare 上の静的サイトとする。
- Astro の公式ガイドは、新しいプロジェクトには Cloudflare Pages ではなく Cloudflare Workers（静的アセット）を勧めている（<https://docs.astro.build/en/guides/deploy/cloudflare/>）。静的なサイトではアダプターは要らないため、Astro が出力する `./dist` をそのまま静的アセットとして配信する。
- GitHub との連携は Workers Builds で行い、`main` への push で本番へ、それ以外のブランチへの push でプレビューへ配置する。

## 2. 選定・バージョン

| 用途                      | 採用技術                           | 補足                                                             |
| ------------------------- | ---------------------------------- | ---------------------------------------------------------------- |
| 静的サイトの配信          | Cloudflare Workers（静的アセット） | アダプターは使わず、`assets.directory` に `./dist` を指定する    |
| 配置・手元での確認        | `wrangler` 4.x                     | devDependencies に入れる。設定は `wrangler.jsonc`                |
| GitHub からのビルドと配置 | Workers Builds                     | 本番のブランチは `main`。それ以外のブランチではプレビューを作る  |
| ビルド環境                | Node.js 24.18.0                    | 版は指定しておらず、Workers Builds の既定で動く                  |
| 独自ドメイン              | `specdojo.org`                     | Workers の Custom Domains で割り当てる。`www` はルートへ転送する |

## 3. 設定・セットアップ手順

### 3.1. リポジトリの設定

`wrangler.jsonc` は次の内容とする。

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "specdojo-lp",
  // Cloudflare の推奨に従い、設定した日の日付にする。
  "compatibility_date": "2026-10-14",
  "assets": {
    "directory": "./dist",
  },
  // Workers Builds のプレビュー（npx wrangler preview）に必要。本番と同じ設定を使うため空にする。
  "previews": {},
}
```

- `previews` は `npx wrangler preview` に必要である。空なら本番と同じ設定を使う。
- `assets.not_found_handling` は書かない。存在しないパスには 404 が返る。
- `wrangler dev` が作る `.wrangler/` は、`.gitignore` と ESLint の対象から外す。

### 3.2. Workers Builds の設定

Cloudflare のダッシュボードで次の順に設定する。

1. GitHub の `specdojo/specdojo-lp` を Workers Builds に連携する。
2. Build command を `npm run build`、Deploy command を `npx wrangler deploy`、本番のブランチを `main` にする。
3. Settings > Build > Branch control で Enable Preview Builds を有効にする。

- 本番以外のブランチへの push では `npx wrangler preview`（open beta）が動き、ブランチ名の `/` を `-` にした名前のプレビューができる。
- プレビューの URL は `<プレビュー名>-specdojo-lp.<アカウントのサブドメイン>.workers.dev` となる。
- Node.js の版は指定せず、Workers Builds の既定（24.18.0）で動かす。固定する場合は環境変数 `NODE_VERSION` か `.node-version` を使う。

### 3.3. 独自ドメインの設定

Cloudflare のダッシュボードで次の順に設定する。

1. Workers の Custom Domains で `specdojo.org` を割り当てる。証明書は自動で発行される。
2. ゾーンの SSL/TLS > Edge Certificates で Always Use HTTPS を有効にする。http は 301 で https へ転送される。
3. `www` に proxied な `A` レコード（`192.0.2.0`）を作る。
4. Redirect Rule で `https://www.*` を `https://${1}` へ 301 で転送する。クエリは保つ。

- http の `www` は、Always Use HTTPS と Redirect Rule の 2 回の転送でルートに着く。

## 4. 動作確認

### 4.1. 手元での確認

ビルドしてから `wrangler dev` で表示を確かめる。

```sh
npm run build
npx wrangler dev
```

`/` と静的アセットが 200、存在しないパスが 404 を返すことを確かめる。

### 4.2. 配置先での確認

| 確認先                                                                            | 要求               | 期待する応答                                            |
| --------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------- |
| 本番（`https://specdojo.org/`）                                                   | `/` と静的アセット | 200                                                     |
| 本番（`https://specdojo.org/`）                                                   | 存在しないパス     | 404                                                     |
| プレビュー（`<プレビュー名>-specdojo-lp.<アカウントのサブドメイン>.workers.dev`） | `/` と静的アセット | 200                                                     |
| プレビュー（`<プレビュー名>-specdojo-lp.<アカウントのサブドメイン>.workers.dev`） | 存在しないパス     | 404                                                     |
| `http://specdojo.org/`                                                            | 任意のパスとクエリ | 301 で `https://specdojo.org/` へ（パスとクエリを保つ） |
| `https://www.specdojo.org/`                                                       | 任意のパスとクエリ | 301 で `https://specdojo.org/` へ（パスとクエリを保つ） |
| `http://www.specdojo.org/`                                                        | 任意のパスとクエリ | 2 回の 301 を経て `https://specdojo.org/` へ            |

## 5. 運用上の注意

- GitHub の `main` に LP のファイルがない間は、本番のビルドが `package.json` を見つけられずに失敗した。`main` へ取り込んで解消した。
- `wrangler.jsonc` に `previews` のブロックがないと、プレビューのビルドが失敗した。空の `previews` を加えて解消した。
- DNS のレコードを作る前に名前を引くと、存在しないという結果が最大 30 分（SOA の negative TTL）残り、その間は手元から `www` を引けない。
