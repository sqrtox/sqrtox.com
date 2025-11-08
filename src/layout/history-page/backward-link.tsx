"use client";

import MuiLink from "@mui/material/Link";
import ArrowBackIosIcon from "material-symbols/arrow_back_ios.svg";
import NextLink from "next/link";
import Icon from "#src/component/icon";

export interface BackwardLinkProps {
  href: string;
}

export default function BackwardLink({ href }: BackwardLinkProps) {
  return (
    <MuiLink
      component={NextLink}
      href={href}
      display="inline-flex"
      gap="calc(0.5 * var(--mui-spacing))"
      alignItems="center"
    >
      <Icon component={ArrowBackIosIcon} />
      記事に戻る
    </MuiLink>
  );
}
