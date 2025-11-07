import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { TocEntry } from "@stefanprobst/rehype-extract-toc";
import clsx from "clsx";
import styles from "./toc-list.module.css";

const HEADING_PREFIX = /^#*/;

export interface TocListProps {
  depth?: number;
  toc: TocEntry[];
}

export default function TocList({ depth = 0, toc }: TocListProps) {
  return (
    <Box component="ul" sx={{ "--depth": depth }} className={styles.list}>
      {toc
        .map((item) => {
          if (!item.id) return undefined;

          return (
            <li key={item.id}>
              <Typography
                component="a"
                href={`#${encodeURIComponent(item.id)}`}
                className={clsx(styles.link, `${item.id}-link`)}
              >
                {item.value.replace(HEADING_PREFIX, "")}
              </Typography>
              {item.children !== undefined && item.children.length > 0 && (
                <TocList depth={item.depth} toc={item.children} />
              )}
            </li>
          );
        })
        .filter((elem) => elem !== undefined)}
    </Box>
  );
}
