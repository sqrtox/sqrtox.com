import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import type { PropsWithChildren } from "react";
import Footer from "#src/layout/common/footer";
import Header from "#src/layout/common/header";

export default function CommonLayout({ children }: PropsWithChildren) {
  return (
    <Stack minHeight="100svh">
      <Header />
      <Box component="main" flex={1}>
        {children}
      </Box>
      <Footer />
    </Stack>
  );
}
