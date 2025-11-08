"use client";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CalendarMonthIcon from "material-symbols/calendar_month.svg";
import UpdateIcon from "material-symbols/update.svg";
import NextLink from "next/link";
import styles from "./article-card.module.css";
import ArticleTime from "./article-time";

export interface ArticleCardProps {
  slug: string;
  title: string;
  description: string;
  createdAt: number;
  updatedAt?: number;
  hideLastUpdated?: boolean;
}

export default function ArticleCard({
  slug,
  title,
  description,
  createdAt,
  updatedAt,
  hideLastUpdated = false,
}: ArticleCardProps) {
  return (
    <Card>
      <CardActionArea LinkComponent={NextLink} href={`/article/${slug}`}>
        <Stack
          className={styles.cardContent}
          padding={3}
          spacing={1}
          component="span"
        >
          <Stack
            component="span"
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <ArticleTime icon={CalendarMonthIcon} time={new Date(createdAt)} />
            {!hideLastUpdated && updatedAt !== undefined && (
              <ArticleTime icon={UpdateIcon} time={new Date(updatedAt)} />
            )}
          </Stack>
          <Typography component="span" variant="h6" className={styles.text}>
            {title}
          </Typography>
          <Typography
            component="span"
            color="textSecondary"
            variant="body2"
            className={styles.text}
          >
            {description}
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
