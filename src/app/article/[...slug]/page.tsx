import { getAllSlugs, type Slug } from "#src/article/slug";
import "#src/article/path";
import type { Metadata } from "next";
import { Article } from "#src/article/article";
import ArticlePage from "#src/layout/article-page/article-page";
import HistoryPage from "#src/layout/history-page/history-page";

interface PageParams {
  slug: Slug;
}

interface PageProps {
  params: Promise<PageParams>;
}

export async function generateStaticParams(): Promise<PageParams[]> {
  const params: PageParams[] = [];
  const slugs = await getAllSlugs("blog");

  for (const slug of slugs) {
    params.push({ slug }, { slug: [...slug, "history"] });
  }

  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug.at(-1) === "history") {
    slug.pop();

    const article = await Article.create(slug, "blog");

    return {
      title: `\`${article.title}\` の更新履歴`,
      description: `\`${article.title}\` の更新履歴ページ。`,
      openGraph: {
        type: "article",
        url: `/article/${slug}/history`,
      },
    };
  }

  const article = await Article.create(slug, "blog");
  const description = await article.description();

  return {
    title: article.title,
    description,
    openGraph: {
      url: `/article/${article.slug}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  if (slug.at(-1) === "history") {
    slug.pop();

    const article = await Article.create(slug, "blog");

    return <HistoryPage article={article} />;
  }

  const article = await Article.create(slug, "blog");

  return <ArticlePage article={article} />;
}
