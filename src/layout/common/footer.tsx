import Stack from "@mui/material/Stack";
import AcknowledgmentsLink from "./acknowledgments-link";
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
      <AcknowledgmentsLink />
    </Stack>
  );
}
