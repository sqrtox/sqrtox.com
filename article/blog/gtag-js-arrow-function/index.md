---
title: gtag.jsはアロー関数では動かない
tags: programming javascript google-analytics
---

# なぜこの問題に遭遇したか

```js
function gtag(){dataLayer.push(arguments);}
```

Google アナリティクスを導入したことがある人なら見るであろうコード。  
当然、このままなら普通に動く。  
だが、私は可能であれば絶対に function を使いたくない。  
そこで、gtag.js を以下のように書いたことでこの問題に遭遇した。

```js
const gtag = (...args) => dataLayer.push(args);
```

# 何が起きたか

collect のリクエストが送信されなかった。  
これが送信されないと計測ができない。

# 原因

これは推測でしかないが、dataLayer に push するのはただの配列風オブジェクトではなく、Arguments オブジェクトでないといけないのが原因。  
実際、function でも下のコードでは動かなかった。

```js
const gtag = function (...args) {
  dataLayer.push(args);
};
```

# 解決方法

arguments を使用できる function を使わないといけないので、アロー関数は諦める。
