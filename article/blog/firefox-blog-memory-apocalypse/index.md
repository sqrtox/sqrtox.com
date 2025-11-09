---
title: FireFoxでごくまれにこのブログのメモリ使用量がやばい
tags: mozilla-firefox
---

FireFox でごくまれにこのブログのページのこの世の終わりみたいなメモリ使用量になる。具体的に言うと 5～6GB くらいに増える。CPU も40%くらいに上がる。  
ごくまれにと書いたように再現性は今のところ得られていない。👿

もし同じことが起きたよという人や原因がわかったよという人が居たらこのブログのリポジトリの [issues](https://github.com/sqrtox/sqrtox.vercel.app/issues) に投げてほしい。投げてくれたらめっちゃ喜ぶ。

<https://github.com/sqrtox/sqrtox.vercel.app/issues>

# 原因の考察

現在の開発環境の localhost ではもちろん、なんとブログをリニューアルする前の本番環境でも同じ現象が起きた。  
リニューアル前を作ったのは2年ほど前のことでその時は Chromium 系ブラウザ（Brave とか Chrome とか）を使っていたが、当時開発してたときは一切そんなことなかったので、おそらく FireFox に固有の問題。


## React Developer Tools

まだ全く検証できていないが [React Developer Tools](https://ja.react.dev/learn/react-developer-tools) が原因の可能性がある。

[Redux DevTools](https://github.com/reduxjs/redux-devtools) に [メモリやCPUが大量に消費されるというissue](https://github.com/zalmoxisus/redux-devtools-extension/issues/455) があり、スクリーンショットを見ると**5.6GB**もメモリを消費している。これは自分のケースと非常に似ている。  
この issue は巨大な状態をシリアライズしていることが原因っぽい？

これは Redux の話だし、スクリーンショットから察するにこの issue の主はおそらく Chrome で現象が起きているので一見関係なさそうに思える。

ただ、React Developer Tools にも props や state を追跡する機能があるし、Chrome で空白のタブしか開いていないのに React Developer Tools が CPU を20%程消費していたことがあるので、これが原因だと考えることで納得がいくところもある。（FireFox:fox_face:は関係なかった？）

# 結局

結局どうするかとなると放置するしかない。  
今までに3回程度この現象に遭遇したがほとんどがブログのタブを何も触っていない時に発生した。かといって放置しとけば発生するわけでもなく10時間以上放置してみても発生しなかった。全く再現できないので検証もできない。
