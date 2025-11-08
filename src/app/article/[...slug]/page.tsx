import { getAllSlugs, type Slug } from "#src/article/slug";
import "#src/article/path";
import type { Metadata } from "next";
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await Article.create(slug, "blog");
  const fullDescription = await article
    .text()
    .then((text) => text.replaceAll(/\s+/g, " "));
  const long = fullDescription.length > 90;
  let description = fullDescription.slice(0, 90);

  if (long) {
    description += "...";
  }

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
  let article: Article;

  try {
    article = await Article.create(slug, "blog");
  } catch (err) {
    console.warn(err);
    notFound();
  }

  return <ArticlePage article={article} />;
}
