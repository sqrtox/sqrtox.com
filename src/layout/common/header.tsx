import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import ThemeSwitch from "#src/theme/theme-switch";
import styles from "./header.module.scss";
import Logo from "./logo";

export default function Header() {
  return (
    <AppBar position="sticky" elevation={0} className={styles.header}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          paddingY={1}
          spacing={1}
          flexWrap="wrap"
        >
          <Logo />
          <Stack
            flex={1}
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Stack
              id="headerTool"
              direction="row"
              spacing={2}
              alignItems="center"
            />
            <ThemeSwitch />
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
}
