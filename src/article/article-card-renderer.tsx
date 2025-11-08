import type { Article } from "./article";
import ArticleCard from "./article-card";

export interface ArticleCardRendererProps {
  hideLastUpdated?: boolean;
  article: Article;
}

export default async function ArticleCardRenderer({
  hideLastUpdated,
  article,
}: ArticleCardRendererProps) {
  const description = await article.description(200);

  return (
    <ArticleCard
      hideLastUpdated={hideLastUpdated}
      slug={article.slug}
      title={article.title}
      description={description}
      createdAt={article.createdAt.getTime()}
      updatedAt={article.updatedAt?.getTime()}
    />
  );
}
