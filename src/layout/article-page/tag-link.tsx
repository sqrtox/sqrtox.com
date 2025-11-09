"use client";

import Box from "@mui/material/Box";
import Chip, { type ChipProps } from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TagIcon from "material-symbols/tag.svg";
import NextLink from "next/link";
import type { ArticleTag } from "#src/article/article";
import Icon from "#src/component/icon";

export interface TagLinkProps {
  tag: ArticleTag;
  link?: boolean;
  count?: number;
}

export default function TagLink({ tag, link = false, count }: TagLinkProps) {
  const commonProps: ChipProps = {
    size: "small",
    icon: <Icon style={{ fontSize: "1rem" }} component={TagIcon} />,
    label: (
      <Stack component="span" alignItems="center" direction="row" spacing={0.5}>
        {tag.label}
        {count !== undefined && (
          <Box component="span" color="text.secondary">
            {count}
          </Box>
        )}
      </Stack>
    ),
  };
  const props = link
    ? {
        ...commonProps,
        clickable: true,
        component: NextLink,
        href: `/tag/${encodeURIComponent(tag.id)}`,
      }
    : commonProps;

  return <Chip {...props} />;
}
