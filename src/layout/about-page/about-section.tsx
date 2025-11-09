import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "./about-section.module.css";

export default function AboutSection() {
  return (
    <Card variant="outlined" className={styles.card}>
      <CardContent>
        <Typography variant="h6" component="h2">
          このサイトについて
        </Typography>
        <Typography>覚えた技術を書いたり書かなかったりするブログ</Typography>
      </CardContent>
    </Card>
  );
}
