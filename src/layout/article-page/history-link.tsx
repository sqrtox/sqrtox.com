"use client";

import Chip from "@mui/material/Chip";
import HistoryIcon from "material-symbols/history.svg";
import NextLink from "next/link";
import Icon from "#src/component/icon";
import styles from "./history-link.module.css";

export interface HistoryLinkProps {
  href: string;
}

export default function HistoryLink({ href }: HistoryLinkProps) {
  return (
    <Chip
      clickable
      component={NextLink}
      href={href}
      icon={<Icon className={styles.icon} component={HistoryIcon} />}
      label="履歴"
    />
  );
}
