import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Article } from "#src/article/article";
import ArticleCardRenderer from "#src/article/article-card-renderer";
import ArticlesLink from "./articles-link";
import styles from "./latest-article-section.module.css";

export default async function LatestArticleSection() {
  const articles = await Article.allArticles("blog");

  articles.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <Stack component="section" spacing={3}>
      <Typography component="h2" variant="h5">
        最新記事
      </Typography>
      <Grid container spacing={2}>
        {articles.slice(0, 3).map((article) => (
          <Grid
            className={styles.gridItem}
            key={article.slug}
            size={{ md: 12 / 3 }}
          >
            <ArticleCardRenderer hideLastUpdated article={article} />
          </Grid>
        ))}
      </Grid>
      <Box>
        <ArticlesLink />
      </Box>
    </Stack>
  );
}
