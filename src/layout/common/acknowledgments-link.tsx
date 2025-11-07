"use client";

import MuiLink from "@mui/material/Link";
import NextLink from "next/link";

export default function AcknowledgmentsLink() {
  return (
    <MuiLink component={NextLink} href="/acknowledgments">
      acknowledgments
    </MuiLink>
  );
}
