import "remark-github-alerts/styles/github-base.css";

import type { Html } from "#src/article/markdown";
import styles from "./content.module.scss";
import { InternalLinkRouter } from "./internal-link-router";

export interface ContentProps {
  html: Html;
}

export default function Content({ html }: ContentProps) {
  return (
    <>
      <InternalLinkRouter />
      <div
        className={styles.content}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: TODO: 一応サニタイズするべきかも
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
