import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import type { ArticleBase } from "./article";
import { ARTICLE_DIR, type RelativePath } from "./path";

export type SlugPart = string;
export type Slug = SlugPart[];
export type SlugPath = RelativePath;

export const getAllSlugs = async (base: ArticleBase): Promise<Slug[]> => {
  const slugs: Slug[] = [];
  const baseDir = join(ARTICLE_DIR, base);
  const dirents = await readdir(baseDir, {
    withFileTypes: true,
    recursive: true,
  });

  for (const dirent of dirents) {
    if (!dirent.isDirectory()) continue;

    const dirPath = join(dirent.parentPath, dirent.name);

    if (!existsSync(join(dirPath, "index.md"))) continue;

    const slug = relative(baseDir, dirPath).replaceAll(sep, "/").split("/");

    slugs.push(slug);
  }

  return slugs;
};
