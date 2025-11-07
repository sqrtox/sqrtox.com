---
title: Firefoxのプライベートブラウジングでidb-keyvalが動かない
tags: programming javascript mozilla-firefox private-browsing idb-keyval localforage
---

# 結論

idb-keyval ではなく localforage を使用する。

# localforage

基本的に IndexedDB を使用する Promise ベースのキーバリューストア。

# idb-keyval

基本的には localforage と同じだが古いブラウザをサポートしない分、軽量らしい。

# 概要

idb-keyval で値を保存しようとすると下のエラーが発生して値が保存されない。

```js
import { set } from 'idb-keyval';

await set('key', 'value');
```

```
DOMException: A mutation operation was attempted on a database that did not allow mutations.
```

IndexedDB はまともに使ったことがないので原因はよくわからないが、エラーの内容的に特定の操作が Firefox のプライベートブラウジングで許可されていないのが原因だろう。

Chrome ではこの問題は発生しなかった。

# 2025年11月7日追記

この挙動はそもそも Firefox のプライベートブラウジングでは IndexedDB が使用できないことが原因だったが、Firefox の 144.0.2（64 ビット）バージョン時点ではエラーが出なくなっている。  
読み書きも可能で、プライベートブラウジングを終了するまでは書き込んだ値は保持される。
