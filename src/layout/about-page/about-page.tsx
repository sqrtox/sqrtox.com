import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Landscape from "#src/layout/about-page/landscape";
import styles from "./about-page.module.scss";
import AboutSection from "./about-section";
import avatar from "./avatar.webp";
import SnsSection from "./sns-section";

export default function AboutPage() {
  return (
    <Container>
      <Stack alignItems="flex-start" spacing={3} paddingY={5}>
        <Typography variant="h5" component="h1">
          About
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 7 }}>
            <AboutSection />
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Landscape />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Card className={styles.card}>
              <CardContent>
                <Stack direction="row" alignItems="flex-start" spacing={2}>
                  <Box>
                    <Box
                      component="img"
                      alt="avatar"
                      src={avatar.src}
                      width={100}
                      height={100}
                      loading="lazy"
                      className={styles.avatar}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h6" component="h2">
                      sqrtox
                    </Typography>
                    <Typography>趣味でコード書いてる人です</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined" className={styles.card}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  趣味
                </Typography>
                <Typography className={styles.wbrContainer}>
                  <Typography component="span" whiteSpace="nowrap">
                    👨‍💻コーディング、
                  </Typography>
                  <wbr />
                  <Typography component="span" whiteSpace="nowrap">
                    🎮️ゲーム、
                  </Typography>
                  <wbr />
                  <Typography component="span" whiteSpace="nowrap">
                    📚️読書、
                  </Typography>
                  <wbr />
                  <Typography component="span" whiteSpace="nowrap">
                    📹️動画編集、
                  </Typography>
                  <wbr />
                  <Typography component="span" whiteSpace="nowrap">
                    🌐ネットサーフィンなど
                  </Typography>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined" className={styles.card}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  好きなフレームワーク
                </Typography>
                <Typography>
                  言語はJavaScript/TypeScript、Rustをよく使っています。フロントエンドのフレームワークはNext.js(React)が好きです
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <SnsSection />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
