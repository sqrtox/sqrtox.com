"use client";

import MuiLink from "@mui/material/Link";
import NextLink from "next/link";
import type { SlugPath } from "#src/article/slug";

export interface ArticleLinkProps {
  title: string;
  slug: SlugPath;
}

export default function ArticleLink({ title, slug }: ArticleLinkProps) {
  return (
    <MuiLink component={NextLink} href={`/article/${slug}`} fontWeight="bold">
      {title}
    </MuiLink>
  );
}
