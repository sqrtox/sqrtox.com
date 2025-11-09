"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TagIcon from "material-symbols/tag.svg";
import NextLink from "next/link";
import type { ArticleTag } from "#src/article/article";
import Icon from "#src/component/icon";
import { routes } from "#src/util/route";

export interface LinkProps {
  tag: ArticleTag;
  count: number;
  scale: number;
}

export default function Link({ tag, count, scale }: LinkProps) {
  return (
    <Chip
      clickable
      icon={
        <Icon style={{ fontSize: `${scale * 1.5}rem` }} component={TagIcon} />
      }
      style={{
        borderRadius: `${scale}rem`,
        height: "unset",
        paddingTop: "0.1rem",
        paddingBottom: "0.1rem",
      }}
      component={NextLink}
      href={routes.tag(tag.id)}
      label={
        <Stack
          component="span"
          alignItems="center"
          direction="row"
          spacing={1}
          fontSize={`${scale}rem`}
        >
          {tag.label}
          {scale !== undefined && (
            <Box component="span" color="text.secondary">
              {count}
            </Box>
          )}
        </Stack>
      }
    />
  );
}
