import type { MetadataRoute } from "next";
import { Article } from "#src/article/article";
import TAG from "#src/article/tag.json";

export const dynamic = "force-static";
export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await Article.allArticles("blog");
  const updated = articles.filter((article) => article.updatedAt !== undefined);
  const lastCreated = Math.max(
    ...articles.map((article) => article.createdAt.getTime()),
  );
  const lastUpdated = Math.max(
    ...updated.map((article) =>
      (article.updatedAt ?? article.createdAt).getTime(),
    ),
  );

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: "/",
      priority: 1,
      changeFrequency: "weekly",
      lastModified: new Date(),
    },
    {
      url: "/about",
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: "/latest",
      priority: 0.7,
      changeFrequency: "weekly",
      lastModified: new Date(lastCreated),
    },
    {
      url: "/updated",
      priority: 0.6,
      changeFrequency: "weekly",
      lastModified: new Date(lastUpdated),
    },
    {
      url: "/tags",
      priority: 0.5,
      changeFrequency: "weekly",
      lastModified: new Date(),
    },
  ];

  for (const article of articles) {
    sitemap.push({
      url: `/article/${article.slug}`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: article.updatedAt ?? article.createdAt,
    });
  }

  for (const id of Object.keys(TAG)) {
    sitemap.push({
      url: `/tag/${id}`,
      priority: 0.5,
      changeFrequency: "weekly",
      lastModified: new Date(),
    });
  }

  for (const url of sitemap) {
    url.url = new URL(url.url, process.env.NEXT_PUBLIC_BASE_URL).href;
  }

  return sitemap;
}
