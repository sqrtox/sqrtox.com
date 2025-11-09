import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Article } from "#src/article/article";
import ArticleList from "./article-list";
import SectionLink, { type SectionLinkProps } from "./section-link";

export interface ArticleSectionProps {
  heading: string;
  limit: number;
  compare: (a: Article, b: Article) => number;
  filter?: (article: Article) => boolean;
  hideLastUpdated?: boolean;
  hidePublished?: boolean;
  articlesLink: SectionLinkProps;
}

export default async function ArticleSection({
  heading,
  limit,
  compare,
  filter = () => true,
  hideLastUpdated,
  hidePublished,
  articlesLink,
}: ArticleSectionProps) {
  const articles = await Article.allArticles("blog");

  articles.sort(compare);

  return (
    <Stack component="section" spacing={3}>
      <Typography component="h2" variant="h5">
        {heading}
      </Typography>
      <ArticleList
        hideLastUpdated={hideLastUpdated}
        hidePublished={hidePublished}
        articles={articles.filter(filter).slice(0, limit)}
      />
      <Box>
        <SectionLink {...articlesLink} />
      </Box>
    </Stack>
  );
}
