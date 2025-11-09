"use client";

import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { routes } from "#src/util/route";

export default function Logo() {
  return (
    <MuiLink component={NextLink} href={routes.home} underline="hover">
      <Typography
        component="span"
        variant="h4"
        fontFamily="var(--code-font)"
        color="textSecondary"
      >
        <span>
          sqrtox
          <Box component="span" color="primary.main">
            '
          </Box>
          s
        </span>
        <span> Blog</span>
      </Typography>
    </MuiLink>
  );
}
