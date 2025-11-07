"use client";

import ChevronLeftIcon from "@material-symbols/svg-400/outlined/chevron_left.svg";
import SearchOffIcon from "@material-symbols/svg-400/outlined/search_off.svg";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import MuiLink from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { useCallback, useEffect, useState } from "react";
import Icon from "#src/component/icon";
import DelButton from "./del";
import NekoButton from "./neko";
import styles from "./not-found-page.module.css";
import { SlButton } from "./sl";

const SECRET_BUTTONS = [DelButton, NekoButton, SlButton];

export default function NotFoundPage() {
  const [containerEl, setContainerEl] = useState<HTMLDivElement>();
  const [secretButton, setSecretButton] = useState<number>();
  const reroll = useCallback((): void => {
    setSecretButton(Math.floor(Math.random() * SECRET_BUTTONS.length));
  }, []);

  useEffect(() => {
    reroll();
  }, [reroll]);

  const SecretButton =
    secretButton !== undefined && SECRET_BUTTONS[secretButton];
  const button = SecretButton && containerEl && (
    <SecretButton containerEl={containerEl} />
  );

  return (
    <Container className={styles.container}>
      <Stack
        overflow="visible"
        alignItems="center"
        justifyContent="center"
        width="100%"
        position="relative"
        ref={(elem) => {
          if (!elem) return;

          setContainerEl(elem);
        }}
      >
        <Paper variant="outlined" className={styles.paper}>
          <Stack spacing={3} padding={5}>
            <Box>
              <Typography
                variant="h3"
                component="h1"
                display="flex"
                alignItems="center"
                flexWrap="wrap"
                gap={1}
                sx={(theme) => ({
                  [theme.breakpoints.down("md")]: {
                    font: theme.vars.font.h4,
                  },
                })}
              >
                <Icon component={SearchOffIcon} />
                <span>404:</span>
                <span>Not Found</span>
              </Typography>
            </Box>
            <Stack spacing={2}>
              <Box>
                <Typography>
                  ページが見つかりませんでした。🍝コードの海に溺れてしまったようです
                </Typography>
              </Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                minHeight="2rem"
                flexWrap="wrap"
              >
                <MuiLink
                  component={NextLink}
                  href="/"
                  display="flex"
                  alignItems="center"
                  fontSize="large"
                >
                  <Icon component={ChevronLeftIcon} />
                  ホームに戻る
                </MuiLink>
                {button && (
                  <Fade in>
                    <Box>{button}</Box>
                  </Fade>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
