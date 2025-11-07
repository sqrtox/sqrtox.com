import type { PropsWithChildren } from "react";
import styles from "#src/app/layout.module.css";
import CommonLayout from "#src/layout/common/common-layout";
import ThemeProvider from "#src/theme/theme-provider";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="ja" className={styles.root} suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider>
          <CommonLayout>{children}</CommonLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
