"use client";

import MuiLink from "@mui/material/Link";
import ChevronRightIcon from "material-symbols/chevron_right.svg";
import NextLink from "next/link";
import Icon from "#src/component/icon";

export default function ArticlesLink() {
  return (
    <MuiLink
      component={NextLink}
      href="/articles"
      display="inline-flex"
      alignItems="center"
      gap="calc(0.5 * var(--mui-spacing))"
    >
      すべての記事
      <Icon component={ChevronRightIcon} />
    </MuiLink>
  );
}
