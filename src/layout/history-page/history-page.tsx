import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Article } from "#src/article/article";
import BackwardLink from "./backward-link";
import HistoryList from "./history-list";

export interface HistoryPageProps {
  article: Article;
}

export default function HistoryPage({ article }: HistoryPageProps) {
  return (
    <Container>
      <Stack spacing={3} paddingY={3}>
        <Typography component="h1" variant="h5">
          記事の履歴
        </Typography>
        <div>
          <BackwardLink href={`/article/${article.slug}`} />
        </div>
        <HistoryList
          commits={article.commits.toSorted(
            (a, b) => b.timestamp - a.timestamp,
          )}
        />
      </Stack>
    </Container>
  );
}
