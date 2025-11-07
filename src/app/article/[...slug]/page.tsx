import { getAllSlugs, type Slug } from "#src/article/slug";
import "#src/article/path";
import { notFound } from "next/navigation";
import { Article } from "#src/article/article";
import ArticlePage from "#src/layout/article-page/article-page";

interface PageParams {
  slug: Slug;
}

interface PageProps {
  params: Promise<PageParams>;
}

export async function generateStaticParams(): Promise<PageParams[]> {
  const slugs = await getAllSlugs("blog");

  return slugs.map((slug) => ({ slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  let article: Article;

  try {
    article = await Article.create(slug, "blog");
  } catch (err) {
    console.warn(err);
    notFound();
  }

  return <ArticlePage article={article} />;
}
