import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import styles from "#src/app/layout.module.css";
import CommonLayout from "#src/layout/common/common-layout";
import ThemeProvider from "#src/theme/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  title: {
    template: "%s | sqrtox's Blog",
    absolute: "sqrtox's Blog - 備忘録的な技術ブログ",
  },
  description: "主に技術についての備忘録的なブログです。",
  openGraph: {
    siteName: "sqrtox's Blog",
  },
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="ja" className={styles.root} suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="sqrtox's Blog" />
      </head>
      <body>
        <ThemeProvider>
          <CommonLayout>{children}</CommonLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
