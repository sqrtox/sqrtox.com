import { Article } from "#src/article/article";

export default async function Page() {
  const article = await Article.create(["acknowledgments"]);
  const html = await article.html();

  return <></>;
}
