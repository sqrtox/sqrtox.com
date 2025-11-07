"use client";

import Stack from "@mui/material/Stack";
import AboutLink from "./about-link";

export default function BannerNav() {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={(theme) => ({
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
        },
      })}
    >
      <AboutLink />
    </Stack>
  );
}
