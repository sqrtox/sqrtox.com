import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Article } from "#src/article/article";
import ArticleLink from "./article-link";
import Banner from "./banner";

export default async function TopPage() {
  const articles = await Article.allArticles("blog");

  return (
    <Stack spacing={8} paddingBottom={5} width="100%">
      <Banner />
      <Container>
        <Stack spacing={5}>
          <Stack component="section">
            <Typography component="h2" variant="h5">
              メモ
            </Typography>
          </Stack>
          {articles.map((article) => (
            <ArticleLink
              key={article.slug}
              title={article.title}
              slug={article.slug}
            />
          ))}
        </Stack>
      </Container>
    </Stack>
  );
}
