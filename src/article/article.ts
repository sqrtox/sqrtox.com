import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import type { Toc } from "@stefanprobst/rehype-extract-toc";
import fm from "front-matter";
import isAbsoluteUrl from "is-absolute-url";
import { $object, $opt, $string } from "lizod";
import tag from "#src/article/tag.json";
import { type CompiledData, compile, type Html } from "./markdown";
import { type AbsolutePath, ARTICLE_DIR, type RelativePath } from "./path";
import { getAllSlugs, type Slug, type SlugPath } from "./slug";

const WHITESPACES = /\s+/;

const ArticleAttributes = $object(
  {
    title: $string,
    tags: $opt($string),
  },
  false,
);

export type ArticleBase = RelativePath;

export interface ArticleTag {
  id: string;
  label: string;
}

export class Article {
  readonly slug: SlugPath;
  readonly title: string;
  readonly markdown: string;
  readonly tags: ArticleTag[];
  readonly #dir: AbsolutePath;

  private constructor(
    slug: SlugPath,
    dir: AbsolutePath,
    title: string,
    markdown: string,
    tags: ArticleTag[],
  ) {
    this.slug = slug;
    this.title = title;
    this.markdown = markdown;
    this.#dir = dir;
    this.tags = tags;
  }

  static async create(slug: Slug, base?: ArticleBase): Promise<Article> {
    const slugPath = slug.join("/");
    const dir = join(ARTICLE_DIR, base ?? "", slugPath);
    const path = join(dir, "index.md");
    const content = await readFile(path, "utf8");
    const { attributes, body } = fm(content);
    const ctx = { errors: [] };

    if (!ArticleAttributes(attributes, ctx)) {
      throw ctx;
    }

    const collator = new Intl.Collator();
    const tags: ArticleTag[] | undefined = attributes.tags
      ?.split(WHITESPACES)
      .map((id) => ({
        id,
        label: tag[id as keyof typeof tag] ?? id,
      }))
      .sort((a, b) => collator.compare(a.id, b.id));

    return new Article(slugPath, dir, attributes.title, body, tags ?? []);
  }

  static async allArticles(base: ArticleBase): Promise<Article[]> {
    const articles: Article[] = [];

    for (const slug of await getAllSlugs(base)) {
      articles.push(await Article.create(slug, base));
    }

    return articles;
  }

  #compiled?: CompiledData;

  async #compile(): Promise<CompiledData> {
    if (!this.#compiled) {
      this.#compiled = await compile(this.markdown, {
        resolveAssetsPath: async (src) => {
          if (isAbsoluteUrl(src) || src.startsWith("//")) {
            return src;
          }

          const path = resolve(this.#dir, src);

          return path;
        },
      });
    }

    return this.#compiled;
  }

  async toc(): Promise<Toc | undefined> {
    const { toc } = await this.#compile();

    return toc;
  }

  async html(): Promise<Html> {
    const { html } = await this.#compile();

    return html;
  }

  async text(): Promise<string> {
    const { text } = await this.#compile();

    return text;
  }
}
