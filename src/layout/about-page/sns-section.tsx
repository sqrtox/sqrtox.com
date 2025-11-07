import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Bird from "#src/layout/about-page/bird";
import SnsLink from "./sns-link";
import styles from "./sns-section.module.css";

export default function SnsSection() {
  return (
    <Card component="section" variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6" component="h2">
            SNS
          </Typography>
          <ul className={styles.list}>
            <SnsLink label="GitHub" href="https://github.com/sqrtox" />
            <SnsLink label="Qiita" href="https://qiita.com/sqrtox" />
            <SnsLink
              label="X (Twitter)"
              href="https://x.com/sqrtox"
              text="今のところXは全く動かしていません"
            />
          </ul>
          <Bird />
        </Stack>
      </CardContent>
    </Card>
  );
}
