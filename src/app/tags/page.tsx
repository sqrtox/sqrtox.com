import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";
import { Article, type ArticleTag } from "#src/article/article";
import TAG from "#src/article/tag.json";
import Link from "./link";

export const metadata: Metadata = {
  title: "タグ",
  description: `${Object.values(TAG).length}件のタグ`,
  openGraph: {
    type: "article",
    url: "/tags",
  },
};

export default async function Page() {
  const articles = await Article.allArticles("blog");
  const tagCount: Map<ArticleTag["id"], number> = new Map();

  for (const article of articles) {
    for (const tag of article.tags) {
      const count = tagCount.get(tag.id) ?? 0;

      tagCount.set(tag.id, count + 1);
    }
  }

  const collator = new Intl.Collator();

  const min = Math.min(...tagCount.values());
  const max = Math.max(...tagCount.values());

  const maxSize = 1.5;
  const minSize = 0.8;

  const logMin = Math.log(min);
  const logMax = Math.log(max);

  const scale = (count: number) => {
    if (max === min) return (minSize + maxSize) / 2;
    const ratio = (Math.log(count) - logMin) / (logMax - logMin);
    return minSize + ratio * (maxSize - minSize);
  };

  return (
    <Container>
      <Stack paddingY={5} spacing={3}>
        <div>
          <Badge badgeContent={Object.values(TAG).length} color="primary">
            <Typography component="h1" variant="h5">
              タグ
            </Typography>
          </Badge>
        </div>
        <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
          {Object.entries(TAG)
            .sort(([, a], [, b]) => collator.compare(a[1], b[1]))
            .map(([id, label]) => {
              const c = tagCount.get(id) ?? 0;
              const s = scale(Math.min(c, 5));
              const tag = {
                id,
                label,
              };

              return <Link key={id} tag={tag} scale={s} count={c} />;
            })}
        </Stack>
      </Stack>
    </Container>
  );
}
