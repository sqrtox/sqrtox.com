import type { Metadata } from "next";
import { Article } from "#src/article/article";
import ArticlesPage from "#src/layout/articles-page/articles-page";

export async function generateMetadata(): Promise<Metadata> {
  const articles = await Article.allArticles("blog");
  const updated = articles.filter((article) => article.updatedAt !== undefined);

  return {
    title: "更新された記事",
    description: `${updated.length}件の記事`,
    openGraph: {
      type: "article",
      url: "/updated",
    },
  };
}

export default async function Page() {
  const articles = await Article.allArticles("blog");

  return (
    <ArticlesPage
      getArticles={() =>
        articles
          .filter((article) => article.updatedAt !== undefined)
          .sort((a, b) => {
            const x = a.updatedAt ?? a.createdAt;
            const y = b.updatedAt ?? b.createdAt;

            return y.getTime() - x.getTime();
          })
      }
      title="更新された記事"
    />
  );
}
