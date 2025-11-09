"use client";

import MuiLink from "@mui/material/Link";
import ChevronRightIcon from "material-symbols/chevron_right.svg";
import NextLink from "next/link";
import Icon from "#src/component/icon";

export interface SectionLinkProps {
  href: string;
  label: string;
}

export default function SectionLink({ href, label }: SectionLinkProps) {
  return (
    <MuiLink
      component={NextLink}
      href={href}
      display="inline-flex"
      alignItems="center"
      gap="calc(0.5 * var(--mui-spacing))"
    >
      {label}
      <Icon component={ChevronRightIcon} />
    </MuiLink>
  );
}
