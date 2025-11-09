import Stack from "@mui/material/Stack";
import { Article, type ArticleTag } from "#src/article/article";
import TAG from "#src/article/tag.json";
import TagLink from "../article-page/tag-link";
import SectionLink from "./section-link";
import styles from "./tag-section.module.css";

export default async function TagSection() {
  const articles = await Article.allArticles("blog");
  const tagCount: Map<ArticleTag["id"], number> = new Map();

  for (const article of articles) {
    for (const tag of article.tags) {
      const count = tagCount.get(tag.id) ?? 0;

      tagCount.set(tag.id, count + 1);
    }
  }

  const tags = Object.entries(TAG)
    .sort(([a], [b]) => {
      const x = tagCount.get(a) ?? 0;
      const y = tagCount.get(b) ?? 0;

      return y - x;
    })
    .slice(0, 20);

  return (
    <Stack spacing={1}>
      <Stack
        direction="row"
        flexWrap="wrap"
        spacing={1}
        alignItems="center"
        overflow="hidden"
        className={styles.list}
      >
        {tags.map(([id, label]) => (
          <TagLink
            tag={{ id, label }}
            link
            key={id}
            count={tagCount.get(id) ?? 0}
          />
        ))}
      </Stack>
      <div>
        <SectionLink label="すべてのタグ" href="/tags" />
      </div>
    </Stack>
  );
}
