import type { Article } from "./article";
import ArticleCard from "./article-card";

export interface ArticleCardRendererProps {
  hideLastUpdated?: boolean;
  hidePublished?: boolean;
  article: Article;
}

export default async function ArticleCardRenderer({
  hideLastUpdated,
  hidePublished,
  article,
}: ArticleCardRendererProps) {
  const description = await article.description(200);

  return (
    <ArticleCard
      hideLastUpdated={hideLastUpdated}
      hidePublished={hidePublished}
      slug={article.slug}
      title={article.title}
      description={description}
      createdAt={article.createdAt.getTime()}
      updatedAt={article.updatedAt?.getTime()}
      tags={article.tags}
    />
  );
}
