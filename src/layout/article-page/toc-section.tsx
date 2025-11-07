"use client";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Toc } from "@stefanprobst/rehype-extract-toc";
import clsx from "clsx";
import { type Ref, useEffect, useState } from "react";
import TocList from "./toc-list";
import styles from "./toc-section.module.css";

export interface TocSectionProps {
  toc: Toc;
  popper?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export default function TocSection({ ref, toc, popper }: TocSectionProps) {
  const [navEl, setNavEl] = useState<HTMLElement>();

  useEffect(() => {
    if (!navEl) return;

    const contentEl = document.getElementById("articleContent");
    if (!contentEl) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        const links = document.getElementsByClassName(
          `${entry.target.id}-link`,
        );

        for (const l of navEl.getElementsByTagName("a")) {
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

    for (const heading of contentEl.querySelectorAll(
      "h1, h2, h3, h4, h5, h6",
    )) {
      obs.observe(heading);
    }

    return () => {
      obs.disconnect();
    };
  }, [navEl]);

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
        <nav
          ref={(el) => {
            if (el) {
              setNavEl(el);
            }
          }}
        >
          <TocList toc={toc} />
        </nav>
      </Stack>
    </Paper>
  );
}
