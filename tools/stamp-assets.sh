#!/usr/bin/env bash
# ----------------------------------------------------------------------------
# CSS と JS の読み込み URL に「?v=中身のハッシュ」を付け直します。
#
# GitHub Pages は全ファイルに Cache-Control: max-age=600（10 分）を返し、
# この値は変更できません。そのため CSS や JS を更新しても、閲覧者のブラウザが
# 古いものを持ったまま新しい HTML を表示してしまうことがあります。
# URL が変われば必ず取り直されるので、中身が変わったら v= も変わるようにします。
#
# 値はファイルの中身から作るので、中身が同じなら何度実行しても結果は同じです
# （＝無駄な再ダウンロードも、無駄な差分も出ません）。
#
# 使い方: ./tools/stamp-assets.sh
# （.githooks/pre-commit から自動で呼ばれるので、普段は意識しなくて大丈夫です）
# ----------------------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")/.."

css_v="$(sha1sum assets/css/style.css | cut -c1-10)"
js_v="$(sha1sum assets/js/main.js   | cut -c1-10)"

for f in index.html 404.html; do
  [ -f "$f" ] || continue
  sed -i -E "s#(href=\"[^\"]*assets/css/style\.css)(\?v=[0-9a-f]+)?\"#\1?v=${css_v}\"#g; \
             s#(src=\"[^\"]*assets/js/main\.js)(\?v=[0-9a-f]+)?\"#\1?v=${js_v}\"#g" "$f"
done

echo "style.css → ?v=${css_v} ／ main.js → ?v=${js_v}"
