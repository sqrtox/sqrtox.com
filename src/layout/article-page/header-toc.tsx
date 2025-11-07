"use client";

import TocIcon from "@material-symbols/svg-400/outlined/toc.svg";
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";
import type { Toc } from "@stefanprobst/rehype-extract-toc";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./header-toc.module.scss";
import TocSection from "./toc-section";

export interface HeaderTocProps {
  toc: Toc;
}

export default function HeaderToc({ toc }: HeaderTocProps) {
  const [headerToolEl, setHeaderToolEl] = useState<HTMLElement>();
  const [tocOpen, setTocOpen] = useState(false);
  const [tocButtonEl, setTocButtonEl] = useState<HTMLElement>();
  const [tocEl, setTocEl] = useState<HTMLElement>();

  useEffect(() => {
    const headerToolEl = document.getElementById("headerTool");

    if (!headerToolEl) return;

    setHeaderToolEl(headerToolEl);
  }, []);

  useEffect(() => {
    if (!tocOpen) return;

    const controller = new AbortController();

    document.addEventListener(
      "click",
      (event) => {
        const path = event.composedPath();

        if (!tocButtonEl || !tocEl) return;
        if (path.includes(tocButtonEl) || path.includes(tocEl)) {
          return;
        }

        setTocOpen(false);
      },
      {
        signal: controller.signal,
      },
    );

    return () => {
      controller.abort();
    };
  }, [tocOpen, tocButtonEl, tocEl]);

  if (!headerToolEl) return;

  return (
    <>
      {createPortal(
        <IconButton
          ref={(el) => {
            if (el) {
              setTocButtonEl(el);
            }
          }}
          className={styles.tocButton}
          onClick={() => {
            setTocOpen((prev) => !prev);
          }}
        >
          <TocIcon fill="currentColor" width="1em" height="auto" />
        </IconButton>,
        headerToolEl,
      )}
      {
        <Popper
          className={clsx(!tocOpen && styles.hidden, styles.popper)}
          open
          anchorEl={tocButtonEl}
          placement="bottom-end"
          popperOptions={{
            strategy: "fixed",
          }}
          modifiers={[
            {
              name: "preventOverflow",
              options: {
                altAxis: true,
                padding: 10,
              },
            },
          ]}
        >
          <TocSection
            popper
            toc={toc}
            ref={(el) => {
              if (el) {
                setTocEl(el);
              }
            }}
          />
        </Popper>
      }
    </>
  );
}
