---
title: 2年ぶりにブログを書き直した
tags: next-js
---

[前回の記事](/article/discord-spoiler) から 1年、[前回のコミット](https://github.com/sqrtox/sqrtox.vercel.app/commit/c55f1ff240a9fa34cc8d47d58068212a115ea5f8) から 2年たったが、今更 Next.js + MUI のこのブログを1から書き直してみた。  

# 主に変更したところ

- Next.js
  - Next.js 12から Next.js 14へのバージョンアップ
  - App Router への移行
- 全体的なデザインの刷新
  - コードのハイライトを prism から shiki に変更
  - 目次を追加

など。

# 変更した理由

2年前からずっとブログをこうしたいああしたいという気持ちはあったが、主に他にやりたいことが多かったり、そもそも Markdown の変換処理をきれいにやるのがつらかったり、[Remix](https://remix.run/) に少し浮気してやっぱりやめたりで放置してしまっていた。今回、ようやく新しくできた。

# デザイン

## 色

このブログでは [マテリアルデザイン](https://m3.material.io/) を [採用](https://mui.com/) しているがそれに使用されるプライマリ色を青からピンクに変更した。特にこうした理由はないが、強いて言うなら MUI のデフォルト色が青を基調としていたので変えたかった。

あと細かいところだが CSS で background に transition をつけることでカラーテーマ変更時にふんわり色が切り替わるようにした。

## シンタックスハイライト

ブログ記事のシンタックスハイライトを `prism` から `"shiki"{:js}` に変更した。
多機能でスタイルも当てやすく気に入っている。

```ts title="libs/math.js" {1,3-5} showLineNumbers
// TODO： 関数のスタイルを揃える

export function add(a: number, b: number): number {
  return a + b;
}

export const sub = (a: number, b: number): number => a - b;
```

# つらかったところ

## Markdown

[#変更した理由](#変更した理由) でも少し書いたが、やっぱり Markdown から変換した生の HTML を React でイイ感じに表示するのは大変だった。

Markdown → HTML は unified と rehype/remark プラグインでかなり楽にできるが、変換後の HTML を MUI で整えたデザインのサイトに埋め込むのは CSS でデザインを合わせたりなど結構大変。

## 最適化

最初 Lighthouse の Performance が48とかになっていて何事かと驚いた。

原因は目次で、画面サイズが小さい場合は目次を記事の上に持ってくるということをしていたのだが、これを JavaScript でやっていたために目次が動くことによって初期表示の画面から大きくズレることが減点の理由だった。

画面サイズによるスタイル付けを JavaScript ではなく CSS のメディアクエリーに変えたことで80以上にまで Performance が回復した。（減点が大きすぎる😢）

# 感想

Next.js 14が12から大きく変わったこともあり、書き直しはかなり大変だったがやっぱり自分のブログとなると最新技術を採用したり好き勝手できるので楽しい。
