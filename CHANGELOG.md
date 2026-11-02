# 変更履歴

specdojo-lp 独自の変更要点を、確認できる直近の変更から記録します。公開済みの変更は公開日で管理します。

## Unreleased

### 追加

- register と AI ツールの plan モードの使い分けを、識別・種類・状態遷移・実行記録・決定・記録の残り方の観点で紹介しました。
- 「これから」に型（Kata）・技（Waza）・流（Ryu）の役割と PDCA との関係を追加し、三つを組み合わせた成果物づくりの仕組みを「準備中」と表示しました。

### 変更

- register の紹介を epic を含む 8 種類に更新し、`depends_on` による実行順序と先行項目の完了待ちを説明しました。
- 始め方に Dev Container の推奨 preset、Git hook・markdownlint 設定、任意の文書検査・文書サイトの導入を追記しました。CLI 例には `--topic` と `--depends-on` を反映し、起動 script の案内を `orch:sol`・`orch:luna`・`orch:flash` に更新しました。
- 会話例で、オーケストレーターが実行内容と影響を日本語で確認する形に改めました。「これから」の表記は `routine + job` に統一しました。

### 開発環境・運用

- Markdown と frontmatter の検査に docs-lint を導入しました。
- ブランチ運用を `develop` への統合とプレビュー確認、人による `main` への取り込みと本番公開に整理し、トピックのブランチ名を `feature/<project-id>/<topic>` にそろえました。
- LP 独自の変更履歴と、統合時・本番公開時の更新ルールを整えました。
