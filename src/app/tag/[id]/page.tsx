import type { Metadata } from "next";
import { Article } from "#src/article/article";
import TAG from "#src/article/tag.json";
import ArticlesPage from "#src/layout/articles-page/articles-page";

interface PageParams {
  id: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const articles = await Article.allArticles("blog");
  const tagArticles = articles.filter((article) =>
    article.tags.some((tag) => tag.id === id),
  );

  return {
    title: `\`${TAG[id as keyof typeof TAG]}\` タグの記事`,
    description: `${tagArticles.length}件の記事`,
    openGraph: {
      type: "article",
      url: `/tag/${encodeURIComponent(id)}`,
    },
  };
}

export function generateStaticParams(): PageParams[] {
  return Object.keys(TAG).map((id) => ({ id }));
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const label = TAG[id as keyof typeof TAG];
  const articles = await Article.allArticles("blog");

  return (
    <ArticlesPage
      getArticles={() =>
        articles
          .filter((article) => article.tags.some((tag) => tag.id === id))
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      }
      title={`\`${label}\` タグの記事`}
    />
  );
}
