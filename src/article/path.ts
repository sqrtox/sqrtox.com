import { join } from "node:path";

export type AbsolutePath = string;
export type RelativePath = string;

const ROOT_DIR: AbsolutePath = process.cwd();

export const ARTICLE_DIR: AbsolutePath = join(ROOT_DIR, "article");

export const ASSETS_DIR: AbsolutePath = join(ROOT_DIR, "public/.assets");
