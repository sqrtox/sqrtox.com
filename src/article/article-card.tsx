"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import CalendarMonthIcon from "material-symbols/calendar_month.svg";
import UpdateIcon from "material-symbols/update.svg";
import NextLink from "next/link";
import TagLink from "#src/layout/article-page/tag-link";
import type { ArticleTag } from "./article";
import styles from "./article-card.module.css";
import ArticleTime from "./article-time";

export interface ArticleCardProps {
  slug: string;
  title: string;
  description: string;
  createdAt: number;
  updatedAt?: number;
  hideLastUpdated?: boolean;
  hidePublished?: boolean;
  tags: ArticleTag[];
}

export default function ArticleCard({
  slug,
  title,
  description,
  createdAt,
  updatedAt,
  hideLastUpdated = false,
  hidePublished = false,
  tags,
}: ArticleCardProps) {
  return (
    <Card className={styles.expand}>
      <CardActionArea
        LinkComponent={NextLink}
        href={`/article/${slug}`}
        className={styles.expand}
      >
        <Stack
          padding={3}
          spacing={1.5}
          component="span"
          className={styles.expand}
        >
          <Stack
            component="span"
            direction="row"
            spacing={1}
            alignItems="center"
          >
            {!hidePublished && (
              <ArticleTime
                icon={CalendarMonthIcon}
                time={new Date(createdAt)}
              />
            )}
            {!hideLastUpdated && updatedAt !== undefined && (
              <ArticleTime icon={UpdateIcon} time={new Date(updatedAt)} />
            )}
          </Stack>
          <Typography
            component="span"
            variant="h6"
            className={clsx(styles.text, styles.title)}
          >
            {title}
          </Typography>
          <Box flex={1}>
            <Typography
              component="span"
              color="textSecondary"
              variant="body2"
              className={clsx(styles.text, styles.preview)}
            >
              {description}
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            flexWrap="wrap"
            height={25}
            overflow="hidden"
          >
            {tags.slice(0, 3).map((tag) => (
              <TagLink key={tag.id} tag={tag} />
            ))}
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
