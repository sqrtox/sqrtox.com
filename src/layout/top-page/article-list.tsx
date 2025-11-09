import Grid from "@mui/material/Grid";
import type { Article } from "#src/article/article";
import ArticleCardRenderer from "#src/article/article-card-renderer";
import styles from "./article-list.module.css";

export interface ArticleListProps {
  articles: Article[];
  hideLastUpdated?: boolean;
  hidePublished?: boolean;
}

export default function ArticleList({
  articles,
  hideLastUpdated,
  hidePublished,
}: ArticleListProps) {
  return (
    <Grid container spacing={2}>
      {articles.map((article) => (
        <Grid className={styles.item} key={article.slug} size={{ md: 12 / 3 }}>
          <ArticleCardRenderer
            hideLastUpdated={hideLastUpdated}
            hidePublished={hidePublished}
            article={article}
          />
        </Grid>
      ))}
    </Grid>
  );
}
