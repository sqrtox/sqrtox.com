import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Article } from "#src/article/article";
import styles from "./article-page.module.css";
import Content from "./content/content";
import HeaderToc from "./toc/header-toc";
import TagLink from "./tag-link";
import TocSection from "./toc/toc-section";

export interface ArticlePageProps {
  article: Article;
}

export default async function ArticlePage({ article }: ArticlePageProps) {
  const html = await article.html();
  const toc = await article.toc();

  return (
    <Container>
      <Stack paddingY={5} spacing={4}>
        <Stack>
          <Typography component="h1" variant="h4">
            {article.title}
          </Typography>
        </Stack>
        {article.tags.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {article.tags.map((tag) => (
              <TagLink key={tag.id} tag={tag} />
            ))}
          </Stack>
        )}
        <div className={styles.contentContainer}>
          <Content html={html} />
          {toc !== undefined && toc.length > 0 && <TocSection toc={toc} />}
          {toc !== undefined && toc.length > 0 && toc && (
            <HeaderToc toc={toc} />
          )}
        </div>
      </Stack>
    </Container>
  );
}
