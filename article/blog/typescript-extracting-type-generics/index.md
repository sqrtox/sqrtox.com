---
title: TypeScriptでジェネリクスから型パラメータの型を取り出す
tags: programming typescript generics static-typing
---

# はじめに

`string[]{:ts}`（`Array<string>{:ts}` と同じ）から `string{:ts}` を取り出したいことがあった。<br>
しかし、静的型付け言語をあまりやっていない私にはどうやって取り出せばいいのか全くわからなかった。<br>
同じような人のために備忘録として残しておく。

# 結論

infer を使用する。

```ts
type ExtractTypeFromArray<T> = T extends Array<infer U> ? U : never;
```

# inferとは？

```ts
type ExtractTypeFromArray<T> = T extends Array<infer U> ? U : never;

// someArray is string[]
const someArray = ['a', 'b', 'c'];

// SomeArrayElementType is string
type SomeArrayElementType = ExtractTypeFromArray<typeof someArray>;
```

infer は TypeScript によって推論された型を使うためのもので、上のコードのように型を取りだすことができる。<br>
高度な型を表現したいときに使える。

# 参考

 - [【TypeScript】 inferに詳しくなろう - Qiita](https://qiita.com/ehika/items/8f41d4a3c8f9df4af9c3)
 - [TypeScript: how to extract the generic parameter from a type? - Stack Overflow](https://stackoverflow.com/questions/44851268/typescript-how-to-extract-the-generic-parameter-from-a-type)
