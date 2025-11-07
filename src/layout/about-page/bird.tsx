import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import styles from "./bird.module.scss";

export default function Bird() {
  return (
    <Stack className={styles.bird}>
      <Stack fontSize="2.5rem" direction="row">
        <Box className={styles.emoji}>🐦️</Box>
        <Box className={styles.notes}>🎶</Box>
      </Stack>
      <Box width="100%" height={2} className={styles.birdGround} />
    </Stack>
  );
}
