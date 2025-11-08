import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InkPenIcon from "material-symbols/ink_pen.svg";
import UpdateIcon from "material-symbols/update.svg";
import type { Article } from "#src/article/article";
import Icon from "#src/component/icon";
import { formatArticleDate } from "#src/util/date";
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
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Icon component={InkPenIcon} />
                <Typography
                  component="time"
                  dateTime={article.createdAt.toISOString()}
                >
                  {formatArticleDate(article.createdAt)}
                </Typography>
              </Stack>
              {article.updatedAt !== undefined && (
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Icon component={UpdateIcon} />
                  <Typography
                    component="time"
                    dateTime={article.updatedAt.toISOString()}
                  >
                    {formatArticleDate(article.updatedAt)}
                  </Typography>
                </Stack>
              )}
            </Stack>
            <HistoryLink href={`/article/${article.slug}/history`} />
          </Stack>
          {article.tags.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {article.tags.map((tag) => (
                <TagLink key={tag.id} tag={tag} />
              ))}
            </Stack>
          )}
        </Stack>
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
