"use client";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { Toc } from "@stefanprobst/rehype-extract-toc";
import clsx from "clsx";
import { type Ref, useEffect } from "react";
import { classes } from "#src/article/classes";
import TocList from "./toc-list";
import tocListStyles from "./toc-list.module.css";
import styles from "./toc-section.module.css";

export interface TocSectionProps {
  toc: Toc;
  popper?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export default function TocSection({ ref, toc, popper }: TocSectionProps) {
  const small = useMediaQuery("(max-width: 1200px)");

  useEffect(() => {
    console.log(small);

    if (small) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        const links = document.getElementsByClassName(
          `${entry.target.id}-link`,
        );

        for (const l of document.getElementsByClassName(tocListStyles.link)) {
          l.classList.remove(styles.intersected);
        }

        for (const l of links) {
          l.classList.add(styles.intersected);
        }
      },
      {
        rootMargin: "0% 0px -80% 0px",
        threshold: 1,
      },
    );

    for (const heading of document.getElementsByClassName(
      classes.articleContentHeading,
    )) {
      obs.observe(heading);
    }

    return () => {
      obs.disconnect();

      for (const l of document.getElementsByClassName(tocListStyles.link)) {
        l.classList.remove(styles.intersected);
      }
    };
  }, [small]);

  return (
    <Paper
      ref={ref}
      component="section"
      className={clsx(styles.toc, popper && styles.popperToc)}
      elevation={popper ? 5 : 1}
    >
      <Stack padding={2} spacing={2}>
        <Typography component="h2" variant="h6">
          目次
        </Typography>
        <nav>
          <TocList toc={toc} />
        </nav>
      </Stack>
    </Paper>
  );
}
