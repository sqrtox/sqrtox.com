import Stack from "@mui/material/Stack";
import Copyright from "./copyright";

export default function Footer() {
  return (
    <Stack
      padding={3}
      component="footer"
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
    >
      <Copyright />
    </Stack>
  );
}
