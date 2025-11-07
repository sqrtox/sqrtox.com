"use client";

import TagIcon from "@material-symbols/svg-400/outlined/tag.svg";
import Chip from "@mui/material/Chip";
import NextLink from "next/link";
import type { ArticleTag } from "#src/article/article";

export interface TagLinkProps {
  tag: ArticleTag;
}

export default function TagLink({ tag }: TagLinkProps) {
  return (
    <Chip
      clickable
      component={NextLink}
      href={`/tag/${encodeURIComponent(tag.id)}`}
      size="small"
      icon={<TagIcon fill="currentColor" width="1em" height="1em" />}
      key={tag.id}
      label={tag.label}
    />
  );
}
