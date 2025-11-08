"use client";

import Chip from "@mui/material/Chip";
import TagIcon from "material-symbols/tag.svg";
import NextLink from "next/link";
import type { ArticleTag } from "#src/article/article";
import Icon from "#src/component/icon";

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
      icon={<Icon style={{ fontSize: "1.5rem" }} component={TagIcon} />}
      label={tag.label}
    />
  );
}
