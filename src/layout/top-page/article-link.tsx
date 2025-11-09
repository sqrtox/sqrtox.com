"use client";

import MuiLink from "@mui/material/Link";
import NextLink from "next/link";
import type { SlugPath } from "#src/article/slug";
import { routes } from "#src/util/route";

export interface ArticleLinkProps {
  title: string;
  slug: SlugPath;
}

export default function ArticleLink({ title, slug }: ArticleLinkProps) {
  return (
    <MuiLink component={NextLink} href={routes.article(slug)} fontWeight="bold">
      {title}
    </MuiLink>
  );
}
