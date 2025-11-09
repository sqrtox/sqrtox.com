import type { Metadata } from "next";
import { Article } from "#src/article/article";
import { getAllSlugs } from "#src/article/slug";
import ArticlesPage from "#src/layout/articles-page/articles-page";

export async function generateMetadata(): Promise<Metadata> {
  const slugs = await getAllSlugs("blog");

  return {
    title: "すべての記事",
    description: `${slugs.length}件の記事`,
    openGraph: {
      type: "article",
      url: "/latest",
    },
  };
}

export default async function Page() {
  const articles = await Article.allArticles("blog");

  return (
    <ArticlesPage
      getArticles={() =>
        articles.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      }
      title="すべての記事"
    />
  );
}
