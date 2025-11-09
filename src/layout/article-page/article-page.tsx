import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CalendarMonthIcon from "material-symbols/calendar_month.svg";
import UpdateIcon from "material-symbols/update.svg";
import type { Article } from "#src/article/article";
import ArticleTime from "#src/article/article-time";
import { routes } from "#src/util/route";
import styles from "./article-page.module.css";
import Content from "./content/content";
import HistoryLink from "./history-link";
import TagLink from "./tag-link";
import HeaderToc from "./toc/header-toc";
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
        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <ArticleTime icon={CalendarMonthIcon} time={article.createdAt} />
              {article.updatedAt !== undefined && (
                <ArticleTime icon={UpdateIcon} time={article.updatedAt} />
              )}
            </Stack>
            <HistoryLink href={routes.articleHistory(article.slug)} />
          </Stack>
          {article.tags.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {article.tags.map((tag) => (
                <TagLink link key={tag.id} tag={tag} />
              ))}
            </Stack>
          )}
        </Stack>
        <div className={styles.contentContainer}>
          <Paper className={styles.contentPaper}>
            <Box padding={3}>
              <Content html={html} />
            </Box>
          </Paper>
          {toc !== undefined && toc.length > 0 && <TocSection toc={toc} />}
          {toc !== undefined && toc.length > 0 && toc && (
            <HeaderToc toc={toc} />
          )}
        </div>
      </Stack>
    </Container>
  );
}
