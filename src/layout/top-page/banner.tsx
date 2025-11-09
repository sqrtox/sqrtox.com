"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import BannerNav from "./banner-nav";

export default function Banner() {
  return (
    <Stack
      paddingY={7}
      sx={(theme) => ({
        backgroundImage:
          "linear-gradient(to right bottom, rgba(var(--mui-palette-primary-mainChannel) / 0.5), rgba(var(--mui-palette-secondary-mainChannel) / 0.9))",
        [theme.breakpoints.down("md")]: {
          paddingY: 3,
        },
      })}
    >
      <Container>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography component="h1" variant="h4">
              <Box component="span" display="inline-block">
                備忘録的な
              </Box>
              <Box component="span" display="inline-block">
                技術ブログ
              </Box>
            </Typography>
            <Typography component="p" fontSize="1.2rem">
              技術を中心にいろいろかきます📝
            </Typography>
          </Stack>
          <BannerNav />
        </Stack>
      </Container>
    </Stack>
  );
}
