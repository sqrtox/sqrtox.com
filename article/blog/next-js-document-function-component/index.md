---
title: Next.jsのカスタムDocumentは関数コンポーネントでも使える
tags: programming javascript next-js
---

Next.js ではページの共通の文書を設定できる [_document](https://nextjs.org/docs/advanced-features/custom-document) というものがある。

```jsx
class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

ずっと NextDocument を継承したクラスコンポーネントで書いていたが、関数コンポーネントでも書けるらしい。

```jsx
const Document = () => (
  <Html>
    <Head />
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);
```

_document をいじっている際にふと思いついて調べて知った。

# 参考

- [Advanced Features: Custom \`Document\` | Next.js](https://nextjs.org/docs/advanced-features/custom-document)
- [reactjs - How to use function instead of class in Nextjs custom document for Styled Components? - Stack Overflow](https://stackoverflow.com/questions/66256825/how-to-use-function-instead-of-class-in-nextjs-custom-document-for-styled-compon)
