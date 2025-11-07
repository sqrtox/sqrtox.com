import "remark-github-alerts/styles/github-base.css";

import Paper from "@mui/material/Paper";
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
      <Paper
        className={styles.content}
        id="articleContent"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
