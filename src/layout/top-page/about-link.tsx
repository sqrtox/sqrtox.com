"use client";

import ArrowRightIcon from "@material-symbols/svg-400/outlined/arrow_right.svg";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import styles from "#src/layout/top-page/about-link.module.scss";

export default function AboutLink() {
  return (
    <Card elevation={0}>
      <CardActionArea LinkComponent={NextLink} href="/about">
        <Paper className={styles.paper}>
          <span className={styles.cover}>
            <Typography
              component="span"
              className={styles.linkText}
              variant="h5"
            >
              About{" "}
              <Box component="span" color="primary.main">
                me
              </Box>
              <ArrowRightIcon fill="var(--mui-palette-text-primary)" />
            </Typography>
          </span>
        </Paper>
      </CardActionArea>
    </Card>
  );
}
