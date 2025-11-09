import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Article } from "#src/article/article";
import ArticleList from "../top-page/article-list";

export interface ArticlesPageProps {
  title: string;
  getArticles: () => Article[] | Promise<Article[]>;
}

export default async function ArticlesPage({
  title,
  getArticles,
}: ArticlesPageProps) {
  const articles = await getArticles();

  return (
    <Container>
      <Stack paddingY={5} spacing={3}>
        <div>
          <Badge badgeContent={articles.length} color="primary">
            <Typography component="h1" variant="h5">
              {title}
            </Typography>
          </Badge>
        </div>
        <ArticleList articles={articles} />
      </Stack>
    </Container>
  );
}
