# 火廻（ひまわり）公式サイト

ファイヤーパフォーマンス団体「火廻」のホームページ。
ビルド不要の素の HTML / CSS / JavaScript で作っています。

公開URL: https://kawaiharuki.github.io/himawari-fire/

## ファイル構成

```
.
├── index.html          # トップページ（1ページ完結）
├── 404.html            # 存在しないURLにアクセスされたとき
├── .nojekyll           # GitHub Pages の Jekyll 処理を無効化
└── assets/
    ├── css/style.css   # スタイル（色は先頭の :root 変数で調整）
    ├── js/main.js      # メニュー開閉・スクロール表示・YouTube 読み込み
    └── img/            # ロゴと写真
```

## ページの構成

| セクション | 内容 |
| --- | --- |
| ヒーロー | 背景写真の上に、キャッチコピーと出演依頼への導線 |
| 火廻について | 団体紹介と団体情報 |
| 道具 | ノーマル / バトン / ハイパー / その他多数 |
| 映像 | YouTube の公演動画 |
| 写真 | 公演写真 |
| 出演履歴 | これまでの出演イベント |
| 出演のご依頼 | 依頼の流れと相談前の確認事項 |
| お問い合わせ | メール・X・Instagram・YouTube |

## 掲載している情報の出どころ

サイトの文言・SNS・出演履歴は、YouTube チャンネル
[@himawari_fire](https://www.youtube.com/@himawari_fire) の概要欄と各動画の説明文から
取得したものを使っています。

- メール: himawari.fire.torch@gmail.com
- X: [@Himawari_fire](https://x.com/Himawari_fire)
- Instagram: [@himawari.fire](https://www.instagram.com/himawari.fire/)

## ローカルで確認する

`index.html` をブラウザで直接開くだけでも表示できますが、
404.html の確認などはローカルサーバー経由が確実です。

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## 公開する

`main` ブランチに push すると、1〜2分で自動的に反映されます。

```bash
git add -A
git commit -m "サイトを更新"
git push
```

## 更新のしかた

### 出演履歴を追加する

`index.html` の `<!-- ===== 出演履歴 ===== -->` にある `<ol class="timeline">` の
先頭に、同じ形の `<li>` を足してください。新しいものが上です。

```html
<li class="reveal">
  <p class="timeline-date"><span class="y">2026</span>10.03</p>
  <div class="timeline-body">
    <h3>イベント名</h3>
    <p>公演の説明。</p>
    <a class="link-arrow" href="https://www.youtube.com/watch?v=動画ID"
       target="_blank" rel="noopener">映像を見る</a>
  </div>
</li>
```

### 動画を差し替える

大きく表示している動画は `data-video` の動画 ID で指定しています。
サムネイルは `assets/img/` の画像です。

```html
<button class="yt-facade" data-video="動画ID" data-title="動画のタイトル">
```

YouTube はサムネイルが押されるまで読み込まれないので、
動画を増やしてもページの表示が重くなりません。

### ヒーローの背景写真を差し替える

トップを開いた瞬間に見える大きな写真は `assets/img/photo-hero-01.jpg` です。
同じファイル名で上書きすれば差し替わります。

写真のどのあたりを見せるかは `style.css` の `.hero-bg img` の `object-position`
（パソコン向け）と、`@media (max-width: 820px)` の中の同じ指定（スマホ向け・横位置のみ有効）
で調整します。文字が読みにくいときは `.hero-bg::after` のグラデーションの
数値を大きくすると、写真の上に重ねる黒が濃くなります。

### 写真を差し替える

`assets/img/` の画像を、同じファイル名で上書きするのがいちばん簡単です。

いま置いている写真は YouTube のサムネイル（1280×720）で、動画タイトルの文字が
焼き込まれています。そのため CSS 側で枠の縦横比を指定し、文字の部分を
切り落として表示しています（`style.css` の「写真のトリミング」の項）。

撮り下ろしの写真に差し替えたら、`index.html` の `crop-wide` / `crop-side` /
`crop-strip` というクラスを外し、`style.css` の該当ブロックを削除してください。
文字がわずかに見えてしまう場合は、比率の数字を少し大きくすると切り取る量が増えます。

### 色を変える

`assets/css/style.css` 先頭の `:root` を書き換えると、サイト全体の配色が変わります。
ロゴの朱色に合わせています。

```css
--hi:       #d9482a;   /* 朱（ロゴの「火廻」の色） */
--hi-warm:  #e8763a;   /* 炎のオレンジ */
--hi-amber: #dfa261;   /* 火の粉の琥珀 */
```

### フォントを変える

見出しに明朝（Shippori Mincho B1）、本文にゴシック（Zen Kaku Gothic New）を
Google Fonts から読み込んでいます。変えるときは `index.html` の `<link>` と
`style.css` の `--serif` / `--sans` の両方を書き換えてください。

## これから足すとよさそうなところ

- [ ] 出演依頼の条件（必要な広さ・所要時間・費用の目安・雨天時の対応）
- [ ] 撮り下ろしの写真（文字が入っていないもの）
- [ ] OGP 画像 `assets/img/ogp.jpg` を専用に作る（推奨 1200×630px）
- [ ] 独自ドメイン（使う場合）

## お問い合わせフォームについて

GitHub Pages は静的ホスティングのため、サーバー側の処理ができません。
フォームが必要な場合は Google フォーム / Formspree / Tally などを埋め込んでください。
現在はメールリンクと SNS リンクのみ設置しています。

## 独自ドメインを使う場合

1. リポジトリ直下に `CNAME` ファイルを作り、ドメイン名だけを書く
2. DNS 側で GitHub Pages 向けのレコードを設定する
3. リポジトリの Settings → Pages でドメインを登録し、HTTPS を有効化
